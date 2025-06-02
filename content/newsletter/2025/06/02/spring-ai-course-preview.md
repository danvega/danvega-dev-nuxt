---
title: Spring AI Course, MCP Security and my talk from Spring I/O
slug: spring-ai-course-preview
date: 2025-06-02T12:00:00.000Z
---

Happy Monday and welcome to another edition of the newsletter. I'm happy to announce that I have finished the last chapter in my book, [The Fundamentals of Software Engineering](https://learning.oreilly.com/library/view/fundamentals-of-software/9781098143220/). The last chapter was on AI, a subject I really love talking about. The real challenge with this chapter was not putting an entire book into a chapter and focusing on what software developers need to know and answering the question I keep getting asked which is "Will AI replace me?"

This doesn't mean that it is finished and ready to go to print, but it's a huge milestone to say the least. We still have a lot of edits to go through and a couple of start-to-finish reads to make sure everything is flowing correctly, but we are really happy with where it is. In fact, our editor sent along this message which made me smile and made me so happy because I have poured so much of my knowledge and experience into this book.

> I've completed a beginning-to-end review of the book so far. I have to say...I wish I had this book when I graduated from college.

Other than that, travel is ramping down for me which is really exciting because I get to focus on a few things that I have on my plate. I have a quick customer visit in Chicago next week and other than that I don't have anything planned until KCDC and SpringOne in August. After that, travel is going to ramp up in the fall because for whatever reason I have been accepted to a bunch of events that I'm excited about. As always, if you want to find out where I will be speaking next you can check out the [speaking page](https://www.danvega.dev/speaking) on my website.

## Master Spring AI: Build Intelligent Java Applications

I have really enjoyed traveling to customers and conferences and talking about AI over the last year. I love talking about everything that has been happening in this rapidly evolving space. One of the topics I have really enjoyed talking about is Spring AI. This new project in the Spring ecosystem has been in the works for almost 2 years now and recently [Spring AI 1.0 GA](https://spring.io/blog/2025/05/20/spring-ai-1-0-GA-released) was released.

I have released a ton of content around Spring AI on my YouTube channel but there is a need for an update because of everything that has happened in the framework over the last year or so. With that I'm happy to announce that I'm recording a new masterclass on everything you need to know to get up and running with 1.0. I will be recording the videos this week and hope to release it soon. The only decision I have left is should I release it as one long course or break it up into multiple videos. If you have any feedback on this or what you would like to see in this course let me know.

**What You'll Learn:**

- **AI Essentials for Java Developers** - Understand LLMs, prompt engineering techniques, and how to choose the right model for your needs
- **Spring AI Deep Dive** - Go beyond simple API calls to leverage Spring AI's powerful features including streaming responses, structured outputs, and multimodal capabilities (images, audio)
- **Real-World Implementation** - Work with both proprietary (OpenAI, Anthropic) and open-source models using Ollama and Docker
- **Advanced Techniques** - Master Retrieval Augmented Generation (RAG), build custom tools and functions, and explore the Model Context Protocol (MCP) for cross-language tool sharing
- **Production Best Practices** - Handle memory management, implement proper testing strategies for non-deterministic outputs, and understand pricing/token optimization

**Who This Is For:** Java developers who want to integrate AI capabilities into their applications without switching languages or frameworks. No prior AI experience required - we'll cover everything from "What is AI?" to building sophisticated AI-powered features.

**Key Takeaway:** Spring AI is more than just a wrapper for LLM APIs - it's a complete framework that brings the full power of modern AI to the Java ecosystem. By the end of this course, you'll be confidently building intelligent applications that leverage the latest in generative AI technology.

*Get hands-on with practical examples, real-world tools integration, and production-ready code you can immediately apply to your projects.*

If you want to get your hands on this new course which will be made available for free on YouTube pay attention to this newsletter and make sure you're [subscribed to my channel](https://www.youtube.com/@danvega).

## Securing Spring AI MCP Servers with OAuth 2

You can't go anywhere on the internet right now without seeing a video or reading an article about Model Context Protocol (MCP). I keep reading about security vulnerabilities in MCP servers and it is something we need to think about. I decided to record a video over on the Spring Developer YouTube channel last week based on an [article](https://spring.io/blog/2025/05/19/spring-ai-mcp-client-oauth2) from my friend and colleague Daniel Garnier-Moiroux on securing MCP servers with OAuth 2 and Spring Security.

In this video, I walk through how to lock down your Spring AI Model Context Protocol (MCP) servers using OAuth 2 authentication. With developers rushing to build MCP servers, security is often overlooked—but exposing these endpoints without proper authentication is asking for trouble.

### Key Takeaways:

**The Problem**: MCP servers are just like REST APIs. If you're exposing tools or data you don't want public, you need proper security measures in place.

**The Solution**: Using Spring Security with OAuth 2, you can quickly add authentication to your MCP servers. The tutorial demonstrates:

- Adding Spring Authorization Server and Resource Server dependencies
- Configuring OAuth 2 client credentials in `application.properties`
- Setting up a basic security configuration that requires authentication for all requests
- Testing with curl commands and the MCP Inspector tool

**What's Covered**:

- Converting an unsecured weather MCP server to require OAuth 2 tokens
- Using client credentials grant for machine-to-machine authentication
- Testing secured endpoints with bearer tokens
- Configuring CORS for browser-based testing tools

**Next Steps**: The article mentions future enhancements like implementing authorization code flow for user authentication and role-based access control (RBAC) for fine-grained permissions.

This is based on an excellent article by Daniel Garnier-Moiroux on the Spring blog. If you're building MCP servers in 2025, implementing proper security isn't optional—it's essential.

:YouTube{id=gBUnLYFwwyE}

## Code Smarter, Not Harder at Spring I/O

A couple of weeks ago I had the privilege of attending and speaking at one of my favorite conferences, Spring I/O. One of the talks I gave was on some of my AI powered dev hacks I use in my day-to-day workflows. You are probably using some of these already but my hope with this talk is to share what I'm doing and hopefully you learn 1 or 2 things that you can incorporate into your daily workflows. You can find the recording below and as always I would love your feedback.

:YouTube{id=koYCcvPvaY0}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)