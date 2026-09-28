---
title: "VegaCon 2027, Spring AI TypeSafe, and a Live Spring Boot 4 Migration"
slug: "vegacon-2027-spring-ai-typesafe-and-a-live-spring-boot-4-migration"
date: "2026-09-28"
description: "VegaCon 2027 is the conference app we'll build in my next Spring Boot course. Plus Spring AI TypeSafe, Jev, and a live Boot 4 migration."
tags: ["Spring Boot", "Spring AI", "Jev", "Claude Code", "Java"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. Big news this week. I'm launching a conference. It's called VegaCon 2027, and you're all invited.

Okay, not really. But stick with me, because VegaCon is real in one sense. It's the app we'll build together in my upcoming Spring Boot course. More on that below.

This was also a busy week on the channel. I published six videos covering Jev, Spring AI TypeSafe, Claude Code, spec-driven development, and a live Spring Boot 3 to 4 migration. Let's get into it.

## Introducing VegaCon 2027 (Sort Of)

![VegaCon 2027 conference app home page](/images/newsletter/2026/09/28/vegacon-2027-homepage.png)

VegaCon 2027 is a conference app, not a conference. I'll build it out from scratch in my next Spring Boot course. It gives us a real domain to work with: sessions, speakers, schedules, and attendees. That beats another to-do app any day.

I put together a short video that walks through the idea and gives you an early peek at what we'll build. Think of it as a course preview.

:YouTube{id=eT6KYuoEj4w}

Here's the best part. I haven't started recording yet. That means your feedback can still shape the course. Do you want to see a certain feature? A topic you're stuck on in Spring Boot? Hit reply and tell me. I read every one.

## This Week's Videos

### How Spring Boot 4 Starters Actually Work (I Built One for Jev)

In my last Jev video, I built a client by hand in Spring Boot. It had a `RestClient`, a few records, and a properties class. It worked fine. But I'd have to copy those same files into every new project.

So I packaged it all into a Spring Boot starter. Now you add one dependency, set `TYPESAFE_API_KEY`, and inject `JevClient`. That's it. In this video I explain what a starter is and why you'd want one. Then I show you how to install it and build a sample project with it.

If you've ever wondered what goes on inside the starters you use every day, this one pulls back the curtain.

:YouTube{id=fq_nYo4BnrY}

### 3 Things I Built With an AI That Doesn't Generate Text

After my Jev intro video, the comments all asked the same thing. "Okay, it's not an LLM. So what does it do?" Fair question. This video answers it with three real apps.

First, I sort 100 YouTube comments into seven buckets in seconds, with a flag for the ones that need a reply. Second, I built a blog editor that grades your draft on ten checks. It runs 900 ms after you stop typing. Third, I built a chat app that asks Jev which model should answer before a single token streams.

This isn't a Spring video. It's three ideas you could build this week in whatever stack you like.

:YouTube{id=vMpPDJ3bwXI}

### Feel Behind on AI Coding Agents? Start Here

Your feed is full of developers running fleets of agents from the gym. Meanwhile, you're still copying code out of a chat window. It's easy to feel like you've already missed the boat.

You haven't. In this video I show you the only three basics you need to start with Claude Code: the loop, the permission prompt, and context. Get those down and the rest gets a lot less scary.

If you know someone who feels stuck on the sidelines with AI tools, send them this one.

:YouTube{id=BiKxFmirPpw}

### Spring AI TypeSafe Is Here: Build a Model Router From Scratch

The new Spring AI TypeSafe project is out, and I wanted to build something real with it. So I started from an empty app and built a model router on camera.

Here's how it works. The app sends one Choice question to Jev through the official starter. The question is simple: which tier does this prompt belong in? Luna, terra, sol, or astra? About 300 ms later, Jev returns a label, a confidence score, and a probability per tier. Then the right model answers.

The whole thing takes four classes and one dependency. If you pay for LLM calls, routing easy prompts to cheaper models can save you real money.

:YouTube{id=_5V6sJxRgqk}

### Spec-Driven Development for Solo Developers: The Plan I Use

You can't one-shot an app. But most spec-driven development setups feel like overkill for one person. So I took the process I already use and wrote it down as a handful of skills.

Then I used those skills to build a Spring Boot store wired up to Stripe. It starts with one `PRODUCT.md` file with eight goals, each with a clear "done when." Every feature spec has acceptance lines that name the command that proves them. The result was 57 tests, all green.

My favorite part is the retro. After every build, I run a retro that edits the skills. So each build makes the next one better.

:YouTube{id=bHJZiM2XM-w}

### Spring Boot 3 to 4 Migration: A Real App, Migrated Live

Upgrading always looks easy until something breaks. So I took a working Spring Boot 3 app and bumped it to Spring Boot 4 live on camera.

I fix each break as it shows up and explain why it happened. We hit modular auto-configuration (hello, missing H2 console). We move from Jackson 2 to Jackson 3. And we add null safety with JSpecify.

If a Boot 4 upgrade is on your roadmap, watch this first. It'll save you some head scratching.

:YouTube{id=HiPkoGTeNJc}

## Spring Office Hours

### Last Week: [S5E24 - Jev, Java and Spring](https://share.transistor.fm/s/0df08274)

On this week's episode, we talked about Jev and how it fits into the Java and Spring world. If you've been following my Jev videos and want the bigger picture, this is a great place to start.

:YouTube{id=5GPV0jqP4Rc}

## Upcoming Speaking Engagements

### dev2next 2026 (Lone Tree, CO)

I'll be at dev2next in Lone Tree, Colorado, next month with three sessions:

**October 12: Fundamentals of Software Engineering in the Age of AI (Workshop).** AI tools can boost your output, but you still need the fundamentals to use them well. We'll dig into the skills that matter more than ever.

**October 13: Spring AI: There and Back Again.** A journey from your first `ChatClient` and prompt, through tools and MCP, all the way to agents. Working code, no toy examples.

**October 13: Zero to Superpowers with Claude Code.** How I use Claude Code day to day. We'll start with the basics and build up to custom slash commands, skills, and agents.

If you're going to be there, come say hi!

## Around the Web

"Slop grenades" might be my new favorite term for vibe coding. I believe it came from a tech CEO (Shopify, I think), but check my work on that. I saw it in this post from Shane Parrish, and it stuck with me all week.

:TweetEmbed{id=2099852161576223202}

A big thank you to Artur for the mention of my Jev work in JVM Weekly. If you don't subscribe yet, you should. It's the most detailed newsletter on the JVM out there, and every issue goes deep.

[https://www.jvm-weekly.com/p/thinking-fast-and-typed-java-and](https://www.jvm-weekly.com/p/thinking-fast-and-typed-java-and)

## Until Next Week

That's it for this week. I'd love to hear what you want to see in the VegaCon course while there's still time to shape it. Just hit reply with your ideas, questions, or topics you want me to cover.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
