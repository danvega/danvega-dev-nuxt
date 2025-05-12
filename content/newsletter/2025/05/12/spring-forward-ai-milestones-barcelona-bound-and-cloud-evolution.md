---
title: "Spring Forward: AI Milestones, Barcelona Bound, and Cloud Evolution"
slug: spring-forward-ai-milestones-barcelona-bound-and-cloud-evolution
date: 2025-05-12T00:00:00.000Z
---

Happy Monday and welcome to another edition of the newsletter. You know that feeling when everything in your tech world suddenly aligns? That's my week. Just back from Charleston's charming King Street where I witnessed firsthand how Tanzu Platform is transforming deployments ("Here's my code, run it for me" - music to a developer's ears!), I'm already packing for Barcelona and Spring I/O 2025.

With Spring AI hitting its final milestone before 1.0, Spring Cloud 2025 shaping the future of distributed systems, and AI-powered development becoming our daily reality, we're living through one of the most exciting transformations in the Java ecosystem. Whether you're curious about S3 configuration support, Spring Framework 7's upcoming API versioning, or how to actually use AI to code smarter (not harder), I've got you covered this week.

Plus, did you catch that OpenAI-Windsurf acquisition news? Three billion reasons why the AI development landscape just got more interesting. Let's dive in!

## Southern Hospitality Meets Spring Technology

Last week I had a quick trip to Charleston, SC to visit a customer. I have had the pleasure of visiting the great state of South Carolina before, in fact my family and I love visiting Hilton Head and are planning to head there this summer. I have never had the opportunity until now to visit Charleston and I have to say for the 2 days I was there it was a wonderful place to visit. I arrived on Sunday and stayed down on King Street which is a really cool area lined with shopping and restaurants. The streets were packed on Sunday with everyone dressed in their Southern Sunday best and I really enjoyed it there.

The customer visit went great where I had the opportunity to give 2 talks. The first was on the current state of Spring. With Spring 3.5 coming later this month, and the last minor release in the 3.x line it was an opportunity to reflect on all of the wonderful features Spring Boot 3.x has given us. I also had the chance to take a look at what's coming in Spring Boot 4 and Spring Framework 7 later this year. While this session wasn't recorded I did give a similar talk at Microsoft's JDConf last month and you can find a recording of that [video here](https://youtu.be/uwjwBUsnVhY).

I also gave an introduction to Spring AI which was a lot of fun. This customer, like most I get to talk to these days is heavily invested in AI and I can't wait to see what they do with Spring AI. This customer was also a huge user of Tanzu Platform and I loved hearing how much they love the cf push experience. Here is my code, run it for me. They kept telling us how they couldn't imagine deployments without it.

## Spring I/O 2025

Next week I'm heading to Europe for a week and I'm really looking forward to this trip. I'm stopping in Amsterdam for a day for a customer visit and then I'm off to the great city of Barcelona for Spring I/O 2025. On Monday May 12 at 10 AM EDT I will be interviewing the great Sergi Almar, the man behind the conference. If you miss the livestream you can always catch the replay or listen to it wherever you get your podcasts.

:YouTube{id=kxYMqcC0HV4}

Last year was my first time at Spring I/O and as a Spring Developer I was in awe of the conference. Usually when I go to conferences I can seek out my fellow Java / Spring developers but there they are everywhere. The conference is packed with amazing content and the hallway tracks are filled with great conversations.

I will be giving a talk titled "Code Smarter, Not Harder: AI-Powered Dev Hacks for All". In this talk you'll discover how to harness AI-powered tools for everyday tasks like code generation, documentation writing, and collaborative programming with AI assistants. Through practical demonstrations, we'll show how to integrate these technologies seamlessly into your development routine, no matter which programming language or development environment you use.

I will also have a small part on the mainstage prior to the keynote. If you're going to be at the conference I would really love to meetup at chat. I'm taking all of my camera equipment and I'm going to try and record a bunch of content while I'm there.

## Spring AI M8

Last week [Spring AI 1.0.0 M8](https://spring.io/blog/2025/04/30/spring-ai-1-0-0-m8-released) was released and this will now be the final milestone release before the release candidate and GA release later this month. While M7 was going to the final milestone the team realized that instead of introducing a breaking change in the release candidate it would be better to get this into M8.

There is going to be a bunch of exciting talks, blog posts and videos coming out around the release of Spring AI which is nearly 2 years in the making. This project is amazing and I'm so excited for to hit 1.0. I'm working on a full course that will teach you everything you need to know to get up and running with Spring AI and my plan is to release that the week after Spring I/O. I'm doing this so I can record all of the videos using the brand new 1.0 release.

## Spring Cloud 2025: New Features & Future Direction

I caught up with Spring Cloud veterans Ryan Baxter and Spencer Gibb to discuss what's new in the upcoming 2025.0 release and where the project is heading.

### Key Highlights

**Spring Cloud Explained Simply**: Spencer shared a perfect mental model - Spring Boot handles single processes, Spring Cloud manages multiple processes. It's the abstraction layer for distributed systems, letting you choose between Eureka/Consul for service discovery or Git/S3/Vault for configuration without vendor lock-in.

**Major Features in 2025.0 RC1** (GA release targeted for May):

- **S3 Configuration Support**: Store config directly in AWS S3 buckets
- **Composite Configurations**: Pull from multiple sources (Git, S3, config maps) through a single config server
- **Gateway Gets Messaging**: Route HTTP requests directly to message brokers via Spring Cloud Stream/Function integration
- **Clearer Gateway Naming**: Four distinct variants now clearly named (Server WebFlux/MVC, Proxy Exchange WebFlux/MVC)

**Spring Framework 7 Prep**: The new API versioning features coming in Framework 7 will integrate seamlessly with Gateway for version-based routing and load balancing.

**Community Feedback Needed**: With a small team, the Spring Cloud team relies heavily on community input. They specifically want feedback on the new gateway messaging features and configuration repository preferences.

This marks the first time Spring Cloud will have two release trains in one year - preparing for the major changes coming with Spring Framework 7 and Boot 4 in November while delivering important features now.

Watch the full replay below for technical details, live Q&A, and deeper insights into Spring Cloud's evolution.

:YouTube{id=xQTke50Nvcc}

**TWEETS**

I teased this last week but it was made official. OpenAI is acquiring Windsurf for 3 billion

:TweetEmbed{id=1919735284133962063}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega) (I'm not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)