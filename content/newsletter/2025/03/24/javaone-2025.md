---
title: JavaOne Wrap Up, JDK 24 Stream Gatherers and a tutorial on few shot prompting
slug: javaone-2025
date: 2025-03-24T00:00:00.000Z
---

Happy Monday and welcome to another edition of the newsletter. I'm back at my desk this week after an amazing trip to JavaOne in San Francisco and I can't wait to tell you all about it.

It has been a busy month that had me traveling 3 out of the last 4 weeks to ConFoo, DevNexus and JavaOne. I'm really excited to get back to making some videos this week. I was so inspired by being at so many great conferences and so many developers thanking me for my contributions to the community. It go me fired up to get home and do more and that is what I will be working on this week.

## JavaOne

Last week I had the opportunity to attend and speak at my very first JavaOne. The conference was really amazing on so many levels. First off it was so exciting to be in the keynote watching it live because I have watched so many of these keynotes over the years from my desk.

![JavaOne Keynote](/images/newsletter/2025/03/24/keynote.jpeg)

I thought the keynote was wall planned out. I really appreciated **Mark Reinhold** did an amazing job of debunking some of Java's myths. These are things you might hear people complain about from time to time but sure enough Java has an answer for them.

![Java Myths](/images/newsletter/2025/03/24/java-myths.png)

If you didn't get a chance to catch the keynote and want to watch a replay of it you can check it out [here](https://www.youtube.com/live/mk_2MIWxLI0).

There were so many great talks throughout the conference. I really enjoyed Adam Bien's talk and finally getting the chance to meet him in person. He is so knowledgeable and I really enjoy his humor and presentation style. If you ever get a chance to watch him in person, take it.

![Adam Bien's Talk](/images/newsletter/2025/03/24/adam-bien-talk.png)

I also go the opportunity to meet Brian Goetz and watch his talk on where Java is going. Brian is just one of those people who when they are talking, you listen. He is so knowledgeable on past, present and future of Java and it was really great to hear his insights.

![Brian Goetz](/images/newsletter/2025/03/24/brian-goetz.jpeg)

I got to take a picture with Duke!

![Duke](/images/newsletter/2025/03/24/duke-photo.jpeg)

It was so great talking and hanging out with so many great people at JavaOne. This was a conference I won't forget and can't wait to get back to the next one. This week inspired me to do more for this great community and that is exactly what I will do ❤️

## Streamlining Your Code with JDK 24's Stream Gatherers

Last week at JavaOne everyone was talking about JDK 24. I put together an article on one of my favorite new features: Stream Gatherers.

### What Are Stream Gatherers?

JDK 24's Stream Gatherers (JEP 485) revolutionize how we build intermediate operations in Java's Stream API. This powerful addition allows developers to create custom, reusable transformations that make complex data processing elegantly simple.

In my latest tutorial, I demonstrate how Stream Gatherers solve a common challenge: building a "Recent Posts By Category" feature for blog applications. The traditional approach requires nested collectors and multiple stream operations, resulting in verbose, difficult-to-follow code. Stream Gatherers transform this complexity into a concise, natural flow that's both more readable and maintainable.

![Stream Gatherers Example](/images/newsletter/2025/03/24/stream-gatherers.png)

What makes Gatherers special is their four-component design: an initializer to create state, an integrator to process elements, a combiner for parallel execution, and a finisher to emit results. This architecture provides exceptional flexibility while maintaining the Stream API's lazy evaluation and parallelism capabilities.

Beyond basic grouping operations, Stream Gatherers shine when implementing sophisticated processing like sliding window analysis, word frequency counting, sentiment analysis, and dynamic pagination. They bridge the gap between intermediate and terminal operations, enabling elegant solutions to problems that previously required cumbersome workarounds.

Check out the complete tutorial with working examples at: [https://www.danvega.dev/blog/stream-gatherers](https://www.danvega.dev/blog/stream-gatherers)

## Few Shot Prompting

This week, I tackled Few-Shot prompting in Spring AI after receiving a viewer question about sentiment analysis implementation. If you've been following my tutorials, you know I'm passionate about making AI concepts accessible to everyone.

I demonstrated how I approach Few-Shot prompting by showing you exactly how to provide example input-output pairs that guide large language models toward more accurate responses. I built a complete Spring Boot application that classifies tweet sentiment, highlighting a critical implementation detail many developers miss - placing examples in the user message rather than the system or assistant messages.

My implementation combines Spring AI with OpenAI's GPT-4, setting temperature to 0.0 for deterministic classification results. I walked through everything from initial configuration to final execution, sharing insights about message structure that will immediately improve your own AI implementations.

What I wanted to emphasize most in this tutorial is that "prompt engineering" isn't some gatekeeping skill - it's something we can all learn and improve with practice. Check out the video link below, and if you've been experimenting with Few-Shot prompting in your own projects, I'd love to hear about your experiences.

:YouTube{id=QZyYFyx_4RY}

**TWEETS**

I started watching the Lex Friedman interview with The Primeagen and it's so good!

:TweetEmbed{id=1903620751904633096}

Next up on the speaking circuit is Microsoft's JDConf.

:TweetEmbed{id=1903139292043428148}

Is AI making us dumber?

:TweetEmbed{id=1902476353011585066}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X). 

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
