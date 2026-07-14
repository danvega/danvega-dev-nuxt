---
title: "Building Custom Spring AI Advisors for Tool Logging and Token Tracking"
slug: spring-ai-custom-advisors-tool-logging-token-counter
description: "Learn to build custom Spring AI advisors with the BaseAdvisor interface to log available tools, track tool invocations, and count token usage on every LLM call."
author: "Dan Vega"
tags:
  - Spring AI
  - Spring Boot
  - Java
keywords:
  - Spring AI custom advisor
  - Spring AI advisors
  - BaseAdvisor Spring AI
  - Spring AI token counter
  - Spring AI tool logging
  - LLM token tracking
  - Spring AI tool calling
  - Spring AI 2.0
youtube: WNJFR-_N9bc
date: 2026-07-08T09:00:00.000Z
published: true
cover: spring-ai-custom-advisors-tool-logging-token-counter.jpg
video: https://www.youtube.com/embed/WNJFR-_N9bc
---


When you start working with tools in Spring AI, you quickly run into a visibility problem. You send a prompt to the LLM, tools get called behind the scenes, tokens get consumed, and you have no real sense of what happened unless you dig through debug logs or return the full `ChatResponse` object. Wouldn't it be great to have a clean, automatic way to see which tools were available, which ones the model actually invoked, and how many tokens each call consumed?

That's exactly the problem custom advisors solve, and building them is a great way to understand one of the most powerful extension points in Spring AI.

::GitHubRepo{url="https://github.com/danvega/spring-ai-workshop"}
Follow along with the complete working example.
::

## What Are Advisors in Spring AI?

If you've ever worked with Aspect-Oriented Programming (AOP) in Spring, advisors will feel familiar. They give you a way to intercept LLM calls and do something before the request goes out, after the response comes back, or both.

The [Spring AI reference documentation](https://docs.spring.io/spring-ai/reference/) describes it well: advisors provide a flexible and powerful way to intercept, modify, and enhance AI-driven interactions in your Spring applications. By leveraging the advisors API, developers can create more sophisticated, reusable, and maintainable AI components.

Spring AI ships with several built-in advisors, including a `MessageChatMemoryAdvisor`, a `QuestionAnswerAdvisor`, and a `SimpleLoggerAdvisor`. All of these are open source, so you can read through their implementations to see how they work. But today we're going to build two of our own:

1. **AvailableToolsLoggingAdvisor** - logs which tools are visible to the model and which ones it actually calls
2. **TokenCounterAdvisor** - tracks prompt tokens, completion tokens, and running totals across calls

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with these settings:

- **Java** with **Spring Boot 4.1**
- **Group:** `dev.danvega`
- **Dependencies:** Spring Web, Anthropic (or whichever LLM provider you prefer)

Once you've downloaded and opened the project, configure your API key in `application.properties`:

```properties
spring.ai.anthropic.api-key=${ANTHROPIC_API_KEY}
spring.ai.anthropic.chat.options.model=claude-opus-4-0-20250801
```

The model choice doesn't matter much for this example. What matters is that your API key is set correctly. If it's not, the application won't start.

## The Problem: No Visibility Into Tool Calls and Token Usage

Let's start with a basic chat controller to see why we need advisors in the first place.

```java
@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/before")
    public String before() {
        return chatClient.prompt()
                .user("What is tomorrow's date?")
                .tools(new DateTimeTools())
                .call()
                .content();
    }
}
```

We also need a tool class so the LLM can answer date-related questions:

```java
public class DateTimeTools {

    @Tool(description = "Get the current date and time in the user's timezone")
    public String getCurrentDateTime() {
        return LocalDateTime.now()
                .atZone(LocaleContextHolder.getTimeZone().toZoneId())
                .toString();
    }
}
```

Without tools, the LLM would either say "I don't know" or hallucinate a date based on its training data. With the `DateTimeTools` available, it can call `getCurrentDateTime`, get the real answer, and respond accurately.

But here's the thing: when you call this endpoint, you get back a plain string like "Tomorrow's date is July 3rd, 2026." There's no indication that a tool was called, which tool it was, or how many tokens the exchange consumed.

### Getting Token Usage from ChatResponse

One option is to return the full `ChatResponse` instead of just the content:

```java
@GetMapping("/before")
public ChatResponse before() {
    return chatClient.prompt()
            .user("What is the capital of Ohio?")
            .call()
            .chatResponse();
}
```

This gives you metadata including token usage: prompt tokens, completion tokens, and total tokens. But you probably don't want to return `ChatResponse` to your clients. You want to return clean content and still have visibility into what happened.

### Getting Tool Calls from Debug Logs

Another option is to enable debug logging for the tool calling manager:

```properties
logging.level.org.springframework.ai.model.tool.DefaultToolCallingManager=DEBUG
```

This will log messages like "Executing Tool Call: getCurrentDateTime" to your console. Helpful, but it's a separate mechanism from the token tracking, and you have no control over the format.

We're using two different approaches to solve two related problems. Advisors let us solve both in one consistent, reusable way.

## Creating the AvailableToolsLoggingAdvisor

Create a new package called `advisors` and add the `AvailableToolsLoggingAdvisor` class:

```java
public class AvailableToolsLoggingAdvisor implements BaseAdvisor {

    private static final String CYAN = "\u001B[36m";
    private static final String GREEN = "\u001B[32m";
    private static final String RESET = "\u001B[0m";

    private static final int DEFAULT_ORDER = 1000;
    private final int order;

    public AvailableToolsLoggingAdvisor() {
        this(DEFAULT_ORDER);
    }

    public AvailableToolsLoggingAdvisor(int order) {
        this.order = order;
    }

    @Override
    public int getOrder() {
        return this.order;
    }

    @Override
    public ChatClientRequest before(ChatClientRequest request, AdvisorChain advisorChain) {
        List<String> toolNames = new ArrayList<>();

        if (request.prompt().getOptions() instanceof ToolCallingChatOptions options
                && options.getToolCallbacks() != null) {
            toolNames = options.getToolCallbacks().stream()
                    .map(tc -> tc.getToolDefinition().name())
                    .sorted()
                    .toList();
        }

        System.out.printf("%sLLM call: %d tool(s) visible to the model: %s%s%n",
                CYAN, toolNames.size(), toolNames, RESET);

        return request;
    }

    @Override
    public ChatClientResponse after(ChatClientResponse response, AdvisorChain advisorChain) {
        var chatResponse = response.chatResponse();
        if (chatResponse == null) {
            return response;
        }

        chatResponse.getResults().stream()
                .map(Generation::getOutput)
                .filter(message -> !message.getToolCalls().isEmpty())
                .flatMap(message -> message.getToolCalls().stream())
                .forEach(toolCall ->
                        System.out.printf("%sModel called: %s (args: %s)%s%n",
                                GREEN, toolCall.name(), truncate(toolCall.arguments(), 160), RESET)
                );

        return response;
    }

    private static String truncate(String text, int max) {
        if (text == null) return "";
        return text.length() <= max ? text : text.substring(0, max) + "...";
    }
}
```

Let's break down what's happening here.

### The BaseAdvisor Interface

`BaseAdvisor` is the foundation for building advisors in Spring AI. It extends both `CallAdvisor` and `StreamAdvisor`, which means your advisor works whether you're making blocking calls or streaming responses. It also extends `Ordered`, so you can control when your advisor runs relative to others in the chain.

The `order` property matters when you have multiple advisors. In the next video on tool searching, we'll want this advisor to run after the `ToolSearchAdvisor`, so setting a reasonable default like 1000 ensures proper sequencing.

### The before Method

Before the LLM call goes out, we check if the request's prompt options contain tool callbacks. If they do, we extract the tool names and log them. This tells us exactly which tools the model can "see" for this particular call.

The key line is the instanceof check with pattern matching: `request.prompt().getOptions() instanceof ToolCallingChatOptions options`. This gives us safe access to the tool-specific options only when they exist.

### The after Method

After the response comes back, we look through the results for any tool calls the model made. We stream through the generations, filter for messages that contain tool calls, and log each one with its name and arguments (truncated to keep the output readable).

The `truncate` helper method prevents tool call arguments from flooding your console, especially when arguments contain large JSON payloads.

## Creating the TokenCounterAdvisor

The second advisor tracks token consumption across calls:

```java
public class TokenCounterAdvisor implements BaseAdvisor {

    private static final String PURPLE = "\u001B[35m";
    private static final String RESET = "\u001B[0m";

    private final AtomicInteger requests = new AtomicInteger(0);
    private final AtomicLong promptTokens = new AtomicLong(0);
    private final AtomicLong completionTokens = new AtomicLong(0);
    private final AtomicLong totalTokens = new AtomicLong(0);

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE - 1000;
    }

    @Override
    public ChatClientRequest before(ChatClientRequest request, AdvisorChain advisorChain) {
        return request;
    }

    @Override
    public ChatClientResponse after(ChatClientResponse response, AdvisorChain advisorChain) {
        var chatResponse = response.chatResponse();
        if (chatResponse == null || chatResponse.getMetadata() == null) {
            return response;
        }

        var usage = chatResponse.getMetadata().getUsage();
        this.requests.incrementAndGet();
        this.promptTokens.addAndGet(usage.getPromptTokens());
        this.completionTokens.addAndGet(usage.getCompletionTokens());
        this.totalTokens.addAndGet(usage.getTotalTokens());

        System.out.printf("%sTokens this call — prompt: %d, completion: %d, total: %d | " +
                        "Running total: %d tokens over %d call(s)%s%n",
                PURPLE,
                usage.getPromptTokens(),
                usage.getCompletionTokens(),
                usage.getTotalTokens(),
                this.totalTokens.get(),
                this.requests.get(),
                RESET);

        return response;
    }
}
```

This advisor doesn't need to do anything in the `before` method, so it just passes the request through unchanged. All the interesting work happens in `after`.

We pull the `Usage` object from the chat response metadata. This is the same data you'd see if you returned a `ChatResponse` from your endpoint, but now it's being captured automatically on every call. The `AtomicInteger` and `AtomicLong` fields keep running totals, so you can see aggregate consumption over time.

The order is set to `Ordered.LOWEST_PRECEDENCE - 1000` so this advisor runs last in the chain. Token counting is a pure observation concern, and it shouldn't interfere with anything else.

## Wiring Up the Advisors

Back in the controller, register both advisors with the chat client:

```java
@GetMapping("/before")
public String before() {
    return chatClient.prompt()
            .user("What is tomorrow's date?")
            .tools(new DateTimeTools())
            .advisors(
                    new AvailableToolsLoggingAdvisor(),
                    new TokenCounterAdvisor()
            )
            .call()
            .content();
}
```

In a production application, you'd probably mark these advisors as `@Component` beans and inject them, or configure them once at the `ChatClient` level through a configuration class. Defining them inline works well for demos and testing.

## Seeing It All in Action

Start the application and hit `http://localhost:8080/before`. You'll get back a clean string response like "Tomorrow's date is July 3, 2026." But check your console:

```
LLM call: 1 tool(s) visible to the model: [getCurrentDateTime]
Model called: getCurrentDateTime (args: {})
Tokens this call — prompt: 380, completion: 45, total: 425 | Running total: 425 tokens over 1 call(s)
```

In one glance, you can see:
- One tool was available to the model
- The model chose to call `getCurrentDateTime`
- The call consumed 380 prompt tokens, 45 completion tokens, and 425 total
- This was the first call, so the running total matches

Make a few more requests and watch the running total climb. This kind of visibility becomes invaluable when you start working with larger sets of tools and want to understand the cost implications.

## Why This Matters for Tool Search

You might be wondering why I spent time building token tracking for a single-tool example. The answer becomes clear when you think about scale.

Imagine you have 50 tools registered with your chat client. Every tool definition gets loaded into the context window as part of the prompt. That means those 50 tool descriptions are eating into your token budget on every single call, even if the model only needs one of them.

The new tool searching capabilities in Spring AI 2.0 address this by dynamically selecting which tools to include based on the user's query. The advisors we built today will let us clearly see the difference: how many tools are loaded before and after tool search, and how dramatically the token consumption drops.

## Wrapping Up

Advisors are one of the most useful extension points in Spring AI. They follow the same philosophy as Spring's interceptors and AOP, giving you clean hooks to observe, modify, or enhance LLM interactions without cluttering your business logic.

Today we built two practical advisors:
- **AvailableToolsLoggingAdvisor** tells you which tools the model can see and which ones it actually calls
- **TokenCounterAdvisor** tracks token usage per call and across your session

These are tools I genuinely use when developing with Spring AI. They make the invisible visible, which is exactly what you want when you're debugging, optimizing, or just trying to understand what's happening between your application and the LLM.

Happy Coding!