---
title: "Building Spring Evals, the 5 Steps of AI Adoption, and Embabel Hits Spring Boot 4"
slug: "building-spring-evals-the-5-steps-of-ai-adoption-and-embabel-hits-spring-boot-4"
date: "2026-08-17"
description: "Why I stopped trusting model benchmarks and started building Spring Evals, plus the 5 steps of AI adoption and Embabel 1.5.0 landing on Spring Boot 4."
tags: ["Spring Boot", "Spring AI", "Java", "AI", "Embabel"]
newsletter: true
published: true
---

Happy Monday, friends 👋🏻

I'm back from vacation, refreshed and ready to go. Before I left I got stuck on a problem I couldn't put down: benchmarks.

Every time a new model ships, the benchmarks tell us it's the greatest thing ever built. I've started paying less attention to them. Not because the numbers are fake, but because they aren't measuring the work I actually do. A model can top the generic coding charts and still hand me Jackson 2 imports and a test setup that doesn't exist anymore.

That's the gap. Models do fine on generic coding benchmarks and much worse on framework-specific work, especially anything released after their training cutoff. Spring Boot 4 and Spring Framework 7 shipped enough breaking changes (Jackson 3, modular auto-configuration, new HTTP clients, new testing tools) to trip up even frontier models.

So last week I started building Spring Evals. It measures that gap, per agent and per model, using tasks a real Spring developer would recognize.

The project is on GitHub: [https://github.com/danvega/spring-evals](https://github.com/danvega/spring-evals)

I've got a bunch of talks to prep for over the next few weeks, so let's get into it.

## Video Recaps

### The 5 Steps of AI Adoption: Which Step Are You On?

Every developer is somewhere on the AI adoption curve, whether they realize it or not. In this video I break down the five steps of AI adoption and help you figure out exactly where you land.

This one is less about a specific tool and more about how you think about bringing AI into your work. Some of us are still typing questions into a chat window. Others are wiring up agents that ship code. Knowing which step you're on tells you what to focus on next.

:YouTube{id=g12mC2J11d0}

## Spring Office Hours

No episode last week, but we have a good one coming up.

On August 17 we are joined by Danny Thompson for [S5E20: The Developer's Guide to AI with Danny Thompson](https://www.youtube.com/watch?v=JzbxCtxr7nY). Danny has a great way of cutting through the noise on AI, so this should be a fun one. You can see the full schedule here: [https://springofficehours.io/schedule](https://springofficehours.io/schedule)

## Upcoming Speaking Engagements

I've got a busy stretch ahead. Here's where you can find me.

**Portland Java User Group** (August 25, 2026, Portland, OR)

- AI for Java Developers: I'll bridge the gap between traditional Java work and AI. We'll cover core ideas like machine learning and deep learning using concepts Java devs already know, then build real features like NLP, chatbots, and recommendation systems.

**Commit Your Code 2026** (September 3-4, 2026, Plano, TX)

- AI for Java Developers: Same hands-on look at bringing AI into your Java systems, with real-world use cases you can take home and try.

**KCDC 2026** (September 9-11, 2026, Kansas City, MO)

- What's new in Spring Boot 4: A live-coding tour of the next major release. We'll dig into HTTP interfaces, JSpecify null safety, Jackson 3, and built-in resilience patterns.
- Zero to Superpowers with Claude Code: How I actually use Claude Code day to day. We'll start with the basics, then build up to custom slash commands, skills, and agents that fit your workflow.

## In the News

### Inside the Mind of a Spring Framework Maintainer - Sébastien Deleuze | The Marco Show

Sébastien Deleuze sat down with Marco to talk about what it's like maintaining the Spring Framework. It's a great look behind the curtain at the work that goes into the tools we use every day.

:YouTube{id=mCOGZGV48hU}

**Dan's Thoughts:** I don't miss an episode of this podcast. Marco does such a great job with these interviews. I really enjoyed Sébastien's perspective on a variety of topics.

### Embabel 1.5.0 Supports Spring Boot 4.x and Spring AI 2.x

Rod Johnson [announced](https://x.com/springrod/status/2079187041561272543) that Embabel 1.5.0 now supports Spring Boot 4.x and Spring AI 2.x. If you're building agents on the Spring stack, this keeps you current with the latest releases.

**Dan's Thoughts:** This is huge news. It's great to see that right on the heels of the 1.0 GA the team was able to ship support for Spring Boot 4.

## Tweets

ColdFusion in Spring Boot?

:TweetEmbed{id=2084279287884972469}

Thanks for the Birthday Present DaShaun!

:TweetEmbed{id=2088085684162543915}

## Until Next Week

That's it for this week. If there's a topic you want me to cover, or a question about Spring Evals, AI adoption, or anything else, just hit reply. I read every response.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
