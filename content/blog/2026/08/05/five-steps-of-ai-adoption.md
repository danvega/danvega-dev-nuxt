---
title: "The 5 Steps of AI Adoption: Which One Are You On?"
slug: five-steps-of-ai-adoption
description: "Learn the 5 steps of AI adoption mapped out by Boris Cherny, creator of Claude Code, and how to move from copy-pasting code to supervised autonomy."
author: "Dan Vega"
tags:
  - AI
  - Spring Boot
  - Java
keywords:
  - steps of AI adoption
  - AI adoption for developers
  - Claude Code parallel agents
  - AI verification loop
  - supervised autonomy AI
  - Boris Cherny AI adoption
date: 2026-08-05T09:00:00.000Z
published: true
cover: five-steps-of-ai-adoption.png
video: https://www.youtube.com/embed/g12mC2J11d0
---


A lot of us feel overwhelmed by AI right now. We were handed this superpower, and every time we open social media, someone is running a fleet of agents while we are still copying and pasting code from a chat window into our IDE. That feeling has a name: social media driven development.

Here is the truth. You are not behind. You are on your own journey, and you are standing on a step. Boris Cherny, the creator of Claude Code, recently mapped out the steps he sees teams climb as they adopt AI. In this post, we will walk that ladder together using a real Spring Boot codebase so you can figure out which step you are on and what guardrail unlocks the next one.

::GitHubRepo{url="https://github.com/danvega/read-later"}
Follow along with the complete working example.
::

## Where the Steps Come From

![00 title](/images/blog/2026/08/05/00-title.png)

Boris shared these steps in a tweet where he wrote: "One person is 10xing their output with Claude, but the rest of the org hasn't caught up yet." You can read the full breakdown here: [The Steps of AI Adoption](https://x.com/bcherny/status/2077929390806073807).

The key insight is this. At each step, tokens are not enough to move you forward. You cannot just throw more AI at the problem and level up. To reach the next step, you need to find and break down the next bottleneck, then build the next guardrail. That common thread runs through everything below. Every step has something blocking you, and a guardrail you have not put in place yet.

The example project is a Spring Boot app called Read Later. It is a simple bookmarking application. If you are not a Java developer, do not worry. These steps apply to any language or framework. We are talking about workflow, not syntax.

## Step Zero: Gated

![01 gated](/images/blog/2026/08/05/01-gated.png)

At step zero, your entire AI toolbox is a chat window in a browser. There is no agent in the repo and no AI in your IDE. When you want help with a feature, you ask Claude AI, copy the code it gives you, and paste it into your IDE.

This is where many of us started. I used to copy entire classes into a chat window. I even wrote small apps to dump every relevant file in a project into a single markdown file so I could hand it to a chatbot and ask questions.

Here is a typical request at this step:

```
Please create a new endpoint to count the number of unread bookmarks.
```

You paste in your controller code, the AI writes something back, and you copy it into your project. If it needs a new service or repository method, that is more back and forth between the chat and the IDE.

The bottleneck here is you. You are the transport layer. Every line flows through your clipboard and your judgment. The AI can write code, but it cannot see your codebase, run your tests, or check its own work. There is no verification loop at all. If this is where you are, that is okay. Let's talk about moving up.

## Step One: Assisted

![02 assisted](/images/blog/2026/08/05/02-assisted.png)

Step one is where most of us live, and it is where I lived the longest. This is one engineer working with an agent as a very fast pair programmer. You use a tool like Claude Code, you plan features, and you review almost every change before it merges.

The important thing here is the verification loop, so let's walk through a real feature. We want to find bookmarks by tag. Here is the prompt sent to Claude Code in plan mode:

```
Add the ability to find bookmarks by tag. We might make a GET request to
/api/bookmarks?tag=java and it should return every bookmark tagged Java.
Follow the existing patterns in the bookmark package.
```

Plan mode is one of my favorite features. It lets you review the approach before any code gets written. The agent looked at the project, came up with a plan, and after I approved it, wrote the code. It added a new endpoint to the controller, a service method, and a repository query.

On the surface, this looked great. Then I ran a quick smoke test. I created two bookmarks, one tagged `java,spring` and one tagged `javascript,web`. When I searched for the `java` tag, both came back.

The problem was in the repository query:

```sql
SELECT * FROM bookmark WHERE tags LIKE '%java%'
```

That `LIKE` comparison matches `javascript` when you search for `java`. The code looked correct, but only manual verification caught the bug. And that is the real bottleneck. The agent took the typing away from me, but I am still the verification loop. There is only one of me.

### Moving the Verification Loop Into the Repo

To climb to step two, you need to get the verification loop out of your head and into the repo. Three pieces make this work in the finished code.

First, test against real infrastructure. The integration tests use Testcontainers to run against a real Postgres database, the same one used in production.

Second, write tests for the edge cases you actually hit. That `java` versus `javascript` bug becomes a test:

```
tag search matches whole tags only
```

Third, tell the model what "done" actually means. I define a clear standard in my `CLAUDE.md` file:

```
A change is done when `./mvnw verify` passes. Run it before you say
you're finished. If it fails, fix the failure. Never skip it, disable,
or weaken a test to get it to pass.
```

Here is a common misconception. An agent writing a test to verify its own work is not a real gate. The real gate is independent of the change it judges. Contract tests against real HTTP and real Postgres cannot be faked by mocks. A separate reviewer agent, not the one that wrote the code, checks the change. And CI/CD becomes an unbypassable floor that auto-accept cannot route around.

I did not hand-write every one of these tests. I asked an agent to, then reviewed them carefully. From now on, every new feature runs through those gates.

## Step Two: Parallel

![03 parallel](/images/blog/2026/08/05/03-parallel.png)

Here is a trap worth calling out. Running parallel agents does not automatically put you at step two. Parallel typing with your own eyeballs on every diff is just step one with a longer review queue. If I have ten agents going but weak gates, I am still the bottleneck.

Step two is parallel work with trust. Three things make it possible.

First, work tree isolation. Work trees keep agents from colliding with each other so merges stay clean, especially when they touch the same codebase.

Second, auto permissions. I do not want to approve every single edit. I want dangerous things blocked and everything else to just run.

Third, a first-pass reviewer that is not me. If I am manually smoke testing everything, the bottleneck is my attention. The question shifts from "are my eyes on every diff" to "how good are my gates."

My `CLAUDE.md` grew to support this. The definition of done now spawns a fresh sub-agent for review:

```
When `./mvnw verify` passes, have a fresh sub-agent do an adversarial
review of the change. Address what you find, then commit with a clear
message. No branch merges without an automated code review pass. The
reviewer is a separate agent that did not write this change.
```

I also added project conventions so the agents follow the rules without me repeating them:

```
- Everything bookmark related lives in the bookmark package.
- Tags are comma separated strings with no spaces.
- Every new endpoint gets coverage in BookmarkApiIntegrationTest
  against real Postgres.
- Never edit todo.md in a work tree. Check items off in the branch you
  integrate on, only after the change has landed there.
```

Alongside that, I keep a `todo.md` file as a simple backlog. In a real project this often lives as GitHub issues, but a plain markdown file is a fine place to start.

With those two files in place, I kicked off three features at once in Claude desktop, each in its own work tree with auto mode on:

```
Implement the archive feature from todo.md.
Implement the full-text search feature from todo.md.
Implement the export feature from todo.md.
```

Notice how short the prompts got. We have moved away from crafting the perfect prompt toward giving the agent good context and good gates. As the repo gets smarter, the prompts get dumber. The definition of done, the review gate, and the things not to touch all live in the repo now, not in my head.

## Step Three: Supervised Autonomy

![04 supervised autonomy](/images/blog/2026/08/05/04-supervised-autonomy.png)

Step three is not about the number of agents. You could run ten or a hundred agents and still be at step two if you are the one kicking off every process.

Supervised autonomy is about your absence. In steps one and two, work runs while you are there. In step three, work happens while you are not in the room. This is loops, routines, and scheduled tasks. You kick something off, then go to a meeting or lunch, and the work continues.

Here is the loop I ran against the remaining backlog, with auto mode on:

```
Work the next unchecked item in todo.md and check it off when it's
complete. One item per iteration. Stop when every item is checked.
```

All the gates from before are still in place. The automated reviewer still checks each task. I just removed myself from the loop. I gave it a list of tasks and walked away.

When it finished, the summary looked like this:

```
Backlog complete. Pagination, duplicate detection, and stats endpoints
all landed on step-three-autonomy. 30 tests are green. Each change
reviewed adversarially before commit. Restart anytime with `loop` if
new items get added to the backlog.
```

This run took about 26 minutes. Speed is not always the goal. Sometimes the outcome matters more than the clock. If I needed it faster, I could have kicked the tasks off in parallel work trees. The point of step three is autonomy, the ability to work through a list without your presence. Scale here is the absence of you, not the count of agents.

## Step Four: AI Native

![05 ai native](/images/blog/2026/08/05/05-ai-native.png)

I am going to be honest. I am not here, and neither are most teams. Step four deserves its own post once I have real experience with it.

The short version, in Boris's words, is that you steer by intent and monitor by exception. Most agents are kicked off by Claude, not by people. That is how you reach a thousand-plus agents with no human typing. Tools like the Claude Agent SDK let you build and schedule agents programmatically. The quarter-long migration becomes a workflow you kick off and check on occasionally.

Steps zero through three put agents into your workflow. Step four rebuilds the workflow out of agents.

## Which Step Are You On?

![06 closing](/images/blog/2026/08/05/06-closing.png)

Notice the pattern. Every jump between steps was blocked by something, and every jump was unlocked by a guardrail. Copy-paste gives way to an agent. Manual verification gives way to a real test suite against real infrastructure. Your eyes on every diff give way to an independent reviewer and CI. Kicking off each task gives way to a loop that runs without you.

A couple of caveats from Boris. Tokens are not enough. Each step is earned by a guardrail, not bought with more AI. And your location on this map tells you which guardrail to build next.

Most importantly, we are all on this journey and we are all at a step. There is no right or wrong answer. If your current workflow works well for you, that is great. But if you want to move up, you now know that the next step is not more agents. It is the next guardrail.

I had a lot of fun working through these steps, and I picked up a few things I am taking into my own workflow. Thanks to Boris Cherny for the thoughtful map. Give it a try on your own project and see where you land.

Happy Coding