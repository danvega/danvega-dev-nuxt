---
title: "Spring Modulith, Florida JUGs, and a Korean Book Launch"
slug: "spring-modulith-florida-jugs-and-a-korean-book-launch"
date: "2026-06-15"
description: "A recap of my Florida Java User Group trip, the Korean edition of our book, Spring Boot 4.1, Spring AI 2.0, and new videos on Spring Modulith durable events and Kafka."
tags: ["Spring", "Spring Boot", "Spring Modulith", "Spring AI", "Java", "Kafka"]
newsletter: true
published: true
---

Happy Monday, friends!

My apologies for missing a few editions of the newsletter, but I have been pretty busy lately. Last week I took a trip down to Florida to visit a customer and got to spend some time with the Tampa Java User Group and the Orlando Java User Group. All of the presentations went really well. The energy in those rooms reminded me why I love this community so much. There's something special about standing in front of a group of developers who are genuinely curious and want to learn. If you were at any of these events, thank you for showing up and asking great questions. I'll include some photos below.

![Tampa and Orlando Java User Groups](/images/newsletter/2026/06/15/tampa_orlando.jpg)

I also have some really cool personal news to share, a major AI update, and of course new content. Let's get into it.

## Korean Edition of Our Book

This one means a lot to me. Our book, *The Fundamentals of Software Engineering*, was translated into Korean! We wrote a special foreword for this edition, and I finally got my hands on a physical copy. Seeing your work translated into another language so that a whole new audience of developers can read it is honestly one of the most rewarding things I've experienced as an author. If you're interested, you can check it out [here](https://www.onlybook.co.kr/entry/software-engineer).

## Fable 5 from Anthropic

Anthropic released Fable 5, and I had some time to play around with it before... well, before the government stepped in and it got pulled. While I had access, I have to say it was probably the best coding model I've ever used. The code generation was sharp, the context handling was impressive, and it just *got* what I was trying to build in a way other models haven't. Unfortunate timing on the takedown. You can read more about what happened [here](https://www.anthropic.com/news/fable-mythos-access).

## Video Recaps

### Spring Modulith Durable Events

If you've been building event-driven systems in Spring, you've probably reached for a message broker like RabbitMQ or Kafka. But what if I told you that you don't always need one? Spring Modulith has a built-in durable event registry that persists events directly to your database. This means you get reliable, transactional event publishing without spinning up additional infrastructure.

In this video, I walk through how the durable event registry works, how to set it up, and when it makes sense to use it instead of a full message broker. The key idea is that your application events get stored in a database table as part of your existing transaction. A background process then picks them up and dispatches them to listeners. If something fails, the event is still there, waiting to be processed.

This is a really practical pattern for a lot of applications that need reliability but don't need the complexity of a distributed messaging system. If you're working with Spring Modulith or thinking about modular monoliths, this one's for you.

:YouTube{id=KLX9ulb2AfM}

### Spring Boot + Kafka

If you've been meaning to get started with Apache Kafka in a Spring Boot application, this is the video for you. I cover the basics of setting up a Kafka producer and consumer in Spring Boot, including the configuration, the message serialization, and the common gotchas that trip people up the first time around.

Kafka is one of those technologies that sounds intimidating until you actually wire it up, and Spring Boot makes the initial setup surprisingly straightforward. I kept this one practical and focused so you can follow along and have something running by the end.

:YouTube{id=5XW3f_39ipY}

### How to Externalize Events in Spring Modulith with Kafka

This video is a natural follow-up to the durable events video. Once you understand how Spring Modulith handles events internally, the next question is: what if you need those events to leave your application? What if another service needs to react to them?

That's where event externalization comes in. Spring Modulith lets you route internal application events to an external message broker like Kafka without coupling your domain logic to Kafka's APIs. In this tutorial, I show you how to configure event externalization with Kafka, how to control which events get published externally, and how the whole thing ties together with the modulith architecture. If you watched the durable events video, consider this the second chapter.

:YouTube{id=8sJIWwc7Jss}

## Spring Office Hours

We recently published [S5E15: Upgrading Spring and OSS Security](https://www.youtube.com/watch?v=zm_EmvdKwYA). We dug into some important topics around keeping your Spring applications secure and what upgrading looks like when you're dealing with open source dependencies. Good conversation, and one that's relevant to pretty much everyone running Spring in production.

On S5E16, DaShaun and I talked about the [May Release Train Shift and What's Coming in Spring Boot 4.1](https://www.youtube.com/watch?v=hCe50NpXt8s). There's been a shift in the release train that we want to break down, plus we'll preview some of the new features landing in Spring Boot 4.1. Tune in live on [springofficehours.io](https://springofficehours.io) if you want to ask questions in real time.

## In the News

### Spring Boot 4.1 Released

Spring Boot 4.1 is here, and it's packed with some great additions. You can read the full announcement on the [Spring blog](https://spring.io/blog/2026/06/10/spring-boot-4).

**Dan's Thoughts:** One feature that caught my eye right away is the built-in Server-Side Request Forgery (SSRF) protection for HTTP clients. This is the kind of security improvement that makes a real difference because it's baked into the framework rather than something you have to remember to implement yourself. I already put together a small, self-contained demo showing how it works. You can check it out on [GitHub](https://github.com/danvega/spring-boot-ssrf-demo).

### Spring AI 2.0 Released

Spring AI has officially hit 2.0! This is a major milestone for the project. Check out the [announcement post](https://spring.io/blog/2026/06/12/spring-ai-2-0-0-GA-available-now) for all the details.

**Dan's Thoughts:** I've been following Spring AI since the early days, and seeing it reach a 2.0 GA release is a big deal. If you're a Spring developer looking to integrate AI capabilities into your applications, this is the framework to use. Expect more content from me on this very soon.

## The Road to 100K

One more thing: the march to 100K YouTube subscribers is officially on. This has been a goal of mine for as long as I can remember, and we're getting close. Thank you to every single one of you who watches, subscribes, and shares the videos. It means more than you know.

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
