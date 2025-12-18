---
title: "Jackson 3 in Spring Boot 4: JsonMapper, JSON Views, and What's Changed"
slug: jackson-3-spring-boot-4
date: "2025-11-10T09:00:00.000Z"
published: true
description: "Learn how to use Jackson 3 in Spring Boot 4 with the new JsonMapper, immutable configuration, unchecked exceptions, and JSON Views with the hint() method."
author: Dan Vega
tags:
  - Spring Boot
  - Spring Boot 4
cover: jackson_3_cover.png
video: https://www.youtube.com/embed/4cvP_qroLH4
github: https://github.com/danvega/donut-shop
keywords: jackson 3 spring boot 4, jsonmapper spring boot, jackson json views, spring boot json serialization, objectmapper vs jsonmapper, jackson 3 migration, @jsonview spring boot example
---

Spring Boot 4 ships with Jackson 3 as its default JSON library, and this brings some changes you'll want to understand before upgrading. 
If you've been working with Spring for a while, you've probably used Jackson for serializing Java objects to JSON and 
deserializing JSON back into objects. Jackson 3 introduces a new package structure, replaces the mutable `ObjectMapper` 
with an immutable `JsonMapper`, switches to unchecked exceptions, and changes some default behaviors.

In this post, I'll walk you through these changes with a practical example. We'll build a donut menu API that demonstrates 
reading JSON files, configuring the `JsonMapper`, and using `@JsonView` to control what data gets sent to different API consumers.

::GitHubRepo{url="https://github.com/danvega/donut-shop"}
Follow along with the complete working example.
::

## Jackson 2 and 3 Side by Side

When you add `spring-boot-starter-webmvc` to a Spring Boot 4 project, you'll get both Jackson 2 and Jackson 3 on your classpath. 
This might seem strange at first, but there's a good reason for it.

The Jackson team solved a tricky compatibility problem: how do you support both versions during the ecosystem's transition 
period? Their solution was to keep the annotation library (`jackson-annotations`) on the 
original `com.fasterxml.jackson.core` group ID while moving the core processing to a new `tools.jackson` package.

Here's what the dependency tree looks like:

```
spring-boot-starter-jackson (4.0.0-RC1)
├── tools.jackson.core:jackson-databind:3.0.1      ← Jackson 3 engine
└── com.fasterxml.jackson.core:jackson-annotations:2.20  ← Shared annotations
```

This means your existing `@JsonView`, `@JsonFormat`, and other annotations work with both Jackson 2 and 3. 
Organizations can migrate gradually without breaking shared domain models across projects.

## What Changed in Jackson 3

There are four key changes you'll encounter when working with Jackson 3 in Spring Boot 4.

### New Package Names

The most visible change is the package rename. Where you previously imported from `com.fasterxml.jackson`, you'll now import from `tools.jackson`:

```java
// Jackson 2
import com.fasterxml.jackson.databind.ObjectMapper;

// Jackson 3
import tools.jackson.databind.json.JsonMapper;
```

The exception is annotations. Those still come from `com.fasterxml.jackson.annotation` since they're shared between versions.

### Immutable Builder Pattern

Jackson 2's `ObjectMapper` was mutable. You could create an instance and then change its configuration later, which caused 
issues in multi-threaded environments. Jackson 3 requires immutable, thread-safe configuration through a builder:

```java
// Jackson 2 - Mutable configuration
ObjectMapper mapper = new ObjectMapper();
mapper.enable(SerializationFeature.INDENT_OUTPUT);  // Can change state anytime

// Jackson 3 - Immutable builder pattern
JsonMapper mapper = JsonMapper.builder()
    .enable(SerializationFeature.INDENT_OUTPUT)
    .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
    .build();  // Configuration locked after build()
```

Once you call `build()`, the configuration is locked. This makes the `JsonMapper` safe to share across threads 
without synchronization.

### Date Serialization Default Changed

Jackson 2 serialized dates as numeric timestamps by default. Jackson 3 flips this to ISO-8601 strings:

```json
// Jackson 2 default (WRITE_DATES_AS_TIMESTAMPS = true)
{"bakedAt": 1699257000000}

// Jackson 3 default (WRITE_DATES_AS_TIMESTAMPS = false)
{"bakedAt": "2025-11-06T05:30:00"}
```

The ISO-8601 format is more human-readable and easier for frontend frameworks to parse. If your tests expect timestamps, 
you'll need to update them or configure Jackson to use the old behavior.

### Unchecked Exceptions

Jackson 3 switches from checked to unchecked exceptions. In Jackson 2, methods like `readValue()` threw 
`JsonProcessingException` and `IOException`, which forced you to wrap calls in try-catch blocks or declare throws clauses.

```java
// Jackson 2 - Checked exceptions (must handle)
try {
    objectMapper.readValue(json, MyClass.class);
} catch (JsonProcessingException e) {
    // Required
} catch (IOException e) {
    // Required
}

// Jackson 3 - Unchecked exceptions (optional handling)
try {
    jsonMapper.readValue(json, MyClass.class);
} catch (JacksonException e) {
    // Only if you need to handle it
}
```

This matters most when using lambdas and streams. Checked exceptions don't work inside lambda expressions, so Jackson 2 code like this wouldn't compile:

```java
// Jackson 2 - Doesn't compile
donuts.stream()
    .map(d -> jsonMapper.writeValueAsString(d))  // Compile error!
    .toList();

// Jackson 3 - Works fine
donuts.stream()
    .map(d -> jsonMapper.writeValueAsString(d))  // No problem
    .toList();
```

All Jackson 3 exceptions extend `JacksonException`, which is a `RuntimeException`. You can still catch them when needed, but you're not forced to.

## Using JsonMapper in Spring Boot 4

Spring Boot auto-configures a `JsonMapper` bean that you can inject anywhere in your application. Let's see this in action with a data loader that reads a JSON file.

### Reading JSON from a File

Here's a `DataLoader` that reads a menu of donuts from a JSON file when the application starts:

```java
@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);
    private static final String DONUTS_JSON_PATH = "classpath:data/donuts-menu.json";

    private final JsonMapper jsonMapper;
    private final ResourceLoader resourceLoader;
    private List<Donut> donuts;

    public DataLoader(JsonMapper jsonMapper, ResourceLoader resourceLoader) {
        this.jsonMapper = jsonMapper;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Loading Donuts 🍩");

        try {
            Resource resource = resourceLoader.getResource(DONUTS_JSON_PATH);

            this.donuts = jsonMapper.readValue(
                    resource.getInputStream(),
                    new TypeReference<>() {}
            );

            donuts.forEach(System.out::println);

        } catch (JacksonException e) {
            log.error("Failed to load donut data: {}", e.getMessage(), e);
            throw e;
        }
    }

    public List<Donut> getDonuts() {
        return donuts;
    }
}
```

Notice how we inject `JsonMapper` directly through the constructor. Spring Boot creates this bean with configuration 
from your `application.yaml`. The `TypeReference<>()` preserves the generic type information at runtime so Jackson knows to create a `List<Donut>` rather than a raw `List`.

The JSON file lives at `src/main/resources/data/donuts-menu.json`:

```json
[
  {
    "type": "Classic Glazed",
    "glaze": "VANILLA",
    "toppings": [],
    "price": 2.50,
    "isVegan": false,
    "calories": 260,
    "bakedAt": "2025-11-06T05:30:00"
  },
  {
    "type": "Maple Bacon Bar",
    "glaze": "MAPLE",
    "toppings": ["bacon bits"],
    "price": 3.75,
    "isVegan": false,
    "calories": 380,
    "bakedAt": "2025-11-06T06:15:00"
  }
]
```

### Configuring Jackson Properties

You can configure Jackson through `application.yaml`. Here's what our example uses:

```yaml
spring:
  application:
    name: donuts
  jackson:
    use-jackson2-defaults: true
    serialization:
      indent-output: true
```

The `use-jackson2-defaults: true` setting maintains Jackson 2 behavior during migration. This is helpful if you're 
upgrading an existing application and want to avoid surprises from changed defaults. Once you've validated everything 
works with Jackson 3's defaults, you can remove this setting.

The `indent-output: true` setting pretty-prints JSON output with proper indentation. This is great during development 
but you might want to disable it in production to reduce payload sizes.

### The Donut Record

Our domain model is a Java record:

```java
public record Donut(
        String type,
        Glaze glaze,
        List<String> toppings,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "$#.##")
        BigDecimal price,
        Boolean isVegan,
        Integer calories,
        LocalDateTime bakedAt
) {
    public enum Glaze {
        CHOCOLATE, VANILLA, STRAWBERRY, MAPLE, 
        CINNAMON_SUGAR, POWDERED_SUGAR, NONE
    }
}
```

Note that we're using `Boolean` instead of `boolean` for the `isVegan` field. This matters when using `@JsonView` for 
deserialization because primitive types can't be null. If a view excludes a field, Jackson can't assign `null` to a primitive.

## JSON Views: One Model, Multiple Representations

Imagine you're building an API that serves different clients with different data needs:

- A **mobile app** that needs minimal data (just type and price) to save bandwidth
- A **public website** that shows more details (add glaze, toppings, vegan status)
- An **internal dashboard** that needs everything (add calories, bake time)

The traditional approach creates multiple DTO classes and mapping code for each scenario. This leads to class 
proliferation and repetitive boilerplate. `@JsonView` offers a cleaner solution: define views as interfaces and annotate your fields.

### Defining Views

Create a class with nested interfaces representing each view level:

```java
public class Views {

    // Minimal info for quick listings
    public interface Summary {}

    // Public API - includes Summary + more details
    public interface Public extends Summary {}

    // Internal use - includes Public + sensitive data
    public interface Internal extends Public {}

    // Admin access - everything
    public interface Admin extends Internal {}
}
```

The inheritance is important. `Public extends Summary` means anything visible in Summary is also visible in Public. 
This creates a hierarchy where each level includes everything from the levels above it.

### Annotating the Model

Add `@JsonView` annotations to each field specifying which view includes it:

```java
public record Donut(
        @JsonView(Views.Summary.class)
        String type,
        
        @JsonView(Views.Public.class)
        Glaze glaze,
        
        @JsonView(Views.Public.class)
        List<String> toppings,
        
        @JsonView(Views.Summary.class)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "$#.##")
        BigDecimal price,
        
        @JsonView(Views.Public.class)
        Boolean isVegan,
        
        @JsonView(Views.Internal.class)
        Integer calories,
        
        @JsonView(Views.Internal.class)
        LocalDateTime bakedAt
) { }
```

With this setup:
- **Summary view** shows: `type`, `price`
- **Public view** shows: `type`, `price`, `glaze`, `toppings`, `isVegan`
- **Internal view** shows: everything

### Using Views in Controllers

Add `@JsonView` to controller methods to control what gets serialized in responses:

```java
@RestController
@RequestMapping("/api/donuts")
public class DonutController {

    private final DataLoader dataLoader;

    public DonutController(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

    @GetMapping("/summary")
    @JsonView(Views.Summary.class)
    public List<Donut> getSummary() {
        return dataLoader.getDonuts();
    }

    @GetMapping("/public")
    @JsonView(Views.Public.class)
    public List<Donut> getPublic() {
        return dataLoader.getDonuts();
    }

    @GetMapping("/internal")
    @JsonView(Views.Internal.class)
    public List<Donut> getInternal() {
        return dataLoader.getDonuts();
    }
}
```

Each endpoint returns the same `List<Donut>`, but the JSON output differs based on the view:

**GET /api/donuts/summary:**
```json
[
  {
    "type": "Classic Glazed",
    "price": "$2.50"
  }
]
```

**GET /api/donuts/internal:**
```json
[
  {
    "type": "Classic Glazed",
    "glaze": "VANILLA",
    "toppings": [],
    "price": "$2.50",
    "isVegan": false,
    "calories": 260,
    "bakedAt": "2025-11-06T05:30:00"
  }
]
```

### JSON Views for Request Bodies

Views also work for deserialization. You can control which fields are accepted in POST requests:

```java
@PostMapping
@JsonView(Views.Summary.class)
public Donut createDonut(@RequestBody @JsonView(Views.Summary.class) Donut donut) {
    log.info("Received - Type: {}, Price: {}", donut.type(), donut.price());
    log.info("Ignored - Glaze: {}, Calories: {}", donut.glaze(), donut.calories());

    // Server fills in the rest
    return new Donut(
            donut.type(),
            Donut.Glaze.CHOCOLATE,  // Server default
            List.of("sprinkles"),    // Server default
            donut.price(),
            false,
            300,
            LocalDateTime.now()
    );
}
```

Even if a client sends `calories` and `bakedAt` in the request body, Jackson ignores them because they're not part of 
the Summary view. This is a security win because you control exactly what data clients can modify.

## Client-Side Views with hint()

Spring Boot 4 introduces a cleaner way to apply views on the client side when making HTTP requests. Previously, you had to wrap your object in a `MappingJacksonValue` holder:

```java
// Old way (Spring Boot 3.x and earlier)
var donut = new Donut("Maple Bar", Donut.Glaze.MAPLE, ...);

var jacksonValue = new MappingJacksonValue(donut);
jacksonValue.setSerializationView(Views.Summary.class);

restTemplate.postForObject("/api/donuts", jacksonValue, Donut.class);
```

This wrapper approach was awkward because it broke the fluent API style and required mutable state.

### The New hint() Method

With Spring Boot 4, use `hint()` on the `RestClient`:

```java
var donut = new Donut(
        "Maple Bar",
        Donut.Glaze.MAPLE,
        List.of("pecans", "bacon"),
        new BigDecimal("3.99"),
        false,
        450,
        LocalDateTime.now()
);

restClient.post()
    .uri("/api/donuts")
    .hint(JsonView.class.getName(), Views.Summary.class)
    .body(donut)
    .retrieve()
    .body(Donut.class);
```

Even though `donut` has all fields populated, only `type` and `price` get serialized and sent. The `hint()` method tells Jackson to apply the Summary view during serialization without any wrapper objects.

This approach is:
- **Cleaner**: No wrapper objects or mutable state
- **Fluent**: Fits naturally in the builder chain
- **Thread-safe**: Works with Jackson 3's immutable configuration

## Conclusion 

Jackson 3 in Spring Boot 4 brings meaningful improvements: immutable configuration that's safer in concurrent environments, 
unchecked exceptions that work cleanly with lambdas and streams, and better defaults for date serialization. The `@JsonView` 
annotation lets you create multiple representations from a single model, and the new `hint()` method makes client-side view application much cleaner.

The transition from Jackson 2 might require some adjustment, especially if you have tests relying on specific serialization formats. 
But the compatibility strategy of keeping annotations on the old package makes migration manageable.

For more details, check out [Sébastien Deleuze's article on Jackson 3 support in Spring](https://spring.io/blog/2025/10/07/introducing-jackson-3-support-in-spring) 
and the [Jackson 3 Migration Guide](https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md).

Happy Coding!