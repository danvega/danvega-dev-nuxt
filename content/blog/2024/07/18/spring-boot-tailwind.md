---
title: How to add Tailwind CSS to your Spring Boot Application
description: This is an example of how to use Tailwind CSS in your next Spring Boot application. If you just want to get up and running with Tailwind CSS you can use a CDN but this should only be used for prototyping because you will end up shipping a very large css file to production. In this tutorial you will learn how to introduce a build process to only use the styles you are using.
slug: spring-boot-tailwind
date: "2024-07-18T17:00:00.000Z"
published: true
author: Dan Vega
tags:
  - Spring Boot
  - Tailwind CSS
cover: ./spring-boot-tailwind.jpeg
video: https://www.youtube.com/embed/6_6AIzxPXvQ
keywords: Spring Framework, Spring Boot, Tailwind CSS, Frontend
---

As a Spring Boot developer, you may have found yourself in a situation where you need to add some styling to your web application. One popular CSS framework that has gained a lot of traction in recent years is [Tailwind CSS](https://tailwindcss.com/). In this article, we'll explore how you can integrate Tailwind CSS into your Spring Boot application, ensuring that you only include the styles you need in your production build.

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes that you can use to style your HTML elements. Unlike traditional CSS frameworks like Bootstrap, which provide a set of pre-designed components, Tailwind CSS focuses on providing low-level utility classes that you can combine to create your own custom designs.

One of the key benefits of Tailwind CSS is that it allows you to write your styles directly in your HTML, which can make it easier to reason about your application's styling and reduce the amount of CSS you need to write. However, this approach can also lead to a larger CSS file being shipped to production, which is why we'll be exploring a build process to optimize our CSS output.

## Getting Started & Prerequisites

First things first, check out this repo which has all the instructions we'll go through today. You will need to have Node and NPM installed. To verify that they are installed you can run the following commands. If you need to install them I would suggest using a tool like [Node Version Manager](https://github.com/nvm-sh/nvm).

```shell
node -v # v20.2.0
npm -v # 9.8.1
```

## Setting Up a Spring Boot Project with Tailwind CSS

To get started, we'll create a new Spring Boot project using the [Spring Initializr](https://start.spring.io/). We'll choose the following options:

*   Project: Maven Project
*   Language: Java
*   Spring Boot: Latest version
*   Dependencies: Web, Thymeleaf, and Spring Boot DevTools

Once we have our project set up, we'll need to create a new folder called "frontend" in the "src/main" directory. This is where we'll be doing our Tailwind CSS setup and development.

### Installing Tailwind CSS

The easiest way to get up and running with Tailwind is to include the CDN.

```html
<script src="https://cdn.tailwindcss.com"></script>
```

You can just use the CDN if you're prototyping something out but if this is a real world project you don't want to do that. When you include the CDN you get all the Tailwind CSS utility classes even if you're not using them. What you will want to do is create a new npm project, so you can introduce a build process. 

Inside the "frontend" folder, we'll need to initialize a new npm project by running the following command in the terminal:

```shell
npm init -y
```

This will create a new `package.json` file in the `/src/main/frontend` directory. Next, we'll install Tailwind CSS as a development dependency:

```shell
npm install -D tailwindcss
```

With Tailwind CSS installed, we can now generate the initial Tailwind CSS configuration file by running the following command:

```shell
npx tailwindcss init
```

This will create a new `tailwind.config.js` file in the frontend folder. You'll need to update this file to tell Tailwind CSS where to find our HTML templates. All of your templates will be in `/src/main/resources/templates` so you can update the `content` value as shown below.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../resources/templates/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Creating the CSS File

Now that we have Tailwind CSS set up, we can create a new CSS file in the `frontend` folder called `styles.css`. In this file, we'll add the following Tailwind CSS directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These directives will import all the necessary Tailwind CSS styles into our CSS file.

### Building the CSS for Production

To optimize our CSS for production, we'll need to set up a build process that will only include the Tailwind CSS classes that we're actually using in our HTML templates. We can do this by adding two new scripts to our "package.json" file:

```json
"scripts": {
  "build": "tailwindcss -i ./styles.css -o ../resources/static/main.css --minify",
  "watch": "tailwindcss -i ./styles.css -o ../resources/static/main.css --watch"
}
```

The `build` script will take our `styles.css` file, process it through Tailwind CSS, and output the final CSS file to the `src/main/resources/static` directory. The `--minify` option will also minify the output CSS file. The `watch` script is similar, but it will continuously watch for changes in our HTML templates and rebuild the CSS file whenever something changes.

Now, we can run the "watch" script in our terminal to start the build process:

```shell
npm run watch
```

This will start the Tailwind CSS build process and keep it running in the background, automatically updating the `main.css` file whenever we make changes to our HTML templates.

### Creating a Thymeleaf Template

With our Tailwind CSS setup complete, we can now create a new Thymeleaf template in the `src/main/resources/templates` directory called `index.html`. In this template, we'll use some Tailwind CSS classes to style our content:

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spring Boot Tailwind</title>
  <link rel="stylesheet" th:href="@{/main.css}">
</head>
<body class="bg-slate-50">
  <header class="bg-white container mx-auto py-8">
    <h1 class="text-4xl font-bold px-4">Welcome to Spring Boot Tailwind</h1>
  </header>
</body>
</html>
```

In this template, we're using Tailwind CSS classes to set the background color of the body, create a white header with some padding, and style the main heading.

### Creating a Spring Boot Controller

To render our Thymeleaf template, we'll need to create a Spring Boot controller. In the "src/main/java" directory, create a new package called "com.example.springboottailwind" (or whatever your package name is) and a new class called "HomeController":

```java
@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

}
```

This controller simply maps the root URL ("/") to the "index" Thymeleaf template that we created earlier.

### Running the Application

Now that we have everything set up, we can run our Spring Boot application. In the terminal, navigate to the root of your project and run the following command:

```shell
./mvnw spring-boot:run
```

This will start the Spring Boot application and you should be able to access it at [http://localhost:8080](http://localhost:8080). You should see the Tailwind CSS-styled header and background that we defined in our Thymeleaf template.

## Optimizing for Production

The setup we've done so far is great for development, but we still need to optimize our CSS for production. To do this, we'll use the [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin), which will handle the installation of Node.js and npm, as well as running the Tailwind CSS build process as part of our Maven build.

First, we'll need to add a few properties to our `pom.xml` file to specify the versions of Node.js and npm we want to use:

```xml
<properties>
  <node.version>v16.13.0</node.version>
  <npm.version>8.1.0</npm.version>
</properties>
```

Next, we'll add the frontend-maven-plugin configuration to our `pom.xml` file:

```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.15.0</version>
    <executions>

        <execution>
            <id>install node and npm</id>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <phase>generate-resources</phase>
            <configuration>
                <nodeVersion>${node.version}</nodeVersion>
                <npmVersion>${npm.version}</npmVersion>
            </configuration>
        </execution>

        <execution>
            <id>npm install</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <phase>generate-resources</phase>
            <configuration>
                <arguments>install</arguments>
            </configuration>
        </execution>

        <execution>
            <id>npm build</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <phase>generate-resources</phase>
            <configuration>
                <arguments>run build</arguments>
            </configuration>
        </execution>

    </executions>
    <configuration>
        <nodeVersion>${node.version}</nodeVersion>
        <workingDirectory>src/main/frontend</workingDirectory>
        <installDirectory>target</installDirectory>
    </configuration>
</plugin>
```

This configuration will ensure that Node.js and npm are installed, the necessary npm dependencies are installed, and the Tailwind CSS build process is run as part of the Maven build. Now, when you run the following command in the terminal:

```shell
./mvnw clean package
```

Maven will handle the entire build process, including the Tailwind CSS optimization. The final `main.css` file will be generated in the `src/main/resources/static` directory and will only include the Tailwind CSS classes that are used in your application.

## Conclusion

In this blog post, we've explored how to integrate Tailwind CSS into a Spring Boot application, ensuring that we only include the styles we need in our production build. By setting up a build process using the frontend-maven-plugin, we can automate the installation of Node.js and npm, as well as the Tailwind CSS build process, making it easy to maintain and deploy our application.

If you're interested in learning more about Tailwind CSS or exploring other Spring Boot projects, be sure to check out the [GitHub repository](https://github.com/danvega/spring-boot-tailwind) and the [Tailwind CSS website](https://tailwindcss.com/). And don't forget to subscribe to my [newsletter](https://www.danvega.dev/newsletter) for more Spring Boot and web development content!