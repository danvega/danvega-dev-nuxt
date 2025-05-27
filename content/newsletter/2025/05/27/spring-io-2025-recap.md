---
title: Spring I/O 2025 Recap, Spring Boot 3.5 and Spring AI hits 1.0 GA
slug: spring-i-o-2025-recap-spring-boot-3-5-and-spring-ai-hits-1-0-ga
date: 2025-05-27T00:00:00.000Z
---

Happy Monday and welcome to another edition of the newsletter. Last week I had the pleasure of making a trip over to Europe to visit Amsterdam and Barcelona. I'm very grateful that my position allows me to visit some of the most amazing places in the world and talk about the things I'm genuinely passionate about.

It was a long week but I made so many wonderful memories and it was well worth it. My trip started out in Amsterdam where I was able to visit with a customer of ours and give 2 presentations. I was able to start off with a what's new in Spring talk where I took a look back at all the cool things we got in the Spring Boot 3.x line. This is because Spring Boot 3.5 was released last week and this will be the last minor release in the 3.x line. While I was away DaShaun hosted a special Spring Office Hours with Phil Webb to talk about everything in Spring Boot 3.5.

:YouTube{id=4fHPTERqtEA}

Next up I gave a nice introduction to Spring AI. This talk went really well and I got a lot of really great questions about the project. I think I mention this every time I talk about AI but I really love geeking out over it. This was my first time in Amsterdam and while my trip was short it was definitely a good one. I was really tired after only getting about 4.5 hours of interrupted sleep on the plane but I couldn't pass up this chance to see the city. I was able to head into Amsterdam and check out the city and have a nice dinner with coworkers. I hope I get the opportunity to come back one day and explore the city more.

![Amsterdam Photo 1](/images/newsletter/2025/05/27/amsterdam-1.jpeg)
![Amsterdam Photo 2](/images/newsletter/2025/05/27/amsterdam-2.jpeg)

In this edition of the newsletter I want to tell you about my trip to Barcelona for my 2nd Spring I/O, and I'll also talk about the release of Spring AI 1.0.

## Spring I/O 2025 Recap

As I mentioned this was my 2nd trip to the great city of Barcelona Spain for the best Spring Conference on the planet, Spring I/O. Because of my trip to Amsterdam I was able to get into Barcelona Wednesday afternoon rested and ready to go. I headed to the speaker dinner that night and as always that did not disappoint. The food and drinks were amazing but the conversations were the best part as always. I had a really great conversation with the great Taylor Desseyn. He has a content creator that travels with him and until that night I didn't realize that this is what I need in my life. I had a great conversation with them about creating content on the road and the different gear and tools involved to make this happen.

:TweetEmbed{id=1925260125045940489}

I didn't stay long because I had a long first day at Spring I/O and I wanted to make sure I got a good night sleep.

### Spring I/O Keynote

I woke up early on Thursday morning because I had to be there a little bit before the crowd got in because I was going to be in the keynote. I work for the Tanzu Division at Broadcom and we are a major sponsor of Spring I/O. Because of that I got to go up on stage and say something nice about the great company that allows me to do what I love every day. I had to memorize a 2 minute speech that were backed by 6 slides.

![Dan Vega Keynote](/images/newsletter/2025/05/27/keynote.png)

I thought I did a pretty good job even with being a little nervous having to memorize a script. For me, I would much rather give a 4 hour workshop than have to memorize a 2-minute script. I didn't get any pictures of me on stage during the keynote so if you happen to have gotten any please send them over.

After I was done the keynote was ready to get started. The great Juergen Hoeller led us off by talking about all the new and exciting features coming in Spring Framework 7 and Spring Boot 4. As always I thought he did an amazing job of giving us a glimpse into what is coming next.

There were a bunch of really great presentations after that but I won't spoil them for you. If you haven't had a chance to check out the keynote it has already been posted to the Spring I/O channel. Big kudos to everyone involved in the keynote 👏🏻

:YouTube{id=oUK1Np4OvnM}

### Code Smarter, Not Harder

After the keynote I went to the speaker lounge to get everything ready for my talk because I was in the 2nd slot today. My talk was titled "Code Smarter, Not Harder. AI Powered Dev Hacks for all". I really enjoy giving this talk where I get to share some of the workflows I use AI for every day. Chances are you probably know about a lot of them but if I can introduce you to 1 or 2 new things I have done my job.

First off I saw the registrations for my talk and I was like this can't be right. Sure enough I got into my room and there was standing room only. We even had a bunch of folks sitting on the ground in the front. I was blown away by the interest and support. I thought the talk went really well and based on the questions and comments I received throughout the conference, so did you ☺️

![Standing Room Only](/images/newsletter/2025/05/27/standing-room-only.jpeg)
![Full Room](/images/newsletter/2025/05/27/full-room.jpeg)

This talk was recorded and will eventually be posted online. When it does I will let you know as long as you are subscribed here or on Twitter.

### Spring AI Workshop Day 1

After my talk I had a quick lunch break and a chance to prep for the Spring AI workshop. Mark Pollack was running this workshop and asked myself and another colleague if we wanted to help out. I jumped at the opportunity and Mark was nice enough to let me run point on it from the beginning. I have been doing similar workshops on an introduction to Spring AI for the last year so I had plenty of material to share with the group. I thought we brought the right level of introduction for this workshop and attendees were able to get up and running and write their own Spring AI applications within the first hour.

![Workshop Photo 1](/images/newsletter/2025/05/27/workshop-1.jpeg)
![Workshop Photo 2](/images/newsletter/2025/05/27/workshop-2.jpeg)

I want to just say a big thank you to Sergi Almar and all the volunteers at Spring I/O. Thank you for including me in such a wonderful conference and congrats on running such an amazing event. In the closing ceremony Sergi let us know that the current venue they have been at for the last 10 years or so was getting demolished to make room for a new one. That meant they had to find a new venue for next year. Thankfully Sergi was able to secure one and Spring I/O will be back in 2026 🥳

![Spring I/O Group Photo](/images/newsletter/2025/05/27/save-the-date.png)

## Spring AI 1.0 Goes GA

![Spring AI Logo](/images/newsletter/2025/05/27/spring-ai-logo.png)

Spring AI dominated conversations at Spring I/O this year, and for good reason. After navigating 2+ years of development against the rapidly evolving AI landscape, Spring AI 1.0 finally reached general availability last week. The team deliberately took their time, not just because AI is a moving target, but because they wanted to nail the foundational architecture before committing to API stability. That patience paid off with a rock-solid 1.0 release that won't introduce breaking changes as the ecosystem matures.

This isn't just another framework release. It's a comprehensive platform that transforms how we integrate AI into enterprise applications. Spring AI's "Augmented LLM" approach goes far beyond simple request-response interactions, offering support for 20 different AI models from Anthropic to ZhiPu through a portable ChatClient API that handles multi-modal inputs and structured JSON responses. What makes this release special is the production-ready feature set: vector store abstractions supporting 20 databases, a lightweight ETL pipeline for data ingestion, sophisticated RAG implementations, and conversational memory management with JDBC, Cassandra, and Neo4j support. A feature I really love is the Advisor API, an interceptor chain that lets you modify prompts dynamically by injecting retrieved data and conversation history, essentially turning your AI interactions into intelligent, context-aware conversations. Plus, with built-in observability through Micrometer, you can finally monitor model latency, token usage, and costs in production environments where "hope and good vibes" aren't sufficient monitoring strategies.

If you want to learn more you can check out this [blog post](https://spring.io/blog/2025/05/20/spring-ai-1-0-GA-released). I'm also working on a comprehensive tutorial for YouTube that will teach you everything you need to know to get up and running with Spring AI. I should have more on this the next time you hear from me on this newsletter.

**TWEETS**

I'm a big fan of Claude Code, and now you can use it directly in the terminal in IntelliJ with some extra features that we didn't have before.

:TweetEmbed{id=1926590686373007576}

Speaking of Claude and Anthropic, they released 2 new models last week.

:TweetEmbed{id=1925593896329019640}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)