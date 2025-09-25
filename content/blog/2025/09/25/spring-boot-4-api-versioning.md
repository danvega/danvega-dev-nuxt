---
title: "First-Class API Versioning in Spring Boot 4"
slug: spring-boot-4-api-versioning
date: "2025-09-25T09:00:00.000Z"
published: true
description: "Learn how to implement API versioning strategies in Spring Boot 4 applications, including best practices for managing backwards compatibility and evolution of your REST APIs."
author: Dan Vega
tags:
  - Spring Boot
  - Spring Boot 4
  - Spring Framework
cover: spring_boot_4_api_versioning.png
video: ""
github: "https://github.com/danvega/api-usersa"
keywords: "Spring Boot 4, API versioning, REST API versioning, Spring Framework, backwards compatibility, API evolution, version strategy, URL versioning, header versioning, parameter versioning"
---

The next major release of Spring Boot will be generation 4 of the framework, and with it comes Spring Framework 7, packed with exciting new features that will transform how we build modern applications. Among these innovations, one feature stands out for its immediate practical impact: **first-class API versioning support**.

While the ability to version APIs isn't new, Spring Framework 7's native implementation represents a significant leap forward in standardization and developer experience. No more rolling your own versioning strategies or dealing with inconsistent implementations across teams.

::GitHubRepo{url="https://github.com/danvega/api-users"}
Follow along with the complete working example.
::

## Why This Matters Now

In the past, every team likely crafted their own versioning solution, and while these custom approaches often worked well in isolation, they created a fragmented ecosystem within organizations. Different teams meant different patterns, different conventions, and ultimately, different learning curves when developers moved between projects.

Spring Framework 7 changes this narrative by providing a standardized, framework-level solution. This means:
- **Consistency across projects**: One versioning approach to learn, one pattern to follow
- **Reduced boilerplate**: No more custom annotations or complex routing logic
- **Framework-level optimizations**: Better performance and integration with Spring's ecosystem
- **Clear migration paths**: Evolve your APIs without breaking existing clients

::tip{title="Helping our Robot Friends"}
In the age of AI-powered development and agentic coding, consistency becomes even more valuable. When your API versioning follows predictable patterns, AI tools can better understand your codebase, generate more accurate suggestions, and help maintain versioning strategies across new endpoints. Think of it as creating a template that both humans and AI can easily follow.
::

## Understanding Spring Framework 7's Versioning Approach

Spring Framework 7 introduces API versioning through the new `version` attribute in `@RequestMapping` and all related annotations (`@GetMapping`, `@PostMapping`, etc.). Combined with the `ApiVersionConfigurer`, you have complete control over how versions are resolved from incoming requests.

## Configuration Options

Before diving into the versioning strategies, let's understand how to configure API versioning. You have two primary approaches: Java configuration through `WebMvcConfigurer` or properties configuration through `application.properties`.

### Java Configuration with WebMvcConfigurer

The recommended approach is implementing `WebMvcConfigurer` in a configuration class:

```java
package dev.danvega.users.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ApiVersionConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureApiVersioning(ApiVersionConfigurer configurer) {
        configurer
                // Choose ONE of these approaches (they cannot be mixed)
                //.usePathSegment(1)                              // Path-based: /api/v1/users
                //.useRequestHeader("X-API-Version")              // Header-based
                //.useQueryParam("version")                       // Query parameter-based
                .useMediaTypeParameter(MediaType.APPLICATION_JSON, "version")  // Media type
                .addSupportedVersions("1.0","2.0")
                .setDefaultVersion("1.0")
                .setVersionParser(new ApiVersionParser());
    }
}
```

### Properties-Based Configuration

Alternatively, you can configure API versioning entirely through `application.properties`:

```properties
# Basic versioning configuration
spring.mvc.api-versioning.supported-versions=1.0,2.0
spring.mvc.api-versioning.default-version=1.0

# Choose ONE versioning strategy:

# Path segment versioning (e.g., /api/v1/users)
spring.mvc.api-versioning.path-segment.enabled=true
spring.mvc.api-versioning.path-segment.index=1

# Request header versioning (e.g., X-API-Version: 1.0)
spring.mvc.api-versioning.request-header.enabled=true
spring.mvc.api-versioning.request-header.name=X-API-Version

# Query parameter versioning (e.g., ?version=1.0)
spring.mvc.api-versioning.query-param.enabled=true
spring.mvc.api-versioning.query-param.name=version

# Media type parameter versioning (e.g., Accept: application/json;version=1.0)
spring.mvc.api-versioning.media-type.enabled=true
spring.mvc.api-versioning.media-type.parameter-name=version
```

**Important**: When using `application.properties` configuration, comment out or remove the `configureApiVersioning` method in your `WebConfig` class to avoid conflicts.

## The Four Versioning Strategies

Let's explore each built-in versioning strategy with practical examples.

**Critical Note**: You cannot mix path segment versioning with other approaches. If you enable path segments, it will override any other versioning method you try to configure. Choose one strategy and stick with it throughout your application.

### 1. Path Segment Versioning

The most RESTful approach embeds the version directly in the URL path:

```java
@GetMapping(value = "/{version}/users", version = "1.0")
public List<User> findAllv1() {
    return userRepository.findAll();
}

@GetMapping(value = "/{version}/users", version = "2.0")
public List<User> findAllv2() {
    // Return updated response structure
    return userRepository.findAll();
}
```

**Configuration in Java:**
```java
@Override
public void configureApiVersioning(ApiVersionConfigurer configurer) {
    configurer
        .usePathSegment(1)  // Index of the path segment containing version
        .addSupportedVersions("1.0", "2.0")
        .setDefaultVersion("1.0");
}
```

**Configuration in properties:**
```properties
spring.mvc.api-versioning.path-segment.enabled=true
spring.mvc.api-versioning.path-segment.index=1
spring.mvc.api-versioning.supported-versions=1.0,2.0
spring.mvc.api-versioning.default-version=1.0
```

**Client Usage:**
```bash
GET /api/v1/users  # Version 1
GET /api/v2/users  # Version 2
```

### 2. Request Header Versioning

Keep URLs clean by specifying versions in custom headers:

```java
@GetMapping(value = "/users", version = "1.0")
public List<UserDTOv1> getUsersV1() {
    return userRepository.findAll()
        .stream()
        .map(userMapper::toV1)
        .collect(Collectors.toList());
}

@GetMapping(value = "/users", version = "2.0")
public List<UserDTOv2> getUsersV2() {
    return userRepository.findAll()
        .stream()
        .map(userMapper::toV2)
        .collect(Collectors.toList());
}
```

**Configuration in Java:**
```java
configurer.useRequestHeader("X-API-Version");
```

**Configuration in properties:**
```properties
spring.mvc.api-versioning.request-header.enabled=true
spring.mvc.api-versioning.request-header.name=X-API-Version
```

**Client Usage:**
```bash
GET /api/users
X-API-Version: 2.0
```

### 3. Query Parameter Versioning

Simple and visible, perfect for debugging and testing:

```java
@GetMapping(value = "/users/list", params = "version=1.0")
public List<UserDTOv1> listUsersV1(@RequestParam String version) {
    return userRepository.findAll()
        .stream()
        .map(userMapper::toV1)
        .collect(Collectors.toList());
}
```

**Configuration in Java:**
```java
configurer.useQueryParam("version");
```

**Configuration in properties:**
```properties
spring.mvc.api-versioning.query-param.enabled=true
spring.mvc.api-versioning.query-param.name=version
```

**Client Usage:**
```bash
GET /api/users/list?version=2.0
```

### 4. Media Type Versioning (Content Negotiation)

The most sophisticated approach using Accept headers:

```java
@GetMapping(value = "/users/media", version = "1.0", produces = "application/json")
public List<UserDTOv1> getUsersMediaV1() {
    return userRepository.findAll()
        .stream()
        .map(userMapper::toV1)
        .collect(Collectors.toList());
}
```

**Configuration in Java:**
```java
configurer.useMediaTypeParameter(MediaType.APPLICATION_JSON, "version");
```

**Configuration in properties:**
```properties
spring.mvc.api-versioning.media-type.enabled=true
spring.mvc.api-versioning.media-type.parameter-name=version
```

**Client Usage:**
```bash
GET /api/users/media
Accept: application/json;version=2.0
```

## Real-World Implementation: Evolving User DTOs

The demo project showcases a practical scenario where API evolution requires different response formats. Here's how the DTOs evolve between versions:

**Version 1 with single name field:**
```java
public record UserDTOv1(
    Integer id, 
    String name,     // Combined name
    String email
) {}
```

**Version 2 with separated name fields:**
```java
public record UserDTOv2(
    Integer id, 
    String firstName,  // Split into
    String lastName,   // separate fields
    String email
) {}
```

The `UserMapper` handles the transformation elegantly:

```java
@Component
public class UserMapper {
    
    public UserDTOv2 toV2(User user) {
        String[] nameParts = splitName(user.name());
        return new UserDTOv2(
            user.id(),
            nameParts[0],  // firstName
            nameParts[1],  // lastName
            user.email()
        );
    }
    
    private String[] splitName(String fullName) {
        // Smart splitting logic that handles edge cases
        // like middle names and single-word names
        if (fullName == null || fullName.trim().isEmpty()) {
            return new String[]{"", ""};
        }

        String trimmed = fullName.trim();
        int lastSpaceIndex = trimmed.lastIndexOf(' ');

        if (lastSpaceIndex == -1) {
            return new String[]{trimmed, ""};
        }

        return new String[]{
            trimmed.substring(0, lastSpaceIndex),
            trimmed.substring(lastSpaceIndex + 1)
        };
    }
}
```

## Custom Version Parsing

Spring Framework 7 allows custom version parsing through the `ApiVersionParser` interface. The demo includes a clever implementation that makes versions more user friendly:

```java
package dev.danvega.users.config;

public class ApiVersionParser implements org.springframework.web.accept.ApiVersionParser {

    @Override
    public Comparable parseVersion(String version) {
        // Allow "v1" or "v2" instead of "1.0" or "2.0"
        if (version.startsWith("v") || version.startsWith("V")) {
            version = version.substring(1);
        }
        
        // Auto-append ".0" for major versions
        if (!version.contains(".")) {
            version = version + ".0";
        }
        
        return version;
    }
}
```

This enables more flexible client requests:
- `/api/v1/users` instead of `/api/1.0/users`
- `?version=2` instead of `?version=2.0`
- `X-API-Version: v1` instead of `X-API-Version: 1.0`

## Key Features & Benefits

### Automatic Version Detection
Spring transparently detects supported versions from your controller mappings. No need to maintain separate version registries.

### Smart Error Handling
Requests with unsupported versions automatically return 400 Bad Request with clear error messages via `InvalidApiVersionException`.

### Deprecation Support
The framework can send version deprecation hints to clients through response headers, enabling smooth migration paths.

### Optional Versioning
While versions are required by default, you can make them optional, defaulting to the most recent version:

```java
configurer.setVersionRequired(false);
```

Or in properties:
```properties
spring.mvc.api-versioning.version-required=false
```

## Best Practices & Recommendations

1. **Choose One Strategy**: While Spring supports all four approaches, stick to one per application for consistency. Remember that path segment versioning cannot be mixed with other strategies.

2. **Path Segments for Public APIs**: Most RESTful and cache friendly. Ideal for public facing APIs where the version is part of the resource identifier.

3. **Headers for Internal APIs**: Keeps URLs clean. Perfect for microservice communication where you have control over clients.

4. **Query Parameters for Testing**: Easy to modify in browser URLs and debugging tools. Good for development and internal tools.

5. **Media Type for Enterprise APIs**: Follows content negotiation standards. Suitable for sophisticated API consumers.

6. **Semantic Versioning**: Use clear version numbers (1.0, 2.0) that communicate the magnitude of changes.

7. **Document Breaking Changes**: Version bumps should correlate with the significance of API changes.

8. **Gradual Migration**: Support multiple versions simultaneously to give clients time to upgrade.

## Testing Your Versioned APIs

The repository includes comprehensive testing examples. Here's how to test each strategy:

```bash
# Using HTTPie for testing

# Path segment
http :8080/api/v1/users
http :8080/api/v2/users

# Header-based
http :8080/api/users X-API-Version:1.0
http :8080/api/users X-API-Version:2.0

# Query parameter
http :8080/api/users/list version==1.0
http :8080/api/users/list version==2.0

# Media type
http :8080/api/users/media Accept:'application/json;version=1.0'
http :8080/api/users/media Accept:'application/json;version=2.0'
```

The project also includes an `api-requests.http` file that works with IntelliJ IDEA and VS Code REST Client extensions for easy testing.

## Migration Strategy

If you're currently using a custom versioning solution, here's a migration path:

1. **Identify Current Pattern**: Document your existing versioning approach
2. **Choose Target Strategy**: Select the Spring versioning strategy that best matches your needs
3. **Configuration Decision**: Decide between Java configuration (WebMvcConfigurer) or properties configuration
4. **Parallel Implementation**: Run both systems side by side initially
5. **Gradual Cutover**: Migrate endpoints progressively
6. **Deprecate Legacy**: Remove custom implementation once fully migrated

## Common Pitfalls to Avoid

1. **Mixing Strategies**: Don't try to combine path segments with other versioning methods. The path segment approach will override others.

2. **Forgetting Parser Registration**: If using custom version parsing, remember to register it in your configuration.

3. **Configuration Conflicts**: Don't configure versioning in both Java config and application.properties. Choose one approach.

4. **Version Format Inconsistency**: Stick to a consistent version format across your API (either 1.0, 2.0 or v1, v2, not both).

## Looking Ahead

Spring Framework 7's API versioning is just the beginning. This standardization opens doors for:

- **Tooling Integration**: IDEs and build tools can provide better versioning support
- **API Documentation**: Tools like SpringDoc/OpenAPI can automatically document versions
- **Gateway Integration**: API gateways can intelligently route based on versions
- **Monitoring**: Observability tools can track version usage and deprecation
- **Client Generation**: Automated client SDK generation with version awareness

## Conclusion

Spring Framework 7's first-class API versioning support represents a major step forward in API development. By providing a standardized, flexible, and powerful versioning mechanism at the framework level, Spring eliminates the need for custom solutions while ensuring consistency across projects.

The beauty lies not just in the feature itself, but in how it integrates seamlessly with the existing Spring ecosystem. Whether you're building microservices, REST APIs, or evolving legacy systems, this new versioning support provides the tools you need to manage API evolution professionally.

The choice between Java configuration through WebMvcConfigurer or properties-based configuration gives teams the flexibility to choose what works best for their workflow. Just remember to pick one versioning strategy and stick with it, as mixing approaches (especially with path segments) won't work as expected.

Start experimenting with the demo repository, choose your versioning strategy, and prepare for a more standardized future in API development. Your future self (and your team) will thank you for the consistency.

## Get Started

1. Clone the demo repository
2. Choose your configuration approach (WebMvcConfigurer or application.properties)
3. Select one versioning strategy (remember: no mixing with path segments!)
4. Run with `./mvnw spring-boot:run`
5. Test using the provided `api-requests.http` file
6. Experiment with different versioning strategies
7. Implement in your own projects

Welcome to the future of API versioning in Spring, where consistency meets flexibility, and evolution becomes manageable.