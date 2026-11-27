---
title: "How to Pass App Store Review With a Coding Agent"
slug: app-store-review-tips-coding-agent
description: "App Store review tips from shipping iOS and Mac apps with a coding agent: avoid rejections, write better review notes, and request an expedited app review."
author: "Dan Vega"
tags:
  - AI
  - Software Development
keywords:
  - app store review tips
  - expedited app review
  - avoid app store rejection
  - app review notes
  - claude code ios app
  - app store review guidelines 2.1
cover: app-store-review-tips-coding-agent.png
date: 2026-11-25T09:00:00.000Z
published: true
---

> **TL;DR:** The slow part of App Store review isn't the review. It's the rejection loop. I use my coding agent to research the rules, scrub the build, and write the review package before I submit. And if your launch is tied to a date, you can ask Apple for an expedited review.

I've been building a lot of iOS and Mac apps lately. [Clearing](/blog/mac-iphone-planner-built-in-mcp-server) went out on the Mac and iPhone this month. Elf Hunt, a Christmas advent game, went live yesterday. Every one of those submissions was approved on the first try.

That's not because I'm an iOS expert. I'm not. I'm a Java developer who got curious. Most of what I know about App Review, my coding agent (Claude Code) dug up for me before I pressed Submit.

In this post I'll share the App Store review tips that made the difference, where an agent helps and where it doesn't, and a bonus one a lot of developers don't know about: the expedited review.

## Why an App Store Rejection Costs More Than You Think

Apple says it aims to review "at least 50% of submissions in less than 24 hours and 90% in less than 48 hours" ([Apple](https://developer.apple.com/distribute/app-review/)). For updates to an app that's already live, that's often true.

New apps are a different story. My Mac app sat in "Waiting for Review" from October 25 to November 2. That's eight days before anyone looked at it.

Now picture getting rejected at the end of that wait. You fix the issue and resubmit. Then you wait again. One small mistake can cost you a week or two.

So the goal isn't to get through review fast. It's to get through review once.

## Have the Agent Research the Rules First

Before my first submission, I asked my agent to research App Review and write what it found into a file in the repo. Not a chat answer. A file I could read, edit, and reuse.

Here's roughly the prompt:

```text
I'm about to submit this app to the App Store for the first time.
Research what gets new apps rejected and what slows review down.
Use Apple's own guidelines and help pages first. Mark anything from
forums or blog posts as anecdotal. Write it to docs/release/app-review-plan.md
with a checklist of what this app still needs before I submit.
```

Two things matter in that prompt.

First, the agent has to cite Apple. Models remember the App Review Guidelines from whenever they were trained, and the guidelines change. I want a link next to every rule so I can check it.

Second, it has to check the rules against *this* app. A generic list of rejection reasons is easy to find. What I need is "your privacy policy URL isn't set" and "your purchase description is over the limit." The agent can read my code, my `Info.plist`, and my listing copy. That's where it earns its keep.

That plan file carried over, too. When I started Elf Hunt, the agent copied the lessons from Clearing's plan into the new one. The second app started where the first one ended.

## Hunt Down Placeholders and Debug Switches

Apple publishes the most common reason apps don't make it through. Over 40% of unresolved issues fall under guideline 2.1, App Completeness, "which covers crashes, placeholder content, incomplete information, and more" ([Apple](https://developer.apple.com/distribute/app-review/)).

Placeholder content is exactly the kind of thing you stop seeing. You wrote it weeks ago. Your eyes skip right over it. An agent doesn't.

Here's what my agent found before I submitted:

- A privacy policy that still had a line saying it was a draft.
- A support email address that bounced.
- Debug print statements left in from testing.
- Launch switches I used for testing, like one that unlocks every level and one that fakes today's date.

Those launch switches are worth a closer look. When you build with an agent, you end up with a lot of them, because they make testing fast. A reviewer should never be able to hit one. So they only exist in Debug builds:

```swift
import Foundation

struct LaunchOptions {
    var unlocked = false
    var freshStart = false
    var uiTest = false

    static let current: LaunchOptions = {
        var o = LaunchOptions()
        // Test and screenshot switches only. A store build ignores
        // every launch argument, so nothing can open paid content.
        #if DEBUG
        let args = ProcessInfo.processInfo.arguments
        o.unlocked = args.contains("-unlocked")
        o.freshStart = args.contains("-fresh")
        o.uiTest = args.contains("-uitest")
        #endif
        return o
    }()
}
```

In a Release build, the compiler drops everything inside `#if DEBUG`. Every option keeps its default. The rest of the app reads `LaunchOptions.current.unlocked` without caring which build it's in.

Ask your agent to search the whole project for test hooks, `TODO`, `lorem`, `example.com`, and anything that reads launch arguments. Then ask it why each one is safe to ship.

## Write App Review Notes for a Busy Reviewer

The App Review notes field is your chance to talk to the person testing your app. It's easy to leave it empty or write one line. I have the agent draft it, and I treat it like documentation.

A good note answers three questions. What is this app? What does it need, like an account or a network? And how does a reviewer get to the part that matters?

Here's the note I sent with Elf Hunt:

```text
Elf Hunt is a Christmas seek-and-find game for families. It has no login,
ads, analytics or network use, and progress stays on the device. Houses
open by the device date. In November the free houses 1 to 3 are open, as
a preview. To review the purchase: in town, tap "Unlock all 40 houses",
then "Ask a grown-up", and answer the multiplication question. Buy "All
Houses" ($3.99, non-consumable, Family Sharing on). Restore purchase is on
the same screen. The purchase opens the 15 Snowball Lane houses (26 to 40)
right away. To see the December houses, set the device date to Dec 25.
```

Look at the problem that note solves. Elf Hunt is an advent game. Most of it opens in December. A reviewer in November would open the app and find most of it locked behind dates. So the note tells them what's open now, how to reach the purchase past the parental gate, and how to see the rest.

The agent is good at this because it knows the app's paths better than I do. It wrote the code that gates them.

## Check Your Wording Against the App Store Review Guidelines

Some rejections have nothing to do with your code. They're about your words.

Elf Hunt is a family game, but I didn't put it in the Kids Category. That category comes with stricter rules. Outside of it, your metadata can't make kids sound like the main audience. Guideline [2.3.8](https://developer.apple.com/app-store/review/guidelines/#2.3.8) says terms like "For Kids" and "For Children" in app metadata are reserved for the Kids Category.

My first listing draft said the game was made for ages 5 to 8. The agent flagged it as the biggest risk in the whole submission. We changed "kids" to "families" in the name, subtitle, description, and screenshots.

Ask your agent to read your listing copy against the guidelines, not just your code. The name, subtitle, keywords, screenshots, and purchase descriptions all get reviewed.

## Give the Agent a Launch Checklist

There are a few things I want in every app's first version. I got tired of remembering them, so they live in my global `CLAUDE.md`, the instructions file Claude Code reads in every project:

```markdown
## Before submitting a new Mac or iPhone app

- A review prompt (StoreKit `requestReview`) after a real win. Never on
  first open or mid-task. Once per version, with weeks between asks.
- Crash reports. Use Apple's own (Xcode Organizer, Crashes) when the app
  promises no servers or tracking.
- A way to report problems, like a Help item that opens an email with the
  app and OS versions filled in.
```

None of these will get you rejected. But they're the things you wish you'd shipped once real people start using the app. With the list in the agent's instructions, it raises them before I cut the release. I don't have to.

## Check the Business Side Before You Submit

This one didn't cost me a rejection. It cost me a launch day.

Clearing's Mac app was approved and released. It showed as Ready for Distribution. But nobody could buy it. The Paid Apps Agreement in App Store Connect wasn't active yet. It needed a bank account and a tax form, and the bank account took up to a day to process.

Your agent can't sign agreements or enter bank details for you, and it shouldn't. But it can check the status and tell you what's missing. Put "Paid Apps Agreement active" at the top of your checklist if you're charging for anything.

## Don't Touch It While It Waits

Once you submit, the hardest part is doing nothing.

If you pull a build out of review to swap in a newer one, the review starts over. So send one complete package. Every screenshot, every note, the in-app purchase attached to the version. Then leave it alone.

What you *should* do is answer fast. If App Review sends a message, reply the same day. A metadata problem, like a screenshot or a line in your description, usually doesn't need a new build. You fix it in App Store Connect and reply.

## Where an Agent Doesn't Help

I don't want to oversell this. An agent can't see what a reviewer sees on a real device. It can't tell you how long the queue is this week. And it will sometimes state a guideline with total confidence that turns out to be outdated. That's why the plan file has links. Check the ones your submission depends on.

I also make the final calls myself. The agent fills in listings, drafts notes, and runs the checklist. I decide what the app is called, what it costs, and when to press Release.

If you're shipping a small update to an app that's already live, most of this is overkill. A bug fix with no new features or permissions usually goes through quickly. Save the full review plan for a first version or a big change.

## Bonus Tip: Request an Expedited App Review

Here's one a lot of developers don't know about. If your release is tied to a date, you can ask Apple to review it sooner.

Apple's help page says you can request one for reasons "such as fixing a critical bug or timing your release to coincide with an event" ([Apple](https://developer.apple.com/help/app-review/after-submitting-for-review/request-expedited-review)). For an event, you include "the event, its date, and how your app is associated with it" in the Notes field.

A few rules from that same page:

- You can only ask after you submit. "Only submissions that have already been sent to App Review can be expedited."
- It isn't guaranteed. Apple expedites "as allowed by availability and demand."
- Don't use it for every release. Apple says requests "should be reserved for matters of genuine urgency."

Elf Hunt was a perfect fit. It's an advent calendar. The first house opens on December 1. If the app showed up on December 10, it would miss a third of its own reason to exist.

Clearing was not a fit. A first launch with no date attached isn't an event, so I didn't ask. I waited like everyone else.

Here's the request my agent drafted for Elf Hunt:

```text
Elf Hunt is an advent calendar game. Its first daily house opens on
December 1, and a new house opens each day until December 25. The app is
built around that date, and a normal wait would miss the start of the
advent. The build is complete. It has no login and no network use, and
its one non-consumable purchase is submitted with this version. Full
review steps are in the Notes. We would be grateful for a review before
December 1.
```

Notice what's not in there. I also wanted the app live for Black Friday, but I left that out. Black Friday is a sales date. It isn't the event the app is built around. The advent start is.

I submitted Elf Hunt on Sunday night, November 22, and sent the request. It was approved on Tuesday, November 24.

If you have a holiday app, a conference app, or anything with a date on it, submit early and then ask. The worst Apple can say is no, and you're in the queue either way.

[Elf Hunt is on the App Store now](https://apps.apple.com/us/app/elf-hunt-christmas-advent/id6838152375), just in time for December 1.

Happy Coding
