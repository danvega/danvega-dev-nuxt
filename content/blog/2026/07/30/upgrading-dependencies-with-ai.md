---
title: "Upgrading Dependencies with AI: A Practical Guide"
slug: upgrading-dependencies-with-ai
description: "Learn a practical workflow for upgrading dependencies with AI, using scope, scale, and stakes to decide when to reach for an LLM to patch your projects."
author: "Dan Vega"
tags:
  - AI
  - Web Development
  - Nuxt
keywords:
  - upgrading dependencies with AI
  - AI dependency upgrade workflow
  - upgrade Nuxt with AI
  - scope scale stakes
  - keep software patched
  - OpenRewrite
date: 2026-07-30T09:00:00.000Z
published: true
cover: upgrading-dependencies-with-ai.png
video: https://www.youtube.com/embed/MYtia9xsTrQ
---


AI models have made it far easier to find and exploit vulnerabilities in open source software. That cuts both ways. The same tools that help attackers also help us stay ahead of them. Keeping your dependencies upgraded and patched matters more now than it ever has, and AI can make that work go a lot faster.

In this post I want to walk through how I use AI to upgrade a real project. I recently moved my personal website from Nuxt 4.1 to Nuxt 4.5, and I want to share the workflow I follow, the questions I ask the model, and the safety checks I put in place before anything touches production.

::GitHubRepo{url="https://github.com/danvega/danvega-dev-nuxt"}
Follow along with the complete working example.
::

## Scope, Scale, and Stakes: When to Reach for AI

Before you let an AI agent anywhere near your dependencies, ask yourself three questions. Scope, scale, and stakes. These three words decide whether AI is the right tool for the job.

**Scope** is what you are actually changing. In my case I am moving from one minor version of Nuxt to another. There are new features in the release, so part of the job is deciding which ones to adopt and which to leave alone.

**Scale** is how many users you affect. My site, danvega.dev, gets a nice chunk of traffic from the blog, but it is not millions of users. That matters when weighing the risk.

**Stakes** is what happens if something breaks. My site hosts blog posts. If someone cannot read a post for an hour, that is not a disaster. In the enterprise, stakes are much higher. A broken deploy can mean millions of dollars lost.

For a personal site, the stakes are low and the scope is small. That makes it a great candidate for an AI-assisted upgrade. If you are managing 3,000 services at scale, AI is probably the wrong choice, and I will come back to why at the end.

## Take Inventory and Read the Release Notes First

The first thing I do is read the release notes. For this upgrade I pulled up the [Nuxt 4.5 release notes](https://nuxt.com/blog/v4-5) and looked for the things that stand out.

A few items jumped out at me. Nuxt now runs on Vite 8, which was already on my radar. There is experimental SSR streaming that can improve your time to first byte (TTFB). And there is an important note that Nuxt 3 reaches end of life on July 31, 2026.

That end of life date is the whole reason to care. Once a version stops getting patches, any newly discovered vulnerability stays open. There is also a dedicated [security advisory](https://nuxt.com/blog/v4-5-security) worth reading, since a patch release, 4.5.1, followed shortly after 4.5 with a critical fix.

I do not try to adopt every new feature at once. The plan is two passes. First, get to the new version and make sure everything still works. Second, look at the new features and decide if any are worth adopting. Doing this incrementally is the key. Do not try to one-shot everything.

## Set Up the AI Conversation with the Right Context

I open my project in a desktop AI agent (I have been using Claude Desktop a lot lately) with the project folder loaded and the current branch set to `main`. Before writing any code, I want to talk the plan out.

One tip here. Instead of hunting for the perfect prompt, I focus on getting as much context into the conversation as I can. I dictate rather than type, which feels more like running an idea past a coworker in the next cubicle. Here is the kind of thing I say to the agent:

> We are getting ready to upgrade this website to Nuxt 4.5. I am going to give you a link with the description of the new release. First, go through it, then identify the current project. What version of Nuxt, Vue, and Vite are we using? Which versions are we moving to? Let's come up with a plan. I do not want to move to everything new. I want to upgrade and make sure everything works first, then talk about adopting new features. All of this needs to go in a new branch, not on main, so we can revert later. Before you write anything, let's come up with a plan.

Notice what I am asking for. I want it to take inventory of the current versions, read the release notes, and produce a plan. I explicitly tell it to work in a new branch. And I tell it not to write anything yet.

The agent hit a 404 fetching the release notes directly, which was likely bot protection. It opened a browser instead and pulled the page in that way. That is a nice bit of self-correction.

## Ask the AI to Produce a Plan Before Writing Code

The plan the agent came back with confirmed the current state and the target. The site was running Nuxt 4.1.3. The target was Nuxt 4.5.1, along with Vite moving from 7 to 8 and a bump to the Vue version.

The plan included a real risk assessment. It flagged that my Vite config in `nuxt.config` is minimal, which lowers risk. It also flagged Nuxt Content and told me to verify content queries still work before the production build. That is a genuine gotcha. I have been bitten by Nuxt Content in the past when I waited too long between upgrades.

Here were the steps it laid out:

- Check out a new branch, so a rollback is easy if something breaks
- Run the official recommended upgrade command from the release notes
- Confirm Nuxt 4.5.1, Vite 8, and the Nuxt DevTools fix all landed
- Resolve any fallout, but only if it actually appears
- Verify the dev server with `npm run dev` and check for startup errors
- Verify the production build with `npm run build` using the Netlify preset
- Confirm the RSS feed, speaking photos, and other hooks still work
- Commit to the branch and leave it unmerged for me to preview on Netlify

That last point matters. The agent understood that I host on Netlify and that Netlify can build a preview from a branch before anything reaches production. When you give the model good context, it produces a plan that fits your actual setup.

At this point you can reject the plan, revise it, or accept it. I accepted it and let it work.

## Verify in Dev, Then Verify the Production Build

The agent switched to the new branch, `upgrade-nuxt-4-5`, and started working through the plan. It ran into a startup error, previewed the logs, and self-corrected. One real fix was needed. Nuxt 4.5 resolves CSS entries as module IDs, and the old approach no longer worked.

When it finished, the dev server booted cleanly on 4.5.1 with Vite 8. All 14 key routes returned 200, the light YouTube embeds worked, and `rss.xml` was valid XML. The full production build with the Netlify preset completed with all pre-rendered pages in place.

I ran the checks myself too. I started the dev server and did a manual smoke test in the browser:

```bash
npm run dev
```

I opened `localhost:3000` and clicked around. My photo loaded. The latest blog posts loaded. Images rendered. The newsletter and speaking pages worked. Everything looked correct in dev.

One honest note from the agent. `npm audit` reported 65 vulnerabilities, nearly all in the Netlify CLI dependency tree, dev only, and predating this upgrade. That is fine, but it is the kind of thing you want the model to surface rather than hide.

## Why a Branch Preview Saves You

Here is the moment that proves why you never merge straight to main. Everything worked in dev, but when I pushed the branch and Netlify tried to build a preview, the deploy failed.

This is exactly the kind of thing that used to trip me up. The front end deploy stack is not the world I live in day to day. I know it at a surface level. In the past this meant hours on Stack Overflow searching through forums for an answer to something I rarely work on.

Instead, I pasted the build errors into the agent. It found two problems:

- The `npm ci` lock file was out of sync and NPM considered it incomplete
- Node 22.12 was too old. Nuxt 4.5.1 required Node 22.19.0, and my `.nvmrc` pinned an older version

The agent fixed both, I committed again, and Netlify kicked off a new deploy. This time the build completed. The RSS data was created, the speaking photos were generated, and there were no errors.

If I had merged the dev-verified branch straight to main, I would have shipped a broken build to production. The branch preview caught it. And if the whole thing had gone sideways, I could have thrown the branch away and started fresh. That safety net is the entire point.

## Do a Final Smoke Test in Production, Then Merge

Once the branch deploy was live, I opened the preview URL and did a manual check in production. Blog images loaded. My code fences rendered correctly. The light YouTube component actually played videos. The newsletter, speaking events pulled from JSON, courses, and podcast data all loaded.

Only after that did I tell the agent to merge to main and push to production:

> I have tested this in production on the branch preview. Everything looks good. The build works and the deploy worked. Let's merge this to main and push to production.

The push went to GitHub, Netlify built the production deploy, and the site went live. I reloaded in production, confirmed things worked, and that was the upgrade. Nuxt at 4.5.1, Vue at 3.5, Vite at 8.

## When AI Is the Wrong Tool for Upgrades

I want to be clear about the boundary here. AI worked well for this because the stakes were low, the scale was small, and it was a single project.

If you are in the enterprise with 3,000 apps to upgrade, I would not reach for AI. Two reasons. First, it is non-deterministic, so it could do 3,000 slightly different things across those services. Second, it costs tokens, and running that at scale gets expensive fast. Upgrading many services should be a repeatable, deterministic process.

If you are on the Java and Spring side, there are better tools for that job. [OpenRewrite](https://docs.openrewrite.org/) lets you apply recipes and run a deterministic workflow to upgrade projects. If you are running Spring in the enterprise, the team I work with at Broadcom offers [enterprise support](https://enterprise.spring.io/) with custom recipes and tools that automatically upgrade projects and open PRs in a deterministic way. Reach out if that is interesting to you.

## Stay Patched, and Match the Tool to the Job

The big picture is simple. Frontier AI models have made it easier to find and exploit vulnerabilities. That makes keeping your open source software upgraded and patched more important than ever. My friend [DaShaun](https://dashaun.com/) likes to live the "n minus 0" life, staying right on the latest version, and that is a good habit to build.

For a single low-stakes project, AI is a great partner. Take inventory, read the release notes, ask the model for a plan before it writes anything, work in a branch, and verify at every step. For high-stakes upgrades at scale, reach for deterministic tools instead.

Weigh scope, scale, and stakes every time, and you will know which tool to grab. 
Happy Coding.