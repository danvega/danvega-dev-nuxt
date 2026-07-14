---
title: "ChatClient vs ChatModel: Which Spring AI API Should You Actually Use?"
slug: chatclient-vs-chatmodel-spring-ai
description: "Spring AI gives you two ways to call an LLM. Learn the difference between ChatClient and ChatModel, when to use each, and see both in action with code examples."
author: "Dan Vega"
tags:
  - Spring AI
  - Spring Boot
keywords:
  - Spring AI ChatClient vs ChatModel
  - ChatClient Spring AI
  - ChatModel Spring AI
  - Spring AI 2.0
  - Spring AI tutorial
  - Spring Boot AI
  - LLM Java Spring
date: 2026-07-02T09:00:00.000Z
published: true
cover: chatclient-vs-chatmodel-spring-ai.jpg
video: https://www.youtube.com/embed/IdIDI71sGZM
---


Spring AI gives you two APIs to call an LLM, and picking the wrong one will cost you in either unnecessary complexity or lost control. If you've seen `ChatClient` and `ChatModel` in the documentation and wondered which one belongs in your code, this post clears it up for good.

One of my favorite features about Spring AI is that we write code to an abstraction. With new models dropping every week and benchmarks constantly shifting, you don't want to couple your application to a specific provider. You want to write against an abstraction so you can swap models as easily as changing a dependency. Both `ChatClient` and `ChatModel` give you that power, but they sit at different levels of the stack. Let's break down what each one does, look at real code, and figure out when to reach for which.

## The High-Level View

Here's the relationship in one sentence: **ChatClient is built on top of ChatModel.** Both end up calling the same provider API. The difference is how much work each one does for you.

**ChatClient** is the high-level, fluent API for talking to a chat model. You inject a builder, chain a few calls, and get your answer. If you've used the `RestClient` in Spring before, this will feel immediately familiar. It gives you built-in advisors for things like memory, RAG (Retrieval-Augmented Generation), and logging. It can map responses directly into POJOs. It is the recommended starting point for all applications.

**ChatModel** is the low-level interface that ChatClient is built on. You construct a `Prompt` object, call the model, and read the `ChatResponse` yourself. There is one implementation per provider. If you're using OpenAI, you get an `OpenAiChatModel`. If you're using Anthropic, you get an `AnthropicChatModel`. This is where you go when you need fine-grained control over the request and response.

### At a Glance

| | ChatClient | ChatModel |
|---|---|---|
| **Level** | High-level fluent API | Low-level interface |
| **How you get it** | Inject a `ChatClient.Builder` | Inject `ChatModel` directly |
| **Advisors** | Built-in (memory, RAG, logging) | Manual |
| **Structured output** | `.entity(MyType.class)` | Parse `ChatResponse` by hand |
| **Best for** | Most applications | Low-level control, infra code |

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with:

- **Java** and **Spring Boot 4.1.0** (or the latest available)
- **Group:** `dev.danvega`
- **Dependencies:** Web, OpenAI

If you don't have an OpenAI API key or prefer not to use one, you can swap in Ollama with an open-source model and follow along with the same concepts. The abstraction means your code stays nearly identical.

Once you've downloaded and opened the project, add your API key to `application.properties`:

```properties
spring.ai.openai.api-key=${OPENAI_API_KEY}
```

You can hard-code the key for local development, but please don't check it into version control. I store mine in an environment variable called `OPENAI_API_KEY`.

With that single property in place, you're ready to write code.

## Working with ChatClient

Let's start with the API you'll use 90% of the time. Create a `ChatController` class:

```java
@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/chat")
    public String chat() {
        return chatClient
                .prompt()
                .user("Tell me an interesting fact about YouTube")
                .call()
                .content();
    }
}
```

A few things to notice here. The `ChatClient` isn't injected directly. Instead, Spring auto-configures a `ChatClient.Builder` for you. That builder includes all the observability and configuration wiring that you'd otherwise have to set up yourself. You call `builder.build()` to get your instance.

If you peek inside the `ChatClient` interface, you'll find static factory methods like `ChatClient.create(chatModel)` that accept a `ChatModel`. This is how you can see that ChatClient is built on top of ChatModel, even at the API level.

The fluent chain reads almost like a sentence: create a prompt, set the user message, make a blocking call, and get the string content back. That's it. That's the minimal code required to talk to an LLM with Spring AI.

Start the application and make a GET request:

```bash
http localhost:8080/chat
```

After a moment, you'll get something like:

> "The very first YouTube video, 'Me at the Zoo,' uploaded by co-founder Jawed Karim on April 23, 2005, is still online today."

For most applications, this is all you need. The `ChatClient` also supports streaming responses, structured output mapping with `.entity()`, advisors for conversation memory and RAG, and tool/function calling. I have a [five and a half hour course on Spring AI](https://www.danvega.dev/courses) that covers all of this if you want to go deeper.

## Working with ChatModel

Now let's drop down a level. Create a separate controller to keep things organized:

```java
@RestController
@RequestMapping("/chat-model")
public class ChatModelController {

    private final ChatModel chatModel;

    public ChatModelController(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/fact")
    public Map<String, Object> fact() {
        Prompt prompt = new Prompt("Tell me an interesting fact about Cleveland, Ohio");
        ChatResponse response = chatModel.call(prompt);

        var result = response.getResult();
        var usage = response.getMetadata().getUsage();

        return Map.of(
                "answer", result.getOutput().getText(),
                "model", response.getMetadata().getModel(),
                "finishReason", result.getMetadata().getFinishReason(),
                "promptTokens", usage.getPromptTokens(),
                "completionTokens", usage.getCompletionTokens(),
                "totalTokens", usage.getTotalTokens()
        );
    }
}
```

Notice the difference right away. There's no builder pattern. `ChatModel` is an interface, and Spring auto-wires the provider-specific implementation (in our case, `OpenAiChatModel`) directly into the constructor.

You construct a `Prompt` object, call the model, and get back a `ChatResponse`. That response contains a lot more than just the text. You get metadata about the model that was used, why it stopped generating (the finish reason), and detailed token usage information.

Hit the endpoint:

```bash
http localhost:8080/chat-model/fact
```

The response comes back as a JSON object with keys for the answer, model name (GPT-4o-mini by default), finish reason, and token counts for the prompt, completion, and total. This kind of metadata is invaluable when you're monitoring costs, debugging unexpected responses, or building observability into your AI infrastructure.

## Multiple Generations in One Call

Here's something the ChatModel can do that highlights why the low-level API exists. You can ask the model to return multiple variations in a single request:

```java
@GetMapping("/taglines")
public List<String> taglines() {
    ChatResponse response = chatModel.call(
            new Prompt(
                    "Write a fun tagline for Orlando, Florida",
                    OpenAiChatOptions.builder()
                            .temperature(1.2)
                            .n(3)
                            .build()
            )
    );

    return response.getResults().stream()
            .map(gen -> gen.getOutput().getText())
            .toList();
}
```

By passing `OpenAiChatOptions` with `.n(3)`, we're telling the model to generate three separate completions. We also bump the temperature to 1.2 to increase creativity. The `ChatResponse` gives us back a list of `Generation` objects, and we can stream through them to extract the text.

This is a case where the ChatClient's design (which returns a single string via `.content()`) doesn't naturally support multiple generations. The ChatModel gives you that raw access.

```bash
http localhost:8080/chat-model/taglines
```

You'll get back a list of three fun taglines for Orlando. The specifics will vary with each call since we cranked up the temperature.

## When to Use What

**Reach for ChatClient for almost everything.** Prompts, RAG, tools, memory, structured output with minimal code. It is the public API for talking to a large language model in Spring AI. Start here, and stay here unless you have a specific reason not to.

**Drop down to ChatModel when:**

- You need fine-grained control over request options (like multiple generations)
- You're building reusable infrastructure code or custom advisors
- You want raw access to response metadata like token usage, finish reasons, or model information
- You're doing something the fluent API doesn't expose directly

One thing worth mentioning: even at the ChatClient level, you can return a `ChatResponse` instead of a plain string and get access to some of that lower-level metadata. So the line between the two isn't always sharp. But when you find yourself fighting the fluent API to get what you need, that's your signal to reach for the ChatModel.

## Learning More

The [Spring AI documentation](https://docs.spring.io/spring-ai/reference/) is the best place to dive deeper into both APIs. If you're using Spring Boot 4, you'll want Spring AI 2.0. If you're still on Spring Boot 3.5, the latest in the 1.x line is 1.1.8.

The documentation covers the [Chat Model](https://docs.spring.io/spring-ai/reference/api/chatmodel.html) and [Chat Client API](https://docs.spring.io/spring-ai/reference/api/chatclient.html) in detail, including topics like advisors, structured output, and streaming that we didn't cover here.

Spring AI 2.0 is out with a lot of exciting improvements, and I have more content on the way covering what's new. If you're interested in AI with Spring, it's a great time to be paying attention.

Happy Coding!