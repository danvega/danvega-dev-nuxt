---
title: "Spring JMS Client: A Complete Guide to JmsClient in Spring Boot 4"
slug: jms-client
date: 2025-12-05T09:00:00.000Z
published: true
description: Master the Spring JMS Client with this complete Spring Boot 4 JmsClient tutorial. Learn when to choose JMS over Kafka, configure message conversion, and send messages using Spring's fluent API.
author: Dan Vega
tags:
- Java
- Spring Boot
- JMS
cover: ./jms_client_cover.png
video: https://www.youtube.com/embed/91xVrWlzIe4
github: https://github.com/danvega/
keywords: spring jms client, spring boot 4 jms client, JmsClient, spring boot jms tutorial, jms messaging spring boot, activemq artemis spring boot, jms vs kafka, spring jms template vs jmsclient, java message service spring, enterprise java messaging
---

When developers ask me about messaging in Java, they often jump straight to Kafka or RabbitMQ. And I get it. Those 
technologies dominate the conversation in cloud-native circles. But JMS (Java Message Service) keeps quietly powering 
critical systems in industries where reliability isn't optional.

In this post, I want to make the case for why JMS still deserves a place in your toolkit. You'll learn when 
it's the right choice and some compaitble brokers to choose from. Finally, you'll learn about the new 'JmsClient' API
that makes working with JMS in Spring Boot 4 a breeze.

::GitHubRepo{url="https://github.com/danvega/jms-orders"}
Follow along with the complete working example.
::

## A Brief History of JMS

JMS has been around since 1998. That's older than most developers reading this post. It was created as a standard API 
for Java applications to communicate with message brokers, and it became part of Java EE (now Jakarta EE).

The spec is now maintained as Jakarta Messaging, and it continues to evolve. But here's what matters: the fundamental 
patterns it established, such as queues, topics, message acknowledgment, and transactional messaging, remain the 
foundation of how we think about asynchronous communication.

When you learn JMS concepts like request-reply, message priority, time-to-live, and delivery guarantees, 
you're learning patterns that transfer directly to Kafka, RabbitMQ, AWS SQS, and any other messaging system you'll encounter.

## Why JMS Still Matters

Let me be direct: if you're building a new startup on Kubernetes and need event streaming for millions of events per 
second, JMS probably isn't your first choice. But that's not the only context that exists.

**Enterprise systems run on JMS.** Financial services, healthcare, insurance, government, and large retail organizations have decades of investment in JMS infrastructure. These systems process real transactions with real money and real consequences. They're not going away, and someone needs to maintain and extend them.
**Transactional integrity matters.** JMS integrates with JTA (Java Transaction API) to provide distributed transactions across databases and message brokers. When you need a message send and a database write to either both succeed or both fail, JMS gives you that guarantee out of the box. Try getting that level of coordination with Kafka.
**Standards provide stability.** The Jakarta Messaging specification means you can swap brokers without rewriting application code. Your code works with ActiveMQ, IBM MQ, or any compliant broker. That kind of portability matters in organizations that think in decades, not deployment cycles.
**The tooling is mature.** After 25+ years, JMS brokers are battle-tested. ActiveMQ Artemis, the broker I use in my examples, handles clustering, high availability, and management consoles without third-party add-ons.

## When to Choose JMS

Here's a practical decision framework:

**Reach for JMS when:**

- You're integrating with existing Java enterprise systems that already use JMS
- You need distributed transactions coordinating database operations with messaging
- Your organization requires Jakarta EE compliance
- You're working in regulated industries (finance, healthcare) where proven, auditable technology matters
- You need point-to-point messaging with strong delivery guarantees
- Your team already knows JMS and the problem doesn't require something more specialized

**Consider alternatives when:**

- You need event streaming with replay capabilities (Kafka)
- You're processing millions of events per second (Kafka, Pulsar)
- You want flexible routing patterns like topic exchanges (RabbitMQ)
- You're building on cloud infrastructure and want managed services (SQS, Cloud Pub/Sub)
- Your team has no JMS experience and no existing JMS infrastructure

Multiple technologies can solve most messaging problems. The "best" choice depends on your team's expertise, 
your organization's existing infrastructure, and your specific requirements.

## JMS-Compatible Brokers

If you decide JMS fits your needs, you have options:

**Open Source:**
- Apache ActiveMQ Artemis (my recommendation for new projects)
- Apache ActiveMQ Classic (widely deployed, but Artemis is the future)

**Cloud Managed:**
- Amazon MQ (managed ActiveMQ/Artemis on AWS)
- Azure Service Bus Premium (full JMS 2.0 support)

**Enterprise:**
- IBM MQ
- TIBCO EMS
- Oracle WebLogic JMS

For this post, I'm using ActiveMQ Artemis because it's modern, actively developed, and easy to run locally with Docker.

## Getting Started with Spring Boot 4's JmsClient

Now let's look at the code. Spring Framework 6.1 introduced `JmsClient`, a fluent API that replaces the verbose `JmsTemplate` patterns we've been writing for years.

### Project Setup

Create a new Spring Boot 4 project with the Artemis starter:

```xml
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-artemis</artifactId>
</dependency>
```

Add a `compose.yaml` to run Artemis locally:

```yaml
services:
artemis:
image: apache/activemq-artemis:latest
ports:
  - "61616:61616"
  - "8161:8161"
```

Spring Boot's Docker Compose support automatically starts the broker when you run your application. No manual container management needed.

### The Order Model

Before diving into sending and receiving, let's define the domain object we'll be messaging. I'm using a Java record for a clean, immutable representation:

```java
public record Order(
    String orderId,
    String customerId,
    BigDecimal amount,
    OrderStatus status,
    LocalDateTime timestamp
) {
    public enum OrderStatus {
        PENDING, PROCESSING, COMPLETED, FAILED
    }
}
```

Records are ideal for messages because they're immutable and automatically provide `equals()`, `hashCode()`, and `toString()` methods.

### Message Conversion

Here's something the code examples above gloss over: how does `jmsClient.send(order)` know how to turn an `Order` object into a JMS message? The answer is a `MessageConverter`.

JMS messages are typically text, bytes, or serialized objects. To send rich domain objects like our `Order` record, we need to convert them to a format that JMS understands. JSON is a natural choice because it's human-readable and works well across systems.

Here's a custom converter that handles this:

```java
@Component
public class JacksonJmsMessageConverter implements MessageConverter {

    private final JsonMapper jsonMapper;

    public JacksonJmsMessageConverter() {
        this.jsonMapper = JsonMapper.builder()
                .findAndAddModules()
                .build();
    }

    @Override
    public Message toMessage(Object object, Session session) throws JMSException {
        try {
            String json = jsonMapper.writeValueAsString(object);
            TextMessage message = session.createTextMessage(json);
            message.setStringProperty("_type", object.getClass().getName());
            return message;
        } catch (Exception e) {
            throw new JMSException("Failed to convert to JSON: " + e.getMessage());
        }
    }

    @Override
    public Object fromMessage(Message message) throws JMSException {
        if (message instanceof TextMessage textMessage) {
            try {
                String json = textMessage.getText();
                String className = message.getStringProperty("_type");
                Class<?> clazz = Class.forName(className);
                return jsonMapper.readValue(json, clazz);
            } catch (Exception e) {
                throw new JMSException("Failed to parse JSON: " + e.getMessage());
            }
        }
        throw new JMSException("Only TextMessage is supported");
    }
}
```

A few things to note:

- **TextMessage over ObjectMessage**: Using JSON text messages is more portable across systems than Java serialization. Other applications (even non-Java ones) can read JSON.
- **Type preservation**: The `_type` message property stores the fully qualified class name, so the converter knows which class to deserialize into.
- **Automatic module discovery**: `findAndAddModules()` lets Jackson handle `LocalDateTime`, `BigDecimal`, and other types without manual configuration.
- **Spring auto-detection**: The `@Component` annotation means Spring automatically registers this converter with `JmsClient`.

### Sending Messages

Here's where `JmsClient` shines. Compare the old approach:

```java
// JmsTemplate - works, but verbose
jmsTemplate.convertAndSend("order-queue", order, message -> {
message.setStringProperty("region", "US-WEST");
message.setJMSPriority(9);
return message;
});
```

With the new fluent API:

```java
// JmsClient - cleaner and more readable
jmsClient
.destination("order-queue")
.header("region", "US-WEST")
.priority(9)
.send(order);
```

Spring Boot auto-configures a `JmsClient` bean, so you can inject it directly:

```java
@Service
public class OrderMessagingService {

private final JmsClient jmsClient;

public OrderMessagingService(JmsClient jmsClient) {
    this.jmsClient = jmsClient;
}

public void sendOrder(Order order) {
    jmsClient
        .destination("order-queue")
        .send(order);
}
}
```

### Receiving Messages

For consuming messages, the `@JmsListener` annotation remains the standard approach:

```java
@JmsListener(destination = "order-queue")
public void handleOrder(Order order) {
log.info("Processing order: {}", order.orderId());
// Your business logic here
}
```

Spring handles connection management, threading, and acknowledgment automatically.

### Request-Reply Pattern

One pattern worth highlighting is request-reply, where you send a message and wait for a response:

```java
public ProcessedOrder processOrder(Order order) {
return jmsClient
    .destination("order-processing-queue")
    .sendAndReceive(order, ProcessedOrder.class);
}
```

The `JmsClient` creates a temporary reply queue, sets the appropriate headers, and waits for the response. This pattern is useful for synchronous workflows where you need confirmation before proceeding.

## Running the Demo

I've put together a complete demo application with seven messaging patterns you can explore:

```bash
git clone https://github.com/danvega/jms-orders.git
cd jms-orders
./mvnw spring-boot:run
```

Send a test message:

```bash
curl -X POST http://localhost:8080/api/orders/simple \
-H "Content-Type: application/json" \
-d '{"orderId":"ORD-001","customerId":"CUST-123","amount":299.99,"status":"PENDING","timestamp":"2025-01-15T10:30:00"}'
```

Visit http://localhost:8161 (admin/admin) to see messages in the ActiveMQ console.

The repository includes examples of basic sends, priority handling, custom headers, synchronous receives, request-reply, and reusable send handles. Each pattern is documented with comments explaining when you'd use it.

## Wrapping Up

JMS isn't the newest technology in the messaging space, but it's far from obsolete. In contexts where transactional integrity, standardization, and proven reliability matter, it remains a solid choice.

Spring Boot 4's `JmsClient` API makes the developer experience significantly better. The fluent interface reads naturally, and Spring's auto-configuration means you can get a working system with minimal boilerplate.

If you're working in an enterprise environment or maintaining systems that use JMS, I hope this post helps you see that the technology is worth investing in. And if you're evaluating messaging options for a new project, I hope it gives you a clearer picture of when JMS makes sense.

Happy Coding!