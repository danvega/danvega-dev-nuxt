---
title: What is the difference between JDBC Client and Spring Data and Http Interfaces
slug: santa-baby
date: "2023-12-11T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. I hope you had an amazing weekend and are refreshed and ready to tackle another week. As we approach the end of the year, many of us are thinking about wrapping things up and planning for the new year. Personally, I'm excited to start setting my goals for the upcoming year, and I'll be sure to share them with all of you once I have them finalized. But I'm also curious to hear about your technical goals for the new year. Are you looking to build something new or learn something new?

Last week, I had a quick trip to Cincinnati where I had the opportunity to meet with a customer and engage with some incredible developers. While I can't disclose the customer's name, I can say that I have been a long-time customer of theirs and it was truly exciting for me to visit their location. During my visit, I gave two presentations, one of which focused on the new features in Spring Boot 3 and Beyond. The presentation covered the exciting enhancements in Spring Boot 3.2, with Virtual Threads being particularly well-received. It seems that many in the community are eager to leverage Virtual Threads and deploy their blocking applications on Java 21 and Spring Boot 3.2. If you missed it, I recently did a video showcasing the scalability benefits of Spring Boot 3.2 using Virtual Threads.

The holiday season is a special time for my family, and we have a number of traditions that we hold dear. This past weekend, we took the kids to see Santa and enjoyed a meal at one of our favorite restaurants, The Cheesecake Factory. I wanted to share a memorable moment with you: both of my kids sat with Santa and actually smiled for the photo. This has never happened before and may never happen again, so it was a special moment for us.

![My girls with Santa](/images/newsletter/2023/12/11/santa.jpeg)

In this weeks newsletter I want to talk to you about a video I made this week on Spring Data, Spring Office Hours where I interviewed 2 members of the Spring Team and an upcoming talk with Azul.

## JDBC Client vs Spring Data

I created a video about the new JDBC Client in Spring Boot 3.2, and it received excellent feedback. One of the questions that arose from that was, "What is the difference between JDBC Client and Spring Data?"

I thought this was a good opportunity to explore the various options available in Java and Spring for accessing and persisting data to a database. This led me to create an example where we connect to a database in Java and explain the origins of the original JDBC Template abstraction in Spring. Then, I demonstrated how to access the same database in Spring using the JDBC Template. After discussing some of the issues with the JDBC Template, I introduced the new JDBC Client in Spring Boot 3.2 and highlighted how its simple and fluent API simplifies database access. Finally, we delved into Spring Data and how the repository pattern can handle the mundane CRUD functionality, allowing you to focus on your business requirements.

:YouTube{id=qLDrfebeXS0}

I hope you enjoyed that video and by the look of the comments you did. I got a really good question around multiple datasources and the JDBC Client that I hope to make a video on this week.

## Http Interfaces in Spring

Last week on the Spring Office Hours Podcast, I had the opportunity to interview Olga Maciaszek-Sharma and Rossen Stoyanchev from the Spring Team. We discussed the history of clients in the Spring Framework and Spring Cloud. Additionally, we had a great conversation about Http Interfaces, their origin, and when to use them. I thoroughly enjoyed this discussion, and I hope you did too. If you are listening to these conversations on your favorite podcast player, please consider leaving us a review. It would greatly help us. Thank you!

:YouTube{id=OgyBTbsNIjo}

## Getting up to speed with Spring Boot 3.2

I’m really excited about an upcoming talk with my friend Pratik Patel at Azul. We are going to be talking all about Spring Boot 3.2 but I have a hunch we will spend some time talking about Project CRaC (Coordinated Restore at Checkpoint). If you’re interested in attending this talk online for free please visit the link below to register.

https://www.azul.com/webinar/20231219-spring-boot-updates/

## Around the web

### 📝 Articles

I really enjoyed [this article](https://spring.io/blog/2023/12/04/cds-with-spring-framework-6-1) that discusses the introduction of Class Data Sharing (CDS) support in Spring Framework 6.1, which aims to optimize the startup time and memory footprint of Java applications. CDS is highlighted as a mature technology that can offer startup improvements with  relatively little effort compared to alternatives like GraalVM. The article also mentions that combining CDS with Spring AOT optimizations can further reduce startup times, and it seeks feedback from the Spring community for future enhancements and integration possibilities.

### 🎬 Videos

The newest version of IntelliJ 2023.3 is out and it’s packed full of features. I really enjoyed [this video](https://www.youtube.com/watch?v=zYvfIMrcpt8) where Maria Kosukhina walked us through all the highlights.

### 📚 Books

I spent a lot of time in the car last week and it enabled me to get through 2 audio books, both by Jesse Itzler. The first one was Living with a Seal where Jesse had none other than David Goggins live with him for a month. The workouts were insane but at the end of the day I think the moral of the story was consistency and becoming mentally tough.

The next was Living with the Monks where he spent 15 days, living with the monks. 2 weeks might not seem like a long time but try to imagine living without phones, internet or tv for even a day. I really enjoyed this book as it got me to think about what’s important and how to be thankful and present.

### 🍃 Spring Projects

It was really exciting to see [the release of Spring Cloud 2023.0](https://spring.io/blog/2023/12/06/spring-cloud-2023-0-0-aka-leyton-is-now-available). I know this is something a lot of folks were waiting for before they could move to Spring Boot 3.2 and now it is there. There are a lot of exciting features in the release but the star of the show has to be Spring MVC Gateway. Thanks to Virtual Threads we now have a Gateway that supports imperative style programming.

### ✍️ Quote of the week

> Everyone wants to live on top of the mountain, but all the happiness and growth occurs while you’re climbing it. - Andy Rooney
>

### 🐦 Tweet

I got access to Grok on X (Twitter) last week and asked it to roast me based on my Tweets. Not going to lie, that was pretty accurate 🤷‍♂️

https://twitter.com/therealdanvega/status/1733177769083666505

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any links you would like me to include please [contact me](http://twitter.com/therealdanvega) and I might add them to a future newsletter. I hope you have a great week and as always friends...

Happy Coding<br/>
Dan Vega<br/>
danvega@gmail.com<br/>
https://www.danvega.dev<br/>