---
title: Building your own MCP Server, JDK 24 with Billy Korando and OpenAI's new Image Generation
slug: mcp-server-build
date: 2025-03-31T00:00:00.000Z
---

Happy Monday! This week's edition is packed with AI advancements and Java updates. Learn how to build a custom MCP server from scratch with Spring AI to connect your tools to models like Claude, and hear about MCP's momentum with OpenAI's support. We'll also share highlights from our chat with Billy Korando about exciting JDK 24 features, and dive into the fun (and impressive results) of OpenAI's new built-in image generator in ChatGPT.

## MCP

In this week's tutorial video, I demonstrated how to build a custom Model Context Protocol (MCP) server from scratch using Spring AI's powerful starter packages. The video walks through creating a simple MCP server that exposes information about my courses, which can then be accessed by AI assistants like Claude Desktop.

### What You'll Learn in the Video

- How to set up a Spring Boot application with the MCP server starter
- Creating custom tools that expose functionality to AI models
- Configuring the server to work with standard input/output transport
- Installing and connecting your MCP server to Claude Desktop
- Testing the integration with real queries

:YouTube{id=w5YVHG1j3Co}

### MCP Taking Off Rapidly

The Model Context Protocol ecosystem is expanding at an impressive pace! Just last week, [Sam Altman announced](https://x.com/sama/status/1904957253456941061) that OpenAI will be supporting MCP, representing a major milestone for this emerging standard. This means we'll likely see broader adoption and interoperability across different AI platforms in the near future.

### Spring AI Team Leading the Way

While I used Spring Boot in my example, it's worth highlighting that the Spring AI team is behind the official MCP Server SDK for Java. Even if you're not using Spring in your projects, you can take advantage of this SDK to build MCP-compatible servers with pure Java:

[Java SDK for Model Context Protocol](https://github.com/modelcontextprotocol/java-sdk)

This standardized approach to connecting AI models with external tools and data sources opens up exciting possibilities for creating workflows where AI assistants can access your applications, APIs, and databases through a consistent interface.

What MCP servers would you like to see built next? Let me know your thoughts and ideas!

## Spring Office Hours with Billy Korando

Last week on Spring Office Hours we had the opportunity to sit down with Oracle Java Developer Advocate Billy Korando to discuss the recent release of JDK 24 and highlights from Java One conference. Billy shares insights on significant improvements in JDK 24, including synchronized virtual threads without pinning (JEP 451) and Stream Gatherers (JEP 485), both popular features that excited many developers at Java One. The conversation explores how Project Amber continues to enhance Java with data-oriented programming concepts, and touches on upcoming improvements to structured concurrency in JDK 25.

We also discussed the performance benefits of updating to newer JDK versions, with Netflix reporting significant improvements after upgrading. Billy provides guidance on how developers can contribute to Java's evolution and test early access builds of upcoming versions. The episode wraps up with recommendations to check out the complete JDK 24 [release notes](https://www.oracle.com/java/technologies/javase/24-relnote-issues.html) and [Java YouTube](https://www.youtube.com/@java) channel for comprehensive information on all the new features.

:YouTube{id=ZsKJHGgahuA}

Speaking of JDK one of my favorite new features is Stream Gatherers. I put together a [video](https://youtu.be/hIbCu1slooE) and a [blog post](https://www.danvega.dev/blog/stream-gatherers) on this last week if you're interested in learning about them.

## Open AI's new native Image Generator

Did your social feeds suddenly explode with amazing, weird, and wonderful AI-generated images last week? Blame OpenAI! They just dropped their super-powered new GPT-4o image generation *directly inside ChatGPT*, and let's just say people have been having *a lot* of fun experimenting with all sorts of styles and ideas. The creativity online has been wild!

**So, What's This New Image Sorcery All About?**

This isn't just plugging into a separate DALL-E window anymore. Oh no, this is **native magic!** GPT-4o now has its *own* built-in pixel pixies working overtime right within your chat. Forget context switching – you can brainstorm wild ideas and *poof* conjure images right there! They're promising some seriously cool upgrades:

- **Mind-Blowing Quality:** Get ready for images so sharp and realistic they might fool your grandma.
- **Hands That Look... Like Hands?!** The AI is apparently getting better at drawing those tricky finger-noodles. Fewer nightmare Cthulhu hands, we hope!
- **Text That Doesn't Look Like Alien Scribbles:** Need words *in* your image? GPT-4o is flexing its improved text-rendering muscles. Spellcheck included? Maybe!
- **Your Weird Ideas Welcome:** It's supposedly much better at understanding complex, off-the-wall prompts. Go on, ask for a "cyberpunk squirrel riding a taco through a Van Gogh painting." See what happens!
- **All-in-One Creative Chaos:** Generate, tweak styles, change dimensions – all without leaving your ChatGPT conversation.

**Important Note:** Currently, this shiny new image-making superpower is available exclusively for paying ChatGPT subscribers. So if you're on the free tier, you'll have to enjoy the artistic explosion from the sidelines for a bit longer!

**My Own Adventures in AI Art Land!**

Naturally, I had to dive headfirst into this digital paint bucket! Below are a few wacky, weird, or wonderfully artistic things I managed to coax out of the AI. Don't judge my prompt skills too harshly – we're all mad scientists in this new lab!

:TweetEmbed{id=1904890856512925730}

And I was even able to take this a step further and animate one of the images I created and posted it on YouTube as a short.

:YouTube{id=Uz5vDHzn59s}

Who's watching the new Daredevil series?

:TweetEmbed{id=1905434515960725833}

**TWEETS**

If you haven't had a chance to check out Google Gemini Pro 2.5 it's time to give a spin!

:TweetEmbed{id=1905252626159010191}

## UNTIL NEXT WEEK
I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).
Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)