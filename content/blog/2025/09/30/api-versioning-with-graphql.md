---
title: "Evolving your API without Versioning in GraphQL"
slug: "api-versioning-with-graphql"
date: "2025-09-30T09:00:00.000Z"
published: true
description: "Explore modern approaches to API versioning in GraphQL, including schema evolution strategies, deprecation patterns, and best practices for maintaining backward compatibility while evolving your API."
author: "Dan Vega"
tags:
  - "Spring Boot"
  - "GraphQL"
keywords: "Spring Framework, Spring for GraphQL, GraphQL Java, GraphQL API Versioning"
cover: api_versioning_graphql.png
github: https://github.com/danvega/gqlversion
---

If you've been building REST APIs for any length of time, you've probably wrestled with versioning. You know the drill: 
your perfectly designed `/api/v1/users` endpoint ships to production, clients integrate with it, and then... 
requirements change. Now you need to add fields, restructure responses, or worse, remove deprecated data. 
Welcome to versioning fun, where `/api/v2/users` is born, and your maintenance burden just doubled.

In my [previous article on API versioning in Spring Boot 4](https://www.danvega.dev/blog/spring-boot-4-api-versioning), 
I covered the new features and strategies for implementing versioning in REST APIs. While Spring Boot 4 makes 
versioning easier with improved support for version negotiation and management, it doesn't eliminate the fundamental 
need for versioning in REST architectures.

But what if I told you there's a way to evolve your API without versioning? Enter GraphQL – 
where the whole concept of API versions becomes largely irrelevant. Let's explore why REST demands versioning 
and how GraphQL elegantly sidesteps this entire problem.

::GitHubRepo{url="https://github.com/danvega/gqlversion"}
Follow along with the complete working example.
::

## The REST Versioning Dilemma

REST APIs return fixed response structures. When you hit `/api/users/123`, you get back a predetermined set of fields:

```java
@RestController
@RequestMapping("/api/v1")
public class UserController {
    
    @GetMapping("/users/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return new UserResponse(
            id,
            "John Doe",           // full name as single field
            "john@example.com",
            LocalDateTime.now()
        );
    }
}
```

This works great until you need to split that `name` field into `firstName` and `lastName`. Now you're stuck. 
Change the response structure, and you break every client expecting the original format. The traditional solution? 
Create a new version:

```java
@RestController
@RequestMapping("/api/v2")  // New version
public class UserV2Controller {
    
    @GetMapping("/users/{id}")
    public UserV2Response getUser(@PathVariable Long id) {
        return new UserV2Response(
            id,
            "John",              // Now split into
            "Doe",               // two fields
            "john@example.com",
            LocalDateTime.now()
        );
    }
}
```

In my [article on Spring Boot 4 API versioning](https://www.danvega.dev/blog/spring-boot-4-api-versioning), 
I covered the various strategies for implementing versioning (URI versioning, request parameters, headers, etc.). 
While these approaches work, they all share the same fundamental problems that make REST API evolution painful.

## The Hidden Costs of REST Versioning

Versioning isn't just about adding a "v2" to your URLs. It creates a cascade of complexity:

**Maintenance Multiplication**: Every version needs its own controllers, DTOs, documentation, and tests. 
Supporting three versions means triple the maintenance work.

```java
// You end up with duplicate code everywhere
public class UserResponse { }      // v1
public class UserV2Response { }    // v2
public class UserV3Response { }    // v3

public class UserMapper { }        // v1
public class UserV2Mapper { }      // v2
public class UserV3Mapper { }      // v3
```

**Database Evolution Complexity**: Your database might support the latest structure, but you need mapping logic for older versions:

```java
@Service
public class UserService {
    
    public Object getUser(Long id, String version) {
        User user = userRepository.findById(id);
        
        return switch(version) {
            case "v1" -> mapToV1(user);  // Combine firstName + lastName
            case "v2" -> mapToV2(user);  // Keep separate
            case "v3" -> mapToV3(user);  // Add new fields
            default -> mapToLatest(user);
        };
    }
}
```

**Client Migration Fatigue**: Every new version requires clients to update their integration, test the changes, 
and deploy updates. Many clients end up stuck on old versions, forcing you to maintain legacy code indefinitely.

## GraphQL's Revolutionary Approach

GraphQL completely flips the script on API evolution. Instead of the server dictating the response structure, 
clients request exactly what they need:

```graphql
# Client A wants minimal data
query {
  user(id: "123") {
    name
    email
  }
}

# Client B wants more detail
query {
  user(id: "123") {
    name
    email
    avatar
    posts {
      title
      publishedAt
    }
  }
}
```

Both queries hit the same endpoint, but each client gets precisely what they asked for. No versioning required.

### Setting Up GraphQL in Spring Boot

Let's see how this works in practice. First, add Spring GraphQL to your project:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-graphql</artifactId>
</dependency>
```

Define your schema:

```graphql
type User {
  id: ID!
  name: String @deprecated(reason: "Use firstName and lastName")
  firstName: String
  lastName: String
  email: String
  avatar: String
  createdAt: String
}

type Query {
  user(id: ID!): User
}
```

Implement the resolver:

```java
@Controller
public class UserController {
    
    @QueryMapping
    public User user(@Argument String id) {
        return userService.findById(id);
    }
    
    @SchemaMapping(typeName = "User", field = "name")
    public String name(User user) {
        // Maintain backward compatibility
        return user.getFirstName() + " " + user.getLastName();
    }
}
```

## The Magic of Field-Level Evolution

Here's where GraphQL shines. Want to add a new field? Just add it to the schema:

```graphql
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  avatar: String
  createdAt: String
  # New field added - existing clients unaffected
  lastLoginAt: String
}
```

Existing clients that don't request `lastLoginAt` continue working without any changes. New clients can start using it immediately. No new endpoints, no version numbers, no migration pain.

### Handling Breaking Changes Gracefully

When you do need to make breaking changes, GraphQL's `@deprecated` directive provides a smooth transition path:

```java
@Component
public class UserResolver {
    
    // Old field (deprecated)
    @SchemaMapping(typeName = "User", field = "name")
    public String name(User user) {
        log.warn("Client still using deprecated 'name' field");
        return user.getFirstName() + " " + user.getLastName();
    }
}
```

Tools like GraphiQL and Apollo Studio will show deprecation warnings, guiding developers to update their queries. You can track deprecated field usage and safely remove them once all clients have migrated.

## Making the Choice

The decision between REST with versioning and GraphQL without versioning comes down to your specific needs:

Choose **REST with versioning** when:
- Your API changes infrequently
- You need simple HTTP caching
- Your team lacks GraphQL expertise
- You're building a simple, resource-oriented API

Choose **GraphQL** when:
- Your API evolves frequently
- You have diverse clients with different data needs
- You want to minimize client-server coordination
- You're building a data-rich, complex API

## Conclusion

API versioning in REST is a necessary evil that creates maintenance headaches, client migration challenges, 
and technical debt. GraphQL's client-driven queries and field-level deprecation offer an elegant alternative 
that lets your API evolve naturally without versioning.

For Spring Boot developers, adopting GraphQL doesn't mean abandoning everything you know. Spring GraphQL builds on 
familiar Spring concepts while providing the flexibility to evolve your API without the versioning burden. 
The next time you're about to create `/api/v2`, consider whether GraphQL might save you from versioning altogether.

By the way this is just one of the features I love about GraphQL, there are many others. Have you made the switch 
from REST to GraphQL? What was your experience with API evolution? I'd love to hear about your journey on social media.

Happy coding, friends! 🚀