---
title: JetBrains Junie goes public, Building MCP Servers in Java & Presentation Recordings
slug: jetbrains-junie-goes-public
date: 2025-04-27T00:00:00.000Z
---

Happy Monday and welcome to another edition of the newsletter. It's hard to believe that we will flip the calendars to May later this week, but I am all for it. The weather is starting to turn the corner, and I am able to get outside and enjoy the sunshine. I don't know about you, but I work from my basement and I feel like I have been "locked up" for the winter, and it's definitely done a number on me mentally.

I missed last week's newsletter because I have been swamped trying to get caught up on the book that I'm writing. It's been a lot of hard work, and we are nearing the production finish line, not the actual finish line but a huge milestone nonetheless. The plan if for this book to be released early fall if everything comes together and I couldn't be more excited about it. I don't think I have shared this with anyone yet, but we have a color copy of what will be the cover of our book.

![Fundamentals of Spring 6 book cover](/images/newsletter/2025/04/27/FOSE_cover.png)

If you're on the [O'Reilly Platform](https://learning.oreilly.com/) you can get early access to the book right now!

This week I want to tell you about a couple of videos I made on JetBrains Junie and Building an MCP server with pure Java. I also gave some presentations over the last 2 weeks and I want to share those with you.

## JetBrains Junie goes Public

Last week, JetBrains released their AI coding agent "[Junie](https://www.jetbrains.com/junie/)" to the public by removing it from early access. I decided to sit down and create an introduction to Junie for Java/Spring developers by going through a couple of quick examples. First I took a look at how you can use the chat feature to learn more about working with existing codebases. Next I had it create me CRUD REST API in Spring and asked it to do retrieve data from a public API. After a pretty decent application I showed off how you can create a guidelines doc to help guide the AI agent to your coding standards and specifications. Overall I thought this was a pretty good tutorial and I hope you enjoy it.

:YouTube{id=fcbSG8lm7So}

## Building a Lightweight MCP Server with Pure Java SDK

In this week's tutorial, I show you how to implement a Model Context Protocol (MCP) server using only the core Java SDK — no Spring Framework required! This streamlined approach gives you more flexibility with lighter dependencies for projects where Spring isn't necessary.

The video walks through the complete process: setting up core MCP Java dependencies, implementing a server using standard Java SDK, working with STDIO transport implementations, and testing with the MCP Inspector tool. I build a simple service that provides JavaOne presentations data to demonstrate how easily you can create custom tools that LLMs like Claude can access. Perfect for developers who want to understand the fundamentals of MCP server implementation without framework overhead.

If you've been following my MCP series, this tutorial expands your toolkit with a more flexible, lightweight alternative. Check out the complete walkthrough below and grab the source code from our [GitHub repository](https://github.com/danvega/javaone-mcp)!

:YouTube{id=Y_Rk6QgWUbE}

## Presentation Recordings

I gave a couple of presentations over the last 2 weeks, and they happen to have been recorded. Thanks to both of these groups for inviting me to speak. If you would like me to speak at your meetup group or conference please feel free to reach out to me.

### AI-Powered Developer Hacks: Work Smarter, Not Harder

In my recent JetBrains livestream presentation, I shared practical ways developers can leverage AI tools to enhance productivity without replacing core skills. While many worry AI will replace developers, I firmly believe that "developers who use AI will replace those who don't" - finding the right balance is key to staying competitive.

I demonstrated how AI can transform everyday development workflows through several powerful applications:

**Effective Prompting Strategies**: I showed how structured, detailed prompts with clear context yield dramatically better results than vague requests. Using voice dictation for complex prompts can also save significant time compared to typing lengthy instructions.

**Learning Acceleration**: AI excels as a learning companion, helping both junior developers break down complex concepts and senior developers explore architectural patterns or emerging technologies. Creating personalized learning paths for new technologies has become one of my favorite applications.

**Code Comprehension**: With developers spending roughly 10x more time reading code than writing it, AI can dramatically improve onboarding to unfamiliar codebases by explaining design patterns, identifying dependencies, and suggesting refactoring opportunities.

**Documentation & Technical Writing**: AI significantly streamlines creating class documentation, API endpoint descriptions, and README files - mundane but essential tasks that often get neglected.

**Custom Tool Building**: I demonstrated how AI enables building developer tools that would previously require significant learning investment, sharing how I created a Raycast extension for Spring Boot project initialization despite limited React experience.

The presentation concluded with guidance on running AI models locally for security-sensitive work and how to effectively guide AI coding assistants with personalized guidelines files - showing how Junie can adapt to team coding conventions when properly instructed.

Remember - you are the pilot, not the passenger. Use AI to enhance your capabilities while maintaining critical oversight and understanding of the code it produces.

:YouTube{id=85tXw0uUN04}

### Building Intelligent Applications with Spring AI

In my recent session for Huawei's AI Echoes series, I demonstrated how Java developers can leverage Spring AI to build intelligent applications without needing to switch to Python. This powerful framework provides a consistent abstraction layer for working with various AI providers.

I walked through several key capabilities of Spring AI, demonstrating with working code samples:

First, I showed how easily a Spring Boot app can connect to large language models using a simple REST controller and the ChatClient interface. With just a few lines of configuration for your chosen AI provider (OpenAI in our example), you can start making chat completions or stream responses back to users.

The framework excels at making complex AI patterns accessible, including:

- **Structured Output:** Rather than receiving unstructured text, Spring AI can map responses directly to Java types, making integration with your domain model seamless.
- **Multi-modal Support:** Beyond text, I demonstrated sending images to the LLM and receiving detailed descriptions in return.
- **Memory Management:** Adding conversation memory through the ChatMemoryAdvisor makes it trivial to maintain context across stateless HTTP requests.
- **Tool Integration:** The @Tool annotation lets you extend AI capabilities by connecting to external systems like databases, APIs, or even simple utilities like getting the current date.

Version 1.0.0-M7 is the last milestone release, with GA expected in May before Spring I/O Barcelona. If you're building enterprise applications and need to incorporate AI capabilities, Spring AI provides a familiar, flexible approach that leverages your existing Java expertise.

The full code examples are available in my Spring AI workshop repository on GitHub.

:YouTube{id=omn3SrDSPJg}

**TWEETS**

:TweetEmbed{id=1913226370982740262}

:TweetEmbed{id=1912593645926244787}

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega) (I'm not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)