---
title: "Stop NullPointerExceptions Before Production with Spring Boot 4's Null Safety"
slug: spring-boot-4-null-safety
date: "2025-11-05T09:00:00.000Z"
published: true
description: "Discover how Spring Boot 4 and JSpecify annotations catch NullPointerExceptions at compile-time instead of runtime. Learn to implement @NullMarked and @Nullable for bulletproof Java code with practical examples."
author: Dan Vega
tags:
  - Java
  - Spring Boot
  - Spring Boot 4
cover:
video: https://www.youtube.com/embed/QlGnaRoujL8
keywords: null safety, nullable types, null pointer exception, Java, Kotlin, programming best practices, type safety, spring boot 4, spring framework 7
---

Remember the last time a `NullPointerException` crashed your production app at 3 AM? We've all been there. 
Tony Hoare famously called null references his "billion-dollar mistake," and for good reason. 
The problem isn't null itself—it's that in Java, **nullness is implicit**. When you see `User findUser(String id)`, 
can it return null? Maybe. Maybe not. You won't know until that NPE ruins your weekend.

Spring Boot 4 is changing the game with its adoption of **JSpecify**, replacing the older JSR-305 annotations. 
This isn't just a library swap—it's a fundamental shift in how we handle null safety in Spring applications.
Let me show you why this matters and how to use it effectively.

::GitHubRepo{url="https://github.com/danvega/coffeeshop"}
Follow along with the complete working example.
::

## Why Spring Boot 4's Approach is Different

Spring Boot 4 introduces a simple but powerful concept: **non-null by default**. Instead of assuming everything might 
be null (and adding defensive null checks everywhere), you explicitly mark the exceptions—the things that *can* be null.

Here's what this looks like in practice:

```java
// Before Spring Boot 4 - Is the return value nullable? Who knows!
@Service
public class UserService {
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);  // Might return null
    }
}

// Spring Boot 4 with JSpecify - Explicitly nullable
@Service
@NullMarked  // Everything non-null by default
public class UserService {
    @Nullable
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);  // Clearly can return null
    }
}
```

The `@NullMarked` annotation on your package or class sets a new default: everything is non-null unless you say 
otherwise with `@Nullable`. This matches how we actually think about code—most things shouldn't be null.

## Real-World Example: The Coffee Shop

Let's walk through a practical example using a coffee shop application. When customers place orders, some fields are 
required (like email) while others are optional (like promo codes).

```java
@NullMarked
package dev.danvega.coffeeshop.orders;

@Service
public class OrderService {
    
    public Order createOrder(String email, @Nullable String promoCode) {
        // email is guaranteed non-null - no check needed!
        sendConfirmation(email);
        
        // promoCode might be null - must check
        if (promoCode != null) {
            applyDiscount(promoCode);
        }
        
        return new Order(email, promoCode);
    }
}
```

Notice how the method signature tells you exactly what to expect. The `email` parameter doesn't need a null 
check because the `@NullMarked` default guarantees it's non-null. But `promoCode` is explicitly `@Nullable`, 
so you know to handle that case.

## Working with Collections

One of JSpecify's strengths is handling nullable elements in collections. Consider a customer survey where some questions might be skipped:

```java
@Service
public class ReviewService {
    
    // The list is non-null, but can contain null elements
    public List<@Nullable String> getSurveyResponses() {
        List<@Nullable String> responses = new ArrayList<>();
        responses.add("Excellent service");      // Question 1: answered
        responses.add(null);                     // Question 2: skipped
        responses.add("Coffee was perfect");     // Question 3: answered
        return responses;
    }
    
    public int calculateResponseRate(List<@Nullable String> responses) {
        long answered = responses.stream()
                .filter(Objects::nonNull)
                .count();
        return (int) ((answered * 100) / responses.size());
    }
}
```

The type `List<@Nullable String>` clearly communicates that while the list itself won't be null, individual responses might be.

## Setting Up Null Safety in Your Project

Getting started with Spring Boot 4's null safety is straightforward:

### Step 1: Add Package-Level Defaults

Create a `package-info.java` file in your packages:

```java
@NullMarked
package com.yourapp.service;

import org.jspecify.annotations.NullMarked;
```

**Important:** @NullMarked only applies to the specific package where it's declared—it doesn't cascade to sub-packages. 
You'll need to add a package-info.java file with @NullMarked to each package where you want non-null defaults:

### Step 2: Mark Nullable Returns

Update methods that can return null:

```java
@NullMarked
@Service
public class ProductService {
    
    @Nullable
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    
    // Better: Use Optional for new APIs
    public Optional<Product> findProductById(Long id) {
        return productRepository.findById(id);
    }
}
```

### Step 3: Handle Nullable Parameters

For optional parameters, mark them explicitly:

```java
@RestController
@NullMarked
public class ProductController {
    
    @PostMapping("/products")
    public Product createProduct(
            @RequestBody Product product,
            @RequestHeader("X-User-Id") @Nullable String userId) {
        
        // product is guaranteed non-null
        validateProduct(product);
        
        // userId might be null
        if (userId != null) {
            auditLog(userId, "Created product: " + product.name());
        }
        
        return productService.save(product);
    }
}
```

## The Compile-Time Safety Net

The real power comes when you add **NullAway** to catch violations at compile time. While setting this up is optional, 
it transforms potential runtime NPEs into build failures:

```groovy
dependencies {
    errorprone 'com.uber.nullaway:nullaway:0.12.6'
}

tasks.withType(JavaCompile) {
    options.errorprone {
        option("NullAway:AnnotatedPackages", "com.yourapp")
        error("NullAway")
    }
}
```

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.14.0</version>
            <configuration>
                <release>17</release>
                <encoding>UTF-8</encoding>
                <fork>true</fork>
                <compilerArgs>
                    <arg>-XDcompilePolicy=simple</arg>
                    <arg>--should-stop=ifError=FLOW</arg>
                    <arg>-Xplugin:ErrorProne -Xep:NullAway:ERROR -XepOpt:NullAway:OnlyNullMarked</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.main=ALL-UNNAMED</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.model=ALL-UNNAMED</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.processing=ALL-UNNAMED</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED</arg>
                    <arg>-J--add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED</arg>
                    <arg>-J--add-opens=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED</arg>
                    <arg>-J--add-opens=jdk.compiler/com.sun.tools.javac.comp=ALL-UNNAMED</arg>
                </compilerArgs>
                <annotationProcessorPaths>
                    <path>
                        <groupId>com.google.errorprone</groupId>
                        <artifactId>error_prone_core</artifactId>
                        <version>2.38.0</version>
                    </path>
                    <path>
                        <groupId>com.uber.nullaway</groupId>
                        <artifactId>nullaway</artifactId>
                        <version>0.12.7</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

With NullAway configured, this code won't even compile:

```java
@NullMarked
public class OrderController {
    
    @GetMapping("/orders/{email}")
    public String getOrderStatus(@PathVariable String email) {
        Order order = orderService.findByEmail(email);  // Returns @Nullable
        
        // ❌ Compile error! "dereferenced expression order is @Nullable"
        return order.getStatus();
        
        // ✅ Must handle null case
        return order != null ? order.getStatus() : "No order found";
    }
}
```

## Why Not Just Use Optional?

I often get asked: "Why not just use `Optional<T>` everywhere?" It's a fair question—`Optional` is part of the JDK and 
explicitly communicates that a value might be absent. However, there are several things to consider:

**Runtime Overhead**: Every `Optional` is an additional object allocation. For high-performance code paths, 
this overhead can add up. `@Nullable` has zero runtime cost—it's purely compile-time metadata.

**Breaking API Changes**: Converting existing methods to return `Optional` breaks all existing callers. 
Adding `@Nullable` to an existing method signature doesn't break anything—it just makes the existing behavior explicit.

**Limited Use Cases**: The JDK documentation specifically states that `Optional` is intended primarily as a return type. 
Using it for method parameters or fields is discouraged and can lead to awkward APIs:

```java
// Awkward with Optional parameters
public void processOrder(Optional<String> promoCode) {
    promoCode.ifPresent(code -> applyDiscount(code));
}

// Clean with @Nullable
public void processOrder(@Nullable String promoCode) {
    if (promoCode != null) {
        applyDiscount(promoCode);
    }
}
```

**Increased Complexity**: `Optional` adds another layer of abstraction. While its fluent API is nice for certain patterns, 
it can make simple null checks more verbose:

```java
// With Optional
return userService.findUser(id)
    .map(User::getName)
    .orElse("Unknown");

// With @Nullable
User user = userService.findUser(id);
return user != null ? user.getName() : "Unknown";
```

**The Best of Both Worlds**: There's nothing wrong with `Optional`—use it where it makes sense, 
especially for new APIs where the fluent style adds value. But for existing codebases, method parameters, 
and performance-critical paths, `@Nullable` provides null safety without the trade-offs.

```java
@NullMarked
@Service
public class UserService {
    // Use @Nullable for existing APIs
    @Nullable
    public User findUserLegacy(String id) {
        return userRepository.findById(id).orElse(null);
    }
    
    // Use Optional for new APIs where it adds value
    public Optional<User> findUser(String id) {
        return userRepository.findById(id);
    }
}
```

## Migration Strategy
Moving existing Spring Boot 3 applications to this new model is manageable:

- Start with critical paths: Add @NullMarked to your most important packages first. Remember, you need to annotate each package individually—sub-packages don't inherit the annotation.
- Fix the obvious cases: Mark methods that return null with @Nullable
- Add NullAway gradually: Enable it per-module as you clean up null handling

## The Bottom Line

Spring Boot 4's shift to JSpecify isn't just about swapping annotation libraries—it's about making nullability 
**explicit and checkable**. Your IDE knows what can be null. Your compiler can catch NPEs before they reach production. 
Your teammates can understand your APIs without diving into implementation details.

The coffee shop example shows this isn't theoretical—it's practical null safety that makes your code more 
maintainable and reliable. No more guessing whether that service method might return null. 
No more defensive programming "just in case." Just clear contracts that the compiler can verify.

Start with `@NullMarked` on one package. Mark a few `@Nullable` returns. You'll quickly see why explicit null 
safety is worth the effort. Your future self (and your ops team) will thank you.

Happy coding!
Dan