---
title: "Spring AI Tool Search: Stop Wasting Tokens on Tools You Don't Need"
slug: spring-ai-tool-search
description: "Learn how to use Spring AI 2.0's tool search capabilities to dynamically discover tools on demand instead of loading them all into every request, saving tokens and money."
author: "Dan Vega"
tags:
  - Spring AI
  - Spring Boot
keywords:
  - Spring AI tool search
  - Spring AI 2.0
  - tool calling Spring AI
  - Spring AI context window
  - Spring AI token optimization
  - tool search advisor
  - Spring AI MCP tools
  - Spring Boot AI tools
date: 2026-07-09T09:00:00.000Z
published: true
cover: spring-ai-tool-search.jpg
video: https://www.youtube.com/embed/VG00DildlvY
---


Every tool you register with a large language model adds its JSON schema, name, description, and parameters to every single request. Before a user even asks a question, you're paying for those tokens. A typical multi-server setup with MCP connections can easily aggregate 50+ tools consuming 55,000+ tokens right out of the gate. On top of that, tool selection accuracy degrades when models face 30+ similarly-named tools. Spring AI 2.0 introduces a tool search capability that solves both of these problems, and in this post I'll show you exactly how to set it up.

::GitHubRepo{url="https://github.com/danvega/spring-ai-tool-search"}
Follow along with the complete working example.
::

## The Problem: Every Tool Costs You Tokens

Think about how tool calling works today. When you register tools with your chat client, each tool's full definition gets serialized into the request. That includes the tool name, a description of what it does, and the JSON schema for its parameters. For a simple question like "What is the capital of Ohio?" that requires zero tools, you might only need 48 tokens. But if you've loaded 47 tools into the context? That same question now costs you 5,141 tokens.

That's over 100x more tokens for a question that didn't even need a single tool call. And you're paying for that overhead on every request.

As AI agents connect to more services (Slack, GitHub, Jira, MCP servers), your tool libraries grow rapidly. You can't keep loading everything into every request. You need a smarter approach.

## How Tool Search Works

The tool search pattern in Spring AI 2.0 takes a different approach to tool registration. Instead of loading every tool into the context, it loads just one tool: the tool search tool itself. Here's the flow:

1. The model receives only a single search tool initially (minimal token usage)
2. When the model determines it needs a capability, it searches using a natural language query
3. Matching tool definitions are dynamically expanded into the context
4. The model then invokes the discovered tools as it normally would

The [Spring AI documentation](https://docs.spring.io/spring-ai/reference/2.0-SNAPSHOT/api/tools/tool-search-tool.html) covers this pattern in detail. There are three search strategies available out of the box through the `ToolIndex` interface: **semantic** (vector-based), **keyword**, and **regex**. For this tutorial, we'll use the vector-based approach because I've found it to be the most effective for natural language tool discovery.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with:

- **Spring Boot**: 4.1.0 (or later)
- **Dependencies**: Spring Web, your LLM provider (I'm using Anthropic)
- **Java**: 24+

One important note: the tool search capabilities had a small bug in the Spring AI 2.0 GA release. They work correctly in the 2.0.1 snapshot. If you're reading this after 2.0.1 has been released, you can skip the snapshot configuration.

To use the snapshot, update your `pom.xml` with the snapshot version and add the Spring snapshot repository:

```xml
<properties>
    <spring-ai.version>2.0.1-SNAPSHOT</spring-ai.version>
</properties>

<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
    </repository>
    <repository>
        <id>spring-snapshots</id>
        <name>Spring Snapshots</name>
        <url>https://repo.spring.io/snapshot</url>
    </repository>
</repositories>
```

You'll also need these additional dependencies beyond your LLM provider:

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-tool-search-advisor</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-vector-store-simple</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-transformers</artifactId>
</dependency>
```

The first dependency enables the tool search advisor. The second provides a simple in-memory vector store (you could substitute pgVector or another vector store in production). The third provides the embedding model needed for semantic search.

## Seeing the Problem First-Hand

Before we wire up tool search, let's see the problem in action. I created an `InatechTools` class with 47 tools representing various capabilities a large system might have. These include things like getting the current date/time, submitting time off requests, searching flights, and dozens more. The actual implementations aren't important for this demo. What matters is the volume.

I also created two custom advisors for visibility: `AvailableToolsLoggingAdvisor` logs which tools are visible to the model, and `TokenCounterAdvisor` tracks token usage per request. In production you'd use proper observability and metrics, but these help us see the before and after.

Here's the controller that demonstrates the problem:

```java
@RestController
public class ChatController {

    private static final String DEFAULT_QUESTION = "What is tomorrow's date?";

    private final ChatClient chatClient;
    private final InatechTools tools;

    public ChatController(ChatClient.Builder builder, InatechTools tools) {
        this.chatClient = builder.build();
        this.tools = tools;
    }

    @GetMapping("/before")
    public String before(@RequestParam(defaultValue = DEFAULT_QUESTION) String message) {
        return chatClient.prompt()
                .user(message)
                .advisors(new TokenCounterAdvisor(), new AvailableToolsLoggingAdvisor())
                .call()
                .content();
    }

    @GetMapping("/after")
    public String after(@RequestParam(defaultValue = DEFAULT_QUESTION) String message) {
        return chatClient.prompt()
                .user(message)
                .tools(tools)
                .advisors(new TokenCounterAdvisor(), new AvailableToolsLoggingAdvisor())
                .call()
                .content();
    }
}
```

The `/before` endpoint sends the question with no tools. The `/after` endpoint loads all 47 tools into the request. When you call `/before`, the console shows:

```
Tool calls visible to the model: 0
Tokens - prompt: 17, completion: 30, total: 47
```

When you call `/after` with all 47 tools loaded:

```
Tool calls visible to the model: 47
Tokens - prompt: 5,100+, completion: 66, total: 5,166
```

The model did find and call the correct tool (`platform_get_current_date_time`) to answer "What is tomorrow's date?" But we paid for all 47 tool definitions when we only needed one.

## Configuring Tool Search

Now let's fix this. The configuration lives in your `application.yaml`:

```yaml
spring:
  ai:
    anthropic:
      api-key: ${ANTHROPIC_API_KEY}
      chat:
        options:
          model: claude-opus-4-0808
    chat:
      client:
        tool-search-advisor:
          enabled: true
          tool-index-type: vector
          max-results: 3
          reference-tool-name-accumulation: true
```

Let's break down what each property does:

- **enabled**: Turns on the tool search advisor
- **tool-index-type**: Set to `vector` for semantic search over tool names and descriptions. You could also use `keyword` or `regex`
- **max-results**: Limits how many tools get loaded per search. I set this to 3 because even if several tools seem related, I don't want to bloat the context
- **reference-tool-name-accumulation**: When set to `true`, tools discovered earlier in a conversation stay available for multi-step tasks so the model doesn't have to search for them again

You'll also need to provide a `VectorStore` bean. Since we're using the simple in-memory vector store, this goes in your main application class (or any `@Configuration` class):

```java
@Bean
public VectorStore vectorStore(EmbeddingModel embeddingModel) {
    return SimpleVectorStore.builder(embeddingModel).build();
}
```

## Using Tool Search in the Controller

With the configuration in place, add a new endpoint that takes advantage of tool search:

```java
@GetMapping("/tool-search")
public String toolSearch(@RequestParam(defaultValue = DEFAULT_QUESTION) String message) {
    return chatClient.prompt()
            .user(message)
            .tools(tools)
            .advisors(new TokenCounterAdvisor(), new AvailableToolsLoggingAdvisor())
            .advisors(a -> a.param(
                    ChatMemory.CONVERSATION_ID,
                    UUID.randomUUID().toString()))
            .call()
            .content();
}
```

The key difference here is the conversation ID parameter. The tool search advisor needs a way to track sessions for tool accumulation. Without this, you'll see an error in the console. Using `UUID.randomUUID()` gives each request its own session. In a real application, you'd tie this to your user's session or conversation.

## The Results

Restart the application and call the `/tool-search` endpoint. You'll still get the correct answer: "Today is July 14, so tomorrow is July 15." But look at the console output:

```
Tool calls visible to the model: 1 (tool_search)
Search query: "get current date and time"
Search results: platform_get_current_date_time, hr_submit_time_off, search_flights_for_travel
Selected tool: platform_get_current_date_time
Tokens - prompt: ~1,000, completion: ~166, total: ~1,166
```

Here's what happened:

1. The model started with only one tool visible: the tool search tool
2. It recognized it needed date/time capabilities and searched with a natural language query
3. The vector search returned three relevant tools (our max results limit)
4. The model selected `platform_get_current_date_time` as the right tool and called it
5. Total token usage: roughly 1,166 compared to 5,166 before

That's about 5x fewer tokens for the same correct result. Scale that across thousands of requests per day, and you're looking at significant cost savings.

## When to Use Tool Search

Tool search is a great fit when:

- You have **10 or more tools** registered in your system
- Tool definitions are consuming **more than 10,000 tokens**
- You're building **MCP-powered systems** with multiple servers
- You're experiencing **tool selection accuracy issues** with large tool sets

You probably don't need it when:

- You only have a handful of tools
- All tools are frequently used in every session
- Tool definitions are very compact

## Wrapping Up

Spring AI 2.0's tool search capability is a practical solution to a real problem that grows as AI applications mature. Instead of loading every tool into every request and hoping the model picks the right one, you let it discover what it needs on demand. The result is lower token usage, lower costs, and better tool selection accuracy.

The setup is straightforward: add the tool search advisor dependency, configure your search strategy, provide a vector store bean, and make sure you're passing a conversation ID. From there, everything works transparently with your existing tools.

If you want to see this built step by step, check out the video version of this tutorial on my [YouTube channel](https://www.youtube.com/@danvega). And if you want to explore the other new features in Spring AI 2.0 (unified tool calling, Spring Boot 4 support, Jackson 3, JSpecify null safety), stay tuned for more posts in this series.

Happy Coding!