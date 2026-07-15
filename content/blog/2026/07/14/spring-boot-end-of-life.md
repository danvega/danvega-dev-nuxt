---
title: "Spring Boot End of Life: Every 3.x Branch Is Now Unsupported"
slug: spring-boot-end-of-life
description: "Spring Boot 3.5 reached end of life in June 2026 and every 3.x branch is now unsupported. What that means, and how to plan your Spring Boot 4 upgrade."
author: "Dan Vega"
tags:
  - Spring Boot
  - Java
  - Spring Boot 4
  - AI
keywords:
  - spring boot end of life
  - spring boot 3.5 end of life
  - spring boot upgrade
  - spring boot 4 upgrade
  - spring boot version support
  - spring boot support timeline
  - spring boot commercial support
  - tanzu spring
date: 2026-07-14T13:00:00.000Z
published: true
cover: spring-boot-end-of-life-terminal.png
---

If you're running Spring Boot 3.5 in production, you stopped getting free security patches last month. Not "soon." Last month.

Your app is still running. Your build still works. Nothing broke, and nothing is going to break today, which is exactly what makes this easy to miss. Spring Boot 3.5 reached end of life in June 2026, and 3.5 was the last of the 3.x line. That means **every Spring Boot 3.x branch is now out of OSS support**. If you're on 3.x, any 3.x at all, you're on your own for security fixes.

In this post I'll show you where every branch stands, what "end of OSS support" does and doesn't mean, why the timing matters more this year than last, and what your options are.

## Spring Boot Version Support: Where Every Branch Stands

Here's the [official support timeline](https://spring.io/projects/spring-boot#support), as of today:

| Branch | Initial Release | End of OSS Support | End of Enterprise Support |
|--------|-----------------|--------------------|---------------------------|
| 4.1.x  | 2026-06         | 2027-07            | 2028-07                   |
| 4.0.x  | 2025-11         | 2026-12            | 2027-12                   |
| 3.5.x  | 2025-05         | **2026-06**        | 2032-06                   |
| 3.4.x  | 2024-11         | 2025-12            | 2026-12                   |
| 3.3.x  | 2024-05         | 2025-06            | 2026-06                   |
| 2.7.x  | 2022-05         | 2023-06            | 2029-06                   |

Two rows matter more than the rest.

**Only 4.1.x and 4.0.x still get free security patches.** Everything else is history. If your team celebrated getting to 3.5 last year, that win expired in June.

**4.0.x ends in December.** That's five months away. If you just finished moving to 4.0 and you're feeling good about it, keep the momentum and go to 4.1 instead of doing this again in the fall.

Now look at the 3.5 row, first column against the last. OSS support ended in June 2026. Enterprise support for that same branch runs to June 2032. Six years, same code. We'll come back to that.

## What End of Life Actually Means

A quick note on wording first. Spring's support page calls this "end of OSS support." Most of us say end of life, or EOL. Same thing, and I'll use both.

Now let's be clear about what it means, because the phrase makes people panic in the wrong direction.

It does not mean the artifacts disappear. [Maven Central never removes a published component](https://central.sonatype.org/publish/requirements/immutability/). That's their policy, not a favor to Spring, and the whole point of it is that a build you ran last year still runs today. If you want proof, `spring-boot-1.0.0.RELEASE` from 2014 still downloads right now. Your build won't start failing. Your CI won't turn red. You can keep shipping 3.5 tomorrow and nobody will stop you.

What it means is that Spring Boot **3.5.16, released on June 25th, is the last one you get for free**. There is no 3.5.17. When a security hole turns up in that branch, the fix lands in a supported release and 3.5 doesn't receive it. Same for bugs.

So the honest framing isn't "your app is broken." It's that you have no way out. Your build works fine right up until the day a CVE lands on something you can't patch. Then you're doing an emergency upgrade under pressure, at whatever time of night the disclosure hits. The upgrade doesn't get cheaper by waiting. It gets more expensive and less optional.

## Why This Year Is Different

Sitting on an unsupported branch has always been a bet. What changed is the odds.

In April 2026, the Spring team received **482 new security reports across 65 scanned projects**. The historical average is about **6.5 reports a month**. That's not a busy month. That's 74 times the normal rate, and it produced 26 new CVEs across the portfolio.

The cause is AI. Security scanners got good enough to find patterns that used to take an expert with time and motivation, and now anyone can point one at any repository. The Spring team [wrote about this directly](https://spring.io/blog/2026/06/01/spring_and_security_in_the_times_of_ai), and their conclusion was blunt: upgrade to the versions released in June.

Two things are worth being clear about.

Most of those reports are medium-to-low severity. This isn't 482 Log4Shells. The volume is the story, not the severity of any one report.

And this is not a Spring problem. Every open source project of any size is getting the same firehose right now. Spring is just big enough and organized enough to count it and tell you about it. If you maintain anything with a public repo, you already know what I'm talking about.

But put the two facts side by side. The rate at which holes get *found* in your dependencies jumped 74 times over in a month, and it isn't going back down. And the branch you're running no longer gets fixes. Either one on its own is fine. Together they're a plan to get paged.

## Upgrading to Spring Boot 4.1

For most people reading this, that's the answer. Go to 4.1.

Not 4.0. I know that feels like the smaller step, and smaller steps are usually the right instinct, but 4.0 loses OSS support in December, and you'd be doing this again before the year is out. 4.1 buys you until July 2027. If you're going to do the Spring Boot 4 upgrade once, do it once.

Here's the part that surprises people. **The Java baseline hasn't moved.** Spring Boot 4 requires Java 17, same as Spring Boot 3, with first-class support for Java 25 if you want it. There's no forced JDK jump hiding in this upgrade.

That makes the move from 3.5 to 4.x a very different job than 2.7 to 3.0 was. That one made you rewrite every `javax` import to `jakarta`, and it hurt. This one has nothing like it. Spring Boot 4 moves to a Jakarta EE 11 and Servlet 6.1 baseline, so there's real work in the dependency layer, but the thing that made the last major upgrade a challenge isn't in this one.

If you want a reason to be on 4.1 beyond "the patches are there," I've been writing about it since it landed:

- [Lazy JDBC Connections in Spring Boot 4.1](/blog/lazy-jdbc-connections-spring-boot-4-1): one property, real performance win
- [Type Safe Property Paths in Spring Boot 4.1](/blog/type-safe-property-paths-spring-boot-4-1)
- [The New @RedisListener Annotation](/blog/redis-listener-spring-boot-4-1)
- [SSRF Protection with InetAddressFilter](/blog/spring-boot-ssrf-protection-inet-address-filter): a one-bean fix for a whole class of attack
- [Getting Started with Spring gRPC](/blog/spring-grpc-spring-boot-4-1)

That SSRF one is worth calling out here. It's a security feature you do not get on 3.5, and you never will.

Start with the [Spring Boot 4.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide). If you want to see what a 4.1 project looks like before you commit to anything, [start.spring.io](https://start.spring.io) will generate one in about fifteen seconds.

### If You're Doing This Across a Lot of Services

One upgrade is a Tuesday afternoon. Forty of them is a quarter, and that's the part nobody budgets for.

If you're an enterprise customer, [Spring Application Advisor](https://enterprise.spring.io/) is built for exactly this problem. It manages your dependencies, code, and configs in Git, works out the upgrade path, opens the pull requests, and drops into your CI pipeline.

The upgrades are deterministic, not AI-generated. Which is funny, since AI is the reason you're reading this. But someone has to sign off on that diff, and "a recipe did it" is an easier conversation than "the model thought it looked right."

It isn't free, and it isn't for everybody. It's part of the Tanzu Spring subscription. If you're one team with three services, skip it and do the upgrade by hand. You'll be done Thursday. If you're a platform team looking at a spreadsheet of 200 apps that all say 3.5, this is the difference between a quarter and a year.

## If You Genuinely Can't Upgrade Yet

If you can upgrade, upgrade. Everything above is still the advice.

Sometimes the upgrade isn't happening this quarter. A dependency isn't ready, the team is mid-migration on something else, or it's a regulated system where "we upgraded the framework" is a six-month conversation. That's real, and "just upgrade" isn't useful advice if you're in it.

This is what that last column in the table is for. Spring Boot 3.5 lost OSS support in June 2026, but it's under enterprise support until **June 2032**. Same branch, same code, six more years of security fixes. The 2.7 line has the same shape: OSS ended in 2023, enterprise runs to 2029.

There's a second piece that matters more than the timeline if you work somewhere with auditors. Security fixes ship before the hole is announced publicly, so enterprise customers can have a patch on **day zero** instead of starting their scramble when the CVE hits the news. If you've ever spent a Log4Shell weekend refreshing a GitHub thread, you know what that window is worth. [Tanzu Spring](https://spring.io/security) is where that lives.

I want to be careful how I frame this, though. Commercial support is a bridge, not a destination. It's how you buy time to do the upgrade properly instead of doing it at 2am. If you find yourself paying for enterprise support forever so you never have to upgrade, you haven't solved the problem.

## What I'd Actually Do

If you do nothing else after reading this:

**Find out what you're actually on.** Not what you think you're on. Run `mvn dependency:tree` or `gradle dependencies`, and check every service, not just the one you touched last week. The 2.7 app nobody has deployed in a year is the one that'll get you.

**If it starts with a 3, you're unsupported today.** Put the 4.1 upgrade on the board with a date on it. Not "next quarter." A date.

**If you truly can't move, buy the bridge and use it.** Get commercial support so you can plan the upgrade instead of panicking through it. Then actually do the upgrade.

**Stop treating upgrades as an event.** Go do the math on that table. Every branch on it gets exactly 13 months of OSS support. 4.1, 4.0, 3.5, 3.4, 3.3, 2.7. All of them, 13 months, no exceptions. Nobody sprang this on you. It's a published cadence you can put on a calendar, and it's been running like clockwork for years. The flood of AI-found CVEs didn't change the schedule. It took away the slack you used to get away with.

## Key Takeaways from the End of 3.x

If you skimmed, here's the whole post:

- **Every Spring Boot 3.x branch is out of OSS support.** 3.5 was the last of the line, and it ended in June 2026.
- **3.5.16 is the final free release.** Shipped June 25th. There is no 3.5.17 and there never will be.
- **Only 4.1 and 4.0 still get free patches**, and 4.0 runs out in December. Go to 4.1.
- **Security reports jumped 74 times over in a single month.** AI scanners found them. That's the new normal, not a spike.
- **This upgrade is not the 2.7 to 3.0 slog.** Java 17 baseline, no `javax` rewrite waiting for you.
- **Every branch gets exactly 13 months.** No exceptions, no surprises. Put the next one on the calendar now.
- **If you truly can't move, 3.5 has enterprise support until 2032.** Buy the runway. Then use it.