---
title: "The Last Dance of Spring Boot 3.x: Windsurf AI, Testcontainers, and a Keynote Announcement"
slug: spring-boot-3-last-dance
date: 2025-05-05T00:00:00.000Z
---

Happy Monday and welcome to another edition of the newsletter. I'm writing this on a Sunday as I'm in the airport heading out to Charleston, SC to visit a customer. One of the many perks of my job is that i get to travel to conferences and customers all around the world. Customers offer an opportunity to get in the room with the developers using various projects in the Spring ecosystem.

One off the presentations I'm giving tomorrow is a "State of Spring" where we will talk about where we are and where we are heading. It's hard to believe that Spring Boot 3.0 was released in November of 2022. I bring this up because later this month Spring Boot 3.5 will be released and this will be the last release in the 3.x as we prepare for Spring Boot 4.0 in November.

![Spring Boot Release Timeline](/images/newsletter/2025/05/05/springboot3.png)

I also had some time to think about a lot of my favorite features in the 3.x line and decided to submit a talk about it for [SpringOne](https://www.vmware.com/explore/us/springone). I ended up submitting [8 different talks](https://github.com/danvega/abstracts/blob/main/spring-one-2025.md) on a variety of subjects so fingers 🤞🏻 crossed that one of them get selected.

There are a lot of really great AI powered tools for developers on the market today. In today's edition of the newsletter I will continue my exploration of them by introducing you to Windsurf. I also want to share a conversation I had with Eddú Meléndez over at Docker on Testcontainers and Docker Model Runner. Finally, I'll share a presentation I did at JavaOne and some big conference news!

## Windsurf: The Agentic Code Editor

Last week I mentioned my video on JetBrains Junie, and this week I'm continuing my AI Coding Agents series with a first look at Windsurf. In this video, I explore what makes Windsurf stand out in the crowded AI coding tools market.

Windsurf represents the latest evolution in AI-assisted development - what I call "agentic AI IDE environments." Unlike traditional chatbots (ChatGPT, Claude) or inline IDE assistants (GitHub Copilot, JetBrains AI), Windsurf acts as a proactive coding partner that can manage multi-step tasks autonomously. It's like having a smart junior developer who takes initiative, suggests refactoring, and coordinates changes across your codebase.

In the video, I demonstrate building a Spring Boot CRUD REST API that connects to the JSONPlaceholder service. Here are the highlights:

- **Fast and Responsive**: Windsurf is noticeably quick at making edits and changes compared to other tools
- **Model Flexibility**: You can choose between different AI models (GPT-4.0, Claude, etc.) based on your needs
- **Customizable Rules**: The ability to set global and workspace rules to match your coding style is a game-changer. For example, I prefer Java records over classes for immutability
- **Contextual Understanding**: Windsurf understands your entire project context, making it excellent for established codebases
- **Memory Feature**: It learns from your preferences over time, becoming more aligned with your coding style

The demo includes implementing caching with Spring's built-in cache abstraction and shows how Windsurf handles complex tasks like refactoring from RestTemplate to RestClient.

There's also exciting news that OpenAI might be acquiring Windsurf for around $3 billion, which could signal big changes ahead for this tool. If you're a Visual Studio Code user looking for a powerful AI coding assistant, Windsurf is definitely worth checking out. Remember, though - you're the pilot, not the passenger. Use these tools to enhance your productivity while maintaining control of your code.

You can watch the full video below and use my referral link in the description if you'd like to try Windsurf yourself.

:YouTube{id=XkRM4eO885I}

## Spring Office Hours- Testcontainers and Docker with Eddú Meléndez

Last week on Spring Office Hours, we had the pleasure of interviewing Eddu Melendez, a Software Engineer at Docker who joined through the Atomic Jar acquisition. We dove deep into Testcontainers, Docker Model Runner, and how these tools are revolutionizing both testing and AI development.

### Key Takeaways:

**Test Containers Evolution**

- Test containers started as a solution for managing containers programmatically in tests
- Now integrated seamlessly with Spring Boot 3.1+ using the `@ServiceConnection` annotation (no more manual configuration!)
- Can be used for both testing AND local development with Spring Boot's test run feature

**Docker Model Runner**

- Docker's new feature for running AI models locally
- Provides an OpenAI-compatible API, making it easy to integrate with Spring AI
- Available on macOS (Apple Silicon) and now Windows with NVIDIA GPUs
- Supports tool calling for models that have this capability

**Key Features Discussed:**

1. **Dev-time Test Containers**: You can now use the same test container configuration for both testing and local development, eliminating the need to maintain separate Docker Compose files
2. **New Elasticsearch SSL Support**: Spring Boot 3.5 introduces an `@SSL` annotation specifically for secure Elasticsearch connections
3. **Docker Model Runner Integration**: Test containers now has built-in support for Docker Model Runner, simplifying AI model testing with just one line of code
4. **Docker Compose Updates**: New `provider` type in Docker Compose for AI models, making it easier to share AI-powered applications

### Practical Example

Eddu demonstrated how to evaluate AI models using test containers:

- Use Docker Model Runner container in your tests
- Automatically configure Spring AI to use local models
- Run evaluations and sentiment analysis tests against your models

### Notable Quotes

When I asked about using microservices as test containers, Eddu wisely noted: "We don't advocate for that very often... because the microservice B depends on other services, maybe a database, maybe Kafka... it could be really heavy for your machine."

On the Java ecosystem: "I feel really lucky because we have a great ecosystem, really good tools, build tools, a great framework, testing frameworks as well."

### Resources

- [Spring AI and Docker Model Runner Article](https://spring.io/blog/2025/01/23/spring-ai-with-docker)
- [Docker Hub AI Models](https://hub.docker.com/r/ai)
- [Test Containers for Java](https://java.testcontainers.org/)
- [Docker Model Runner in Docker Desktop 4.40+](https://docs.docker.com/model-runner/)

You can watch the full episode here:

:YouTube{id=p3NfPM1SKLg}

## JavaOne 2025

I was lucky to attend and speak at my first JavaOne Conference back in March. Just last week the recording of my presentation was posted on their YouTube channel. If you want to learn more about frontend development as a Java development please consider checking it out.

:YouTube{id=CLgWfNnsDiM}

## dev2Next 2025

I am beyond excited to announce that I will be attending and speaking at [dev2next](https://www.dev2next.com/) this year. I was lucky to have 4 submissions accepted to this conference including the keynote. That's right, alongside my good friend Nate Schutta I will be giving a keynote talk at the conference. Nate and I have a book coming out titled "The Fundamentals of Software Engineering".

I hear a lot of people saying that with AI taking over software development the fundamentals no longer matter. Nate and I have a much different perspective on this and think the fundamentals are more important than ever. Here is the title and the abstract for the keynote and we hope to see you in Colorado Springs in the fall.

**Fundamentals of Software Engineering In the age of AI**

Agentic coding assistants and editor based AI chat interfaces are altering the development workflow leading some to proclaim the end of software engineering. Is it time to explore other careers? Not so fast, the rumors of our demise are greatly exaggerated! While these tools can boost productivity, to be used effectively, developers still need to master the fundamentals of the software craft. Modern software development demands more than just coding proficiency—it requires navigating an increasingly AI-augmented landscape.

**TWEETS**

:TweetEmbed{id=1917744566008176914}

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega) (I'm not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)