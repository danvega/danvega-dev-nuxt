---
title: "Modularizing Spring Boot, MockMvcTester vs RestTestClient and Spring Boot 4 Course Coming Soon!"
slug: "spring-boot-4-new-videos-and-course"
date: "2025-12-15T08:00:00.000Z"
description: "Happy Monday and welcome to another edition of the newsletter. It's hard to believe we are halfway through December and Christmas is right around the corner."
tags: ["Spring Boot", "Spring Boot 4", "Testing", "MockMvcTester", "RestTestClient"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. It's hard to believe we are halfway through December, 
and Christmas is right around the corner. At this point I'm just trying to get things wrapped up for the year. 
This means that I want to get out any videos I had on the schedule for December. I'm continuing to learn about all the 
new things in Spring Boot 4 and I love to share what I learn.

I'm also preparing for conference and customer talks next year. I'm excited to announce that I will be speaking at 
the Java Champions conference next year which will be online for free. This will be my first Java Champions conference, 
and it's an honor to be in a lineup of so many amazing presenters and contributors to the Java ecosystem. If you're 
interested in checking out where I will be next you can check out the [speaking page](https://www.danvega.dev/speaking) on my website.

## MockMvcTester vs RestTestClient

When writing tests for controllers in Spring Boot 4, you now have two excellent options: MockMvcTester and RestTestClient. I was a bit confused about when to reach for one over the other, so I asked the Spring team directly.

The bottom line: both (can) use mock infrastructure under the hood (RestTestClient actually wraps MockMVC), so it largely comes down to personal preference. That said, here are some guidelines.

**Reach for MockMvcTester when you need:**

- Server-side inspection like handlers and exceptions
- Multi-file upload testing (not yet supported in RestTestClient)
- Fluent JSON path assertions with chaining

**Reach for RestTestClient when you want:**

- One API for both mock and real server testing
- Response deserialization to typed objects or lists
- Familiarity with WebTestClient (similar API)
- Non-JSON deserialization (XML, Protobuf, etc.)

Both support AssertJ-style assertions, which makes tests clean and readable. I'm a fan of RestTestClient because it gives me one consistent testing infrastructure, but you really can't go wrong with either.

Also worth noting: you can now use `@AutoConfigureRestTestClient` to automatically wire things up instead of manually binding to the controller or MockMVC environment.

You can check out the video below.

:YouTube{id=xWcqvrpj2PM}

## Modularizing Spring Boot

If you've upgraded to Spring Boot 4 and found that something that "just worked" before is now broken, you're not alone, and modularization is likely the culprit.

In Spring Boot 3.x, all auto-configuration lived in a single jar that started at 185KB and ballooned to over 2MB. The Spring Boot team finally split this into smaller, focused modules.

Here's what changed: In 3.x, having a dependency on your classpath was often enough, the giant auto-configure jar handled the rest. In 4.0, auto-configuration code has been separated into dedicated modules. If that module isn't on your classpath, the feature won't auto-configure.

**The fix:** Look for the appropriate starter dependency. For example, raw dependencies like H2 or REST clients now have dedicated starters that bundle both the library and its auto-configuration module.

**Need an escape hatch?** Add `spring-boot-autoconfigure-classic` to restore the old behavior while you migrate incrementally.

Check the [Spring Boot 4 migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide) for a full list of the new modular starters—it should be your first stop when troubleshooting upgrade issues.

You can check out the video below.

:YouTube{id=kTLuhE7_jGU}

I also built out some graphics for this to include in some presentations I'm working on.

:TweetEmbed{id=1999150035611644088}

## Spring Boot 4 CRUD API

I was having a conversation with a couple of folks on Twitter and they asked why is it so much easier to create APIs in other languages and frameworks compared to Spring Boot. I actually think it's really easy to do this in Spring but of course I have the perspective of being a long time user and teacher of the framework.

I think part of this is you need to step back and move away from the parlor tricks of creating a blog in 5 minutes. While those demos were fun they were never really meant for production. I was already planning on building a Spring Boot 4 course for the new year but I thought this might be a good opportunity to work on just the API portion. I think we can build this out in 2 steps, first build something out as fast as we can to show just how easy it is:

![Spring Boot 4 Course Outline - Quick Start](/images/newsletter/2025/12/15/crud_api_01.png)

After we show just how easy it is to get up and running I will expand on that and build something that is a little bit more production ready.

![Spring Boot 4 Course Outline - Production Ready](/images/newsletter/2025/12/15/crud_api_02.png)

## Tweets

I believe this is the tweet that got the conversation started about building APIs in Java / Spring 🤣

:TweetEmbed{id=1998585764209205311}

We are looking for reviews, feedback and quotes for the book. If you want to send me a quote I can get it added to the home page.

:TweetEmbed{id=1999122458616455280}

:TweetEmbed{id=1998749543437828269}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
