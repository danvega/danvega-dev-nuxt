---
title: "Embabel 1.0 Goes GA, Spring AI 2.0 Tool-Calling, and My Content Workflow"
slug: "embabel-1-0-goes-ga-spring-ai-2-0-tool-calling-and-my-content-workflow"
date: "2026-07-27"
description: "Embabel hits 1.0, building Claude's 'Calling tool...' UI with Spring AI 2.0, what that docker-compose.yml in every Java repo actually does, and a podcast surprise."
tags: ["Embabel", "Spring AI", "Java", "Docker"]
newsletter: true
published: true
---

Happy Monday. Hard to believe July is almost over.

I'm still working hard on my content creation pipeline. It's a work in progress, and I don't think it will ever really be done. Every time I revisit a phase of the process, I try to improve one piece of it. If you want to see how the whole thing fits together, I wrote it all up here: [https://www.danvega.dev/blog/content-creation-workflow](/blog/content-creation-workflow)

## Videos

### Build Claude's "Calling Tool..." UI with Spring AI 2.0

You've seen it in Claude and other AI apps: that little "Calling tool..." message that pops up while the model does its thing. In this video I show you how to build that same experience with Spring AI 2.0.

We watch the new tool-calling loop run live. I walk through streaming tool-call events through the ToolCallingAdvisor so your UI can react as things happen. That's what makes the difference between a spinner and an interface that actually tells the user what's going on.

I also cover how to take manual control when you need it. The automatic loop is great for most cases, but sometimes you want to step in. If you're building anything with agents on the JVM, this one is worth your time.

:YouTube{id=g6IhOsFKM7c}

### Clone. Run. Done. What That docker-compose.yml in Every Java Repo Actually Does

Here's the dream. You clone a Java project and it just runs. No onboarding doc, no "go install Postgres first" step, no wiki page from three years ago. That's what the compose file in the repo is really doing for you.

There are two sides to Docker, and this video covers the one nobody explains well. You run your dependencies (Postgres, Redis, whatever) in containers, while your app keeps running normally on your machine. Once you get this pattern, spinning up a new project stops being a chore.

:YouTube{id=0LNVXHKKJb8}

## Blog Posts

### Embabel 1.0 Is Here: AI Agent Framework for Java Goes GA

![Embabel 1.0 Is Here: AI Agent Framework for Java Goes GA](/images/newsletter/2026/07/27/embabel-1-0-ga.jpg)

If you've been waiting for a stable release before you took agentic AI on the JVM seriously, the wait is over. Embabel just hit 1.0.0. Rod Johnson announced the GA release of his AI agent framework for the JVM, thanking the contributors who got it across the finish line.

I've been hands-on with Embabel for a while now, so I used this milestone to break down why it matters. The post explains what an AI agent actually is (goals, tools, planning, and a feedback loop, not just a single LLM call), what changed on the road to 1.0, and how you can get started today. If the word "agent" still feels fuzzy to you, start here.

Read the full post: [https://www.danvega.dev/blog/embabel-1-0-ga](/blog/embabel-1-0-ga)

## Spring Office Hours

We didn't publish a new episode this week, but we are working on some new episodes. As always check the [schedule](https://springofficehours.io/schedule) for upcoming shows.

## Podcast Appearances

Last week I was in the car driving and I pulled up my podcast player to find something to listen to. I was scrolling along and I saw that the Inside Java Podcast was talking about Spring AI. I thought to myself I wonder who is talking about that. I would love to be a guest on that podcast. I play the episode and to my surprise it was me 🤣

I joined Lize Raes on the [Inside Java Podcast](https://inside.java/2026/07/23/podcast-063/) for episode 63 to talk about Spring AI 2.0. This episode was recorded at JavaOne back in March and we got to record it in a fancy studio. We got into deterministic agents, MCP servers and skills, prompt engineering, and why Java is such a good fit for enterprise AI. If you want the bigger picture on where Spring AI is headed, give it a listen.

## Upcoming Speaking Engagements

### Portland Java User Group

August 25, 2026 in Portland, OR

I'm giving my talk "AI for Java Developers." AI is everywhere right now, and this session bridges the gap between traditional Java development and AI. I explain the core ideas of AI, machine learning, and deep learning using concepts Java developers already know, then show how your existing skills carry over.

We work through hands-on examples: natural language processing, chatbots, recommendation systems, and sentiment analysis in Java systems. You'll leave with a solid foundation to start adding these features to your own work.

## In the News

### Why AI Won't Replace Great Java Developers - Josh Long | The Marco Show

Josh Long sat down on The Marco Show to make the case that AI isn't coming for great Java developers. It's a good watch if you've had that nagging worry in the back of your head lately.

:YouTube{id=_ftzJ33mCTI}

### We're launching Buzz!

Jack announced Buzz, a new native workspace built for teams of humans and agents working together.

**Dan's Thoughts:** A new native workspace for human + agent teams. We keep seeing tools reshape themselves around agents instead of bolting agents onto old workflows. Worth keeping an eye on.

:TweetEmbed{id=2079605800998146171}

## Until Next Week

That's it for this week. If there's a topic you want me to cover, or a question about Spring AI, Embabel, or Docker Compose in your projects, just hit reply. I read everything.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,    
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
