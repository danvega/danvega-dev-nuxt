---
title: Spring Security 6.4 Released, JTE Production Guide, and Spring gRPC Preview
slug: spring-grpc-preview
date: "2024-12-23T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. It’s hard to believe that Christmas is in a few days and then we turn the pages on 2024 and head into the new year. We are hosting a special Spring Office Hours today at 1 PM EDT over on the [Spring Developer YouTube Channel](https://www.youtube.com/watch?v=moWjYv7j56s). In this episode we will review what happened in Java and Spring and why its an exciting time to be a Spring Developer.

## Spring Security 6.4 Features Interview with Rob Winch

In this week's Spring Office Hours, I sat down with Rob Winch, Spring Security project lead, to explore the latest features in [Spring Security 6.4](https://docs.spring.io/spring-security/reference/whats-new.html) (included with Spring Boot 3.4).

Two major highlights from this release:
*   One-time token login: A streamlined authentication method allowing users to log in via email-delivered tokens, perfect for applications prioritizing user convenience.
*   Passkey support: A modern authentication approach using public-key cryptography and biometrics, offering enhanced security without password management headaches.

Rob also emphasized preparing for Spring Security 7.0 by adopting the Lambda DSL configuration style. While both configuration styles work in 6.4, only Lambda DSL will be supported in 7.0.

Catch the full discussion on Spring Developer YouTube channel or your favorite podcast platform to learn more about these features and implementation details.

:YouTube{id=FxfrJbdQ0Bo}

## Taking JTE Apps to Production with Spring Boot

In my latest video, I explore how to deploy Spring Boot applications using Java Template Engine (JTE) to production. If you haven't tried JTE yet, it's a great alternative to Thymeleaf or Mustache that offers pre-compiled templates and better IDE integration for working with Java objects. It's now available right from Spring Initializer!

I ran into some interesting challenges while taking my JTE apps to production, and I wanted to share two key solutions I discovered:

**For JAR Deployments:**
* You'll need to set `jte.development-mode=false` and `jte.use-precompiled-templates=true` in your production properties
* I show how to use Spring profiles to keep your dev and prod configurations separate

**For Native Images with GraalVM:**
* The trick is properly configuring runtime hints for template resolution
* I demonstrate the exact implementation needed to get your templates working in native images

I walk through everything using a simple todo application, and you can find all the code on my GitHub at [github.com/danvega/jte-production](https://github.com/danvega/jte-production).

Whether you're just getting started with JTE or looking to deploy existing applications, these solutions should help you avoid the common pitfalls I encountered. Check out the full video for the step-by-step walkthrough!

:YouTube{id=DuVxoVc_vD4}

## Spring gRPC

If you haven’t noticed there is a new starter (currently experimental) on the Spring Initializr for [Spring gRPC](https://github.com/spring-projects-experimental/spring-grpc).

![Spring gRPC](/images/newsletter/2024/12/22/spring-grpc.png)

Spring gRPC is a new project that brings gRPC development into the Spring ecosystem, making it easier to build gRPC applications using familiar Spring patterns and conventions. Here are the key points:

1.  Core Features:
   *   Spring-friendly API and abstractions for gRPC development
   *   Spring Boot starter with Auto Configuration support
   *   Dependency injection integration
   *   Support for both client and server implementations
   *   Native image support for GraalVM

2.  Getting Started:
*   Can be initialized through Spring Initializr
*   Uses standard protobuf definitions for service contracts
*   Works with both Maven and Gradle build systems
*   Default server port is 9090

3.  Key Components:
*   Server side: Uses `@Service` annotations with gRPC generated base classes
*   Client side: Provides `GrpcChannelFactory` for creating client connections
*   Configuration can be done through standard Spring properties files

4.  Notable Benefits:
*   Simplifies gRPC integration in Spring applications
*   Provides Spring Boot-style autoconfiguration
*   Supports Spring Boot 3.4.x
*   Offers configuration externalization through properties

It essentially brings the "Spring way" of doing things to gRPC development, making it more accessible to Spring developers while maintaining gRPC's powerful features.

**TWEETS**

The story about Google’s new chip Willow is wild and I feel like nobody is even talking about it 🤯

:TweetEmbed{id="1870174887794684092"}

I am currently working on the career management chapter of my upcoming book “Fundamentals of Software Engineering”. While I was putting all my thoughts together I did a little self reflection on my career. A good reminder that it’s hard to see a forest through the trees but everything on my path happened for a reason.

:TweetEmbed{id="1869578954706940131"}

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter]() (I’m not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev)