---
title: New Standing Desk, JTE Spring Security Demo & RAG for Java Developers
slug: uplift-desk
date: "2024-10-28T09:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. It's hard to believe that Halloween is this week but here we are. I love seeing Halloween costumes so if you have some pictures of you or you and family please share them with me!

## Office Updates

I told you last week that was upgrading my office and that continued last week. I got my new uplift desk and spent the weekend putting it together. I still haven't put the final touches on cable management because I am still trying to figure out what is actually going to go on the desk and how I want to lay things out.

![Uplift Desk](/images/newsletter/2024/10/28/desk.png)

I have a 27" 4k and a 34" Widescreen display and I have been using those with my laptop giving me 3 displays. I don't have the room for the 34" widescreen now and quite frankly its overkill for a 3rd monitor. I think what I am going to do is sell that and purchase another 27" 4k display. I also think I need a docking station because I pull my laptop from the desk often and I hate having to plugin 20 things. My tentative plan right now is to get another monitor and mount the displays on some swing mounts and not use my laptop as a display anymore and get rid of the laptop stand I am using. I also picked up this nice filing cabinet for underneath my Cleveland sign.

![Filing Cabinet](/images/newsletter/2024/10/28/cabinet.jpeg)

## Java Template Engine + Spring Security Login

I just released a new tutorial showing how to build a Spring Security login system using Java Template Engine (JTE) and OAuth2. I created this in response to questions from viewers about using JTE with Spring Security, and I'm excited to share a clean solution that handles both traditional username/password authentication and social logins through Google and GitHub.

### Key features implemented:
* Custom login form with Spring Security integration
* OAuth2 authentication with multiple providers
* Protected dashboard displaying user information
* Clean, modern UI built with Tailwind CSS
* Java Template Engine (JTE) integration with Spring Boot

In my tutorial, I walk through building a modern authentication system that I find essential for most projects. I also implemented a clean UI using Tailwind CSS, which I actually generated using AI to save time on the frontend work.

Rather than doing a line-by-line coding session, I focused on explaining the core concepts and implementation details, which I think makes the tutorial more practical and efficient. I've made all the code available on [GitHub](https://github.com/danvega/spring-boot-oauth-demo) as a starter template, so developers can quickly get up and running with secure authentication in their Spring Boot applications. For those interested in learning more about JTE, I've also included a link to my full playlist covering this template engine.

This tutorial also showcases how JTE can work seamlessly with Spring Security - something many developers have been asking me about since JTE was added to the Spring initializer.

:YouTube{id=f1h4GkhxMp8}

## RAG for Java Developers

In my latest video, I tackled Retrieval Augmented Generation (RAG) in Java applications using Spring AI. I broke down why RAG matters - LLMs have training cutoff dates and aren't trained on your private data. More importantly, I clarified what RAG isn't: it's not just dumping all your documents into a prompt!

I demonstrated this by building a practical example, showing how to store economic analysis documents in a vector database and query them effectively. Using Spring AI made this process surprisingly straightforward, from document ingestion to similarity search.

The demo highlighted how RAG can provide accurate, up-to-date responses by intelligently retrieving relevant information chunks rather than sending entire documents to the LLM. For those concerned about data privacy, stay tuned for an upcoming video on using RAG with local LLMs like Ollama.

:YouTube{id=6Pgmr7xMjiY}

## Live Streaming

Now that I have my office dialed in I want to make an effort to get back to live-streaming. Not that I have ever been a consistent live streamer but I want to be. I love hanging out with all of you and last week I was able to get 2 live streams in. It is so much easier to stream when so many of you show up and ask so many great questions and that is exactly what happened last week. Thank you to all of you for taking time out of your day and for the wonderful questions. Here are the recordings from those live streams and I will try and get some more in this week.

### Recent Streams:
* 10/23/2024 - [Stream and Chill](https://www.youtube.com/live/e1c2GCL1vOM)
* 10/24/2024 - [Spring AI Workshop Updates](https://www.youtube.com/live/9DRdXgYfjXg)

## Tweets

:TweetEmbed{id="1849803941745152397"}

:TweetEmbed{id="1849844721448845627"}

:TweetEmbed{id="1849813392300671064"}


## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).

Happy Coding,  
Dan Vega