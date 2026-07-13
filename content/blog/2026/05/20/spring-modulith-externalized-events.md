---
title: "Spring Modulith Externalized Events"
slug: spring-modulith-externalized-events
date: 2026-05-20T09:00:00.000Z
published: true
description: "How to externalize events to a message broker like Kafka"
author: "Dan Vega"
tags:
  - Spring Modulith
cover: spring-modulith-externalized-events.jpeg
video: https://www.youtube.com/embed/8sJIWwc7Jss
keywords: Spring Modulith
---


---
title: "Spring Modulith Externalized Events: Publishing Module Events to Kafka"
slug: spring-modulith-externalized-events
date: 2026-05-20
published: true
description: "Learn how to externalize Spring Modulith application events to Apache Kafka so other systems can react to changes happening inside your modular monolith."
tags:
  - spring
  - spring-boot
  - spring-modulith
  - kafka
keywords:
  - spring modulith externalized events
  - spring modulith kafka
  - spring boot kafka events
  - modular monolith event externalization
  - spring modulith tutorial
  - application event publisher kafka
  - spring for apache kafka
---

When you're building a modular monolith with Spring Modulith, events are how your modules talk to each other without creating a tangled web of dependencies. But what happens when systems *outside* your application need to know about those events too? Maybe another microservice needs to react when an order is placed, or an analytics platform needs to track user activity. That's where externalizing events to a message broker like Apache Kafka comes in.

::GitHubRepo{url="https://github.com/danvega/modulith-externalized-events"}
Follow along with the complete working example.
::

## A Quick Recap on Spring Modulith Events

If you've worked with Spring Modulith before, you know that the whole point is to keep your modules loosely coupled. Instead of one module directly calling into another (which leads to that "big ball of mud" we're all trying to avoid), you publish events. Module A says "hey, an order was placed" and Module B, C, or D can listen for that event if they care about it.

This works beautifully using Spring's built-in `ApplicationEventPublisher`, which has been around since Spring Framework 1.1.1. Spring Modulith builds on top of this with features like an event registry for durability so events can survive application restarts.

But all of this happens *internally*. The events live and die within your application process. The [Spring Modulith documentation](https://docs.spring.io/spring-modulith/reference/events.html) puts it well: "Some of the events exchanged between application modules might be interesting to external systems." That's exactly what we're going to solve today.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with the following dependencies:

- **Spring Web** for our REST endpoints
- **Spring Modulith** for the modular monolith structure
- **Spring Data JDBC** for data access
- **PostgreSQL Driver** for our database
- **Docker Compose Support** so you don't need to set up databases manually
- **Spring for Apache Kafka** for our message broker

Here's something nice about using the Spring Initializr: when you add both Spring Modulith and Spring for Apache Kafka, it automatically includes the `spring-modulith-events-kafka` dependency. This is the broker-specific artifact that the documentation mentions. You don't need to hunt for it yourself.

### Docker Compose Configuration

Since we selected Docker Compose Support, we get a `compose.yaml` file. We need both PostgreSQL (for our database and the Modulith event registry) and Kafka. Here's what that looks like:

```yaml
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_DB: social_media
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5455:5432"
  kafka:
    image: apache/kafka
    ports:
      - "9092:9092"
```

### Application Properties

In `application.yml`, we need a few configuration properties to get started:

```yaml
spring:
  modulith:
    events:
      jdbc:
        schema-initialization:
          enabled: true
  kafka:
    consumer:
      group-id: externalized-demo
      auto-offset-reset: earliest
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
```

The `schema-initialization.enabled` property tells Spring Modulith to create the event registry table for us automatically. Since we're using Spring Data JDBC, it handles the schema creation.

The Kafka consumer configuration sets up a consumer group ID and tells Kafka to start reading from the earliest available message. The `value-deserializer` is important. Without it, you'll get raw byte arrays back from Kafka instead of readable strings. I'll come back to why that matters later.

## Building the Application Modules

Our application models a simple social media posting system. You create a post, choose which platforms to publish to, and the system notifies interested parties through events.

### The Posts Module

First, let's set up the `posts` package with a `Platform` enum. This will be public since other modules might need to reference these platform types:

```java
public enum Platform {
    TWITTER,
    LINKEDIN,
    BLUESKY
}
```

Everything else in this module will live in a sub-package called `internal`. In Spring Modulith, any sub-package of a module's root package is considered internal, meaning other modules can't access its contents directly. This is how Modulith enforces module boundaries.

Here's our `Post` record:

```java
record Post(UUID id, String author, String content, Set<Platform> platforms) {}
```

And a simple `CreatePostRequest` to handle incoming API requests:

```java
record CreatePostRequest(String author, String content, Set<Platform> platforms) {}
```

One thing that might seem odd: the `PostController` lives in the `internal` package too. Doesn't that mean the API endpoint is hidden? Not at all. The "internal" boundary is about Spring Modulith's module visibility, not HTTP accessibility. Your REST endpoints still work normally. It just means other Java modules in your app can't inject or reference the `PostController` class directly.

```java
@RestController
@RequestMapping("/api/posts")
class PostController {

    private final PostService postService;

    PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Post create(@RequestBody CreatePostRequest request) {
        return postService.createPost(request.author(), request.content(), request.platforms());
    }
}
```

### Publishing Events from the Service

The `PostService` is where things get interesting. This is where we create the post and publish an event to let the rest of the system know something happened:

```java
@Service
@Transactional
class PostService {

    private final ApplicationEventPublisher events;

    PostService(ApplicationEventPublisher events) {
        this.events = events;
    }

    Post createPost(String author, String content, Set<Platform> platforms) {
        Post post = new Post(UUID.randomUUID(), author, content, platforms);
        events.publishEvent(new PostCreated(post.id(), post.author(), post.content(), post.platforms()));
        return post;
    }
}
```

The `ApplicationEventPublisher` comes straight from Spring Framework. We inject it through the constructor and call `publishEvent()` with our event object. Nothing Modulith-specific here yet.

## The Event Type and Externalizing It

Here's where things get really interesting. Our `PostCreated` record serves double duty: it's both the internal event type that other modules can listen to AND the externalized event that gets pushed to Kafka.

```java
@Externalized("social-posts::#{#this.id}")
public record PostCreated(UUID id, String author, String content, Set<Platform> platforms) {}
```

That `@Externalized` annotation is doing all the heavy lifting. Let's break down what `"social-posts::#{#this.id}"` means:

- **`social-posts`** is the Kafka topic name. This is where the event will be published.
- **`::`** separates the topic from the key.
- **`#{#this.id}`** is a SpEL (Spring Expression Language) expression that uses the event's `id` field as the Kafka message key.

The key matters in Kafka because messages with the same key end up on the same partition. This guarantees ordering for related events, which is useful if you need to replay them later.

That's it. Three things are required to externalize events, as the documentation states:

1. Add the broker-specific Spring Modulith artifact (handled by the Initializr)
2. Annotate your event type with `@Externalized`
3. Specify the routing target (topic and key) in the annotation

## Listening for Events Internally

Let's create a `notifications` module that listens for post creation events inside our application. This goes in a separate package at `notifications.internal`:

```java
@Component
class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    @ApplicationModuleListener
    void onPostCreated(PostCreated event) {
        log.info("Sending notification for {} to {}", event.id(), event.author());
    }
}
```

The `@ApplicationModuleListener` annotation comes from Spring Modulith. It tells the framework to invoke this method whenever a `PostCreated` event is published. In a real application, you might send an email, push notification, or update a dashboard here.

## Listening for Events from Kafka

Now for the external side. We need a Kafka consumer to pick up the events that were externalized. For this demo, we can add a simple listener right in the main application class:

```java
@SpringBootApplication
public class ExternalApplication {

    private static final Logger log = LoggerFactory.getLogger(ExternalApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ExternalApplication.class, args);
    }

    @KafkaListener(topics = "social-posts")
    void onSocialPosts(ConsumerRecord<String, String> record) {
        log.info("Kafka social-posts: key={}, value={}", record.key(), record.value());
    }
}
```

In a real-world scenario, this consumer would live in a completely separate application. That's the whole point of externalizing events: other systems can react to what's happening in your modular monolith. For demo purposes, we're keeping everything in one project.

## Testing It Out

With everything in place, start the application and send a POST request:

```bash
curl -X POST http://localhost:8080/api/posts \
  -H "Content-Type: application/json" \
  -d '{"author":"Dan","content":"Hello World","platforms":["TWITTER","LINKEDIN"]}'
```

You should see two log entries in your console:

1. **The internal listener**: `Sending notification for <uuid> to Dan`
2. **The Kafka listener**: `Kafka social-posts: key=<uuid>, value={"id":"<uuid>","author":"Dan","content":"Hello World","platforms":["TWITTER","LINKEDIN"]}`

Both fired from a single `publishEvent()` call. The internal module got the event through Spring's event system, and Kafka got it through the externalization mechanism. That's pretty powerful for the amount of code involved.

### A Gotcha: The Value Deserializer

If you skip the `value-deserializer` property in your Kafka consumer configuration, you'll see something like this in your Kafka listener output:

```
value=[B@7a5ceab2
```

That's a Java byte array toString. Not useful. Kafka's default deserializer produces byte arrays, so you need to explicitly tell it to use the `StringDeserializer`:

```yaml
spring:
  kafka:
    consumer:
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
```

## Why This Matters

The beauty of this approach is that it's not an either/or situation. You don't have to choose between internal events and external events. The same `PostCreated` event serves both purposes. Your notification module inside the app reacts to it. Your Kafka consumers in other systems react to it too.

Spring Modulith handles the complexity of publishing to Kafka under the hood. You don't write any Kafka producer code. You don't configure serializers for the outgoing messages. You annotate your event record and Spring Modulith takes care of the rest, using Spring for Apache Kafka's auto-configuration.

As you build more complex applications, you'll want to dig deeper into the [Spring Modulith documentation](https://docs.spring.io/spring-modulith/reference/events.html#externalization) for topics like event serialization customization, error handling, and retry strategies. But these are the building blocks, the foundation you need to start working with externalized events.

Happy Coding!