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
github: https://github.com/danvega/ralph-vending-machine
---

Want to let your AI coding assistant build an entire feature while you grab a coffee? That's the promise of the Ralph Loop, and the surprising part is how simple it is. It's a bash script. That's it.

The technique comes from [Geoffrey Huntley](https://ghuntley.com/ralph/), and at its core it's a loop that runs your agent over and over, each time with a completely fresh context window. That one idea solves a real problem anyone who has run a long AI coding session has hit face-first.

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

If your task fits in one focused session, use plan mode. The Ralph Loop earns its keep when your task list is long enough that context degradation becomes the bottleneck.

## How the Ralph Loop Works

The trick is that the loop keeps **no state in memory at all**. Everything lives on disk in three files:

1. **`CLAUDE.md`** — how to work in this project. Build commands, testing stack, conventions.
2. **`PRD.md`** — what you're building. A checklist of tasks.
3. **`progress.txt`** — what's been done, and any notes for the next iteration.

Each iteration, the agent starts with a completely fresh context window. It reads those three files, picks the **highest-priority incomplete task**, implements it, tests it, commits it, ticks the box in the PRD, and appends to the progress log.

Then the process exits and the loop starts a new one. Clean slate. Same three files.

That's the whole idea. State survives in the file system, not the conversation. Every iteration gets a model at full strength instead of one drowning in its own history.

Yes, re-reading everything every single iteration is wasteful. That waste is the point — you're trading tokens for fidelity.

## Creating the PRD File

The PRD is where all the thinking goes. It's the spec the agent re-reads every iteration, so it needs to be complete and unambiguous. Mine is just a markdown checklist:

```markdown
# Product Requirements

## Project
Vending Machine Console Application - Java 25

## Tasks
- [ ] Create Product enum with displayName and price fields (Cola, Diet Cola, Water, ...)
- [ ] Create Slot class with Product reference, quantity tracking, isInStock() and decrementQuantity()
- [ ] Create PurchaseResult sealed interface with Success, InsufficientFunds, and OutOfStock records
- [ ] Create MenuOption enum with number and description fields and fromNumber() static lookup
- [ ] Create VendingMachine class with balance management (insertMoney, getBalance, collectChange)
- [ ] Add inventory loading and getSlots() with defensive copy to VendingMachine
- [ ] Add purchase() method to VendingMachine returning PurchaseResult with stock and balance checks
- [ ] Create Application class with main(), Scanner setup, welcome banner, and main menu loop
- [ ] Add viewProducts handler with formatted table
- [ ] Add insertMoney and checkBalance handlers with input validation
- [ ] Add purchase handler with pattern matching switch on PurchaseResult
- [ ] Add getChange handler and exit flow with Scanner cleanup
- [ ] Verify full application flow end-to-end
```

Notice those checkboxes. The PRD isn't just a spec — it's **state**. The agent ticks `[ ]` to `[x]` as it goes, so the next fresh iteration can see at a glance what's left.

The task breakdown matters more than anything else here. The single most important rule of the Ralph Loop is:

> **One task per iteration. Only one.**

Every task in that list is small enough to implement, test, and commit on its own. That's what makes this work.

## Don't Skip CLAUDE.md

The PRD says *what* to build. `CLAUDE.md` says *how to work here* — and it's doing a lot of quiet lifting:

```markdown
## Build Commands
./mvnw compile -q          # Compile
./mvnw test -q             # Run all tests

## Testing
### Stack
- JUnit 6
- AssertJ for assertions
- Mockito for mocking (when needed)

### Conventions
- Test class naming: {ClassName}Test.java
- Test method naming: methodName_scenario_expectedResult
- Use @DisplayName for readable test names
```

Without this, every iteration would re-derive how to build and test the project — and probably derive it differently each time. This is the file that keeps thirteen independent iterations producing one coherent codebase.

## The Ralph Bash Script

Huntley's original is about as minimal as it gets:

```bash
while :; do cat PROMPT.md | claude-code ; done
```

Mine is a little more careful. The big difference: **it takes a number of iterations** rather than running forever.

```bash
#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i=1; i<=$1; i++)); do
  echo ""
  echo "****************************************"
  echo "Iteration $i of $1"
  echo "****************************************"

  result=$(claude --dangerously-skip-permissions -p "@CLAUDE.md @PRD.md @progress.txt \
1. Read progress.txt to see what has been completed. \
2. Find the highest-priority incomplete task from PRD.md. \
3. Implement that single task. \
4. Write unit tests for any code with logic. \
5. Verify: ./mvnw compile -q && ./mvnw test -q \
6. If tests pass, git add and commit with a conventional commit message (feat:, fix:, test:, refactor:). \
7. Mark the task complete in PRD.md (change [ ] to [x]). \
8. Append your progress to progress.txt with what you completed. \
9. If ALL tasks in PRD.md are complete, output <promise>COMPLETE</promise>. \
ONLY WORK ON ONE TASK PER ITERATION.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "✅ PRD complete after $i iterations!"
    exit 0
  fi
done

echo ""
echo "⚠️ Reached $1 iterations. PRD may not be complete."
```

A few things worth pointing out:

**The bounded loop.** `for ((i=1; i<=$1; i++))` instead of `while true`. An infinite loop with `--dangerously-skip-permissions` and a credit card attached is a bad combination. Giving it a budget means the worst case is a bounded amount of damage.

**Step 5 is the quality gate.** `./mvnw compile -q && ./mvnw test -q` runs *before* the commit. The agent doesn't get to claim a task is done because it feels done — the build has to pass.

**The promise sentinel.** The agent outputs `<promise>COMPLETE</promise>` when the PRD is finished, and the script watches stdout for it. That's how the loop knows to stop early instead of burning its remaining iterations.

**The `@` references.** `@CLAUDE.md @PRD.md @progress.txt` pulls those three files into a fresh context every time. That single line is the whole state-restoration mechanism.

## Running the Loop

Give it a budget and walk away:

```bash
chmod +x ralph.sh
./ralph.sh 15
```

What you'll see is the agent working the PRD one task at a time — implement, test, commit, tick the box, log — then starting over fresh. My vending machine has thirteen tasks, so fifteen iterations gives it a little headroom.

The **atomic commits per task** are the detail I'd push hardest on. Because each iteration commits exactly one task with a conventional commit message, your git history becomes a readable log of what the AI did. If iteration 7 made a mess, you revert iteration 7. You're not untangling one giant commit that touched forty files.

## Reviewing the Generated Code

This is the part people skip, and shouldn't.

Walking away doesn't mean not reading the result. Go through the commits one at a time — that's exactly why we made them atomic. Run the tests yourself. Look for the classic failure: **placeholder implementations**. Models will happily stub something out with a TODO and mark the task done, even when you tell them not to. It usually takes another loop or two to catch and replace those.

The Ralph Loop gets you a working first draft with real momentum. It does not get you code you can merge unread.

## A Single-Iteration Variation

You don't always want to hand over fifteen iterations at once. `ralph-once.sh` runs exactly one:

```bash
#!/bin/bash
set -e

claude --permission-mode acceptEdits -p "@CLAUDE.md @PRD.md @progress.txt \
1. Find the highest-priority incomplete task and work only on that task. \
   Use your judgment on priority - not necessarily the first in the list. \
2. Implement the task and write tests if the code has logic. \
3. Verify: ./mvnw compile -q && ./mvnw test -q \
4. Mark the task complete in PRD.md (change [ ] to [x]). \
5. Append your progress to progress.txt with what you completed and any notes for the next iteration. \
6. Make a git commit with a descriptive message. \
ONLY WORK ON A SINGLE TASK. \
If the PRD is complete, output <promise>COMPLETE</promise>."
```

Same mechanics — fresh context, three files, one task, commit — but you decide when the next one starts. Note it uses `--permission-mode acceptEdits` rather than `--dangerously-skip-permissions`, which is a reasonable trade when you're sitting there watching anyway.

This is a nice middle ground: the Ralph structure, but you review each task before moving on.

## When to Use the Ralph Loop

Reach for it when:

- You have a **long list of small, well-specified tasks**
- Your spec is solid enough that the agent won't need you mid-flight
- You have a **verification command** that can gate each commit
- You genuinely want to walk away
- The work is greenfield enough that mistakes are cheap to throw out

Skip it when:

- The task is short — just use plan mode
- The requirements are fuzzy (a vague PRD produces a confidently wrong codebase, repeatedly)
- You're working in a critical part of a production system

## Wrapping Up

The Ralph Loop is a great reminder that not every AI technique needs a framework. This is a `for` loop and three files, and it works because it takes the context window problem seriously instead of pretending it doesn't exist.

Write a real spec, break it into small tasks, tell the agent how to build and test, keep state on disk, gate every commit on a passing build, and read the diff. The bash part is the easy bit.

If you want to see this built end to end, check out the video above — and the [full source is on GitHub](https://github.com/danvega/ralph-vending-machine). Go read [Geoffrey Huntley's original post](https://ghuntley.com/ralph/) and his [follow-up on loops](https://ghuntley.com/loop/); he's the one who figured this out.

Happy Coding!<br/>
Dan
