---
title: "Code Is Changing. Are We?"
slug: "code-is-changing-are-we"
date: "2026-02-16T08:00:00.000Z"
description: "Programming is changing and I'm not sure everyone understands the scale. Thoughts on AI, new YouTube videos on Spring REST Client, Prompt Caching, and RestClient.Builder, plus Spring Office Hours and upcoming conferences."
tags: ["AI", "Spring Boot", "Spring AI", "MCP", "Conference"]
newsletter: true
published: true
---

Happy Monday, friends! What a busy week last week was for me. I had three videos go out, two Spring Office Hours episodes dropped, A Fundamentals Podcast, and I somehow found time to nerd out on Excalidraw + MCP (more on that later). With ConFoo, DevNexus, and JavaOne right around the corner, I'm also deep in talk prep mode. Let's get into it.

I sent out this [tweet](https://x.com/therealdanvega/status/2022348943581921353) last week because I have been having these thoughts lately, and I figured it was time to share them. If you didn't see it, here is the basic premise:

> I get the sense most developers don't fully grasp where we are with AI. Sure, most know things are changing, but I don't think they understand the scale.
>
> Some still see it as a helpful tool at best. Others dismiss it as a parlor trick. I'm deep in the weeds pushing these tools as hard as I can, and I'm still in a bit of a shock phase. Combined with the realization that this is the worst it will ever be.
>
> About a year ago I was pushing Claude Code and thought it was amazing. Looking back? That version wasn't even close to where we are today. Where will we be in a year?
>
> I still believe talented engineers will adapt. But if I'm being honest, I'm worried about the industry as a whole. Not in a doom and gloom way, but in a "we need to be having more real conversations about this" kind of way. It's something I think about a lot.

Programming is changing, and I'm not sure everyone understands the scale. I don't want this to come off as doom and gloom because that is not my view. I do, however, think we need to be out there pushing these tools to see what they are capable of. The physical act of writing code has never defined us as programmers. It might have been a part, but as you know, so much more goes into our roles.

Peter Steinberger, the creator of OpenClaw, which has taken the internet by storm, recently shared his thoughts on this very topic. I really enjoyed how well thought out and articulate his answer was. If you haven't had a chance to see this clip, give it a watch. I really resonated with this.

:YouTube{id=ecBrO3GXdZ8}

## Videos I Published Last Week

### REST Client and Service Discovery

If you're building microservices with Spring, you've probably dealt with the pain of hardcoding service URLs or juggling configuration across environments. In this video, I walk through how to use Spring's RestClient alongside service discovery so your services can find each other without all that manual wiring.

We look at how service discovery works with the RestClient, and I show you how clean the code can be when you let Spring handle the lookup for you. If you're still passing around URLs in properties files, this one's for you.

:YouTube{id=s9yyxyvYuq4}

### Spring AI Prompt Caching

This video tackles a problem that comes up fast when you start building real applications with Spring AI: cost and latency from repeated prompts. Prompt caching lets you avoid sending the same context to a model over and over, which saves you both time and money.

I walk through how prompt caching works in Spring AI, when you should use it, and how to set it up in your own projects. If you're building anything with RAG or long system prompts, caching can make a real difference in how your app performs. This is one of those features that's easy to overlook but pays off immediately.

:YouTube{id=eYb7BKW4QcU}

### Spring Boot RestClient.Builder Explained (Builder Pattern)

This one came straight from a question on Spring Office Hours. Someone asked when they should use RestTemplate vs RestTemplate.Builder, and I figured it was worth answering with the more modern RestClient instead. The builder pattern shows up everywhere in Spring, and understanding when to use `RestClient` directly vs `RestClient.Builder` matters.

I break down the builder pattern itself, show you how Spring Boot auto-configures the builder for you, and explain why you'd want to customize it. If you've ever wondered why Spring gives you both a ready-made client and a builder, this video clears it up. It's a short one but covers a concept that comes up constantly.

:YouTube{id=aocKQ2-U3wU}

## Spring Office Hours

We had a double-header last week on Spring Office Hours, and both episodes were great.

On Monday, DaShaun and I sat down with **James Ward** for [**S5E05: Spring and AWS**](https://springofficehours.io/episodes/s5e05-spring-and-aws-with-james-ward). We dug into what it looks like to run Spring applications on AWS today, the different deployment options, and some of the patterns James has seen work well at scale.

Then on Wednesday, we had **Juergen Hoeller** on for [**S5E06: Spring Framework 7**](https://springofficehours.io/episodes/s5e06-spring-framework-7-with-juergen-hoeller). Getting to talk with Juergen about what's coming in Spring Framework 7 is always a treat. He's the person who knows the framework better than anyone, and hearing the vision straight from him is something you don't want to miss.

We're taking this week off for Presidents' Day, but we'll be back on **February 23rd** with **S5E07: Copilot CLI and Java SDK** featuring **Bruno Borges**. That's going to be a fun one. You can catch it live here:

:YouTube{id=0ghwKO8TUEY}

## Fundamentals of Software Engineering

We released a new episode of **Fundamentals of Software Engineering** [podcast](https://fundamentalsofswe.com/podcast) last week. Nate Schutta and I talked about exploring career paths for software engineers, which is a topic I care a lot about. If you're thinking about where your career is headed, give it a watch or listen.

:YouTube{id=z41y8S81ARE}

Speaking of Fundamentals of Software Engineering, the [audiobook](https://www.amazon.com/Fundamentals-Software-Engineering-Coder-Engineer/dp/B0FY23758S/) is now live! While Nate and I did not narrate this book, I had a chance to listen to some of it and I really enjoyed it.

## Upcoming Speaking Engagements

I've got a packed schedule over the next few weeks. Here's where you can find me:

**ConFoo 2026** (February 25-27, Montreal, Canada)

- **Introduction to Spring AI**: Building chatbots, implementing RAG, and using MCP for AI orchestration, all from your Java stack.
- **What's New in Spring Boot 4**: Live coding through HTTP interfaces, JSpecify null safety, Jackson 3 integration, and the built-in resilience patterns shipping in Boot 4.

**DevNexus 2026** (March 4-6, Atlanta, GA)

- **Fundamentals of Software Engineering in the Age of AI** (talk + workshop): Why the fundamentals matter more than ever, even with agentic coding assistants changing the workflow.
- **Integrating LLMs in Java: A Practical Guide to Model Context Protocol**: Live coding MCP servers in Java and connecting them to Claude Desktop and other AI tools.

**JavaOne 2026** (March 17-19, San Francisco, CA)

- **Building and Securing MCP Servers for Java Developers**: The building blocks of MCP and how to build, secure, and test your servers.
- **Fundamentals of Software Engineering in the Age of AI**: Same talk, bigger stage. Still just as important.

If you're going to any of these, come say hi. I always love meeting newsletter readers in person.

## In the News

### OpenClaw, OpenAI, and the Future

Peter Steinberger wrote a thoughtful [post](https://steipete.me/posts/2026/openclaw) about OpenClaw and where it's headed. And then the big news: Peter is [joining OpenAI](https://x.com/sama/status/2023150230905159801).

**Dan's Thoughts:** Peter seems like a great guy, and I'm happy for him. He admitted he wanted to join a big company and keep OpenClaw open source. Hopefully he has some more resources at his disposal now. It'll be interesting to see how this plays out for the project.

### Excalidraw MCP

The [Excalidraw MCP server](https://github.com/excalidraw/excalidraw-mcp) is now available, and if you saw my tweet this week, you know I'm all in on this. You give Claude a prompt describing a diagram, and it generates beautiful Excalidraw diagrams in seconds. No dragging boxes, no fiddling with arrows. Just describe what you want and watch it appear.

This is one of those MCP integrations that instantly clicks. If you create architecture diagrams, sequence diagrams, or any kind of visual for your team, go try this right now.

:TweetEmbed{id=2021779252543463815}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega
