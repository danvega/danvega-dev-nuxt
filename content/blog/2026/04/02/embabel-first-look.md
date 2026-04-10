---
title: "Embabel First Look: Building Agentic Flows on the JVM"
slug: embabel-first-look
date: "2026-04-02T08:00:00.000Z"
published: true
description: "A first look at Embabel, a framework by Rod Johnson for building agentic AI flows on the JVM. Learn how to create a blog writing agent with goal-oriented action planning."
tags:
  - Spring AI  
  - Java
keywords: embabel, spring ai, agentic flows, java ai agents, goal-oriented action planning, rod johnson, spring boot ai, embabel tutorial  
cover: EmbabelFirstLook.jpg
video: https://www.youtube.com/embed/G5VDQCZu6t0
---

If you've been building AI-powered applications with Spring AI, you've probably felt the tension between the non-deterministic nature of LLM calls and the need for predictable, well-structured workflows. Embabel (pronounced "em-bay-ble") is a new framework from Rod Johnson, the creator of Spring Framework, that tackles this exact problem. It gives you a way to author agentic flows on the JVM that mix LLM interactions with code and domain models, all while keeping things deterministic and explainable.

::GitHubRepo{url="https://github.com/danvega/blog-agent"}
Follow along with the complete working example.
::

## What is Embabel and Why Should You Care?

Rod Johnson has described Embabel as his most important project since founding Spring. That alone should get your attention. Built on top of Spring AI and written in Kotlin (but very Java-friendly), Embabel introduces a structured approach to building AI agents using a concept called **GOAP: Goal-Oriented Action Planning**.

GOAP comes from the gaming world. It's a technique where each action has conditions that must be true before it can run and effects that change the world state. A planner figures out which actions to chain together to reach a goal, making behavior more flexible than traditional state machines. In the context of AI agents, this means you don't hard-code a step-by-step process. Instead, you define actions and goals, and the framework figures out the optimal path.

Here are the three core concepts you need to understand:

- **Actions** are discrete steps an agent takes. Think of them as the building blocks of behavior.
- **Goals** define what the agent is trying to achieve. The framework dynamically formulates these.
- **Plans** are sequences of actions to reach a goal. After each action completes, the system replans. This replanning loop allows the system to adapt to new information.

The planning algorithm is deterministic. It's not another LLM call. This is a key distinction. You get explainability and predictability in a world of non-deterministic AI responses.

Embabel also embraces two principles that will feel familiar to any experienced developer. First, **decomposition**: breaking a complex task into smaller, manageable parts. Just because we're working with AI doesn't mean software engineering fundamentals change. Second, **type-safe domain models**: strong typing for prompts and return types using Kotlin data classes or Java records. Your domain objects survive refactoring and are fully toolable.

## Setting Up the Project

There are [Java](https://github.com/embabel) and Kotlin templates available on GitHub, but I prefer starting from scratch with a plain Spring project. You'll learn more that way.

Head to [start.spring.io](https://start.spring.io) and create a new project. At the time of writing, Embabel doesn't support Spring AI 2.0 or Spring Boot 4 yet, so use **Spring Boot 3.5.x**. You don't need to add any dependencies through the initializer because you'll add the Embabel-specific ones manually.

Open your `pom.xml` and add the following properties:

```xml
<properties>
    <java.version>23</java.version>
    <embabel.version>0.4.0-SNAPSHOT</embabel.version>
    <spring-ai.version>1.1.4</spring-ai.version>
</properties>
```

Add the Spring AI BOM under dependency management:

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>${spring-ai.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Then add the Embabel dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>com.embabel</groupId>
        <artifactId>embabel-agent-starter-shell</artifactId>
        <version>${embabel.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```

The `embabel-agent-starter-shell` gives you a Spring Shell application with some nice built-in commands for interacting with your agents. You could build an MVC app instead, but the shell is great for learning and experimenting. For the model provider, I'm using OpenAI here, but you can add Anthropic, Gemini, or anything Spring AI supports.

You'll also need to add the Embabel snapshot repositories to your `pom.xml` so Maven can resolve the dependencies.

## Defining Your Domain Models

Embabel encourages type safety from the start, and this is how you should build any application. AI is just another integration. Start by defining the types you'll work with.

Create two Java records for your blog writing pipeline:

```java
public record BlogDraft(String title, String content) {
}
```

```java
public record ReviewedPost(String title, String content, String feedback) {
}
```

`BlogDraft` represents the initial output from the writing action. `ReviewedPost` adds a `feedback` field where the reviewer explains what changes were made. These records will serve as the structured output types for your LLM calls, ensuring you always get back exactly the shape of data you expect.

## Building the Blog Writer Agent

Now for the fun part. Create a new class called `BlogWriterAgent` and annotate it with `@Agent`:

```java
@Agent(description = "Write and review a blog post about a given topic")
public class BlogWriterAgent {

    private static final Logger log = LoggerFactory.getLogger(BlogWriterAgent.class);
    private final BlogAgentProperties properties;

    public BlogWriterAgent(BlogAgentProperties properties) {
        this.properties = properties;
    }
}
```

The `@Agent` annotation is a Spring stereotype annotation (it's annotated with `@Component`), so Spring manages this class for you. That means you get all the benefits of dependency injection, configuration, and everything else you're used to in Spring.

### The Write Draft Action

Add your first action to write a blog post draft:

```java
@Action(description = "Write a first draft of the blog post")
public BlogDraft writeDraft(UserInput userInput, AI ai) {
    return ai.withDefaultLlm()
        .withId("blog-post-draft-writer")
        .creating(BlogDraft.class)
        .fromPrompt("""
            Write a blog post about %s.
            Keep it practical and beginner-friendly.
            Use short sentences and plain language.
            Include code examples but keep them short and simple.
            Write the content in Markdown.
            """.formatted(userInput.getContent()));
}
```

A few things to notice here. The `@Action` annotation marks this method as an action the agent can take. `UserInput` comes from Embabel and represents what the user typed. `AI` is an interface that serves as the gateway to AI functionality, including LLM and embedding models. Spring injects both of these for you.

The `withDefaultLlm()` call uses whatever model you've configured as the default. The `creating(BlogDraft.class)` call tells Embabel you want structured output that maps to your `BlogDraft` record. This is type-safe, structured output without any manual JSON parsing.

### The Review Draft Action

Now add the review action:

```java
@Action(description = "Review and improve the draft")
@AchievesGoal(description = "A reviewed and polished blog post")
public ReviewedPost reviewDraft(BlogDraft draft, AI ai) {
    ReviewedPost reviewed = ai.withLlmByRole("reviewer")
        .withId("blog-post-reviewer")
        .creating(ReviewedPost.class)
        .fromPrompt("""
            Review and improve this blog post:
            Title: %s
            Content: %s
            Fix any technical errors.
            Tighten the writing.
            Provide a revised title, revised content,
            and a brief summary of the changes you made as feedback.
            """.formatted(draft.title(), draft.content()));

    writeToFile(reviewed);
    return reviewed;
}
```

There are two important things happening here. First, the `@AchievesGoal` annotation tells Embabel that completing this action means the agent has reached its goal. Writing a first draft is not the goal. A reviewed and polished blog post is the goal. This is how Embabel knows when to stop.

Second, notice `withLlmByRole("reviewer")`. Instead of hardcoding a model, you're referencing a role that's defined in configuration. This lets you use a more capable (and more expensive) model for the review step while using a cheaper, faster model for the draft.

### The Key Insight

Here's what makes Embabel different from just chaining two API calls together: you're not defining a step-by-step process. You're giving the agent a set of actions and a goal. The agent figures out which actions to call and in what order. With just two actions this might seem trivial, but imagine adding actions to generate a TLDR, optimize for SEO, write a catchy hook, generate front matter, or fact-check the content. The agent would dynamically plan which of those actions to execute to achieve the goal.

## Configuration

Set up your `application.yaml` with the model configuration and API key:

```yaml
embabel:
  models:
    default-llm: gpt-4.1-mini
    llm:
      reviewer: gpt-4.1

spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
```

The `default-llm` is the cheaper, faster model used for the draft. The `reviewer` role maps to a more capable model. Watch your YAML indentation here. An indentation mistake will cause the agent to fail when it tries to find the model for the reviewer role.

## Writing Output to a File

To make the agent more useful, add a configuration properties class and a file-writing method.

```java
@ConfigurationProperties("blog-agent")
public record BlogAgentProperties(String outputDir) {
    public BlogAgentProperties {
        if (outputDir == null || outputDir.isBlank()) {
            outputDir = "blog-posts";
        }
    }
}
```

Don't forget to enable configuration properties on your main application class:

```java
@SpringBootApplication
@EnableConfigurationProperties(BlogAgentProperties.class)
public class BlogAgentApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlogAgentApplication.class, args);
    }
}
```

Then add the file-writing logic to your agent. The method extracts the title, converts it to a filename-safe format, and writes the markdown content to a file in your configured output directory.

## Adding Reusable Personas

Embabel supports the concept of **personas**, which lets you extract role descriptions out of your prompts and make them reusable. Create an abstract class:

```java
public abstract class Personas {

    public static final RoleGoalBackstory WRITER = new RoleGoalBackstory(
        "Software developer and educator",
        "Write practical, beginner-friendly blog posts",
        "Experienced developer who loves teaching through clear, simple writing"
    );

    public static final RoleGoalBackstory REVIEWER = new RoleGoalBackstory(
        "Technical editor",
        "Review and improve blog posts for clarity and accuracy",
        "Meticulous editor with deep technical knowledge"
    );
}
```

Now update your actions to use these personas instead of baking the role into the prompt:

```java
@Action(description = "Write a first draft of the blog post")
public BlogDraft writeDraft(UserInput userInput, AI ai) {
    return ai.withDefaultLlm()
        .withId("blog-post-draft-writer")
        .withPromptContributor(Personas.WRITER)
        .creating(BlogDraft.class)
        .fromPrompt("""
            Write a blog post about %s.
            Keep it practical and beginner-friendly.
            Use short sentences and plain language.
            Include code examples but keep them short and simple.
            Write the content in Markdown.
            """.formatted(userInput.getContent()));
}
```

This is a cleaner separation of concerns. The persona gets added to the prompt that's sent to the LLM, but you're not hard-coding it into the task-specific instructions. If you later add an SEO action that needs both the writer and SEO expert personas, you can combine them freely.

## Running the Agent

Start the application, and you'll see the Embabel ASCII art in your console. Since you're using the shell starter, you have access to several built-in commands:

- `models` lists the available LLMs and their roles
- `agents` shows all registered agents, their goals, and actions
- `help` shows all available commands
- `x` or `execute` runs an agent with your input

Try it out:

```
x How to get started with Spring Boot
```

You'll see console output showing the agent choosing the blog writer agent, executing the write draft action with GPT-4.1 Mini, then executing the review draft action with GPT-4.1. At the end, you'll see a summary of which models were used, the token counts, and the cost.

For more detailed debugging output, add the `-p` flag:

```
x -p How to get started with Spring Boot
```

This shows you the actual messages being sent to the LLM, including the JSON schema for structured output, the user messages, and the chat options. This is incredibly helpful when you need to debug why an action isn't producing the output you expect.

After the agent completes, check your `blog-posts` directory for the generated markdown file.

## What's Next

This is a minimal two-action agent, but the real power of Embabel shows up when you start adding more actions. Here are some ideas:

- Generate a catchy hook or title
- Write a TLDR summary for social sharing
- Optimize for SEO and discoverability
- Run a readability score check
- Generate front matter for your blog's CMS
- Create an outline before drafting
- Fact-check technical claims

The beauty of goal-oriented action planning is that you add these actions and the planner figures out which ones to execute. You're not maintaining a brittle chain of sequential steps.

Beyond expanding this agent, there's a lot more to explore in the Embabel framework, including tools, agentic RAG pipelines, utility AI for open-ended tasks, and multi-agent systems.

## Resources

- [Embabel GitHub Organization](https://github.com/embabel)
- [Embabel Documentation](https://docs.embabel.com)
- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)

Happy Coding!