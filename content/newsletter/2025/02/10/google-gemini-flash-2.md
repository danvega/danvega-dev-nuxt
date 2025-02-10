---
title: Google Gemini Flash 2.0, Spring Office Hours Q&A and CloudFoundry Weekly
slug: google-gemini-flash-2
date: "2025-02-10T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. The Super Bowl was last night and I feel like we have this conversation every year but why do keep doing this on a Sunday night. Adults have to work the next day, kids have to go to school and this could all be avoided if we just moved the game to Saturday night.

I am going to keep this pretty short today as I am pretty swamped getting ready for 3 conferences and many other customer talks over the next month. If you're going to be at ConFoo, DevNexus or JavaOne please say hello 👋🏻

## Google's Flash 2.0

Google Gemini Flash 2.0 represents a significant advancement in the LLM landscape, particularly for production applications requiring high throughput. The model family stands out for its impressive combination of speed, quality, and cost-effectiveness – with pricing at just 10 cents per million tokens for input and 40 cents per million tokens for output. Through the Spring AI project, developers can now easily integrate Gemini Flash 2.0 using Google's Vertex AI platform, though it requires some initial setup with Google Cloud CLI and project configuration.

The implementation details showcase practical integration paths through three main access points: Google AI Studio for experimentation, Vertex AI for enterprise-grade applications, and the consumer-facing Gemini app for everyday use. For Java developers, while direct API access isn't yet available, the Spring AI project provides a clean abstraction over Vertex AI, enabling straightforward integration with just a few lines of configuration and code. The demo application demonstrates how to set up a basic chat client using Spring AI's ChatClient builder, making it accessible for developers to start building with this powerful new model.

:YouTube{id=mMLaWFx2SN8}

## Spring Office Hours S4

In our first Spring Office Hours episode of February, DaShaun and I dived into some exciting developments in the Spring ecosystem. One of the biggest announcements we covered was the upcoming changes in Spring Boot 3.5, particularly the removal of the spring-boot-starter-parent. While this change will streamline dependency management and make upgrades smoother, we recognize it'll require some adaptation for teams using parent POM wrappers.

We spent time discussing the rapid evolution of Spring AI, including its new support for DeepSeek's models and the framework's capabilities for building AI agents. I'm particularly excited about how quickly our Spring AI team has been adding support for new models, keeping pace with the fast-moving AI landscape.

A significant portion of our discussion focused on something I'm particularly passionate about - community involvement and career development in the Spring ecosystem. We emphasized that you don't need official permission to contribute to Spring, and highlighted the many "good first issue" labels in our repositories that are perfect for new contributors.

Looking ahead, we're gearing up for an exciting conference season. I'll be at ConFoo in Montreal, DevNexus in Atlanta (where DaShaun and I will be doing a live Spring Office Hours!), JavaOne in San Francisco and Spring I.O in Barcelona. If you're planning to submit a talk for Spring I.O, don't forget the CFP closes on February 13th.

The episode really drove home something I believe strongly: there are many paths to growth in the Spring ecosystem, whether through code contributions, blog posts, or local meetups. Everyone can contribute in their own way, and that's what makes our community so vibrant.

:YouTube{id=AL2HL3zRWwI}

## Cloud Foundry Weekly

Last week I was lucky to be a guest on the Cloud Foundry Weekly Podcast. DaShaun and I were actually on the very first episode and we returned for last weeks 44th episode and it was a lot of fun. We talked a lot about AI and What's new in Spring. You can check this episode of the podcast below as well as an archive of previous episodes.

:YouTube{id=EDAjySENoM4}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)