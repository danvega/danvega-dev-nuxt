---
title: Spring Boot 3.4, Spring AI M4 and AI Agents!
slug: spring-boot-3-4-0-released
date: "2024-11-25T09:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. It’s Thanksgiving here in the US this week so I thought I would start this off my saying what I’m thankful for. I’m first and foremost thankful for my family. They are why I wake up every day and they make everything worth it.

I’m thankful for all of you. I know we get caught up in this world of social media on how many followers we have (I’m guilty of this) but It’s the wrong way to look at it. I would much rather have 100 followers on any platform that wanted to learn from me or cared what I have to say as opposed to 100,000 followers who didn’t really care about me.

I love what I get to do every single day. I love to learn and teach what I know back to the community. This could be through my YouTube channel, newsletter, blog, presentation or any of the number of things I’m working on. The fact that I still get excited rolling into work every day is the gift of a lifetime and I don’t take it for granted.

So thank you to all of you who follow me here or on social media and allow me to ramble about the things I am passionate about ❤️

![Thankful for you](/images/newsletter/2024/11/25/thankful-for-being-your-teacher-2.png)

In this issue I want to talk about Spring Boot 3.4, Spring AI and AI Agents.

## Spring Boot 3.4

It’s a great time to be a Java and Spring developer. Every 6 months we get a new version of Java with the latest version 23 being released in September. Last week Spring Boot 3.4 was released and it came packed full of updates. If you want to learn more about what changed along with what’s new you can check out the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.4-Release-Notes).

I wasn’t able to be a part of it last week but DaShaun and Phil Webb had a special edition of the Spring Office Hours Podcast had a release party. It’s always great hearing from Phil and the Spring Team about all of their hard work.

:YouTube{id=ivKvlLJ_y4s}

I will be working on some content around Spring Boot 3.4 over the next few weeks and here is what I plan on focusing on:

🔄 HTTP Client Enhancements
*   Improved RestClient/RestTemplate auto-configuration
*   Support for multiple HTTP clients (Apache, Jetty, Reactor Netty, JDK)
*   Graceful shutdown now enabled by default

📊 Observability & Logging
*   New structured logging support (ECS, GELF, Logstash)
*   Enhanced OTLP tracing with gRPC transport
*   Improved SSL monitoring and certificate health checks

🧪 Testing & Development
*   AssertJ support for MockMvc
*   Enhanced Testcontainers and Docker Compose support
*   New @Fallback annotation for conditional beans

🛠️ Infrastructure Updates
*   Smaller container images with new tiny builder default
*   Virtual threads support in key components
*   Improved bean validation and configuration properties

🔄 Framework Updates
*   Spring Framework 6.2
*   Spring Security 6.4
*   Spring Data 2024.1

This release focuses on developer experience, observability, and performance while maintaining backward compatibility.

## Spring AI M4

![Spring AI](/images/newsletter/2024/11/25/spring-ai---robots-writing-code-4.png)

Last week also brought us the [Spring AI 1.0.0 M4 release](https://spring.io/blog/2024/11/20/spring-ai-1-0-0-m4-released), and it's packed with exciting new features that make AI integration even more accessible for Spring developers. Here are the highlights I'm particularly excited about:

🤖 Amazon Bedrock Converse
*   New unified interface for Amazon's AI chat models
*   Adds powerful features like Tool Calling and Visual capabilities
*   If you're using Amazon's models, this is the way forward

⚡ Supercharged Function Calling
*   Better support for Java functions (Function, Supplier, Consumer)
*   New Tool Context for state management
*   Setting up the foundation for @ToolMapping coming in M5

🎯 Kotlin First-Class Support
*   Finally, proper Kotlin support with type-safe APIs
*   Direct Kotlin function registration as AI tools
*   Makes AI integration feel native for Kotlin developers

📚 Advanced RAG (Retrieval Augmented Generation)
*   New experimental modular system
*   Think LEGO blocks for building AI retrieval systems
*   Flexible components for query transformation, routing, and document handling

The team is pushing hard toward GA, with M5 planned for December and the final release coming in January. If you're interested in AI development with Spring, now is a great time to start experimenting with these features.

## AI Agents

![AI Agents](/images/newsletter/2024/11/25/robots-acting-as-agents-or-virtual-assistants-5.jpeg)

There's been a lot of excitement around AI Agents lately, and for good reason. In my latest ByteSized AI newsletter, I wanted to cut through the noise and explain why they're such a big deal.

Here's the key insight: Traditional AI is reactive - like a really smart assistant waiting for your questions. You prompt, it responds. But AI Agents? They're proactive players that can observe, decide, and act on their own. Think of them as AI systems that don't just answer questions, but can actually get things done.

🤖 What makes them special:
*   They understand their environment
*   Make autonomous decisions
*   Take actions to achieve goals
*   Learn and adapt from experience

Want to dive deeper? I break it all down in my [latest article](https://www.bytesizedai.dev/p/ai-agents-the-next-evolution-in-automation).

I really liked [this video](https://youtu.be/KrRD7r7y7NY) from Andrew Ng who is one the great minds we have in the AI space. In this presentation Andrew goes through his definition of AI agents and I feel like I learned a lot from this and definitely worth a watch.

**TWEETS**

I don’t know what is going on with YouTube lately but one video seems to be getting a lot of love. 160,000 views in 28 days is pretty wild. If all of my videos were

:TweetEmbed{id="1860769389454184468"}

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on https://twitter.com/therealdanvega).

Happy Coding  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev)