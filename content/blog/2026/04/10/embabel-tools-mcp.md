---
title: "Embabel MCP Servers and Tools: Supercharging Your Agentic Flows on the JVM"
slug: embabel-mcp-servers-and-tools
date: "2026-04-10T08:00:00.000Z"
published: true
description: "Learn how to add tools and MCP servers to your Embabel agents in Java. Build a blog writing agent that can research topics, calculate reading time, and generate front matter."
tags:
  - Spring AI
  - Embabel
  - Java
keywords:
    - embabel tools
    - embabel mcp server
    - embabel java agent
    - spring ai tools
    - agentic flows jvm
cover: embabel_tools_mcp.jpg
video: https://www.youtube.com/embed/2mGr7kdstJs
---

Large language models (LLMs) are impressive, but they hallucinate. The way to fix that is by giving them context and actions through tools and MCP servers. If you've been following along with Embabel, a framework for building agentic flows on the JVM, you already know how to set up a basic agent with a couple of actions. Now it's time to make that agent actually useful by wiring in tools it can call and MCP servers it can query for real-time information.

::GitHubRepo{url="https://github.com/danvega/blog-agent"}
Follow along with the complete working example.
::

## What We're Building

In a [previous post](https://www.danvega.dev/blog/embabel-first-look), we built a simple blog writing agent with two actions: write a draft and review it. That's a fine start, but a real blog writing workflow needs more. We need to research the topic before writing, generate a TLDR summary, calculate reading time, and produce front matter metadata.

By the end of this post, our agent will have the following capabilities:

- **Research a topic** using a Brave web search MCP server
- **Write a draft** informed by that research
- **Review and polish** the draft
- **Add a TLDR summary** to the top
- **Generate front matter** (title, slug, tags, keywords, reading time) using a custom tool

Each of these is an Embabel "action," and the framework figures out the execution order based on the types each action consumes and produces. You define the goal, and Embabel plans how to get there.

## Adding Logging Personalities

Before we get into the heavy stuff, Embabel has a fun feature worth mentioning. You can configure logging personalities in your `application.yaml`:

```yaml
embabel:
  logging:
    personality: star-wars
```

Available personalities include Star Wars, Colossus, Hitchhiker, Monty Python, and Severance. When you run your application with the Star Wars personality, you'll see Yoda quotes and references scattered throughout your console logs. It's not production-critical, but it makes development a lot more enjoyable.

## Defining the Domain Types

Embabel agents work by transforming types. Each action takes one type as input and produces another. The framework uses these type relationships to build an execution plan toward your stated goal.

Our blog post domain starts with a sealed interface:

```java
public sealed interface BlogPost permits DraftPost, FinalPost, PublishedPost {
}
```

Each stage of the writing process has its own record:

```java
public record ResearchedTopic(String topic, String research) {}

public record DraftPost(String title, String content) implements BlogPost {}

public record FinalPost(String title, String content, String feedback) implements BlogPost {}

public record FrontMatter(String description, List<String> tags, List<String> keywords, String readingTime) {}

public record PublishedPost(String title, String content, String feedback) implements BlogPost {}
```

The `ResearchedTopic` feeds into the draft. The `DraftPost` gets reviewed into a `FinalPost`. The `FinalPost` gets a TLDR and front matter to become a `PublishedPost`. Embabel traces these relationships automatically.

## Creating a Custom Tool for Reading Time

Tools in AI are functions that the LLM can invoke when it needs capabilities beyond text generation. Our agent needs to calculate how long a blog post takes to read, and that's pure math, not something a language model should guess at.

Here's the reading stats tool:

```java
@Component
public class ReadingStatsTool {

    private static final int WORDS_PER_MINUTE = 200;

    @LlmTool("Calculate the word count and estimated reading time in minutes for a piece of text. Reading speed is assumed to be 200 words per minute.")
    public String calculateReadingStats(
            @LlmTool.Param("The full text of the blog post to analyze") String text) {

        if (text == null || text.isEmpty()) {
            return "0 words, 0 minute read";
        }

        int words = text.trim().split("\\s+").length;
        int minutes = (int) Math.max(1, Math.ceil((double) words / WORDS_PER_MINUTE));

        return String.format("%d words, %d minute read", words, minutes);
    }
}
```

A few things to notice here. The `@LlmTool` annotation marks the method as a tool that the LLM can call. The description tells the model what this tool does. The `@LlmTool.Param` annotation describes the parameter so the LLM knows what to pass in. The actual logic is straightforward: split the text on whitespace, count the words, divide by 200 words per minute.

This is annotated with `@Component`, so Spring will manage it and we can inject it wherever we need it.

## Wiring the Tool into an Action

Now we need to use this tool in the action that generates front matter. Here's where it gets interesting. You make the tool available to the LLM by passing it through Embabel's `withToolObject` method:

```java
private final ReadingStatsTool readingStatsTool;

// Constructor injection handles this
```

In the front matter generation action, you wire it in like this:

```java
// Inside the action method
.withToolObject(readingStatsTool)
```

The prompt guides the LLM to use it:

```
Generate front matter metadata for this blog post.
Use the calculateReadingStats tool on the post content below to compute the read time.
```

This doesn't guarantee the LLM will call the tool every single time, but it strongly nudges it in the right direction. When the LLM decides it needs the reading stats, it invokes the tool, gets back something like "999 words, 5 minute read," and includes that in the front matter.

The resulting front matter looks like this at the top of the generated blog post:

```yaml
---
title: "Getting Started with Cloud Code"
slug: getting-started-with-cloud-code
reading_time: "999 words, 5 minute read"
tags:
  - cloud
  - developer-tools
keywords:
  - cloud code
  - getting started
  - cloud development
---
```

## Adding an MCP Server for Web Research

Here's where things get really powerful. If you're writing a blog post about a topic that's newer than the LLM's training data, the model will either hallucinate or produce shallow content. We can fix that by letting the agent research the topic first using a web search MCP server.

Embabel has built-in tool groups that bundle related tools together. The `CoreToolGroups.WEB` group includes web search, URL fetching, and Wikipedia lookups. To use Brave web search specifically, you need to configure an MCP server.

Add the MCP client configuration to your `application.yaml`:

```yaml
spring:
  ai:
    mcp:
      client:
        stdio:
          servers:
            brave-search:
              command: npx
              args:
                - "-y"
                - "@anthropic/brave-search-mcp"
              env:
                BRAVE_API_KEY: ${BRAVE_API_KEY}
```

This sets up a Standard I/O (stdio) MCP server that runs locally on your machine. You'll need a Brave API key, which you can get from the [Brave Search API](https://brave.com/search/api/).

The research action uses this through Embabel's `withToolGroup` method:

```java
// Research action using web search tool group
.withToolGroup(CoreToolGroups.WEB)
```

The prompt tells the LLM what to do with these search capabilities:

```
Research the following topic using web search tools.
Find current, relevant, and accurate information.
Limit yourself to no more than 3 web tool calls.
```

That last line is practical advice. If you're using a free Brave API key, you'll hit rate limits quickly. In production with a paid key, you could remove that constraint.

The research action produces a `ResearchedTopic` with the original topic and the gathered research. This then feeds into the draft writing action, which uses the research as context:

```
Write a blog post about this topic.
Use the following research to inform your writing.
```

This is the core pattern for fighting hallucination: research first, then write with real information.

## Updating the Goal

With all these new actions, the original goal of "a reviewed and polished blog post" no longer captures what we want. The final action now produces a `PublishedPost` with front matter, so we update the goal:

```java
@AchievesGoal("A reviewed and polished blog post with front matter")
```

Embabel sees that the `PublishedPost` requires a `FinalPost`, which requires a `DraftPost`, which requires a `ResearchedTopic`, which requires the user's input. It builds the plan automatically. You don't specify the execution order. You just define what each action consumes and produces, and state your goal.

## Prompt Contributors and Personas

One pattern worth highlighting is the use of prompt contributors. Instead of cramming all instructions into a single prompt, you can define reusable personas:

```java
// Writer persona
// Role: Technical blog writer
// Goal: Write engaging, accurate blog posts
// Backstory: Experienced developer who writes for other developers

// JSON output contributor
// Ensures code snippets in blog posts are properly escaped
```

These get applied alongside your action prompts, keeping things modular. If you later want to change the writing style across all actions, you update the persona in one place.

## Running the Agent

The project uses Spring Shell, so you start the application and interact with it through the command line:

```
> x "Write me a blog post on getting started with Cloud Code"
```

The `x` command executes the agent with the given topic. You'll see the agent work through its plan in the logs:

1. **Research Topic** - Brave web search calls fire, gathering current information
2. **Write Draft** - Uses research to produce an informed first draft
3. **Review Draft** - Polishes the content and provides feedback
4. **Add TLDR** - Generates a one-sentence summary
5. **Generate Front Matter** - Calls the reading stats tool, produces metadata
6. **Write to File** - Saves the published post to disk

At the end, Embabel gives you a summary that includes which LLMs were used across the different calls, token counts, estimated cost, and tool usage stats. In the example run, both the `brave_web_search` tool and the `calculateReadingStats` tool show up in the stats, confirming they were actually invoked.

## What Makes This Approach Compelling

The goal-oriented action planning is what separates Embabel from just chaining a bunch of LLM calls together manually. As Rod Johnson (Embabel's creator) talks about, it's bringing determinism to a non-deterministic world. You know what the goal is, you define the actions available, and the framework figures out the path.

Adding new capabilities is straightforward. Want to add an SEO optimization step? Create an action that takes a `PublishedPost` and produces an `OptimizedPost`, update the goal, and Embabel incorporates it into the plan. Want to send a GitHub PR with the finished post? There's a `CoreToolGroups.GITHUB` tool group for that.

## What's Next

This blog writing agent is a solid foundation, but there's plenty more you could add:

- An SEO action that targets specific keywords
- A hook-writing action that crafts a compelling opening
- A GitHub integration that opens a pull request with the finished post
- Image generation for header images
- Fact-checking against the original research

The [Embabel documentation](https://docs.embabel.com) covers all of this in detail, including the full list of core tool groups and how to create your own MCP servers.

Happy Coding!