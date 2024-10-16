---
title: "Building a Streaming Chat Bot with Spring Boot and Spring AI"
description: "Learn how to create a responsive and engaging chat bot using Spring Boot and Spring AI, featuring both traditional and streaming response capabilities for an enhanced user experience."
slug: spring-ai-streaming-chatbot
date: 2024-10-08T20:00:00.000Z
published: true
author: "Dan Vega"
tags:
    - Spring Boot
    - Java
    - Spring AI
video: https://www.youtube.com/embed/q2p0mG4RICM
keywords: Spring Framework, Spring Boot, Java, Spring AI, Streaming, Chat Bot, LLM, Anthropic, Claude, WebFlux
---

In the world of AI-powered applications, responsiveness and user experience are crucial. When interacting with Large Language Models (LLMs), users expect quick feedback and a natural conversational flow. This is where streaming responses come into play. In this tutorial, we'll explore how to build a streaming chat bot using Spring Boot and Spring AI, providing a seamless and engaging user experience.

## Why Streaming Matters

Imagine typing a query into ChatGPT and waiting for the entire response to be generated before seeing anything on your screen. That wouldn't be very user-friendly, would it? Streaming allows us to display the AI's response as it's being generated, giving users immediate feedback and a more interactive experience.

## Enter Spring AI

Spring AI is a powerful library that simplifies working with various LLMs, providing a portable chat completion API. This means you can easily switch between different AI providers (like Anthropic, OpenAI, or Google Gemini) without changing your core application code. Today, we'll be using Anthropic's Claude 3.5 Sonnet model, but the concepts apply to other LLMs as well.

## Setting Up the Project

Let's start by creating a new Spring Boot project:

1. Go to [start.spring.io](https://start.spring.io)
2. Choose the following options:
    - Project: Maven
    - Language: Java
    - Spring Boot: 3.3.4 (or the latest version)
    - Group: dev.danvega (use your own group ID)
    - Artifact: streaming
    - Java version: 23 (or your preferred version)
3. Add the following dependencies:
    - Spring Web
    - Spring AI OpenAI (we'll change this to the Anthropic starter later)

Generate the project and open it in your favorite IDE.

## Configuring the Project

First, let's update the `pom.xml` file to use the Anthropic starter:

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-anthropic-spring-boot-starter</artifactId>
</dependency>
```

Next, configure the `application.properties` file:

```properties
spring.ai.anthropic.api-key=${ANTHROPIC_API_KEY}
spring.ai.anthropic.chat.options.model=claude-3-5-sonnet-20240620
```

Make sure to set the `ANTHROPIC_API_KEY` environment variable with your actual API key.

## Building the Chat Bot

Let's create a `ChatController` class to handle our chat requests:

```java
@RestController
@CrossOrigin
public class ChatController {
    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @PostMapping("/chat")
    public String chat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

    @GetMapping("/stream")
    public Flux<String> chatWithStream(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }
}
```

This controller provides two endpoints:
- `/chat`: A traditional, non-streaming endpoint
- `/stream`: A streaming endpoint that returns a `Flux<String>`

The key difference is in the use of `.call()` for non-streaming and `.stream()` for streaming responses.

## Frontend Implementation

To demonstrate the difference between streaming and non-streaming responses, let's create two HTML files in the `src/main/resources/static` directory:

1. `index.html` (non-streaming):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dan's Chatbot</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 h-screen flex flex-col">
    <div class="flex-1 overflow-y-auto p-4">
        <div id="chat-messages" class="space-y-4">
            <pre></pre>
        </div>
    </div>
    <div class="p-4 bg-white">
        <form hx-post="/chat" hx-target="#chat-messages" hx-swap="beforeend">
            <div class="flex space-x-4">
                <input type="text" name="message" class="flex-1 border rounded p-2" placeholder="Type your message...">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
            </div>
        </form>
    </div>
    <script>
        document.body.addEventListener('htmx:afterRequest', function(event) {
            if (event.detail.elt.getAttribute('name') === 'message') {
                event.detail.elt.value = '';
            }
        });
    </script>
</body>
</html>
```

2. `stream.html` (streaming):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dan's Streaming Chatbot</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 h-screen flex flex-col">
    <div class="flex-1 overflow-y-auto p-4">
        <div id="chat-messages" class="space-y-4"></div>
    </div>
    <div class="p-4 bg-white">
        <form id="chat-form">
            <div class="flex space-x-4">
                <input type="text" id="message-input" class="flex-1 border rounded p-2" placeholder="Type your message...">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
            </div>
        </form>
    </div>
    <script>
        const chatMessages = document.getElementById('chat-messages');
        const chatForm = document.getElementById('chat-form');
        const messageInput = document.getElementById('message-input');

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = messageInput.value;
            messageInput.value = '';

            // Add user message to chat
            chatMessages.innerHTML += `<div class="bg-blue-100 p-2 rounded"><strong>You:</strong> ${message}</div>`;

            // Add AI message container
            const aiMessageContainer = document.createElement('div');
            aiMessageContainer.className = 'bg-green-100 p-2 rounded';
            aiMessageContainer.innerHTML = '<strong>AI:</strong> ';
            const aiMessageContent = document.createElement('span');
            aiMessageContainer.appendChild(aiMessageContent);
            chatMessages.appendChild(aiMessageContainer);

            try {
                const response = await fetchStreamWithRetry(`/stream?message=${encodeURIComponent(message)}`);
                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    const decodedChunk = decoder.decode(value, { stream: true });
                    aiMessageContent.textContent += decodedChunk;
                }
            } catch (error) {
                console.error('Error:', error);
                aiMessageContent.textContent += 'Error occurred while fetching the response.';
            }

            chatMessages.scrollTop = chatMessages.scrollHeight;
        });

        async function fetchStreamWithRetry(url, retries = 3) {
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await fetch(url);
                    if (response.ok) return response;
                } catch (error) {
                    if (i === retries - 1) throw error;
                }
            }
        }
    </script>
</body>
</html>
```

## Demonstrating the Chat Bot

Now that we have both streaming and non-streaming implementations, let's compare them:

1. Run the Spring Boot application.
2. Open `http://localhost:8080` for the non-streaming version and `http://localhost:8080/stream.html` for the streaming version.
3. Try asking the same question on both pages, such as "Write a short overview of the Java programming language and what it is used for."

You'll notice that the non-streaming version waits for the entire response before displaying it, while the streaming version shows the response as it's being generated. This immediate feedback creates a much better user experience, especially for longer responses.

## Conclusion

Building a streaming chat bot with Spring Boot and Spring AI is surprisingly simple. The key advantages of this approach include:

1. **Better user experience**: Immediate feedback keeps users engaged.
2. **Flexibility**: Spring AI's portable API makes it easy to switch between different LLMs.
3. **Simplicity**: The Spring ecosystem simplifies configuration and implementation.
4. **Scalability**: Built on Spring WebFlux, the streaming solution can handle many concurrent connections efficiently.

As AI becomes more integral to our applications, tools like Spring AI will be crucial in simplifying integration and improving user experiences. I encourage you to explore Spring AI further and consider how streaming responses can enhance your own AI-powered applications.

Remember, the world of AI is rapidly evolving, and Spring AI is keeping pace. Stay curious, keep experimenting, and happy coding!