---
title: "Loading Resources in Spring Boot"
slug: loading-spring-resources
date: "2025-12-17T09:00:00.000Z"
published: true
description: "Learn how to load resources in Spring Boot using the Resource interface. This tutorial covers three approaches for loading files from the classpath, filesystem, and URLs."
author: "Dan Vega"
tags:
  - Spring Boot
  - Spring Framework
cover: spring_resources_cover.png
video: https://www.youtube.com/embed/Hmcgwj65Unw
github: https://github.com/danvega/resources
keywords: spring boot resource, spring Resource interface, ClassPathResource, ResourceLoader, ResourcePatternResolver, spring load file classpath, spring boot load json file, @Value resource spring
---

When building a Spring Boot application, you'll often need to load files into your application. 
Maybe it's a JSON file with seed data, SQL scripts for database setup, or a configuration file. 
These files could live on the classpath (like `src/main/resources`), somewhere on the filesystem, or even at a remote URL.

Spring's `Resource` interface is the abstraction that makes all of this possible. It provides a consistent way to load 
files regardless of where they're stored, and Spring gives you several tools for working with it.

In this tutorial, you'll learn three approaches to loading resources in Spring Boot and when to reach for each one.

::GitHubRepo{url="https://github.com/danvega/resources"}
Follow along with the complete working example.
::

## Understanding Spring's Resource Interface

The `Resource` interface is Spring's abstraction for accessing low-level resources. Rather than writing different code 
for classpath files versus filesystem files versus URLs, you work with `Resource` objects and let Spring handle the details.

When you specify a resource path, the prefix determines which `Resource` implementation Spring uses:

| Prefix | Implementation | Example |
|--------|---------------|---------|
| `classpath:` | `ClassPathResource` | Files in `src/main/resources` |
| `file:` | `FileSystemResource` | Absolute paths like `/var/config/app.json` |
| `file:./` | `FileUrlResource` | Relative to working directory |
| `https://` | `UrlResource` | Remote files via HTTP/HTTPS |

This prefix system is the key to understanding how Spring loads resources. The same code can load a file from the 
classpath during development and from a URL in production, just by changing the prefix.

## Using @Value with Resource

The simplest way to load a resource is combining the `@Value` annotation with Spring's `Resource` type. 
This approach works best when you know the file path at compile time.

Here's a basic example. Say you have a text file called `myFile.txt` in your `src/main/resources` directory:

```java
@RestController
public class ResourceController {

    @Value("classpath:myFile.txt")
    private Resource classpathResource;

    @GetMapping
    public String getClasspathResource() throws IOException {
        return new String(classpathResource.getContentAsByteArray(), StandardCharsets.UTF_8);
    }
}
```

The `classpath:` prefix tells Spring to look in `src/main/resources`. Spring automatically creates a `ClassPathResource` 
instance and injects it into your field.

### Loading Files from Different Locations

You can use different prefixes to load resources from various sources:

```java
// Load from classpath (src/main/resources/myFile.txt)
@Value("classpath:myFile.txt")
private Resource classpathResource;

// Load from filesystem (relative to working directory)
@Value("file:./data/config.txt")
private Resource fileResource;

// Load from a remote URL
@Value("https://raw.githubusercontent.com/danvega/danvega/refs/heads/master/README.md")
private Resource urlResource;
```

### Common Mistake: Forgetting the Resource Prefix

One thing that trips people up when trying to load a classpath resource is forgetting the prefix:

```java
// This will NOT work - Spring doesn't know how to interpret the path
@Value("/myFile.txt")
private Resource resource;  // Error!

// This works - the classpath: prefix tells Spring where to look
@Value("classpath:myFile.txt")
private Resource resource;  // OK
```

Always include the prefix. Without it, Spring doesn't know whether you're referring to a classpath resource, a filesystem path, or something else.

### Working with the Resource Interface

Once you have a `Resource`, several helpful methods are available:

```java
resource.exists()                // Check if the resource exists
resource.isReadable()            // Check if content can be read
resource.getFilename()           // Get the filename
resource.getDescription()        // Human-readable description for logging
resource.getInputStream()        // Get an InputStream to read content
resource.getContentAsByteArray() // Read entire content as byte array
```

### Using ClassPathResource Directly

You don't always need `@Value`. You can instantiate `ClassPathResource` directly:

```java
@GetMapping("/classpath")
public String getClasspathResource2() throws IOException {
    Resource resource = new ClassPathResource("myFile.txt");
    return new String(resource.getContentAsByteArray(), StandardCharsets.UTF_8);
}
```

This approach is useful when you need to create resources programmatically, such as in a loop, or when you're working in a class that isn't Spring-managed.

### Avoiding FileNotFoundException in JAR Files

A common issue developers encounter is code that works in their IDE but fails when running as a packaged JAR. 
This happens when you try to use `resource.getFile()` on a classpath resource inside a JAR.

The problem is that resources inside a JAR aren't actual files on the filesystem. Instead, use `getInputStream()` or `getContentAsByteArray()`:

```java
// This may fail when running from a JAR
File file = resource.getFile();  // FileNotFoundException in JAR!

// This works everywhere - IDE and JAR
InputStream inputStream = resource.getInputStream();
byte[] content = resource.getContentAsByteArray();
```

Stick with `getInputStream()` or `getContentAsByteArray()` and your code will work consistently regardless of how it's packaged.

## Using ResourceLoader for Dynamic File Paths

The `@Value` approach works well when paths are known ahead of time. But what if the resource path depends on user input or is determined at runtime?

Consider this scenario: you have a folder of JSON files, and the user requests a specific one by name. With `@Value`, you'd need a separate field for every possible file:

```java
// With @Value, you need a field for EVERY file
@Value("classpath:json/users.json")
private Resource usersJson;

@Value("classpath:json/products.json")
private Resource productsJson;

// What if you have 50 files? You'd need 50 fields!
```

That's where `ResourceLoader` comes in. It lets you build the path dynamically and load files at runtime:

```java
@RestController
@RequestMapping("/json")
public class ResourceLoaderController {

    private final ResourceLoader resourceLoader;

    public ResourceLoaderController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/{name}")
    public String getJsonFile(@PathVariable String name) throws IOException {
        // Build the resource path at RUNTIME based on the request
        String path = "classpath:json/" + name + ".json";
        Resource resource = resourceLoader.getResource(path);

        if (!resource.exists()) {
            return "Resource not found: " + name + ".json";
        }

        return new String(resource.getContentAsByteArray(), StandardCharsets.UTF_8);
    }
}
```

Now you can request `/json/users` or `/json/products`, and the controller loads the appropriate file dynamically. No need for separate fields.

### When to Use @Value vs ResourceLoader

| Approach | Use When |
|----------|----------|
| `@Value` + Resource | Path is known at **compile time** |
| `ResourceLoader` | Path is determined at **runtime** |

The mental model is straightforward: if you're hardcoding the path in your source code, use `@Value`. If the path depends on something that happens while your application is running (user input, configuration values, database lookups), use `ResourceLoader`.

## Using ResourcePatternResolver to Load Multiple Files

Sometimes you need to load not just one resource, but many. Imagine you have a folder of SQL migration scripts and want to load all of them:

```
src/main/resources/sql/
├── 001_create_users.sql
├── 002_create_products.sql
└── 003_create_orders.sql
```

`ResourcePatternResolver` lets you load multiple resources that match a pattern:

```java
@RestController
@RequestMapping("/sql")
public class ResourcePatternController {

    private final ResourcePatternResolver resourcePatternResolver;

    public ResourcePatternController(ResourcePatternResolver resourcePatternResolver) {
        this.resourcePatternResolver = resourcePatternResolver;
    }

    @GetMapping
    public String getAllSqlFiles() throws IOException {
        // Load ALL .sql files matching the pattern
        Resource[] resources = resourcePatternResolver.getResources("classpath:sql/*.sql");

        // Sort by filename for consistent ordering
        Arrays.sort(resources, (a, b) -> {
            String nameA = a.getFilename() != null ? a.getFilename() : "";
            String nameB = b.getFilename() != null ? b.getFilename() : "";
            return nameA.compareTo(nameB);
        });

        StringBuilder result = new StringBuilder();
        result.append("Found ").append(resources.length).append(" SQL files:\n\n");

        for (Resource resource : resources) {
            result.append("=== ").append(resource.getFilename()).append(" ===\n");
            result.append(new String(resource.getContentAsByteArray(), StandardCharsets.UTF_8));
            result.append("\n");
        }

        return result.toString();
    }
}
```

### Pattern Syntax for Resource Matching

The pattern syntax gives you flexibility when loading multiple files:

| Pattern | Matches |
|---------|---------|
| `classpath:sql/*.sql` | All `.sql` files in the `sql` folder |
| `classpath:config/**/*.xml` | All `.xml` files in `config` and subdirectories |
| `classpath*:META-INF/*.xml` | All `.xml` files from ALL JARs on the classpath |

The `*` matches files within a single directory, `**` matches directories recursively, and `classpath*:` searches across all JARs (not just your application).

### When ResourcePatternResolver Makes Sense

This approach is particularly useful for:

- Loading database migration scripts in order
- Processing all configuration files in a directory
- Scanning for plugin descriptors across multiple JARs
- Batch processing template files

## Which Approach Should You Use?

Here's a quick decision framework for loading resources in Spring Boot:

| Scenario | Approach |
|----------|----------|
| Path known at compile time, loading ONE resource | `@Value` + Resource |
| Path determined at runtime, loading ONE resource | `ResourceLoader` |
| Loading MULTIPLE resources matching a pattern | `ResourcePatternResolver` |

Each approach builds on the previous one. `@Value` is the simplest for static paths. `ResourceLoader` adds runtime flexibility. `ResourcePatternResolver` adds pattern matching for multiple files.

## Conclusion

Loading resources in Spring Boot is straightforward once you understand the `Resource` abstraction. The key points to remember:

- Always use a prefix (`classpath:`, `file:`, `https://`) when specifying resource paths
- Use `getInputStream()` or `getContentAsByteArray()` instead of `getFile()` to avoid issues when running from a JAR
- Choose `@Value` for static paths, `ResourceLoader` for dynamic paths, and `ResourcePatternResolver` for loading multiple files

With these three approaches in your toolkit, you can load files from the classpath, filesystem, or remote URLs with confidence.

Happy Coding!