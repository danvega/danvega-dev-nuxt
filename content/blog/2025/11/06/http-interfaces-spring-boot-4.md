---
title: "HTTP Interfaces in Spring Boot 4: Say Goodbye to Boilerplate"
slug: http-interfaces-spring-boot-4
date: "2025-11-06T09:00:00.000Z"
published: true
description: "Learn how HTTP interfaces let you define declarative HTTP clients in Spring Boot, and discover how Spring Framework 7 eliminates the configuration boilerplate with @ImportHttpServices."
author: "Dan Vega"
tags:
  - Spring Boot
  - Spring Boot 4
  - Spring Framework
cover: http_interfaces_cover.png
video: https://www.youtube.com/embed/TEd5e4Thu7M
github: https://github.com/danvega/sb4-http-interfaces
keywords: spring boot http interfaces, http interfaces spring boot 4, @HttpExchange spring boot, declarative http client spring, spring framework 7 http client, @ImportHttpServices spring, RestClient spring boot, HttpServiceProxyFactory
---

If you're building a Spring Boot application that calls an external API, you've probably written your fair share of 
boilerplate code. You create a RestClient, configure the base URL, write methods for each HTTP operation, handle the 
response parsing... it adds up quickly, especially when you're consuming multiple services.

HTTP interfaces offer a better way. You define a Java interface with annotated methods, and Spring generates a proxy 
that performs the actual HTTP requests. Think of it like Spring Data repositories, but for REST APIs. Spring Framework 7 
takes this even further by eliminating the configuration boilerplate that was previously required.

::GitHubRepo{url="https://github.com/danvega/sb4-http-interfaces"}
Follow along with the complete working example.
::

## What Are HTTP Interfaces?

HTTP interfaces let you define an HTTP client as a Java interface. Instead of writing imperative code to build requests 
and parse responses, you declare what you want with annotations. Spring handles the rest at runtime by creating a proxy implementation.

Here's a quick example. Say you want to consume the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) 
to work with todos. Without HTTP interfaces, you might write something like this:

```java
public class TraditionalTodoService {

    private final RestClient client;

    public TraditionalTodoService(RestClient.Builder builder) {
        this.client = builder
                .baseUrl("https://jsonplaceholder.typicode.com")
                .build();
    }

    public List<Todo> findAll() {
        return client.get()
                .uri("/todos")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
    }

    public Todo findById(Integer id) {
        return client.get()
                .uri("/todos/{id}", id)
                .retrieve()
                .body(Todo.class);
    }

    public Todo create(Todo todo) {
        return client.post()
                .uri("/todos")
                .body(todo)
                .retrieve()
                .body(Todo.class);
    }

    // update, delete, and more...
}
```

This works fine, but it's repetitive. Every CRUD operation follows the same pattern: specify the HTTP method, 
build the URI, set the body if needed, retrieve the response. 
When you have multiple services to consume, this boilerplate multiplies.

With HTTP interfaces, the same functionality looks like this:

```java
@HttpExchange("/todos")
public interface TodoService {

    @GetExchange
    List<Todo> findAll();

    @GetExchange("/{id}")
    Todo findById(@PathVariable Integer id);

    @PostExchange
    Todo create(@RequestBody Todo todo);

    @PutExchange("/{id}")
    Todo update(@PathVariable Integer id, @RequestBody Todo todo);

    @DeleteExchange("/{id}")
    void delete(@PathVariable Integer id);
}
```

That's the entire service definition. No implementation code, no manual request building, no response parsing. You declare 
what endpoints exist and what types they work with, and Spring figures out the rest.

## The Configuration Challenge (Before Spring Framework 7)

HTTP interfaces were introduced in Spring Framework 6, and they immediately reduced the code needed for HTTP clients. 
But there was a catch: you still needed configuration boilerplate to wire everything up.

Here's what that looked like:

```java
@Configuration
public class TraditionalConfig {

    @Bean
    RestClient jsonplaceholderRestClient() {
        return RestClient.builder()
                .baseUrl("https://jsonplaceholder.typicode.com")
                .build();
    }

    @Bean
    HttpServiceProxyFactory jsonPlaceholderProxyFactory(RestClient jsonplaceholderRestClient) {
        return HttpServiceProxyFactory.builder()
                .exchangeAdapter(RestClientAdapter.create(jsonplaceholderRestClient))
                .build();
    }

    @Bean
    TodoService todoService(HttpServiceProxyFactory jsonPlaceholderProxyFactory) {
        return jsonPlaceholderProxyFactory.createClient(TodoService.class);
    }

    @Bean
    PostService postService(HttpServiceProxyFactory jsonPlaceholderProxyFactory) {
        return jsonPlaceholderProxyFactory.createClient(PostService.class);
    }
}
```

For a single service, this isn't terrible. You create a RestClient, wrap it in an HttpServiceProxyFactory, and use that 
factory to generate client proxies. But as you add more services (and more external APIs), this configuration grows. 
You end up with multiple RestClient beans, multiple proxy factories, and a bean definition for every single HTTP interface.

## What's New in Spring Framework 7

Spring Framework 7 introduces the `@ImportHttpServices` annotation, which removes most of this configuration boilerplate. 
Instead of manually creating proxy factories and registering beans, you declare which HTTP interfaces you want and let 
Spring handle the rest.

Here's the modern approach:

```java
@Configuration
@ImportHttpServices(types = {TodoService.class, PostService.class})
public class ModernConfig {

    @Bean
    RestClientHttpServiceGroupConfigurer groupConfigurer() {
        return groups -> {
            groups.forEachClient((group, builder) -> builder
                    .baseUrl("https://jsonplaceholder.typicode.com/")
                    .build());
        };
    }
}
```

That's it. The `@ImportHttpServices` annotation tells Spring which interfaces should become HTTP client proxies. 
The `RestClientHttpServiceGroupConfigurer` bean lets you configure the underlying RestClient for all services in the group.

Behind the scenes, Spring Framework 7 creates a registry layer that handles proxy creation and bean registration automatically. 
You don't need to create the `HttpServiceProxyFactory` yourself or manually define a bean for each HTTP interface.

## Working with Multiple API Providers

The real power of this new approach shows when you're consuming multiple external APIs. You can organize your HTTP 
interfaces into groups, each with its own configuration.

```java
@Configuration
@ImportHttpServices(group = "jsonplaceholder", types = {TodoService.class, PostService.class})
@ImportHttpServices(group = "github", types = {RepoService.class, IssueService.class})
public class MultiApiConfig {

    @Bean
    RestClientHttpServiceGroupConfigurer groupConfigurer() {
        return groups -> {
            groups.filterByName("jsonplaceholder")
                    .forEachClient((group, builder) -> builder
                            .baseUrl("https://jsonplaceholder.typicode.com/")
                            .build());

            groups.filterByName("github")
                    .forEachClient((group, builder) -> builder
                            .baseUrl("https://api.github.com")
                            .defaultHeader("Accept", "application/vnd.github.v3+json")
                            .build());
        };
    }
}
```

Each group can have different base URLs, default headers, timeouts, or any other RestClient configuration. This makes it 
straightforward to work with multiple external services without the configuration explosion you'd face with the traditional approach.

## Putting It All Together

Let's walk through a complete example. First, define your data model using a Java record:

```java
public record Todo(Integer id, Integer userId, String title, boolean completed) {
}
```

Next, create the HTTP interface:

```java
@HttpExchange("/todos")
public interface TodoService {

    @GetExchange
    List<Todo> findAll();

    @GetExchange("/{id}")
    Todo findById(@PathVariable Integer id);

    @PostExchange
    Todo create(@RequestBody Todo todo);

    @PutExchange("/{id}")
    Todo update(@PathVariable Integer id, @RequestBody Todo todo);

    @DeleteExchange("/{id}")
    void delete(@PathVariable Integer id);
}
```

Configure the HTTP service group:

```java
@Configuration
@ImportHttpServices(types = {TodoService.class})
public class HttpClientConfig {

    @Bean
    RestClientHttpServiceGroupConfigurer groupConfigurer() {
        return groups -> {
            groups.forEachClient((group, builder) -> builder
                    .baseUrl("https://jsonplaceholder.typicode.com/")
                    .build());
        };
    }
}
```

Now you can inject `TodoService` anywhere in your application:

```java
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> findAll() {
        return todoService.findAll();
    }

    @GetMapping("/{id}")
    public Todo findById(@PathVariable Integer id) {
        return todoService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo create(@RequestBody Todo todo) {
        return todoService.create(todo);
    }
}
```

When you run the application and make a request to `/api/todos`, Spring will use the generated proxy to call the JSONPlaceholder API and return the results.

## When to Use HTTP Interfaces

HTTP interfaces work well when you're consuming REST APIs with well-defined endpoints. They're particularly useful when:

- You have multiple endpoints on the same service
- You want type-safe method signatures for your HTTP calls
- You prefer declarative code over imperative request building
- You're already familiar with Spring Data repository patterns

The new `@ImportHttpServices` annotation in Spring Framework 7 makes the setup overhead minimal, so there's less 
reason to stick with manual RestClient code.

## Wrapping Up

HTTP interfaces give you a clean, declarative way to consume REST APIs in Spring Boot. Spring Framework 7 and Spring Boot 4 
take this further by eliminating the configuration boilerplate that was previously required. Instead of manually creating 
proxy factories and registering beans, you use `@ImportHttpServices` and let Spring handle the wiring.

If you're upgrading to Spring Boot 4 or starting a new project, HTTP interfaces are worth considering for your external 
API integrations. The code is more readable, there's less to maintain, and the new framework support makes setup trivial.

Happy Coding!