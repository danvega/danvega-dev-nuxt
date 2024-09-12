---
title: What's new in JDK 23
description: Explore the exciting new features and improvements coming in Java 23, including primitive types in patterns, Markdown documentation comments, and enhancements to garbage collection and concurrency.
slug: jdk-23-first-look
date: 2024-09-12T17:00:00.000Z
published: true
author: Dan Vega
tags:
  - java
cover: ./jdk-23.png
#video: https://www.youtube.com/embed/VIDEO_ID
#github: https://github.com/danvega/java-23-examples
keywords: Java 23, JDK 23, primitive types in patterns, Markdown documentation, ZGC, Stream Gatherers, Vector API, Structured Concurrency, Scoped Values
---

As Java continues its rapid evolution with its six-month release cycle, we're on the cusp of another exciting update. Java 23, scheduled for release on September 17, 2024, brings a host of new features and enhancements that promise to improve developer productivity, code readability, and application performance. In this post, we'll explore the key highlights of Java 23, diving into new preview features, enhancements to existing APIs, and performance improvements that make this release noteworthy.

## Primitive Types in Patterns, instanceof, and switch (Preview)

One of the most anticipated features in Java 23 is the enhancement of pattern matching to include primitive types. This preview feature extends the capabilities of patterns, `instanceof`, and `switch` to work with all primitive types, enabling more uniform data exploration and aligning type patterns with `instanceof` operations.

Here's a quick example of how this might look:

```java
static String describe(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case Long l    -> "Long: " + l;
        case Double d  -> "Double: " + d;
        case String s  -> "String: " + s;
        case null      -> "null";
        default        -> "Unknown";
    };
}

public static void main(String[] args) {
    System.out.println(describe(42));       // Output: Integer: 42
    System.out.println(describe(42L));      // Output: Long: 42
    System.out.println(describe(3.14));     // Output: Double: 3.14
    System.out.println(describe("Hello"));  // Output: String: Hello
}
```

This feature simplifies code that needs to handle different types, including primitives, making it more readable and less error-prone.

## Markdown Documentation Comments

Java 23 introduces support for Markdown in documentation comments, a feature that many developers have been eagerly awaiting. This enhancement allows for more expressive and readable documentation directly in the code.

Here's an example of how Markdown syntax can be used in Java documentation:

```java
/**
 * # Calculator Class
 *
 * This class provides basic arithmetic operations.
 *
 * ## Methods
 *
 * - `add(int a, int b)`: Returns the sum of two integers
 * - `subtract(int a, int b)`: Returns the difference between two integers
 *
 * ## Example Usage
 *
 * java
 * Calculator calc = new Calculator();
 * int sum = calc.add(5, 3);  // Returns 8
 * 
*
* @author Java Developer
* @version 1.0
  */
  public class Calculator {
  // Class implementation...
  }
```

This feature will make documentation more visually appealing and easier to write and read, potentially encouraging developers to create more comprehensive documentation.

## Enhanced Features

### Class-File API (Second Preview)

The Class-File API, now in its second preview, provides a standard way for parsing, generating, and transforming Java class files. This API is designed to evolve alongside the class-file format and replace the JDK's internal copy of the ASM library.

### Vector API (Eighth Incubator)

The Vector API, in its eighth incubation, allows developers to write vector algorithms that reliably compile to optimal vector instructions on supported CPU architectures. This can potentially improve performance for operations that can be vectorized, such as certain numerical computations or data processing tasks.

### Stream Gatherers (Second Preview)

This enhancement to the Stream API supports custom intermediate operations, making stream pipelines more flexible and expressive. Here's a simple example of how Stream Gatherers might be used:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

List<Integer> evenSquares = numbers.stream()
    .gather(Gatherers.filter(n -> n % 2 == 0))
    .gather(Gatherers.map(n -> n * n))
    .toList();

System.out.println(evenSquares);  // Output: [4, 16, 36, 64, 100]
```

### ZGC: Generational Mode by Default

The Z Garbage Collector's generational mode, which maintains separate collections for young and old objects, becomes the default in JDK 23. This change aims to reduce CPU overhead and improve memory release efficiency, potentially leading to better application performance, especially for applications with many short-lived objects.

## Continued Preview Features

Java 23 also continues to refine some existing preview features:

### Structured Concurrency (Third Preview)

Structured Concurrency, now in its third preview, aims to simplify multithreaded programming and improve reliability. It treats multiple related tasks running in different threads as a single unit of work, making concurrent code more manageable and less error-prone.

### Scoped Values (Third Preview)

Scoped Values, also in their third preview, enable methods to share immutable data with callees within a thread and with child threads more efficiently than thread-local values. This can be particularly useful in scenarios where you need to pass context through a call chain without explicitly adding parameters to each method.

### Implicitly Declared Classes and Instance Main Methods (Third Preview)

This feature, previously known as "Unnamed Classes and Instance Main Methods," continues to evolve. It aims to reduce boilerplate code, especially for small programs or quick prototypes, by allowing for a more straightforward entry point to Java programs.

## Conclusion

Java 23 brings a mix of exciting new preview features, refinements to existing ones, and performance improvements that keep Java at the forefront of programming languages. While preview features are not yet ready for production use, they offer a glimpse into Java's future and provide opportunities for developers to experiment and provide feedback.

As Java continues to evolve, it's crucial for developers to stay informed about these changes. Whether you're building enterprise applications, working on open-source projects, or just learning the language, understanding these new features can help you write more expressive, efficient, and maintainable code.

What feature of Java 23 are you most excited about? How do you see these changes impacting your development workflow? We'd love to hear your thoughts and experiences as you explore this latest release of Java!

Remember, the journey of Java's evolution is ongoing, and your feedback as a developer plays a crucial role in shaping its future. So don't hesitate to dive in, experiment with these new features, and share your insights with the Java community.

Happy coding with Java 23!