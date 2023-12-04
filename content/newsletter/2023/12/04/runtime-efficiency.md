---
title: Runtime Efficiency in Spring Boot 3
slug: runtime-efficiency
date: "2023-12-04T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. This week, I have a quick trip to Cincinnati to spend a day with a customer. I'll be discussing everything that's happening in Spring Boot 3, including some of the newest features in Spring Boot 3.2. It's also that time of the year where we are starting to wind down and look forward to the holidays and the new year.

When it comes to scheduling, I tend to be meticulous and detail-oriented. I enjoy carefully planning and organizing my time to ensure it is well-structured and efficiently managed. As the new year approaches, I like to start fresh with a new calendar and a list of things I would like to accomplish over the year, which I then break down into quarters.

I’m starting to put together some things I would like to learn in the new year and some goals I would like to accomplish. I plan on sharing those with you in the new year but until then I would like to hear from you. How do you go about planning for the new year?

In this edition of the newsletter I want to talk to you about runtime efficiency in Spring Boot 3.

## Runtime Efficiency In Spring Boot 3

Over the past year, I have had the opportunity to travel to conferences and meet with customers, discussing the impressive features of Spring Boot 3 and beyond. One of the prominent themes in Spring Boot 3 is Runtime Efficiency. But what does that really mean, and which features are contributing to it?

Runtime efficiency is focused on addressing the challenges that arise when dealing with various workloads in production. Traditionally, a typical Java-based application would be a long-running process designed to handle high throughput. In this scenario, the JVM excels at optimizing for such workloads. It identifies "hot spots" or frequently executed areas of the code and compiles them for further optimizations.

Today, we are developing a wide range of applications with diverse requirements. Some of these applications demand lower memory usage and faster startup times. For others, which involve blocking requests like communication with a database or an HTTP service, scalability is essential.

Java and Spring now provide solutions for building various types of applications. In Spring Boot 3.0, we introduced Ahead-of-Time (AoT) compilation as a prerequisite for creating native images with GraalVM. In Spring Boot 3.2, we are introducing support for Virtual Threads and Project CRaC (Coordinated Restore at Checkpoint).

### Spring Boot 3.2

In last week's episode of Spring Office Hours, we discussed the new release of Spring Boot 3.2. DaShaun and I had the opportunity to talk about the new features at a high level. We reviewed the release notes, which is a great resource for learning about the upgrade path, new features, and any deprecations. You can find the live stream below and listen to it on your favorite podcast player.

:YouTube{id=opji4Hue4xM}

### Virtual Threads

Virtual Threads were finalized in JDK 21, and now Spring has first-class support for them with the release of Spring Boot 3.2. In this tutorial I discuss what Virtual Threads are and how to enable them in a Spring Boot Application. We take a look at some benchmarks using Apache Benchmark to understand how Virtual Threads will provide significant scalability benefits.

:YouTube{id=THavIYnlwck}

### Project CRaC (Coordinated Restore at Checkpoint)

Last but not least I recorded a tutorial on Project CRaC with my good friend DaShaun. In this tutorial we take a look at what CRaC is and how it will help us improve startup times in our Spring Applications.

:YouTube{id=sVXUx_Y4hRU}

## Around the web

### 📝 Articles

I really enjoyed [this article](https://foojay.io/today/springboot-3-2-crac/) from Azul Developer Advocate and Java Champion Gerrit Grunwald. In this article Gerrit dives in CRaC support in Spring Boot 3.2.

### 🎙 Podcasts

I really enjoyed [this podcast](https://thenewstack.io/hey-programming-language-developer-get-over-yourself/) episode of The New Stack with Jean Yang of Akita Software. This episode got a little philosphical and I absolutely loved it.

### 📚 Books

I got an advanced copy of [Spring Security in Action, The Second Edition](https://amzn.to/3sTnI8P) by Laurentiu Splica. If you haven’t had a chance to check out the first edition you really should. In the meantime I am really looking forward to diving into this one.

### ✍️ Quote of the week

> It’s not the load that breaks you down. It’s the way you carry it. – Lou Holtz
>

### 🐦 Tweet

https://twitter.com/therealdanvega/status/1730676167487737950

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any links you would like me to include please [contact me](http://twitter.com/therealdanvega) and I might add them to a future newsletter. I hope you have a great week and as always friends...

Happy Coding<br/>
Dan Vega<br/>
danvega@gmail.com<br/>
https://www.danvega.dev