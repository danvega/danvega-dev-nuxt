---
title: Building a Streaming ChatBot in Java, AI Memory, JTE Forms and I published a new tool
slug: streaming-chatbot
date: "2024-10-14T07:00:00.000Z"
---

Happy Monday and Welcome to Another Edition of the Newsletter! 

Last week, I drove down to Cincinnati to spend time with a customer. I stayed near the Cincinnati Reds stadium, which sits on the Ohio/Kentucky border. The area is known as "The Banks," and I must say, I loved it there. If I have the chance, I'm going to try to make it back next summer to catch a game! Speaking of baseball, my Cleveland Guardians are in the ALCS ⚾️🤩

I gave a talk to our customer on GraphQL, similar to the one I gave at SpringOne. I absolutely love discussing GraphQL because it solves real problems. One thing I always stress to developers is the importance of understanding the "why" before diving into a new technology. Avoid resume-driven development—learning something just to put it on your resume. GraphQL addresses several issues that REST APIs face, such as over-fetching, multiple resource calls, API versioning, and more. If you have questions about building GraphQL APIs in Java & Spring feel free to reach out.

## In this edition of the newsletter

- How to build a streaming chatbot in Java
- How to build an AI ChatBot with Memory
- Working with forms in Java Template Engine
- JSON to Java Record Converter

### Building a Streaming ChatBot in Java

![Streaming Chatbot](/images/newsletter/2024/10/14/streaming_chatbot.png)

It is really easy to get started building generative AI applications in Java with Spring AI. With minimal lines of code you can communicate with a Large Language Model and get a response back. By default, that is a synchronous call, and you will need to wait for the entire response to return to display it to the user.

If this is a larger response this might not make for the best user experience. In that case Spring AI enables you to stream the response back to the client with a method called stream. I decided to put together a quick little tutorial on how to do this

🎯 What you'll learn:
- Setting up a Spring Boot project with Spring AI
- Implementing both traditional and streaming response methods
- Integrating with Anthropic Claude 3.5 Sonnet (easily adaptable to other LLMs)
- Creating a sleek UI with HTMX and Tailwind CSS
- Handling streaming data on the front-end with JavaScript

Whether you're a seasoned Spring developer or just getting started with AI integration, this tutorial offers valuable insights to elevate your projects.

:YouTube{id=q2p0mG4RICM}

### Building an AI ChatBot with Memory

I had a few people reach out to me and ask me how we can remember previous conversations when talking to an LLM. You have to remember that the web is stateless and when we are communicating with Large Language Models there is no record of previous conversations. There are products that sit in front of these LLMs though like ChatGPT which is able to remember previous conversations.

I put together a quick video on how to do this in Java with Spring AI. If you're interested in the code check out the [GitHub Repository](https://github.com/danvega/chat-memory).

### Working with forms in Java Template Engine (JTE)

I have been receiving a lot of comment on JTE over the last couple of weeks. I am getting all kinds of questions on how to do this and that and how it compares to Thymeleaf.

In this tutorial learn how to create interactive web forms using Spring Boot and the Java Template Engine (JTE). I'll walk you through building a full-featured user registration form, covering:

✅ Setting up a Spring Boot project with JTE
✅ Creating a user model and repository
✅ Implementing form validation
✅ Persisting data to a PostgreSQL database using Docker
✅ Handling form submissions and displaying success/error messages

Perfect for developers looking to move beyond Thymeleaf and explore JTE's capabilities in Spring Boot applications. Whether you're new to Spring or an experienced developer, this tutorial offers valuable insights into modern web form development.

:YouTube{id=ifnv4kGtZgo}

### JSON to Java Record Converter

I love hacking on things especially tools that I find useful. I have been messing around with a tool that can convert a block of JSON into a Java Record. I decided to put it on my website so that you can check it out.

![JSON to Java Record Converter](/images/newsletter/2024/10/14/json-java-record.png)

## TWEETS

:TweetEmbed{id="1844761724840198348"}

:TweetEmbed{id="1844755271991619837"}

:TweetEmbed{id="1844742997599994141"}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).

Happy Coding,
Dan Vega