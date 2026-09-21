---
title: "Why Jev Has Me Excited About What Comes Next"
slug: "why-jev-has-me-excited-about-what-comes-next"
date: "2026-09-21"
description: "Jev gives you small, focused AI models with typed inputs and outputs, and it has me full of ideas. Plus ColdFusion in Spring Boot 4 and Java 27."
tags: ["Jev", "AI", "Spring Boot", "Java", "Claude Code"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. Last week was all about Jev for me. If you're unfamiliar with Jev, it's an approach to AI that gives you small, focused models with typed inputs and outputs. Instead of sending a large prompt to a general-purpose model and hoping it responds in the format you expect, you can build around a specific task and get structured results that fit naturally into your application.

I'm really excited about this type of model and the new use cases it opens up. I saw people sharing all kinds of Jev experiments on social media last week, and every one of them gave me another idea. That's what has me so inspired right now. We're still figuring out what this can become, and it feels like there's a lot of unexplored territory.

I've been building a few applications of my own to test some of those ideas. I've explored classification, real-time use cases, and even model routing, where an application can decide which model or path should handle a request. These aren't just demos for the sake of demos. They're helping me understand where Jev fits and what it might make possible for Java and Spring developers.

I published an introductory Jev video last week, and I have two more coming this week.

The first will introduce a Spring Boot starter that makes it easier to add Jev to a Spring application. The second will walk through some of the applications I've built and show you a few different ways you might use it.

I'm going to keep watching what people build, experimenting with ideas, and sharing what I learn. If you've already built something interesting with Jev, hit reply and send it my way. I'd love to see it.

Jev wasn't the only thing I worked on last week. I also ran ColdFusion inside Spring Boot 4, explored structured concurrency in Java 27, and shared a behind-the-scenes look at the application that runs my YouTube channel.

Let's get into it.

## Videos Published Last Week

### Getting Started with Jev (Java and Spring Boot)

This is the video that kicked off my Jev deep dive. It's a hello-world introduction to Jev, also known as TypeSafe AI, using Spring Boot 4.

With one `RestClient`, one endpoint, and one request, I ask three questions about a messy support message: identify a noun, choose a category, and assign a score. The response comes back as three typed answers that I can immediately use in my application.

There's no prompt engineering and no JSON response to parse. You describe the result you need and work with typed data.

This video gives you the foundation for the Jev content coming this week. If you want to follow along with the Spring Boot starter and the example applications I'm building, start here.

:YouTube{id=K4rqR6hcsAo}

### I Ran ColdFusion Inside Spring Boot 4

Real `.cfm` templates inside a Spring Boot application. This started as a "can I actually do this?" experiment and turned into something that works surprisingly well.

The whole thing comes down to one undocumented property. Set `boxlang.suffix=.cfm`, and the official BoxLang Spring Boot starter switches to its ColdFusion parser. From there, you can use `cfoutput`, `cfif`, and `cfloop` directly inside your application.

I even ran it on port 8500, the classic ColdFusion server port, for old times' sake.

If you spent any part of your career working with ColdFusion, this one might bring back some memories. If you didn't, it's still a fun look at how flexible Spring Boot 4 can be.

:YouTube{id=CLzEQ1Gtqy4}

### I Built the App That Runs My YouTube Channel With Claude Code

Every video I make goes through this application. It manages the idea, brief, demo repository, script, shorts, blog post, newsletter, and everything in between. The workflow currently has sixteen stages, all visible on one screen.

I built the application myself over eight months, with AI doing most of the typing. A year ago, a project like this probably would have become a folder full of half-finished ideas. Now it's the tool I open every morning.

This is a look at what it means to be a builder right now and how AI changes what one person can ship. If you've been wondering how to put Claude Code to work on a real application, this video is for you.

:YouTube{id=9O-E7DAfYrE}

### Virtual Threads Aren't Enough: Structured Concurrency in Java 27

Virtual threads get a lot of attention, and for good reason, but they don't solve every concurrency problem on their own.

In this video, I build the same `loadDashboard` method three ways: sequentially, with virtual threads and `Future`, and finally with `StructuredTaskScope`. Each version exposes a problem that the next approach fixes.

When the user service fails after 200 milliseconds, the `Future` version continues running the orders call for a full second, even though nobody will use its result. The `StructuredTaskScope` version returns after 200 milliseconds and cancels the unnecessary work immediately.

If you're writing concurrent Java code, structured concurrency is an important tool to understand. This is the clearest example I know for showing why.

:YouTube{id=Nl-a4ukWodk}

## Spring Office Hours

We had a busy week on Spring Office Hours. We went live from KCDC and then held a Java 27 release party with Billy Korando. If you want to learn what landed in JDK 27, Billy walks us through it.

:YouTube{id=mmH5kCo5dUw}

[S5E23: Java 27 Release Party with Billy Korando](https://share.transistor.fm/s/e40b51e5)

:YouTube{id=K07KvST2h4I}

[This week](https://springofficehours.io/), we're talking about Jev and answering some of the questions you submitted. If there's something you want us to cover, send it in and we'll do our best to work it into the show.

## Fundamentals of Software Engineering

### E12: How Developers Can Start Speaking at Conferences

A lot of developers want to speak at conferences but have no idea how to get started. In this episode, we break the process down step by step.

We talk about finding your topic, writing an abstract that gets accepted, and getting past the fear of standing in front of a room. If you've ever thought about submitting a talk, this episode gives you a clear place to begin.

[Listen to the episode](https://share.transistor.fm/s/5f788141)

:YouTube{id=xNzc0NNPGHw}

## Upcoming Speaking Engagements

I'll be at dev2next 2026 in Lone Tree, Colorado, next month. Here's what I'll be presenting:

### Fundamentals of Software Engineering in the Age of AI Workshop

**October 12, 2026**

AI tools can boost your productivity, but the fundamentals of the craft still matter. In this workshop, we'll work through what it takes to be an effective developer in an AI-augmented world.

### Spring AI: There and Back Again

**October 13, 2026**

We'll start in the Shire with a `ChatClient` and a prompt, then chart a course through tools, MCP, and agents. You'll leave with working code and a clear mental model of how the pieces of Spring AI fit together. No toy examples.

### Zero to Superpowers with Claude Code

**October 13, 2026**

I'll show you how I use Claude Code every day. We'll start with the basics and build up to custom slash commands, skills, and agents. You'll walk away with a clear path from beginner to power user.

If you're going to be there, come find me and say hi.

## Until Next Week

That's it for this week.

I'm going to keep exploring Jev, watching what the community builds, and sharing my own experiments. Keep an eye out for the Spring Boot starter video and my collection of Jev application ideas this week.

If you have a Jev use case you think I should explore, or a project you've already built, hit reply and tell me about it. I read every message.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
