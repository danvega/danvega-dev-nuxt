---
title: "Stream Gatherers in JDK 24: Building Custom Intermediate Operations for the Stream API"
description: "Discover how the new Stream Gatherers feature in JDK 24 provides a more elegant solution for processing blog content compared to traditional stream operations."
slug: stream-gatherers
date: 2025-03-21T09:00:00.000Z
published: true
author: Dan Vega
tags:
  - Java
keywords: Java, JDK 24, Stream Gatherers, Java Streams, Blog Processing, Java Records
---

# Stream Gatherers in JDK 24: Building Custom Stream Operations for Data Processing

I just got back from JavaOne and everyone was talking about the newest JDK 24 features. One that particularly caught my attention was Stream Gatherers (JEP 485), a powerful enhancement to the Stream API that lets you build custom intermediate operations.

If you've ever found yourself writing complex nested collectors or multi-step stream operations, you're going to appreciate this new capability. Let's walk through Stream Gatherers step by step with practical examples from blog content processing.

## What is a Stream?

Before diving into Gatherers, let's quickly refresh our understanding of Java Streams. Introduced in Java 8, the Stream API provides a functional approach to processing collections of objects.

Stream operations are divided into two categories:
- **Intermediate operations** (like `filter`, `map`, and `sorted`) that return a new stream
- **Terminal operations** (like `collect`, `forEach`, and `reduce`) that produce a result

```java
List<String> filtered = names.stream()    // Create a stream from names collection
    .filter(name -> name.startsWith("J")) // Intermediate operation
    .collect(Collectors.toList());        // Terminal operation
```

While the Stream API is powerful, sometimes we need custom intermediate operations that aren't provided out-of-the-box. That's exactly what Stream Gatherers address.

## Posts by Category: A Real-World Example

Let's start with a common blog application use case. Given a collection of blog posts, we want to find all posts in a specific category, sorted by publication date.

Here's our `BlogPost` model:

```java
public record BlogPost(
    Long id,
    String title,
    String author,
    String content,
    String category,
    LocalDateTime publishedDate
) {}
```

Using the current Stream API, getting posts by category is straightforward:

```java
public static void postsByCategory(List<BlogPost> posts, String category) {
    List<BlogPost> postsByCategory = posts.stream()
            .filter(p -> p.category().equals(category))
            .sorted(Comparator.comparing(BlogPost::publishedDate).reversed())
            .limit(3)
            .toList();
            
    System.out.println("\nPosts by Category: " + category);
    postsByCategory.forEach(System.out::println);
}
```

This works well when we're looking for posts in a single category. But what if we want to display the three most recent posts from *each* category?

## Group By with Limit - Before JDK 24

Before JDK 24, implementing "recent posts by category" required more complex approaches.

### Approach 1: Nested Collectors

```java
public static void nestedCollectors(List<BlogPost> posts) {
    Map<String, List<BlogPost>> recentPostsByCategory = posts.stream()
            // First, group all posts by category
            .collect(Collectors.groupingBy(
                    BlogPost::category,
                    Collectors.collectingAndThen(
                            // Collect posts into a list
                            Collectors.toList(),
                            // Then transform each list by sorting and limiting
                            categoryPosts -> categoryPosts.stream()
                                    .sorted(Comparator.comparing(BlogPost::publishedDate).reversed())
                                    .limit(3)
                                    .toList()
                    )
            ));

    printRecentPostsByCategory(recentPostsByCategory);
}
```

### Approach 2: Map Then Transform

```java
public static void mapThenTransform(List<BlogPost> posts) {
    Map<String, List<BlogPost>> recentPostsByCategory = posts.stream()
            // Group by category
            .collect(Collectors.groupingBy(BlogPost::category))
            // Convert to a stream of map entries
            .entrySet().stream()
            // Convert each entry to a new entry with sorted and limited values
            .collect(Collectors.toMap(
                    Map.Entry::getKey,
                    entry -> entry.getValue().stream()
                            .sorted(Comparator.comparing(BlogPost::publishedDate).reversed())
                            .limit(3)
                            .collect(Collectors.toList())
            ));

    printRecentPostsByCategory(recentPostsByCategory);
}
```

Both approaches work, but they're complex, verbose, and require multiple stream operations or nested collectors.

## Introduction to Stream Gatherers

JDK 24 introduces Stream Gatherers, which let us create custom intermediate operations to handle complex transformations more elegantly.

Let's look at some fundamental Gatherer patterns that come built-in with JDK 24:

### Fixed Window Example

A fixed window gatherer processes elements in non-overlapping groups of a fixed size:

```java
public static void fixedWindowExample(List<BlogPost> posts) {
    // Group posts into batches of 3
    System.out.println("Posts in batches of 3:");
    posts.stream()
            .limit(9) // Limit to 9 posts for clarity
            .gather(Gatherers.windowFixed(3))
            .forEach(batch -> {
                System.out.println("\nBatch:");
                batch.forEach(post -> System.out.println("  - " + post.title()));
            });
}
```

Output:
```
Posts in batches of 3:

Batch:
  - Getting Started with JDK 24 Stream Gatherers
  - Virtual Threads in JDK 24: Performance Analysis
  - Mastering Java Records for Clean Code

Batch:
  - Pattern Matching for Switch: JDK 24 Updates
  - Java Memory Management Tuning Tips
  - Building Reactive APIs with Spring WebFlux
...
```

### Sliding Window Example

A sliding window moves through the elements one at a time:

```java
public static void slidingWindowExample(List<BlogPost> posts) {
    // Show posts in sliding windows of size 2
    System.out.println("Posts in sliding windows of size 2:");
    posts.stream()
            .limit(5) // Limit to 5 posts for clarity
            .gather(Gatherers.windowSliding(2))
            .forEach(window -> {
                System.out.println("\nWindow:");
                window.forEach(post -> System.out.println("  - " + post.title()));
            });
}
```

Output:
```
Posts in sliding windows of size 2:

Window:
  - Getting Started with JDK 24 Stream Gatherers
  - Virtual Threads in JDK 24: Performance Analysis

Window:
  - Virtual Threads in JDK 24: Performance Analysis
  - Mastering Java Records for Clean Code
...
```

### Fold Example

The fold operation accumulates results:

```java
public static void foldExample(List<BlogPost> posts) {
    // Concatenate all blog post titles
    posts.stream()
            .limit(5) // Limit to 5 posts for clarity
            .gather(Gatherers.fold(
                    () -> "All titles: ",
                    (result, post) -> result + post.title() + ", "
            ))
            .findFirst()
            .ifPresent(System.out::println);
}
```

Output:
```
All titles: Getting Started with JDK 24 Stream Gatherers, Virtual Threads in JDK 24: Performance Analysis, Mastering Java Records for Clean Code, Pattern Matching for Switch: JDK 24 Updates, Java Memory Management Tuning Tips, 
```

### Scan Example

The scan operation is similar to fold but emits intermediate results:

```java
public static void scanExample(List<BlogPost> posts) {
    // Build a progressive summary of post titles
    System.out.println("Progressive title concatenation:");
    posts.stream()
            .limit(5) // Limit to 5 posts for clarity
            .gather(Gatherers.scan(
                    () -> "Titles so far: ",
                    (result, post) -> result + post.title() + ", "
            ))
            .forEach(System.out::println);
}
```

Output:
```
Progressive title concatenation:
Titles so far: Getting Started with JDK 24 Stream Gatherers, 
Titles so far: Getting Started with JDK 24 Stream Gatherers, Virtual Threads in JDK 24: Performance Analysis, 
Titles so far: Getting Started with JDK 24 Stream Gatherers, Virtual Threads in JDK 24: Performance Analysis, Mastering Java Records for Clean Code, 
...
```

## Group By Limit Using Custom Gatherer

Now let's solve our "recent posts by category" problem using a custom Gatherer:

```java
public static <K> Gatherer<BlogPost, Map<K, List<BlogPost>>, Map.Entry<K, List<BlogPost>>> groupByWithLimit(
        Function<? super BlogPost, ? extends K> keyExtractor,
        int limit,
        Comparator<? super BlogPost> comparator) {

    return Gatherer.of(
            // Initialize with an empty map to store our grouped items
            HashMap<K, List<BlogPost>>::new,

            // Process each blog post
            (map, post, downstream) -> {
                // Get the key for this blog post (e.g., the category)
                K key = keyExtractor.apply(post);

                // Add this post to its group (creating the group if needed)
                map.computeIfAbsent(key, k -> new ArrayList<>()).add(post);

                // Continue processing the stream
                return true;
            },

            // Combiner for parallel streams - just use the first map in this simple case
            (map1, map2) -> map1,

            // When all posts have been processed, emit the results
            (map, downstream) -> {
                map.forEach((key, posts) -> {
                    // Sort the posts and limit to the specified number
                    List<BlogPost> limitedPosts = posts.stream()
                            .sorted(comparator)
                            .limit(limit)
                            .toList();

                    // Emit a Map.Entry with the key and limited posts
                    downstream.push(Map.entry(key, limitedPosts));
                });
            }
    );
}
```

Using this custom Gatherer, our solution becomes much cleaner:

```java
public static void groupByWithLimit(List<BlogPost> posts) {
    // Use our custom gatherer to create a "Recent Posts By Category" view
    Map<String, List<BlogPost>> recentPostsByCategory = posts.stream()
            .gather(groupByWithLimit(
                    BlogPost::category,    // Group by category
                    3,                     // Show only 3 recent posts per category
                    Comparator.comparing(BlogPost::publishedDate).reversed() // Newest first
            ))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    printRecentPostsByCategory(recentPostsByCategory);
}
```

Output:
```
Recent Posts By Category:

Category: Java
  - Stream Gatherers: A Complete Tutorial (Published: 2025-03-19T09:30)
  - Getting Started with JDK 24 Stream Gatherers (Published: 2025-03-18T10:15)
  - Comparing Stream Collectors and Gatherers (Published: 2025-03-16T14:15)

Category: Spring
  - Building Reactive APIs with Spring WebFlux (Published: 2025-03-17T11:05)
  - Spring Boot 3.2 New Features Overview (Published: 2025-03-12T15:40)
  - Secure Authentication with Spring Security 7 (Published: 2025-03-08T10:00)
...
```

A Gatherer consists of four key components:

1. **Initializer**: Creates the initial state (`HashMap` in our example)
2. **Integrator**: Processes each element and updates the state
3. **Combiner**: Combines states when processing in parallel
4. **Finisher**: Processes the final state and emits results

## More Custom Gatherer Examples

Let's explore more useful gatherers for blog content processing from our `BlogGatherers` class:

### Related Posts Finder

This gatherer finds posts related to a target post based on category and content similarity:

```java
public static Gatherer<BlogPost, ?, List<BlogPost>> relatedPosts(BlogPost targetPost, int limit) {
    return Gatherer.ofSequential(
            () -> new HashMap<String, List<BlogPost>>(),
            (map, post, downstream) -> {
                // Don't include the target post itself
                if (!post.id().equals(targetPost.id())) {
                    map.computeIfAbsent(post.category(), k -> new ArrayList<>()).add(post);
                }
                return true;
            },
            (map, downstream) -> {
                // Get posts from the same category
                List<BlogPost> sameCategoryPosts = map.getOrDefault(targetPost.category(), List.of());

                // Calculate similarity score and find most similar posts
                List<BlogPost> relatedPosts = sameCategoryPosts.stream()
                        .map(post -> Map.entry(post, calculateSimilarity(targetPost, post)))
                        .sorted(Map.Entry.<BlogPost, Double>comparingByValue().reversed())
                        .limit(limit)
                        .map(Map.Entry::getKey)
                        .toList();

                downstream.push(relatedPosts);
            }
    );
}
```

### Tag Extractor

This gatherer extracts and counts hashtags from blog post content:

```java
public static Gatherer<BlogPost, ?, Map<String, Integer>> extractTags() {
    return Gatherer.ofSequential(
            () -> new HashMap<String, Integer>(),
            (tagCounts, post, downstream) -> {
                // Extract hashtags from content
                String content = post.content().toLowerCase();
                Pattern pattern = Pattern.compile("#(\\w+)");
                Matcher matcher = pattern.matcher(content);

                while (matcher.find()) {
                    String tag = matcher.group(1);
                    tagCounts.merge(tag, 1, Integer::sum);
                }

                return true;
            },
            (tagCounts, downstream) -> {
                downstream.push(tagCounts);
            }
    );
}
```

### Reading Time Calculator

This gatherer calculates estimated reading times for blog posts:

```java
public static Gatherer<BlogPost, ?, Map<Long, Duration>> calculateReadingTimes() {
    // Assume average reading speed of 200 words per minute
    final int WORDS_PER_MINUTE = 200;

    return Gatherer.ofSequential(
            () -> new HashMap<Long, Duration>(),
            (readingTimes, post, downstream) -> {
                String content = post.content();
                int wordCount = content.split("\\s+").length;

                // Calculate reading time in minutes
                double minutes = (double) wordCount / WORDS_PER_MINUTE;

                // Convert to Duration
                Duration readingTime = Duration.ofSeconds(Math.round(minutes * 60));
                readingTimes.put(post.id(), readingTime);

                return true;
            },
            (readingTimes, downstream) -> {
                downstream.push(readingTimes);
            }
    );
}
```

### Monthly Archive Builder

This gatherer groups posts by month for an archive view:

```java
public static Gatherer<BlogPost, ?, Map<YearMonth, List<BlogPost>>> monthlyArchive() {
    return Gatherer.ofSequential(
            () -> new TreeMap<YearMonth, List<BlogPost>>(Comparator.reverseOrder()),
            (archive, post, downstream) -> {
                LocalDateTime publishDate = post.publishedDate();
                YearMonth yearMonth = YearMonth.from(publishDate);

                archive.computeIfAbsent(yearMonth, k -> new ArrayList<>()).add(post);
                return true;
            },
            (archive, downstream) -> {
                // Sort posts within each month by publish date (newest first)
                archive.forEach((month, posts) ->
                        posts.sort(Comparator.comparing(BlogPost::publishedDate).reversed()));

                downstream.push(archive);
            }
    );
}
```

## Conclusion

Stream Gatherers in JDK 24 provide a powerful way to extend Java's Stream API with custom intermediate operations. They simplify complex data transformations, improve code readability, and offer better reusability.

The benefits of Stream Gatherers include:

1. **More readable code** with a natural flow
2. **Reusable solutions** for similar problems
3. **Encapsulated logic** in a single operation
4. **Support for parallel processing**

By encapsulating complex logic into custom operations, we can write more expressive and maintainable code for processing blog content and collections in general.

If you'd like to experiment with these examples, check out my GitHub repository at [https://github.com/danvega/gatherer](https://github.com/danvega/gatherer), which includes all the code we've discussed here.

Have you started using Stream Gatherers in your projects? What custom operations have you implemented? Let me know in the comments!

Happy coding!