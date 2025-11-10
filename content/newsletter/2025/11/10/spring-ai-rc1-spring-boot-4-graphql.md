---
title: "Spring AI 1.1.0 RC1, Spring Boot 4 is Almost Here and Building a GraphQL API in 20 Minutes"
slug: "spring-ai-rc1-spring-boot-4-graphql"
date: "2025-11-10"
description: "Spring AI 1.1.0 RC1 is available with MCP client support, Spring Boot 4 brings null safety and simplified HTTP interfaces, plus my SpringOne GraphQL talk recording."
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. The days are shorter now and as I write this on a Sunday afternoon there is a good chance that we are going to get some snow tomorrow. I'm just not ready for this so I am going to focus on some positive things here.

If you have been actually reading these newsletters (Thank You 🙏🏻) you know I just finished up my first book. The [online version](https://learning.oreilly.com/library/view/fundamentals-of-software/9781098143220/) has been updated to the final version and is now available to read. If you end up reading it please consider giving a review online and letting us know what you think. If you enjoyed it please let me know and I can include your review on the website I am building out for the book and podcast.

I'm going to be traveling the next 2 weeks for customer visits and conferences. There is a government shutdown that might put a wrench in those plans so I hope they can get this straightened out quickly. I feel awful for all of those hard working government employees who are working for free during this shutdown and enabling us to travel. Please be kind to them over the next however many weeks, it's probably not easy for them.

In 2 weeks I will be in San Francisco for QCon and I couldn't be more excited to speak and attend my very first QCon. I will be giving 2 workshops on Thursday, November 20th. The first one will be an introduction to [AI for Java Developers](https://qconsf.com/training/nov2025/building-intelligent-java-applications-developers-workshop). The second one will be based on the book and I get to share the stage with my good friend Nate Schutta. We will be discussing [The Fundamentals of Software Engineering in the age of AI](https://qconsf.com/training/nov2025/sold-out-fundamentals-software-engineering-age-ai). I hope to see some of you there and even if you're not joining our workshops please introduce yourself and say hi 👋🏻

## Spring AI 1.1.0 RC1 Available Now

The Spring AI team has been turning out some amazing features in 1.1.0 and now [RC1 is available](https://spring.io/blog/2025/11/08/spring-ai-1-1-0-RC1-available-now) which means we are getting close to a release. I said from the beginning of this release that it really started to feel like a 2.0 release with how many new features were shipping and the large number of bug fixes they addressed.

### MCP Clients with Spring AI

Last week I published a new video on building MCP Clients with Spring AI. I think you have all probably heard of MCP Servers at this point but why would you need a client? Yes you can consume your MCP Server using your favorite clients like Claude Desktop, Claude Code, Visual Studio Code, Cursor and more. But what if you wanted to build an application using Spring AI and you wanted to bring in support for one or more MCP Servers?

In this video, I demonstrate how to build MCP (Model Context Protocol) clients using Spring AI to augment large language models with custom context and capabilities. Starting with Spring AI 1.1.0 milestone 3's simplified approach, I walk through creating a Spring Boot application that integrates my "[Dan Vega as a Service](https://www.danvega.dev/mcp)" MCP server. This practical example provides access to my YouTube videos, blog posts, and other content that LLMs aren't trained on. The tutorial covers configuring the MCP client with streamable HTTP connections, setting up tool callbacks, and integrating these tools with the chat client to answer domain-specific questions.

You'll learn how to stitch together multiple MCP servers to build powerful AI applications while maintaining model agnosticism, meaning the same code works whether you're using OpenAI, Anthropic, or Google Gemini. The complete example shows how MCP servers solve the context limitation problem in LLMs by providing a reusable, packageable way to add specialized knowledge to any AI application.

:YouTube{id=TSFkdlreRMQ}

### Securing MCP Servers

Speaking of MCP servers, I'm not sure if I shared this video I made a couple of weeks ago on securing them with Spring Security. After my conversation with Daniel Garnier-Moiroux about the security implications of exposing MCP servers, I realized we needed a way to protect these endpoints from unauthorized access. The video demonstrates how to add authentication and authorization to MCP servers using Spring Security's built-in features. I walk through configuring basic authentication, setting up OAuth2 support, and implementing role-based access control for different MCP tools.

You'll learn how to secure remote MCP server deployments using the Streamable HTTP Transport. The tutorial also covers best practices for managing API keys and tokens when your MCP server needs to access external services. The example shows how to build production-ready MCP servers that maintain the flexibility of the protocol while ensuring your data and tools remain protected from unauthorized use.

:YouTube{id=Xiw4bMD3SOg}

## Spring Boot 4 is Almost Here!

I can't believe how close we are to the release of Spring Framework 7 and Spring Boot 4. I have spent a lot of time lately learning about some of the new features by getting my hands dirty and writing some code. I have to say there are a number of features that I didn't think were a big deal and now they are some of my favorites. Last week on [Spring Office Hours](https://www.springofficehours.io/) DaShaun and I talked about Spring Boot 4 at a high level and what we are excited about.

:YouTube{id=imaP2ctZg5Q}

### Null Safety with JSpecify and NullAway

Spring Boot 4 introduces explicit null safety using JSpecify annotations, turning Java's implicit nullability problem into a compile-time solution. Instead of guessing whether methods can return null (and risking those dreaded NullPointerExceptions in production), you now declare nullability explicitly in your type signatures. By adding `@NullMarked` at the package level, everything becomes non-null by default, then you use `@Nullable` only where nulls are actually allowed, like optional fields or methods that might not find results.

This approach works beautifully with collections and arrays too, letting you specify that while the collection itself is non-null, its elements might be nullable. The real win here is confidence: your IDE catches potential null issues during development, not after deployment. Check out [my blog post](https://www.danvega.dev/blog/spring-boot-4-null-safety) which includes a walkthrough of this feature and the source code for the Coffee Shop example I used in the tutorial.

:YouTube{id=QlGnaRoujL8}

### Creating REST Clients in Spring Boot 4

Spring Boot 4 streamlines HTTP interfaces by eliminating the proxy factory boilerplate required in version 3. Instead of manually creating RestClient adapters and HTTP service proxy factories for each service integration, you now simply annotate a configuration class with `@ImportHttpService(ToDoService.class)` and Spring handles the rest. Your service interface stays clean, just method signatures with `@GetExchange`, `@PostExchange`, and other HTTP annotations that Spring automatically implements using RestClient under the hood.

The real win comes when you're integrating multiple services: group them by package, apply default headers or security across all of them, and configure everything in one place without drowning in bean definitions. While one service integration wasn't painful before, managing ten or twenty would quickly become a maintenance nightmare. Now it's just a matter of listing your interfaces in the import annotation. Check out the complete example with JSONPlaceholder integration on [GitHub](https://github.com/danvega/sb4-http-interfaces), and explore the Spring docs for advanced configuration options like service grouping and custom interceptors.

:YouTube{id=TEd5e4Thu7M}

## Beyond REST: Crafting a Modern GraphQL API Live

I realized this week that I haven't shared out the recording from my talk at SpringOne on GraphQL. This one was a lot of fun and quite the challenge. I was given 20 minutes and needed to build a GraphQL API live. I thought for how much I had to pack in such a short amount of time that it turned out well.

:YouTube{id=bXxpIDh-SgM}

## TWEETS

I'm a big fan of custom slash commands in Claude Code.

:TweetEmbed{id=1986906652964950106}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
