---
title: Building Dynamic GraphQL APIs with Spring Boot and Query by Example
description: Learn how to build flexible and maintainable GraphQL APIs using Spring Boot's Query by Example support, reducing boilerplate code while enabling powerful search capabilities.
slug: spring-boot-graphql-query-by-example
date: 2024-12-02T09:00:00.000Z
published: true
author: Dan Vega
tags:
  - graphql
  - spring-boot
video: https://www.youtube.com/embed/J8vC8RflPPY
keywords: Spring Boot, GraphQL, Query by Example, QBE, API Development, Java, Spring Data JPA, Dynamic Queries, Spring for GraphQL
github: https://github.com/danvega/graphql-qbe
---

When building APIs, one of the most common challenges developers face is implementing flexible search functionality. You often need to support filtering based on multiple optional criteria, leading to complex query logic and verbose repository methods. Spring Boot 3.2 introduces a powerful combination: GraphQL with Query by Example (QBE) support, offering an elegant solution to this challenge.

## The Power of Query by Example

Traditional approaches to implementing dynamic queries often involve writing multiple repository methods or building complex predicates. Consider a book management system where users need to search by title, author, or publication year in any combination. Your repository might end up looking like this:

```java
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitle(String title);
    List<Book> findByAuthor(String author);
    List<Book> findByPublishedYear(Integer year);
    List<Book> findByTitleAndAuthor(String title, String author);
    List<Book> findByTitleAndPublishedYear(String title, Integer year);
    List<Book> findByAuthorAndPublishedYear(String author, Integer year);
    List<Book> findByTitleAndAuthorAndPublishedYear(String title, String author, Integer year);
}
```

This approach quickly becomes unmaintainable as the number of searchable fields grows. Query by Example offers a more elegant solution by allowing you to create a prototype (example) of what you're looking for.

## Implementing GraphQL with QBE

Let's build a practical example using Spring Boot 3.2. First, create a new project with the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-graphql</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
</dependencies>
```

Define your GraphQL schema in `src/main/resources/graphql/schema.graphqls`:

```graphql
type Book {
    id: ID!
    title: String
    author: String
    publishedYear: Int
}

input BookInput {
    title: String
    author: String
    publishedYear: Int
}

type Query {
    books(book: BookInput): [Book]
    book(id: ID!): Book
}
```

Create your entity and repository:

```java
@Entity
public class Book {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String author;
    private Integer publishedYear;
    
    // getters, setters, constructors
}

@GraphQLRepository
public interface BookRepository extends JpaRepository<Book, Long>, 
    QueryByExampleExecutor<Book> {
}
```

The magic happens with the `@GraphQLRepository` annotation, which automatically creates data fetchers for your GraphQL queries based on the repository methods. Combined with `QueryByExampleExecutor`, it enables dynamic querying without additional code.

## Testing the API

With GraphiQL enabled in your application.properties:

```properties
spring.graphql.graphiql.enabled=true
```

You can now execute flexible queries:

```graphql
query {
    books(book: {
        author: "Martin Fowler"
        publishedYear: 2023
    }) {
        id
        title
        author
        publishedYear
    }
}
```

This query will match books that have both the specified author and publication year. The power of this approach becomes evident when you need to search with different combinations of criteria - no additional repository methods needed!

## Best Practices and Considerations

When implementing GraphQL with Query by Example, keep these points in mind:

1. Use nullable fields in your input types to make them optional for searching
2. Consider adding match modes (exact, contains, starts with) for string fields
3. Implement pagination for large result sets
4. Add proper validation and error handling

## Conclusion

The combination of GraphQL and Query by Example in Spring Boot provides a powerful solution for building flexible search APIs. This approach significantly reduces boilerplate code while maintaining clean, maintainable implementations. The result is a more elegant and developer-friendly way to handle dynamic queries in your applications.

Ready to try it yourself? Start with a simple entity and gradually add more complex search capabilities. The flexibility of this approach will make future extensions straightforward and keep your codebase clean.

Happy coding!