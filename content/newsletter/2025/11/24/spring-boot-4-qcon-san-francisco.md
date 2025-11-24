---
title: "Spring Boot 4 is Here and My Trip to QCon San Francisco"
slug: "spring-boot-4-qcon-san-francisco"
date: "2025-11-24T08:00:00.000Z"
description: "Spring Boot 4 was released last week with significant improvements across developer experience, performance, and production-readiness. Plus, my recap from QCon San Francisco 2025 where I delivered two half-day workshops."
tags: ["Spring Boot", "Spring Framework", "QCon", "Conference", "Spring AI", "Java"]
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter. Spring Boot 4 was released last week, and I will fill you in on the details. Last week I was in San Francisco for QCon 2025, and even though it was a short trip, I had a blast.

![Dan Vega at QCon San Francisco](/images/newsletter/2025/11/24/qcon_01.jpeg)

This was my first time attending a QCon conference, and I was really excited to be there. Unfortunately, I didn't get to attend the conference because I didn't get in until Wednesday evening, but I heard great things about it, and I'm looking forward to watching some of the recordings. On Thursday I had two half-day workshops, and I was excited and prepared for what would be an amazing day.

![Workshop setup at QCon](/images/newsletter/2025/11/24/qcon_02.jpeg)

In the first workshop, I taught Java developers how to integrate AI into their applications using Spring AI. This was a lot of fun but also really hard to do in a half-day workshop. We did some live coding together, but due to time I had to show off a lot of examples so that we could make it through a lot of material. I also ran into an interesting problem that I need to find a better solution to. I created an OpenAI API key that I could share with the class so that attendees didn't have to sign up for their own. I was going to put this on a workshop page on my website behind a secured page. That page didn't have the API key hardcoded on it; instead, I pulled it from an environment variable. When I added the environment variable to my hosting provider, OpenAI immediately detected this and disabled the key. I ended up just creating a QR code that attendees could scan at the beginning of the session and then somehow get that over to their laptop. If anyone has ideas on a better way of sharing secrets like this, please let me know.

![Spring AI Workshop at QCon](/images/newsletter/2025/11/24/qcon_03.jpeg)

In the second workshop, my friend Nate Schutta and I presented on "The Fundamentals of Software Engineering in the Age of AI." This was based on our latest book that you can learn more about [here](https://www.danvega.dev/books/fundamentals-of-software-engineering). The workshop was sold out, and it was a blast. We had a great crowd with a lot of really good discussions and questions. Looking forward to giving this a bunch of times in the new year.

## Spring Framework 7 and Spring Boot 4 are Here! 🚀

The latest major releases of Spring Framework 7 and Spring Boot 4 bring significant improvements across three core themes: developer experience, performance, and production-readiness.

**10 Features I Cover in This Guide:**

1. **Null Safety with JSpecify** - Compile-time null checking to catch NPEs before runtime
2. **HTTP Interface Clients** - Zero-configuration HTTP clients with `@ImportHttpServices`
3. **Programmatic Bean Registration** - Modern, AOT-compatible API for dynamic bean creation
4. **API Versioning** - First-class support using media type parameters
5. **JMS Client API** - Fluent messaging API for Apache ActiveMQ Artemis
6. **Built-in Resilience** - Enterprise-grade patterns without external libraries
7. **Jackson 3 Support** - Improved defaults and immutable configuration model
8. **REST Test Client** - One consistent API for all test types
9. **Spring Data AOT** - 50-70% faster startup with compile-time query generation
10. **OpenTelemetry Integration** - Official, production-ready observability support

The message is clear: less boilerplate, faster applications, and better defaults out of the box. These releases eliminate code we've written countless times while delivering dramatic performance improvements through features like Spring Data AOT and continued GraalVM optimizations.

**Read the full article with detailed code examples and resources:**
[What's New in Spring Framework 7 and Spring Boot 4](https://www.danvega.dev/blog/spring-boot-4-is-here)

Ready to try it? Head to [start.spring.io](https://start.spring.io), select Spring Boot 4.0, and start exploring these exciting new features!

## Tweets

Thanks to DaShaun for holding down the fort while I was out of town and hosting this awesome Spring Boot 4 Release Party 🎉

:TweetEmbed{id="1991597469004960124"}

## Until Next Week

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover, please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev)
