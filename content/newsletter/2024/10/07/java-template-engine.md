---
title: Spring Framework 7.0 and Java Template Engine & ChatGPT Canvas
slug: java-template-engine
date: "2024-10-07T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. Last week was a pretty interesting week as we had some news drop about the future of the Spring Framework. I also found out last week the Java Template Engine (JTE) was added to the Spring Initalizr. This led to a lot of tweets, playing around with some code, writing blog posts and I posted 3 videos last week on this. Finally, there was a lot of news in the AI space which I try and cover on www.bytesizedai.dev but none bigger for software developers than the new release of ChatGPT Canvas.

## Spring Framework 7.0

A new article was released last week from Juergen Hoeller titled ["From Spring Framework 6.2 to 7.0"](https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0)   . Spring Framework is gearing up for significant updates. Version 6.2, set for November 2024, will bring major revisions to the core container and web support, supporting JDK 17-23 and Jakarta EE 9-10.

Looking ahead, Spring Framework 7.0 is slated for November 2025, upgrading to Jakarta EE 11 and embracing JDK 25 LTS while maintaining JDK 17 compatibility. It will also support Kotlin 2 and adopt JSpecify annotations for null-safety. The framework continues its focus on GraalVM, Project Leyden, and Spring AOT, with planned revisions to JPA and JMS support. Milestones for version 7.0 are expected in early 2025, with related Spring Boot and Spring Cloud updates following throughout the year.

## Java Template Engine

I found out last week that a [new template](https://x.com/therealdanvega/status/1840793222005567621) was added to the Spring Initializr. The Java Template Engine also known as JTE was added and can now be used seamlessly in your Spring Boot applications.

A template engine in Spring Boot is a tool that allows you to generate dynamic HTML content by combining static HTML with data from your application. From the Spring Initializr you can now select from the following template engines:

- Thymeleaf (default)
- Groovy Templates
- Apache FreeMarker
- Mustache
- Java Template Engine (JTE)

Once I saw this was available I decided to write up a [quick blog post](https://www.danvega.dev/blog/hello-jte) and record a video on how to get started with JTE in Spring Boot.

:YouTube{id=KoWgHSWA1cc}

This video got a lot of attention quickly and I can't thank you all enough for that. Out of that came some fascinating questions. The questions I received the most were around how to use layouts in JTE and if you could use it with HTMX. I ended up creating a blog post and video for each of those topics, and you can check them out below.

- [Getting Started with JTE layouts in Spring Boot](https://www.danvega.dev/blog/jte-layouts)
- [Building a Dynamic Task Manager with Spring Boot, JTE, and HTMX](https://www.danvega.dev/blog/spring-boot-jte-htmx)


## ChatGPT's Canvas

![ChatGPT Canvas](/images/newsletter/2024/10/07/canvas.jpeg)

OpenAI has unveiled Canvas, a groundbreaking feature for ChatGPT that promises to revolutionize AI collaboration for writers and coders. This innovative tool moves beyond the traditional chat interface, opening in a separate window to facilitate side-by-side work between users and AI. Canvas offers a suite of powerful features, including inline editing, length adjustment, and reading level changes for writers, as well as code review, bug fixing, and language porting capabilities for programmers.

Powered by GPT-4o, a model specifically trained for creative partnership, Canvas represents a significant shift from simple chat-based interactions to a more intuitive and collaborative AI workspace. This new approach has the potential to transform how professionals tackle writing, coding, and creative tasks, paving the way for more seamless integration of AI assistance in various fields. As Canvas evolves beyond its beta phase, it may well redefine our relationship with AI technology in the workplace.

If you want to learn more about it, I posted an article over on [ByteSized AI](https://www.bytesizedai.dev/p/canvas-painting-a-new-future-for-ai-collaboration) on this.

## TWEETS

:TweetEmbed{id="1841432849028731139"}

:TweetEmbed{id="1841507795901812975"}

:TweetEmbed{id="1841561740619702769"}

## AROUND THE WEB

- [JavaOne](https://www.oracle.com/javaone/) is returning in 2025 and the CFP is still open for a few more days. They are still looking for speakers like you so please get those submissions in by October 10th.

- My colleague Christian Tzolov wrote an article for the Spring Blog titled ["Supercharging your AI Applications with Spring AI Advisors"](https://spring.io/blog/2024/10/02/supercharging-your-ai-applications-with-spring-ai-advisors). At their core, Spring AI Advisors are components that intercept and potentially modify the flow of chat-completion requests and responses in your AI applications.

- If you want some of the top Java Blogs you should be following be sure to check out [this article](https://blog.jetbrains.com/idea/2024/10/top-java-blogs-to-follow-in-2024-part-1/) by Irina Mariasova.

- I really enjoyed [this video](https://www.youtube.com/watch?v=VvWtoaeHQUQ) by JetBrains Developer Advocate Siva on Developing Spring Boot Applications with Joy.

## 💡 QUOTE OF THE WEEK

> "The measure of intelligence is the ability to change." - Albert Einstein

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://x.com/therealdanvega) (I'm not calling it X).

Happy Coding,
Dan Vega