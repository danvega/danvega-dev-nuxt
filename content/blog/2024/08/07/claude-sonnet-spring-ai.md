---
title: Supercharge Your Spring Apps with AI - A Beginner's Guide to Claude 3.5 Sonnet and Spring AI
description: Unlock the power of artificial intelligence in your Java applications with Claude 3.5 Sonnet and Spring AI. This beginner-friendly guide walks you through integrating cutting-edge AI capabilities into your Spring projects, opening up a world of possibilities for smart, responsive applications.
slug: claude-sonnet-spring-ai
date: "2024-08-07T17:00:00.000Z"
published: true
author: Dan Vega
tags: 
  - AI
  - Spring AI
  - Java
cover: ./claude_sonnet_spring_ai_cover.png
# video: https://www.youtube.com/embed/VIDEO_ID
github: https://github.com/danvega/hello-claude
keywords: AI, 
---

In our [previous blog post](https://www.danvega.dev/blog/claude-sonnet-35), I introduced you to Claude 3.5 Sonnet, Anthropic's latest AI model that's revolutionizing the way we interact with artificial intelligence. Today, we're taking it a step further by exploring how to integrate Claude 3.5 Sonnet with Spring applications using [Spring AI](https://spring.io/projects/spring-ai/). This powerful combination opens up a world of possibilities for Java developers looking to incorporate state-of-the-art AI capabilities into their projects.

## Why Choose Claude 3.5 Sonnet and Spring AI?

Before we dive into the code, let's discuss why you might want to use Claude 3.5 Sonnet with Spring AI:

1. **Seamless Integration**: Spring AI provides a clean, intuitive API for working with various AI models, including Claude 3.5 Sonnet, making it easy to incorporate AI capabilities into your Spring applications.

2. **Powerful AI Capabilities**: Claude 3.5 Sonnet offers advanced natural language processing, making it ideal for tasks like code generation, text analysis, and content creation.

3. **Familiar Environment**: For Java developers already comfortable with the Spring ecosystem, using Spring AI feels natural and reduces the learning curve.

4. **Scalability**: Spring's robust architecture combined with Claude 3.5 Sonnet's efficiency allows your AI-powered applications to scale effectively.

5. **Flexibility**: Spring AI's abstraction layer makes it easier to switch between different AI models or providers if needed in the future.

## Setting Up Your Spring AI Project

Let's walk through the process of setting up a Spring Boot project that uses Spring AI to interact with Claude 3.5 Sonnet. We'll create a simple application that generates Java code based on user prompts.

### Step 1: Create a Spring Boot Project

First, set up a new Spring Boot project with the necessary dependencies. You can use [Spring Initializr](https://start.spring.io) or your favorite IDE to create the project. To follow along you will 
only need the `web` dependency. 

### Step 2: Add Spring AI Dependencies

There isn't a starter on the Spring Initializr for Anthropic's Claude so you will need to add it manually. If you're reading this in the future and there is you can add it from the Spring Initializr and skip this step. 

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-anthropic-spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```

### Step 3: Configure Application Properties

Set up your `application.properties` file with the necessary configuration for Claude 3.5 Sonnet. If you want to hard code the key you can but just remember not to commit your API keys. In the example below I have externalized this key to an environment variable and I am referencing it using the `${}` syntax. 

```properties
spring.application.name=hello-claude
spring.ai.anthropic.api-key=${ANTHROPIC_API_KEY}
spring.ai.anthropic.chat.options.model=claude-3-5-sonnet-20240620
```

### Step 4: Create the Chat Controller

Now, let's create a `ChatController` that will handle our AI interactions:

```java
package dev.danvega.claude;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    private final ChatClient chatClient;
    private final GeneratedCodeService codeService;

    public ChatController(ChatClient.Builder builder, GeneratedCodeService codeService) {
        this.chatClient = builder
                .defaultSystem("""
                You are helpful AI assistant for writing code. Each class or method you are
                asked to generate should have a supporting test class to cover that method or
                methods. Please include each test in the result.
                Please generate concise and readable code geared towards beginners.
                """)
                .build();
        this.codeService = codeService;
    }

    @GetMapping("/")
    public Code chat() {
        Code code = chatClient.prompt()
                .user("""
                        Generate a Java class that contains math operations.
                        Please contain more than just the basic 4 arithmetic operations.
                        """)
                .call()
                .entity(Code.class);

        System.out.println(code.code());
        System.out.println(code.test());

        codeService.writeToFile(code.code());
        codeService.writeToFile(code.test());

        return code;
    }
}
```

### Step 5: Create the Generated Code Service

To handle the generated code, we'll create a `GeneratedCodeService`:

```java
package dev.danvega.claude;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeneratedCodeService {

    @Value("${generated.files.path:src/main/resources/generated}")
    private String generatedFilesPath;

    public void writeToFile(String sourceCode) {
        String className = extractClassName(sourceCode);
        if (className == null) {
            throw new IllegalArgumentException("Source Code Does Not Contain a Class Name");
        }

        Path filePath = Paths.get(generatedFilesPath, className + ".java");

        try {
            Files.createDirectories(filePath.getParent());
            Files.writeString(filePath, sourceCode);
            System.out.printf("Class '%s' has been written to %s%n", className, filePath);
        } catch (IOException e) {
            System.err.printf("Error writing to file: %s%n", e.getMessage());
        }
    }

    private String extractClassName(String sourceCode) {
        Pattern pattern = Pattern.compile("class\\s+(\\w+)");
        Matcher matcher = pattern.matcher(sourceCode);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
}
```

### Step 6: Create the Code Record

To structure our generated code and tests, we'll use a simple record:

```java
package dev.danvega.claude;

public record Code(String code, String test) {
}
```

## Running the Application

With everything set up, you can now run your Spring Boot application. When you access the root endpoint ("/"), it will generate a Java class containing math operations along with a corresponding test class.

## Conclusion

Integrating Claude 3.5 Sonnet with Spring AI opens up a world of possibilities for Java developers. From code generation to natural language processing tasks, this powerful combination allows you to leverage cutting-edge AI capabilities within the familiar Spring ecosystem.

As you explore further, consider expanding this example to handle more complex code generation tasks, implement conversational interfaces, or even use Claude 3.5 Sonnet for code review and optimization.

Remember, while AI can significantly boost your productivity, it's essential to review and understand the generated code. Use it as a starting point or inspiration, and always apply your expertise and best practices when incorporating AI-generated code into your projects.

For those who want to dive deeper into the code and explore the full implementation, I've made the complete source code available on my GitHub repository. You can find it at [https://github.com/danvega/hello-claude](https://github.com/danvega/hello-claude). Feel free to clone the repository, experiment with the code, and adapt it to your own projects. Don't hesitate to open issues or submit pull requests if you have any questions or improvements!

We're excited to see what you'll build with Claude 3.5 Sonnet and Spring AI. 

Happy coding!