---
title: What's New in Spring AI 1.0.0 M1
description: What's new in Spring AI
slug: spring-ai-m1
date: "2024-06-20T17:00:00.000Z"
published: true
author: Dan Vega
tags:
  - Spring Boot
  - Spring AI
cover: ./spring_ai_m1_03.png
keywords: Spring Framework, Spring Boot, Spring AI, AI, Artificial Intelligence
video: https://youtube.com/embed/De9a-TaJImI
github: https://github.com/danvega/spring-into-ai
---

In this post we're talking about the newest release of Spring AI, which is version 1.0.0 Milestone 1. I had the great pleasure of being in Barcelona for Spring I/O during the release, and I got a firsthand look at some of the new features. I have to say, I'm really impressed. I thought Spring AI was an easy project to use before, but this update makes it even easier to use and more concise. Today, we'll go through the release notes for 1.0.0 M1 and create a new project to showcase a few of these exciting new features.

## Release Notes Overview

First things first, let's quickly glance at the [release notes](https://spring.io/blog/2024/05/30/spring-ai-1-0-0-m1-released) for 1.0.0 Milestone 1 (released on May 30, 2024). We'll be using some of these updates in our project. Some of the notable changes in this release are: 

- ChatClient Fluent API
- Structured Output
- Advisors
- In-Memory Conversational History
- New & Updated AI Models
- New Vector Stores
- Testcontainers Support

### ChatClient Fluent API

If you're familiar with other client classes in Spring, like the `WebClient` or `RestClient`, the new `ChatClient` fluent API will feel very familiar. We start with a builder to get an instance, set some defaults, and then use the fluent API to handle various tasks.

Instead of creating prompts, templates, and managing outputs separately, everything is centralized in this fluent API. For example, to create a prompt and make a call, you can declare a record and immediately get a typed response without extra fussing around.

## Creating a New Project

Let's get our hands dirty by creating a new project using some of the new APIs.

### Step 1: Initialize the Project

Head over to [start.spring.io](https://start.spring.io/) and fill out the required metadata:

- **Group**: dev.dan.vega
- **Artifact**: hello-m1
- **Name**: HelloM1
- **Description**: Demo project for Spring AI 1.0.0 M1
- **Package Name**: dev.danvega.hellom1
- **Packaging**: Jar
- **Java Version**: 21

Add the following dependencies:

- Spring Web
- OpenAI

Generate the project and open it in your favorite IDE (I'm using IntelliJ Ultimate Edition).

### Step 2: Set Up Your Environment

You will need an [OpenAI API key](https://platform.openai.com/) to run the project. Once you have a key you will need to set it in `application.properties`. You could hard code it for a quick test but don't leave it there long. A better approach is to use an environment variable, so you don't leak your API key when you check it into source code control. You will also want to define the model that you want to use and for this example we will use Open AI's latest model `gpt-4o`. 

```properties
spring.application.name=hello-m1
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o
```

### Step 3: Write Some Code

Let's write some code to demonstrate the new features of Spring AI. We'll start by creating a `ChatController`. As we learned earlier to get an instance of the `ChatClient` you can ask Spring to autowire a bean of type `ChatClient.Builder` and there is a default chat client that gets created for you. 

```java
@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder
                .build();
    }

}
```

Once you have an instance of a `ChatClient` you can use the fluent API to set the user message, make a call to the LLM and then declare the response type. In previous versions of Spring AI you had to chain some method calls to get the response as a string, but now you can simply call `.content()`.


```java
@GetMapping("/")
public String joke(@RequestParam(value = "message", defaultValue = "Tell me a dad joke about dogs") String message) {
    return chatClient.prompt()
            .user(message)
            .call()
            .content(); // short for getResult().getOutput().getContent();
}
```


### Step 4: Test the Application

Use an HTTP client tool like Postman or IntelliJ's built-in HTTP client to test the API. Alternatively, you can use `curl` or `HTTPie`.

```shell
$ http :8080/
```

You should get response that includes a funny dad joke about dogs. If something goes wrong take a look at the console output and make sure your properties are set up correctly. 

## Structured Output Handling

One of the coolest new features is the ability to handle structured output. Let's create an example where we ask for an actor's filmography and get paginated results.

First, create a `record` for the structured output:

```java
public record ActorFilms(String actor, List<String> movies) { 
    
}
```

Next, create a new endpoint in the `ChatController` that will respond to `/films`. Instead of using the content method to return a string you can use the `.enttity()` method to map the response to a type. In this case we want the response in the form of record type which includes the actors name a list of movies they have appeared in. 

```java
@RestController
public class ActorController {

    private final ChatClient chatClient;

    public ActorController(ChatClient.Builder builder) {
        this.chatClient = builder
                .build();
    }

    @GetMapping("/films")
    public ActorFilms getActorFilms() {
        return chatClient.prompt()
                .user("Generate a filmography for a Anthony Hopkins.")
                .call()
                .entity(ActorFilms.class);
    }

}
```

Run the application again and use your HTTP client to hit the new endpoint:

```sh
$ http localhost:8080/films
```

You should see a JSON response with the actor's name and a list of movies.


```json
{
    "actor": "Anthony Hopkins",
    "movies": [
        "The Silence of the Lambs",
        "Hannibal",
        "Red Dragon",
        "The Remains of the Day",
        "Nixon",
        "The Mask of Zorro",
        "Meet Joe Black",
        "Thor",
        "The Father",
        "Legends of the Fall",
        "Bram Stoker's Dracula",
        "The Elephant Man",
        "Magic",
        "The World's Fastest Indian",
        "Fracture",
        "The Rite",
        "Westworld (TV series)",
        "Instinct",
        "Proof",
        "The Two Popes"
    ]
}

```

## Streaming Responses

To improve the user experience, especially for long responses, we can stream responses as they're generated. Modify the `ChatController` to include a streaming endpoint:

```java
@GetMapping("/stream")
public Flux<String> stream(@RequestParam(
        value = "message",
        defaultValue = "I'm visiting San Francisco next month, what are 10 places I must visit?") String message) {
    return chatClient.prompt()
            .user(message)
            .stream()
            .content();
}
```

Again, run the application and use `HTTPie` to call the streaming endpoint:

```sh
$ http --stream 8080/stream
```

You'll start receiving responses as they're generated, improving the perceived performance.

## In-Memory Conversational History

It's easy to forget that the web is stateless and doesn't remember our previous conversations. We forget this because we
used products like ChatGPT, and it is able to remember our previous conversations allowing us to continue the conversation with the LLM. You need to remember that this is the product ChatGPT, not the LLM GPT-4o. 

If you were to build out a simple example where you sent a message notifying the LLM of your name and then in the very next message you asked it "What is my name?" it will not be able to tell you. However, If you can send along conversational context it will be able to answer that question. 

Create a new controller called `StatefulContoller` and this time when you're building an instance of the `ChatClient` set a new default advisor that will be able to remember previous conversations: 


```java
@RestController
public class StatefulController {

    private final ChatClient chatClient;

    public StatefulController(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultAdvisors(new MessageChatMemoryAdvisor(new InMemoryChatMemory()))
                .build();
    }

    @GetMapping("/chat")
    public String home(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

}
```

Again, run the application and use `HTTPie` to call the chat endpoint:

```sh
$ http 8080/chat message=="My name is Dan"
```
After it responds run another example where you ask it your name and it should be able to respond. 

```sh
$ http 8080/chat message=="What is my name?"
```

## Conclusion

That's a wrap! Spring AI 1.0.0 M1 brings in a host of new features that make it easier than ever to build intelligent applications. The new fluent API, structured output and in memory advisors are just a few examples of how this release simplifies the development process.

Everything we went through today was so easy to get started with building intelligent applications with Spring AI, and I'm really excited about the future of this project. Be sure to explore and experiment with these new features. They are designed to make your development life easier and more efficient.

I hope you enjoyed this detailed walkthrough. Stay tuned for more updates and tutorials on Spring AI, and always friends...

Happy Coding  
Dan Vega