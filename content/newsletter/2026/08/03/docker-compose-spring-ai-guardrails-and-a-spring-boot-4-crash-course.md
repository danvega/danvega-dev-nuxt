---
title: "Docker Compose, Spring AI Guardrails, and a Spring Boot 4 Crash Course"
slug: "docker-compose-spring-ai-guardrails-and-a-spring-boot-4-crash-course"
date: "2026-08-03"
description: "What that docker-compose.yml actually does, four layers of Spring AI guardrails, when to trust AI-generated code, and a first look at my Spring Boot 4 crash course."
tags: ["Spring Boot", "Spring AI", "Docker", "Java"]
newsletter: true
published: true
---

## Vacation Mode (After This One)

Happy Monday. Before we get into it, two quick things.

First, I'm heading out on vacation this week. That means there's no newsletter next Monday. Enjoy the break, and I'll be back the week after with fresh content.

Second, I've been heads down on something new: a Spring Boot 4 crash course. I've been mapping out the sections and building the demos, and I think this is going to be a solid on-ramp for anyone jumping into the latest version. Here's what I've got planned so far:

- Getting started with Spring Boot 4 and the new baseline (Java, Jakarta, and the Spring Framework 7 foundation)
- Building your first REST API with the updated defaults
- Data access with Spring Data and testing it properly
- The new HTTP client and service interface improvements
- Observability and what's changed out of the box
- Packaging, Docker, and getting your app production ready

The goal is simple. Clone it, run it, and understand every piece by the end. More on that soon.

Here's what I shipped last week:

- Four videos on Docker Compose, Spring AI guardrails, AI dependency upgrades, and trusting AI-generated code
- A new Spring Office Hours episode on Docker, Compose, and Testcontainers
- Continued work on the Spring Boot 4 crash course

One more thing. Do you find this newsletter helpful? I'm thinking about switching up the format. Would you like to hear more from me or less? Hit reply and let me know. I read every response.

## Videos Published This Week

### Clone. Run. Done. What That docker-compose.yml in Every Java Repo Actually Does

You clone a Java project and it just runs. No onboarding doc. No "go install Postgres first" step. That's the dream, and the compose file is how you get there.

There are two sides to Docker, and this video covers the one nobody bothers to explain. You run your dependencies (Postgres, Redis, whatever) in containers, while your app runs the normal way you're used to. That split is the key to a smooth local setup.

If you've ever wondered what that docker-compose.yml file in every repo actually does, this one's for you.

:YouTube{id=0LNVXHKKJb8}

### Spring AI Guardrails: 4 Layers and Where Each Breaks

Guardrails are the part of AI apps that get skipped until something goes wrong. In this video I walk through four layers of protection and, more importantly, where each one breaks.

We start with the SafeGuardAdvisor, which intercepts the user's prompt before it ever reaches the LLM. From there I show how the layers stack and where the gaps live. If you're shipping anything with Spring AI, you need to know these.

:YouTube{id=EZ6Uh1-8Ui4}

### The Right Way to Upgrade Dependencies with AI

AI can help you upgrade a project, but only if you approach it the right way. This video is about when to reach for AI and how to keep it from making a mess of your build.

I walk through my process for using AI on dependency upgrades. It's less "let the robot do everything" and more "give it the right job and check its work." That balance matters when you're touching a project you care about.

:YouTube{id=MYtia9xsTrQ}

### Can You Trust AI-Generated Code?

Yesterday I caught my AI assistant making three mistakes in a Spring Boot app I've been writing for years. An hour later it handed me Swift code I had no business approving, and I shipped it anyway.

Same model. Same day. Two completely different reactions. The code I should have trusted less is the one that felt better, and that's the whole problem. In this video I dig into why our confidence in AI code often has nothing to do with whether the code is actually right.

:YouTube{id=UuM2-nRsLuA}

## Spring Office Hours

### S5E19 - Docker, Compose, Testcontainers, Oh My!

This one pairs nicely with my Docker video from the week. We dug into Docker, Docker Compose, and Testcontainers, and how they fit together in a real Spring Boot workflow.

We covered how to run your dependencies locally with Compose and how Testcontainers gives you the same setup in your tests. If you want a smoother local and CI story, give it a listen.

[S5E19 - Docker, Compose, Testcontainers, Oh My!](https://share.transistor.fm/s/fd48b861)

:YouTube{id=jWWi0J6ggeI}

## Upcoming Speaking Engagements

### Portland Java User Group

August 25, 2026 in Portland, OR

I'm giving my talk "AI for Java Developers." AI is everywhere right now, and this talk bridges the gap between traditional Java development and AI. I'll explain the core ideas behind AI, machine learning, and deep learning using concepts Java developers already know, and show how your current skills carry over.

We'll go through hands-on examples and real use cases: natural language processing, computer vision, chatbots, recommendation systems, and sentiment analysis in Java systems. You'll walk away with a foundation to start adding these features to your own work.

## Tweets

I've been climbing the AI adoption ladder on a real codebase, and there's a video coming that maps out where you are.

:TweetEmbed{id=2083279265697595724}

## Until Next Week

That's it for this edition. Remember, there's no newsletter next Monday since I'll be on vacation, but I'll be back the week after.

Reply and let me know what you want me to cover next, and tell me if you'd like more or less from me each week. I'm listening.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
