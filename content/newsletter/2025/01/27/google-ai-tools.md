---
title: Making sense of Google's AI Tools and new YouTube videos
slug: google-ai-tools
date: "2025-01-27T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. I had such a busy month of December and beginning of January that I’m feeling like my new year is finally underway. I was able to get back to creating videos for YouTube last week. I was able to record 7 and publish 6 which has to be some sort of record for me. No, I can not keep up that pace but it’s nice to know that once in awhile I can create a bunch of them.

I was tinkering around with the idea of hiring an editor because that would help me produce more videos but after doing a little looking around I realized that I just can’t afford one right now. Don’t get me wrong, they are totally worth it but I just can’t justify it right now when the channel doesn’t really bring in any revenue.

After seeing some examples of edits to educational content I realized I wanted to try and make my videos a little bit more engaging. I started playing around with some different effects and transitions last week and I hope they are helping with your viewing experience.

In this week's newsletter I want to tell you about some of the videos I made last week. I also want to discuss an article I wrote last week for the ByteSized AI Newsletter on Google Gemini. This week I will focused on making more videos and this week I will be getting back into the AI space.

I hope you had a wonderful weekend and are ready to take on the new week.

## Google AI Tools Explained

The [article explains](https://www.bytesizedai.dev/p/googles-ai-tools) how Google has evolved beyond a search engine to offer three main AI tools powered by their Gemini language model: Google AI Studio, Vertex AI, and Google Gemini. You introduce Gemini as Google DeepMind's multimodal LLM released in December 2023, highlighting its ability to handle text, images, audio, and video while maintaining context over long conversations.

For each tool, you break down their distinct purposes:

1. Google AI Studio: Positioned as a free "AI laboratory" for experimentation, featuring a user-friendly interface and example prompts. It's ideal for developers, students, and researchers who want to test AI capabilities.
2. Vertex AI: Described as the "enterprise powerhouse" offering comprehensive AI solution building and deployment at scale. It includes advanced model training, enterprise-grade security, and Google Cloud integration.
3. Google Gemini: The consumer-facing version that integrates AI capabilities into Google Workspace products, making it accessible for everyday use.

You effectively help readers choose between these tools by providing a comparison framework and a simple decision tree:

- Beginners should start with AI Studio
- Enterprise needs point to Vertex AI
- Those wanting integrated AI features should use Gemini

The article strikes a good balance between technical information and accessibility, using clear analogies and "Quick Tips" to help readers understand complex concepts. You also include a relevant call-to-action at the end, encouraging readers to start with small projects and consider how AI could benefit their work.

The article successfully achieves its goal of demystifying Google's AI offerings for a general audience while providing enough technical detail to be useful for more advanced readers.

## New YouTube Videos

Here are the videos I published last week:

## Building a Spring Initializer Extension for Raycast: A Developer's Journey"

I recently shared one of my favorite Mac productivity tools, Raycast, and a new extension I built for it. As a developer who values keyboard-driven workflows, I've found Raycast to be an incredible replacement for Spotlight, offering everything from clipboard history to window management.

The exciting part? I just launched my own Raycast extension for Spring Initializer. Now you can create Spring Boot projects right from your launcher - no browser needed. What's particularly interesting is how I built it: despite my limited React experience, I leveraged AI to help translate my TypeScript knowledge into a working React extension in just a few days.

For Mac users interested in supercharging their workflow, you can find my extension in the Raycast store under "spring-init." And yes, Windows users, Raycast is coming your way soon!

:YouTube{id=NIVBxoK-APU}

## Spring Configuration: Mixing XML & Annotation Configuration

In this video, I tackled a great question from our Spring Office Hours podcast about mixing XML and annotation-based configuration in Spring Boot applications.

While I personally prefer annotation-based configuration for new projects (it's cleaner and more intuitive), I wanted to demonstrate why there's nothing wrong with using both approaches in the same application. Through a practical example, I showed how to configure beans using both XML and annotations, and how they can peacefully coexist in the same project.

The key takeaway? If you're working with a legacy Spring application that uses XML configuration, there's no need to rush into converting everything to annotations. Focus your time on delivering value rather than rewriting working code just for the sake of modernization.

:YouTube{id=6arSdLciC_k}

## GraphQL Performance Improvements

In a recent video, I shared crucial performance optimizations for GraphQL APIs in Java and Spring, focusing on two key issues I recently presented at CodeMash 2025.

The first is the notorious N+1 problem - when you fetch a list of authors and then make separate database calls for each author's books. I demonstrated two solutions: using a JPA join fetch query and leveraging Spring for GraphQL's @BatchMapping annotation to consolidate multiple calls into one efficient request.

The second optimization involves virtual threads in Spring Boot 3.2 and JDK21. I showed how enabling virtual threads can significantly improve performance when making multiple concurrent calls. I also emphasized the importance of observability tools like Zipkin for identifying these performance bottlenecks in production environments.

These optimizations made a huge difference - turning what could be hundreds of separate database calls into a single efficient query, while maintaining clean, maintainable code.

:YouTube{id=6oOKpVn4Qqg}

## Debugging Spring Boot API Integration Issues

In a recent video, I addressed a common challenge developers face when integrating with external APIs - handling JSON responses and converting them into usable Java objects.

Using a real-world example with the Polygon.io API, I demonstrated a systematic approach to troubleshooting integration issues. First, I showed how to properly model the JSON response using Java records, using @JsonProperty annotations to map abbreviated JSON field names (like "T" and "C") to meaningful Java variables (like "ticker" and "close").

The key insight came when tackling the HTTP client error many developers encounter: "no suitable HTTP message converter found." The solution wasn't in the JSON mapping, but in properly setting the Accept header to expect JSON responses. By walking through both the data modeling and HTTP client configuration, I showed how to build robust API integrations in Spring Boot applications.

This tutorial highlighted important practices like writing focused unit tests for JSON deserialization and using Spring Boot's REST client effectively, skills that are valuable for any developer working with external APIs.

:YouTube{id=-iO9HkuSelo}

## Sending email in Java with SendGrid

In a this video, I walked through integrating SendGrid's email service into Java applications - a powerful alternative to the traditional Java Mail API.

I demonstrated how SendGrid offers several key advantages: better email deliverability rates, comprehensive analytics, and a modern REST API with robust SDKs. The implementation is straightforward - after adding the SendGrid dependency to your Maven project, you can create an email service class that handles all the sending logic.

Using practical code examples, I showed how to set up the SendGrid client, construct email requests, and handle responses. The real power comes from SendGrid's additional features like delivery tracking, spam handling, and email templates, making it a more complete solution for production applications.

While SendGrid is a paid service, they offer a free tier that's perfect for testing. This makes it an excellent option for developers who need reliable email delivery and detailed analytics in their Java applications.

:YouTube{id=i8Hvvo4ZITg}

## How I built a tool to automatically generate documentation

In my final video of the week, I shared a practical tool I built to solve a common developer pain point - generating documentation for GitHub repositories. The tool, called "repo-content-generator," streamlines the process of creating README files by combining repository analysis with AI assistance.

Here's how it works:

1. The application (built with Spring Boot) scans either a GitHub repository or local directory
2. It intelligently filters content based on configurable include/exclude patterns
3. It generates a single consolidated file containing relevant code and configuration
4. This content can then be fed to an LLM (I use Claude) with specific documentation generation instructions

The key innovation is the workflow - rather than manually writing documentation or asking an LLM to directly analyze a repository, this tool creates a curated snapshot that can be used to generate accurate, well-structured documentation.

I demonstrated both the practical usage and technical implementation, including handling GitHub's API, recursive file traversal, and configurable content filtering. While I currently use it with Claude, the output can be used with any LLM that supports structured documentation generation.

The solution isn't just about automation - it's about creating consistent, comprehensive documentation even for small demo projects, saving valuable development time while maintaining quality.

:YouTube{id=QYchuz6nBR8}

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega) (I’m not calling it X).

Happy Coding,

Dan Vega

[https://www.danvega.dev](https://www.danvega.dev/)