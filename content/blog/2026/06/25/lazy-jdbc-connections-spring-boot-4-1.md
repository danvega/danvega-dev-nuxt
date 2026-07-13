---
title: "Lazy JDBC Connections in Spring Boot 4.1: One Property, Massive Performance Win"
slug: lazy-jdbc-connections-spring-boot-4-1
description: "Spring Boot 4.1 introduces lazy JDBC connection fetching with a single property. Learn how it works, when to use it, and see real metrics showing a drop from 2 seconds to 15 milliseconds of connection hold time."
author: Dan Vega
tags:
  - Spring Boot
  - Spring Data
keywords:
  - spring boot 4.1 lazy jdbc connections
  - spring datasource connection fetch lazy
  - spring boot performance tuning
  - spring boot 4.1 new features
  - lazy connection datasource proxy
  - spring boot jdbc optimization
date: 2026-06-25T09:00:00.000Z
published: true
cover: lazy-jdbc-connections-spring-boot-4-1.jpeg
video: https://www.youtube.com/embed/lsaBN1U2EB8
---


Your `@Transactional` service method calls a slow external API, then saves a row to the database. Under the default eager behavior, a database connection is borrowed from the pool the instant the transaction opens, and it sits there doing nothing while that remote call takes two seconds. Multiply that by a few concurrent requests and you're burning through your connection pool for no reason. Spring Boot 4.1 fixes this with a single property that dropped connection hold time from 2.2 seconds to 15 milliseconds in my tests.

::GitHubRepo{url="https://github.com/danvega/jdbc-lazy-connections"}
Follow along with the complete working example.
::

## The Problem with Eager Connection Fetching

When you annotate a method with `@Transactional`, Spring wraps it in a transaction. By default, that means a physical database connection is acquired from the pool right at the beginning, before any of your code runs. Here's what that timeline looks like:

1. Transaction begins, **connection acquired from pool**
2. Your code calls a remote API (takes 2 seconds)
3. Your code saves a row to the database
4. Transaction commits, **connection released**

That connection sat idle for the entire duration of the remote call. If your connection pool has 10 connections and you get 10 concurrent requests that each make a 2-second remote call before writing, you've exhausted your pool. New requests start queuing up, and your throughput tanks.

## The One-Property Fix

Spring Boot 4.1 introduces a new configuration property:

```properties
spring.datasource.connection-fetch=lazy
```

With this set, a connection isn't pulled from the pool until a SQL statement actually runs. The timeline changes to:

1. Transaction begins (no connection yet)
2. Your code calls a remote API (still no connection)
3. Your code saves a row, **connection acquired from pool**
4. Transaction commits, **connection released**

The connection is only held for milliseconds instead of seconds. That's it. One property.

## This Isn't Entirely New

Before Spring Boot 4.1, you could achieve the same behavior by wrapping your `DataSource` in a `LazyConnectionDataSourceProxy`. It looked something like this:

```java
@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource(DataSource originalDataSource) {
        return new LazyConnectionDataSourceProxy(originalDataSource);
    }
}
```

It worked, but you had to know about this proxy class, create a configuration class, and wire it up yourself. The new property makes this a first-class, zero-code option. If you're on an older version of Spring Boot and want this benefit, the proxy approach still works.

## Building the Demo

Let's walk through a practical example that proves the difference with real metrics. Head over to [start.spring.io](https://start.spring.io) and create a new project with these settings:

- **Project:** Maven
- **Language:** Java
- **Spring Boot:** 4.1.0
- **Dependencies:** Web, HTTP Client, Spring Data JDBC, PostgreSQL Driver, Docker Compose, Actuator

The Actuator dependency is key here. It gives us access to Micrometer metrics so we can measure exactly how long connections are borrowed.

### Schema and Repository

Create a file called **schema.sql** in `src/main/resources`:

```sql
CREATE TABLE IF NOT EXISTS customer (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255)
);
```

Spring Boot will pick this up by convention. You just need to tell it to always initialize the database by adding this to your `application.properties`:

```properties
spring.sql.init.mode=always
```

Now create a simple `Customer` record and repository:

```java
import org.springframework.data.annotation.Id;

public record Customer(@Id Long id, String name) {}
```

```java
import org.springframework.data.repository.ListCrudRepository;

public interface CustomerRepository extends ListCrudRepository<Customer, Long> {}
```

I'm using Spring Data JDBC here instead of JPA on purpose. JPA has its own connection lifecycle and caching behavior that makes metrics noisy. Spring Data JDBC gives us a clean, predictable read of what's happening.

### Simulating a Slow Remote Service

This is the heart of the demo. We need a component that makes an HTTP call and takes a while:

```java
@Component
public class SlowRemoteClient {

    private static final int DELAY_MS = 2000;
    private final RestClient restClient;

    public SlowRemoteClient(RestClient.Builder builder) {
        this.restClient = builder
                .baseUrl("https://jsonplaceholder.typicode.com")
                .build();
    }

    record User(int id, String name) {}

    public String fetchName(int userId) {
        User user = restClient.get()
                .uri("/users/{id}", userId)
                .retrieve()
                .body(User.class);

        try {
            Thread.sleep(DELAY_MS); // simulate slow downstream
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        return user != null ? user.name() : "unknown-user-" + userId;
    }
}
```

This calls the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API to get a username, then sleeps for 2 seconds to simulate a slow downstream service. The sleep is the important part. It represents any real-world scenario where your transactional method is waiting on something external before it touches the database.

### The Transactional Service

Here's where the magic (or the problem) happens:

```java
@Service
public class RegistrationService {

    private final SlowRemoteClient remoteClient;
    private final CustomerRepository customerRepository;

    public RegistrationService(SlowRemoteClient remoteClient, CustomerRepository customerRepository) {
        this.remoteClient = remoteClient;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public Customer register(int userId) {
        String name = remoteClient.fetchName(userId); // slow call
        return customerRepository.save(new Customer(null, name)); // database write
    }
}
```

The `@Transactional` annotation means a transaction is opened before `fetchName` runs. Under eager mode, that also means a connection is borrowed before `fetchName` runs. The connection just sits there while we wait for the remote service.

### The Controller

```java
@RestController
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @GetMapping("/register/{userId}")
    public Customer register(@PathVariable int userId) {
        return registrationService.register(userId);
    }
}
```

### Exposing the Metrics

By default, the Actuator doesn't expose all endpoints over HTTP. Add this to your `application.properties`:

```properties
management.endpoints.web.exposure.include=metrics
```

This lets us query the connection pool metrics via HTTP to see how long connections were held.

## Measuring the Difference

### Eager Mode (Default)

Start the application without the `connection-fetch` property (or set it to `eager`). Then make a request:

```bash
curl http://localhost:8080/register/1
```

You'll notice a delay of about 2 seconds. Now check the metrics:

```bash
curl -s http://localhost:8080/actuator/metrics/hikaricp.connections.usage | jq
```

You'll see something like:

```json
{
  "count": 3,
  "totalTime": 2.2,
  "max": 2.22
}
```

The connection was held for over 2 seconds. That's the entire duration of the remote call plus the database save.

### Lazy Mode

Now add the property to `application.properties`:

```properties
spring.datasource.connection-fetch=lazy
```

Restart the application, make the same request, and check the metrics again:

```bash
curl http://localhost:8080/register/1
curl -s http://localhost:8080/actuator/metrics/hikaricp.connections.usage | jq
```

This time:

```json
{
  "count": 1,
  "totalTime": 0.015,
  "max": 0.015
}
```

**15 milliseconds.** The connection was only borrowed for the `save()` call, not the 2-second remote call. Same request, same query, same result, but the connection pool is free to serve other requests during that remote call.

## When to Use Lazy Connections

Don't flip this on and expect a free win everywhere. It pays off in specific scenarios:

**Great fit:**
- Transactional methods that do slow remote work before a database write
- Mixed workloads where many code paths do non-database work (calling other services, reading from a cache, performing calculations) before touching the database
- Applications under high concurrency where connection pool exhaustion is a risk

**Not much benefit:**
- If every transactional method queries the database immediately, lazy mode adds a thin proxy layer and buys you almost nothing
- Read-heavy applications where the first thing you do in a transaction is a SELECT

This is a tool for a specific problem, not a universal default. Know your workload, measure it, and apply it where it makes sense.

## Wrapping Up

Lazy JDBC connections in Spring Boot 4.1 are one of those features that solve a real problem with minimal effort. One property changes when your application borrows database connections, and in the right scenario, the difference is dramatic.

If you want to explore more of what's new in Spring Boot 4.1, check out the [release blog post](https://spring.io/blog/2026/06/10/spring-boot-4), the [full release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.1-Release-Notes), and the [release highlights page](https://spring.io/projects/release-highlights) that the Spring team put together. The highlights page is especially nice because you can switch between versions and see changes across the entire Spring ecosystem.

Happy Coding!