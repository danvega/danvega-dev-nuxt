---
title: "Securing MCP Servers with Spring AI, Compacting Chat Memory Advisor and QCon San Francisco"
slug: "securing-mcp-servers-spring-ai"
date: "2025-10-20"
description: "Learn about securing MCP servers in Spring AI, building a custom compacting chat memory advisor, and Dan's upcoming workshop at QCon San Francisco on building intelligent Java applications."
tags: ["spring-ai", "mcp", "java", "spring-boot", "security", "qcon"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. It's been such a busy year that all of a sudden I look up and it is almost Halloween 🎃 I had a great week last week catching up on some things and finally getting to a point where I can breathe a little bit, which is a great feeling. I gave three presentations this week to customers on Spring AI, one of which was a 90-minute workshop on building MCP Servers in Spring. Someone asked if this was recorded and unfortunately it wasn't, but it got me thinking. Maybe I can try to run some regular workshops (free of course) and I'm just trying to think of the best way to do that. If you're interested in that, please let me know.

I mentioned last week that the book I'm writing with my friend Nate Schutta is getting closer and closer to a release. I will let you know when it is officially out, but when it does come out you can get instant access to it through the [O'Reilly Learning Platform](https://learning.oreilly.com/) or order it on Amazon. I'm also excited to tell you about another project I'm working on with Nate, a podcast and YouTube channel around this topic called The Fundamentals of Software Engineering Podcast. We are going to begin recording this week and I'll let you know as soon as the first few episodes are available.

This week I'm excited to share with you some code I wrote around securing MCP servers, a new Spring AI Advisor for compacting chat memory, and my upcoming Spring AI Workshop at QCon San Francisco.

## Securing MCP Servers with Spring AI

Last week I spent some time going through an excellent article by coworker Daniel Garnier-Moiroux on [Securing MCP Servers in Spring AI](https://spring.io/blog/2025/09/30/spring-ai-mcp-server-security). This is a hot topic because as we start building MCP servers, you might start out by building local ones but eventually you will want to move some of these to the cloud for everyone to access.

I put together [this repository](https://github.com/danvega/mcps) that has the code for securing a Spring AI MCP server using Spring Security and the Spring Authorization Server. When I'm dealing with workflows like this, it's also helpful for me to build a mental model of how this works. This is another topic we touch on in the new book. So I decided to sit down and diagram this out in one of my favorite tools, Excalidraw. Let me know if this helps and I'm also curious if this is something you do when trying to understand a concept.

![MCP Server Security Diagram](/images/newsletter/2025/10/20/mcp-security-diagram.jpeg)

I'm also really excited to sit down with Daniel on this week's Spring Office Hours. If you are reading this before 10 AM EDT on Thursday October 23rd, you can join us live or catch the replay on the Spring Developer YouTube Channel. If you aren't aware, Spring Office Hours we also turn this into a podcast so you can get this wherever you get your podcasts.

:YouTube{id=JmFdDoAJnvM}

## Compacting Chat Memory Advisor for Spring AI

A few weeks ago at dev2Next in Colorado Springs, I sat in on a fascinating comparison between LangChain4j and Spring AI when someone raised an intriguing question about chat memory limitations. They asked what happens when you hit the maximum message count in Spring AI's chat memory advisor - do the messages just disappear? That moment sparked an idea: why not build a custom advisor that intelligently compacts conversation history instead of simply clearing it, similar to Claude Code's `/compact` command?

In this video, I demonstrate building a custom compacting chat memory advisor that automatically summarizes conversation history when approaching token limits. The solution monitors message thresholds (configurable at 75% capacity by default) and uses an LLM to compress multiple messages into concise summaries, dramatically reducing token usage while preserving context. Rather than losing all conversation history when hitting the 20-message default limit, this advisor maintains continuity by intelligently consolidating older messages. While this is currently a proof-of-concept I hacked together after the conference, it showcases the real power of Spring AI's advisor pattern - the ability to wrap LLM calls with custom logic to solve specific challenges. The complete code is available on [GitHub](https://github.com/danvega/compacting-chat-memory-advisor) for anyone looking to implement smarter conversation memory management or build their own custom advisors.

:YouTube{id=hyK20bn38lM}

## QCon San Francisco

I'm really excited to be heading to and speaking at my very first QCon event in San Francisco next month. In this workshop I will have a half day to teach developers about why building AI applications in Java is such a great opportunity right now. You will learn how to write your first AI application using Spring AI and why a framework like this is so much more than a facility for making REST calls to an LLM. I'll show you all of my favorite features in the framework such as a unified API for all the major Large Language Models and the code that we write is the same and we can swap out models using configuration. If you're going to be there, please make sure to say hi and introduce yourself.

[Building Intelligent Java Applications: A Developer's Workshop at QCon San Francisco 2025](https://qconsf.com/training/nov2025/building-intelligent-java-applications-developers-workshop)

## Tweets

I don't know about you but I am really excited about JavaScript 🤣

:TweetEmbed{id=1979557079934505019}

I love all of these tools we have at our disposal but is anyone else finding it hard to keep up with all of these features? Claude Code introduced Claude Skills last week.

:TweetEmbed{id=1979166173049532562}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
