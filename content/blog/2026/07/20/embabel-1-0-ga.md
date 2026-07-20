---
title: "Embabel 1.0 Is Here: AI Agent Framework for Java Goes GA"
slug: embabel-1-0-ga
date: 2026-07-20T09:00:00.000Z
published: true
cover: embabel-1-0-ga-brutalist.png
description: "Embabel 1.0 is GA. What Rod Johnson's AI agent framework for the JVM means for Java developers, what changed on the road to 1.0, and how to get started."
tags:
  - java
  - spring-ai
  - embabel
  - ai-agents
keywords:
  - embabel 1.0
  - embabel agent framework
  - java ai agent framework
  - build ai agents in java
  - rod johnson embabel
  - goal-oriented action planning
  - embabel spring ai
  - jvm agent framework
---

Embabel just hit 1.0.0. [Rod Johnson announced](https://x.com/springrod/status/2079032549226291505) the GA release of his AI agent framework for the JVM this morning, thanking Igor Dayen, Alexander Heifetz, and the community contributors who got it across the finish line. If you have been waiting for a stable release before taking agentic AI on the JVM seriously, the wait is over.

I have been hands-on with Embabel for a while now, and I want to use this milestone to explain why it matters, what changed on the road to 1.0, and how you can get started today.

## What Is an AI Agent, Anyway?

Before we talk about the framework, let's get the terminology straight, because "agent" gets thrown around a lot.

When you call an LLM directly, the flow is simple: you send a prompt, you get a response, done. The model can’t take action, check its work, or decide what to do next. It answers questions. That's it.

An agent flips that around. Instead of giving the model a prompt, you give it a **goal** and a set of **tools**, and it works in a loop: assess the situation, pick an action, execute it, observe the result, and decide what to do next. Repeat until the goal is achieved. The three ingredients that separate an agent from a plain LLM call:

- **Tools**: the ability to actually do things, like search the web, query a database, call an API, or write a file
- **Planning**: deciding which steps to take and in what order, rather than following a script you wrote
- **Feedback loop**: observing the result of each action and adapting, including recovering when something fails

A chatbot answers "how do I issue a refund?" An agent looks up the order, checks the refund policy, issues the refund, and emails the customer a confirmation.

### What Are Developers Building with AI Agents?

This is not theoretical anymore. Agents crossed from demos into production over the last couple of years, and a few categories dominate:

- **Coding agents**. The most visible success story. Tools like Claude Code take a task like "add validation to this endpoint and write tests for it," then read your codebase, make the changes, run the tests, and iterate on failures. If you've used one, you've already felt the agent loop in action.
- **Deep research**. Agents that take a question, run dozens of searches, read sources, follow leads, and synthesize a report. This is planning and tool use doing work that used to take a person hours.
- **Customer support**. Beyond answering FAQs: looking up accounts, processing returns, updating subscriptions, and escalating the genuinely tricky cases to a human. Klarna's support agent famously handled 2.3 million conversations in its first month, work they estimated at roughly 700 full-time agents.
- **Back-office operations**. Finance teams use agents to investigate flagged transactions, assemble evidence, and draft compliance reports, with a human making the final call. Same pattern in IT ops, claims processing, and supply chain.
- **Content and marketing workflows**. Research a topic, draft, review, optimize, publish. Sound familiar? That's exactly the blog-writing agent we build in my Embabel posts.

Notice the pattern across all of these: the wins come from **narrow, well-scoped agents with clear goals**, not a general-purpose AI that does everything. Multi-step workflow, defined tools, human oversight at the high-stakes decision points. That framing matters, because it's exactly the kind of system Embabel is designed to help you build, with the structure and type safety you'd expect on the JVM.

## What Is Embabel?

Embabel (pronounced "em-BAY-bel") is an open source agent framework for the JVM, built for authoring agentic flows. It comes from Rod Johnson, the creator of the Spring Framework, who has called it his most important project since founding Spring. It is built on top of Spring AI, written in Kotlin, and very friendly to plain Java.

The core idea is Goal-Oriented Action Planning (GOAP), a technique borrowed from game development. Instead of hard-coding a step-by-step workflow, you define:

- **Actions**: discrete steps the agent can take
- **Goals**: what the agent is trying to achieve
- **Plans**: sequences of actions the framework formulates dynamically, replanning after each step

The key distinction from most agent frameworks: the planner is deterministic code, not another LLM call. You get explainability and predictability in a world of non-deterministic AI responses.

If you are trying to place Embabel among the other Java AI frameworks, here is the short version. Spring AI and LangChain4j handle model integration, the low-level work of talking to LLMs. Embabel builds on top of Spring AI and adds the agent layer. Rod's own analogy: Spring AI is like the Servlet API, and Embabel is like Spring MVC.

If you want the full walkthrough of these concepts with a working blog-writing agent, I covered it in [Embabel First Look: Building Agentic Flows on the JVM](https://www.danvega.dev/blog/embabel-first-look).

## What's New in 1.0

Let's answer the question everyone is asking first: **does Embabel 1.0 support Spring Boot 4 and Spring AI 2.0?** No, not yet. I dug into the build files on the v1.0.0 tag, and the release is built on Spring AI 1.1.7 and Spring Boot 3.5.x, with a Java 21 baseline. The 1.0 release is about API stability on the current line, not the jump to the new generation.

That's worth pausing on, because [every Spring Boot 3.x branch is now past its open source support window](https://www.danvega.dev/blog/spring-boot-end-of-life). If you're planning to build on Embabel today, you're building on the 3.5 line, so keep an eye on the project for Boot 4 support. Given how quickly this team ships, I don't expect that gap to last long.

The good news: this is on the roadmap. There's an open issue tracking [Spring Boot 4 support](https://github.com/embabel/embabel-agent/issues/1052), and it's tagged with a `release-2.0` label, which tells us Boot 4 and Spring AI 2.0 support is targeted for Embabel 2.0. There's already a 2.0.0 development line in the repo, so work is underway.

If you absolutely need to run Embabel on Spring Boot 4 today, the community has documented a workaround in that issue: manually defining a `Jackson2ObjectMapperBuilder` bean to bridge the Jackson 2 to Jackson 3 gap. At least one person reports running it in production, though the observability module doesn't work on Boot 4 yet. I'd treat this as a stopgap, not a recommendation. If you're starting fresh, build on Boot 3.5 with the GA release and migrate when 2.0 lands.

So what did land in 1.0? Reading through the [release notes](https://github.com/embabel/embabel-agent/releases/tag/v1.0.0), the theme is maturity:

- **Experimental APIs promoted to production status**, including the RAG APIs. That's the real meaning of 1.0: these interfaces are now stable and safe to build on.
- **Deprecated methods removed**. The API surface was cleaned up before the stability guarantee kicked in, exactly what you want from a framework going GA.
- **Generic Media and Document support**, opening the door to multimodal inputs in your agent flows.
- **Better observability**: MCP server health exposed through Spring Boot Actuator, chat message events you can subscribe to, and improved logging throughout.
- **Planner improvements**, including configurable behavior when multiple goals share the same or different return types.
- **More model integrations**: Z.ai GLM support and updated DeepSeek model names, alongside the existing OpenAI, Anthropic, Bedrock, Google GenAI, Ollama, and LM Studio options.
- **Better MCP citizenship**: tool failures now propagate as proper errors so MCP clients can see and handle them.

The module list alone tells you how much surface area this framework covers now: agent APIs, A2A, MCP, RAG, skills, a shell, observability, and even ONNX support for local embedding models.

When I first wrote about Embabel, you had to pull snapshot builds from a custom repository. With a GA release on stable coordinates, the on-ramp just got a lot smoother.

## Where I've Covered Embabel Before

If you're new to the framework, here's the path I'd suggest through my earlier content:

1. **[Embabel First Look: Building Agentic Flows on the JVM](https://www.danvega.dev/blog/embabel-first-look)**. Start here. We build a blog-writing agent from scratch with two actions, structured output via Java records, and per-role model configuration (a cheap model for drafts, a stronger one for review).

2. **[Embabel MCP Servers and Tools: Supercharging Your Agentic Flows on the JVM](https://www.danvega.dev/blog/embabel-mcp-servers-and-tools)**. The follow-up, where we give the agent real capabilities: web research through MCP servers, tool groups like `CoreToolGroups.WEB`, reading-time calculation, and front matter generation.

3. **[Can You Use Java for AI?](https://www.danvega.dev/blog/can-you-use-java-for-ai)**. The bigger picture on why the JVM is better positioned for AI applications than most people think, with Embabel as part of that story.

All the code from those posts lives in the [blog-agent repo on GitHub](https://github.com/danvega/blog-agent).

## Getting Started with 1.0

Head to [start.spring.io](https://start.spring.io) and create a new project on **Spring Boot 3.5.x** with **Java 21**, then add the Embabel starter:

```xml
<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-starter-shell</artifactId>
    <version>1.0.0</version>
</dependency>
<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-starter-openai</artifactId>
    <version>1.0.0</version>
</dependency>
```

Everything resolves from Maven Central, so no custom repository configuration is needed. That alone is a big improvement over the snapshot setup from my first-look post. Also new in 1.0: dedicated starters for each model provider. Swap `embabel-agent-starter-openai` for `-anthropic`, `-ollama`, `-bedrock`, or any of the other supported providers.

The shell starter gives you a Spring Shell application with built-in commands for interacting with your agents, which is a great way to learn. From there, defining an agent is as simple as annotating a Spring-managed class:

```java
@Agent(description = "Write and review a blog post about a given topic")
public class BlogWriterAgent {
    // @Action methods go here
}
```

Because `@Agent` is a Spring stereotype annotation, you get dependency injection, configuration, and everything else you already know from Spring. AI is just another integration.

## Final Thoughts

The JVM has quietly become a serious place to build AI applications. Spring AI 2.0 gave us the model integration layer, MCP gave us a standard for tools, and now Embabel 1.0 gives us a stable, deterministic way to orchestrate it all into agents.

Congratulations to Rod Johnson and the entire Embabel community on the release. Check out the [Embabel repository](https://github.com/embabel/embabel-agent), star it if you find it useful, and come see just how nice AI on the JVM can be.

Happy Coding!