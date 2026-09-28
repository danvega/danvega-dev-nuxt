---
title: "Spec-Driven Development for Solo Developers: My Plan"
slug: spec-driven-development-solo-developers
description: "Spec-driven development without the team process. The lightweight plan I use as a solo developer, from one PRODUCT.md to a retro, on a Spring Boot Stripe store."
author: "Dan Vega"
tags:
  - Spring Boot
  - AI
  - Java
keywords:
  - spec driven development
  - spec driven development for solo developers
  - claude code skills
  - agent skills workflow
  - PRODUCT.md spec
  - spring boot stripe checkout
  - github spec kit alternative
date: 2026-09-23T09:00:00.000Z
published: true
cover: spec-driven-development-solo-developers.png
video: https://www.youtube.com/embed/bHJZiM2XM-w
---


You can't one-shot an app with an AI coding agent. It's fun for a quick prototype. But if you want something that holds up in production, you need a plan. The usual answer is **spec driven development**, and the popular frameworks for it are built for teams. For one person, they bring a lot of process that gets in the way of building.

There is a middle ground. I sat down and wrote out what I already do when I build something. Then I turned it into a handful of skills and used them to build a Spring Boot store with Stripe checkout. This post walks through that plan: a one-page `PRODUCT.md`, feature specs that name the command that proves them, and a retro that improves the process after every build.

::GitHubRepo{url="https://github.com/danvega/skills"}
Browse the shipit skills for ideas. The Spring Store itself is a private repo, so the examples below come from its files on disk.
::

## Why Spec-Driven Development Feels Like Too Much for One Person

Think of it as a spectrum. On one end is vibe coding. You type "build me the entire app, make it production ready, make it secure" and hope for the best. There's a place for that. When I only want to see if something works, vibe coding is fine.

On the other end is spec-driven development. Tools like GitHub Spec Kit, Kiro, OpenSpec, and BMAD-METHOD all ask you to write the spec before the code. I tried a couple of them, mainly Spec Kit and OpenSpec. They're good. If I were on a large team shipping features every day with coding agents, I'd reach for something like Spec Kit.

But I'm a solo developer starting new apps. For that, the process felt like too much. There were a lot of documents and a lot of steps between having an idea and seeing it run.

I put it this way once: you may not need spec-driven development, but you do need some form of it. You need a plan going in. The question is what that plan looks like for one person.

## The Demo: A Spring Boot Store With Stripe Checkout

Before building the bigger project I have in mind, I wanted to test two things. Would my skills work? And would a small store on my preferred stack work with Stripe?

So I built the Spring Store. It's a fictitious 99-cent sticker shop. You browse stickers, add a few to a cart, and check out on Stripe's hosted checkout page. After you pay, you land on a confirmation page while the app records the order.

The stack is Java 26, Spring Boot 4.0.8, Spring Data JDBC, Flyway for migrations, JTE (Java Template Engine) for server-rendered templates, Tailwind, and Postgres through Docker Compose. Tests run against Testcontainers. There's no client-side JavaScript at all.

The interesting part isn't the cart. It's what happens after the customer pays. Does the Stripe webhook reach the app? Can the app trust it? Does a replayed event count the order twice? Does the amount Stripe charged match what the server calculated? Those questions are where one-shot prompting falls apart, which is why this was a good first project.

## Three Actions Instead of Seven Stages

![ShipIt Skills](/images/blog/2026/09/23/fig3-stages-light.png)

My skills are called **shipit**. There are seven of them, but the process really comes down to three actions:

1. **Decide enough to start**
2. **Build something you can verify**
3. **Review and update**

One file holds the state. Every skill reads it first. The guiding rule in the README is one I like a lot: "Prefer removing unnecessary work to adding rules."

The skills also run in one of three modes: demo, small project, or product. A demo doesn't need the same care as a product, and the skills scale down to match.

### Shape: Find the Smallest Useful Version

Everything starts with `shipit-shape`. I use dictation a lot, so I talk through a rough idea. For the store, I said something like: a fictitious store with stickers, add them to a cart, check out with Stripe, and this becomes the base for something bigger later.

The skill pushes back. It asks only the questions that would change the plan, then narrows the scope. This is the part I need most. Left alone, I'd happily scope a Twitter clone.

Each skill starts with frontmatter that has a name and a description. The shape skill's description reads like this:

```markdown
---
name: shipit-shape
description: Evaluate a project idea and find the smallest useful version.
  Use when Dan brings an unclear idea, asks whether it's worth building,
  or needs help narrowing scope.
---
```

The body includes instructions like "Restate the idea briefly and neutrally" and "Use what Dan already told you. Do not make him repeat settled choices." That second line came from iteration. I got tired of repeating myself in sessions, so it went into the skill.

### MVP: One PRODUCT.md File

The `shipit-mvp` skill writes a short `PRODUCT.md`. This is the closest thing to a spec in my process, and it's one file instead of a folder of them. The store's version opens with a line that sets expectations right away: it's "a proof of concept for Dan, not a product."

Here's what's in it:

- **What it proves** and eight MVP goals, each with a "Done when"
- **Non-goals**, split into "not ever" and "not yet"
- **Decisions**, each with its reason and a "revisit when"
- **Stops**, meaning when the agent should halt and wait for me
- **Current state**: works today, in progress, next

The eight goals read like plain promises. Buy a sticker and the app knows. The confirmation page never claims "paid" before the app records it. Only genuine Stripe events are accepted. A replay doesn't double-count. Secrets never land in the repo, and a fresh clone fails loudly. The amount is computed server-side, so tampering is ignored. The recorded payment is checked against Stripe's `amount_total`.

The decisions section is my favorite part. Every choice carries its reason. For example, the store runs Spring Boot 4.0.8 instead of 4.1.1 because Initializr wouldn't generate JTE against 4.1.1. Tailwind comes from the play CDN, with a note to "revisit the moment this gets deployed or filmed." Six months from now I won't remember why. The file will.

### Stack and Prototype: Only When They Matter

Two skills are optional. `shipit-stack` only runs when there's a real technical choice to make. I use a similar stack most of the time, but it changes by project. Nothing annoys me more than an agent assuming Spring Data JPA and Thymeleaf when I wanted Spring Data JDBC and JTE. So the stack skill asks: What's the front end? How should the database run? Do you want migrations? Then it records why each choice fits.

`shipit-prototype` only runs when a screen is uncertain. For the store, I wanted to see the home page and the cart before building them. There were three rounds. Rounds one and two were PNG mockups covering states like empty cart, cancelled, and "still waiting" for payment confirmation. Round three was HTML for the cart screens.

Round one locked in a neo-brutalist look, so later rounds didn't reopen that question. Once the agent had the general style, it could create screens I hadn't thought of yet.

## Feature Specs That Name Their Proof Command

With a plan in place, `shipit-feature` builds one feature at a time. It reads `PRODUCT.md` and the open items, builds within scope, verifies, presents a batch of changes for me to review, and updates the state. Since each feature is scoped, I can also run features in parallel with Git worktrees.

All of this lives in a `.shipit/` folder in the project. I want a record of how the project was built, but I don't want it mixed into my main source.

```text
spring-store/
├── PRODUCT.md
├── verify
└── .shipit/
    ├── specs/done/        # 001 through 007, one spec per feature
    ├── prototype/         # three design rounds
    ├── verify/evidence/   # proof for anything a command can't prove
    ├── retro/findings.md  # the retro ledger
    └── open.md            # known limits and risks
```

Each spec has a **Surface** list of the files it touches and an **Out of scope for this feature** list. The key detail is in the acceptance criteria. Every criterion names the command that proves it.

That command runs through `verify`, a small shell script at the repo root. It fronts the test suite by feature name:

```bash
./verify cart            # cart behavior
./verify cart-checkout   # cart through Stripe session creation
./verify secrets         # no Stripe key material is tracked in Git
./verify all             # the full suite
```

This matters because "done" stops being a feeling. When the agent says a feature works, I can run the named command and see. Today `PRODUCT.md` lists all eight goals as working, with 57 tests behind `./verify all`, all green.

### When a Command Can't Prove It

One criterion had no proof command: a real purchase against live Stripe test mode. So it got an evidence file instead, `.shipit/verify/evidence/001-goal-1-live-stripe.md`. It includes a `psql` query result pasted in, showing the order was recorded. The measured gap between Stripe's event time and the app recording it was about one second.

I like this rule. If you can't automate the proof, you still write it down.

### Keeping Track of What's Still Open

The last piece of state is `.shipit/open.md`. It lists known limitations, weak spots in the tests, and risks. The file describes itself as "a state, not a log: items are deleted when they are addressed." That keeps it short and honest. It's what's wrong right now, not a history of everything that ever was.

## The Plan Can Change, but the Change Gets Written Down

Plans change mid-build. That's fine. What matters is that the change gets recorded.

A good example from the store: I first assumed the cart would be emptied at checkout. During the build, it changed. The cart is now reduced when the payment is recorded, not when the customer heads to Stripe. If the customer cancels, their cart is still there. The commit message explains that decision and why, and the reasoning ends up in `PRODUCT.md` too.

This is the difference from vibe coding. The agent is still doing a lot of the work. But every meaningful decision leaves a trail I can read later.

## The Retro: How the Process Improves Itself

This is the part I'd push you hardest to copy. You won't get your process right the first time. No skill creator will write perfect skills for you on the first try. It's iterative.

So after a build, or after a stack or prototype session, I run `shipit-retro`. It asks what went well and what didn't, then finds one useful improvement. Or it says no change is needed. Findings go into `.shipit/retro/findings.md`.

Two findings from the store were promoted into actual skill edits:

- **"Make each new proof fail once before trusting it."**
- **"The proof has to run the sequence reality produces."**

Both came from tests that passed while the behavior was wrong. A test that has never failed might not be testing anything. And a webhook test that doesn't follow the real order of Stripe events can pass while production breaks.

Other findings are held with running counts until they come up often enough to act on. For example, a piped exit code was misread as green while seven of nine tests were failing. Real Stripe test keys were pasted into `application.properties` as placeholder defaults and only caught by accident. And `PRODUCT.md` grew past the length the MVP skill sets. That last one matters because a single-file plan only works if it stays short.

Retros also catch habits. I noticed I kept telling the agent to package by feature on projects that don't use Spring Modulith. So that became part of a skill. Now the store's `order` package holds its records, enum, and repository together, and I don't have to repeat myself.

## How to Build Your Own Spec-Driven Workflow With Skills

I'll say this plainly: don't download my skills and use them. They describe how I want to get ideas out of my head. Yours should describe how you work.

Here's how I'd start. Open the skill creator in your coding agent (I use Claude, but this works in Claude Code, Copilot, Cursor, or whatever you use). Describe the first step of your process in your own words. Something like:

```text
I'd like to create a new skill that helps me get an idea out of my head
for a project I'm trying to build. What should go into this skill? What
questions should it ask when vetting ideas?
```

Then test that skill on a small project, something like the Spring Store. See how it behaves. Fix what bugs you. Once that step feels right, move on to the next skill you need. Don't ask an agent to "create a set of skills to build new software" in one go. That's one-shotting your process, and it fails for the same reasons one-shotting an app does.

To show where this goes next, I ran `shipit-shape` on a new idea: a YouTube thumbnail studio that starts like a photo booth, then iterates on backgrounds, text overlays, and icons. I rambled for a minute with no clear plan. The skill didn't touch tech stack. It asked who it's for (only me), where the time goes today, and how photos and backgrounds come in. That's exactly the pushback I wanted.

Most people think of skills as coding helpers. They're great for that. They're also great for repeatable workflows, and starting a new project is one of the most repeatable things I do.

## Vibes vs Specs

Spec-driven development doesn't have to mean a team's process. For a solo developer, a plan you own can be enough: decide enough to start, build something you can verify, then review and update. On the Spring Store, that meant one `PRODUCT.md` with eight goals, seven feature specs that each name their proof command, 57 green tests, and a retro ledger that fed two real changes back into the skills.

If you want ideas, read through the shipit skills in the [danvega/skills](https://github.com/danvega/skills) repo. Then write down how you build, turn the first step into a skill, and run a retro after your next project. The process gets better every time you use it.

Happy Coding