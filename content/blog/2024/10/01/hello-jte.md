---
title: "Introducing JTE: The Latest Template Engine in Spring Boot"
description: "Explore JTE, the new Java Template Engine now available in Spring Initializer. Learn its benefits, how to get started, and why you might choose it for your next Spring Boot project."
slug: hello-jte
date: 2024-10-01T20:00:00.000Z
published: true
author: "Dan Vega"
tags: 
  - Spring Boot
  - Java
video: https://www.youtube.com/embed/KoWgHSWA1cc
keywords: Spring Framework, Spring Initializr, Spring Boot, Spring MVC, Java Template Engine, JTE
---

As Java developers, we're always on the lookout for tools that can enhance our productivity and improve our application's performance. Today, we're excited to introduce you to JTE (Java Template Engine), the latest addition to the Spring Initializer family. In this post, we'll explore what JTE is, how to get started with it in Spring Boot, and why you might want to consider it for your next project.

## What is JTE?

JTE is a modern, lightweight Java template engine that's designed to be both powerful and easy to use. It's been available for use with Spring Boot for a while, but its recent addition to the Spring Initializer makes it more accessible than ever.

Some key features and benefits of JTE include:

1. **Performance**: JTE compiles templates to Java bytecode, resulting in efficient runtime execution.
2. **Compile-time checking**: Catch errors at compile time rather than runtime.
3. **Simple syntax**: Easy for Java developers to pick up quickly.
4. **Lightweight**: Minimal overhead and dependencies.
5. **Hot reloading**: See changes immediately without restarting your application.
6. **Pre-compilation**: Improve startup times by pre-compiling templates.
7. **Explicit over implicit**: Declare variables at the top of templates for better documentation.

## Getting Started with JTE in Spring Boot

Let's walk through setting up a basic Spring Boot application with JTE:

1. Head to [start.spring.io](https://start.spring.io).
2. Choose your project settings (Java, latest Spring Boot version).
3. Add the "Web" dependency.
4. In the dependencies search, type "template" and select "JTE".
5. Generate and download the project.

Once you've opened the project in your IDE, create a simple controller:

```java
@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("name", "Dan");
        return "index";
    }
}
```

Now, create a template file `src/main/jte/index.jte`:

```html
@param String name

<!DOCTYPE html>
<html>
<head>
    <title>Hello JTE</title>
</head>
<body>
    <h1>Hello, ${name}!</h1>
</body>
</html>
```

## Working with JTE Templates

JTE's syntax is designed to be intuitive for Java developers. Let's explore some key features:

### Passing Variables to Templates

You can pass variables to your templates using the `@param` directive:

```html
@param String name

<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <meta name="description" content="">
</head>
<body>
    <h1>Hello, ${name}!</h1>
</body>
</html>
```

### Using Records for Structured Data

JTE works seamlessly with Java records, making it easy to pass structured data to your templates:

```java
public record Page(String title, String description) {}

// In your controller
model.addAttribute("page", new Page("Hello JTE", "Welcome to JTE"));
```

```html
```html
@param String name
@param Page page

<!DOCTYPE html>
<html>
<head>
    <title>${page.title()}</title>
    <meta name="description" content="${page.description()}">
</head>
<body>
    <h1>Hello, ${name}!</h1>
</body>
</html>
```

### Iterating Over Collections

JTE provides a simple syntax for iterating over collections:

```html
@param List<String> items

<ul>
@if(items.isEmpty())
    <li>You have no items</li>
@else
    @for(String item : items)
        <li>${item}</li>
    @endfor
@endif
</ul>
```

## JTE vs Other Template Engines

While template engines like Thymeleaf have been popular choices in the Spring ecosystem, JTE offers some compelling advantages:

1. **Performance**: JTE's compilation to bytecode can lead to better performance, especially in high-traffic applications.
2. **Simpler syntax**: Many developers find JTE's syntax more intuitive and closer to writing Java code.
3. **Compile-time checking**: Catch more errors before runtime, improving development efficiency.
4. **Hot reloading**: See changes immediately without restarting your application, enhancing the development experience.

## Conclusion

JTE brings a fresh approach to templating in the Spring Boot ecosystem. Its performance benefits, developer-friendly syntax, and seamless integration with Java features make it an attractive option for both new and experienced Spring developers.

As you plan your next Spring Boot project, consider giving JTE a try. Its addition to the Spring Initializer makes it easier than ever to get started, and you might find that it streamlines your development process and improves your application's performance.

Have you used JTE before? Are you excited to try it out in your next project? We'd love to hear your thoughts and experiences in the comments below!

Happy coding!