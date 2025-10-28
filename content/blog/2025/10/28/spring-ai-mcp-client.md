---
title: "Building MCP Clients with Spring AI: Augmenting LLMs with Custom Context"
description: Learn how to build MCP (Model Context Protocol) clients using Spring AI to augment Large Language Models with custom context and functionality for your applications.
slug: spring-ai-mcp-client
date: 2025-10-28T09:00:00.000Z
published: true
author: Dan Vega
tags:
    - Spring AI
cover: spring_ai_mcp_client.png
# video: https://www.youtube.com/embed/VIDEO_ID
github: https://github.com/danvega/dvaas-client
keywords: Spring AI, MCP, Model Context Protocol, Spring Boot, LLM, AI integration, OpenAI, Spring Framework, Java AI
---

Large Language Models (LLMs) are incredibly powerful, but they have limitations. They can't access your private data, 
don't know about events after their training cutoff, and lack specific domain knowledge about your systems. 
This is where the Model Context Protocol (MCP) comes in and today, we're going to explore how to build MCP clients 
using Spring AI to seamlessly integrate this additional context into your applications.

::GitHubRepo{url="https://github.com/danvega/gqlversion"}
Follow along with the complete working example.
::

## Understanding MCP: The Missing Link for LLMs

Model Context Protocol is essentially an API for LLMs. Just as REST APIs allow services to communicate with each other, 
MCP provides a model-agnostic way to augment LLMs with additional context and functionality. 
Think of it as a standardized way to give your AI applications superpowers they didn't have before.

While I've previously covered [building MCP servers with Spring AI](https://youtu.be/MarSC2dFA9g), today we're 
focusing on the client side. This is crucial when you're building applications that need to:

- Access private or real-time data
- Integrate multiple context sources
- Provide domain-specific knowledge to LLMs
- Add custom functionality beyond the model's base capabilities

## Setting Up Your Spring AI MCP Client

Let's build a practical example using Spring AI 1.1.0 M3, which introduces significant simplifications for working with MCP. 
We'll create a client that connects to an MCP server providing access to custom content that wouldn't normally be 
available to an LLM.

### Project Setup

Start by heading to [start.spring.io](https://start.spring.io) and create a new project with:

- **Spring Boot**: Latest version (3.x)
- **Dependencies**:
    - Spring Web
    - MCP Model Context Protocol Client
    - Your preferred LLM (OpenAI, Anthropic, etc.)

At the time of this blog post we are using a milestone version. You will need to update the Spring AI version in build properties: 

```xml
<properties>
    <java.version>25</java.version>
    <spring-ai.version>1.1.0-M3</spring-ai.version>
</properties>
```

### Configuring the MCP Client

The beauty of Spring AI's approach is how straightforward the configuration is. In your `application.yml`, set up your 
MCP client and connect it to your MCP servers:

```yaml
spring:
  application:
    name: mcp-client-app
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
    mcp:
      client:
        name: my-mcp-client
        version: 0.0.1
        tool-callbacks-enabled: true
        streamable:
          http:
            connections:
              my-server:
                url: https://mcp.example.com/mcp
```

This configuration does several important things:

1. Names your MCP client for identification
2. Enables tool callbacks for function calling
3. Sets up a streamable HTTP connection to your MCP server

Spring AI supports multiple transport mechanisms for MCP:

- **STDIO**: For local MCP servers
- **SSE**: Server-sent events
- **Streamable HTTP**: The preferred approach for production

## Building the Chat Controller

With configuration in place, let's create a controller that leverages our MCP-augmented LLM:

```java
@RestController
public class ChatController {
    
    private static final Logger log = LoggerFactory.getLogger(ChatController.class);
    private final ChatClient chatClient;
    
    public ChatController(ChatClient.Builder builder, ToolCallbackProvider tools) {
        // Log available tools from MCP server
        Arrays.stream(tools.getToolCallbacks())
            .forEach(tool -> log.info("Tool callback found: {}", 
                tool.getToolDefinition()));
        
        // Configure chat client with MCP tools
        this.chatClient = builder
            .defaultToolCallbacks(tools)
            .build();
    }
    
    @GetMapping("/chat")
    public String chat(@RequestParam(defaultValue = "What's the latest content?") 
                       String message) {
        return chatClient.prompt()
            .user(message)
            .call()
            .content();
    }
}
```

This controller automatically discovers and loads all tools provided by your configured MCP servers. The `ToolCallbackProvider` 
is automatically populated by Spring AI based on your MCP configuration.

## Verifying Tool Loading

This is not something you have to do but if you want to run a quick test to verify what tools are being loaded this is
a fun little exercise: 

```java
Arrays.stream(tools.getToolCallbacks())
    .forEach(tool -> log.info("Tool callback found: {}", 
        tool.getToolDefinition()));
```

When you start your application, you should see output like:
```
Tool callback found: blog_posts
Tool callback found: youtube_videos
Tool callback found: newsletter_archives
Tool callback found: speaking_events
```

This confirms that your MCP server's tools are available to your LLM.

## The Power of Context Augmentation

Here's where MCP really shines. Without the MCP server, if you asked an LLM "What are Dan Vega's latest tutorials YouTube?", 
it would only have knowledge up to its training cutoff. With MCP, you can provide real-time, 
accurate information from your own data sources.

Consider this example:

```java
@GetMapping("/latest-videos")
public String getLatestVideos() {
    return chatClient.prompt()
        .user("What are Dan Vega's last 5 videos on YouTube?")
        .call()
        .content();
}
```

Without MCP, this might return outdated or generic information. With an MCP server providing access to a YouTube 
channel's data, it returns actual, current video titles and links.

## Combining Multiple MCP Servers

One of the most powerful features is the ability to connect multiple MCP servers to a single client:

```yaml
spring:
  ai:
    mcp:
      client:
        streamable:
          http:
            connections:
              content-server:
                url: https://content.example.com/mcp
              file-system:
                url: https://files.example.com/mcp
              database-server:
                url: https://db.example.com/mcp
```

This allows you to build sophisticated AI applications that can:

- Access multiple data sources
- Perform file operations
- Query databases
- Integrate with external APIs
- All through a unified interface

## Best Practices for MCP Client Development

### 1. Model Agnostic Design
One of MCP's greatest strengths is its model-agnostic nature. The same MCP client configuration works whether you're using OpenAI, Anthropic, or Google Gemini:

```java
// This code remains the same regardless of the LLM provider
chatClient.prompt()
    .user(message)
    .call()
    .content();
```

### 2. Tool Discovery and Validation

You can always verify that your expected tools are loaded at startup. This helps catch configuration issues early:

```java
@PostConstruct
public void validateTools() {
    Set<String> expectedTools = Set.of("blog", "youtube", "newsletter");
    Set<String> loadedTools = tools.getToolCallbacks().stream()
        .map(t -> t.getToolDefinition().getName())
        .collect(Collectors.toSet());
    
    if (!loadedTools.containsAll(expectedTools)) {
        log.warn("Missing expected tools: {}", 
            Sets.difference(expectedTools, loadedTools));
    }
}
```

## Real-World Applications

MCP clients open up numerous possibilities for AI-powered applications:

1. **Documentation Assistants**: Connect to your project's documentation MCP server to provide accurate, up-to-date help
2. **Data Analysis Tools**: Augment LLMs with real-time access to your databases and analytics
3. **Content Management**: Build AI assistants that can access and reason about your content repositories
4. **Development Tools**: Create coding assistants with access to your codebase and development resources

## Conclusion

Building MCP clients with Spring AI represents a paradigm shift in how we augment LLMs with custom context. 
Instead of trying to work around the limitations of LLMs, we can extend them with exactly the capabilities our 
applications need.

The combination of Spring AI's elegant abstractions and the MCP protocol provides a powerful, model-agnostic way to 
build sophisticated AI applications. Whether you're adding AI capabilities to an existing application or building 
something new from scratch, MCP clients give you the flexibility to provide your LLMs with the context they need 
to be truly useful.

As you build your own MCP clients, remember that the real power comes from composing multiple MCP servers together. 
Start with one server providing essential context, then gradually add more capabilities as your application grows. 
The modular nature of MCP makes this evolution natural and maintainable.

Happy coding, and may your LLMs always have the context they need!