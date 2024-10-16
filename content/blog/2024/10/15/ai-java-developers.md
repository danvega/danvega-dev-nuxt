---
title: "Building Generative AI Applications in Java: From Simple Scripts to Spring Boot"
description: "Explore how Java developers can leverage generative AI, from basic curl commands to robust Spring Boot applications. Learn to integrate OpenAI's GPT models, use Java's HTTP client, and harness the power of Spring AI for structured output and simplified AI integration."
slug: ai-java-developers
date: 2024-10-15T09:00:00.000Z
published: true
author: "Dan Vega"
tags:
    - Java
    - Spring Boot
    - AI
video: https://www.youtube.com/embed/uoOwVWVl_eU
keywords: Java, Spring Boot, OpenAI, GPT, AI, generative AI, REST API, HTTP client, Spring AI, large language models, LLM, Spring Web, Spring MVC
---

As the world of artificial intelligence continues to evolve, Java developers are finding themselves at an exciting crossroads. While Python has long been the go-to language for AI and machine learning, the landscape is shifting. Today, we're not just talking about building and training models – we're focusing on how to consume and integrate powerful AI capabilities into our Java applications.

In this post, we'll explore how Java developers can leverage generative AI, specifically large language models like OpenAI's GPT-4, in their applications. We'll start with simple scripts and progress to more robust Spring Boot applications, addressing real-world challenges along the way.

## Getting Started with OpenAI's API

Before we dive into code, you'll need an OpenAI API key. If you haven't already, head over to the [OpenAI website](https://openai.com/) to sign up and obtain your key.

Let's start with a simple curl command to test the API:

```bash
#!/bin/zsh
echo "Calling OpenAI..."
PROMPT="Tell me something interesting about Java"

curl https://api.openai.com/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{ "model": "gpt-4o", "messages": [{"role":"user", "content": "'"${PROMPT}"'"}] }'
```

This script sends a POST request to OpenAI's chat completions endpoint, passing our prompt as the message content. The response will contain the AI-generated text along with some metadata.

## Making AI Calls in a Java Application

While curl commands are great for quick tests, let's see how we can integrate this into a Java application. We'll use Java's built-in HTTP client to make the request:

```java
var apiKey = System.getenv("OPENAI_API_KEY");
var body = """
        {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "user",
                    "content": "Tell me an interesting fact about the Spring Framework"
                }
            ]
        }""";

var request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.openai.com/v1/chat/completions"))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer " + apiKey)
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build();

var client = HttpClient.newHttpClient();
var response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

This approach gives us more control over the request and allows us to process the response programmatically. However, as we start building more complex applications, we'll face challenges like parsing structured data, handling errors, and managing API quotas.

## Leveraging Spring AI for Robust Applications

Enter Spring AI, a powerful framework that simplifies the process of integrating AI capabilities into your Spring applications. Let's build a book recommendation system using Spring AI and Spring Boot.

First, we'll set up our application properties:

```properties
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o
```

Next, let's create a `BookRecommendation` record to structure our AI's output:

```java
public record BookRecommendation(
    String title,
    String author,
    int publicationYear,
    String genre,
    int pageCount,
    String summary
) {}
```

Now, we can create a controller that uses Spring AI's `ChatClient` to generate book recommendations:

```java
@RestController
public class BookController {

    private final ChatClient chatClient;

    public BookController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/")
    public BookRecommendation home() {
        return chatClient.prompt()
                .user("Generate a book recommendation for a book on AI and coding. Please limit the summary to 100 words.")
                .call()
                .entity(BookRecommendation.class);
    }
}
```

This code demonstrates one of Spring AI's most powerful features: the ability to automatically parse the AI's response into a structured Java object. We didn't need to manually parse JSON or map fields – Spring AI handles all of that for us.

## Best Practices and Considerations

As you build AI-powered applications, keep these points in mind:

1. **Error Handling**: AI services can sometimes be unavailable or return unexpected results. Implement robust error handling to ensure your application degrades gracefully.

2. **Rate Limiting**: Most AI APIs have rate limits. Use techniques like exponential backoff to handle rate limiting errors.

3. **Costs and Token Usage**: AI API calls can be expensive, especially at scale. Monitor your token usage and implement caching where appropriate.

4. **Security**: Always keep your API keys secure. Use environment variables or secure vaults, never hardcode them in your application.

5. **Prompt Engineering**: The quality of your AI's output depends heavily on your input. Experiment with different prompts to get the best results. I have a guide on [how to talk to robots](https://www.bytesizedai.dev/p/how-to-talk-to-robots). 

## Conclusion

We've journeyed from simple curl commands to sophisticated Spring Boot applications, demonstrating how Java developers can harness the power of generative AI. The ease with which we can now integrate these capabilities is truly remarkable, opening up a world of possibilities for enhancing our applications with AI-driven features.

Whether you're building a chatbot, a content generation tool, or a recommendation system, the combination of Java's robustness and the power of large language models can yield impressive results. As you continue to explore this exciting field, remember that the key to success lies not just in the technology, but in how creatively and responsibly you apply it to solve real-world problems.

I encourage you to experiment with these techniques in your own projects. Start small, iterate quickly, and don't be afraid to push the boundaries of what's possible. The future of Java development is here, and it's powered by AI.

Happy coding!