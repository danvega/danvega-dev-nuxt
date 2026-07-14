---
title: "Spring Modulith Durable Events: Reliable Event Processing Without a Message Broker"
slug: spring-modulith-durable-events
description: "Learn how Spring Modulith's event publication registry persists and replays failed events across restarts, giving you a transactional outbox with no message broker."
author: "Dan Vega"
tags:
  - Spring Boot
  - Spring Modulith
keywords:
  - Spring Modulith durable events
  - Spring Modulith event publication registry
  - Spring Boot modular monolith
  - Spring application events
  - Spring Modulith transactional outbox
  - Spring Modulith tutorial
  - Spring Data JDBC events
date: 2026-05-14T09:00:00.000Z
published: true
cover: spring-modulith-durable-events.jpg
video: https://www.youtube.com/embed/KLX9ulb2AfM
---


Most developers reach for a message broker the second they hear "reliable events." RabbitMQ, Kafka, ActiveMQ... the list goes on. But what if you could get durable, replayable events without adding a single piece of infrastructure to your stack? Spring Modulith ships with a built-in event publication registry that persists events to your existing database and can replay them after failures or restarts. In this post, I'll walk you through how to set it up and see it in action.

::GitHubRepo{url="https://github.com/danvega/modulith-durable-events"}
Follow along with the complete working example.
::

## The Problem: Events That Disappear

If you've been following along with the Spring Modulith series, you know that modules communicate with each other through application events. Module A publishes an event, Module B listens for it and reacts. This is a clean pattern that keeps your modules decoupled.

But what happens when something goes wrong on the listener side? Maybe the database is temporarily unavailable. Maybe there's a bug in the listener code. Maybe the server crashes right after the event was published but before the listener could process it.

In a plain Spring application, that event is just gone. The publisher did its job, the listener never got a chance to do its job, and nobody knows anything went wrong. For a lot of use cases, that's not acceptable. You need those events to survive failures.

Spring Modulith solves this with its **event publication registry**. Every published event gets persisted to a database table. If a listener fails to process the event, it stays in the registry with a "failed" status and can be resubmitted later, including automatically on application restart.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with the following dependencies:

- **Spring Web** for our REST API
- **Spring Modulith** for the modular architecture and event infrastructure
- **Spring Data JDBC** for data access
- **PostgreSQL Driver** for our database
- **Docker Compose Support** so Postgres starts automatically with our app

The Docker Compose support is a nice quality-of-life feature here. Instead of remembering to run `docker compose up` before starting your application, Spring Boot handles it for you. When the application starts, the Postgres container spins up automatically.

Once you generate and open the project, create a `compose.yaml` in the root if one doesn't already exist. The Docker Compose support will pick it up and manage the container lifecycle for you.

## Building the Modules

Our application models a meetup platform. We have two modules:

1. **Meetup** (events module) where users create meetups and RSVP
2. **Notifications** where we send confirmations when someone RSVPs

These two modules should not directly depend on each other. The meetup module publishes an event, and the notification module listens for it. That's the only coupling between them.

### The Meetup Module

The meetup module lives in the `meetup` package and has a few records that represent our domain:

```java
public record Meetup(@Id Long id, String title, LocalDateTime date) {
    public static Meetup of(String title, LocalDateTime date) {
        return new Meetup(null, title, date);
    }
}
```

```java
public record Rsvp(@Id Long id, Long meetupId, String name, String email) {
    public static Rsvp of(Long meetupId, String name, String email) {
        return new Rsvp(null, meetupId, name, email);
    }
}
```

And then there's the event itself. This record doesn't map to a database table. It's the message that gets published when someone RSVPs:

```java
public record RsvpReceived(Long meetupId, String name, String email) {
}
```

In Spring Modulith, anything in the top-level package of a module is public to other modules. Anything in a sub-package (like `internal`) is private. The `RsvpReceived` record lives at the top level because the notification module needs to see it. The repositories, service, and controller live inside `internal` because they're implementation details.

The `MeetupService` is where the interesting work happens:

```java
@Service
@Transactional
public class MeetupService {

    private static final Logger log = LoggerFactory.getLogger(MeetupService.class);

    private final MeetupRepository meetupRepository;
    private final RsvpRepository rsvpRepository;
    private final ApplicationEventPublisher events;

    public MeetupService(MeetupRepository meetupRepository,
                         RsvpRepository rsvpRepository,
                         ApplicationEventPublisher events) {
        this.meetupRepository = meetupRepository;
        this.rsvpRepository = rsvpRepository;
        this.events = events;
    }

    public Meetup create(String title, LocalDateTime date) {
        Meetup saved = meetupRepository.save(Meetup.of(title, date));
        log.info("Created meetup: {}", saved);
        return saved;
    }

    public Rsvp rsvp(Long meetupId, RsvpRequest request) {
        Rsvp saved = rsvpRepository.save(Rsvp.of(meetupId, request.name(), request.email()));
        log.info("RSVP saved: {}", saved);
        events.publishEvent(new RsvpReceived(meetupId, request.name(), request.email()));
        return saved;
    }
}
```

The `ApplicationEventPublisher` has been in Spring Framework since version 1.1.1. There's nothing Modulith-specific about publishing the event. The magic is in what happens after the event is published.

### The Notification Module

The notification module lives in a separate `notifications` package. Everything inside is internal, meaning no other module can reach in and call its classes directly. It has a `Confirmation` record, a repository, and a listener:

```java
public record Confirmation(@Id Long id, Long meetupId, String email) {
    public static Confirmation of(Long meetupId, String email) {
        return new Confirmation(null, meetupId, email);
    }
}
```

The listener is where we react to the RSVP event:

```java
@Component
public class NotificationListener {

    private static final Logger log = LoggerFactory.getLogger(NotificationListener.class);

    private final ConfirmationRepository confirmationRepository;

    @Value("${notifications.fail:false}")
    private Boolean failOnPurpose;

    public NotificationListener(ConfirmationRepository confirmationRepository) {
        this.confirmationRepository = confirmationRepository;
    }

    @ApplicationModuleListener
    public void on(RsvpReceived event) {
        if (failOnPurpose) {
            throw new RuntimeException("Simulated failure!");
        }
        Confirmation saved = confirmationRepository.save(
            Confirmation.of(event.meetupId(), event.email())
        );
        log.info("Saved confirmation: {}", saved);
    }
}
```

The `@ApplicationModuleListener` annotation comes from Spring Modulith. It's syntactic sugar that combines `@Transactional`, `@TransactionalEventListener`, and `@Async`. This is the generally recommended setup for integrating application modules via events.

Notice how the method signature drives the event routing. Because the method parameter is `RsvpReceived`, this listener will be invoked whenever an `RsvpReceived` event is published. You could have ten different listeners across ten different modules all responding to the same event.

The `failOnPurpose` flag is there so we can simulate a failure. In a real application, this could be a network timeout, a database constraint violation, or any unexpected error.

## The Database Schema

We need three application tables plus the event publication table. Create a `schema.sql` in `src/main/resources`:

```sql
CREATE TABLE IF NOT EXISTS meetup (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS rsvp (
    id SERIAL PRIMARY KEY,
    meetup_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS confirmation (
    id SERIAL PRIMARY KEY,
    meetup_id BIGINT NOT NULL,
    email VARCHAR(255) NOT NULL
);
```

To have Spring Boot run this schema on startup, add this to your `application.yaml`:

```yaml
spring:
  sql:
    init:
      mode: always
```

The event publication table is created automatically by Spring Modulith. You don't need to write SQL for it.

## Enabling Durable Events

Here's where it all comes together. Add these properties to your `application.yaml`:

```yaml
spring:
  modulith:
    events:
      jdbc:
        schema-initialization:
          enabled: true
    republish-outstanding-events-on-restart: true

notifications:
  fail: true
```

Let's break down what each of these does:

- `schema-initialization.enabled: true` tells Spring Modulith to create the `event_publication` table automatically. If you're using a migration tool like Flyway or Liquibase, you can set this to `false` and manage the schema yourself. The [Spring Modulith documentation appendix](https://docs.spring.io/spring-modulith/reference/appendix.html) has the canonical SQL for each supported database.

- `republish-outstanding-events-on-restart: true` is the key property. When the application starts up, Spring Modulith will look for any events in the registry that were never completed and re-publish them.

- `notifications.fail: true` is our simulated failure flag. We'll flip this to `false` after watching the failure happen.

### How the Dependencies Work

When you selected Spring Modulith and Spring Data JDBC at start.spring.io, you got both `spring-modulith-starter-core` and `spring-modulith-starter-jdbc`. The JDBC starter is what provides the event publication registry backed by your relational database. If you were using JPA instead of JDBC, you'd get `spring-modulith-starter-jpa`. The registry implementation adapts to whatever data access technology you're using.

## Watching It Work

Start the application. Docker Compose will spin up Postgres, Spring Boot will create the schema, and Spring Modulith will create the `event_publication` table.

Before hitting any endpoints, take a look at the database. You should see four tables: `meetup`, `rsvp`, `confirmation`, and `event_publication`. All empty.

### Step 1: Create a Meetup

```bash
curl -X POST http://localhost:8080/meetups \
  -H "Content-Type: application/json" \
  -d '{"title": "Spring Modulith Workshop", "date": "2025-08-01T18:00:00"}'
```

Check the `meetup` table and you'll see a new row.

### Step 2: RSVP (and watch it fail)

```bash
curl -X POST http://localhost:8080/meetups/1/rsvp \
  -H "Content-Type: application/json" \
  -d '{"name": "Dan Vega", "email": "dan@example.com"}'
```

Now check the database:

- **rsvp table**: Has a new row. The RSVP was saved successfully.
- **confirmation table**: Empty. The notification listener threw an exception before it could save the confirmation.
- **event_publication table**: Has a row with a `null` completion date and a status of `FAILED`.

This is the critical part. The event was published and persisted. Even though the listener failed, the system knows about the unprocessed event.

### Step 3: Fix and Restart

Go back to `application.yaml` and change `notifications.fail` to `false`:

```yaml
notifications:
  fail: false
```

Now restart the application. Because we set `republish-outstanding-events-on-restart: true`, Spring Modulith will find that failed event in the registry and re-publish it. This time the listener processes it successfully.

Check the database again:

- **confirmation table**: Now has a row. The confirmation was saved.
- **event_publication table**: The event now has a completion date and a status of `COMPLETED`.

That's it. The event survived a restart and was processed successfully on the second attempt.

## Why This Matters

This pattern gives you a lot of value without a lot of complexity. Think about what would happen if a customer RSVPs for a meetup but never gets a confirmation email. Without the event publication registry, you'd have no idea that the notification listener failed. You'd have no record of the failed attempt. You'd have no way to automatically retry it.

With the registry, you get all of that. And the first place you'd look when debugging a missing confirmation is the `event_publication` table. Did the event get published? Did it complete? When did it fail?

You also don't need to set up and manage a separate message broker to get this reliability. Your existing Postgres database (or whatever relational database you're using) handles the persistence. For many applications, especially modular monoliths, this is more than enough.

## Verifying Module Boundaries

One thing I glossed over is the test that verifies our modular structure. Spring Modulith can analyze your module boundaries and make sure no module is reaching into another module's internals:

```java
@Test
void verifyModularStructure() {
    ApplicationModules.of(MeetupApplication.class).verify();
}
```

If you accidentally inject a `NotificationListener` into your `MeetupController`, this test will fail. That boundary enforcement is what keeps your monolith from becoming the big ball of mud that everyone dreads.

Make sure to add an `application.yaml` under `src/test/resources` to disable Docker Compose during tests:

```yaml
spring:
  docker:
    compose:
      enabled: false
```

## What's Next

Spring Modulith's event publication registry covers a lot of ground, but there's more to explore. You might want to look into:

- **Customizing retry strategies** for failed events
- **Cleaning up completed events** from the registry
- **Observability** with Spring Modulith's built-in support for tracing events across modules
- **Externalizing events** to a message broker when you outgrow the in-process model

The [Spring Modulith documentation on application events](https://docs.spring.io/spring-modulith/reference/events.html) covers event publication lifecycles, repositories, and more advanced scenarios. It's well-written and worth reading through.

If you're building a monolith with Spring Boot (and most of us are), Spring Modulith is worth serious consideration. It gives you the structure of a modular architecture with the simplicity of a single deployable. And features like durable events show that you don't always need to reach for more infrastructure to solve reliability problems.

Happy Coding!