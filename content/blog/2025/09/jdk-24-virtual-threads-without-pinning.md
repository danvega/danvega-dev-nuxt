---
title: "JDK 24's Major Improvement: Virtual Threads Without Pinning"
description: Learn how JDK 24's enhancement to virtual threads that eliminates pinning with synchronized blocks can dramatically improve performance in your Spring Boot applications.
slug: jdk-24-virtual-threads-without-pinning
date: 2025-04-09T17:00:00.000Z
published: true
author: Dan Vega
tags:
  - Java
  - Spring
video: https://www.youtube.com/embed/V4gsffMge7E
keywords: virtual threads, JDK 24, Java 24, synchronized blocks, Spring Boot, performance optimization, thread pinning, concurrency
---

One of the most significant improvements in JDK 24 is the enhancement to virtual threads that allows them to use synchronized methods and blocks without pinning. This change dramatically improves the scalability of Java applications using virtual threads, especially those with legacy code that relies heavily on synchronized constructs. Let's explore this feature and see how it impacts real-world Spring Boot applications.

## Understanding Synchronized in Java

Since its inception, Java has provided built-in support for multi-threaded programming, with the synchronized keyword being one of the core mechanisms for thread synchronization. The synchronized keyword serves two primary purposes:

1. It provides mutual exclusion, ensuring that only one thread can execute a section of code at a time
2. It establishes a happens-before relationship, guaranteeing that changes made by one thread are visible to other threads

You can use synchronized in two ways:

1. As a method modifier (the entire method becomes synchronized on the instance for instance methods, or on the class object for static methods)

```java
package dev.danvega.threads.synchronization;

/**
 * This class demonstrates the use of synchronized methods in Java.
 * The synchronized keyword on a method ensures that only one thread
 * can execute the method at a time, providing thread safety.
 */
public class MethodSynchronizedCounter {

    private int count = 0;

    /**
     * Increments the counter by 1.
     * The synchronized keyword ensures that only one thread can execute
     * this method at a time, preventing race conditions.
     */
    public synchronized void increment() {
        count++;
    }

    /**
     * Decrements the counter by 1.
     * The synchronized keyword ensures that only one thread can execute
     * this method at a time, preventing race conditions.
     */
    public synchronized void decrement() {
        count--;
    }

    /**
     * Returns the current value of the counter.
     * This method is also synchronized to ensure that the most up-to-date
     * value is returned and to establish a happens-before relationship with
     * other synchronized methods.
     * 
     * @return the current count
     */
    public synchronized int getCount() {
        return count;
    }

}
```

2. As a block, where you specify which object to synchronize on

```java
package dev.danvega.threads.synchronization;

/**
 * This class demonstrates the use of synchronized blocks in Java.
 * The synchronized block ensures that only one thread can execute
 * the block at a time, providing thread safety.
 */
public class BlockSynchronizedCounter {

    private int count = 0;
    private final Object lock = new Object(); // Object used for synchronization

    /**
     * Increments the counter by 1.
     * The synchronized block ensures that only one thread can execute
     * the critical section at a time, preventing race conditions.
     */
    public void increment() {
        synchronized (lock) {
            count++;
        }
    }

    /**
     * Returns the current value of the counter.
     * This method also uses a synchronized block to ensure that the most up-to-date
     * value is returned and to establish a happens-before relationship with
     * other synchronized blocks.
     * 
     * @return the current count
     */
    public int getCount() {
        synchronized (lock) {
            return count;
        }
    }

}
```

Under the hood, synchronized uses intrinsic locks (also called monitors) associated with Java objects. When a thread enters a synchronized block, it acquires the intrinsic lock for that object and releases it when exiting the block. If another thread attempts to enter a block synchronized on the same object, it must wait until the first thread releases that lock.

This simple mechanism has been sufficient for many concurrent Java applications, but it introduced challenges when virtual threads entered the picture.

## The Virtual Thread Pinning Problem

Virtual threads were introduced in JDK 21 as a lightweight alternative to platform threads for building highly concurrent applications. Unlike platform threads, which are backed by operating system threads, virtual threads are managed by the JDK and designed to be lightweight and abundant.

However, virtual threads had a significant limitation in JDK 21: when a virtual thread entered a synchronized block or method and then performed a blocking operation (like I/O or waiting for a database query), it would get "pinned" to its carrier thread. This pinning prevented the platform thread from being released back to the thread pool, effectively negating one of the main benefits of virtual threads.

### The Restaurant Analogy

Think of it like a busy restaurant with a limited number of waiters (platform threads) serving many customers (tasks):

**In JDK 21:**
When a customer (virtual thread) enters a private dining room (synchronized block) and needs to wait for their food to cook (blocking I/O), the waiter (platform thread) must stay with that customer the entire time. The waiter can't serve other customers while waiting, even though they're just standing there doing nothing. If too many customers are in private dining rooms waiting for food, all waiters become occupied and no new customers can be served.

![JDK 21 Behavior](/images/blog/2025/04/09/waiter_pre_jdk24.png)

**In JDK 24:**
Now, when a customer enters the private dining room and needs to wait for food, the waiter can leave a pager with the customer and attend to other customers. When the food is ready, the pager buzzes, and any available waiter (potentially a different one) can bring the food to the customer. This dramatically improves the efficiency of the restaurant.

![JDK 24 Behavior](/images/blog/2025/04/09/waiter_post_jdk24.png)

## How JDK 24 Solves the Pinning Problem

JDK 24 introduces [JEP 491: Synchronize Virtual Threads without Pinning](https://openjdk.org/jeps/491), which addresses this limitation. The enhancement allows virtual threads to be unmounted from their carrier thread when they block inside a synchronized section, making the carrier thread available to run other virtual threads.

This is a significant improvement because:

1. It provides better throughput for applications with many virtual threads
2. It allows legacy code using synchronized to benefit from virtual threads
3. It removes a major barrier to adoption for organizations considering virtual threads`

The key insight is that this optimization works when different virtual threads use different lock objects. If multiple virtual threads contend for the same lock object, they will still block each other (as expected from synchronized semantics).

## Performance Benchmarks

![Benchmarks](/images/blog/2025/04/09/AdobeStock_1228917302.jpeg)

To demonstrate the impact of this improvement, let's look at some benchmarks comparing JDK 21 and JDK 24.

### Simple Java Example

The first benchmark creates 5,000 virtual threads, where each thread:
1. Performs CPU-intensive work (10,000 math iterations)
2. Acquires a unique lock
3. Sleeps for 5ms inside the synchronized block

```java
for (int i = 0; i < NUM_THREADS; i++) {
    final Object lock = new Object(); // Each thread gets its own lock
    executor.submit(() -> {
        try {
            // CPU-bound work happens here
            doCpuWork();
            
            synchronized (lock) {
                // Blocking operation inside synchronized block
                Thread.sleep(Duration.ofMillis(BLOCKING_TIME_MS));
            }
            
            completedTasks.incrementAndGet();
        } catch (Exception e) {
            // Error handling
        }
    });
}
```

Results:
- JDK 21: 31.791 seconds
- JDK 24: 0.454 seconds

That's a 70x improvement!

### Spring Boot Application Example

For a more realistic scenario, let's look at a Spring Boot application that simulates an inventory management system where each update is synchronized to prevent race conditions:

```java
@Service
public class InventoryService {
    
    private final Map<String, Integer> inventory = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Object> productLocks = new ConcurrentHashMap<>();
    private final DatabaseService dbService;
    
    // Constructor omitted for brevity
    
    public boolean updateInventory(String productId, int quantity) {
        // Get or create a lock specific to this productId
        Object productLock = productLocks.computeIfAbsent(productId, k -> new Object());
        
        // Synchronize on the product-specific lock
        synchronized (productLock) {
            int currentStock = inventory.getOrDefault(productId, 0);
            
            if (currentStock + quantity < 0) {
                return false; // Can't have negative inventory
            }
            
            // Simulate database write (blocking operation)
            dbService.persistInventoryChange(productId, quantity);
            
            // Update in-memory inventory
            inventory.put(productId, currentStock + quantity);
            return true;
        }
    }
}
```

When benchmarking 10,000 concurrent requests across 1,000 different product IDs:
- JDK 21: 12.486 seconds (800.9 requests/second)
- JDK 24: 2.345 seconds (4,264.4 requests/second)

That's a 5.3x improvement in throughput!

## Implementing in Your Spring Boot Application

Enabling virtual threads in Spring Boot is straightforward. For Spring Boot 3.2 and later, add this property to your `application.properties`:

```properties
spring.threads.virtual.enabled=true
```

For best results with JDK 24's synchronized improvements:

1. **Use per-object synchronization**: Instead of synchronizing on shared objects (like `this` or a class instance), use dedicated lock objects for different resources.

```java
// AVOID this pattern with virtual threads
public synchronized void updateResource(String resourceId, int value) {
    // Blocking operation
    databaseService.update(resourceId, value);
}

// PREFER this pattern with virtual threads
private final ConcurrentHashMap<String, Object> resourceLocks = new ConcurrentHashMap<>();

public void updateResource(String resourceId, int value) {
    Object lock = resourceLocks.computeIfAbsent(resourceId, k -> new Object());
    synchronized (lock) {
        // Blocking operation
        databaseService.update(resourceId, value);
    }
}
```

2. **Consider thread-safe alternatives**: For simple use cases, consider using concurrent collections or atomic operations instead of synchronized blocks.

3. **Don't mix implementation approaches**: Be consistent in how you handle synchronization throughout your codebase.

## Migration Considerations

If you're migrating existing applications to leverage virtual threads:

1. **Identify synchronization hotspots**: Profile your application to identify methods that use synchronization and perform blocking operations.

2. **Refactor shared locks**: Where possible, refactor code to use dedicated locks for different resources.

3. **Test thoroughly**: The behavior changes between JDK 21 and JDK 24 are subtle but significant. Comprehensive testing is essential.

4. **Verify compatibility**: Ensure all your libraries and dependencies work correctly with JDK 24.

## Conclusion

The improvements to virtual threads in JDK 24 represent a significant advancement for Java's concurrency model. By allowing virtual threads to use synchronized blocks without pinning, JDK 24 removes a major barrier to adopting virtual threads in production applications.

For Spring Boot developers, this means:

1. Legacy codebases with synchronized blocks can now benefit from virtual threads
2. Significantly improved throughput for high-concurrency applications
3. Simplified migration path from traditional threading models

If you're building applications that handle many concurrent operations, especially with blocking I/O, upgrading to JDK 24 should be a priority. The performance improvements are substantial, and the implementation changes required are minimal.

Have you tested your Spring applications with JDK 24's improved virtual threads? Share your experiences in the comments below!

Happy coding!