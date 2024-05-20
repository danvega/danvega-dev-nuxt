---
title: GPT-4o and Spring I/O
slug: gpt-4o
date: "2024-05-20T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. As I write this on Sunday afternoon the weather here in Northeast Ohio is warming up and its my favorite time of the year. We took the girls to a birthday party today, had lunch by the water and now I’m getting ready for a quick trip to Dallas. I will be in Dallas to give a presentation on Spring AI and immediately following that talk I am giving a virtual presentation on Spring Boot 3.

I love this time of year at work as well because it is conference season. Next week I will be heading to the beautiful city of Barcelona Spain for Spring I/O. This is one of those conferences that I haven’t been to yet but was definitely on the bucket list. I have heard nothing but amazing things about it and I am beyond excited about.

In this edition of the newsletter I want to talk about AI and Spring I/O.

## Hello, GPT-4o  👋🏻

Last week Open AI announced its newest flagship model GPT-4o that can reason across audio, vision, and text in real time. If you interested in learning more about you can check out their Spring Update in the video below.

:YouTube{id=DQacCB9tDaw}

I really enjoyed it because it got straight to the point, had some great demos and it was fairly short for an announcement video. I also found it interested that OpenAI is heavily funded by Microsoft who I believe owns something like 49% and all of their demos were on iPhones and Macbook’s 🤷‍♂️

Some of the big improvements in GPT-4o include:

- **50% lower pricing.** GPT-4o is 50% cheaper than GPT-4 Turbo, across both input tokens ($5 per 1 million tokens) and output tokens ($15 per 1 million tokens).
- **2x faster latency.** GPT-4o is 2x faster than GPT-4 Turbo.
- **5x higher rate limits.** Over the coming weeks, GPT-4o will ramp to 5x those of GPT-4 Turbo—up to 10 million tokens per minute for developers with high usage.
- 128k Context Window
- Knowledge cut-off date of October 2023

After the news broke I thought I would give it a spin in Spring AI. Sure enough all I had to do was change the version of the model I was using to `gpt-4o` and I was now on the latest and greatest. I haven’t run any benchmarks yet but in the few demos I went through it seems much faster. The responses I get back seem very snappy. I created a video on using this in Spring AI in the snapshot version and taking advantage of both the chat and vision modals.

:YouTube{id=y90CkHvDGls}

### GPT-4o and Java

I also thought I would take some time and introduce Java developers to GPT-4o. Spring makes it really easy to talk to the different LLMs out there but for someone just getting started I wanted to make it accessible and easy to get going. That is why I put together a simple demo that doesn't use any external dependencies.  As long as your own JDK 11+ and have access to the Http Client this will work.

:YouTube{id=EDJLHWcFvpQ}

## Spring I/O

As I mentioned in the open I am extremely excited about Spring I/O next week.  Last week we had a chance to sit down with Sergi Almar the creator and organizer of the conference. I had a chance to talk to him about how the conference started and all of the planning that goes into each of these events. You can check out the livestream recording below or listen to the podcast where ever you get your podcasts. If you want to get a list of archives for the show check out https://www.springofficehours.io/

:YouTube{id=LGx5gX7k-ao}

The schedule is now out for [Spring I/O](https://2024.springio.net/sessions/) so if you’re heading there check it out and start making plans for your favorite talks. Sergi also mentioned that the app should be updated this week so you can start planning your conference in the app. There are so many amazing sessions in this lineup and I have no idea how I am going to choose which talks to attend. Thankfully all of the talks are being recorded and will be available sometime after the conference has ended. I will be giving a presentation on navigating the frontend landscape and I hope to see some of you live in the audience.

I think the biggest thing I am looking forward to is meeting so many amazing people that I have talked to online for years and never had the chance to meet. If you are going to be there please say hello and lets chat about how you’re using Java and Spring!

### ✍️ Quote of the week

> “Happiness is a choice, a repetitive one.” - Akilnathan Logeswaran
>

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any links you would like me to include please [contact me](http://twitter.com/therealdanvega) and I might add them to a future newsletter. I hope you have a great week and as always friends...

Happy Coding  
Dan Vega  
danvega@gmail.com  
https://www.danvega.dev