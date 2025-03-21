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

# Stream Gatherers in JDK 24: Building Custom Intermediate Operations for the Stream API

I just got back from JavaOne Conference and everyone was talking about the new features in JDK 24, so I thought I would put together a post on one of my favorite new features, Stream Gatherers!

JDK 24, released in March 2025, introduces several exciting features that improve Java's expressiveness and performance. One of the most useful additions for data processing is **Stream Gatherers** (JEP 485), which enhances the Stream API by enabling custom intermediate operations.

In this tutorial, we'll explore how Stream Gatherers can simplify common blog content processing tasks. We'll start with traditional approaches and then show how Stream Gatherers offer a more elegant solution.

## The Challenge: Recent Posts By Category

A common feature in blog applications is showing the most recent posts grouped by category. This "Recent Posts By Category" widget typically displays the latest 3-5 posts from each category, sorted by publication date.

## Our Blog Post Model

We'll use a Java Record (introduced in JDK 16) to represent our blog posts:

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

## Approach 1: Traditional Stream API with Nested Collectors

Before JDK 24, we'd implement this feature using a combination of `groupingBy` and nested collectors:

```java
private static void nestedCollectors(List<BlogPost> posts) {
    // Group posts by category and limit each category to 3 most recent posts
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
                                    .collect(Collectors.toList())
                    )
            ));

    printRecentPostsByCategory(recentPostsByCategory);
}
```

This approach works, but notice the complexity:

1. We need to use nested collectors with `collectingAndThen`
2. We have to create a new stream for each category
3. The code is somewhat verbose and harder to read

## Approach 2: Map Then Transform

An alternative approach first groups by category, then processes each entry:

```java
private static void mapThenTransform(List<BlogPost> posts) {
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

This is a bit more straightforward but still requires multiple stream operations and intermediate collections.

## Approach 3: Using Stream Gatherers (JDK 24)

Now let's implement the same feature using Stream Gatherers:

```java
private static void streamGatherer(List<BlogPost> posts) {
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

The Stream Gatherer implementation is more concise and follows a natural flow. It uses a custom `groupByWithLimit` gatherer:

```java
public static <T, K> Gatherer<T, Map<K, List<T>>, Map.Entry<K, List<T>>> groupByWithLimit(
        java.util.function.Function<? super T, ? extends K> keyExtractor,
        int limit,
        Comparator<? super T> comparator) {

    return Gatherer.of(
            // Initialize with an empty map to store our grouped items
            HashMap<K, List<T>>::new,

            // Process each element
            (map, element, downstream) -> {
                // Get the key for this element (e.g., the category)
                K key = keyExtractor.apply(element);

                // Add this element to its group (creating the group if needed)
                map.computeIfAbsent(key, k -> new ArrayList<>()).add(element);

                // Continue processing the stream
                return true;
            },

            // Combiner for parallel streams - just use the first map in this simple case
            (map1, map2) -> map1,

            // When all elements have been processed, emit the results
            (map, downstream) -> {
                map.forEach((key, values) -> {
                    // Sort the values and limit to the specified number
                    List<T> limitedValues = values.stream()
                            .sorted(comparator)
                            .limit(limit)
                            .toList();

                    // Emit a Map.Entry with the key and limited values
                    downstream.push(Map.entry(key, limitedValues));
                });
            }
    );
}
```

## Understanding Stream Gatherers

Stream Gatherers are created using the `Gatherer.of` method with four key components:

1. **Initializer**: A supplier that creates the initial state for the gatherer (our `HashMap`)
2. **Integrator**: A function that processes each element and updates the state
3. **Combiner**: A function that combines states when processing in parallel
4. **Finisher**: A function that processes the final state and emits results

In our example, the gatherer:

1. Initializes with an empty `HashMap` to store posts by category
2. Processes each post by adding it to the appropriate category in the map
3. Combines maps when processing in parallel (simple case here)
4. Finishes by sorting and limiting each category's posts and emitting them as `Map.Entry` objects

## Benefits of Stream Gatherers

Compared to the traditional approaches, using Stream Gatherers offers several advantages:

1. **More readable**: The code flow is cleaner and follows a more natural pattern
2. **Reusable**: The gatherer can be easily reused with different key extractors and comparators
3. **Encapsulated**: The grouping, sorting, and limiting logic is encapsulated in a single operation
4. **Parallel-friendly**: Built-in support for parallel streams with combiners

## More Advanced Gatherers

Stream Gatherers really shine when implementing more complex processing logic. You could create gatherers for:

1. **Sliding window analysis**: Process blog posts in overlapping time windows
2. **Word frequency analysis**: Count word frequencies in blog post titles or content
3. **Sentiment analysis**: Process text and categorize sentiment in a streaming fashion
4. **Complex pagination**: Implement sophisticated pagination with dynamic page sizes

## Sample Code on GitHub

If you want to try out these examples yourself, I've created a GitHub repository with all the code from this tutorial. You can find it at:

[https://github.com/danvega/gatherer](https://github.com/danvega/gatherer)

The repository includes a complete working example with all three approaches discussed in this article, plus some additional examples of Stream Gatherers in action.

## Conclusion

Stream Gatherers in JDK 24 provide a powerful, flexible way to process data in Java streams. They bridge the gap between intermediate and terminal operations, allowing you to create custom, reusable stream transformations.

For blog applications, this means you can process content in more sophisticated ways while keeping your code clean and readable. Whether you're implementing common features like "Recent Posts By Category" or creating advanced content analysis tools, Stream Gatherers offer a valuable addition to your Java toolkit.

The next time you find yourself writing complex nested collectors or multi-step stream operations, consider whether a custom Stream Gatherer might provide a more elegant solution.