---
title: "Java Structured Concurrency in JDK 27: A Practical Example"
slug: java-structured-concurrency-jdk-27
date: 2026-09-19T09:00:00.000Z
published: true
description: "Learn Java structured concurrency in JDK 27 with a runnable example comparing sequential calls, virtual threads, and StructuredTaskScope failure handling."
author: "Dan Vega"
tags:
  - Java
keywords:
  - java structured concurrency
  - StructuredTaskScope
  - JDK 27 structured concurrency
  - virtual threads java
  - JEP 533
  - structured concurrency example
  - Future ExecutionException java
cover: java-structured-concurrency-jdk-27.png
video: https://www.youtube.com/embed/Nl-a4ukWodk
---

Flip one flag and the user service fails after 200 milliseconds. The version built on virtual threads and `Future` still returns after a full second, because it ran the orders call to the end for a result nobody will ever use. The same method with `StructuredTaskScope` returns in 200 milliseconds and interrupts the orders call the instant the user call fails.

That is the problem **Java structured concurrency** addresses. A failure in one task does not automatically stop the others. In this executor example, closing the executor waits for them, so the work stays inside the method but delays its return. In this post we will build the same `loadDashboard` method three times (sequential, then virtual threads with `Future`, then `StructuredTaskScope`) so you can see each problem and each fix for yourself.

::GitHubRepo{url="https://github.com/danvega/structured-concurrency"}
Follow along with the complete working example.
::

## What Is Structured Concurrency in Java?

Structured concurrency treats a group of related tasks running on different threads as a single unit of work. If you have a parent task that spawns two subtasks, the parent owns their scope and waits for them to finish before leaving it. A join policy decides which results are needed and how failures affect the group.

This is part of Project Loom, the collection of JDK Enhancement Proposals (JEPs) focused on lightweight concurrency for the Java Virtual Machine (JVM). Three related features are:

- **Virtual Threads** ([JEP 444](https://openjdk.org/jeps/444)), final in JDK 21. Lightweight threads suited to large numbers of blocking I/O tasks.
- **Scoped Values** ([JEP 506](https://openjdk.org/jeps/506)), final in JDK 25. A way to share immutable context within a bounded lifetime.
- **Structured Concurrency** ([JEP 533](https://openjdk.org/jeps/533)), in its seventh preview in JDK 27.

Virtual threads gave us cheap threads. Structured concurrency gives us a way to group those threads into a unit so failures and cancellation are handled for us. That is the gap this post is about.

One note before we start. This is a preview API. You will see yellow squiggles in your IDE, and you need to run with `--enable-preview`. The API is stable enough to try, but the team keeps the preview label because there is still a chance it could change. [JEP 543](https://openjdk.org/jeps/543) proposes finalizing it in JDK 28 without further changes. That is a proposal, not a reason to treat this JDK 27 API as final.

## Setting Up the Example

Every version calls two mock downstream services and combines the results into a dashboard. Here are the shared types and the fake services. Each service sleeps for one second to simulate a real network call.

```java
record User(String name) {}
record Orders(List<String> items) {}
record Dashboard(User user, Orders orders) {}

static User findUser(String id) throws InterruptedException {
    Thread.sleep(1000); // pretend this is a network call
    return new User("Dan");
}

static Orders fetchOrders(String id) throws InterruptedException {
    Thread.sleep(1000); // pretend this is another network call
    return new Orders(List.of("Fundamentals of Software Engineering"));
}
```

Use JDK 27 for this walkthrough. The full examples catch the seventh preview's checked `ExecutionException`; older previews have a different failure API. The smaller method excerpts alone do not establish that version requirement.

Clone the companion repository and check the Java version before running it:

```bash
git clone https://github.com/danvega/structured-concurrency.git
cd structured-concurrency
java --version
java --enable-preview --source 27 src/main/java/dev/danvega/sc/Sequential.java
java --enable-preview --source 27 src/main/java/dev/danvega/sc/Parallel.java
java --enable-preview --source 27 src/main/java/dev/danvega/sc/Structured.java
```

The excerpts below explain each change. The repository contains the complete files, including imports and entry points. `Parallel.java` starts with `USER_SERVICE_DOWN = false`, while `Structured.java` starts with it set to `true`. Set both flags to the same value when comparing them.

## Version One: The Sequential Approach

Before virtual threads, we usually did this the simple way. Call the first service, wait for it, then call the second.

```java
static Dashboard loadDashboard(String userId) throws InterruptedException {
    User user = findUser(userId);      // 1 second
    Orders orders = fetchOrders(userId); // another 1 second
    return new Dashboard(user, orders);
}
```

Let's time it in `main`.

```java
public static void main(String[] args) throws InterruptedException {
    long start = System.currentTimeMillis();
    System.out.println(loadDashboard("Dan"));
    System.out.println("Returned after " + (System.currentTimeMillis() - start) + "ms");
}
```

Run it and you get:

```
Dashboard[user=User[name=Dan], orders=Orders[items=[Fundamentals of Software Engineering]]]
Returned after 2012ms
```

This is simple but slow. It returns after roughly two seconds because it runs the two calls back to back. There is one nice property here though. If `findUser` fails, `fetchOrders` never even starts. The failure short circuits everything.

The problem is obvious. `fetchOrders` does not depend on `findUser`. They both use the same user ID, but the orders call does not need the user object. So why are we waiting for one to finish before starting the other?

## Version Two: Virtual Threads and Future

Let's run both calls at the same time using virtual threads. We add a flag so we can make the user service fail on demand.

```java
static boolean USER_SERVICE_DOWN = false;

static User findUser(String id) throws InterruptedException {
    if (USER_SERVICE_DOWN) {
        Thread.sleep(200);
        throw new IllegalStateException("User service is down");
    }
    Thread.sleep(1000);
    return new User("Dan");
}
```

Now the parallel version using an `ExecutorService` backed by virtual threads.

```java
static Dashboard loadDashboard(String userId) throws Exception {
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        // Both calls start now, in parallel, each on its own virtual thread
        Future<User> user = executor.submit(() -> findUser(userId));
        Future<Orders> orders = executor.submit(() -> fetchOrders(userId));

        return new Dashboard(user.get(), orders.get());
    }
}
```

With the flag off, this returns in about one second instead of two. Both calls run at the same time. That is the virtual threads win, and it is real.

But now flip `USER_SERVICE_DOWN` to `true` and watch what happens. There are two problems hiding in this code.

**Problem one: a failure does not stop the siblings.** If `user.get()` throws, nobody tells the orders task. It just keeps running. The `try` block uses try-with-resources, so `close()` runs when the block exits, and `close()` waits for every submitted task to finish. So even when the user call has already failed, we sit and wait for the orders call to run to completion. That is a full second of work for a result nobody will use.

**Problem two: the order of your `get` calls decides when you learn about the failure.** We call `user.get()` first, so we notice the failure at 200 milliseconds. Swap the two `get` calls and you wait on `orders.get()` for the full second before you ever learn the user call failed. That is fragile. The behavior of your program should not depend on the order you happened to write two lines.

The root cause is that these two tasks are treated as independent. We used virtual threads, but there is no relationship between the tasks. If both are required to build the dashboard, they should be one unit of work. Right now they are not.

## Version Three: StructuredTaskScope

Here is the complete `Structured.java` program. The `main` method catches the failure so we can still print the elapsed time.

```java
package dev.danvega.sc;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.StructuredTaskScope;
import java.util.concurrent.StructuredTaskScope.Subtask;

/*
 * Concurrent and structured: fast and safe.
 *
 * Same 1000ms as the Future version, but the two subtasks are now
 * owned by this method. They cannot outlive the try block.
 */
public class Structured {

    static final boolean USER_SERVICE_DOWN = true;

    static void main() throws InterruptedException {
        long start = System.currentTimeMillis();
        try {
            System.out.println(loadDashboard("dan"));
        } catch (ExecutionException e) {
            System.out.println("Request failed: " + e.getCause().getMessage());
        }
        System.out.println("Returned after " + (System.currentTimeMillis() - start) + "ms");
    }

    static Dashboard loadDashboard(String userId) throws InterruptedException, ExecutionException {

        // Default policy: wait for all subtasks to succeed or fail as soon
        // as one fails. close() runs at the end of the block whether we
        // returned or threw, and does not return until both threads are done.
        try (var scope = StructuredTaskScope.open()) {

            // Subtask, not Future. No blocking get(), no cancel().
            // Waiting and cancelling belong to the scope now.
            Subtask<User> user = scope.fork(() -> findUser(userId));
            Subtask<Orders> orders = scope.fork(() -> fetchOrders(userId));

            // One wait for the whole group. If either subtask fails, the other
            // is interrupted, and the failure comes out of here as an ExecutionException.
            scope.join();

            // join() returned, so both succeeded and get() cannot fail.
            return new Dashboard(user.get(), orders.get());
        }
    }

    // Types

    record User(String name) {}
    record Orders(List<String> items) {}
    record Dashboard(User user, Orders orders) {}

    // Downstream services. Each sleep stands in for a 1-second network call.

    static User findUser(String id) throws InterruptedException {
        if (USER_SERVICE_DOWN) {
            Thread.sleep(200);
            throw new IllegalStateException("user service is down");
        }
        Thread.sleep(1000);
        return new User("Dan");
    }

    static Orders fetchOrders(String userId) throws InterruptedException {
        Thread.sleep(1000);
        return new Orders(List.of("Fundamentals of Software Engineering"));
    }

}
```

Let's walk through what changed.

`StructuredTaskScope.open()` starts a scope with the default policy: wait for all subtasks to succeed, or fail the whole group as a unit. There are other policies (we will get to those), but this is the common case.

Instead of `executor.submit`, we call `scope.fork`. Instead of a `Future`, we get back a `Subtask`. The key difference is that the subtask has no blocking `get` you call in the middle of your logic, and you never cancel it directly. Waiting and canceling belong to the scope.

`scope.join()` is the single wait point for the whole group. If either subtask fails, the scope interrupts the other one and the failure surfaces here as an `ExecutionException`. Because we only call `user.get()` and `orders.get()` after `join()` returns cleanly, we already know both succeeded. Those `get()` calls cannot fail.

Run it with `USER_SERVICE_DOWN = true`:

```text
Request failed: user service is down
Returned after 209ms
```

The timings are illustrative; your machine will vary.

When the user call fails at about 200 milliseconds, the scope cancels the orders subtask by interrupting it. We do not wait a full second for work we are going to throw away. Compare that to the `Future` version, which still returned after a full second in the same failure case.

Set the flag back to `false` and it returns in about one second with both results, same as the parallel version. We kept the speed and gained coordinated failure handling.

Cancellation is cooperative. `Thread.sleep` responds to interruption, which is why this demo stops quickly. A task that ignores interruption can delay scope closure. `close()` waits until every subtask has finished; it does not forcibly kill a thread.

## Why the JDK 27 API Changed Again

If you followed structured concurrency in an earlier preview, the JDK 27 code above may look a little different. [JEP 533](https://openjdk.org/jeps/533) reworked the exception model, so older tutorials are stale. Here is what matters.

The big one is that `StructuredTaskScope` and `Joiner` gained a third type parameter for the exception that `join()` throws, and calling `join()` on the scope returned by default `open()` can now throw a checked `ExecutionException`. It is `join()` that reports the task failure, not `open()`. The complete example catches that checked exception, which is why it targets JDK 27.

A few other changes worth knowing:

- `allSuccessfulOrThrow()`, `anySuccessfulOrThrow()`, and `awaitAllSuccessfulOrThrow()` now create joiners that make `join()` throw `ExecutionException`, and each has a `Function` overload if you want to map to a custom exception.
- There is a new `open(UnaryOperator<Configuration>)` factory that keeps the default policy but lets you add config like a name or a timeout.
- `Joiner.awaitAll()` was removed.
- `Joiner.onTimeout()` became `timeout()`. When a joiner reports timeout as an exception, `CancelledByTimeoutException` is its cause. With the default policy, inspect the cause of the `ExecutionException`.

Check the preview version when following other tutorials. Older examples using `ShutdownOnFailure`, `throwIfFailed()`, or an unchecked `FailedException` describe a different API.

## Where to Go Next

The default policy is only one of several. Once you are comfortable with the basics, these are worth exploring.

You can race two replicas and take the first success with `Joiner.anySuccessfulOrThrow()`. You can collect successful subtask results with `Joiner.allSuccessfulOrThrow()`. You can add a timeout through scope configuration with `cf -> cf.withTimeout(Duration.ofMillis(500))`. A timeout requests cancellation; scope closure still waits for the tasks to stop.

There is also the observability angle. Because subtasks live inside a scope, they show up nested under that scope in a thread dump. Grab one with:

```
jcmd <pid> Thread.dump_to_file -format=json threads.json
```

Open the JSON and you will see the subtasks nested under the scope that started them. That structure is exactly what "structured" means. Your concurrency has a shape you can read.

## When to Use Structured Concurrency

Reach for a scope when several subtasks belong to one operation, such as loading the independent parts of a dashboard. Their lifetimes should end with that operation, and a failure may make the remaining results useless.

It is not a replacement for every executor. Scheduled work, background jobs that deliberately outlive a request, and CPU-heavy work have different requirements. Virtual threads are most useful here because the tasks spend their time waiting.

Try one more change in the demo: make `fetchOrders` fail while `findUser` is still sleeping. The executor version waits on `user.get()` before discovering the orders failure. The scope can respond to either task failing. That is the behavior to look for when several calls belong to one request.

Happy Coding!  
Dan
