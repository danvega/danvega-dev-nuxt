---
title: "RestClient OAuth2 Support in Spring Security 6.4: A Complete Guide"
description: Learn how to implement OAuth2 authentication in your Spring applications using the new RestClient OAuth2 support in Spring Security 6.4. This guide covers architecture, implementation, and best practices for secure service-to-service communication.
slug: rest-client-oauth2-support
date: 2024-11-08T17:00:00.000Z
published: true
author: Dan Vega
tags:
  - Spring Boot
  - Spring Security
video: https://www.youtube.com/embed/nFKcJDpUuZ8
github: https://github.com/danvega/golf-scheduler
keywords: spring security, oauth2, restclient, spring boot, java, authentication, authorization, security
---

Spring Security 6.4 introduces native OAuth2 support for the RestClient, making it easier than ever to secure your service-to-service communications. If you've been using RestClient since its introduction in Spring Framework 6.1, you'll appreciate this streamlined approach to OAuth2 integration. Let's explore how this new feature simplifies secure API interactions.

## The Evolution of HTTP Clients in Spring

The RestClient, introduced in Spring Framework 6.1, provided developers with a fluent, synchronous API for HTTP communications. While it quickly gained popularity for its clean interface and lack of reactive dependencies, implementing OAuth2 security required custom solutions. Spring Security 6.4 addresses this gap with built-in OAuth2 support.

## Understanding the Architecture

Before diving into the implementation, let's understand the key components in a typical OAuth2 setup:

1. **Authorization Server** - Issues and validates OAuth2 tokens
2. **Resource Server** - Hosts protected resources requiring OAuth2 authentication
3. **Client Application** - Makes authenticated requests using OAuth2 tokens

Here's how these components interact in a typical flow:

1. The client requests an access token from the Authorization Server
2. The Authorization Server validates credentials and returns a token
3. The client includes this token when requesting protected resources
4. The Resource Server validates the token before serving the request

![OAuth2 Architecture](/images/blog/2024/11/05/oauth2_architecture.png)

## Implementing OAuth2 with RestClient

Let's implement this using Spring Security 6.4's new RestClient OAuth2 support. We'll create a client application that securely accesses protected resources.

### Client Configuration

First, configure your OAuth2 client properties:

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          golf-client:
            provider: spring
            client-id: golf-client
            client-secret: golf-secret
            authorization-grant-type: client_credentials
            scope: read
        provider:
          spring:
            token-uri: http://localhost:9000/oauth2/token
```

### RestClient Setup

Create a RestClient bean with OAuth2 support:

```java
@Configuration
public class ClientConfig {

    @Bean
    RestClient restClient(RestClient.Builder builder, OAuth2ClientHttpRequestInterceptor interceptor) {
        return builder
            .baseUrl("http://localhost:8081")
            .requestInterceptor(interceptor)
            .build();
    }
}
```

The new `OAuth2ClientHttpRequestInterceptor` handles token acquisition and request enhancement automatically.

### Making Authenticated Requests

Use the `attributes()` method to specify OAuth2 details:

```java
@RestController
@RequestMapping("/api")
public class LessonsController {

    private final RestClient restClient;

    public LessonsController(RestClient restClient) {
        this.restClient = restClient;
    }

    @GetMapping("/lessons")
    public List<Lesson> getLessons() {
        return restClient.get()
            .uri("/lessons")
            .attributes(OAuth2ClientAttributesUtils.clientRegistrationId("golf-client"))
            .retrieve()
            .body(new ParameterizedTypeReference<>() {});
    }
}
```

## Common Pitfalls and Solutions

1. **Missing Security Configuration**

Without proper security configuration, you might get redirected to form login. Add this configuration:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .formLogin(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
            .csrf(AbstractHttpConfigurer::disable)
            .build();
    }
}
```

2. **Token Validation Issues**

Ensure your Resource Server is configured to validate tokens:

```java
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:9000
```

## Testing Your Implementation

Here's a simple test to verify your OAuth2 integration:

```java
@SpringBootTest
class LessonsControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void whenRequestingLessons_thenReturnsAuthorizedResponse() {
        ResponseEntity<List<Lesson>> response = restTemplate.exchange(
            "/api/lessons",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<>() {}
        );
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotEmpty();
    }
}
```

## Conclusion

Spring Security 6.4's RestClient OAuth2 support significantly simplifies secure service-to-service communication. The integration feels natural and follows Spring's philosophy of convention over configuration.

For developers currently using custom OAuth2 solutions with RestClient, migrating to this official support offers several advantages:

- Reduced boilerplate code
- Automatic token management
- Consistent security configuration
- Better integration with Spring Security's features

Ready to try it yourself? Start by upgrading to Spring Security 6.4 and following the implementation pattern shown above. Remember to check the official Spring documentation for the most up-to-date details and best practices.

Have you already implemented OAuth2 with RestClient? How does this new approach compare to your current solution? Share your thoughts and experiences in the comments below!