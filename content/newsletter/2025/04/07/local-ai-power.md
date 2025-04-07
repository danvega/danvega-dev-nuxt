---
title: "Local AI Power: Docker's Model Runner, MCP Revolution, and My JDConf Sessions"
slug: local-ai-power
date: 2025-04-06T00:00:00.000Z
---

Happy Monday and welcome to another edition of The Beehive! This week is particularly exciting as I'll be speaking at Microsoft's JDConf 2025 with two sessions – one live for our night owl friends in the Asia-Pacific region, and another on-demand covering the latest Spring innovations.

If you've been looking to break free from cloud AI dependencies, you're in luck. Last week's video demonstration of Docker Desktop's new Model Runner feature shows how to run powerful AI models like Google's Gemma 3 completely locally – zero API keys, zero data sharing, and zero monthly fees. Plus, I dive into the Model Context Protocol (MCP) that's revolutionizing how AI systems access external tools (think of it as the USB-C standardization of AI integrations).

As always, I've packed this newsletter with practical insights, code examples, and upcoming events to help you stay at the cutting edge of Java and AI development. Let's dive in!

## Run AI Models Locally: Docker Desktop's Game-Changing Model Runner Feature

Tired of cloud API dependencies for your AI applications? In last week's video, I demonstrate Docker Desktop's powerful new Model Runner feature that lets you run AI models completely locally on your machine. I show you how to run Google's Gemma 3 open-source model with zero API keys, zero data sharing, and zero monthly fees—all while maintaining impressive performance on Apple Silicon.

The video provides a step-by-step walkthrough of configuring Docker Desktop's Model Runner, pulling AI models from Docker Hub, and integrating them with Spring Boot applications using Spring AI. You'll see how to create a fully functional AI-powered Java application in just 15 minutes, complete with code examples that show how easily you can switch from cloud-based models to local ones without changing your application architecture.

Click the video below to discover this developer-friendly approach to AI implementation that gives you complete control over your data while eliminating ongoing costs!

:YouTube{id=6E6JFLMHcoQ}

## Model Context Protocol: Unleashing AI's Full Potential

In my [Spring Office Hours podcast](https://spring-office-hours.transistor.fm/episodes/s4e8-model-context-protocol-an-introduction-for-java-spring-developers) this week (Season 4, Episode 8), Deshawn Carter and I explored the rapidly evolving Model Context Protocol (MCP) - a new approach to extending AI capabilities that's being widely adopted across the industry.

MCP addresses fundamental limitations of large language models by providing them with tools to access real-time data, interact with external APIs, and connect with your local machine or organization's documents. This protocol, introduced by Anthropic in November, has quickly gained industry-wide adoption with OpenAI and Google now supporting it.

The core value of MCP lies in its client-server architecture that standardizes how AI systems access external tools. I compared it to USB-C standardization - instead of creating custom integrations for each application, developers can create reusable MCP servers that any compatible client can leverage.

During the episode, I demonstrated how I use multiple MCP servers together to automate workflows, such as transforming my Beehive newsletter content into markdown for my website - eliminating previously manual conversion processes.

My team at Spring has made significant contributions to the MCP ecosystem. We donated the official Java SDK for MCP that was adopted by Anthropic. This makes building MCP servers with Spring Boot straightforward, but also supports pure Java implementations without requiring a web framework.

The full episode is available now on the Spring Developer YouTube channel and wherever you get your podcasts.

:YouTube{id=laJyrPIxSWc}

If you found that interesting this week we welcome [James Ward](https://x.com/JamesWard), Principal Developer Advocate at AWS. In this episode we explore James' career journey, his podcast work and his expertise in Java. The conversation dives into Amazon's Nova model and James' recent article on [running MCP-based agents on AWS](https://community.aws/content/2v8AETAkyvPp9RVKC4YChncaEbs/running-mcp-based-agents-clients-servers-on-aws).

## Join Me at JDConf 2025 This Week!

I'm excited to share that I'll be speaking at [Microsoft's JDConf 2025](https://jdconf.com/) this week with not one but two sessions! This conference brings together the brightest minds in Java development to explore the future of Java in an AI-driven, cloud-native world.

### My Sessions:

1. **AI for Java Developers** - Live on April 9th at 10:30 PM EDT (I know, crazy time - but perfect for our Asia-Pacific audience!)
   In this session, I'll be covering essential AI concepts for Java developers and demonstrating practical implementations using modern frameworks and tools.

2. **What's New in Spring** - Available On-Demand
   This session explores the latest innovations in the Spring ecosystem, covering new features, improvements, and best practices that every Spring developer should know about.

JDConf 2025 features an impressive lineup of speakers from Microsoft, Broadcom, Red Hat, IBM, Oracle and more, with sessions covering everything from AI integration and cloud-native development to performance optimization and security.

The event is organized across three regional broadcasts (Americas, Asia-Pacific, and EMEA) to accommodate global attendees, plus there's a rich catalog of on-demand sessions available anytime.

Best of all, registration is free! Head over to the [JDConf](https://jdconf.com/) website to RSVP and check out the full agenda. I hope to see you there!

Here is an interesting use case for the new native image generation in ChatGPT

:TweetEmbed{id=1907805519680524762}

I'm trying to put together a tutorial on the new feature in JDK 24 that doesn't pin virtual threads in synchronized methods or blocks and I'm having trouble showing the performance benefits. Can anyone point me in the right direction?

:TweetEmbed{id=1908141714243572092}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).

Happy Coding,    
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)