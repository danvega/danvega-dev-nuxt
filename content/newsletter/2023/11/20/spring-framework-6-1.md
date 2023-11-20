---
title: Spring Framework 6.1, Spring Guides in the Cloud and a GraphQL
slug: spring-framework-6-1
date: "2023-11-20T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. It's Thanksgiving here in the United States this week, a time to express gratitude. First and foremost, I'm thankful for my family, and everything I do is for them. I'm also grateful for the opportunity to do what I love every single day. I appreciate all of you who support me, and I don't take my position for granted. For those celebrating this week, I hope you have an amazing day filled with family, friends, and food.

Today, I want to discuss three topics: Spring Framework 6.1, Spring Guides in the Cloud, and my GraphQL presentation at VMware Explore Barcelona.

## Spring Framework 6.1

It's hard to believe, but Spring Framework 6.1 was released last year and will serve as the foundation for Spring Boot 3.2, which is set to be released this week on Thanksgiving. Spring Framework 6.1 ships with a bunch of exciting new features:

- **Embracing JDK 21 LTS**
- **Virtual Threads** (Project Loom)
- **JVM Checkpoint Restore** (Project CRaC)
- **Resource Lifecycle Management**, revisited
- **Data Binding and Validation**, revisited
- **New [RestClient](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/web/client/RestClient.html) and [JdbcClient](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/jdbc/core/simple/JdbcClient.html) APIs**

I am a big fan of all the features released in JDK 21 and I am really excited to see Spring adopting JDK 21. Although the baseline remains at JDK 17, it is worth considering upgrading your JDK along with Spring to avoid the need for a major upgrade in a few years.

I am particularly excited about Virtual Threads in JDK 21 and I believe Spring Developers should be too. When it comes to developing traditional blocking web applications, Virtual Threads will offer significant scalability benefits with minimal or no code changes.

I am also a big fan of the new client abstractions. The new RestClient provides a simple and fluent API for making API calls, built on top of the RestTemplate. The JDBC Client offers a more user-friendly and fluent API for interacting with databases. I believe both of these improvements will enhance the developer experience.

## Spring Guides in the Cloud

Last week on [Spring Office Hours](https://tanzu.vmware.com/developer/tv/spring-office-hours/0057/) we had a really great discussion about Spring Academy with one of the engineers on the team, Felipe Gutierrez. During the live stream Felipe showed off a really cool feature where you could run a Spring Guide in the cloud. I thought this was so cool that I decided to sit down and put together a video on it.

:YouTube{id=kSSStm6b0Zg}

## GraphQL VMware Explore

In last week’s newsletter I mentioned that I did 2 talks at VMware Explore Barcelona. The first talk “Accelerating innovation with Spring” that I did with my coworker Cora was recorded and you can check it out [here](https://www.vmware.com/explore/video-library/video-landing.html?sessionid=1693987326111001vbVK&videoId=6340722423112). The other talk was a live coding session where I did an introduction to building GraphQL APIs in Java and Spring and that talk was not recorded. I put all of that work into that presentation so I decided to sit down and record it and I hope you enjoy it.

:YouTube{id=1mRK3FeV76I}

## Website Updates

One of the reasons I really love having my own personal website is because I feel like it’s my own little corner of the internet. I recently launched a new website but it was missing that personal touch. I have started collecting images for the home page and now have a few that I really like. My plan is to showcase the events I’m attending and the community I get to interact with. If we have a photo together please send the to me so I can add the to the home page. If we don’t have a photo together let’s try and change that the next time we are in the same place.

![danvega_dev_home.png](/images/newsletter/2023/11/20/danvega_dev_home.png)

## Around the web

### 🎙 Podcasts

I really enjoyed [this live stream](https://www.youtube.com/watch?v=rUjLf_8HwLk) on Coffee and Code where Josh Long had a couple of special guests in Rod Johnson and Heather VanCura. They talked about Heathers new book “[Developer Career Masterplan](https://amzn.to/3R5XSHH)” and had some really interesting discussions about it.

### 👨🏼‍💻 Conferences

The [Cloud Builders Java Conference](https://cloud-builders.tech/) is coming up soon and they have a really great lineup of speakers. This conference is online and free so make sure you register now.

### 🐦 Tweet

I had some fun with the new Make Real feature of tldraw this weekend.

https://twitter.com/therealdanvega/status/1725623222207484274

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any links you would like me to include please [contact me](http://twitter.com/therealdanvega) and I might add them to a future newsletter. I hope you have a great week and as always friends...

Happy Coding<br/>
Dan Vega<br/>
danvega@gmail.com<br/>
https://www.danvega.dev