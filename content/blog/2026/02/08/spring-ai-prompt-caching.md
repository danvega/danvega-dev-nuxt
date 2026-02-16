---
title: "Spring AI Prompt Caching: Stop Wasting Money on Repeated Tokens"
slug: spring-ai-prompt-caching
date: 2026-02-09T09:00:00.000Z
published: true
excerpt: "Learn how to implement prompt caching in Spring AI to dramatically reduce your Anthropic API costs by caching system prompts and tools that don't change between requests."
author: Dan Vega
tags:
  - Spring AI
video: https://www.youtube.com/embed/eYb7BKW4QcU
keywords: spring ai prompt caching, anthropic prompt caching, claude api cost reduction, spring ai cache strategy, spring boot ai tutorial
---

If you have an unlimited budget to spend on AI, you probably don't need to read this. If you don't like saving money, feel free to skip this one. But if you're like me and want to reduce your AI application costs, prompt caching is a technique you need to know about.

Prompt caching lets you cache certain parts of your prompts so you're not paying full price to process the same content over and over. With Anthropic's Claude models, this can save you up to 90% on cached tokens. Let me show you how to implement this in Spring AI.

::GitHubRepo{url="https://github.com/danvega/promptcache"}
Follow along with the complete working example.
::

## Understanding the Context Window

Before we get into caching, let's understand what goes into a context window when you interact with a Large Language Model (LLM).

The context window contains several components:

- **System message**: The overall context and guardrails for your conversation
- **User prompt**: The question you're asking
- **Assistant message**: The response you get back
- **Tools**: Tool names, definitions, and schemas if you're using function calling

When you have a back-and-forth conversation, the user questions and responses change with each request. These typically can't be cached. But the system message and tools? Those usually stay the same across requests.

Think about it: your system message probably defines the context of what your application does, maybe includes some guardrails, and could be quite long. But it doesn't change on every request. The user question is what changes.

## How Prompt Caching Saves Money

When you look at API pricing, you'll see costs for input tokens and output tokens. There's also a separate (much cheaper) cost for cached tokens.

Here's how it works:

1. **Request 1**: System prompt comes in, user question comes in. You mark the system prompt for caching. Full price for everything.
2. **Request 2**: Instead of processing that same system prompt at full price, you get a cache hit. Only the user question incurs the full cost.

For Claude Sonnet 4.5, you can see a 90% savings on cached tokens. When you're building applications that send the same system context repeatedly, those savings add up fast.

There's a great article on the [Spring Blog about prompt caching with Anthropic](https://spring.io/blog/2025/10/27/spring-ai-anthropic-prompt-caching-blog) that covers the theory in depth.

## Building a Spring AI Application with Prompt Caching

Let's build an application that generates social media posts for video announcements. We'll use a substantial system prompt that defines how the content should be formatted for different platforms.

### Project Setup

Head over to [start.spring.io](https://start.spring.io) and create a new project:

- **Group**: dev.danvega
- **Artifact**: promptcache
- **Java**: 25 (or your preferred version)
- **Dependencies**: Spring Web, Anthropic Claude

### Configure Your API Key

In `application.yaml`, add your Anthropic API key:

```yaml
spring:
  ai:
    anthropic:
      api-key: ${ANTHROPIC_API_KEY}
```

Externalize this to an environment variable so you don't accidentally commit your credentials.

### Create the System Prompt

Create a file called `system-prompt.txt` in your `src/main/resources` directory. This needs to be substantial because prompt caching has minimum token requirements (short prompts won't be cached).

Here's an abbreviated version of what I use for generating social media posts:

```text
You are a content strategist specializing in developer advocacy and technical content promotion.
Your role is to create engaging social media posts that announce new video content.

You may receive one or more of the following:
- A video title
- A description
- A URL
- A transcript

Generate platform-specific posts optimized for:
- X (formerly Twitter): Concise, use hashtags sparingly, include call-to-action
- Blue Sky: Conversational tone, community-focused
- LinkedIn: Professional but approachable, longer format acceptable

[... additional guidelines for tone, format, etc.]
```

The actual system prompt in my application is much longer. The key point is that it stays the same across requests while the video details change.

### Build the Chat Controller

Now for the interesting part. Create a `ChatController` class:

```java
@RestController
public class ChatController {

    private final ChatClient chatClient;
    private final String systemPrompt;

    public ChatController(ChatClient.Builder builder, @Value("classpath:system-prompt.txt") Resource systemPromptResource) throws IOException {
        this.chatClient = builder.build();
        this.systemPrompt = systemPromptResource.getContentAsString(StandardCharsets.UTF_8);
    }
}
```

We're loading the system prompt from the text file using Spring's `@Value` annotation with a `Resource`.

### Configure Anthropic Cache Options

Here's where the magic happens. We need to set up cache options that tell Anthropic what to cache:

```java
@GetMapping("/")
public String chat() {
    var chatOptions = AnthropicChatOptions.builder()
            .model(AnthropicApi.ChatModel.CLAUDE_SONNET_4_5)
            .cacheOptions(AnthropicCacheOptions.builder()
                    .strategy(AnthropicCacheStrategy.SYSTEM_ONLY)
                    .build())
            .build();
    
    // ... rest of the method
}
```

The `AnthropicCacheStrategy` enum gives you several options:

- `NONE`: No caching
- `CONVERSATION_HISTORY`: Cache the conversation
- `SYSTEM_ONLY`: Cache just the system message
- `SYSTEM_AND_TOOLS`: Cache system message and tool definitions
- `TOOLS_ONLY`: Cache only tool definitions

For our use case, `SYSTEM_ONLY` is what we want since we're caching that large system prompt.

### Make the Chat Request

Now we can build the full request:

```java
@GetMapping("/")
public String chat() {
    var chatOptions = AnthropicChatOptions.builder()
            .model(AnthropicApi.ChatModel.CLAUDE_SONNET_4_5)
            .cacheOptions(AnthropicCacheOptions.builder()
                    .strategy(AnthropicCacheStrategy.SYSTEM_ONLY)
                    .build())
            .build();

    String userPrompt = """
            Generate platform specific posts for X, Blue Sky and LinkedIn.
            Here's the information:
            Title: {title}
            URL: {url}
            Description: {description}
            """;

    ChatResponse response = chatClient.prompt()
            .system(systemPrompt)
            .user(u -> u.text(userPrompt)
                    .param("title", "Spring AI Prompt Caching")
                    .param("url", "https://youtube.com/watch?v=example")
                    .param("description", "Learn how to save money on your AI API costs"))
            .options(chatOptions)
            .call()
            .chatResponse();

    // Log cache usage
    AnthropicApi.Usage usage = (AnthropicApi.Usage) response.getMetadata().getUsage().getNativeUsage();
    if (usage != null) {
        System.out.println("Cache creation: " + usage.cacheCreationInputTokens());
        System.out.println("Cache read: " + usage.cacheReadInputTokens());
    }

    return response.getResult().getOutput().getText();
}
```

A few things to note:

1. We pass the `systemPrompt` using the `.system()` method
2. We include our `chatOptions` using the `.options()` method
3. We get the full `ChatResponse` instead of just the content so we can inspect the cache metadata

### Verify Caching is Working

Run your application and make a request:

```bash
http localhost:8080/
```

Check your console output. On the first request, you should see something like:

```
Cache creation: 1421
Cache read: 0
```

This tells you that 1,421 tokens were written to the cache. The cache read is zero because we haven't read from it yet.

Make the same request again:

```
Cache creation: 0
Cache read: 1421
```

Now the cache creation is zero (nothing new to cache) and we're reading those 1,421 tokens from the cache at the reduced rate.

## Why This Matters for Production

In a high-throughput application, those cached tokens add up quickly. Let's say you have:

- A 2,000 token system prompt
- 1,000 requests per day

Without caching, that's 2 million input tokens per day just for system prompts. With caching and a 90% discount on cached reads, you're saving a significant amount on your API bill.

The implementation is straightforward in Spring AI. You set up your cache strategy, make sure you're passing in your options correctly, and Spring AI handles the rest.

## Common Gotchas

When I first tried this, my cache creation and cache read were both zero. Two things I had forgotten:

1. **Include the system prompt**: Make sure you're calling `.system(systemPrompt)` on your chat client
2. **Pass the options**: Don't forget `.options(chatOptions)` or the caching configuration won't be applied

Also remember that there are minimum token requirements for caching. A tiny system prompt might not meet the threshold.

## Conclusion

Prompt caching is one of those optimizations that's easy to implement but can have a big impact on your costs. If you're building Spring AI applications with Anthropic's Claude models and you have system prompts or tool definitions that don't change between requests, start caching them.

The code is minimal. You configure your cache strategy, pass in your options, and you're done. Your wallet will thank you.

Happy Coding!