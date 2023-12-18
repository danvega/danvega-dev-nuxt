---
title: Multiple DataSources in Spring, Vaadin and Spring Boot 3.2
slug: multiple-datasources-spring
date: "2023-12-18T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. It's hard to believe, but we have 1 week until Christmas and 2 weeks until the new year. It was a pretty crazy weekend around here where we saw weather in the mid-50s in the middle of December, which is not normal.

Last week, I spent some more time cleaning up the newest edition of my website over at [danvega.dev](https://www.danvega.dev). I did some work optimizing pages to improve their search rankings, and I even cleaned up my URL scheme. All of my blog posts are now under the folder /blog/slug, instead of the previous /blog/year/month/day/slug structure. I also set up redirects for the longer URLs to redirect to the shorter ones.

After making these changes, I sat down and wrote a new blog post with search in mind. I knew that my latest video on Virtual threads was doing well, so I wanted to make sure there was an accompanying blog post. Instead of just writing whatever came to mind, I decided to be a little more strategic about it. I downloaded the [Keywords Everywhere](https://keywordseverywhere.com/) Chrome Plugin, which provides stats on what people are searching for and the volume of those keywords. While I'm not an SEO expert, I believe the few things I did with this post worked, as I received about 7k views on [this post](https://www.danvega.dev/blog/virtual-threads-spring-boot) in a week. If you have any suggestions on tools or techniques that I can use to improve old posts or maximize the reach of new ones, I would love to hear from you.

In today's newsletter, I want to discuss using the JDBC client with multiple datasources, Vaadin Flow, and Spring Boot 3.2.

## Multiple JDBC Clients

I answered a question from a subscriber last week on how to use multiple JDBC Clients when you’re talking to multiple datasources. I thought this was a great question because if you’re only using a single datasource then auto-configuration kicks in and creates a datasource and JDBC Client for you. As soon as you need more than one you have to define both a datasource and JDBC Client for each connection. I thought this was a fun tutorial to go through and I hope you enjoy it.

:YouTube{id=ZKYFGuukhT4}

## Vaadin Flow and Hilla

Last week on [Spring Office Hours](https://www.youtube.com/watch?v=ZCGg8MSuEGY), we had the opportunity to interview Lawrence Lockhart, a developer advocate with Vaadin. This was exciting for me on a couple of different levels. First off I have long been an admirer of Lawrence and his story on how he got started in tech. I have also had Vaadin on my long list of things I want to try / learn.

During the show I was able to get some clarification on Vaadin the company and the different products they offer. Vaadin Flow is server side UI framework that allows you build full-stack applications completely in Java. Hilla is there full-stack framework for building web applications with React + Java. I really enjoyed this conversation with Lawrence and I hope you do too.

:YouTube{id=ZCGg8MSuEGY}

## Getting up to speed with Spring Boot 3.2

I’m really excited about my upcoming talk on Tuesday with my friend Pratik Patel at Azul. We are going to be talking all about Spring Boot 3.2 but I have a hunch we will spend some time talking about Project CRaC (Coordinated Restore at Checkpoint). If you’re interested in attending this talk online for free please visit the link below to register.

https://www.azul.com/webinar/20231219-spring-boot-updates/

## Around the web

### 📝 Articles

I was really excited to see that my friends at [AtomicJar got acquired by Docker](https://techcrunch.com/2023/12/11/docker-acquires-atomicjar-a-testing-startup-that-raised-25m-in-january/). If you don’t know AtomcJar is the company behind the amazing project [Testcontainers](https://testcontainers.com/).

### 🐦 Tweet

https://twitter.com/therealdanvega/status/1735017607479083047

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any links you would like me to include please [contact me](http://twitter.com/therealdanvega) and I might add them to a future newsletter. I hope you have a great week and as always friends...

Happy Coding<br/>
Dan Vega<br/>
danvega@gmail.com<br/>
https://www.danvega.dev