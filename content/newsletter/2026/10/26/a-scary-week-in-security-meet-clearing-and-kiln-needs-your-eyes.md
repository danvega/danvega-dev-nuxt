---
title: "A Scary Week in Security, Meet Clearing, and Kiln Needs Your Eyes"
slug: "a-scary-week-in-security-meet-clearing-and-kiln-needs-your-eyes"
date: "2026-10-26"
description: "A roundup of last week's security mess and why patching fast matters more with AI, plus Clearing, my new Mac planner, and Kiln."
tags: ["Security", "Java", "AI", "Clearing", "IntelliJ IDEA"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. Last week was one of the scariest weeks in security I can remember. So I'm starting with a roundup of what happened and why it matters more now that AI is in the picture. Then I want to tell you about Clearing, the Mac app I've been building for myself. It just got a website. After that, I'll ask for your help with Kiln, share today's Spring Office Hours, and look ahead to three conferences in November. Let's get into it.

## A Scary Week in Security

If you blinked last week, you missed a lot. Here are the highlights.

- **Java:** Oracle shipped an emergency Java update ([CVE-2026-91403](https://blogs.oracle.com/security/security-alert-cve-2026-91403-released), CVSS 9.1). It stops trusting eight eMudhra certificate authority certificates whose [private keys were exposed](https://lwn.net/Articles/1101643/). Java 8, 11, 17, 21, 25 and 27 are affected, and so is GraalVM. Oracle's October patch also fixed more than 1,200 flaws, six of them rated 10.0.
- **LiteLLM:** Version 1.107.0 [shipped a credential stealer](https://docs.litellm.ai/blog/security-incident-oct-21-2026) on PyPI and Docker. It ran at Python startup, so having it installed was enough. It went after cloud and AI keys. The safe version is 1.106.2.
- **PHP:** Two critical remote code execution flaws, called [PHP2Shell](https://bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws), were patched. AI tools found them. The details leaked before the fix, and attacks started right away. It got so bad that the [NSA, FBI and CISA told companies](https://www.defenseone.com/threats/2026/10/critical-flaws-php-warning/416727) to patch now, or take their sites offline. Some websites around the world went dark while they updated.
- **GitLab:** A [CVSS 10.0 flaw](https://securityonline.info/gitlab-critical-patch-release-cve-2026-110264/) let an attacker run code on a server without logging in. Servers patched earlier in October still needed this fix.
- **Railway:** This one hit me directly. An attacker was inside Railway from October 20 to 22, looking for AI API keys. About 1.85% of workspaces may have had environment variables exposed. Railway [asked everyone to rotate their secrets](https://techcrunch.com/2026/10/22/developer-platform-railway-urges-all-users-to-revoke-secret-keys-after-cyberattack/), so I spent a little time last week rotating every key I had stored there. Railway's [preliminary report](https://blog.railway.com/p/preliminary-report-october-security-incident) is worth a read.
- **OpenCode:** A malicious MCP server could [run code on Windows during sign-in](https://www.infosecurity-magazine.com/news/opencode-quietly-patched-critical/). It was fixed quietly, with no CVE, so most scanners won't flag it.
- **And more:** Node.js fixed a remote code execution bug in Brotli. BeyondTrust and Ivanti flaws were exploited before patches were out.

### Why This Matters More in the Age of AI

Theo did a great breakdown of the week called [Even The NSA Got Involved](https://www.youtube.com/watch?v=USeyDcWyVCc). One point stuck with me. AI found the PHP bugs. AI can now read every commit, spot the security fix, and build an exploit fast.

This isn't just theory anymore. Earlier this month, an attacker used an open-source AI hacking tool and [AI agents to break into several South Korean banks](https://www.bleepingcomputer.com/news/security/hacker-used-artex-ai-and-claude-agents-to-target-south-korean-banks/). They took customer data from at least five banks. One person with a set of AI agents did what used to take a team.

That changes the math. The gap between a patch shipping and you installing it used to be days or weeks of quiet. Now that gap is where attackers live.

There's a second shift too. API keys for AI models are worth real money now. People who had keys stolen saw $400 to $3,000 in charges within minutes. Any service that stores your API keys is a target.

I learned this one the hard way last week. Rotating every key is tedious, but it's a lot cheaper than a surprise bill.

So here's my short list for this week:

1. Update your JDK and rebuild your container images.
2. Pin your dependencies, and know what's in your build.
3. Rotate any secrets you've stored in a platform you don't control.
4. Review the MCP servers you've connected to your tools. Only use ones you trust.

### Know Where Your Code Comes From

This is exactly why I made a video a few weeks back on TrueSource by Broadcom. If you run open source in production, the question isn't if a CVE will hit your stack. It's how fast you can get a fix you trust.

TrueSource gives you verified builds and security patches. Spring Enterprise covers Spring and its managed dependencies, with patches, support, and Application Advisor. Trusted Artifacts covers verified Java, Python, and npm libraries. After a week like this one, it's worth another look.

:YouTube{id=fEQxKVE-YM0}

## Meet Clearing

For years I stitched together a task app, a calendar, a notes app and a weekly review doc. Things still slipped through the cracks. And my head never felt quiet.

I needed one place where I could see everything that needs me. So I built it. It's called Clearing, a calm day planner for the Mac. I named it for what it does: clearing the nagging thoughts from my head.

![Clearing's What needs me screen on a Monday morning: one task to start with, today's list, and the day's meetings beside it.](/images/newsletter/2026/10/26/clearing-what-needs-me.jpg)

*What needs me: one place to start the day. (All the data in these screenshots is made up.)*

### More Than a To-Do List

A to-do list tells you what. Clearing tells you when.

First, you get everything out of your head. Then each thing gets a time, around the meetings already on your calendar. A morning plan starts the day. A shutdown ends it. A weekly review closes out the week, and your goals connect the week to the year.

![Clearing's Week view: project bars across the days, with meetings and blocks of time for tasks.](/images/newsletter/2026/10/26/clearing-week-view.jpg)

*The Week view: tasks get real time between your meetings.*

You can capture things however works for you. Type them in plain words. Or use Ramble. Talk out loud about everything on your mind, and Clearing turns it into tasks, each with a day and a list. It runs on your Mac with Apple Intelligence.

![Ramble's review: a short summary of what was said, and the tasks it found.](/images/newsletter/2026/10/26/clearing-ramble.jpg)

*Ramble: say it messy, get tidy tasks back.*

There's an AI connection too, if you want it. Your assistant can suggest tasks, like something it spotted in your email. But it only suggests. You decide what goes on your plan.

### The Inspiration

I love building things that work exactly the way my brain works. Clearing borrows from a few people whose ideas I've used for years, without following any of them to the letter.

- **David Allen, Getting Things Done:** get everything out of your head into one trusted inbox, then review it every week.
- **Cal Newport, Deep Work:** protected time for focused work, and a shutdown that ends the day.
- **Oliver Burkeman, Four Thousand Weeks:** your time is limited, so choose what matters and let the rest slide.
- **Ali Abdaal, Feel-Good Productivity:** notice what gives you energy, and make a hard start smaller.

The look comes from calm apps I love, like Things, Fantastical and Structured. I wanted software that quiets my head instead of adding to the noise.

### Pay Once, Keep Your Data

Clearing has no account and no servers. Your plans stay on your Mac. It saves a backup every day as a plain file you can keep. And it's $29.99, once. No subscription.

### When Can You Get It?

Clearing is in App Store review right now, so it isn't available just yet. But it's close. Take a look at the website, and I'll let you know the day it's out.

[Visit clearingplanner.com](https://clearingplanner.com)

This is another thing I could not have built on my own before AI. I'm a Java developer, and this is a native Mac app. What a time it is to be a builder.

## Kiln: I Still Need Your Feedback

Last week I shared Kiln, a warm IntelliJ theme inspired by Claude Code. It comes in dark and light, with charcoal and cream surfaces and a clay orange accent.

![Kiln's light theme in IntelliJ IDEA, with a Spring Boot controller open.](/images/newsletter/2026/10/26/kiln-light-theme.jpg)

*Kiln Light. The warm colors are easy on the eyes.*

Thank you to everyone who tried it. One of you reported that the alternating row color in the Data Editor was hard to read, and that's already fixed. I want a few more eyes on it before I publish it to the JetBrains Marketplace.

Here's what would help most. Try it with the languages and tools you use every day. If something looks off or is hard to read, open an issue with a screenshot. Or just hit reply and tell me what you think.

[Kiln Theme on GitHub](https://github.com/danvega/kiln-theme)

## In Case You Missed It

On Thursday I sent a deep dive called [Don't Let AI Write All Your Code](/newsletter/dont-let-ai-write-all-your-code). If it slipped past you, it's a good one to read with your coffee.

## Spring Office Hours

### Live Today: [S5E27 - Hugging Face for Java Developers with Pratik Patel](https://www.youtube.com/watch?v=7eQ3eXEI-co)

DaShaun and I are joined today by Java Champion Pratik Patel. Hugging Face hosts over a million open models, but most Java developers have never used one. We'll talk about what Hugging Face actually is and how to find a model worth using. Then we'll cover the ways you can run open models from Java today, and when an open model beats a paid API.

Bring your questions. We'll answer them live.

:YouTube{id=7eQ3eXEI-co}

### Last Episode: [S5E26 - dev2Next, Native JSON and a Week of New Models](https://www.youtube.com/watch?v=Oa3w-NkHfZg)

We recapped dev2next, showed off Kiln and my JSON API demos, and dug into a busy week of model releases. If you missed it live, you can catch the replay.

:YouTube{id=Oa3w-NkHfZg}

## Upcoming Speaking Engagements

November is going to be busy.

- **November 10:** Nate Schutta and I give the keynote at [Porto Tech Hub](https://portotechhub.com/conference-2026/) in Portugal. Fundamentals of Software Engineering in the Age of AI.
- **November 12:** I'll be at [J-Fall](https://jfall.nl) in the Netherlands with Spring Cleaning: What Boot 4 Lets You Delete.
- **November 19:** Two sessions at QCon San Francisco: [The Fundamentals of Software Engineering in the Age of AI](https://qconsf.com/training/nov2026/fundamentals-software-engineering-age-ai) and [AI for Java Developers](https://qconsf.com/training/nov2026/ai-java-developers).

If you're going to be at any of these, come say hi!

## Around the Web

### AI Gone Wild on Netflix

I watched [AI Gone Wild](https://www.netflix.com/watch/82772145), the new documentary on Netflix. It was good, and worth a watch. I do think parts of it are a little overblown, made to scare people more than inform them. Watch it with that in mind. Then hit reply and tell me what you thought.

## Until Next Week

That's it for this week. Take ten minutes today and update your JDK. Then hit reply and tell me what you think of Kiln, or Clearing.

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
