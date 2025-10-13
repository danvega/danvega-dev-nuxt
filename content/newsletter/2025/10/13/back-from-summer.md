---
title: "After a busy end to the summer, I'm back!"
slug: "back-from-summer"
date: "2025-10-13"
description: "Happy Monday and welcome to another edition of the newsletter. It's been a while since I have written here but I have been a busy man lately."
tags: ["java", "spring-boot", "conferences", "mcp", "spring-ai"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. It's been a while since I have written here but I have been a busy man lately. I just looked and the last time I wrote a newsletter was on July 21. Thankfully this is a free newsletter so there will be no refunds. I hope you had an amazing summer and happiness and health is treating you and your family well.

It turns out that writing a book while having a full time job and family life to balance is not an easy thing to do, who knew. Speaking of when it comes to writing books my friend Nate told me that writing a book is kind of like having kids. You don't really understand what you're signing up for and when you're done you swear you will never do it again. This certainly checks out. Not that I'm ready to sign up for another book just yet but if I were to I would have a much better idea how to prepare for number 2.

If you didn't know for the last year I have been writing a book called the Fundamentals of Software Engineering with my good friend Nate Schutta. We are wrapping up production on it and it should be available soon. I could not be more proud of this book. I think it comes along at a perfect time and will help a lot of developers navigate their career. In fact I can truly believe that this is a book I wish I had 20 years ago.

:Image{src="/images/newsletter/2025/10/13/fose-cover.png" alt="Fundamentals of Software Engineering Book Cover"}

I will tell you more about it soon and I will obviously let you know when it's available to order. I can't possibly catch you up on everything I have done since July so I'll just touch on a few things and now that things are slowing down I will be able to write more and tell you all about the exciting things I'm working on.

## DevRel Life

![Conference Photo](/images/newsletter/2025/10/13/dev2next-panel.jpeg)

On top of writing a book I have been traveling the country talking to customers and presenting at some amazing conferences. It isn't easy submitting CFPs for conferences 6 months out and trying to project what you will want to talk about in that time frame. On top of that has become increasingly competitive at these conferences and getting selected is not easy so I'm always grateful when I get that acceptance email. Here are the conferences I spoke at lately:

- KCDC - Kansas City, MO
- SpringOne - Las Vegas, NV
- ApacheCon - Minneapolis, MN
- Commit your Code - Plano, TX
- dev2Next - Colorado Springs, CO

A lot of my conference talks and workshops have been around AI. I was able to give 25 min talks on MCP all the way up to an 8 hour workshop on AI for Java Developers. I have also spent a lot of time lately talking about the upcoming releases of Spring Framework 7 and Spring Boot that will drop next month. If you're interested in any of this content you should be able to find related videos on my [YouTube channel](https://www.youtube.com/@danvega). I'm hoping to release a bunch of videos on the new features coming in Spring over the next month so make sure you are subscribed.

## Dan Vega as a Service

I have spent a lot of time recently updating my [website](https://www.danvega.dev). For as long as I can remember I have been creating content and it all started with my website. I am super happy with the current state of my little corner of the internet and have been trying to improve it. I upgraded to Nuxt 4 and bumped a lot of dependencies which wasn't an easy transition. With this you should see some performance improvements along with a new page that I want to tell you about now.

I have been talking a lot about MCP Servers this year and just how easy they are to build in Java and Spring thanks to the [Official Java SDK](https://github.com/modelcontextprotocol/java-sdk) that was donated to Anthropic by the Spring team. In the latest version of Spring AI 1.1.0 (which is currently in a M3 version) this got even easier. You no longer need to register tool callbacks so this is as easy as adding an annotation to your methods.

I decided to create a new MCP Server called [Dan Vega as a Service (dvaas)](https://www.danvega.dev/mcp) that would surface all of my content to an LLM. You have to remember that LLMs are trained on a certain data set up to a date and so a lot of my recent content won't be found if you asked it about something. Yes it can invoke tools like a web search but those won't always be accurate or know about certain data that isn't on my website such as the Spring Office Hours podcast.

In terms of practical use I know that you aren't going to run to install this in your agent of choice. What this does provide though is just how easy it is to create your MCP server in Java and Spring for whatever your use case might be. You can also use the new Streamable Http transport which mine uses and allows you to make your server publicly accessible. You can find the [source code on GitHub](https://github.com/danvega/dvaas) and if you have any questions about it please don't hesitate to ask.

**TWEETS**

:TweetEmbed{id=1975613069629006035}

:TweetEmbed{id=1976378723575398799}

:TweetEmbed{id=1975672073684222194}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
