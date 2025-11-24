---
title: What's New in Spring Framework 7 and Spring Boot 4
slug: spring-boot-4-is-here
date: "2025-11-24T09:00:00.000Z"
published: true
description: A comprehensive look at the new features in Spring Framework 7 and Spring Boot 4, including code examples and resources to help you get started
author: Dan Vega
tags:
  - Spring Boot
  - Spring
  - Java
cover: spring-boot-4-is-here.png
keywords: Spring Boot 4, Spring Framework 7, Java 21, Spring Boot upgrade, Spring Boot migration, Spring Boot new features
---

Spring Framework 7 and Spring Boot 4 represent a major leap forward for Java developers.
After spending some time exploring and creating content around these releases, I'm excited to share my favorite features with you.
This guide brings together everything you need to know in one place. While the focus is on Framework 7 and Boot 4,
some of the features highlighted also come from the broader Spring ecosystem.

## High-Level Overview

Spring Framework 7, Spring Boot 4, and the broader Spring ecosystem focus on three core themes: **developer experience**,
**performance**, and **production-readiness**.

The developer experience improvements are immediately noticeable. Features like HTTP Interface Clients and the
REST Test Client eliminate boilerplate code that we've written countless times. The new Programmatic Bean Registration
API brings a modern, fluent approach to dynamic bean creation. And first-class API versioning means you no longer need
workarounds for a common enterprise requirement.

Performance gets a significant boost through Spring Data AOT, which moves query generation from runtime to compile-time,
resulting in 50-70% faster startup times. Combined with continued improvements for GraalVM native images,
Spring applications are more cloud-native than ever.

Production-readiness is enhanced with built-in resilience patterns (no external libraries needed) and official
OpenTelemetry integration for observability. You also get compile-time null safety with JSpecify and Jackson 3's
improved defaults.

There are many more improvements in these releases, but let's dive into 10 of my favorites in no particular order.

**Resources:**
- [Spring Framework 7 Release Notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes)
- [Spring Boot 4 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Release-Notes)
- [The Road to GA](https://spring.io/blog/2025/09/02/road_to_ga_introduction)

## New Features

### 1. Null Safety with JSpecify

Spring Framework 7 introduces first-class support for compile-time null safety using JSpecify annotations. Instead of runtime `NullPointerException` surprises, you catch issues during compilation.

The key is the `@NullMarked` annotation at the package level, which declares that all types in that package are non-null by default. For exceptions, you use `@Nullable` explicitly.

```java
// package-info.java
@NullMarked
package dev.danvega.coffeeshop;

import org.jspecify.annotations.NullMarked;
```

```java
// All parameters and return types are non-null by default
public User findById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
}

// Explicitly mark nullable parameters
public List<User> search(@Nullable String name) {
    if (name == null) {
        return userRepository.findAll();
    }
    return userRepository.findByName(name);
}
```

Your IDE will warn you about potential null issues, and this also improves Kotlin interoperability.

**Resources:**
- [GitHub Repository](https://github.com/danvega/coffeeshop)
- [YouTube Tutorial](https://youtu.be/QlGnaRoujL8)
- [Blog Post](https://www.danvega.dev/blog/spring-boot-4-null-safety)
- [JSpecify Documentation](https://jspecify.dev/)

### 2. HTTP Interface Clients

Gone are the days of manually configuring `HttpServiceProxyFactory`. Spring Boot 4 introduces `@ImportHttpServices` for zero-configuration HTTP clients.

**Before (Manual Configuration):**
```java
@Bean
public TodoService todoService(RestClient.Builder builder) {
    var restClient = builder
            .baseUrl("https://jsonplaceholder.typicode.com")
            .build();
    var adapter = RestClientAdapter.create(restClient);
    var factory = HttpServiceProxyFactory.builderFor(adapter).build();
    return factory.createClient(TodoService.class);
}
```

**After (Spring Boot 4):**
```java
@Configuration(proxyBeanMethods = false)
@ImportHttpServices(TodoService.class)
public class HttpClientConfig {
    // That's it!
}

@HttpExchange(url = "https://jsonplaceholder.typicode.com", accept = "application/json")
public interface TodoService {

    @GetExchange("/todos")
    List<Todo> getAllTodos();

    @GetExchange("/todos/{id}")
    Todo getTodoById(@PathVariable Long id);

    @PostExchange("/todos")
    Todo createTodo(@RequestBody Todo todo);
}
```

The interface is now automatically turned into a bean with full type safety and compile-time checking.

**Resources:**
- [GitHub Repository](https://github.com/danvega/sb4-http-interfaces)
- [YouTube Tutorial](https://youtu.be/TEd5e4Thu7M)
- [Official Documentation](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-http-service-client)

### 3. Programmatic Bean Registration

The new `BeanRegistrar` interface provides a modern, AOT-compatible way to register beans programmatically with runtime flexibility.

```java
public class MessageServiceRegistrar implements BeanRegistrar {

    @Override
    public void register(BeanRegistry registry, Environment env) {
        String messageType = env.getProperty("app.message-type", "email");

        switch (messageType.toLowerCase()) {
            case "email" -> registry.registerBean("messageService",
                EmailMessageService.class,
                spec -> spec.description("Email service"));
            case "sms" -> registry.registerBean("messageService",
                SmsMessageService.class,
                spec -> spec.description("SMS service"));
        }
    }
}

@Configuration
@Import(MessageServiceRegistrar.class)
public class AppConfig {
}
```

This replaces the verbose `BeanDefinitionRegistryPostProcessor` with a clean, lambda-based API that's also GraalVM native image compatible.

**Resources:**
- [GitHub Repository](https://github.com/danvega/sb4-bean-registrar)
- [YouTube Tutorial](https://youtu.be/yh760wTFL_4)
- [Blog Post](https://www.danvega.dev/blog/programmatic-bean-registration)
- [Official Documentation](https://docs.spring.io/spring-framework/reference/core/beans/java/programmatic-bean-registration.html)

### 4. API Versioning

Spring Framework 7 finally delivers first-class API versioning support using media type parameters.

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping(version = "1.0")
    public UserDTOv1 getUserV1(@PathVariable Long id) {
        return new UserDTOv1(id, user.getName());
    }

    @GetMapping(version = "2.0")
    public UserDTOv2 getUserV2(@PathVariable Long id) {
        return new UserDTOv2(id, user.getFirstName(), user.getLastName());
    }
}

@Configuration
public class ApiVersioningConfig implements WebMvcConfigurer {

    @Override
    public void configureApiVersioning(ApiVersionConfigurer configurer) {
        configurer.useMediaTypeParameterVersioning();
    }
}
```

Clients request specific versions via the `Accept` header:

```bash
curl -H "Accept: application/json;version=1.0" http://localhost:8080/api/users/1
curl -H "Accept: application/json;version=2.0" http://localhost:8080/api/users/1
```

This also supports RFC-compliant deprecation headers for sunset planning.

**Resources:**
- [GitHub Repository](https://github.com/danvega/api-users)
- [YouTube Tutorial](https://youtu.be/qjo2tYf01xo)
- [Blog Post](https://www.danvega.dev/blog/spring-boot-4-api-versioning)
- [Official Documentation](https://docs.spring.io/spring-framework/reference/web/webmvc-versioning.html)

### 5. JMS Client API

A new fluent JMS API makes messaging with Apache ActiveMQ Artemis much cleaner than the traditional `JmsTemplate`.

```java
@Service
public class OrderMessagingService {

    private final JmsClient jmsClient;

    // Basic send
    public void sendOrder(Order order) {
        jmsClient.send("orders.queue")
            .withBody(order);
    }

    // With Quality of Service
    public void sendPriorityOrder(Order order) {
        jmsClient.send("orders.queue")
            .withPriority(9)
            .withTimeToLive(Duration.ofMinutes(5))
            .withBody(order);
    }

    // Request-Reply pattern
    public OrderConfirmation processOrder(Order order) {
        return jmsClient.requestAndReceive("orders.queue")
            .withBody(order)
            .convertTo(OrderConfirmation.class);
    }
}
```

The API supports all 7 essential messaging patterns including custom headers, synchronous receive, and reusable operation handles for performance.

**Resources:**
- [GitHub Repository](https://github.com/danvega/jms-orders)
- [Official Documentation](https://docs.spring.io/spring-boot/reference/messaging/jms.html)
- [Apache ActiveMQ Artemis](https://activemq.apache.org/components/artemis/)

### 6. Built-in Resilience

Spring Framework 7 includes enterprise-grade resilience patterns without external libraries like Resilience4j.

```java
@Configuration
@EnableResilientMethods
public class ResilienceConfig {
}

@Service
public class ExternalApiService {

    // Exponential backoff with jitter
    @Retryable(
        maxAttempts = 4,
        delay = 500,
        multiplier = 2.0,    // 500ms, 1s, 2s, 4s
        maxDelay = 5000,
        jitter = 100         // Prevents thundering herd
    )
    public String fetchData(String id) {
        return externalApi.getData(id);
    }

    // Concurrency control
    @ConcurrencyLimit(2)
    public String performHeavyOperation(String taskId) {
        // Only 2 executions at a time
        return heavyComputation(taskId);
    }
}
```

You can combine both annotations for single-threaded execution with automatic retry.

**Resources:**
- [GitHub Repository](https://github.com/danvega/quick-bytes)
- [YouTube Tutorial](https://youtu.be/CT1wGTwOfg0)
- [Official Documentation](https://docs.spring.io/spring-framework/reference/core/resilience.html)

### 7. Jackson 3 Support

Spring Boot 4 integrates Jackson 3 with improved defaults and a new immutable configuration model.

Key changes from Jackson 2:
- **Dates**: ISO-8601 strings by default (not numeric timestamps)
- **Exceptions**: Unchecked for better lambda/stream integration
- **Packages**: `tools.jackson` instead of `com.fasterxml`

```java
// JSON Views for flexible responses
public class Views {
    public interface Summary {}
    public interface Public extends Summary {}
    public interface Internal extends Public {}
}

public record Donut(
    @JsonView(Views.Summary.class) Long id,
    @JsonView(Views.Summary.class) String name,
    @JsonView(Views.Public.class) BigDecimal price,
    @JsonView(Views.Internal.class) Integer stockCount
) {}

@RestController
@RequestMapping("/api/donuts")
public class DonutController {

    @GetMapping
    @JsonView(Views.Summary.class)
    public List<Donut> getSummary() {
        return donutService.findAll();
    }

    @GetMapping("/internal")
    @JsonView(Views.Internal.class)
    public List<Donut> getInternal() {
        return donutService.findAll();
    }
}
```

**Resources:**
- [GitHub Repository](https://github.com/danvega/donut-shop)
- [YouTube Tutorial](https://youtu.be/4cvP_qroLH4)
- [Spring Blog: Introducing Jackson 3](https://spring.io/blog/2025/10/07/introducing-jackson-3-support-in-spring)

### 8. REST Test Client

Say goodbye to juggling `MockMvc`, `WebTestClient`, and `TestRestTemplate`. The new `RestTestClient` provides one consistent API for all test types.

```java
// Unit Test - Fast, isolated
@ExtendWith(MockitoExtension.class)
class TodoControllerTest {

    @Mock
    private TodoService todoService;
    private RestTestClient client;

    @BeforeEach
    void setUp() {
        client = RestTestClient.bindToController(
            new TodoController(todoService)
        ).build();
    }

    @Test
    void shouldGetAllTodos() {
        when(todoService.findAll()).thenReturn(
            List.of(new Todo(1L, "Learn Spring", false))
        );

        client.get()
            .uri("/api/todos")
            .exchange()
            .expectStatus().isOk()
            .expectBody()
            .jsonPath("$[0].title").isEqualTo("Learn Spring");
    }
}

// E2E Test - Full stack with real HTTP
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class TodoIntegrationTest {

    @LocalServerPort
    private int port;

    @Test
    void shouldCreateTodo() {
        RestTestClient client = RestTestClient.bindToServer()
            .baseUrl("http://localhost:" + port)
            .build();

        client.post()
            .uri("/api/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(new Todo(null, "Integration test", false))
            .exchange()
            .expectStatus().isCreated();
    }
}
```

Choose from 5 binding approaches: `bindToController`, `bindToMockMvc`, `bindToApplicationContext`, `bindToServer`, and `bindToRouterFunction`.

**Resources:**
- [GitHub Repository](https://github.com/danvega/rest-test-client)
- [YouTube Tutorial](https://youtu.be/dPM8n0uNhes)
- [Blog Post](https://www.danvega.dev/blog/spring-framework-7-rest-test-client)
- [Official Documentation](https://docs.spring.io/spring-framework/reference/testing/resttestclient.html)

### 9. Spring Data AOT

Spring Data AOT moves query generation from runtime to compile-time, resulting in **50-70% faster startup** and reduced memory usage.

```java
public interface CoffeeRepository extends CrudRepository<Coffee, Long> {

    // AOT generates SQL at compile-time
    List<Coffee> findByNameContainingIgnoreCase(String name);

    List<Coffee> findByRoastLevelAndOrigin(String roastLevel, String origin);

    @Query("SELECT * FROM coffee WHERE price < :maxPrice ORDER BY price")
    List<Coffee> findAffordableCoffees(BigDecimal maxPrice);
}
```

Benefits include:
- Early error detection (catch query typos at build time)
- GraalVM native image ready
- Pre-compiled repository implementations
- Inspectable generated code in `target/spring-aot/`

Build with AOT processing:
```bash
./mvnw clean package
ls target/spring-aot/main/sources/
```

**Resources:**
- [GitHub Repository](https://github.com/danvega/spring-data-aot)
- [Official Documentation](https://docs.spring.io/spring-data/commons/reference/aot.html)

### 10. OpenTelemetry Integration

Spring Boot 4 provides official, production-ready OpenTelemetry support with a single dependency.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-opentelemetry</artifactId>
</dependency>
```

```yaml
spring:
  application:
    name: my-service

management:
  tracing:
    sampling:
      probability: 1.0
  otlp:
    tracing:
      endpoint: http://localhost:4318/v1/traces
```

You get automatic instrumentation for HTTP requests, database calls, and log correlation:

```
2025-11-18 10:30:45 INFO [traceId=abc123, spanId=def456] Processing order...
```

Add custom spans with `@Observed`:

```java
@Service
public class OrderService {

    @Observed(name = "order.process", contextualName = "processOrder")
    public Order processOrder(OrderRequest request) {
        return orderRepository.save(createOrder(request));
    }
}
```

**Resources:**
- [GitHub Repository](https://github.com/danvega/ot)
- [Spring Blog: OpenTelemetry with Spring Boot](https://spring.io/blog/2025/11/18/opentelemetry-with-spring-boot)
- [OpenTelemetry](https://opentelemetry.io/)

## Conclusion

Spring Framework 7 and Spring Boot 4 deliver significant improvements across developer experience, performance, and production-readiness. The theme is clear: less boilerplate, faster applications, and better defaults.

My personal highlights:
- **Null Safety with JSpecify** catches errors at compile-time instead of runtime
- **HTTP Interface Clients** and **API Versioning** eliminate code I've written hundreds of times
- **Spring Data AOT** dramatically improves startup time
- **Built-in Resilience** removes external dependencies for common patterns
- **REST Test Client** finally unifies our testing story

Ready to get started? Head to [start.spring.io](https://start.spring.io), select Spring Boot 4.0, and start exploring.
I've also created a [discovery repository](https://github.com/danvega/sb4) with links to all the individual projects and
resources mentioned in this post.

If you want to dive deeper into any of these features, check out my [YouTube channel](https://www.youtube.com/@danvega)
where I have dedicated tutorials for some of the features listed in this article.

Happy coding, friends!
