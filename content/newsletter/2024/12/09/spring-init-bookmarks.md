---
title: Spring Initializr Bookmarks, GraphQL Query by Example and Open AI's 12 days of Shipmas
slug: spring-init-bookmarks
date: "2024-12-09T09:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. This past weekened was a much needed one for me. My wife and I were able to go on a date, we got a bunch of decorating done around the house and we had brunch with Santa 🧑‍🎄 These girls make me so happy 🤩

![Brunch with Santa](/images/newsletter/2024/12/09/bws_01.jpeg)

![Brunch with Santa](/images/newsletter/2024/12/09/bws_02.jpeg)

This week I’m giving a presentation on common mistakes that Spring Developers make. I made [a video](https://www.youtube.com/watch?v=PbkROQPTBao) earlier this year when I went over some of the most common mistakes I could think of. We also did a whole show on [Spring Office Hours](https://spring-office-hours.transistor.fm/episodes/spring-office-hours-s3e4-common-spring-developer-mistakes) about this topic.

This is going to be a 60-minute version of this talk but I quickly built out a [repo](https://github.com/danvega/scm-workshop) that has a few hours of content. I think my main goal with this talk is for developers to walk away and learning 1 or 2 new things that didn’t already know. Some of the demos I walk through might be pretty common to a lot of developers but if you can pick up 1 thing from this talk and then take it back and improve your codebase I will consider it a success.

Last week I was lucky to [chat](https://spring-office-hours.transistor.fm/episodes/s3e41-springs-hidden-powers-with-greg-turnquist) with my good friend Greg Turnquist on Spring Office Hours. We got to catch up on what Greg is doing over at [Cockroach Labs](https://www.cockroachlabs.com/) and I learned a few new things which is a common occurrence when I get to chat with Greg. This week we are sitting down with JetBrains Developer Advocate https://x.com/sivalabs?utm_source=dan-vega.beehiiv.com&utm_medium=referral&utm_campaign=spring-initializr-bookmarks-graphql-query-by-example-and-open-ai-s-12-days-of-shipmas and I’m looking forward to that talk.

Speaking of [Spring Office Hours](https://www.springofficehours.io/) we only have a few more episodes and then season 3 will come to an end. Pretty crazy to think that we are heading into Season 4 in less than a month. This year has been a big year for the podcast and I can’t thank you all enough for the support.

## Spring Initializr Bookmarks


The Spring Initializer has introduced a helpful new bookmarking feature that lets developers save their frequently used project configurations. Users can now create a project setup with their preferred settings (like Java version, dependencies, and build tools), and save it as a named bookmark for future use. For example, you might save a configuration for Spring AI projects with Claude, including specific dependencies like Web, Anthropic Cloud, PGVector, Docker Compose, and actuator. These bookmarks are easily accessible through a "starred" section, where they can be managed, edited, or deleted. The tool also maintains a history of recent configurations. If you head over to Twitter using the link below you can check out a short video I did on this feature.

:TweetEmbed{id="1865063943095320781"}

## GraphQL Repository Query By Example


I put together a [blog post](https://www.danvega.dev/blog/spring-boot-graphql-query-by-example) and video that demonstrates how to build a GraphQL API using Spring's @GraphQLRepository annotation combined with Query by Example (QBE) functionality.I show you how to create a simple book management system that allows flexible querying without writing extensive boilerplate code. Instead of creating multiple custom repository methods for different search combinations (by title, author, year, etc.), QBE allows developers to create dynamic queries by example.

The key steps covered include:

*   Setting up a Spring Boot project with GraphQL, JPA, and Postgres
*   Creating a GraphQL schema for books with input types for flexible querying
*   Implementing a JPA entity and repository that extends both JpaRepository and QueryByExampleExecutor
*   Using the @GraphQLRepository annotation to automatically wire up GraphQL queries to repository methods
*   Testing the API through GraphQL's playground interface

The main benefit highlighted is the significant reduction in boilerplate code - developers don't need to write individual controller methods or data fetchers, as the @GraphQLRepository annotation handles this automatically. The approach is particularly useful for rapid prototyping and building flexible search functionality.

:YouTube{id=J8vC8RflPPY}

## OpenAI Releases GPT-o1


OpenAI kicked off their "12 Days of Shipmas" with the release of GPT-o1, a groundbreaking AI model that prioritizes advanced reasoning capabilities over raw processing power. Building on their earlier o1-preview and o1-mini models, GPT-o1 shows remarkable improvements in mathematical and scientific reasoning, achieving 83.3% accuracy on Mathematics Olympiad problems and reaching the 89th percentile in Codeforces competitions.

![Reasoning with Robots](/images/newsletter/2024/12/09/robots-reasoning-with-each-other-in-the-style-of-p.jpeg)

The model introduces a sophisticated "chain-of-thought" methodology, allowing it to break down complex problems into manageable steps and think through solutions more thoroughly. Along with the model release, OpenAI launched ChatGPT Pro, a new $200 monthly subscription tier offering unlimited access to both GPT-o1 and GPT-4o, letting users leverage each model's unique strengths – GPT-4o for faster, general-purpose tasks and GPT-o1 for complex technical problem-solving requiring deeper reasoning.

If you want to read more about It I wrote an article on my other newsletter, [ByteSized AI](https://www.bytesizedai.dev/p/openai-s-gpt-o1-a-new-era-of-ai-reasoning).

**TWEETS**

Are you looking for resources to learn Spring AI?

:TweetEmbed{id="1865118162770928114"}

:TweetEmbed{id="1863767002088694093"}

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on https://twitter.com/therealdanvega).

Happy Coding  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev)



