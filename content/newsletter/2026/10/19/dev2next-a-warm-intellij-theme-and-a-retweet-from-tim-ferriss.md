---
title: "dev2next, a Warm IntelliJ Theme, and a Retweet from Tim Ferriss"
slug: "dev2next-a-warm-intellij-theme-and-a-retweet-from-tim-ferriss"
date: "2026-10-19"
description: "Back from dev2next, a warm new IntelliJ theme called Kiln, the JSON API coming to JDK 28, and a retweet from Tim Ferriss."
tags: ["Java", "IntelliJ IDEA", "Spring Boot", "Spring AI", "Conferences"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. It's been a few weeks since my last one. I just got back from dev2next in Colorado, so I'll start with a quick recap. After that, I'll share two things I worked on last week, plus a fun moment on X. I've also got a new video, a Spring Office Hours episode going live today, and three conferences coming up in November. Let's get into it.

## dev2next 2026 Recap

Last week I was in Lone Tree, Colorado, for dev2next. What a great conference. I had three sessions this year:

- **Fundamentals of Software Engineering in the Age of AI:** a full-day workshop with Nate Schutta.
- **Spring AI: There and Back Again**
- **Coding Agents: Start Simple, Scale Smart**

It was great to see so many Java developers in one place. I had some really great conversations, and the hallway track was awesome.

This was my second year in a row at dev2next. Venkat, kudos to you and the team for an amazing conference. I would love to be back in beautiful Colorado next year.

## What I Worked On Last Week

### Kiln: A Warm Theme for IntelliJ

![The Kiln light theme in IntelliJ IDEA](/images/newsletter/2026/10/19/kiln-light-theme.png)

I built an IntelliJ theme inspired by one of my favorite tools, Claude Code. It's called Kiln. It comes in dark and light, with charcoal and cream surfaces, a clay orange accent, and calm syntax colors.

I really like the light theme. The colors are warm, and it's easy on the eyes.

Kiln is on GitHub, so you can try it today. You need IntelliJ IDEA 2026.2 or newer, and the README walks you through the install. I'm looking for feedback before I publish it to the JetBrains Marketplace. If something looks off or is hard to read, open an issue with a screenshot. Or just hit reply and tell me what you think.

[Kiln Theme on GitHub](https://github.com/danvega/kiln-theme)

This is something I would not have been able to build before AI, and I'm very grateful for that. What a time it is to be a builder.

### The New JSON API in JDK 28

I also spent some time learning the new JSON API coming to the JDK. It's JEP 540, and it's incubating in JDK 28. My demos parse JSON, map it to Java records and back, and read JSON from a real API. No Jackson or any other library.

I shared what I learned on social media, and the posts got a lot of feedback. That was really cool to see. If you want to try it yourself, the demo repo has everything you need. You'll need a JDK 28 early-access build.

[Native JSON in JDK 28 on GitHub](https://github.com/danvega/native-json-demo)

## This Week's Video

### TrueSource by Broadcom

If you run open source in production, you've probably asked this question. Which parts of my stack need verified builds, security patches, or commercial support?

That question is the heart of my latest video, which went out on the Spring Developer channel. TrueSource by Broadcom is a portfolio of commercially supported open source software with verified builds. It has three parts:

- **Spring Enterprise:** Spring and its managed dependencies, with security patches, support, and Application Advisor.
- **Trusted Artifacts:** verified Java, Python, and npm libraries, plus Bitnami Secure Images.
- **Data Services:** supported data engines and the assets you need to deploy them.

I don't walk through product cards. I start from what your team needs. Then I wrap up with a short checklist to help you find the right fit, and the questions to ask before you adopt it.

:YouTube{id=fEQxKVE-YM0}

## Spring Office Hours

### Live Today: [S5E26 - dev2Next, Native JSON and a Week of New Models](https://www.youtube.com/watch?v=Oa3w-NkHfZg)

DaShaun and I are live today at 1 PM Eastern (17:00 UTC). We'll start with a dev2next recap. Then I'll show off the two things I built last week: Kiln and my JSON API demos.

After that, we dig into a busy week of model releases. Meta released the weights for Muse Spark Open. NVIDIA fit a 74B model into 24GB. DeepSeek shipped a faster V4.1 Flash. Local inference is getting real, but RAM and VRAM prices keep climbing. We'll talk about when running models on your own hardware makes sense. We'll also show how to point Spring AI at a model on your own machine.

Bring your questions. We'll answer them live.

:YouTube{id=Oa3w-NkHfZg}

### Last Episode: [S5E25 - Future of Software Development with Josh Long](https://share.transistor.fm/s/9f3e3dc6)

Josh Long joined DaShaun and me to talk about the future of software development. We also took on at least one hot take that's been making the rounds. If you missed it live, you can catch the replay.

:YouTube{id=NQK6gdbCWDQ}

## Upcoming Speaking Engagements

### Porto Tech Hub Conference (Porto, Portugal)

On November 10, Nate Schutta and I are giving the keynote at Porto Tech Hub. It's called **Fundamentals of Software Engineering in the Age of AI**.

AI looks like magic in a language you've never touched. Then you point it at code you've lived in for five years, and you catch mistakes on every other line. That's the fundamentals talking. We'll cover where these tools help, where they hurt, and why the craft still matters.

[Porto Tech Hub Conference 2026](https://portotechhub.com/conference-2026/)

### J-Fall (Ede, Netherlands)

Two days later, on November 12, I'll be at J-Fall with **Spring Cleaning: What Boot 4 Lets You Delete**.

If you're moving to Spring Boot 4, you might be maintaining a few things you no longer need. Built-in resilience means Spring Retry can go. HTTP interface clients mean Feign can go. You'll leave with fewer dependencies to patch and a plan for the upgrade.

[J-Fall 2026](https://jfall.nl)

### QCon San Francisco (San Francisco, CA)

On November 19, I'll be at QCon San Francisco with two sessions: **The Fundamentals of Software Engineering in the Age of AI** and **AI for Java Developers**.

[The Fundamentals of Software Engineering in the Age of AI at QCon SF](https://qconsf.com/training/nov2026/fundamentals-software-engineering-age-ai)

If you're going to be at any of these, come say hi!

## Around the Web

### Tim Ferriss Retweeted Me

Last week I watched a wonderful interview with Tim Ferriss. He talked about using AI for all the things around his writing. But his big message was that if he starts using AI to do the writing itself, he's done.

I think there's a parallel there for developers. So I posted about it on X, and to my surprise, Tim Ferriss retweeted it. One of my favorite authors shared something I wrote. That was a really cool moment.

:TweetEmbed{id=2110750641400279063}

## What I'm Building

I've been sharing a couple of the apps I'm building for myself on X. Here are two posts from this week.

The first is a set of tools for creators that I'm building for my own workflow.

:TweetEmbed{id=2111170400390365580}

The second is Clearing, a deep work planner for my Mac. It gives me one place to see everything that needs my attention.

:TweetEmbed{id=2111147783038066848}

## Until Next Week

That's it for this week. If you'll be at one of these events, hit reply and let me know. I'd love to meet you in person.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
