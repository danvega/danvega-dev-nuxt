---
title: "X (Twitter) MCP Servers with Spring AI: Search Posts and Query Docs Programmatically"
slug: x-twitter-mcp-servers-spring-ai
description: "X just released MCP servers for their API and developer documentation. Learn how to build a Spring Boot MCP client that searches X posts and queries their docs using Spring AI."
author: "Dan Vega"
tags:
  - Spring AI
  - MCP
  - Spring Boot
keywords:
  - X MCP server
  - Spring AI MCP client
  - X API Spring Boot
  - MCP server Spring AI
  - Twitter API MCP
  - context engineering
  - Spring Boot 4.1
  - Spring AI 2.0
  - streamable HTTP MCP
  - X developer API
date: 2026-07-01T09:00:00.000Z
published: true
cover: x-twitter-mcp-servers-spring-ai.jpeg
video: https://www.youtube.com/embed/j4chxGtqkY8
---


X (formerly Twitter) just dropped something exciting for the AI developer community: two MCP servers that give your AI agents access to one of the largest real-time information sources on the planet. One server handles X API documentation, and the other lets you call the X API directly to search posts, look up users, check bookmarks, trends, and more.

If you've been working with large language models, you know that context is everything. We've moved beyond prompt engineering into the world of context engineering, where providing the right context at the right time makes the difference between a helpful response and a hallucination. These MCP servers solve that problem for anything related to X.

Today I'll walk you through building a Spring Boot application that consumes both of these MCP servers using Spring AI. If you'd prefer to watch this tutorial, you can check out the [video version on YouTube](https://youtu.be/j4chxGtqkY8).

::GitHubRepo{url="https://github.com/danvega/xmcp"}
Follow along with the complete working example.
::

## What X Released and Why It Matters

X announced two MCP servers:

**X Docs MCP Server** lets you search and read X API documentation. This is useful when you want your model to have access to the latest docs so it can correctly answer questions about endpoints, parameters, and authentication. No authentication required.

**X API MCP Server** calls X API endpoints directly. You can search through posts, look up users, check bookmarks, trends, news, and more. This one requires a bearer token from the [X Developer Portal](https://developer.x.com).

Both servers use the streamable HTTP transport. The X API exposes a hosted server, so there's nothing to install or run locally. If you're using the app-only bearer token approach (which is what we'll do today), you don't need the XRL bridge for OAuth. You just paste your bearer token into the authorization header and you're good to go with read-only endpoints.

The beauty of MCP (Model Context Protocol) is that any client that supports the protocol can use these servers. You could plug the docs server into Claude AI, Cursor, or any other MCP-compatible tool right now. But let's bring this into the Spring ecosystem and build something we can control programmatically.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with these settings:

- **Language:** Java
- **Build:** Maven
- **Spring Boot:** 4.1.0
- **Group:** dev.danvega
- **Artifact:** mcpx
- **JDK:** 17 or later (I'm using JDK 26)

For dependencies, add:

- **Spring Web** for our REST endpoints
- **MCP Client** (Model Context Protocol Client) since we're consuming MCP servers, not building one
- **Anthropic** (or whichever LLM provider you prefer)

The code we write works identically regardless of which LLM you choose. Spring AI lets you write to an abstraction, so swapping from Anthropic to OpenAI or an open-source model running through Ollama requires only a configuration change.

## Configuring the Application

Let's start with `application.yaml`, where we'll configure our LLM, MCP servers, and logging.

```yaml
spring:
  ai:
    anthropic:
      api-key: ${ANTHROPIC_API_KEY}
      chat:
        options:
          model: claude-opus-4-20250514
    mcp:
      client:
        enabled: true
        name: XDocsClient
        version: 1.0.0
        request-timeout: 30s
        type: sync
        streamable-http:
          connections:
            x-docs:
              url: https://docs.x.com
            x-api:
              url: https://api.x.com

x:
  bearer-token: ${X_BEARER_TOKEN}

logging:
  level:
    dev.danvega: info
    org.springframework.ai: info
    org.springframework.ai.model.tool.DefaultToolCallingManager: debug
```

A few things to note here. The MCP client configuration defines two streamable HTTP connections. The `x-docs` connection points to the documentation server and needs no authentication. The `x-api` connection points to the API server and will need a bearer token, which we'll handle in a separate configuration class.

The debug logging on `DefaultToolCallingManager` is optional but helpful. It lets you see in the console when the model decides to invoke a tool, which confirms that MCP is working correctly.

## Creating the ChatClient Bean

Before building any controllers, we need a `ChatClient` bean that has access to the tools exposed by our MCP servers. We'll create this in the main application class so it can be injected anywhere.

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    ChatClient chatClient(ChatClient.Builder builder, ToolCallbackProvider tools) {
        return builder
                .defaultTools(tools)
                .build();
    }
}
```

The `ToolCallbackProvider` is the key piece here. Spring AI provides implementations like `SyncMcpToolCallbackProvider` that automatically discover the tools exposed by your configured MCP servers. By passing these as default tools to the `ChatClient`, every prompt we send will have access to all the MCP tools without needing to specify them each time.

## Demo 1: Querying the X Documentation

For the first demo, we'll create a controller that asks questions about the X API documentation. The docs MCP server requires no authentication, so this is the simpler of the two examples.

```java
@RestController
public class DocsController {

    private static final Logger log = LoggerFactory.getLogger(DocsController.class);
    private final ChatClient chatClient;

    public DocsController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping(value = "/docs", produces = "text/plain")
    public String docs() {
        String question = """
                Using the X API docs, how do I look up a user and find the number
                of followers they have? Give me the endpoint, the key query
                parameters, keep it short.
                """;

        log.info("Asking the X docs server: {}", question);

        return chatClient.prompt()
                .user(question)
                .call()
                .content();
    }
}
```

When you hit `http://localhost:8080/docs`, the model receives our question and recognizes it has a tool available for searching the X documentation. It invokes that tool, gets the relevant documentation content, and then formulates a response with the correct endpoint, query parameters, and an example.

The response comes back with the exact endpoint you'd need (`GET /2/users/by/username/:username`), the relevant query parameters like `user.fields=public_metrics`, and a short example. This is real, up-to-date documentation, not something the model memorized during training.

## Demo 2: Searching X Posts with the API

The API MCP server requires authentication. X supports two approaches: a full OAuth flow using the XRL bridge, or a simpler app-only bearer token. For read-only operations like searching posts, the bearer token approach works great.

### Adding the Authentication Customizer

Spring AI 2.0 doesn't have a per-connection headers property for MCP, so we use an `McpClientCustomizer` bean to inject the bearer token on every request to `api.x.com`.

```java
@Configuration
public class XApiAuthConfig {

    /**
     * Adds the X API app-only bearer token to MCP requests bound for api.x.com.
     */
    @Bean
    McpClientCustomizer xApiBearerCustomizer(@Value("${x.bearer-token}") String token) {
        return (id, spec) -> spec.requestInterceptor((method, uri, headers, body) -> {
            if (token != null && !token.isBlank()
                    && uri.getHost().equals("api.x.com")) {
                headers.set("Authorization", "Bearer " + token);
            }
        });
    }
}
```

This customizer checks that we have a token and that the request is going to `api.x.com` before adding the authorization header. This is important because you don't want to accidentally send your bearer token to a different host.

### Building the Search Controller

With authentication in place, the controller looks almost identical to the docs controller.

```java
@RestController
public class XApiController {

    private static final Logger log = LoggerFactory.getLogger(XApiController.class);
    private final ChatClient chatClient;

    public XApiController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping(value = "/search", produces = "text/plain")
    public String search(@RequestParam(defaultValue = "Spring Boot 4.1") String topic) {
        String question = """
                Search X for recent posts about %s.
                Give me a quick read on what developers are talking about.
                Pull in a few themes and mention anything notable. Keep it tight.
                """.formatted(topic);

        log.info("Asking X for recent posts about: {}", topic);

        return chatClient.prompt()
                .user(question)
                .call()
                .content();
    }
}
```

The `topic` parameter defaults to "Spring Boot 4.1" but can be anything you pass in as a query parameter. When you call `http://localhost:8080/search?topic=Spring+Boot+4.1`, the model identifies the `search_posts_all` tool from the MCP server and uses it to find recent posts.

The response includes real themes from actual developer conversations. When I ran this, it pulled back discussions about new features like Spring Boot gRPC support, lazy JDBC connections, Redis listener improvements, and built-in SSRF protection.

### Verifying Tool Invocation

Thanks to the debug logging we configured earlier, you'll see output like this in your console:

```
Asking X for recent posts about: Spring Boot 4.1
Executing tool call: search_posts_all
```

This confirms that the model recognized it needed a tool, selected the correct one from the MCP server, and successfully invoked it. Without this logging, you might wonder whether the model used its training data or actually called the API.

## What You'll Need to Run This

Before running the application, make sure you have:

1. **An Anthropic API key** (or API key for whichever LLM provider you chose). Set it as the `ANTHROPIC_API_KEY` environment variable.
2. **An X bearer token** from the [X Developer Portal](https://developer.x.com). Create an app there to get your token, then set it as the `X_BEARER_TOKEN` environment variable.

You can export these in your terminal:

```bash
export ANTHROPIC_API_KEY=your-key-here
export X_BEARER_TOKEN=your-token-here
```

Or configure them in your IDE's run configuration.

## Using These MCP Servers Outside of Spring

One thing worth mentioning is that you can use these MCP servers with any MCP-compatible client, not just Spring AI. The docs server in particular is useful to plug into tools you already use.

For example, in Claude AI, you can add the X Docs MCP server as a connector using the URL `https://docs.x.com/mcp`. Once connected, you can ask Claude questions about the X API and it will search the documentation directly rather than relying on its training data.

## Why MCP Matters for Context Engineering

MCP servers aren't a silver bullet for every AI integration problem. There are other patterns like skills and function calling that serve different purposes. But MCP servers solve a real problem: getting relevant, up-to-date context into your LLM interactions.

Instead of your model guessing based on potentially outdated training data, it can pull live information from authoritative sources. The X documentation server gives you accurate API reference material. The X API server gives you real-time data from the platform. Both feed directly into your model's reasoning process through a standardized protocol.

The protocol itself is what makes this powerful. X built these servers once, and any client that speaks MCP can consume them. Spring AI, Claude, Cursor, or whatever tool comes next.

## Wrapping Up

We built a Spring Boot 4.1 application with Spring AI 2.0 that connects to two MCP servers from X. The docs server required no authentication and let us query the X API documentation programmatically. The API server needed a bearer token (handled through an `McpClientCustomizer`) and let us search real posts on the platform.

The code for both controllers is nearly identical because Spring AI abstracts away the complexity. You configure your MCP connections, set up a `ChatClient` with the available tools, and let the model decide when to invoke them.

If you want to take this further, you could explore the full OAuth flow using the XRL bridge for user-specific operations like managing bookmarks or posting. You could also combine these MCP servers with other tools to build more capable agents.

Happy Coding!