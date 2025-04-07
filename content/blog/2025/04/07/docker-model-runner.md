---
title: Running AI Models Locally with Docker and Spring AI
description: Learn how to use Docker's Model Runner feature to run AI models locally with your Spring Boot applications, with zero API keys, zero data sharing, and zero monthly fees.
slug: docker-model-runner
date: 2025-04-07T17:00:00.000Z
published: true
author: Dan Vega
tags: 
   - Spring AI
video: https://www.youtube.com/embed/6E6JFLMHcoQ
github: https://github.com/danvega/docker-model-runner
keywords: docker model runner, spring ai, local ai models, spring boot, ai development, gemma, no api key, privacy, docker desktop
---

Are you tired of sending your data to cloud APIs just to use AI in your applications? What if you could run powerful AI models right on your machine with zero API keys, zero data sharing, and zero monthly fees?

Docker Desktop recently introduced an exciting new feature called Model Runner that allows developers to run open-source AI models locally. When combined with Spring AI, this creates a powerful platform for building AI-powered applications that respect privacy, control costs, and simplify development workflows.

In this post, I'll show you how to use Docker's Model Runner feature with Spring Boot applications to create fully local AI experiences in just 15 minutes.

## Why Run AI Models Locally?

Before diving into the technical details, let's consider why running AI models locally matters:

1. **Privacy** - Your data never leaves your machine
2. **Cost control** - No usage-based billing or subscription fees
3. **Reliability** - No dependency on external API availability
4. **Development simplicity** - Test and iterate without API keys or quotas
5. **Learning opportunity** - Understand how AI models actually work

For Spring developers building modern applications, this local approach provides a compelling alternative to cloud-based AI services while maintaining all the benefits of Spring's programming model.

## Understanding Docker Model Runner

Docker Model Runner is a plugin for Docker Desktop that allows you to:

* Pull open-source models from Docker Hub
* Run models directly from the command line
* Manage local model installations
* Interact with models via prompts or chat mode
* Access models via an OpenAI-compatible API endpoint

Currently, Docker Model Runner only works on Docker Desktop for Mac with Apple Silicon (M1/M2/M3/M4 chips), but support for other platforms is coming soon.

## Setting Up Docker for Local AI

To get started, you'll need Docker Desktop 4.40 or later. Once installed, follow these steps:

1. Open Docker Desktop
2. Navigate to Settings → Features in development (Beta tab)
3. Enable "Docker Model Runner"
4. Also enable "Enable host-side TCP support" (leave the default port of 12434)
5. Apply and restart Docker Desktop

Once configured, you can pull your first model using the Docker CLI:

```bash
docker model pull ai/gemma3
```

This will download Google's Gemma 3 model, which is a good balance of capability and resource usage. You can check which models you have installed with:

```bash
docker model list
```

To test your setup, try running the model in interactive mode:

```bash
docker model run ai/gemma3
```

This launches an interactive chat session where you can directly interact with the model right in your terminal:

```
> What is an interesting fact about Docker?
Docker was originally developed as an internal project at a company called dotCloud, 
which was a Platform-as-a-Service company. The technology was later open-sourced in 2013 
and became immensely popular, eventually leading to dotCloud pivoting their entire 
business to focus on Docker. This pivot transformed the company into Docker, Inc.
```

## Creating a Spring Boot Application with Spring AI

Now let's create a Spring Boot application that connects to this locally running model. The first step is to initialize a new project with the right dependencies:

1. Visit [https://start.spring.io](https://start.spring.io)
2. Choose Maven, Java 17+, and the latest Spring Boot version
3. Add the following dependencies:
    - Spring Web
    - Spring AI OpenAI (we'll use the OpenAI client since Docker exposes an OpenAI-compatible API)

Your `pom.xml` should include these key dependencies:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>

<!-- In the dependency management section -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>${spring-ai.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### Configuration

The crucial step is configuring Spring AI to connect to your local Docker model instead of the actual OpenAI API. Add these properties to your `application.properties` file:

```properties
spring.ai.openai.api-key=_
spring.ai.openai.chat.base-url=http://localhost:12434/engines/llama.cpp
spring.ai.openai.chat.options.model=ai/gemma3
```

Let's break down what each property does:

1. `spring.ai.openai.api-key=_` - We need to provide a value here because Spring AI expects it, but since we're not actually connecting to OpenAI, any value works
2. `spring.ai.openai.chat.base-url=http://localhost:12434/engines/llama.cpp` - Points to the local Docker Model Runner API endpoint
3. `spring.ai.openai.chat.options.model=ai/gemma3` - Specifies which model to use

### Application Code

With our configuration in place, we can write a simple application to test the integration. Here's a basic example using Spring's `CommandLineRunner` to prompt the model after startup:

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ChatClient.Builder builder) {
        return args -> {
            var client = builder.build();
            String response = client.prompt("When was Docker created?")
                    .call()
                    .content();

            System.out.println(response);
        };
    }
}
```

This minimal example:
1. Creates a Spring Boot application
2. Configures a `CommandLineRunner` that executes after startup
3. Uses Spring AI's `ChatClient` to send a prompt to the AI model
4. Prints the model's response to the console

The beauty of this approach is that you're using Spring AI's abstractions, which means your code remains identical whether you're using a local model or a cloud-based one. If you later decide to switch to actual OpenAI or another provider, you only need to change your configuration, not your code.

## Running the Application

To run the application, make sure Docker Desktop is running with your model pulled, then use:

```bash
./mvnw spring-boot:run
```

You should see output similar to:

```
Docker was officially created in July of 2013. Here's a breakdown of the key milestones:

1. The project began as an internal project at dotCloud, a Platform-as-a-Service company
2. Solomon Hykes presented Docker at PyCon in March 2013 with the famous "Docker in 5 minutes" demo
3. The open-source release was in March 2013
4. Docker, Inc. (the company) was officially formed in July 2013 when dotCloud pivoted to focus on Docker

Docker's containerization technology quickly gained popularity because it solved many deployment challenges by packaging applications with their dependencies, making them portable across different environments.
```

## Beyond Basic Integration

Once you have the basic integration working, you can expand your application in several ways:

### Building a Conversational Interface

Instead of one-off prompts, you can create a conversational interface by adding memory:

```java
@RestController
public class ChatController {

    private final ChatClient chatClient;
    private final InMemoryChatMemory memory = new InMemoryChatMemory();

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultAdvisors(new MessageChatMemoryAdvisor(memory))
                .build();
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String prompt) {
        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}
```

### Streaming Responses

For a more interactive experience, you can stream responses as they're generated:

```java
@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> stream(@RequestParam String prompt) {
    return chatClient.prompt()
            .user(prompt)
            .stream()
            .content();
}
```

## Performance Considerations

Local AI performance depends heavily on your hardware. Apple Silicon Macs with 16GB+ RAM generally provide good performance with smaller models like Gemma 3. If you encounter performance issues:

1. Try smaller models (Gemma 3 is a good starting point)
2. Close other memory-intensive applications
3. Adjust Docker Desktop's resource allocation
4. Consider using quantized models (smaller, faster, but slightly less accurate)

## Troubleshooting Common Issues

### Missing Docker Model Command

If your system doesn't recognize the `docker model` command, create a symlink:

```bash
ln -s /Applications/Docker.app/Contents/Resources/cli-plugins/docker-model ~/.docker/cli-plugins/docker-model
```

### Connection Refused Errors

If your Spring application can't connect to the Docker Model Runner API, check:

1. Docker Desktop is running
2. The "Enable host-side TCP support" option is enabled
3. The model is running (check with `docker model list`)
4. Your base URL configuration is correct

## Conclusion

Running AI models locally with Docker Model Runner and Spring AI creates a powerful combination for development. It lets you:

- Keep sensitive data on your machine
- Develop without API keys or rate limits
- Maintain full control over your AI infrastructure
- Use Spring's programming model for AI applications

While these locally-run models may not match the capabilities of the latest cloud-based offerings, they're more than sufficient for many applications and provide an excellent development environment.

As Docker expands Model Runner support to more platforms and as open-source models continue to improve, this local approach to AI will become increasingly viable even for production use cases.

Ready to try it yourself? Check out the [complete example on GitHub](https://github.com/danvega/docker-model-runner) and the [Docker Model Runner documentation](https://docs.docker.com/desktop/features/model-runner/).

Happy coding!