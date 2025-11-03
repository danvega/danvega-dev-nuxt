---
title: "Fundamentals of Software Engineering Podcast and Spring Boot 4 is arriving this month!"
slug: "spring-boot-4-fose-podcast"
date: "2025-11-03"
description: "Announcing the Fundamentals of Software Engineering Podcast and diving into Spring Boot 4's exciting new features including Bean Registrar, API Versioning, and more."
tags:
  - Spring Boot
  - Java
newsletter: true
published: true
---

Happy Monday and welcome to another edition of the newsletter! I hope you all had a wonderful Halloween. We were lucky to get some decent weather here, and the kids had a blast getting more candy than they will ever eat. I also tested out a Halloween AI photo generator that would take a picture of you and spookify it. I thought it did a good job of making me a Spooky Spring Developer Advocate 🤣

![Spooky Dan](/images/newsletter/2025/11/03/spooky-dan.png)

Daylight Saving Time happened this weekend and sunset is now 5:20 PM in my area. I just don't understand how anyone can think this is a good idea. I'm not sure how I am going to make it through the next 4 months, but I will do my best 🤷🏻‍♂️ The best part about the calendar switching over to November is that we get a new version of Spring Boot. That's right, Spring Boot 4 and Spring Framework 7 will be released later this month!

Last week, something incredible landed in my inbox, possibly the best email I've ever received. It started like this:

> Hi Dan and Nate,
>
> Congratulations! Your book went to print today, and we've now completed production.

After all the hard work the entire team put into this, I can't believe this is finally happening. I'm told that the ebook versions will start appearing this week, and the print versions are probably 3-4 weeks out.

In this week's edition of the newsletter, I want to talk to you about a podcast I'm recording soon and more on Spring Boot 4.

## Fundamentals of Software Engineering Podcast

The book was a lot of fun to write, and we had a specific goal in mind. We were going to cover a lot of topics at a high level and leave you with resources to go deeper and learn more if you wanted to.

I'm excited to announce that as a companion to this book, Nate and I have decided to start a podcast. This will give us a chance to go deeper and have discussions around some of the things we talked about in the book and, more importantly, topics that we just couldn't cover in the book.

![FOSE Social Media Icon](/images/newsletter/2025/11/03/fose_social_media_icon.jpg)

I'm putting the final touches on the website and should be able to share it with you next week. In the meantime, if you want to be the first to know when the first episode drops, subscribe to the [YouTube channel](https://www.youtube.com/@FundamentalsSWE). This is going to be a blast—we even have an editor on board to help us look and sound professional, which I'm really excited about.

## Spring Boot 4 is almost here!

![Excited GIF](/images/newsletter/2025/11/03/excited.gif)

As I mentioned in the opening, one of the good things about the calendar moving over to November is knowing that we get a new release of Spring Boot. This isn't just a new release though—this is now the next major generation of the framework and a new major release.

I have spent a lot of time lately diving into the new features, and I'm pretty excited about what is coming. These are the features that I have been diving into. I have written demos for most of these and already recorded tutorials for most of these. I will spend some time editing these this week, and you should start to see them being published soon.

- Null Safety with JSpecify and NullAway
- [API Versioning](https://www.danvega.dev/blog/spring-boot-4-api-versioning)
- [Programmatic Bean Registration](https://www.danvega.dev/blog/programmatic-bean-registration)
- [RestTestClient](https://www.danvega.dev/blog/spring-framework-7-rest-test-client)
- Jackson 3
- JMS Client
- HTTP Interfaces

What are your favorite features planned for Spring Framework 7 and Spring Boot 4? If you want to make sure I record a tutorial for a specific feature, let me know by replying to this email or letting me know on social media.

## Programmatic Bean Registration

Last week, I explored a new feature coming in Spring Framework 7 and Spring Boot 4 this November: the Bean Registrar interface. This feature transforms how we handle programmatic bean registration, making it cleaner and more intuitive than before.

### The Problem It Solves

We've all been there: needing to register beans dynamically based on environment properties, creating multiple beans in a loop, or handling complex conditional logic that `@Conditional` annotations just can't handle elegantly. Until now, we've had to resort to verbose post-processors or convoluted bean methods. It worked, but it wasn't pretty.

### Enter the Bean Registrar

The new `BeanRegistrar` interface provides first-class support for programmatic bean registration. In the demo, I showed how to create a message service system that dynamically registers either an Email or SMS service based on application properties. The beauty is in its simplicity. You get direct access to both the `BeanRegistry` and the `Environment`, allowing you to make intelligent registration decisions at runtime.

### Key Takeaways

- **Performance Wins**: Only load the beans you actually need based on configuration
- **Cleaner Code**: No more jumping through hoops with post-processors
- **Flexibility**: Perfect for scenarios requiring dynamic bean registration
- **Compatibility**: `@Bean` annotation isn't going anywhere. This complements it for specific use cases

The Bean Registrar represents Spring's commitment to providing elegant solutions for real-world problems. While `@Bean` will still handle 90%+ of your use cases, when you need that extra control, the Bean Registrar delivers.

*Note: If you're trying this with Spring Boot 4.0.0-M3, don't worry if IntelliJ shows autowiring warnings. The IDE just hasn't caught up with Spring Framework 7's new features yet!*

:YouTube{id=yh760wTFL_4}

## TWEETS

You can now select properties or YAML configuration right from the Spring Initializr.

:TweetEmbed{id=1984345881936601564}

I found an awesome graphic designer to help me out with my thumbnails. The best part is he is also a Java & Spring Developer.

:TweetEmbed{id=1983875461668090181}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover, please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
