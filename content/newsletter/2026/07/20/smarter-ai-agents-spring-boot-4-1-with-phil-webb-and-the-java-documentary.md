---
title: "Smarter AI Agents, Spring Boot 4.1 with Phil Webb, and the Java Documentary"
slug: "smarter-ai-agents-spring-boot-4-1-with-phil-webb-and-the-java-documentary"
date: "2026-07-20"
description: "Taming tool overload in Spring AI, Spring Boot 4.1 straight from the source with Phil Webb, self-correcting structured output, and the Java documentary."
tags: ["Spring AI", "Spring Boot", "Java", "AI"]
newsletter: true
published: true
---

Hey friends

Big couple of weeks. I shipped a bunch of videos, most of them digging into Spring AI tooling, and I finally sat down to fix up some things that have been bugging me for a while.

The website got the most attention. There's a new [podcasts page](/podcasts) that pulls episodes straight from the RSS feeds for Spring Office Hours and Fundamentals of Software Engineering, plus my guest appearances on other shows. The Fundamentals of Software Engineering book page got a refresh for the release. I rebuilt the about page, turned my Spring Boot 4 post into a proper hub for everything Boot 4, and rolled the terminal look across the whole site, right down to the new blog post covers. Along the way I squashed a bunch of little bugs that have been hiding in there for months: broken cover images, weird tag rendering, social share cards that ignored the post cover.

While I was at it, I mapped out my entire content creation process. It turns out there are ten stages between "I have an idea" and a video that's published, repurposed, and promoted. Writing it all down made the bottlenecks obvious, and it showed me exactly where AI could take work off my plate. If you're curious how I actually put this stuff together, I wrote the whole thing up here: [https://www.danvega.dev/blog/content-creation-workflow](/blog/content-creation-workflow)

Let's get into it.

## Videos This Week

### Spring AI Tool Search

As your AI agents connect to more services like Slack, GitHub, Jira, and MCP servers, your tool libraries grow fast. A typical multi-server setup can pull in 50+ tools and burn through 55,000+ tokens before the conversation even starts. That's expensive and slow.

There's another problem too. Tool selection accuracy drops off a cliff once the model has to pick between 30+ similarly-named tools. It starts guessing, and guessing is not what you want in production.

This video walks through how tool search solves both problems by only surfacing the tools that matter for a given request. If you're building anything with agents right now, start here.

:YouTube{id=VG00DildlvY}

### Spring AI Tool Search Advisors

This one builds on the tool search idea and shows you how to wire it up with advisors. If you've watched the first video and want to see how this fits into a real request pipeline, this is your next stop.

:YouTube{id=WNJFR-_N9bc}

### Self Correcting Structured Output

Getting structured output from an LLM is great until the model hands you back something that doesn't match your schema. This video covers a pattern where the model checks its own work and fixes the output before it gets to your code.

If you've ever parsed a response and had it blow up on a missing field, you'll want to see this approach.

:YouTube{id=vxOeeNyOtZY}

### ui.sh Introduction

A quick intro to [ui.sh](https://ui.sh) and what it brings to the table. Short and to the point, worth a look if you want to see what it's about.

:YouTube{id=-B7uyMp54S4}

## Spring Office Hours

Two episodes went out over the last couple of weeks and both are worth your time.

First up, [S5E17 - Spring Boot 4.1 with Phil Webb](https://share.transistor.fm/s/7b0e4e93). Phil joined us to talk through what's coming in Spring Boot 4.1. Any time Phil is on the show you know we're getting the details straight from the source.

:YouTube{id=4MYFKQkvwNw}

Then we did [S5E18: The Latest from OpenAI, Anthropic and Spring AI 2.0](https://share.transistor.fm/s/15c533f2). We caught up on everything moving in the AI space and dug into what Spring AI 2.0 means for Java developers building AI features.

:YouTube{id=MHsJMlq3wSI}

## Fundamentals of Software Engineering

Two more episodes dropped on the podcast side.

In [E09 - Effective Remote Work Tips and Why AI Doom Trolling Is a Choice](https://share.transistor.fm/s/6d675095), we shared some practical advice on making remote work actually work, and got into why all the AI doom talk is a choice you don't have to make.

In [E10 - Context Engineering Is Just Data Fundamentals in Disguise](https://share.transistor.fm/s/daff9573), we made the case that context engineering isn't some brand new discipline. It's the same data fundamentals you already know, wearing a new hat. If you've been feeling behind on the AI hype cycle, this one should make you feel a lot better.

## In the News

### The Java Documentary has been released

The cult.repo team dropped their Java documentary, and it's a great watch for anyone who cares about the language and its history.

:YouTube{id=ZqGSg4b_cZA}

**Dan's Thoughts:** This was another amazing documentary by the cult.repo team. I loved every minute of it.

## Tweets

My take on why Java is a real option for building AI into applications:

:TweetEmbed{id=2077411020901875832}

Some behind the scenes on organizing and refining my skills setup:

:TweetEmbed{id=2078126210178007531}

How I used Claude to handle about 70% of the editing on my latest video, including some custom motion graphics skills:

:TweetEmbed{id=2078122342417392090}

## Until Next Week

That's it for this edition. If there's a topic you want me to cover or a question you've been sitting on, just hit reply. I read everything.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
