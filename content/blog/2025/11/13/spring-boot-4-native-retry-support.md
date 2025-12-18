---
title: "Native Retry Support in Spring Boot 4: No External Dependencies Required"
slug: spring-boot-4-native-retry-support
description: "Spring Boot 4 includes native retry support with @Retryable, RetryTemplate, and @ConcurrencyLimit. Learn how to add resilience without the spring-retry dependency."
published: true
author: Dan Vega
date: 2025-11-13T09:00:00.000Z
tags:
  - Spring Boot
  - Java
cover: spring_resilience_features_cover.png
video: https://www.youtube.com/embed/CT1wGTwOfg0
github: https://github.com/danvega/quick-bytes
keywords: spring boot 4 retry, spring boot retry example, retryable spring boot, spring retry without dependency, retrytemplate spring boot 4, concurrencylimit annotation, enableresilientmethods, exponential backoff spring boot, spring framework 7 resilience, retry listener spring
---

If you've added retry logic to a Spring application before, you probably added the `spring-retry` dependency to your pom.xml. 
That external library served us well for years, but Spring Boot 4 changes everything. 
Retry support is now built directly into Spring Framework 7, which means you can use `@Retryable`, `RetryTemplate`, 
and the new `@ConcurrencyLimit` annotation without adding any extra dependencies.

This is a big deal for keeping your dependency tree clean and your applications maintainable. Let me show you how 
these native resilience features work by building a food delivery service called QuickBites.

::GitHubRepo{url="https://github.com/danvega/quick-bytes"}
Follow along with the complete working example.
::

## Why You No Longer Need the spring-retry Dependency

The Spring Retry project is now in maintenance mode. Sam Brannen wrote an [excellent blog post](https://spring.io/blog/2025/09/09/core-spring-resilience-features) 
explaining how these resilience features have been absorbed into the core framework. If you're starting a new Spring Boot 4 
project, you get retry support out of the box with just the web starter.

Here's what you get out of the box:

| Feature | Purpose |
|---------|---------|
| `@Retryable` | Declarative retry with configurable backoff |
| `RetryTemplate` | Programmatic retry for complex scenarios |
| `@ConcurrencyLimit` | Protect resources from concurrent overload |
| `RetryListener` | Observability hooks for retry operations |

To enable these features, you need a single annotation on your configuration class:

```java
@SpringBootApplication
@EnableResilientMethods
public class QuickBytesApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuickBytesApplication.class, args);
    }
}
```

The `@EnableResilientMethods` annotation activates both `@Retryable` and `@ConcurrencyLimit` processing throughout your application.

## Using @Retryable for Declarative Retry Logic

The `@Retryable` annotation provides a clean way to handle transient failures. Think of scenarios like network timeouts, 
temporary API outages, or database connection hiccups. Instead of writing manual retry loops, you declare your retry policy 
directly on the method.

In the QuickBites application, the restaurant service fetches menus from partner APIs. These external calls can fail 
intermittently, so retries make sense:

```java
@Service
public class RestaurantService {

    private static final Logger log = LoggerFactory.getLogger(RestaurantService.class);
    private final DataLoader dataLoader;
    private final Random random = new Random();

    public RestaurantService(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

    @Retryable(
            maxAttempts = 4,
            includes = RestaurantApiException.class,
            delay = 1000,
            multiplier = 2
    )
    public List<MenuItem> getMenuFromPartner(String restaurantId) {
        log.info("Fetching menu from restaurant partner API for: {}", restaurantId);

        // Simulate flaky external API (40% failure rate)
        if (random.nextDouble() < 0.4) {
            log.warn("Restaurant API failed! Will retry...");
            throw new RestaurantApiException("Partner restaurant API is temporarily unavailable");
        }

        Restaurant restaurant = dataLoader.getRestaurant(restaurantId);
        if (restaurant == null) {
            throw new RestaurantApiException("Restaurant not found: " + restaurantId);
        }

        List<MenuItem> menu = restaurant.menuItemIds().stream()
                .map(dataLoader::getMenuItem)
                .filter(item -> item != null && item.available())
                .toList();

        log.info("Successfully fetched {} menu items from {}", menu.size(), restaurant.name());
        return menu;
    }
}
```

Let me break down what each attribute does:

**maxAttempts = 4** means the method will be called up to 4 times total (1 initial attempt plus 3 retries). This differs from the old Spring Retry behavior where `maxAttempts` included the initial call.
**includes = RestaurantApiException.class** limits retries to specific exceptions. You don't want to retry on validation errors or null pointer exceptions. Target only the transient failures.
**delay = 1000** sets the initial wait time to 1 second between retry attempts.
**multiplier = 2** enables exponential backoff. The delays become 1 second, then 2 seconds, then 4 seconds. This gives the failing service time to recover without hammering it with requests.

With a 40% failure rate and 4 attempts, success probability jumps from 60% to over 95%. That's the power of well-configured retry logic.

## RetryTemplate for Programmatic Retry Control

Sometimes annotations aren't flexible enough. You might need to retry different operations with different policies, or you might want to attach listeners for monitoring. That's where `RetryTemplate` comes in.

The driver assignment service in QuickBites demonstrates this approach:

```java
@Service
public class DriverAssignmentService {

    private static final Logger log = LoggerFactory.getLogger(DriverAssignmentService.class);
    private final List<Driver> availableDrivers = new ArrayList<>();
    private final RetryTemplate retryTemplate;
    private final Random random = new Random();
    private final DriverRetryListener driverRetryListener;

    public DriverAssignmentService(DriverRetryListener driverRetryListener) {
        this.driverRetryListener = driverRetryListener;

        RetryPolicy retryPolicy = RetryPolicy.builder()
                .maxAttempts(10)
                .delay(Duration.ofMillis(2000))
                .multiplier(1.5)
                .maxDelay(Duration.ofMillis(10000))
                .includes(NoDriversAvailableException.class)
                .build();

        retryTemplate = new RetryTemplate(retryPolicy);
        retryTemplate.setRetryListener(driverRetryListener);
    }

    public Driver assignDriver(Order order) throws RetryException {
        final AtomicInteger attempt = new AtomicInteger(0);

        return retryTemplate.execute(() -> {
            int currentAttempt = attempt.incrementAndGet();

            // Simulate random driver availability (50% chance of success)
            if (random.nextDouble() > 0.5 || availableDrivers.isEmpty()) {
                throw new NoDriversAvailableException("No drivers available in area. Will retry...");
            }

            Driver assignedDriver = availableDrivers.get(
                    random.nextInt(availableDrivers.size())
            );

            return assignedDriver;
        });
    }
}
```

The `RetryPolicy.builder()` gives you fine-grained control:

**maxAttempts(10)** allows up to 10 retry attempts. Driver availability is unpredictable, so more retries make sense here.
**delay(Duration.ofMillis(2000))** starts with a 2-second delay.
**multiplier(1.5)** increases delays by 50% each time (2s, 3s, 4.5s, 6.75s...).
**maxDelay(Duration.ofMillis(10000))** caps the delay at 10 seconds. Without this, exponential backoff could result in absurdly long waits.
**includes(NoDriversAvailableException.class)** ensures only relevant exceptions trigger retries.

The `retryTemplate.execute()` method wraps your business logic in a lambda. Every call within that lambda is protected by the retry policy.

## Adding Observability with RetryListener

Production systems need visibility into what's happening. When retries occur, you want to know about it. The `RetryListener` 
interface provides hooks into the retry lifecycle:

```java
@Component
public class DriverRetryListener implements RetryListener {

    private static final Logger log = LoggerFactory.getLogger(DriverRetryListener.class);

    private final AtomicInteger totalRetries = new AtomicInteger(0);
    private final AtomicInteger successfulRecoveries = new AtomicInteger(0);
    private final AtomicInteger finalFailures = new AtomicInteger(0);

    private final ThreadLocal<Integer> currentAttempt = ThreadLocal.withInitial(() -> 0);

    @Override
    public void beforeRetry(RetryPolicy retryPolicy, Retryable<?> retryable) {
        int attemptNumber = currentAttempt.get() + 1;
        currentAttempt.set(attemptNumber);
        totalRetries.incrementAndGet();
        log.info("RetryListener: Attempt #{} starting for operation '{}'",
                attemptNumber,
                retryable.getName());
    }

    @Override
    public void onRetrySuccess(RetryPolicy retryPolicy, Retryable<?> retryable, Object result) {
        int attemptCount = currentAttempt.get();

        if (attemptCount > 1) {
            successfulRecoveries.incrementAndGet();
            log.info("RetryListener: Operation '{}' succeeded after {} attempt(s)",
                    retryable.getName(),
                    attemptCount);
        }

        currentAttempt.remove();
    }

    @Override
    public void onRetryFailure(RetryPolicy retryPolicy, Retryable<?> retryable, Throwable throwable) {
        int attemptCount = currentAttempt.get();
        finalFailures.incrementAndGet();
        log.error("RetryListener: Operation '{}' failed after {} attempt(s): {}",
                retryable.getName(),
                attemptCount,
                throwable.getMessage());
        currentAttempt.remove();
    }
}
```

Three callbacks give you complete visibility:

**beforeRetry()** fires before each retry attempt. Track attempt counts and log the operation name.
**onRetrySuccess()** fires when the operation finally succeeds. You can differentiate between first-try success and success-after-retry.
**onRetryFailure()** fires when all retries are exhausted. This is your signal to alert on, potentially triggering monitoring alerts.

The listener keeps business logic clean. Your service methods don't need logging statements cluttering the retry flow. Attach the listener to `RetryTemplate` and you get audit trails automatically.

## Protecting Resources with @ConcurrencyLimit

Retries handle temporary failures. But what about protecting downstream systems from being overwhelmed? That's where `@ConcurrencyLimit` comes in.

Imagine a lunch rush scenario where 50 orders come in simultaneously. Sending 50 concurrent notifications to the restaurant's system could crash it. 
The `@ConcurrencyLimit` annotation restricts how many threads can execute a method at the same time:

```java
@Service
public class RestaurantNotificationService {

    private static final Logger log = LoggerFactory.getLogger(RestaurantNotificationService.class);

    @ConcurrencyLimit(3)
    public void notifyRestaurant(Order order) {
        LocalTime start = LocalTime.now();
        log.info("[CONCURRENT] Sending notification to restaurant for order {} (Thread: {})",
                order.id(), Thread.currentThread().getName());

        // Simulate notification taking time (network call, webhook, etc.)
        simulateDelay(Duration.ofSeconds(2));

        LocalTime end = LocalTime.now();
        log.info("[CONCURRENT] Notification sent for order {} (took {}ms)",
                order.id(), Duration.between(start, end).toMillis());
    }

    private void simulateDelay(Duration duration) {
        try {
            Thread.sleep(duration.toMillis());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

With `@ConcurrencyLimit(3)`, only 3 notifications process simultaneously. The remaining threads queue up and wait for permits to become available. Spring handles the permit management automatically, even if exceptions occur during method execution.

## Testing @ConcurrencyLimit with Platform and Virtual Threads

The restaurant controller includes endpoints to test concurrency limiting with both thread types:

```java
@GetMapping("/lunch-rush")
public ResponseEntity<Map<String, Object>> lunchRush() {
    log.info("LUNCH RUSH STARTED - Simulating 10 concurrent order notifications");

    LocalDateTime startTime = LocalDateTime.now();

    List<Order> orders = new ArrayList<>();
    for (int i = 1; i <= 10; i++) {
        Order order = new Order(
            String.format("lunch-%04d", i),
            "customer-" + i,
            "restaurant-001",
            List.of("burger", "fries", "drink"),
            new BigDecimal("15.99"),
            "payment-" + i,
            "confirmed-" + i,
            Order.OrderStatus.CONFIRMED
        );
        orders.add(order);
    }

    ExecutorService executor = Executors.newFixedThreadPool(10);

    for (Order order : orders) {
        executor.submit(() -> {
            try {
                restaurantNotificationService.notifyRestaurant(order);
            } catch (Exception e) {
                log.error("Error notifying restaurant for order {}: {}", order.id(), e.getMessage());
            }
        });
    }

    executor.shutdown();
    executor.awaitTermination(2, TimeUnit.MINUTES);

    LocalDateTime endTime = LocalDateTime.now();
    long durationSeconds = Duration.between(startTime, endTime).toSeconds();

    return ResponseEntity.ok(Map.of(
        "message", "Lunch rush simulation completed",
        "totalOrders", 10,
        "concurrencyLimit", 3,
        "durationSeconds", durationSeconds,
        "expectedDuration", "6-8 seconds"
    ));
}
```

With 10 orders and a concurrency limit of 3, processing takes 6 to 8 seconds (10 orders divided by 3 concurrent, times 2 seconds each). Watch the logs and you'll see exactly 3 notifications processing at any given moment.

The same behavior works with Java 21+ virtual threads. Virtual threads are lightweight and created on-demand, but `@ConcurrencyLimit` still enforces the restriction. The annotation works identically regardless of the underlying thread implementation.

## Choosing Between @Retryable and RetryTemplate

Both approaches solve retry problems, but they fit different scenarios:

| Scenario | Recommended Approach |
|----------|---------------------|
| Simple retry for transient failures | `@Retryable` |
| Need retry listeners for observability | `RetryTemplate` |
| Different retry policies per operation | `RetryTemplate` |
| Quick declarative configuration | `@Retryable` |
| Complex workflows with multiple retry points | `RetryTemplate` |
| Reactive methods (returning Mono/Flux) | `@Retryable` (it decorates reactive pipelines automatically) |

Start with `@Retryable` for straightforward cases. Reach for `RetryTemplate` when you need the extra flexibility or when observability matters.

## Conclusion

Spring Framework 7's built-in resilience features give you everything you need to handle transient failures and protect 
your resources. No external dependencies, no separate configuration libraries. The `@Retryable` annotation covers most 
retry scenarios with minimal code. `RetryTemplate` handles complex cases where you need more control or observability. 
And `@ConcurrencyLimit` protects downstream systems from being overwhelmed.

The key takeaways:

- Add `@EnableResilientMethods` to your configuration class to activate these features
- Use `@Retryable` for quick declarative retries with exponential backoff
- Use `RetryTemplate` when you need retry listeners or custom policies
- Use `@ConcurrencyLimit` to protect resources from concurrent overload
- All of this works with both platform threads and virtual threads

The Spring Retry project served us well, but having these patterns built into the framework is a welcome improvement for Spring Boot 4 applications.

Happy Coding!