---
title: "Spring Data AOT Repositories: Faster Startup and Build-Time Query Validation"
slug: spring-data-aot-repositories
date: "2025-11-25T10:00:00.000Z"
published: true
description: "Learn how Spring Data AOT Repositories move query processing from runtime to compile time, reducing startup times and memory usage, plus how to validate repository methods at build time."
author: "Dan Vega"
tags:
  - Spring Boot
  - Spring Data
keywords: Spring Data AOT, Spring Data AOT Repositories, Spring Data, Spring Data JDBC, Spring Boot 4, compile-time query processing, AOT processing
cover: spring-data-aot-repositories.png
github: https://github.com/danvega/spring-data-aot
---

Every time a traditional Spring Data application starts up, the framework performs a significant amount of work behind 
the scenes. It analyzes your repository method names like `findByNameContainingIgnoreCase`, parses them to understand 
what query you want, figures out the SQL, and creates repository implementations. This all happens through reflection, 
and while it works, it takes time and memory.

Spring Data AOT (Ahead-of-Time) Repositories change this by moving all that work to compile time. 
The result? Faster startup, lower memory usage, and with a simple validation test, the ability to catch query 
method errors during the build before your application even starts.

::GitHubRepo{url="https://github.com/danvega/spring-data-aot"}
Follow along with the complete working example.
::

## The Cost of Runtime Query Parsing

Consider what happens every time your Spring Data application starts. For each repository method like this:

```java
List<Coffee> findByNameContainingIgnoreCase(String name);
```

Spring Data has to parse the method name, understand that "Containing" means a `LIKE` query, that "IgnoreCase" 
means wrapping things in `UPPER()`, and generate the appropriate SQL. This happens through reflection for every 
query method in every repository, on every startup.

For applications with many repositories, this adds up. And if there's a typo:

```java
List<Coffee> findByNamme(String name); // Typo!
```

You won't know until you try to start the application:

```
Caused by: org.springframework.data.repository.query.QueryCreationException: 
No property 'namme' found for type 'Coffee'; Did you mean 'name'
```

## How Spring Data AOT Works

Spring Data AOT shifts query processing to the build phase. When you run `./mvnw clean package`, the AOT processor 
scans your repository interfaces, parses the method names, generates optimized SQL queries, validates custom `@Query` 
annotations, and creates actual Java source files containing the repository implementations.

You can find these generated files in your target directory after building:

```bash
ls target/spring-aot/main/sources/dev/danvega/coffee/coffee/
```

You'll see files like `CoffeeRepositoryImpl__AotRepository.java` containing all the query logic, generated at compile time.

## Setting Up Spring Data AOT

To enable AOT processing, you need to configure the Spring Boot Maven plugin to run the `process-aot` goal. Add this execution to your `pom.xml`:

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <executions>
        <execution>
            <id>process-aot</id>
            <goals>
                <goal>process-aot</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

This goal is required for repository AOT processing. Without it, your repositories fall back to runtime reflection and you lose all the benefits.

## Building a Coffee Shop API with Spring Data AOT

Let me walk you through a practical example using Spring Data JDBC. The demo application models a coffee shop with coffees, orders, and order items.

### The Coffee Entity

```java
@Table("coffee")
public record Coffee(
    @Id Long id,
    String name,
    Size size,
    BigDecimal price
) {}
```

### The CoffeeRepository

Here's a repository that demonstrates different AOT capabilities:

```java
public interface CoffeeRepository extends ListCrudRepository<Coffee, Long> {

    // Complex derived query with LIKE and case-insensitive matching
    List<Coffee> findByNameContainingIgnoreCase(String name);
    
    // Multi-property query with AND conditions
    List<Coffee> findBySizeAndPriceGreaterThan(Size size, BigDecimal price);
    
    // Custom SQL validated at compile time
    @Query("SELECT * FROM coffee WHERE size = :size AND price <= :maxPrice ORDER BY price DESC")
    List<Coffee> findAffordableCoffeesBySize(String size, BigDecimal maxPrice);
}
```

Each of these methods demonstrates a different pattern. The first uses derived query keywords that get translated 
to a `LIKE` clause with `UPPER()` functions. The second combines multiple properties with `AND` conditions. 
The third uses an explicit `@Query` annotation where the SQL syntax gets validated during the build.

### What Gets Generated

When you build the project, the AOT processor creates an implementation class for this repository. 
For the `findByNameContainingIgnoreCase` method, it generates SQL similar to:

```sql
SELECT * FROM coffee WHERE UPPER(name) LIKE UPPER(?)
```

For the multi-property query:

```sql
SELECT * FROM coffee WHERE size = ? AND price > ?
```

You can actually inspect this generated code, which is helpful for understanding exactly what queries will run.

## The Metadata File

Along with the generated Java code, Spring Data AOT creates a JSON metadata file for each repository. You can view it with:

```bash
cat target/classes/dev/danvega/coffee/coffee/CoffeeRepository.json
```

This file shows exactly which methods were processed by AOT and which were skipped. This becomes important for validation, which we'll cover next.

## The Validation Gap

Here's something that caught me off guard when first working with Spring Data AOT: when the AOT processor encounters 
an invalid repository method (like a `findByNamme` typo), it doesn't fail the build. Instead, it logs an error, 
skips that method, and marks it for runtime reflection processing.

The logs will show something like:

```
ERROR: Failed to contribute Repository method [CoffeeRepository.findByNamme]
PropertyReferenceException: No property 'namme' found for type 'Coffee'
```

But the build succeeds. When you try to start the application, it will fail with the same error you'd see without AOT, 
since runtime reflection still can't parse the invalid method. You've lost the early feedback that AOT could provide.

## Adding Build-Time Validation

To close this gap, you can add a test that validates all your repository methods were successfully processed by AOT. 
The idea is simple: compare the methods declared in your repository interface against the methods present in the AOT metadata.

```java
@Test
void shouldValidateCoffeeRepositoryAotProcessing() throws Exception {
    List<String> declaredMethods = extractDeclaredMethodSignatures(CoffeeRepository.class);
    List<String> aotProcessedMethods = extractAotMethodSignatures("dev/danvega/coffee/coffee/CoffeeRepository.json");
    
    List<String> skippedMethods = declaredMethods.stream()
        .filter(method -> !aotProcessedMethods.contains(method))
        .toList();
    
    if (!skippedMethods.isEmpty()) {
        fail("AOT skipped methods in CoffeeRepository: " + skippedMethods);
    }
}
```

This test reads the JSON metadata file and checks that every custom method you declared has a corresponding entry. 
If a method was skipped (due to a typo, invalid property reference, or malformed query), the test fails with a 
clear message showing exactly which method has an issue.

The validation uses method signatures rather than just names, so it correctly handles overloaded methods 
like `deleteAll()` versus `deleteAll(Iterable)`.

## Working with Relationships

The demo also includes repositories that handle relationships between entities. The `OrderRepository` demonstrates queries that span multiple tables:

```java
public interface OrderRepository extends ListCrudRepository<Order, Long> {

    List<Order> findByCustomerName(String customerName);
    
    List<Order> findByStatusAndOrderDateAfter(OrderStatus status, LocalDateTime date);
    
    @Query("""
        SELECT DISTINCT o.* FROM orders o 
        INNER JOIN order_items oi ON o.id = oi.order_id 
        INNER JOIN coffee c ON oi.coffee_id = c.id 
        WHERE c.name = :coffeeName
        """)
    List<Order> findOrdersByCoffeeName(String coffeeName);
}
```

That last method is a complex three-table join. With AOT processing, the SQL syntax is validated at build time. 
If you have a typo in a column name or table name, you'll find out during the build rather than in production.

## Testing the API

Once the application is running (`./mvnw spring-boot:run`), you can test the various query patterns:

```bash
# Search for coffees using the complex LIKE query
curl "http://localhost:8080/api/coffees/search?pattern=latte"

# Filter by size and minimum price
curl "http://localhost:8080/api/coffees/filter?size=MEDIUM&minPrice=5.00"

# Find affordable coffees with custom SQL
curl "http://localhost:8080/api/coffees/affordable?size=LARGE&maxPrice=6.00"

# Find orders containing a specific coffee (complex JOIN)
curl "http://localhost:8080/api/orders/by-coffee?coffeeName=Cappuccino"
```

## The Benefits in Practice

After working with Spring Data AOT, here's what stands out:

Startup time improves noticeably. The exact numbers depend on your application size, but removing reflection-based 
query parsing at startup makes a real difference, especially for serverless deployments where cold start times matter.

Memory usage drops because there's no reflection infrastructure running to parse queries. The generated code is 
straightforward Java that the JVM handles efficiently.

Debugging becomes easier. You can actually open the generated repository implementation and step through the code. 
No more wondering what query Spring Data is generating.

Native image compilation becomes more straightforward. GraalVM works best when all code paths are known at build time, 
and pre-generated repository implementations fit that model perfectly.

## When AOT Methods Are Skipped

The AOT processor may skip certain methods that it can't generate code for. This includes methods using value expressions 
that require runtime evaluation, some custom collection return types, methods accepting `ScrollPosition` for 
keyset pagination, and a few other edge cases.

When a method is skipped, it falls back to runtime reflection. The application still works, but you lose the AOT benefits 
for that specific method. The validation test approach helps you identify when this happens, so you can decide whether 
to restructure the method or accept the fallback.

## Give It a Try

The full source code is available on GitHub at [github.com/danvega/spring-data-aot](https://github.com/danvega/spring-data-aot). 
The project uses H2 in-memory database, so there's no external setup required. Clone the repo and run `./mvnw spring-boot:run`.

To see the AOT processing in action, run `./mvnw clean package` and explore the generated files in the `target/spring-aot` 
directory. Try introducing a typo in a repository method and see how the validation test catches it.

The Spring Data team is exploring a "full AOT repository mode" that would require all methods to be 
AOT-representable or fail the build automatically. Until that's available, the test-based validation approach 
provides the safety net you need.

Happy Coding!