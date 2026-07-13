---
title: "Spring AI Deep Research Agent"
slug: spring-ai-deep-research-agent
date: 2026-03-27T09:00:00.000Z
published: true
description: "AI Agent Search"
author: "Dan Vega"
tags:
  - AI
cover: spring-ai-deep-research-agent.jpeg
video: https://www.youtube.com/embed/_amdeuCM-aY
keywords: AI
---


---
title: Build a Deep Research Agent with Spring AI and Browserbase
slug: spring-ai-deep-research-agent-browserbase
date: 2026-03-27
published: true
description: Learn how to build an AI-powered deep research agent using Spring AI and the Browserbase Search API that discovers, fetches, and synthesizes web content into structured reports.
author: Dan Vega
tags:
  - Spring AI
  - Spring Boot
  - Java
keywords:
  - spring ai deep research agent
  - browserbase spring boot
  - ai web search java
  - spring ai chat client
  - browserbase search api
  - deep research spring boot
  - ai agent java tutorial
  - spring ai openai tutorial
  - browserbase spring boot starter
  - web scraping ai agent
---

When you ask ChatGPT or Claude to do "deep research," it searches the web, reads through pages of content, and synthesizes everything into a nice report. Have you ever wondered what it would take to build something like that yourself? With Spring AI and a new search API called Browserbase, you can put together your own research agent in Java, and it's more approachable than you might think.

I recently watched [Aaron Francis's video](https://www.youtube.com/watch?v=2NcLtWazHFU) where he built a deep research tool in TypeScript using Browserbase. I thought it would be fun to tackle the same thing in Java with Spring AI. The result is a research pipeline that takes a topic, discovers relevant content across the web, fetches and reads that content, and compiles everything into a structured markdown report.

::GitHubRepo{url="https://github.com/danvega/deepresearch"}
Follow along with the complete working example.
::

## What is Browserbase and Why Not Just Use a Regular Search API?

[Browserbase](https://www.browserbase.com/) recently launched a new search API built specifically for AI agents. You might be wondering why you wouldn't just use something like the Brave Search API. That's a fair question, and search APIs like Brave are still useful. But they hit a wall in certain scenarios.

A lot of modern web applications render content with JavaScript. When you make a plain HTTP request to these pages, you get back an empty shell. The content loads after JavaScript runs, so a traditional search index can't see it. Browserbase solves this because it's backed by a real headless browser. It can search the web, fetch page contents, and if needed, spin up a full browser session to interact with pages that require authentication, button clicks, or other dynamic behavior.

For our deep research agent, we only need two of Browserbase's capabilities: **search** and **fetch**. No full browser sessions required. But knowing that option exists is valuable if you ever need to scrape content behind a login page or from a JavaScript-heavy single page application (SPA).

The best part? Browserbase offers 1,000 free searches per month, so you can get started without spending anything.

## The Browserbase Spring Boot Starter

Browserbase provides official SDKs for Node.js and Python, but there isn't a Java SDK. So I built a [Spring Boot Starter for Browserbase](https://www.danvega.dev/blog/browserbase-spring-boot-starter) that mirrors the functionality of those official SDKs.

The starter handles auto-configuration, sets up a REST client, and exposes the Browserbase API through a clean Java interface. You add the dependency, provide your API key, and you're ready to go.

```xml
<dependency>
    <groupId>dev.danvega</groupId>
    <artifactId>browserbase-spring-boot-starter</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```

Right now the starter isn't published on Maven Central since it's still a proof of concept. You'll need to clone the repository and run `mvn install` to install it into your local Maven repository.

The auto-configuration kicks in when you set your API key in `application.properties`:

```properties
browserbase.api-key=your-api-key-here
```

The starter gives you access to the core Browserbase resources: searching the web, fetching page content, and managing browser sessions. For this project, we'll use search and fetch.

## How the Research Pipeline Works

The deep research agent follows a three-stage pipeline: **discover**, **fetch**, and **synthesize**. Each stage builds on the previous one, and the whole thing is orchestrated by a single Spring service.

Here's the high-level flow:

1. **Discover** - Ask the Large Language Model (LLM) to generate diverse search queries for your topic, then run each query through Browserbase Search. Deduplicate the resulting URLs.
2. **Fetch** - Use Browserbase's fetch API to pull the actual content from each URL, running requests in parallel with virtual threads.
3. **Synthesize** - Feed all the fetched content back to the LLM with instructions to produce a structured research report.

Let's walk through each stage.

## Project Setup

I started a new Spring Boot 4 project with Spring AI. Here are the key dependencies in the POM:

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
    <dependency>
        <groupId>dev.danvega</groupId>
        <artifactId>browserbase-spring-boot-starter</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </dependency>
</dependencies>
```

We're using OpenAI here, but you could swap in any model provider that Spring AI supports. If you want to keep costs at zero, you could use an open model through Ollama or LM Studio. Pair that with Browserbase's free tier and you have a completely free research pipeline.

## The Research Controller

The entry point is a simple REST controller. You send a GET request with your research topic and the pipeline takes it from there:

```java
@RestController
@RequestMapping("/api")
public class ResearchController {

    private final ResearchPipeline researchPipeline;

    public ResearchController(ResearchPipeline researchPipeline) {
        this.researchPipeline = researchPipeline;
    }

    @GetMapping("/research")
    public String research(@RequestParam String topic) {
        return researchPipeline.execute(topic);
    }
}
```

Nothing fancy here. The real work happens inside the `ResearchPipeline`.

## Stage 1: Discovering Relevant Sources

The first stage asks the LLM to come up with diverse search queries. This is important because a single search query will only give you one perspective on a topic. By generating five different queries, you cast a wider net.

```java
private List<String> discover(String topic) {
    String prompt = "Generate 5 diverse search queries to thoroughly research this topic: " + topic;

    // Chat client calls OpenAI to generate search queries
    List<String> queries = chatClient.prompt()
            .user(prompt)
            .call()
            .entity(new ParameterizedTypeReference<List<String>>() {});

    log.info("Generated queries: {}", queries);

    // Run each query through Browserbase Search
    List<String> allUrls = new ArrayList<>();
    for (String query : queries) {
        var results = browserbaseClient.search(query);
        results.forEach(result -> allUrls.add(result.url()));
    }

    // Deduplicate
    return allUrls.stream().distinct().toList();
}
```

For a topic like "What are some of the biggest news stories in the Java programming language world?", the LLM might generate queries like:

- "Major news stories Java programming language 2025"
- "Latest developments in Java"
- "Java trends in 2026"
- "Java release updates Oracle"
- "Java community news and announcements"

Each query goes through Browserbase Search, which returns relevant URLs ranked by relevance. We then deduplicate across all result sets so we don't fetch the same page twice.

## Stage 2: Fetching Page Content

Once we have our list of URLs, we need to actually read those pages. This is where Browserbase's fetch API shines. It retrieves the rendered content of each page, handling JavaScript-heavy sites that would return blank pages to a simple HTTP client.

```java
private List<Source> fetch(List<String> urls) {
    // Fetch pages in parallel using virtual threads
    // with a concurrency limit to respect rate limits
    List<Source> sources = urls.parallelStream()
            .limit(concurrencyLimit)
            .map(url -> {
                try {
                    var content = browserbaseClient.fetch(url);
                    log.info("Fetched: {}", url);
                    return new Source(url, content);
                } catch (Exception e) {
                    log.warn("Failed to fetch: {}", url);
                    return null;
                }
            })
            .filter(Objects::nonNull)
            .toList();

    return sources;
}
```

A few things worth noting here. We're running fetches in parallel thanks to virtual threads, which keeps things fast. There's also a concurrency limit in place. If you're on Browserbase's free tier, there are rate limits you'll want to respect. If you upgrade to a paid plan, you can increase this limit and speed things up considerably.

Some pages will fail to fetch, and that's okay. We filter out the nulls and move on with whatever we collected. This mirrors real-world research where not every source is accessible.

## Stage 3: Synthesizing the Report

This is where everything comes together. We feed all the fetched content to the LLM along with detailed instructions about how to structure the report:

```java
private String synthesize(String topic, List<Source> sources) {
    String analysisPrompt = """
        You are a research analyst. Analyze these sources about: %s
        
        Extract and summarize:
        - Key facts and findings
        - Points where sources agree
        - Points where sources disagree or have caveats
        
        Sources:
        %s
        """.formatted(topic, formatSources(sources));

    String briefing = chatClient.prompt()
            .user(analysisPrompt)
            .call()
            .content();

    String reportPrompt = """
        Complete this briefing document with:
        - Executive Summary (2-3 paragraphs)
        - Key Findings
        - Major Themes
        - Open Questions
        - Sources
        
        Briefing:
        %s
        """.formatted(briefing);

    return chatClient.prompt()
            .user(reportPrompt)
            .call()
            .content();
}
```

Notice that synthesis happens in two LLM calls. The first call analyzes the raw sources and extracts key information. The second call takes that analysis and structures it into a proper report format. This two-step approach tends to produce better results than trying to do everything in a single prompt.

## Writing the Report to Disk

The final step writes the synthesized report as a markdown file, stamped with the date and topic:

```java
private void writeReport(String topic, String report) {
    String filename = "reports/%s-%s.md".formatted(
        LocalDate.now(),
        topic.replaceAll("[^a-zA-Z0-9]", "-").toLowerCase()
    );
    
    Path path = Path.of(filename);
    Files.createDirectories(path.getParent());
    Files.writeString(path, report);
    
    log.info("Report saved to: {}", filename);
}
```

## Running the Agent

Start the application and make a request:

```bash
curl "http://localhost:8080/api/research?topic=What%20are%20some%20of%20the%20biggest%20news%20stories%20in%20the%20Java%20programming%20language%20world"
```

In the console, you'll see the pipeline working through each stage. First, the LLM generates search queries. Then Browserbase searches and fetches content from the discovered URLs (some will succeed, some will fail). Finally, the LLM synthesizes everything into a report.

The output is a markdown file in the `reports/` directory with an executive summary, key findings, major themes, open questions, and a list of sources. When I ran this for Java news, it picked up Oracle's release of Java 26, ongoing trends in the ecosystem, and community discussions.

This process isn't instantaneous. Think of it less like a quick API call and more like what happens when you ask ChatGPT to do deep research. It takes a minute or two. That makes it a great candidate for a scheduled task. Maybe you run it every morning to get a briefing on what's new in Spring AI, or every few days to track developments in your area of interest.

## Making This Completely Free

One thing I love about this setup is that you can run the entire workflow without spending a dime. Browserbase gives you 1,000 free searches per month. If you're not running deep research every day, that's plenty. On the LLM side, swap OpenAI for a local model using Ollama or LM Studio. Spring AI makes this a configuration change, not a code change.

Just update your `application.properties` to point at your local model provider and you're set.

## What You Could Build Next

This project is a starting point, not a finished product. Here are some directions you could take it:

**Add browser sessions for authenticated content.** If your research topic requires reading content behind a login, Browserbase can spin up a full browser session. You could build logic that detects when a fetch fails and falls back to a browser session.

**Schedule recurring research.** Use Spring's `@Scheduled` annotation to run research on a topic every morning and email yourself the report.

**Build a web UI.** Add a simple frontend where users can submit topics and view past reports. The markdown output is already structured, so rendering it in a browser would be straightforward.

**Expand the pipeline.** Add a stage that evaluates source quality or cross-references findings against known databases.

The combination of Spring AI's chat client, Browserbase's search and fetch APIs, and the flexibility of Spring Boot gives you a solid foundation for all kinds of AI agent workflows beyond just research.

## Resources

- [Browserbase Spring Boot Starter (Blog Post)](https://www.danvega.dev/blog/browserbase-spring-boot-starter)
- [Browserbase](https://www.browserbase.com/)
- [Aaron Francis's original video](https://www.youtube.com/watch?v=2NcLtWazHFU)
- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)

Happy Coding!