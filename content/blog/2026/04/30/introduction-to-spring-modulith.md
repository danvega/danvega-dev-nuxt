---
title: "Introduction to Spring Modulith: Building Modular Monoliths with Spring Boot"
slug: introduction-to-spring-modulith
description: "Learn how Spring Modulith helps you build well-structured Spring Boot applications with enforced module boundaries, event-driven communication, and a clear path from monolith to modular monolith."
author: "Dan Vega"
tags:
  - Spring Boot
  - Spring Modulith
  - Java
  - Modular Monolith
keywords:
  - spring modulith tutorial
  - modular monolith spring boot
  - spring modulith example
  - spring boot application architecture
  - spring modulith events
  - spring boot module boundaries
  - spring modulith verification test
date: 2026-04-30T09:00:00.000Z
published: true
cover: introduction-to-spring-modulith.jpg
video: https://www.youtube.com/embed/xHlDyKVyvig
---


Most Spring Boot applications start with good intentions. Clean packages, sensible naming, a clear separation of concerns. Six months and three developers later, everything touches everything else, and you have a monolith that's more mud than architecture. The alternative, microservices, solves the boundary problem but introduces an entirely new universe of complexity: distributed tracing, network failures, deployment orchestration, and eventual consistency headaches.

There's a middle path that gives you enforced boundaries without the operational tax of distributed systems. That path is [Spring Modulith](https://spring.io/projects/spring-modulith), and in this post we'll walk through building a modular monolith from scratch by converting a traditional Spring Boot application one step at a time.

::GitHubRepo{url="https://github.com/danvega/contentmod"}
Follow along with the complete working example.
::

## Why a Modular Monolith?

A well-structured monolith is the right answer for most applications, most of the time. That might sound bold, but hear me out.

The big problem with the "let's go microservices" approach is that most teams jump too far, too fast. You trade package-level coupling for network-level coupling, and suddenly you're debugging timeout issues at 2 AM instead of fixing an import statement. A modular monolith gives you clear boundaries between parts of your system while keeping everything in a single deployable unit.

Here's what you get:

- **Clear boundaries** between modules, enforced by tests and the compiler
- **Independent testability** for each module in isolation
- **Loose coupling** through event-driven communication
- **An optional path to extraction** if a module eventually becomes a good microservice candidate

And here's what you get to avoid: network failure modes, complex deployment topologies, distributed tracing setup, and those eventual consistency surprises that pop up when you split things apart too early.

### High Cohesion, Low Coupling

This has been a foundational principle of software development for decades, but it's worth revisiting.

**High cohesion** means a module does one thing well. Everything inside belongs together and serves a single focused purpose. **Low coupling** means modules don't know too much about each other. They communicate through narrow, well-defined contracts instead of reaching into each other's internals.

In a big ball of mud, you have low cohesion and high coupling. Every change is terrifying because you never know what might break. With well-drawn boundaries, changes stay local. Fixes live in one place. You can reason about a single module without holding the entire application in your head.

## What Spring Modulith Actually Does

Spring Modulith is a structural toolkit, not a runtime framework. It doesn't fundamentally change how your Spring Boot application runs. Instead, it helps you define, verify, and enforce module boundaries.

The core idea is beautifully simple: **a module is a package**. Every direct sub-package of your `@SpringBootApplication` class becomes an application module. That's it.

```
com.example.shop/             ← base package (Spring Boot app lives here)
├── order/                    ← module "order" (public API)
│   └── internal/             ← internal to the order module
└── inventory/                ← module "inventory" (public API)
    └── internal/             ← internal to the inventory module
```

Two rules define the foundation:

1. Types in the top-level module package (like `order/`) are the module's **public API**. Other modules can reference them.
2. Types in any sub-package (like `order/internal/`) are **internal**. Other modules referencing them will cause a verification failure.

When modules need to communicate, they do so through **application events** instead of direct method calls. This is the connective tissue that keeps modules decoupled while still allowing them to coordinate.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with these dependencies:

- **Spring Web** (for REST endpoints)
- **Spring Modulith** (the star of the show)
- **Spring Data JDBC** (for persistence)
- **PostgreSQL Driver**
- **Docker Compose Support** (to run Postgres locally)

The repository has branches for each step of the journey. We'll walk through them in order, starting with a plain monolith and ending with a fully modular application with durable events.

## Step 1: The Starting Monolith

We're building a content moderation system where users can publish content (blog posts, videos, newsletters) and subscribers get notified. It's a simple domain that illustrates the problem well.

The initial structure looks like every Spring Boot tutorial you've ever seen: two top-level packages organized by feature.

```
com.danvega.contentmod/
├── publishing/
│   ├── Content.java
│   ├── ContentController.java
│   ├── ContentPublished.java
│   ├── ContentRepository.java
│   └── PublishingService.java
└── notification/
    ├── Subscriber.java
    ├── SubscriberRepository.java
    └── NotificationService.java
```

The `Content` record maps to a database table:

```java
@Table("content")
public record Content(
    @Id Long id,
    String title,
    String url,
    String type
) {}
```

The `PublishingService` handles content creation and directly calls `NotificationService`:

```java
@Service
public class PublishingService {

    private final ContentRepository contentRepository;
    private final NotificationService notificationService;

    public PublishingService(ContentRepository contentRepository, NotificationService notificationService) {
        this.contentRepository = contentRepository;
        this.notificationService = notificationService;
    }

    public Content publish(Content content) {
        Content saved = contentRepository.save(content);
        notificationService.notifySubscribers(saved);
        return saved;
    }
}
```

Save the post, fire the notification, return to the user. It works. Ship it.

### What's Actually Wrong Here?

Nothing is broken. The code compiles, the tests pass, the application runs. But this is just a monolith with packages. Here's what's true about this code:

**Everything is public.** Every type is reachable from anywhere in the application. The packages are organizational, not architectural. They group related files for human readability and nothing more.

**Nothing stops a developer from doing the wrong thing.** From inside `notification`, you could autowire `ContentRepository` and start querying published data directly. Spring would happily inject it. Six months later, three engineers have done this in slightly different ways, and notifications is silently coupled to the publishing schema.

**Publishing directly calls notification.** If notifications fail, publishing fails. If notifications are slow, publishing is slow. Adding any new listener (analytics, search indexing, webhooks) requires modifying `PublishingService`.

Delete the package boundaries, dump all the files into a single package, and the application behaves identically. The structure isn't enforcing anything. You've put up a fence, but there are no gates and no posts.

## Step 3: The Verification Test That Catches Everything

Spring Modulith provides a verification test that analyzes your module structure and flags problems. Create this test class:

```java
class ModularityTests {

    @Test
    void verifyModularity() {
        ApplicationModules.of(ContentModApplication.class).verify();
    }
}
```

Run it. It fails.

The output tells us something important about our architecture: **a cycle was detected**. The `notification` module depends on `publishing` (because `NotificationService` accepts `Content` as a parameter), and `publishing` depends on `notification` (because `PublishingService` calls `NotificationService`). Two arrows, two directions, tangled.

Spring Modulith catches this immediately, without us drawing any boundaries at all. The cycle was already there in our Step 1 code. We just couldn't see it without the verification test.

The takeaway: Spring Modulith doesn't magically make your code modular, but it immediately tells you when your modules are tangled.

## Step 4: The First Real Boundary

The smallest possible move that turns two packages into two modules is dropping the `public` keyword from `ContentRepository` and `SubscriberRepository`.

```java
// No 'public' keyword — this is now package-private
interface ContentRepository extends ListCrudRepository<Content, Long> {
}
```

```java
interface SubscriberRepository extends ListCrudRepository<Subscriber, Long> {
}
```

Spring Data JDBC still picks them up through classpath scanning, but now no code outside their own package can import them. This is a core Java feature. The compiler itself stops anyone from reaching in.

If another class in the `notification` package tried to autowire `ContentRepository`, the code wouldn't compile:

```java
// This won't compile — ContentRepository is not public
@Service
public class DigestService {
    private final ContentRepository contentRepository; // ❌ Error!
}
```

This is the first real fence post. The Java compiler is enforcing a boundary for us. But don't take the shortcut of just making things `public` again to fix the compiler error. That's not the solution.

## Step 5: Moving Internals into Sub-Packages

Package-private access control works, but it doesn't scale. Once a module grows past a handful of files, you'll want sub-packages for persistence, web controllers, and other concerns. Spring Modulith has an answer for this.

**Anything in a sub-package of a module is treated as internal.** The module's API is whatever sits at the top-level package. Cross-module references to top-level types are fine, but references that reach into a sub-package are a verification failure.

Here's what the restructured project looks like:

```
com.danvega.contentmod/
├── publishing/
│   ├── Content.java              ← public API (top-level)
│   ├── ContentPublished.java     ← public API (top-level)
│   └── internal/
│       ├── ContentController.java    ← internal
│       ├── ContentRepository.java    ← internal
│       └── PublishingService.java    ← internal
└── notification/
    ├── Subscriber.java           ← public API (top-level)
    └── internal/
        ├── SubscriberRepository.java ← internal
        └── NotificationService.java  ← internal
```

If you're using IntelliJ, you'll notice that Spring Modulith integration shows a green unlocked icon next to top-level packages (public API) and a lock icon next to sub-packages (internal). This visual feedback is really helpful.

A quick clarification that tripped me up at first: putting a controller in `internal` does **not** hide its HTTP endpoints. REST routes live at the HTTP layer, not the JVM layer. Modulith's API versus internal distinction is about which Java types one module is allowed to reference inside another module. No other Java module needs to autowire `ContentController` or import its classes, so it belongs in `internal`.

Running the verification test now shows two failures:

1. The **cycle** between publishing and notification (still there)
2. A **visibility violation**: "Module notification depends on non-exposed type ContentRepository"

If any code in `notification` tries to import from `publishing/internal/`, the verification test catches it. Even if the Java compiler doesn't complain (because the class is technically `public`), Spring Modulith enforces the architectural boundary.

## Step 6: Breaking the Cycle with Events

We've drawn boundaries, but the cycle between publishing and notification remains. Publishing calls notifications directly, and notifications know about publishing's content type. Two modules pointing at each other.

To break the cycle, we only need to flip one direction. Instead of publishing calling notifications directly, publishing will **announce that something happened**. Anyone interested can listen.

First, update `PublishingService` to publish an event instead of calling `NotificationService`:

```java
@Service
public class PublishingService {

    private final ContentRepository contentRepository;
    private final ApplicationEventPublisher eventPublisher;

    public PublishingService(ContentRepository contentRepository, ApplicationEventPublisher eventPublisher) {
        this.contentRepository = contentRepository;
        this.eventPublisher = eventPublisher;
    }

    public Content publish(Content content) {
        Content saved = contentRepository.save(content);
        eventPublisher.publishEvent(new ContentPublished(saved));
        return saved;
    }
}
```

`ApplicationEventPublisher` is from core Spring (it's been around since version 1.1.1). The `ContentPublished` event is a simple record that lives at the top level of the publishing module, making it part of the public API:

```java
public record ContentPublished(Content content) {}
```

Now update `NotificationService` to listen for this event using `@ApplicationModuleListener`:

```java
@Service
public class NotificationService {

    private final SubscriberRepository subscriberRepository;

    public NotificationService(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @ApplicationModuleListener
    public void notifySubscribers(ContentPublished event) {
        Content content = event.content();
        for (Subscriber subscriber : subscriberRepository.findAll()) {
            System.out.println("Notifying " + subscriber.name() + " about: " + content.title());
        }
    }
}
```

The `@ApplicationModuleListener` annotation is a convenience from Spring Modulith that combines async and transactional event listening. The notification module no longer imports anything from publishing's internals. It only references `ContentPublished` and `Content`, both of which are top-level (public API) types in the publishing module.

Now run the verification test:

```java
@Test
void verifyModularity() {
    ApplicationModules.of(ContentModApplication.class).verify();
}
```

**It passes.** No cycles, no visibility violations. The architecture is clean.

This is something you can put in your CI/CD pipeline. Even if a developer tries to violate a boundary, the build will catch it. Hope is not a production strategy, and these tests ensure that your module boundaries are enforced continuously.

## Step 7: Making Events Durable

There's one more problem to address. The event is published during the publishing transaction, but the listener runs after that transaction commits on a different thread. This is good for performance (a slow listener won't slow down publishing), but what happens if the application crashes between the commit and the listener firing?

The content is in the database, but the notification never got sent, and nobody noticed. We traded consistency for latency isolation when we picked async events. We don't want synchronous behavior back, but we do want **at-least-once delivery**.

This is where the **Event Publication Registry** comes in. When the Spring Modulith starter for JDBC is on the classpath, Modulith persists every published event into a database table at the moment of publication, within the same transaction as the business write. After the listener completes successfully, Modulith marks the event as delivered. If the listener never runs, the event sits in the table waiting to be retried.

The application code doesn't change at all. You need two things:

**1. Create the event publication table:**

```sql
CREATE TABLE IF NOT EXISTS event_publication (
    id               UUID NOT NULL,
    listener_id      TEXT NOT NULL,
    event_type       TEXT NOT NULL,
    serialized_event TEXT NOT NULL,
    publication_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completion_date  TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (id)
);
```

You can run this through Flyway, Liquibase, or a one-time `schema.sql` file.

**2. Enable republication on startup in `application.yaml`:**

```yaml
spring:
  modulith:
    republish-outstanding-events-on-restart: true
```

With this configuration, if the application crashes after committing a content record but before the notification fires, the next startup will pick up the incomplete event and retry delivery. Your events are now durable across restarts.

## Recap: From Monolith to Modular Monolith

Let's trace the journey we took:

1. **Two packages talking to each other.** Looks organized, feels clean. It's actually just a monolith. The packages exist for human readability and nothing else.

2. **Adding the verification test.** Spring Modulith catches the cycle between publishing and notification immediately, before we've drawn any boundaries. Cycle detection is free.

3. **Hiding repositories with package-private access.** The first real boundary, enforced by the Java compiler itself.

4. **Moving internals into sub-packages.** This activates Spring Modulith's visibility checks. Reaching into another module's internals now fails the verification test, even when the import compiles.

5. **Breaking the cycle with domain events.** Publishing announces what happened. Notification listens. No direct coupling between the two modules.

6. **Adding the Event Publication Registry.** Events are persisted transactionally with the business write and retried until delivered. Decoupled and durable.

## Resources

If you want to go deeper, here are some excellent places to continue:

- [Spring Modulith Reference Documentation](https://docs.spring.io/spring-modulith/reference/)
- [Spring Modulith Official Examples on GitHub](https://github.com/spring-projects/spring-modulith)
- Talks by Oliver Drotbohm (the creator of Spring Modulith), Josh Long, Cora Iberkleid, and Siva on YouTube

I really think this is how every Spring Boot project should be built. Even if your application is small today, it won't stay small forever. Starting with enforced module boundaries costs almost nothing up front and saves you from architectural headaches down the road. You get most of the upside of microservices with none of the operational tax.

Happy Coding!