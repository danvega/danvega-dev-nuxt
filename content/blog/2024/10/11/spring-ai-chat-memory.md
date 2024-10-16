---
title: "Building Intelligent Chatbots with Spring AI: Implementing Chat Memory"
description: "Learn how to create a context-aware chatbot using Spring AI and OpenAI. This tutorial covers implementing chat memory, handling token usage, and managing context window limitations for more engaging AI conversations."
slug: spring-ai-chat-memory
date: 2024-10-11T09:00:00.000Z
published: true
author: "Dan Vega"
tags:
    - Spring Boot
    - Java
    - Spring AI~~
video: https://www.youtube.com/embed/6VdM1MOOMrw
keywords: Spring AI, OpenAI, chat memory, conversational AI, ChatClient, MessageChatMemoryAdvisor, InMemoryChatMemory, token usage, context window, Spring Framework, Spring Boot, Java
---

As artificial intelligence continues to reshape the software development landscape, creating intelligent and context-aware chatbots has become increasingly important. In this tutorial, we'll explore how to build a chatbot with memory capabilities using Spring AI and OpenAI. By the end, you'll have a solid understanding of how to create a conversational AI application that can maintain context across multiple interactions.

## Understanding Chat Memory in AI Applications

Before we dive into the code, it's crucial to understand the concept of chat memory and why it's essential for building effective conversational AI applications.

When you interact with a large language model (LLM) like GPT-4, the model itself doesn't inherently remember previous interactions. Each request is processed independently, without any context from prior conversations. This stateless nature can lead to disjointed and less engaging interactions.

However, products built on top of these LLMs, like ChatGPT, implement chat memory by storing and managing conversation history. This allows the AI to reference previous messages and maintain context throughout a conversation, resulting in more coherent and contextually relevant responses.

For example, consider this interaction:

1. User: "My name is Alice."
2. AI: "Hello Alice! How can I assist you today?"
3. User: "What's my name?"
4. AI: "Your name is Alice."

In this scenario, the AI remembers the user's name from the first interaction and can recall it in subsequent messages. This is not an inherent capability of the LLM but rather a feature implemented by the chat application.

## Setting Up the Spring AI Project

Let's start by setting up a new Spring Boot project with Spring AI. We'll use Maven as our build tool and Java 23 as our programming language.

First, create a new Spring Boot project using Spring Initializr or your preferred IDE. Make sure to include the following dependencies:

- Spring Web
- Spring AI OpenAI

Your `pom.xml` file should include these dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```

Next, configure your OpenAI API key in the `application.properties` file:

```properties
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.model=gpt-4
```

Make sure to set your OpenAI API key as an environment variable for security reasons.

## Implementing Chat Memory with Spring AI

Now, let's create a `ChatController` class to handle our chatbot interactions:

```java
@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultAdvisors(new MessageChatMemoryAdvisor(new InMemoryChatMemory()))
                .build();
    }

    @GetMapping("/")
    public String chat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }
}
```

Let's break down this code:

1. We use constructor injection to get a `ChatClient.Builder`.
2. We build a `ChatClient` with a `MessageChatMemoryAdvisor` that uses `InMemoryChatMemory`. This setup allows our chatbot to remember previous interactions.
3. The `chat` method handles GET requests to the root endpoint. It takes a `message` parameter and uses the `ChatClient` to generate a response.

The key to implementing chat memory lies in the use of `MessageChatMemoryAdvisor` and `InMemoryChatMemory`. These classes, provided by Spring AI, handle the storage and retrieval of conversation history, allowing our chatbot to maintain context across multiple interactions.

## Testing the Application

To test our chatbot with memory capabilities, run the Spring Boot application and use an HTTP client like cURL or HTTPie to send requests. Here's an example interaction using HTTPie:

```bash
$ http :8080 message=="My name is Bob"
HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8

Hello Bob! It's nice to meet you. How can I assist you today?

$ http :8080 message=="What's my name?"
HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8

Your name is Bob.
```

As you can see, the chatbot remembers the user's name from the first interaction and can recall it in the second interaction, demonstrating the effectiveness of our chat memory implementation.

## Benefits and Use Cases

Implementing chat memory with Spring AI offers several advantages:

1. **Improved User Experience**: By maintaining context, the chatbot can provide more coherent and personalized responses.
2. **Simplified Development**: Spring AI abstracts away the complexities of managing conversation history, allowing developers to focus on building features.
3. **Scalability**: The `InMemoryChatMemory` can be easily replaced with other implementations for different storage backends as your application grows.
4. **Flexibility**: The same approach can be used with different LLM providers, making it easy to switch or compare different AI models.

Some potential use cases for chatbots with memory include:

- Customer support systems that can remember user details and previous issues
- Educational platforms that can track a student's progress across multiple sessions
- Personal assistants that can recall user preferences and past interactions

## Important Considerations: Token Usage and Context Window Limitations

While implementing chat memory can greatly enhance the user experience, it's crucial to be aware of some important limitations and considerations:

### Token Usage

Each interaction stored in the chat memory consumes tokens. Tokens are the basic units that LLMs process, and they roughly correspond to parts of words. As you add more context to each request by including previous interactions, you increase the number of tokens used. This has two main implications:

1. **Cost**: Most AI providers, including OpenAI, charge based on the number of tokens processed. As your chat history grows, so does the cost per request.

2. **Response Time**: Processing more tokens generally takes more time, potentially increasing the latency of your chatbot's responses.

### Context Window Limitations

LLMs have a maximum limit on the number of tokens they can process in a single request, known as the context window. For example:

- GPT-3.5 has a context window of 4,096 tokens
- GPT-4 has a context window of 8,192 tokens for the standard model, and 32,768 tokens for the larger model

When your chat history plus the new user input exceeds this limit, you'll need to implement strategies to manage the context, such as:

- Summarizing previous conversations
- Selectively including only the most relevant past interactions
- Truncating the history to fit within the token limit

### Balancing Memory and Efficiency

To address these challenges, consider implementing the following strategies:

1. **Limit History**: Only include a certain number of previous interactions in the context.

2. **Implement Forgetting**: Gradually reduce the importance of older messages or remove them entirely after a certain point.

3. **Use Embeddings**: Instead of including full message history, use embeddings to capture the essence of previous interactions more efficiently.

4. **Dynamic Context Management**: Adjust the amount of history included based on the complexity of the current interaction or the user's needs.

By being mindful of these considerations, you can create chatbots that balance the benefits of memory with the practical constraints of token usage and context windows, resulting in more efficient and cost-effective AI applications.

## Conclusion

In this tutorial, we've explored how to build an intelligent chatbot with memory capabilities using Spring AI and OpenAI. By leveraging the `MessageChatMemoryAdvisor` and `InMemoryChatMemory`, we've created a chatbot that can maintain context across multiple interactions, providing a more engaging and coherent conversation experience.

The simplicity of implementing chat memory with Spring AI demonstrates the power and flexibility of the framework. As you continue to build and expand your AI applications, consider how maintaining conversation history can enhance the user experience and open up new possibilities for your chatbots.

We encourage you to experiment with this project, perhaps by implementing more complex conversation flows or integrating with different AI models. The world of conversational AI is rapidly evolving, and with tools like Spring AI, you're well-equipped to create the next generation of intelligent chatbots.

As you continue to develop your AI applications, remember to monitor token usage and implement strategies to manage your chat memory efficiently. This will help you create chatbots that are not only intelligent and context-aware but also performant and cost-effective.

Happy coding, and may your chatbots always remember the important stuff – but not too much! 🤖💬🧠💡