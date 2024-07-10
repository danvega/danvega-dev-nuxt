---
title: Getting Started with Open AI's GPT-4o in Java
description: Getting Started with GPT-4o in Java
slug: java-gpt-4o
date: "2024-06-05T17:00:00.000Z"
published: true
author: Dan Vega
tags:
  - Java
  - OpenAI
  - Artificial Intelligence (AI)
cover: ./java-gpt-4o-cover.jpg
video: https://www.youtube.com/embed/EDJLHWcFvpQ
keywords: Java, OpenAI, GPT-4o, Maven
---

OpenAI has just released its newest model, GPT-4o, also known as Omni model. This advanced model is notably available through the API. As a Java developer, there are several highlights you would be excited about – 50% lower pricing, two times faster latency, and five times the rate limits. I’ve performed some preliminary testing, and it seems impressively fast. So, let’s explore how we can use this API in a pure Java program.

## No External Dependencies? No Problem!

In this tutorial, we won’t be using any external dependencies; it’s just going to be a straightforward Java app. Our goal is to create a new Java application that communicates with OpenAI's GPT-40.

## Tools of the Trade: Intellij

I'm starting with Intellij's ultimate edition, although the community edition should work fine as well. However, always use the IDE or text editor you are most comfortable with because that's the best editor for you.

![](https://image.mux.com/wM5LGAD9LU6kUAN6N5SMMNb02b2yMxu01cciFoGVjf600E/thumbnail.png?time=35.434782608696)

## Setting Up Your Java Project

Here’s a step-by-step guide to creating your Java project. Let's dive in.

1. **Create a New Project**: Open the new wizard in Intellij and create a new Java project named `hello GPT 40`.
2. **Maven Build Tool**: Though we'll not use any external dependencies for this video, we start with Maven since you'll likely require other dependencies later. Set your group ID to `dev.danvega` and the artifact ID to `hello-gpt-4o`.

```java
public class Application {
    
    public static void main(String[] args) {
        String apiKey = System.getenv("OPENAI_API_KEY");
    }
    
}
```

![](https://image.mux.com/wM5LGAD9LU6kUAN6N5SMMNb02b2yMxu01cciFoGVjf600E/thumbnail.png?time=135.83333333333)

## Setting Up the API Key

First, you'll need an OpenAI API key. Here’s how you can set it up:

1. **Get Your API Key**: Head over to [OpenAI's website](https://platform.openai.com/), log into your account or create a new one, and navigate to the API keys section.
2. **Create an API Key**: Generate a new API key and copy it.
3. **Environment Variable**: Instead of hardcoding your API key, use environment variables. This ensures your keys aren't exposed in your codebase.

```java
var apiKey = System.getenv("OPENAI_API_KEY");

if(apiKey == null){
    throw new IllegalStateException("Missing OpenAI API key!");
}
```

## Constructing the API Request

Here we build the body of the request and the actual request itself:

### Create the Request Body

The request body is a JSON string that includes the model, messages, and other parameters. Thanks to Java's multiline Strings you can easily build out a JSON request body.

```java
var body = """
{
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": "Tell me a good dad joke about cats"
        }
    ]
}""";
```

### Constructing the HTTP Request

We use Java's built-in `HttpClient` to send the request.

```java
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.openai.com/v1/chat/completions"))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer " + apiKey)
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build();
```

## Sending the Request

Finally, we send the request using the `HttpClient` and handle the response.

```java
var client = HttpClient.newHttpClient();
var response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

## Running the Program

Compile and run your program. You should get a quick response with a dad joke about cats:

```
Why did the cat sit on the computer? Because it wanted to keep an eye on the mouse.
```

## Important Tips for Real-World Applications

Here are some additional considerations for production-level applications:

1. **API Key Management**: Avoid hardcoding API keys. Use secure methods to store and retrieve them.
2. **Error Handling**: Implement robust error handling mechanisms.
3. **Rate Limits**: Respect OpenAI’s rate limits to avoid service disruptions.
4. **Dependencies**: For more complex JSON parsing tasks, consider using libraries like Jackson.

### Beyond Basics: Advanced Techniques

As you dive deeper into building AI applications, you may encounter advanced challenges. Techniques such as creating prompt templates, integrating with vector databases for retrieval-augmented generation (RAG), and setting up function calls for real-time data retrieval can be essential.

<blockquote>
"There’s a lot that goes into building AI applications, and understanding how to work with OpenAI's GPT-40 is just the beginning."
</blockquote>

## Leveraging Libraries and Frameworks

Two noteworthy projects are worth mentioning:

1. **Langford Chain J**: A Java-centric equivalent of LangChain, tailored for deeper AI integrations.
2. **Spring AI**: If you are already using Spring for backend applications, this can seamlessly integrate AI capabilities into your projects.

![](https://image.mux.com/wM5LGAD9LU6kUAN6N5SMMNb02b2yMxu01cciFoGVjf600E/thumbnail.png?time=590.57971014493)

## Conclusion

This was a brief introduction to working with GPT-40 in a pure Java environment. By following these steps, you should be able to set up and interact with OpenAI's API effectively. Happy coding, and don’t forget to explore more advanced techniques as you expand your AI capabilities!

Here is the full code example for your reference, and you can find the [repo here](https://github.com/danvega/hello-gpt).

```java
package dev.danvega;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Application {

    public static void main(String[] args) throws IOException, InterruptedException {
        var apiKey = System.getenv("OPENAI_API_KEY");
        var body = """
                {
                    "model": "gpt-4o",
                    "messages": [
                        {
                            "role": "user",
                            "content": "Tell me a good dad joke about cats"
                        }
                    ]
                }""";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        var client = HttpClient.newHttpClient();
        var response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
    
}
```

By following this guide, you now have the tools and knowledge to build and integrate Java applications with OpenAI’s GPT-4o.