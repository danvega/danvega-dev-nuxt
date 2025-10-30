---
title: "Testing Spring REST APIs with RestTestClient: A Complete Guide"
slug: spring-framework-7-rest-test-client
date: "2025-10-30T09:00:00.000Z"
published: true
description: "Explore the new Rest Test Client in Spring Framework 7, a modern replacement for RestTemplate that provides a fluent API for testing REST APIs with improved type safety and better integration with modern testing practices."
author: Dan Vega
tags:
  - Spring Framework
  - Spring Boot
  - Testing
cover: spring_boot_4_rest-test-client.png
keywords: Spring Framework 7, Rest Test Client, Spring Testing, RestTemplate, MockMvc, Spring Boot Testing, REST API Testing, Integration Testing
---

# Testing Spring REST APIs with RestTestClient: A Complete Guide

Spring Framework 7 and Spring Boot 4 are on the horizon, bringing exciting new features to the Spring ecosystem. 
One standout addition is `RestTestClient`, a unified testing tool that makes testing REST APIs simpler and more intuitive 
than ever before. If you've struggled with choosing between MockMvc, WebTestClient, or TestRestTemplate, 
this new tool is about to make your life much easier.

::GitHubRepo{url="https://github.com/danvega/rest-test-client"}
Follow along with the complete working example.
::


## What is RestTestClient?

Think of RestTestClient as the Swiss Army knife of REST API testing in Spring. It combines the best features of MockMvc and WebTestClient into one consistent, fluent API that works across all types of tests - from lightning-fast unit tests to comprehensive end-to-end integration tests.

The beauty of RestTestClient lies in its simplicity. Instead of learning multiple testing tools, you now have one clean API that adapts to different testing scenarios. Whether you're testing a controller in isolation or the entire application stack with a real database, the syntax remains consistent and readable.

## The Five Testing Approaches

RestTestClient offers five different ways to test your REST APIs, each serving a specific purpose. Let's explore them from fastest to most comprehensive.

### 1. Unit Testing with bindToController

This is your go-to for pure unit tests. It tests just your controller logic without any Spring magic, validation, or security. It's incredibly fast because there's no Spring context to load.

Here's a simple example with a controller that has no dependencies:

```java
public class TodoSimpleControllerTest {

    RestTestClient client;

    @BeforeEach
    public void setup() {
        client = RestTestClient.bindToController(new TodoSimpleController()).build();
    }

    @Test
    public void findAllTodos() {
        List<Todo> todos = client.get()
                .uri("/api/todos/simple/")
                .exchange()
                .expectStatus().isOk()
                .expectBody(new ParameterizedTypeReference<List<Todo>>() {})
                .returnResult()
                .getResponseBody();

        assertEquals(1, todos.size());
        assertEquals("First Todo", todos.get(0).title());
    }
}
```

**Important:** If your controller has dependencies like services or repositories, you'll need to mock them manually since Spring isn't involved. You can't use `@MockBean` here because there's no Spring context:

```java
public class TodoControllerMockTest {

    RestTestClient client;
    TodoService todoService;

    @BeforeEach
    public void setup() {
        // Manual mocking required - @MockBean won't work without Spring!
        todoService = Mockito.mock(TodoService.class);
        when(todoService.findAll()).thenReturn(
                List.of(new Todo(1L, 1L, "First Todo", true))
        );
        client = RestTestClient.bindToController(new TodoController(todoService)).build();
    }

    @Test
    public void findAllTodos() {
        List<Todo> todos = client.get()
                .uri("/api/todos/")
                .exchange()
                .expectStatus().isOk()
                .expectBody(new ParameterizedTypeReference<List<Todo>>() {})
                .returnResult()
                .getResponseBody();

        assertEquals(1, todos.size());
        assertEquals("First Todo", todos.get(0).title());
    }
}
```

**When to use:** Quick unit tests for controller logic when you don't need Spring features.

### 2. Spring MVC Testing with bindToMockMvc

This approach brings Spring MVC into the picture, allowing you to test validation, security, and exception handling while still keeping your tests relatively fast.

```java
@WebMvcTest(TodoController.class)
public class TodoControllerMvcTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private TodoService todoService;
    
    @Test
    void shouldValidateInput() {
        RestTestClient client = RestTestClient.bindTo(mockMvc).build();
        
        // Test validation - empty title should fail
        client.post().uri("/api/todos/")
            .body(new Todo(null, null, "", false))
            .exchange()
            .expectStatus().isBadRequest();
    }
}
```

**When to use:** Testing validation rules, security configurations, or custom error handling.

### 3. Integration Testing with bindToApplicationContext

Here's where things get real. This approach loads your entire Spring application context, including real services and database connections, but without starting an actual web server.

```java
@SpringBootTest // Full Spring context, but NO server by default
public class TodoControllerContextTest {

    @Autowired
    private WebApplicationContext context;

    RestTestClient client;
    @Autowired
    private TodoService todoService;

    @BeforeEach
    public void setup(WebApplicationContext context) {
        client = RestTestClient.bindToApplicationContext(context).build();
    }

    @Test
    void findAllTodos() {
        List<Todo> todos = client.get()
                .uri("/api/todos/")
                .exchange()
                .expectStatus().isOk()
                .expectBody(new ParameterizedTypeReference<List<Todo>>() {})
                .returnResult()
                .getResponseBody();

        assertEquals(200, todos.size());
        assertEquals("delectus aut autem", todos.get(0).title());
    }

}
```

**When to use:** Testing the complete flow including database operations and service logic.

### 4. End-to-End Testing with bindToServer

This is as real as it gets - a full server starts up, listening on an actual port, processing real HTTP requests. It's the most comprehensive but also the slowest approach.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TodoControllerServerTest {

    @LocalServerPort
    private int port;

    private RestTestClient client;

    @BeforeEach
    public void setup() {
        client = RestTestClient.bindToServer()
                .baseUrl("http://localhost:" + port)
                .build();
    }

    @Test
    void findAllTodos() {
        List<Todo> todos = client.get()
                .uri("/api/todos/")
                .exchange()
                .expectStatus().isOk()
                .expectBody(new ParameterizedTypeReference<List<Todo>>() {})
                .returnResult()
                .getResponseBody();

        assertEquals(200, todos.size());
        assertEquals("delectus aut autem", todos.get(0).title());
        assertFalse(todos.get(0).completed());
    }

    @Test
    void findTodoById() {
        client.get()
                .uri("/api/todos/1")
                .exchange()
                .expectStatus().isOk()
                .expectBody(Todo.class)
                .value(todo -> {
                    assertEquals(1L, todo.id());
                    assertEquals("delectus aut autem", todo.title());
                    assertFalse(todo.completed());
                    assertEquals(1L, todo.userId());
                });
    }

}
```

**When to use:** Testing HTTP-specific features like CORS, compression, or when you need the most realistic test environment.

### 5. Functional Endpoints with bindToRouterFunction

If you're using Spring WebFlux's functional programming model with RouterFunction, this approach is for you.

```java
@Test
void shouldTestFunctionalEndpoint() {
    RouterFunction<ServerResponse> routes = RouterFunctions.route()
        .GET("/api/todos", todoHandler::getAllTodos)
        .build();
    
    RestTestClient client = RestTestClient.bindToRouterFunction(routes).build();
    
    client.get().uri("/api/todos")
        .exchange()
        .expectStatus().isOk();
}
```

**When to use:** Only when testing functional reactive endpoints (not @RestController).

## Which Approach Should You Choose?

Here's a simple decision guide:

| Testing Need | Use This Approach | Speed |
|-------------|------------------|-------|
| Quick controller logic test | `bindToController` | ⚡ Fastest |
| Test with validation/security | `bindToMockMvc` | 🚀 Fast |
| Test with real database | `bindToApplicationContext` | 🐢 Slower |
| Test HTTP features (CORS, etc.) | `bindToServer` | 🐌 Slowest |

Remember the testing pyramid: write many unit tests, some integration tests, and few end-to-end tests.

## Migrating from Older Tools

If you're currently using MockMvc or TestRestTemplate, migrating to RestTestClient is straightforward:

```java
// Old MockMvc way
mockMvc.perform(get("/api/todos"))
    .andExpect(status().isOk());

// New RestTestClient way
RestTestClient.bindTo(mockMvc)
    .get().uri("/api/todos")
    .exchange()
    .expectStatus().isOk();
```

The syntax is cleaner, more intuitive, and the fluent API makes tests easier to read and write.

## Common Pitfalls to Avoid

**Don't use @MockBean without Spring:**
```java
// ❌ Won't work - no Spring context
public class Test {
    @MockBean TodoService service;
}

// ✅ Works - Spring context exists
@WebMvcTest
public class Test {
    @MockBean TodoService service;
}
```

**Choose the right tool for HTTP features:**
```java
// ❌ CORS won't work here
bindToMockMvc()

// ✅ Use this for CORS/headers
bindToServer()
```

## Getting Started

To use RestTestClient in the upcoming Spring Boot 4, you'll need these dependencies:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

## Conclusion

RestTestClient represents a significant step forward in testing Spring REST APIs. By providing a unified, fluent API that works across different testing scenarios, it removes the confusion of choosing between different testing tools and makes your tests more readable and maintainable.

As we approach the release of Spring Framework 7 and Spring Boot 4, RestTestClient stands out as one of those features that makes you wonder how you ever lived without it. Whether you're writing a quick unit test or a comprehensive integration test, the consistent API and clear syntax make testing a more pleasant experience.

Start small with `bindToController` for your unit tests, then gradually explore the other approaches as your testing needs grow. Your future self (and your team) will thank you for writing clear, maintainable tests that are easy to understand and modify.

Happy testing, and get ready for the exciting improvements coming in Spring Boot 4!