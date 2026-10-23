---
title: "Don't Let AI Write All Your Code"
slug: "dont-let-ai-write-all-your-code"
date: "2026-10-23"
description: "Tim Ferriss won't let AI write his next book. Here's what I won't hand off to AI as a developer, and how I check the code I do."
tags: ["AI", "Java", "Spring AI", "Embabel", "ArchUnit"]
newsletter: true
published: true
---

Something cool happened recently. Tim Ferriss retweeted me.

Tim is one of my favorite authors. I love *The 4-Hour Workweek*, and I've read a lot of his books since. If you don't know his work, check out his blog and his podcast, The Tim Ferriss Show. You can find both at [tim.blog](https://tim.blog).

I mentioned the retweet in my last newsletter. But I kept thinking about it. So in this edition, I want to go a little deeper.

## What Tim Said

Tim was on The Random Show with Kevin Rose. They talked a lot about AI, and Tim uses it for almost everything. His AI assistant changes his flights. It books restaurant reservations that are hard to get. When someone sends him edits, he has AI compare the versions so he can print the changes in color.

But there's one thing he won't hand off. He's working on a new book, and he won't let AI write it. In his words: "If I do that, I'm done."

His point was simple. If you want to keep a skill, be careful what you hand off.

Here's the full episode. The part I'm talking about starts at 1:07:50.

:YouTube{id=YxbEVUH_4w8}

And here's the post Tim shared.

:TweetEmbed{id=2110750641400279063}

## Why This Hit Home

This is what I've been telling developers. The tools are here, so use them. But use them for the right reasons.

Some tasks won't teach you anything. Hand those off. Take a basic CRUD app. I've built an MVC app that creates, reads, updates, and deletes data a hundred times. There's nothing left for me to learn there. So I lean on AI for it and spend my time on more interesting problems.

## Put Checks in Place

Handing work off doesn't mean I stop paying attention. You still need reviews, gates, and checks so you know the generated code is correct.

For me, a lot of this lives in skills. Say an app talks to a database or another service and doesn't turn on virtual threads. I have a skill that catches that. If an app is headed to production, I have skills that make sure it has observability.

I also check that the right tests get written. Do I need this many unit tests, integration tests, and end-to-end tests? I have a pattern for what those tests should look like.

I also use ArchUnit, a Java library for testing your architecture. With it, I know a generated controller will never talk directly to a repository. It always goes through a service layer.

This doesn't happen overnight. You build these checks over time. As you trust them more, you can spend less time reviewing the routine code.

Some code still needs your full attention, like a pricing algorithm. That's okay. Focus on what's important, and hand off the tedious tasks you don't want to do.

## Write the New Stuff Yourself

New things are different. Learning something new is my version of Tim's book. He won't hand off his book, and I won't hand off learning.

JDK 28 is getting a native JSON API. I could have asked AI to generate a demo. But what would I gain from that? I wanted to learn how it works and how it fits into my workflow. So I typed out some of the examples myself. Because I did the work, I'm going to remember it. ([The demo repo is on GitHub](https://github.com/danvega/native-json-demo) if you want to try it.)

Same with Embabel, a framework for building AI agents with Spring. I want to learn it, so I'm building things with it myself first.

I also gave a 90-minute presentation on Spring AI 2 recently. I knew some of the material already. Some of it I didn't. Could I have thrown a talk together quickly and just given it? Yes. But I wanted to learn. So I dug into what changed in the tool call advisor. I worked through how short-term and long-term memory work. These are things I need to know, so I need to get the reps in myself.

Here's my rule of thumb. If I do something by hand 10 times, maybe I'll generate it on the 11th. By then I know what good looks like.

Failure is the best teacher. That's still true when we're writing code.

## Use AI to Learn, Not to Skip Learning

AI can still help you learn. I've written two skills for this, called "teach me" and "guide me." They help me learn something new by asking questions and giving hints. They don't write everything for me.

That's the difference. AI as a tutor is great. AI as a replacement for thinking is not.

## A Note to Junior Developers

This part matters most to me.

If you ask for whole features, click accept, and move on, you'll end up in a bad place. If you don't review the code, you won't understand the tradeoffs. And if you don't understand the tradeoffs, you can't make good calls when it counts.

You have to keep learning in this industry. That has always been true. AI doesn't change it.

## What Won't You Hand Off?

AI is only going to get better. The pull to use it for everything will only get stronger. So decide now what you want to keep.

What's the one skill you want to keep in your head? Hit reply and tell me.

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
