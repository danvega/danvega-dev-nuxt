---
title: "Calling Multiple LLMs with Spring AI: A Practical Guide"
description: "Learn how to integrate and call multiple Large Language Models (LLMs) like OpenAI's GPT-4 and Anthropic's Claude in a single Spring Boot application using Spring AI. This tutorial covers project setup, configuration, and implementation of separate controllers for each LLM."
slug: spring-ai-multiple-llms
date: 2024-10-14T09:00:00.000Z
published: true
author: "Dan Vega"
tags:
    - Spring Boot
    - Java
    - Spring AI
video: https://www.youtube.com/embed/bK1MTlEDQvk
keywords: Spring AI, multiple LLMs, OpenAI, Anthropic, ChatClient, Spring Framework, Spring Boot, Java, GPT-4, Claude
---

In the rapidly evolving world of AI-powered applications, developers often find themselves needing to leverage multiple Large Language Models (LLMs) within a single project. Whether it's to compare outputs, utilize specific strengths of different models, or provide fallback options, the ability to seamlessly integrate multiple LLMs can be a game-changer. Thanks to Spring AI, this process is now more straightforward than ever. In this post, we'll explore how to call multiple LLMs, specifically OpenAI's GPT-4 and Anthropic's Claude, within a Spring Boot application.

## Why Use Multiple LLMs?

Before diving into the implementation, let's consider why you might want to use multiple LLMs in your application:

1. **Comparative Analysis**: Different models may excel in various tasks. By using multiple LLMs, you can compare outputs and choose the best result.
2. **Specialized Capabilities**: Some models might be better at certain tasks, like code generation or creative writing.
3. **Redundancy**: Having multiple LLMs can provide fallback options if one service is unavailable or rate-limited.
4. **Cost Optimization**: Different providers have varying pricing models. You can route requests to the most cost-effective option based on the task.

## Setting Up the Project

Let's start by creating a new Spring Boot project using Spring Initializr. Here are the key details:

- Project: Maven
- Language: Java
- Spring Boot: 3.3.4 (or the latest version)
- Java Version: 23
- Dependencies: Spring Web, Spring AI OpenAI

After generating the project, we need to add the Anthropic dependency manually to our `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-anthropic-spring-boot-starter</artifactId>
    <version>0.8.0-SNAPSHOT</version>
</dependency>
```

Next, let's configure our `application.properties`:

```properties
spring.ai.chat.client.enabled=false
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.chat.model=gpt-4
spring.ai.anthropic.api-key=${ANTHROPIC_API_KEY}
spring.ai.anthropic.chat.model=claude-3-sonnet-20240229
```

Note that we're disabling the auto-configuration for `ChatClient` and using environment variables for API keys to keep our credentials secure.

## Configuring Multiple ChatClients

With auto-configuration disabled, we need to manually create bean definitions for each `ChatClient`. We can do this in our main application class:

```java
@SpringBootApplication
public class TwoLlmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(TwoLlmsApplication.class, args);
    }

    @Bean
    public ChatClient openAIChatClient(OpenAiChatModel chatModel) {
        return ChatClient.create(chatModel);
    }

    @Bean
    public ChatClient anthropicChatClient(AnthropicChatModel chatModel) {
        return ChatClient.create(chatModel);
    }
}
```

This configuration creates two separate `ChatClient` beans, one for OpenAI and one for Anthropic.

## Implementing Controllers

Now, let's create controllers to interact with each LLM. We'll start with the OpenAI controller:

```java
@RestController
public class OpenAiChatController {

    private final ChatClient chatClient;

    public OpenAiChatController(@Qualifier("openAIChatClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping("/openai")
    public String openAi() {
        return chatClient.prompt()
                .user("Tell me an interesting fact about OpenAI")
                .call()
                .content();
    }
}
```

Notice the use of `@Qualifier` to specify which `ChatClient` bean to inject. This ensures we're using the correct client for OpenAI.

Similarly, let's create an Anthropic controller:

```java
@RestController
public class AnthropicChatController {

    private final ChatClient chatClient;

    public AnthropicChatController(@Qualifier("anthropicChatClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping("/claude")
    public String claude() {
        return chatClient.prompt()
                .user("Tell me an interesting fact about Anthropic")
                .call()
                .content();
    }
}
```

## Testing the Application

With our controllers in place, we can now run the application and test our endpoints. Here's how you can make requests to each LLM:

```bash
# OpenAI endpoint
curl http://localhost:8080/openai

# Anthropic endpoint
curl http://localhost:8080/claude
```

Each request will return an interesting fact about the respective company, demonstrating that we're successfully communicating with two different LLMs in the same application.

## Conclusion

Integrating multiple LLMs into a single Spring Boot application is remarkably straightforward with Spring AI. By disabling auto-configuration and manually defining our `ChatClient` beans, we gain the flexibility to work with multiple AI providers simultaneously. This approach opens up a world of possibilities for creating more robust, versatile AI-powered applications.

Some potential use cases for this setup include:

- Creating a chatbot that can switch between models based on the complexity of the query
- Implementing a content generation system that leverages different models for various types of content
- Building a code assistant that uses specialized models for different programming languages

As you explore the possibilities of multiple LLMs in your Spring applications, remember to consider factors like rate limiting, error handling, and response caching to create a production-ready system.

Have you experimented with multiple LLMs in your projects? What challenges or benefits have you encountered? Share your experiences in the comments below!

Happy coding, and may your AI adventures be ever fruitful!