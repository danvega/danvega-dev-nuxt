---
title: "Fundamentals of Software Engineering, new YouTube videos and Securing MCP Servers"
slug: "fundamentalsofswe-update"
date: "2025-10-27"
description: "Updates on the Fundamentals of Software Engineering book going to print, launching a podcast, publishing 5 YouTube videos in 5 days, and a deep dive into securing MCP servers with Spring Security."
tags:
  - Spring Boot
  - Spring AI
  - MCP
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter.

Is it just me, or has keeping up with our industry become increasingly overwhelming? Every day brings new languages, frameworks, tools, and of course the latest AI breakthrough that everyone insists is revolutionary.

I love learning, and I'm grateful that software engineering guarantees a lifetime of discovery. But I'll admit: I struggle with shiny object syndrome. Scrolling through social media, I see something new and immediately think, "I need to learn this NOW." As a content creator, that impulse quickly morphs into "I need to make a video about this TODAY."

Here's what's been helping me lately: I dump everything interesting into a swipe file and let it marinate. Then I run each item through my goal filter using my yearly, quarterly, monthly, and weekly objectives. The question becomes simple: "Will learning this help me achieve my current goals?" If yes, it moves up the priority stack. If not, it stays in the swipe file for later.

It's not easy. We're wired to chase the new and exciting, especially when social media amplifies every tool as "game-changing" and "essential." But we can't learn everything, and trying to will only leave us scattered and exhausted.

I'm curious about your approach. How do you decide what to learn next? How do you filter the signal from the noise when everyone's shouting about the next big thing?

In this week's edition, I'll share an update on my book, some related projects I'm building, and highlight a few videos from last week and recap my conversation on Spring Office Hours around securing MCP servers.

## Fundamentals of Software Engineering

This week is a big week as the book I have been working on for what seems like forever is going to the printer 🥳 If you have been reading my newsletters you already know just how extremely proud and excited I am for you to be able to get this in your hands and give us some feedback. It has been a career goal of mine for as long as I can remember and I can't wait for the day that I have the actual book in my hands.

Nate and I talked about putting together a podcast around the book and I'm happy to announce that we will begin recording episodes some time this week. The podcast will be an opportunity to go in depth on a lot of the topics for the book and we think you're really going to enjoy it. You will be able to listen to this wherever you get your podcasts but there will also be a video version of it. If you want to you can [subscribe to the channel](https://www.youtube.com/@FundamentalsSWE) now to be notified when the first episode goes live.

I spent some time this weekend putting together a website for the book and the podcast and I'm really happy with the results. It's amazing what some templates and Claude Code can accomplish in a couple of hours. I was able to put this site together and get it live in some spare time over the weekend. This is something that would have taken a lot longer in the past. When the final touches are complete I will share the URL which will probably be in the next edition of this newsletter.

![Fundamentals of Software Engineering Website](/images/newsletter/2025/10/27/fundamentals-website.png)

## YouTube

![YouTube Banner](/images/newsletter/2025/10/27/youtube-banner.png)

Last week I published 5 new videos in 5 days, which might be a personal record. Finding consistency has been a real challenge, and I've been experimenting with different approaches to make it sustainable.

I recently hired a video editor who's been fantastic, though we've only worked on a couple of videos so far. I'd love to bring on a full-time editor, but here's something that might surprise you: despite having over 80,000 subscribers, my channel barely generates enough revenue to cover the cost of editing a single video.

That's why I'm considering sponsorships. My inbox has been flooded with partnership opportunities lately, and while I haven't accepted any yet, it might be time. To be clear: I have no desire to become a full-time YouTuber. I love my day job, and the channel is simply an extension of that passion. But having an editor would free me up to create more content while focusing on what matters most.

I've also realized I've been overthinking the production process. Somewhere along the way, I convinced myself every video needed the perfect title, thumbnail, scripted introduction, and polished conclusion. That approach turns a simple tutorial into a multi-day production.

So last week, I tried something different. I turned on the camera and just started talking. No script, just an idea or some code I wanted to share. The result? Five videos in five days, and significantly less stress. Will this approach help grow the channel? Time will tell, but it certainly feels more sustainable.

Here are the videos from last week. I hope you enjoy them:

- [Build AI's Future: Model Context Protocol (MCP) with Spring AI in Minutes](https://www.youtube.com/watch?v=MarSC2dFA9g)
- [Google's FREE Vibe Coding Studio Feature inside of AI Studio](https://www.youtube.com/watch?v=11L34s72s6U)
- [Claude Code Web & iOS: Fix Bugs and Deploy Code from Anywhere](https://www.youtube.com/watch?v=piu3UK20lI8)
- [Why Plan Mode is Claude Code's Most Underrated Feature](https://www.youtube.com/watch?v=QlWyrYuEC84)
- [How to Secure your MCP Servers with Spring Security 🔐 & Spring AI 🤖](https://www.youtube.com/watch?v=Xiw4bMD3SOg)

## Securing MCP Servers with Spring AI

Last week I sat down with Daniel Garnier-Moiroux to talk about securing MCP (Model Context Protocol) servers with Spring AI. Daniel works on the Spring Security team and has been helping bring security features to the Spring AI ecosystem. We dug into two main approaches for securing your MCP servers: API keys for when you need something quick and straightforward, and OAuth2 when you need more robust token-based authentication.

What I appreciated most about our conversation was how Daniel broke down what could be a complex topic into practical, implementable solutions. He walked through setting up API key authentication with BCrypt hashing (though he warned about the CPU costs if you're checking keys on every request), and then showed how to wire up OAuth2 with an authorization server. The OAuth dance can be tricky to debug, but Daniel showed me how the MCP Inspector tool makes this way easier. It actually walks you through each step of the handshake so you can pinpoint exactly where things break. His main point? You don't need to become a security expert to properly secure your MCP servers. Spring Security gives you sensible defaults that work, and when you need to customize, the extension points are there without requiring a deep dive into cryptography.

You can watch our entire conversation below 👇🏻

:YouTube{id=AnBNm1vzCDE}

### TWEETS

The first release candidate of Spring Boot 4 was released last week!

:TweetEmbed{id=1981737263114395873}

JavaOne is an amazing conference and if you would like to speak there next year, here is your chance

:TweetEmbed{id=1981411918947766346}

OpenAI announced their new Web Browser, Atlas

:TweetEmbed{id=1980687324175560788}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
