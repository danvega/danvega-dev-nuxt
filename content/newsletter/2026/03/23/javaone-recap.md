---
title: "JavaOne Recap and JDK 26 has been released"
slug: "javaone-recap"
date: "2026-03-23T00:00:00.000Z"
description: "A recap of JavaOne 2026 in Redwood Shores, highlights from the JDK 26 release including 10 new JEPs, and the latest news in the Spring and Java ecosystem."
tags: ["conferences", "spring", "java", "javaone","jdk26"]
newsletter: true
published: true
---

Happy Monday, friends!

The last couple of weeks have been a whirlwind. I was down at JavaOne soaking in all the energy around the Java community, and then JDK 26 dropped. If you follow me on Twitter, you probably saw me posting about both of those things nonstop. It's a great time to be a Java developer, and I've got a lot to cover in this edition of the newsletter.

Let's get into it.

## JavaOne Recap

![JavaOne 2026](/images/newsletter/2026/03/23/javaone.jpeg)

Last week I was in Redwood Shores, right outside of San Francisco for JavaOne. If you're a Java developer and haven't had the chance to attend this conference, you need to add it to your bucket list. Being in the same rooms as the people who work on Java is both exciting and inspiring.

I gave a couple of talks and I think they were both pretty well received. The first was on getting started with MCP as a Java developer. We talked about the foundational components of MCP servers and even went through an example of how to build your first one. The slides can be found [here](https://www.danvega.dev/speaking/javaone-2026-building-securing-mcp-servers-java) and this talk was recorded so I will be sure to share it out when it's available.

My second talk was based on the book Nate and I wrote, The Fundamentals of Software Engineering. We have been pitching this as "in the age of AI." While I keep hearing folks say the fundamentals don't matter any longer, we are taking the opposite stance. I like to say these are mini therapy sessions to talk about where we are with AI and where we might be heading. The slides can be found [here](https://www.danvega.dev/speaking/javaone-2026-fundamentals-software-engineering-ai) and this talk was also recorded so I will let you know when it's available.

## JDK 26

JDK 25 shipped an impressive 25 JEPs, so of course the running joke was whether 26 was going to ship 26. 🤣 They couldn't keep up that pace, so [JDK 26 ships 10 JEPs](https://openjdk.org/projects/jdk/26/). Nothing in this release is going to be buzzworthy, but a couple of things stand out to me. We are making our first steps towards Integrity by Default with JEP 500, HTTP/3 support, and Structured Concurrency goes into its sixth preview. I'm really hoping Structured Concurrency goes final later this year and wraps up Project Loom, which has been a huge impact to the Java ecosystem.

## Features

| JEP | Title |
|-----|-------|
| 500 | Prepare to Make Final Mean Final |
| 504 | Remove the Applet API |
| 516 | Ahead-of-Time Object Caching with Any GC |
| 517 | HTTP/3 for the HTTP Client API |
| 522 | G1 GC: Improve Throughput by Reducing Synchronization |
| 524 | PEM Encodings of Cryptographic Objects (Second Preview) |
| 525 | Structured Concurrency (Sixth Preview) |
| 526 | Lazy Constants (Second Preview) |
| 529 | Vector API (Eleventh Incubator) |
| 530 | Primitive Types in Patterns, instanceof, and switch (Fourth Preview) |

### Prepare to Make Final Mean Final

A feature in JDK 26 that caught my eye is that `final` fields are getting ready to actually be final. For years, developers have been able to use reflection to modify `final` fields at runtime. It was one of those things everyone kind of knew about but nobody felt great about. Well, that loophole is closing.

In this video, I walk through what this change looks like in practice, why the Java team is making this move, and what it means for your existing codebases. If you have libraries or legacy code that rely on reflection hacks to modify `final` fields, you'll want to understand the migration path sooner rather than later.

This one clearly resonated with the community. The tweet about it pulled in over 7,500 impressions, so I know a lot of you are paying attention to this. Check out the full video and let me know if you have questions about how this affects your projects.

:YouTube{id=j-y0m6j6TBc}

### Spring Office Hours

Speaking of JDK 26, you're not going to want to miss a special Spring Office Hours this week as we sit down with Oracle Developer Advocate Billy Korando. We will talk about the release, JavaOne, and whatever else pops up during the live stream.

:YouTube{id=yCFkB9jhh94}

## Upcoming Speaking Engagements

I'll be at **Arc of AI** in Austin, TX from April 13–16, and I'm giving two talks:

- **Building and Securing MCP Servers in Java**: The Model Context Protocol is quickly becoming the standard for how AI applications interact with external systems. I'll cover the building blocks of MCP and show you how to build, secure, and test your MCP servers in Java. If you're thinking about connecting AI models to your enterprise data and tools, this one's for you.
- **Fundamentals of Software Engineering in the Age of AI**: Agentic coding assistants are everywhere and some people are saying software engineering is over. I don't buy it. In this talk, I'll make the case for why mastering the fundamentals of the craft matters more than ever, even as AI tools reshape our workflows.

If you're going to be in Austin, come say hi!

## In the News

### Spring AI 2.0 M3 Now Available

The Spring AI team released Milestone 3 of Spring AI 2.0. You can read the full details on the [Spring Blog](https://spring.io/blog/2026/03/17/spring-ai-2-0-0-M3-and-1-1-3-and-1-0-4-available). Speaking of the Spring Blog, have you seen the new layout? It looks fantastic.

**Dan's Thoughts:** The Spring AI project continues to move fast. If you're building AI-powered applications on Spring, keep an eye on the 2.0 milestones. Each release is bringing the framework closer to a really polished developer experience for AI integration.

### AI Is Hurting Developer Learning

A new piece on Bytesized AI digs into research showing that AI tools are actually hurting how developers learn. You can read it [here](https://www.bytesizedai.dev/p/ai-is-hurting-developer-learning-and-the-research-proves-it).

**Dan's Thoughts:** I actually wrote this one for my Bytesized AI newsletter. The research is pretty clear: when developers lean on AI tools too heavily, especially early in their learning journey, they're not building the mental models they need. It ties directly into why I'm giving that "Fundamentals of Software Engineering" talk at Arc of AI. The tools are powerful, but you still need to understand what's happening under the hood.

### Stop Letting AI Build Out Horizontally

Another piece from Bytesized AI about why you should stop letting AI expand your codebase in every direction at once. Read it [here](https://www.bytesizedai.dev/p/stop-letting-ai-build-horizontally).

**Dan's Thoughts:** The idea behind this comes from the concept of tracer bullets in The Pragmatic Programmer. Instead of letting AI scaffold out a wide, shallow codebase, you're better off building thin vertical slices that work end to end. It gives you a working path through your system that you can validate and build on. It's a much better way to use AI as a coding partner.

:TweetEmbed{id=2033603791933870361}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)