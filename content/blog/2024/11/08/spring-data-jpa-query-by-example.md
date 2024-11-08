---
title: "Query By Example in Spring Data JPA: A Clean Approach to Dynamic Queries"
description: Learn how to simplify your Spring Data JPA queries using Query By Example (QBE) and create dynamic, type-safe queries without the boilerplate code.
slug: spring-data-jpa-query-by-example
date: 2024-11-08T17:00:00.000Z
published: true
author: Dan Vega
tags:
  - Spring Boot
  - Spring Data
video: https://www.youtube.com/embed/NGVWHdGNbiI
github: https://github.com/danvega/qbe
keywords: spring data jpa, query by example, dynamic queries, spring boot, java, database, search functionality
---

Have you ever found yourself writing countless repository methods to handle different search combinations in your Spring Data JPA applications? If so, Query By Example (QBE) might be the solution you've been looking for. This powerful feature allows you to create dynamic queries using domain object instances as templates, significantly reducing boilerplate code while maintaining type safety.

## Understanding Query By Example

Query By Example provides an intuitive API for dynamic query creation. Instead of writing multiple repository methods or complex specifications, you create a sample instance of your entity (called a probe) with the properties you want to match. Spring Data then uses this probe to generate the appropriate query.

Here's a simple example:

```java
@Service
public class EmployeeService {
    
    private final EmployeeRepository repository;
    
    public List<Employee> findEmployees(String department, String position) {
        Employee probe = new Employee();
        probe.setDepartment(department);
        probe.setPosition(position);
        
        return repository.findAll(Example.of(probe));
    }
}
```

This approach is particularly powerful when dealing with optional search parameters. No more concatenating SQL strings or building complex specifications!

## Setting Up Query By Example

To start using QBE, your repository needs to extend `QueryByExampleExecutor` along with the standard JPA repository:

```java
public interface EmployeeRepository extends 
    JpaRepository<Employee, Long>,
    QueryByExampleExecutor<Employee> {
}
```

That's it! You now have access to several methods for querying by example:

- `findAll(Example<S>)`
- `findOne(Example<S>)`
- `exists(Example<S>)`
- `count(Example<S>)`

## Advanced Matching Strategies

While basic equality matching is useful, QBE really shines when you need more sophisticated matching strategies. The `ExampleMatcher` class allows you to customize how properties are matched:

```java
@Service
public class EmployeeService {

    public List<Employee> searchEmployees(String name, String department) {
        Employee probe = new Employee();
        probe.setName(name);
        probe.setDepartment(department);
        
        ExampleMatcher matcher = ExampleMatcher.matching()
            .withStringMatcher(StringMatcher.CONTAINING)
            .withIgnoreCase()
            .withIgnoreNullValues();
            
        return repository.findAll(Example.of(probe, matcher));
    }
}
```

This configuration:
- Matches string values using a LIKE expression
- Ignores case for string comparisons
- Ignores null values in the probe

## Real-world Use Case: Search Forms

One of the most common use cases for QBE is implementing search functionality with multiple optional fields. Consider a typical employee search form:

```java
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    
    @PostMapping("/search")
    public List<Employee> search(@RequestBody EmployeeSearchCriteria criteria) {
        Employee probe = new Employee();
        probe.setDepartment(criteria.getDepartment());
        probe.setPosition(criteria.getPosition());
        probe.setLocation(criteria.getLocation());
        
        ExampleMatcher matcher = ExampleMatcher.matching()
            .withStringMatcher(StringMatcher.CONTAINING)
            .withIgnoreCase()
            .withIgnoreNullValues();
            
        return employeeService.search(probe, matcher);
    }
}
```

With this approach, users can search using any combination of fields without requiring separate repository methods for each combination.

## When to Use Query By Example

QBE is particularly well-suited for:
- Search forms with multiple optional fields
- Rapid prototyping and development
- Simple equality-based queries
- Scenarios where search criteria are unknown at compile time

However, consider alternatives when you need:
- Complex comparisons (>, <, BETWEEN)
- OR conditions
- Complex JOIN operations
- Custom SQL functions

## Best Practices

1. **Always use ExampleMatcher for string fields**
    - String matching behavior can be unexpected without proper configuration

2. **Consider null handling**
    - Decide whether null values should be ignored or matched explicitly

3. **Keep it simple**
    - If you need complex conditions, consider using Specifications or native queries instead

4. **Test thoroughly**
    - Different combinations of search criteria can produce unexpected results

## Next Steps

Query By Example is just one of many powerful features in Spring Data JPA. Consider exploring related topics:
- Specifications for complex queries
- Projections for optimized data retrieval
- Querydsl for type-safe dynamic queries

By incorporating QBE into your Spring Data JPA applications, you can write cleaner, more maintainable code while providing flexible search capabilities. The type safety and simplicity of the API make it an excellent choice for many common scenarios in enterprise applications.

Remember, the best approach depends on your specific requirements. QBE excels at simple, dynamic queries but shouldn't be forced into scenarios where other solutions might be more appropriate.