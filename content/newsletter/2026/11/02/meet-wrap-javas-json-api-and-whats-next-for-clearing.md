---
title: "Meet Wrap, Java's JSON API, and What's Next for Clearing"
slug: "meet-wrap-javas-json-api-and-whats-next-for-clearing"
date: "2026-11-02"
description: "The screen recorder I've been building, which knows what you did, not just what you said. Plus two new videos and where I'll be in November."
tags: ["Wrap", "Java", "Spring AI", "Clearing"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter.

If you're new here, welcome. Last week I moved the ByteSized AI readers over to this newsletter, so a lot of you are getting it for the first time. I'm Dan, a Spring Developer Advocate at Broadcom. Each week I share what I'm building, what I'm learning, and what's new in Java, Spring and AI. I'm glad you're here.

This week I want to tell you about Wrap, the screen recorder I've been building. After that, I've got two new videos for you, a quick Clearing update, and where I'll be this month. Let's get into it.

## Meet Wrap

A while back I recorded a twenty minute video with the wrong mic. All of it was gone. I make a coding video almost every week, so that one hurt. It's a big reason I started building Wrap.

Wrap is a screen recorder for the Mac. It records your screen, camera and voice. But it also keeps a log of what you did while you talked: every terminal command and whether it passed, test and build runs, and the file and line you were working on.

Here's why that matters. Most tools only have the transcript. They hear "okay, so that passed" and guess. Wrap knows a test ran for 20 seconds and passed. So instead of cutting the wait, it can speed it up. And when you type code, it can zoom in on the line you're typing.

Wrap is AI first. Connect the agent you already use, like Claude Code, Codex or Cursor. It reads the transcript and the log, and writes a plan for the edit. You preview each change on a real frame and accept the ones you want. Nothing leaves your Mac, and there are no AI credits to buy.

A few things I've added lately:

- **Rough cut in one click.** It removes filler words, restarts and dead air, and hands you the whole edit as one proposal to review.
- **Preflight before every take.** It checks your mic, camera and disk before you roll. No more lost takes.
- **Brand kits.** Your colors, fonts and logo, used by every lower third and link card.
- **Remixes.** Make Shorts and X clips from the same project. Fix a word in the main video, and every clip gets the fix.

I've started recording my own videos with it. I also made a short video that shows Wrap in action. It's only 39 seconds.

[Watch the video at thatsawrap.video](https://thatsawrap.video/)

Wrap is in a private beta right now. If you make videos about code and want to try it, join the waitlist on the same page.

## New Video: Hands On with Java's JSON API

I've mentioned JEP 540 here before. It's the Simple JSON API, and it's coming in JDK 28 as an incubator module. That's not a final feature. It's an early version you can try now, and the API can still change.

So I made a video where we actually write some code with it.

We start with the basics: parse some JSON, read a few values, and write JSON back out. Then we build a small API client. It fetches posts over HTTP and maps them to Java records, using nothing but the JDK. No Jackson, no Gson, no dependencies.

Along the way I cover the questions I got most when I first posted about it:

- **Does it do data binding?** No. You map each field to your record by hand.
- **Does it replace Jackson?** No, and the JEP says so. For a real production app, you'll still use Jackson. For a small app or a quick script, you may not need a library at all.
- **How do I run it?** Incubator modules aren't loaded by default. I show the `--add-modules` flag and the IntelliJ IDEA settings you need.

:YouTube{id=kdqJD94Cpos}

The repo has even more examples than the video: records to JSON and back, pattern matching, error messages, exact numbers, and missing vs null values. Grab it here: [github.com/danvega/native-json-demo](https://github.com/danvega/native-json-demo)

One ask. Incubators exist to get your feedback. So don't have your agent write you a tutorial. Grab a JDK 28 early access build and write some code. If something feels wrong or missing, tell the JDK team. That's how it gets better before it's final.

## Short-Term vs Long-Term Memory in Spring AI

Why does my chatbot forget everything when a user starts a new conversation? I get that question a lot.

A language model remembers nothing between calls, so memory is something you build. In my latest video, I show the two kinds you can build with Spring AI. Short-term memory is a transcript of the current conversation. Long-term memory is notes about the user that last across conversations.

One thing trips people up. Saving your chat history to a database doesn't make it long-term memory. It's still tied to the conversation, so a new chat starts empty.

:YouTube{id=cai0knehSXM}

The code is here: [github.com/danvega/spring-ai-memory](https://github.com/danvega/spring-ai-memory)

## Clearing Update

[Last week](/newsletter/a-scary-week-in-security-meet-clearing-and-kiln-needs-your-eyes) I told you about Clearing, the Mac planner I built to get everything out of my head. Here's where it stands.

Version 1.0 is with Apple now, waiting for App Store review. For launch week it's $19.99, then $29.99. You pay once. There's no subscription.

As soon as 1.0 is approved, I'm shipping two more things:

- **Clearing 1.1.** Ramble gets a new name: Brain Dump. Talk through one idea and you get one task with notes, not a pile of separate tasks. The inbox gets quicker ways to plan and sort, and long notes get faster.
- **Clearing for iPhone.** Capture a thought on the go, and check today's plan between meetings. It's included when you buy the Mac app. Your plans sync through your own iCloud account.

You can see more at [clearingplanner.com](https://clearingplanner.com).

## Where I'll Be This Month

November is a busy travel month. If you're at any of these, please come say hi.

- **[Porto Tech Hub](https://portotechhub.com/conference-2026/), November 10.** A keynote with Nate Schutta: Fundamentals of Software Engineering in the Age of AI.
- **[J-Fall](https://jfall.nl), November 12.** Spring Cleaning: What Boot 4 Lets You Delete.
- **QCon San Francisco, November 19.** Two workshops: [AI for Java Developers](https://qconsf.com/training/nov2026/ai-java-developers), and [The Fundamentals of Software Engineering in the Age of AI](https://qconsf.com/training/nov2026/fundamentals-software-engineering-age-ai).

## Until Next Week

That's it for this week. If you have thoughts on Wrap or try the new JSON API, hit reply and tell me what you think. I read every one.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
