---
title: "The Ralph Loop: Automate AI Coding Tasks in Java"
slug: ralph-loop
description: "The Ralph Loop is a bash script that runs your AI coding agent with a fresh context every iteration. Here's how it works and how I used it to build a Java CLI."
author: "Dan Vega"
tags:
  - AI
  - Java
keywords:
  - ralph loop
  - what is the ralph loop
  - ralph loop ai coding
  - ai coding agent loop
  - claude code ralph loop
  - ralph loop java
  - autonomous ai coding agent
  - ai agent context window
date: 2026-02-05T09:00:00.000Z
published: false
cover: ralph-loop.jpg
video: https://www.youtube.com/embed/CV97l0GkPHo
---

Want to let your AI coding assistant build an entire feature while you grab a coffee? That's the promise of the Ralph Loop, and the surprising part is how simple it is. It's a bash script. That's it.

The technique comes from [Geoffrey Huntley](https://ghuntley.com/ralph/), and at its core it's about three lines of shell. But the idea behind it solves a real problem that anyone who has run a long AI coding session has hit face-first: the context window.

In this post I'll explain what the Ralph Loop is, when you should reach for it, and how I used it to build a complete vending machine CLI application in Java.

## The Context Window Problem

Here's what happens when you ask an AI agent to build something big in one sitting.

The first task goes great. The second is fine. By the fifth or sixth, things start to drift. The agent forgets a decision it made twenty minutes ago, re-implements something that already exists, or quietly contradicts the spec. The longer the session runs, the worse the output gets.

This isn't the model being lazy. It's the context window filling up with the entire history of the session: every file it read, every dead end, every correction. The signal-to-noise ratio collapses. As Huntley puts it, "the more you use the context window, the worse the outcomes you'll get."

The obvious fix is to start fresh. But then the agent loses everything it knew.

Unless the state was never in the context window to begin with.

## Plan Mode vs Tasks vs the Ralph Loop

Before we go further, it's worth being clear about when this technique is the right tool, because it usually isn't.

- **Plan mode** — Best for short, well-understood work. You want to see the plan, approve it, and watch it happen. Most of my day looks like this.
- **Tasks** — Good when you have a handful of related changes and want the agent to work through them while you review as it goes.
- **The Ralph Loop** — For multi-task automation where you want real autonomy and you're willing to walk away. This is the "build the whole thing while I grab coffee" option.

If your task fits in one focused session, use plan mode. The Ralph Loop earns its keep when you have a list of tasks long enough that context degradation becomes the bottleneck.

## How the Ralph Loop Works

The trick is that the loop keeps **no state in memory at all**. Everything lives on disk:

1. A **PRD file** describes what you're building — the full spec, all the tasks.
2. A **progress file** records what's been done so far.
3. The **codebase itself** is the real source of truth.

Each iteration, the agent starts with a completely fresh context window. It reads the PRD, reads the progress file, looks at the code, picks the **next single unfinished task**, does it, commits, and writes down what it did.

Then the loop kills it and starts over. Clean slate. Same three files.

That's the whole idea. State survives in the file system, not the conversation. Every iteration gets a model at full strength instead of one drowning in its own history.

Yes, re-reading the spec every single iteration is wasteful. That waste is the point — you're trading tokens for fidelity.

## Creating the PRD File

The PRD is where all the thinking goes. It's the spec the agent re-reads every iteration, so it needs to be complete and unambiguous.

For the vending machine, mine covered the domain model, the CLI commands, coin handling and change-making, inventory, and a task list broken into small, independently completable chunks.

The task breakdown matters more than anything else here. The single most important rule of the Ralph Loop is:

> **One task per iteration. Only one.**

If an iteration tries to do three things, you get the same context degradation you were trying to escape — just in miniature. Small, atomic tasks are what make this work.

## The Ralph Bash Script

Huntley's original is about as minimal as it gets:

```bash
while :; do cat PROMPT.md | claude-code ; done
```

That's genuinely it. A loop that pipes a prompt file into an agent, forever.

The version I used adds a couple of quality-of-life touches — an exit condition, and a little logging so you can see what happened while you were away:

```bash
#!/bin/bash
# ralph.sh - run one task per iteration until the PRD is complete

ITERATION=0

while true; do
  ITERATION=$((ITERATION + 1))
  echo "🔁 Iteration $ITERATION - $(date '+%H:%M:%S')"

  cat PROMPT.md | claude -p

  if grep -q "ALL TASKS COMPLETE" progress.txt; then
    echo "✅ PRD complete after $ITERATION iterations."
    break
  fi
done
```

The loop itself is dumb on purpose. All the intelligence is in `PROMPT.md`, which tells the agent how to behave on every pass:

```markdown
Read PRD.md for the full specification.
Read progress.txt to see what has already been completed.

Pick the NEXT single unfinished task. Only one.

Implement it, write tests for it, and make sure the build passes.
Then commit your work with a clear message describing just that task.

Append what you completed to progress.txt.
If every task in the PRD is finished, write "ALL TASKS COMPLETE" to progress.txt.

Don't assume something isn't implemented — check the codebase first.
```

That last line matters more than it looks. A known failure mode is the agent searching badly, concluding a feature doesn't exist, and cheerfully building it a second time.

## Running the Loop

Kick it off and walk away:

```bash
chmod +x ralph.sh
./ralph.sh
```

What you'll see is the agent working through your PRD one task at a time — implementing, testing, committing, logging — then starting over fresh. Over and over until the list is done.

The **atomic commits per task** are the detail I'd push hardest on. Because each iteration commits exactly one task, your git history becomes a readable log of what the AI did. If iteration 7 made a mess, you revert iteration 7. You're not untangling one giant commit that touched forty files.

## Reviewing the Generated Code

This is the part people skip, and shouldn't.

Walking away doesn't mean not reading the result. Go through the commits one at a time — that's exactly why we made them atomic. Run the tests yourself. Look for the classic failure: **placeholder implementations**. Models will happily stub something out with a TODO and mark the task done, even when you tell them not to. It usually takes another loop or two to catch and replace those.

The Ralph Loop gets you a working first draft with real momentum. It does not get you code you can merge unread.

## A Single-Iteration Variation

You don't always want an infinite loop. A useful variation is running exactly one iteration at a time:

```bash
cat PROMPT.md | claude -p
```

Same mechanics — fresh context, reads the PRD, does one task, commits — but you're in control of when the next one starts. This is a nice middle ground when you want the Ralph structure but you'd rather review each task before moving on.

## When to Use the Ralph Loop

Reach for it when:

- You have a **long list of small, well-specified tasks**
- The spec is solid enough that the agent won't need you mid-flight
- You genuinely want to walk away
- The work is greenfield enough that mistakes are cheap to throw out

Skip it when:

- The task is short — just use plan mode
- The requirements are fuzzy (a vague PRD produces a confidently wrong codebase, repeatedly)
- You're working in a critical part of a production system

## Wrapping Up

The Ralph Loop is a great reminder that not every AI technique needs a framework. This is a `while` loop and three files, and it works because it takes the context window problem seriously instead of pretending it doesn't exist.

Write a real spec, break it into small tasks, keep state on disk, commit atomically, and read the diff. The bash part is the easy bit.

If you want to see this built end to end — including the vending machine app and the loop running live — check out the video above. And go read [Geoffrey Huntley's original post](https://ghuntley.com/ralph/) and his [follow-up on loops](https://ghuntley.com/loop/); he's the one who figured this out.

Happy Coding!<br/>
Dan
