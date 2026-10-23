---
title: "Stop Letting AI Build Horizontally"
slug: stop-letting-ai-build-horizontally
description: "AI can scaffold every layer of your app in seconds, and none of it has run together. Use tracer bullets to build thin vertical slices you can verify instead."
author: "Dan Vega"
tags:
  - AI
  - ByteSized AI
date: 2026-03-18T09:00:00.000Z
published: true
---

There's a pattern I see constantly with developers who are new to AI-assisted coding, and it goes something like this:

They open Claude, Cursor, or GitHub Copilot, describe their app, and ask it to scaffold everything. The AI obliges. In under two minutes they have entities, services, repositories, controllers, tests, and a README. It looks complete. It might even compile.

And then they're stuck.

Not because the code is bad, but because they have 10,000 lines of code that have never actually run together. They have no idea where to start when something goes wrong. Integration problems hit all at once. The "working app" is an illusion.

This is what's called horizontal generation at machine speed, and it's worse than building horizontally by hand. At least hand-written code you understand.

## The Tracer Bullet

A tracer bullet is the thinnest possible slice of functionality that touches every layer of your architecture. Not the full feature. Not the polished version. The bare minimum that proves the system actually works end to end.

The term comes from The Pragmatic Programmer. Tracer bullets in warfare glow so you can see where they land. In code, the idea is the same: fire a thin shot through the entire system, see where it hits, and adjust before firing the rest.

A `GET /todos` endpoint that fetches a list from a repository backed by a database. No business logic, just a connected stack. But when it runs, you know your controller is wired, your service layer works, and your database connection is solid. That's a foundation you can build on.

## Why This Matters More with AI

Without AI, horizontal development is slow enough that you usually catch the problems. You write the entities, realize you need to connect them to something, and naturally start thinking vertically.

AI removes that. It can generate an entire horizontal layer in seconds. And because the code looks right, you keep going, adding more layers on top of an unverified foundation.

The fix isn't to use less AI. It's to prompt differently, and to plan differently.

**If you're building something with a full plan, write your user stories around vertical slices, not layers.** Instead of "create all the database models" as a task, write "as a user, I can create a todo and see it in my list." That story forces a tracer bullet. It touches the controller, service, repository, and database in one shot, and it isn't done until it runs.

This matters especially if you're using a long-running agentic loop, like Claude Code working through a task list. If your tasks are organized by layer, the agent will build horizontally, just like you would have. You'll end up with a complete data layer, a complete service layer, and nothing actually connected or verified until the very end. Structure your tasks as user stories and the agent works vertically by default, completing one thin slice before moving to the next.

Instead of prompting: _"Generate all the JPA entities for my app"_

Try: _"Help me build a working end-to-end feature: a POST /users endpoint that accepts a name and email, saves it to an H2 database, and returns the saved entity. Controller, service, repository, and entity in one pass."_

You get something runnable right away. Then you iterate.

You can even be direct about it: _"Don't give me the full implementation. Give me the thinnest possible working slice that proves this architecture holds. We'll build out from there."_

## Execution Is the Discipline

This is where agentic tools like Claude Code (or similar ones) have a real edge over chat-based AI.

In a chat window, the AI generates code and never faces consequences. It can produce 500 lines of code with no way to verify any of it works.

Claude Code has to run the code. If the tracer bullet fails, it knows immediately and has to fix it. The execution environment is the discipline.

Chat AI generates horizontally by default. Agentic AI with execution is pushed toward thinking vertically, because the code has to actually work before you move on.

## The Workflow

Here's what this looks like in practice:

1. Define the thinnest feature that touches every layer of your system
2. Prompt AI to build that slice end to end
3. Run it. Does it actually work?
4. Commit it as your known-good baseline
5. Now use AI to build out from there

That commit in step 4 matters more than it sounds. It's your rollback point. Everything you build after it stands on verified ground. If an AI-generated feature goes sideways later, you know exactly where to return.

## The Contrast Worth Naming

A while back I wrote about [vibe coding and why "build it and they will come" is a trap](/blog/vibe-coding-field-of-dreams-problem). Tracer bullets are the disciplined alternative. Not slower, just more intentional about what you verify before you move on.

Most developers know they shouldn't vibe code. What they need is a concrete methodology to replace it. Tracer bullets give you that: a checkpoint you trust, a foundation that's real, and a workflow where AI helps you build something you understand.

That's the goal. Not less AI. Smarter AI.

_This post first appeared in my ByteSized AI newsletter._
