---
title: "Seven Videos, Two Very Busy Weeks of Spring Boot 4.1"
slug: "seven-videos-two-very-busy-weeks-of-spring-boot-4-1"
date: "2026-07-06"
description: "Two busy weeks of content covering Spring Boot 4.1: gRPC support, lazy JDBC connections, the new @RedisListener, SSRF protection, type-safe property paths, and more."
tags: ["Spring Boot", "Spring", "Spring AI", "Java"]
newsletter: true
published: true
---

Happy Monday, friends!

I hope you had a great weekend. The past couple of weeks was an absolute blur of content creation. I published seven videos, and almost all of them cover new features in Spring Boot 4.1. I've been deep in the Spring Boot 4.1 release and there's so much good stuff to talk about. From gRPC support to lazy JDBC connections to a brand new Redis annotation, this release is packed. Let me catch you up on everything.

## Video Recaps

### Getting Started with Spring gRPC in Spring Boot 4.1

gRPC in Java used to mean dealing with proto files, code generation, build plugins, server wiring, and client channels. A lot of ceremony before you could even get a "hello world" running. Spring Boot 4.1 changes that story. If you can build a REST app, you already know the patterns.

In this video I walk through the new Spring gRPC support that ships with Spring Boot 4.1. You'll define a contract, drop in a `@GrpcService` annotation, and you're off to the races. It's the same developer experience you're used to with Spring, now applied to gRPC.

:YouTube{id=MPHuBNqbYPM}

### Lazy JDBC Connections in Spring Boot 4.1 (Performance Win)

One property change took connection hold time from 2 seconds down to 15 milliseconds. That's not a typo. The new `spring.datasource.connection-fetch=lazy` property in Spring Boot 4.1 is a real performance win that you need to know about.

I built a complete demo application with Spring Data JDBC, Postgres, Docker Compose, and Spring Boot Actuator to measure the real-world difference between eager and lazy connection fetching. Your transactional methods currently grab a connection the moment they open, even when they never run a query. A cache hit, an early return, a slow API call before the save: that connection just sits idle. Lazy mode fixes this.

This one really resonated on Twitter too, with over 8,000 impressions. It's a small change with a big impact.

:YouTube{id=lsaBN1U2EB8}

### Spring Boot 4.1: Block SSRF Attacks with InetAddressFilter

Did you know that a simple URL preview endpoint could expose your internal secrets to attackers? SSRF (Server-Side Request Forgery) attacks are a real threat, and Spring Boot 4.1 now gives you built-in protection with the new `InetAddressFilter`.

In this tutorial I build a real-world example from scratch: a URL preview endpoint that's vulnerable to SSRF, and then fix it with just one configuration bean. If you're building any application that makes outbound HTTP calls based on user input, this video is for you.

:YouTube{id=PDbBG_GrcwU}

### Spring Boot 4.1: The New @RedisListener Simplifies Everything

If you've ever wired up Redis Pub/Sub in Spring, you know the pain. Message listener containers, listener adapters, raw byte array payloads. It was a lot of boilerplate for something that should be simple. Spring Boot 4.1 fixes this with the new `@RedisListener` annotation.

I build a simple order publishing and subscribing system from scratch, comparing the old boilerplate approach with the new annotation-driven style. It brings Redis Pub/Sub in line with `@KafkaListener` and `@RabbitListener`, which is exactly where it should be.

:YouTube{id=lMbgBYlUtfc}

### Spring Boot 4.1: Type-Safe Property Paths in Spring Data

Your Spring Data code compiles, the IDE is happy, and tests pass. Then in production, a user sorts a column and everything blows up. Sound familiar? This is the "stringly typed" problem, and Spring Boot 4.1 introduces type-safe property paths to eliminate this entire class of runtime bugs.

In this video I show how stringly typed property references cause hidden runtime errors and how the new type-safe API in Spring Data Commons catches these mistakes at compile time. This is one of those features that makes you wonder how we lived without it.

:YouTube{id=qBC-TrIzsPg}

### Spring AI + X's New MCP Servers

X (formerly Twitter) just dropped MCP servers for both the X API and their developer documentation, and they work with any MCP-compatible AI tool. I wanted to see what they could do, so I built a Spring AI client that connects to both servers.

We start by reviewing the official announcement and documentation, then plug the docs server into Claude AI for a quick test. Then we build a full Spring Boot 4.1 + Spring AI 2.0 application that talks to both MCP servers. If you're interested in how MCP is expanding across the ecosystem, this is a great example of what's possible.

:YouTube{id=j4chxGtqkY8}

### ChatClient vs ChatModel: Which Spring AI API Should You Use?

Spring AI gives you two ways to talk to an LLM: `ChatClient` and `ChatModel`. Picking the wrong one can cost you time and flexibility. In this video I break down both APIs so you know exactly when to reach for each one.

We explore the high-level `ChatClient`, which is a fluent, builder-style API similar to `RestClient`, and the low-level `ChatModel` interface that it's built on. You'll see both in action with hands-on code demos using OpenAI, including how to get metadata, token usage, and multiple responses. If you're building with Spring AI, this is the conceptual foundation you need.

:YouTube{id=IdIDI71sGZM}

## Spring Office Hours

We didn't have an episode last week, but this week we have a big one. Phil Webb is joining us to talk about Spring Boot 4.1. If you don't know Phil, he's been one of the key people behind Spring Boot from the beginning. There's nobody better to walk through what's new in this release and the thinking behind the decisions.

Tune in and bring your questions: [S5E17: Spring Boot 4.1 with Phil Webb](https://www.youtube.com/watch?v=4MYFKQkvwNw) on July 6th.

You can check the full schedule at [springofficehours.io/schedule](https://springofficehours.io/schedule).

## Fundamentals of Software Engineering

Nate and I dig into the growing tension between open source maintainers and AI-generated contributions, from maintainers banning AI PRs to the trouble AI has with actually deleting code. We also get into the Silicon Valley pricing playbook and what happens to your workflows once AI tooling stops being cheap.

Listen here: [https://fundamentalsofswe.com/podcast/open-source-ai-tooling-and-the-coming-token-crisis-with-dan-vega-and-nate-schutta](https://fundamentalsofswe.com/podcast/open-source-ai-tooling-and-the-coming-token-crisis-with-dan-vega-and-nate-schutta)

## In the News

### SpaceX to Acquire Cursor

SpaceX is acquiring Cursor for $60 billion in stock, just days after Cursor's blockbuster IPO. This is one of the biggest moves we've seen in the developer tools space in a long time.

[Read more](https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo)

**Dan's Thoughts:** This is a huge deal that brings xAI directly into the agentic coding race. Elon now has an AI model (Grok), a coding IDE (Cursor), and the infrastructure to run it all. Whether you love it or hate it, this acquisition puts xAI in direct competition with Microsoft/GitHub Copilot, Google, and Anthropic in the developer tools space. Keep an eye on this one.

### Fable is Back!

Anthropic has restored access to Fable 5, one of its most advanced AI models, after the U.S. export controls that forced a mid-June suspension were lifted on June 30. Fable 5 shares the same underlying model as Mythos 5 but ships with additional safeguards for general use.

[Read more](https://www.anthropic.com/news/redeploying-fable-5)

**Dan's Thoughts:** I'm really looking forward to digging into this. Fable has been an interesting model from Anthropic, and I'm curious to see what new capabilities this version brings. If you haven't tried it yet, now's a good time to check it out.

## Until Next Week

That's a wrap for this week. Seven videos is a lot, and I appreciate every one of you who watches, comments, and shares them. If there's a Spring Boot 4.1 feature you want me to cover next, or any topic you'd like to see on the channel, just hit reply and let me know. I read every response.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
