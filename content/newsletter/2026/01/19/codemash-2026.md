---
title: "CodeMash 2026, New Spring Office Hours Website and AI Tutorials"
slug: "codemash-2026"
date: "2026-01-19T08:00:00.000Z"
description: "Happy Monday and welcome to another edition of the newsletter. I love when the new year begins because it means I can start attending the conferences I look forward to every year."
tags: ["CodeMash", "Spring AI", "Spring Office Hours", "YouTube", "MCP"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. I love when the new year begins because it means I can start attending the conferences I look forward to every year. I had the honor of speaking at CodeMash 2026 last week and I'll tell you more about that in a bit.

This week, I'm speaking at a conference I've never attended before, and I'm super excited. I'll be presenting at the Java Champions Conference on Thursday, January 22 at 12 PM EDT. This free online conference features Java Champions as speakers. If you haven't [registered for free](https://jchampionsconf.com/), do so now. I hope to see you in my session.

![Java Champions Conference](/images/newsletter/2026/01/19/java-champions-conference.png)

I was preparing for CodeMash last week and didn't send out an update, so we have a lot to cover. A huge shoutout to IntelliJ IDEA, which turns [25 this week](https://www.jetbrains.com/lp/intellij-idea-25/). I've personally paid for an IntelliJ subscription for as long as I can remember. It's one of those tools I couldn't imagine not having in my tool belt.

## CodeMash 2026 Recap

As I mentioned earlier, I love going to CodeMash and I'm lucky to have made the trip five times before. Did you know that next year will be the 20th CodeMash? They also [announced](https://codemash.org/announcing-codemash-east/) during the conference that there will be a new CodeMash East in Spotsylvania, Virginia later this year.

This year I had a precompiler (workshop) on Tuesday, so I made the one-hour drive up Monday night. My four-hour workshop ran from 8 AM to 12 PM, and I was really looking forward to it. I had around 50 attendees in a fairly large room. They tried putting me at a podium, but I quickly moved some tables around. When I give a longer workshop with lots of live coding, it's much easier sitting down. Everyone seemed to enjoy the workshop. I had great questions and feedback, and I had a lot of fun putting it on.

![Precompiler Workshop](/images/newsletter/2026/01/19/precompiler.jpeg)

My second talk was on Friday with my good friend Nate Schutta, centered on our new [book](https://fundamentalsofswe.com/). The talk was titled "The Fundamentals of Software Engineering in the Age of AI." We had standing room only, an amazing crowd. We discussed where the fundamentals stand for software engineers working with AI tools. Distilling the book down to one hour is challenging, but I think we did a solid job at a high level, and the room really enjoyed it.

![Fundamentals of Software Engineering Talk](/images/newsletter/2026/01/19/fose_age_of_ai.jpeg)

And of course the best part of CodeMash is getting to see friends. Had a nice dinner with fellow Java Champions Chris Judd and Nate Schutta.

![Dinner with Chris and Nate](/images/newsletter/2026/01/19/chris_nate.jpeg)

## Spring Office Hours

We recently kicked off Season 5 of Spring Office Hours. If you aren't aware, this is a live stream and podcast my friend DaShaun and I host weekly. This is our chance to try and get the community caught up on everything happening in the world of Spring. Up until now the website [www.springofficehours.io](http://www.springofficehours.io) was hosted on Transistor which is the platform I use to publish our podcast.

This worked but I wanted a little more control over the website and what we could do with it. I had a couple of requirements that I needed to work with. First, I needed to pull in the podcast episodes dynamically so I didn't have to update it in multiple places. We also use Notion for tracking shows, getting questions and feedback, and more, so I needed to integrate with the Notion API.

I had some time over the weekend while playing the role of a professional Uber driver for my children's athletic endeavors. I decided to sit down and "vibe code" a new website and I think it turned out pretty well.

![Spring Office Hours Website](/images/newsletter/2026/01/19/spring-office-hours-website.png)

We live in interesting times with LLMs and all of these really good coding agents. It's so good that at times I have to remind myself that this is the worst it's going to be. With that said, I still believe these tools are best at amplifying your existing skills. I have built a number of "marketing" websites before so I had a plan going into this.

I knew the tech stack I wanted to use which included Vue, Nuxt, and Tailwind. This is my go-to stack for building frontend applications. I'm sure some of you are wondering why not use Spring for this? I'm obviously a huge fan of Spring but I'm also a fan of the right tool for the right job. When it comes to building frontend sites that will use a mix of static and dynamic content, I find it enjoyable to work with. In fact, my [personal site](http://www.danvega.dev) is built on the same stack allowing me to write my newsletter and blog posts using Markdown.

I could probably talk about the process a lot more in detail but I will leave that for another day. I ended up putting together a Claude Code skill for building a Product Requirements Document (PRD) and using the Ralph Wiggum Loop to build out each of the features I was looking to implement. This worked for most of the features and then I took it the rest of the way (last 20%) with Claude Code myself. I think it ended up taking me 3-4 hours which is amazing. This is something I could have done on my own but my frontend skills aren't that great so it probably would have taken me a week to come up with something that I was happy with.

## New AI YouTube Tutorials

I spent the last couple of months focused on Spring Framework 7 and Spring Boot 4 and rightfully so, there was a lot to talk about. I feel like I have fallen behind on some of the cool things happening in both the AI and Spring AI spaces. I took the opportunity to start recording some videos and getting caught up. There is a lot more to do and I hope to knock some of those items off my backlog this week.

### Spring AI 2.0 M1

Spring AI 2.0 Milestone 1 has arrived, and the headline feature is **Spring Boot 4 and Spring Framework 7 support**. If you've been waiting to use Spring AI with the latest Spring stack, now's your chance.

This release packs 25 enhancements, 7 bug fixes, and 32 documentation improvements. Here are the highlights I cover in the video:

**Redis Chat Memory** — A new Redis-based chat memory implementation lets you persist conversations across server restarts. No more losing context when your app cycles.

**Anthropic Citations & Skills API** — You can now enable citations to track which parts of your documents the model referenced. The Skills API is particularly cool—it lets you generate downloadable PDFs, Word docs, and Excel files directly through the Anthropic integration.

**Google GenAI & Gemini Enhancements** — Added ThinkingLevel support in ThinkingConfig for Gemini models, giving you fine-grained control over reasoning depth. The Google GenAI SDK has been updated to 1.30.0, and Vertex AI Gemini now includes safety ratings in response metadata. Big thanks to Dan Dobrin from Google for his contributions here.

**Official OpenAI Java SDK** — Spring AI now integrates the official OpenAI SDK, giving you access to the Responses API (with built-in web search), Azure OpenAI, and GitHub models. The default model is now GPT-5 Mini.

I've put together a GitHub repo with working examples for all of these features: [github.com/danvega/hello-spring-ai-2](https://github.com/danvega/hello-spring-ai-2)

:YouTube{id=daPwd4DnEfA}

### Spring AI Native Structured Output

Structured output isn't new in Spring AI—we've been using the `.entity()` method to get typed responses instead of raw strings. But here's what's been happening under the hood: Spring AI generates a JSON schema from your type and appends formatting instructions directly to your prompt, asking the LLM to respond in that format.

It works most of the time, but "most of the time" isn't good enough for production apps.

**Enter Native Structured Output.** Many LLMs now support structured output at the API level. Instead of hoping the model follows your formatting instructions, you send the schema directly to the API—and the model *guarantees* conformance.

Enabling it is one line:

```java
ChatClient.builder(chatModel)
    .defaultAdvisors(advisor -> advisor.enableStructuredOutput(true))
    .build();
```

I also cover how to inspect what's actually being sent to the LLM using the new `SimpleLoggerAdvisor`. Set your logging level to debug and you'll see the full request—including that JSON schema generation.

**Important:** Native structured output only works with supported models (OpenAI GPT-4o+, Anthropic Claude, and others). Check the [Spring AI docs](https://docs.spring.io/spring-ai/reference/api/structured-output.html) for the current list.

### Model Context Protocol (MCP) Elicitations

MCP tools are great for retrieving context and performing actions. But what happens when a user says "order me a coffee" without specifying the size, type, or milk preference? Before elicitations, this would just fail.

Now, the MCP specification provides a **standardized way for servers to request additional information from users** mid-interaction.

Elicitations support two modes: **form mode** for structured data with JSON schema validation, and **URL mode** for directing users to external URLs for sensitive interactions.

In the video, I build a coffee shop MCP server that triggers an elicitation when a customer orders coffee without all the details. On the client side, Spring AI's `@McpElicitation` annotation handles these requests and prompts the user for the missing fields.

This is one of those features where just knowing it exists is half the battle. When you need more user input mid-interaction, elicitations are the answer.

:YouTube{id=JrAllAJf7L4}

## Thank You, John

Last but not least, I want to say thank you to my friend and mentor John Kim. He was instrumental early on in my career and I sent him a signed copy of my new book. He posted this on LinkedIn and it made me smile ❤️

![John Kim LinkedIn Post](/images/newsletter/2026/01/19/john-kim-linkedin.png)

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
