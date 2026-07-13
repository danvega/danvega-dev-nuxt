---
title: "The New @RedisListener Annotation in Spring Boot 4.1"
slug: redis-listener-spring-boot-4-1
description: "Spring Boot 4.1 introduces @RedisListener, a simple annotation that brings Redis Pub/Sub in line with Kafka and Rabbit. No more wiring up listener containers and adapting byte arrays by hand."
author: Dan Vega
tags:
  - Spring Boot
  - Redis
keywords:
  - spring boot redis listener
  - redis pub/sub spring boot
  - spring boot 4.1 new features
  - redis listener annotation
  - spring data redis tutorial
  - spring boot redis pub sub example
date: 2026-06-29T09:00:00.000Z
published: true
cover: redis-listener-spring-boot-4-1.jpg
video: https://www.youtube.com/embed/lMbgBYlUtfc
---


If you've ever wired up Redis Pub/Sub in a Spring application, you know the ceremony involved: creating a `RedisMessageListenerContainer`, registering a `MessageListenerAdapter`, and manually deserializing raw byte array payloads. Meanwhile, Kafka and Rabbit developers have enjoyed a much simpler model for years. Annotate a method with `@KafkaListener` or `@RabbitListener`, and you're done. Spring Boot 4.1 finally closes that gap for Redis. The new `@RedisListener` annotation lets you subscribe to a channel and receive typed payloads with a single annotation.

::GitHubRepo{url="https://github.com/danvega/redis-listener"}
Follow along with the complete working example.
::

## The Problem with Redis Pub/Sub Before 4.1

Before this release, subscribing to a Redis channel required you to create multiple beans and handle the raw message yourself. Here's what that looked like:

```java
@Component
public class OrderSubscriber {

    public void handleMessage(String message) {
        // manually deserialize the byte array payload
    }
}
```

Then, in a configuration class, you had to wire up a `MessageListenerAdapter` and a `RedisMessageListenerContainer`:

```java
@Bean
public MessageListenerAdapter listenerAdapter(OrderSubscriber subscriber) {
    return new MessageListenerAdapter(subscriber, "handleMessage");
}

@Bean
public RedisMessageListenerContainer container(RedisConnectionFactory connectionFactory,
                                                MessageListenerAdapter listenerAdapter) {
    RedisMessageListenerContainer container = new RedisMessageListenerContainer();
    container.setConnectionFactory(connectionFactory);
    container.addMessageListener(listenerAdapter, new ChannelTopic("orders"));
    return container;
}
```

That's a lot of plumbing just to listen for a message on a channel. You had to tell Spring which method to call, which topic to listen on, and how to connect everything together. And you were still left dealing with the raw payload yourself. Compare that to how straightforward `@KafkaListener` and `@RabbitListener` have been, and it's clear this was overdue for improvement.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with the following settings:

- **Language:** Java
- **Spring Boot:** 4.1
- **Group:** dev.danvega
- **Dependencies:**
  - Spring Web
  - Spring Data Redis
  - Docker Compose Support

Docker Compose Support is worth including here because it will automatically spin up a Redis container for you. No need to install Redis locally or manage a separate Docker setup.

Once you generate and open the project, you're ready to write some code.

## Building the Order Model and Publisher

Let's start with a simple record to represent an order in the system:

```java
public record Order(Integer id, String product, Integer quantity) {
}
```

Next, create a controller that publishes orders to a Redis channel. This is the "pub" side of Pub/Sub.

```java
@RestController
public class OrderController {

    private final RedisTemplate<String, String> redisTemplate;
    private final JsonMapper jsonMapper;

    public OrderController(RedisTemplate<String, String> redisTemplate, JsonMapper jsonMapper) {
        this.redisTemplate = redisTemplate;
        this.jsonMapper = jsonMapper;
    }

    @PostMapping("/orders")
    public void publish(@RequestBody Order order) throws Exception {
        String json = jsonMapper.writeValueAsString(order);
        redisTemplate.convertAndSend("orders", json);
    }
}
```

A couple of things to note here. The `JsonMapper` is new in Spring Boot 4, which uses Jackson 3 under the hood. It's similar to the `ObjectMapper` you're used to, but it's immutable and designed specifically for working with JSON. Spring will auto-configure one for you, so you can inject it directly.

The `convertAndSend` method publishes the serialized order JSON to the `orders` channel. Nothing on the publishing side changes with this new feature. The improvement is all about the subscriber.

## Subscribing with @RedisListener

Here's where the magic happens. Create a new component for your subscriber:

```java
@Component
public class OrderSubscriber {

    @RedisListener(topics = "orders", consumes = "application/json")
    public void handleMessage(Order order) {
        System.out.println("Received order: " + order.product());
    }
}
```

That's the entire subscriber. Compare this to the old approach with its `MessageListenerAdapter`, `RedisMessageListenerContainer`, and manual deserialization. This is a fraction of the code.

The `@RedisListener` annotation takes two key attributes:

- **`topics`**: The Redis channel to subscribe to. In this case, `"orders"`.
- **`consumes`**: The content type of the incoming message. Setting this to `"application/json"` tells Spring to automatically deserialize the payload into your method parameter type.

Spring handles all the wiring for you. It creates the listener container, registers your method as the handler, and deserializes the JSON payload into an `Order` object. You just write the business logic.

## Testing It Out

Start the application. Docker Compose Support will spin up a Redis container automatically. Then send a POST request using curl:

```bash
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "product": "keyboard", "quantity": 2}'
```

Check your application console, and you should see:

```
Received order: keyboard
```

Same behavior as the old approach, with significantly less code to write and maintain.

## Why This Matters

This isn't a groundbreaking architectural change. It's a quality-of-life improvement, and those matter. When you put the old subscriber code next to the new version, the story tells itself. The old way required you to understand `MessageListenerAdapter`, `RedisMessageListenerContainer`, and the wiring between them. The new way requires you to know one annotation.

More importantly, it brings Redis Pub/Sub in line with how Kafka and RabbitMQ listeners already work in Spring. If you've used `@KafkaListener` before, `@RedisListener` will feel immediately familiar. That consistency across messaging systems is valuable, especially on teams where developers move between projects that use different message brokers.

## Resources and Next Steps

This is part of a series covering new features in Spring Boot 4.1. If you want to explore what else is new, here are some helpful links:

- [Spring Boot 4.1.0 Blog Post](https://spring.io/blog/2026/06/10/spring-boot-4)
- [Spring Boot 4.1 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.1-Release-Notes)
- [Spring Release Highlights](https://spring.io/projects/release-highlights)

The release notes cover everything from Spring dRPC support to HTTP client SSRF mitigation to file rotation support for Log4j. The release highlights page is particularly useful because you can pick a version of Spring Boot and browse every change across all the related projects.

If there are other Spring Boot 4.1 features you'd like to see covered, let me know. Happy coding!