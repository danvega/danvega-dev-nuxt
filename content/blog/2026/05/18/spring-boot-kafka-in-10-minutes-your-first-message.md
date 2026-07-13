---
title: "Spring Boot + Kafka in 10 Minutes: Sending Your First Message"
slug: spring-boot-kafka-quick-start
date: 2026-05-20T08:00:00.000Z
published: true
description: "Learn how to produce and consume your first Apache Kafka message using Spring Boot. This beginner-friendly guide covers Docker Compose setup, KafkaTemplate, @KafkaListener, and testing with Embedded Kafka."
author: "Dan Vega"
tags:
  - Spring Boot
  - Apache Kafka
  - Spring for Apache Kafka
keywords: spring boot kafka, spring for apache kafka, kafka spring boot tutorial, kafka template spring boot, kafka listener spring boot, spring boot kafka docker compose, embedded kafka test
cover: spring-boot-kafka-in-10-minutes-your-first-message.jpg
video: https://www.youtube.com/embed/5XW3f_39ipY
---

If you've been building Spring Boot services that talk to each other over HTTP, you've probably hit the wall where everything is synchronous, tightly coupled, and one slow service brings the whole chain down. Apache Kafka offers a way out of that mess, but getting started with the raw Kafka Java client can feel overwhelming. Spring for Apache Kafka wraps all of that complexity in the annotations and auto-configuration you already know, and you can have your first message flowing in about 10 minutes.

::GitHubRepo{url="https://github.com/danvega/spring-kafka-quick-start"}
Follow along with the complete working example.
::

If you prefer video, you can [watch this tutorial on YouTube](https://www.youtube.com/watch?v=VIDEO_ID).

## Why Kafka and Why Now?

Most of us start with a familiar architecture: a handful of Spring Boot services calling each other over REST. Service A calls Service B, B calls C, and so on. It works fine until your system grows. Every call is synchronous, so if a downstream service is slow, your service is slow. If it's down, you're down. You end up writing retry logic, circuit breakers, timeouts, and fallbacks. When a new team needs to react to the same event (say, a new user signing up), they have to ask you to add another HTTP call. The dependency graph turns into spaghetti.

There's a different way to think about this. Instead of services calling each other directly, services emit events that describe what happened: "a user signed up," "an order was placed," "a payment was cleared." Anyone interested can listen. The producer doesn't know or care who's on the other end. That's the shift from request-response to event-driven architecture, and it's the model Apache Kafka was built for.

At its core, Kafka is a distributed, durable log. Producers append events to topics, consumers read from those topics at their own pace, and Kafka keeps a history around. It was built at LinkedIn to handle their entire activity stream, open sourced in 2011, and today it's the de facto backbone for event-driven systems at massive scale. Think of it less as a queue and more as a replayable stream of facts.

## Four Kafka Concepts That Will Take You a Long Way

Before we write any code, internalize these four terms. The rest of Kafka will follow naturally from here.

**Topic** is a named stream of events, like "orders" or "payments." **Partition** is how a topic is split for parallelism. Kafka can spread a single topic across many machines. **Offset** is the position of an event inside a partition. It's just a number that goes up. **Consumer Group** is how multiple instances of the same service share the work. Kafka assigns partitions across the group automatically.

Here's how they work together: a producer publishes an event to a topic, Kafka picks a partition (usually based on a key, so all events for user 42 land in the same partition and stay in order), the event gets an offset and is written to disk. Consumers in a group each get assigned a partition and read independently, tracking their own offset. If a consumer crashes, another picks up where it left off.

## What Spring for Apache Kafka Gives You

Working with the raw Kafka Java client means configuring producer factories, byte array serializers, manual pull loops, manual offset commits, and manual error handling. Spring for Apache Kafka is the official Spring project that wraps all of this in the Spring idioms you already know: dependency injection, annotations, auto-configuration, and Spring Boot starters.

Here's what you get out of the box:

- **KafkaTemplate** for sending: one line to publish an event
- **@KafkaListener** for consuming: it's like `@RestController`, except instead of HTTP, it's events
- Automatic JSON or Avro serialization with type safety
- Built-in retry, dead letter topics, and transactional support
- Spring Boot auto-configuration that turns boilerplate into a few lines in `application.yaml`
- **Embedded Kafka** for tests so you can spin up a real broker in-process

You write the business logic and nothing else. Let's see it in action.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with the following dependencies:

- **Spring Web**
- **Spring for Apache Kafka**
- **Docker Compose Support**

When you generate the project and open it up, you'll notice the `compose.yaml` file has no services defined yet. That's fine. We need to add a Kafka broker.

### Docker Compose for a Local Kafka Broker

Replace the contents of your `compose.yaml` with the following:

```yaml
services:
  kafka:
    image: 'apache/kafka-native:latest'
    ports:
      - '9092:9092'
```

That's the simplest possible configuration. A single Kafka node running on port 9092. Spring Boot's Docker Compose support will automatically start this container when you run the application.

### Application Configuration

In `src/main/resources/application.yaml` (rename from `.properties` if you prefer YAML), add one important setting:

```yaml
spring:
  kafka:
    consumer:
      auto-offset-reset: earliest
```

This tells the consumer to start reading from the earliest available message in the topic. Without this, a new consumer group would only see messages produced *after* it joined, which means you'd miss the message your application sends on startup.

## Producing and Consuming Your First Message

For this quick start, we'll keep everything in the main application class. In a real application, you'd separate producers and consumers into their own classes, but this keeps the demo focused.

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // Spring Boot picks up any NewTopic beans and hands them to a KafkaAdmin,
    // which on startup asks the broker to create them.
    // The admin client uses "create if not exists," so if the topic
    // already exists, the broker just shrugs and moves on.
    @Bean
    NewTopic greetings() {
        return TopicBuilder.name("greetings")
                .partitions(1)
                .replicas(1)
                .build();
    }

    @Bean
    ApplicationRunner runner(KafkaTemplate<String, String> template) {
        return args -> template.send("greetings", "Hello, Kafka!");
    }

    @KafkaListener(topics = "greetings", groupId = "demo")
    void listen(String message) {
        System.out.println("Received message: " + message);
    }
}
```

Let's break down what's happening here.

### Creating a Topic

The `NewTopic` bean tells Spring Boot's `KafkaAdmin` to create a topic called "greetings" with one partition and one replica. Since we're running locally with a single broker, one of each is all we need. The `TopicBuilder` provides a fluent API that makes this straightforward.

### Sending a Message with KafkaTemplate

The `ApplicationRunner` bean gives us a hook into the application startup lifecycle. After all beans are created and the application context is ready, Spring calls this runner. We inject a `KafkaTemplate<String, String>` and use its `send` method to publish "Hello, Kafka!" to the "greetings" topic.

`KafkaTemplate` is one of the best parts of Spring for Apache Kafka. No broker URL configuration in code, no serializer setup, no producer factory creation. All of that is auto-configured from your `application.yaml`.

### Consuming a Message with @KafkaListener

The `@KafkaListener` annotation tells Spring to subscribe to the "greetings" topic under the consumer group "demo." Behind the scenes, Spring runs a pull loop, commits offsets, and handles rebalancing when consumers join or leave. Every time a new message arrives on the topic, Spring calls the `listen` method with the message payload.

### Running the Application

Make sure Docker is running, then start your application. You'll see a fair amount of log output from Kafka's internal configuration (you can tune this down later), and then at the end:

```
Received message: Hello, Kafka!
```

That's it. You just produced and consumed your first Kafka message with Spring Boot.

## Adding a Kafka UI for Development

Seeing messages flow through the console is great, but having a visual dashboard makes development much more pleasant. You can add [Kafka UI](https://github.com/provectus/kafka-ui) as a second service in your `compose.yaml`:

```yaml
services:
  kafka:
    image: 'apache/kafka-native:latest'
    ports:
      - '9092:9092'
  kafka-ui:
    image: 'provectuslabs/kafka-ui:latest'
    ports:
      - '8081:8080'
    environment:
      DYNAMIC_CONFIG_ENABLED: 'true'
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092
    depends_on:
      - kafka
```

Restart your application, then open `http://localhost:8081` in your browser. You'll see a dashboard showing your cluster, brokers, and topics. Navigate to the "greetings" topic and click on "Messages" to see the "Hello, Kafka!" message along with its partition, offset, and timestamp. Even if you only use this during development, it's a nice way to get visibility into what's happening inside Kafka.

## Testing with Embedded Kafka

Testing was historically one of the hardest parts of working with Kafka. You'd need an external broker running, or you'd have to mock everything and hope your integration logic was correct. Spring for Apache Kafka solves this with Embedded Kafka, a single annotation that starts a real Kafka broker inside your test. No Docker, no external dependencies.

```java
@SpringBootTest
@EmbeddedKafka(topics = "greetings", partitions = 1)
class KafkaMessageTests {

    @Autowired
    KafkaTemplate<String, String> template;

    @Autowired
    EmbeddedKafkaBroker embeddedKafka;

    @Test
    void sendsAndReceivesMessages() {
        var consumerProps = KafkaTestUtils.consumerProps(embeddedKafka, "test-group", "true");

        try (var consumer = new KafkaConsumer<>(consumerProps, new StringDeserializer(), new StringDeserializer())) {
            consumer.subscribe(List.of("greetings"));

            // Drain any messages already produced at startup (from the ApplicationRunner)
            KafkaTestUtils.getRecords(consumer, Duration.ofSeconds(1));

            // Send a new message from the test
            template.send("greetings", "Hello from test");

            // Read the single record back
            ConsumerRecord<String, String> record =
                    KafkaTestUtils.getSingleRecord(consumer, "greetings", Duration.ofSeconds(5));

            assertEquals("Hello from test", record.value());
        }
    }
}
```

The `@EmbeddedKafka` annotation starts a real Kafka broker in-process. Your `@KafkaListener` really runs, your `KafkaTemplate` really sends, and you can assert on what actually happened. The test looks almost like a standard `@SpringBootTest` you'd write for a REST endpoint.

A couple of things worth noting in this test. First, we drain any existing messages before sending our test message. This is because the `ApplicationRunner` fires on startup and produces a message, and we don't want that interfering with our assertion. Second, we use `KafkaTestUtils` to create consumer properties and retrieve records, which handles the boilerplate of setting up a test consumer.

## When to Reach for Kafka (and When Not To)

Kafka is a fantastic tool, but it's not the right tool for every job. Reach for Kafka when you have high-volume event streams, when multiple teams want to react to the same data without coupling, when you need replay history to rebuild a cache or backfill a new feature, or when ordering within a key matters.

If you just need a job queue for a couple of background tasks, Kafka is overkill. Something like RabbitMQ or Amazon SQS (Simple Queue Service) might be a better fit. Everything in software is a trade-off, so pick the tool that matches the problem you're actually solving.

## Where to Go From Here

You now have a working Spring Boot application that creates a Kafka topic, produces messages, consumes them, and tests the whole flow with an embedded broker. That's a solid foundation to build on.

Some next steps to explore:

- **Sending JSON objects** instead of plain strings (Spring handles serialization automatically)
- **Using message keys** to control which partition events land in
- **Multiple consumers** and consumer groups for parallel processing
- **Spring Modulith** with externalized events, where you can publish module events directly to Kafka using the `@Externalized` annotation

The [Spring for Apache Kafka reference documentation](https://docs.spring.io/spring-kafka/reference/) is thorough and well-organized. There are also [sample projects on the Spring Kafka GitHub repository](https://github.com/spring-projects/spring-kafka/tree/main/samples) that cover more advanced scenarios.

One word of advice: the documentation covers every configuration option Kafka supports, and that can feel overwhelming. Don't try to learn it all at once. Start with what you built today, and layer on complexity as your requirements demand it.

Happy Coding!