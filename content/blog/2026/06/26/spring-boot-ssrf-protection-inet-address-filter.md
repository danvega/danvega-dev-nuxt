---
title: "SSRF Protection in Spring Boot 4.1 with InetAddressFilter"
slug: spring-boot-ssrf-protection-inet-address-filter
description: "Learn how Spring Boot 4.1's new InetAddressFilter protects your applications against Server-Side Request Forgery (SSRF) attacks with a single bean definition."
author: Dan Vega
tags:
  - Spring Boot
  - Java
keywords:
  - spring boot ssrf protection
  - InetAddressFilter spring boot
  - server side request forgery java
  - spring boot 4.1 new features
  - http client ssrf mitigation
  - spring boot security
date: 2026-06-26T09:00:00.000Z
published: true
cover: spring-boot-ssrf-protection-inet-address-filter.jpeg
video: https://www.youtube.com/embed/PDbBG_GrcwU
---


If your application takes a URL from a user and fetches it on the server (think link previews, webhook validation, or image proxies), you might be exposing internal resources to the outside world without realizing it. This vulnerability is called Server-Side Request Forgery (SSRF), and Spring Boot 4.1 gives you a clean, one-bean solution to shut it down.

::GitHubRepo{url="https://github.com/danvega/spring-boot-ssrf-demo"}
Follow along with the complete working example.
::

## What is SSRF and Why Should You Care?

SSRF stands for Server-Side Request Forgery. It's a type of attack where a malicious user tricks your server into making HTTP requests to internal resources that should never be accessible from the outside.

Here's a scenario that comes up all the time. Your app has a feature where a user provides a URL, and the server fetches it. This is common in link unfurling, Open Graph previews, webhook validation, and image proxies. Totally reasonable feature.

The problem is that the server can reach things the user cannot. If there are no restrictions on what URLs the server will fetch, an attacker can point it at an internal-only address like `http://localhost:8080/internal-secrets` or `http://192.168.1.5/admin`. The server happily fetches it and hands the response right back to the attacker.

Before Spring Boot 4.1, you had to roll your own URL validation logic to prevent this. Now, a single `InetAddressFilter` bean can close that loophole.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with the following settings:

- **Language:** Java
- **Spring Boot:** 4.1
- **Group:** dev.danvega (or your own)
- **Artifact:** ssrf
- **Dependencies:** Spring Web, REST Client (HTTP Client)

The REST Client dependency gives us a convenient way to make HTTP requests from within the application. This works with reactive HTTP clients too, but we'll keep things simple with the blocking REST client.

Generate the project, download the zip, and open it in your favorite IDE.

## Building the Vulnerable Application

To see why SSRF protection matters, let's first build an app that's vulnerable to it. We need two things: an internal endpoint with sensitive data, and a public endpoint that fetches URLs on behalf of the user.

### The Internal Secrets Endpoint

First, create a controller that represents something sensitive on your server:

```java
@RestController
public class InternalSecretsController {

    @GetMapping("/internal-secrets")
    public Map<String, String> secrets() {
        return Map.of(
            "aws-access-key", "AKIAIOSFODNN7EXAMPLE",
            "db-password", "super-secret-password-123"
        );
    }
}
```

In a real application, this might be a configuration endpoint, an actuator endpoint, or any internal service running on the same network. Don't get caught up on this endpoint being public. The point is to demonstrate how an attacker can use your own server to reach things they shouldn't.

### The URL Preview Endpoint

Next, create a controller that takes a user-supplied URL, fetches it, and returns a preview:

```java
@RestController
public class URLPreviewController {

    private final RestClient restClient;

    public URLPreviewController(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public record URLPreview(String url, int status, String contentType, String bodyPreview) {}

    @GetMapping("/api/preview")
    public URLPreview preview(@RequestParam String url) {
        ResponseEntity<String> response = restClient.get()
                .uri(url)
                .retrieve()
                .toEntity(String.class);

        return new URLPreview(
                url,
                response.getStatusCode().value(),
                String.valueOf(response.getHeaders().getContentType()),
                response.getBody()
        );
    }
}
```

This endpoint accepts a `url` query parameter, uses the `RestClient` to fetch it, and returns a preview record with the status code, content type, and body.

### Seeing the Vulnerability in Action

Start the application and run the following curl command:

```bash
curl "http://localhost:8080/api/preview?url=http://localhost:8080/internal-secrets"
```

You'll get back something like this:

```json
{
  "url": "http://localhost:8080/internal-secrets",
  "status": 200,
  "contentType": "application/json",
  "bodyPreview": "{\"aws-access-key\":\"AKIAIOSFODNN7EXAMPLE\",\"db-password\":\"super-secret-password-123\"}"
}
```

The attacker can't access `http://localhost:8080/internal-secrets` directly from their machine. But by passing it through the `/api/preview` endpoint, they're using your server as a proxy to reach internal resources. Even if you had Spring Security protecting the internal endpoint, the server itself could still access it from within the network. That's the core of an SSRF attack.

## Fixing It with InetAddressFilter

Spring Boot 4.1 introduces the `InetAddressFilter` interface, and it's exactly what we need. When you declare a bean of this type, Spring Boot automatically applies it to any auto-configured HTTP client (including `RestClient` and `WebClient`).

Create a configuration class:

```java
@Configuration(proxyBeanMethods = false)
public class HttpClientConfig {

    @Bean
    public InetAddressFilter ssrfProtectionFilter() {
        return InetAddressFilter.externalAddresses();
    }
}
```

That's it. One bean definition.

### What Does externalAddresses() Do?

The `InetAddressFilter.externalAddresses()` method returns a filter that only allows requests to external, routable IP addresses. It blocks requests to:

- Loopback addresses (like `localhost` or `127.0.0.1`)
- Private network addresses (like `192.168.x.x`, `10.x.x.x`)
- Multicast addresses
- Special-purpose addresses

If you look at the `InetAddressFilter` interface itself, you'll find a rich set of utilities for building custom filters. You can match on `InetAddress` or `SocketAddress`, chain filters together with `and()`, `or()`, and `negate()`, and use built-in methods like `externalAddresses()` or `internalAddresses()` depending on your needs.

### Adding a Friendly Error Response

When the filter blocks a request, Spring throws a `FilteredHostException`. Without handling it, the user gets a generic 500 error. Let's make that more useful with a global exception handler:

```java
@RestControllerAdvice
public class SsrfExceptionHandler {

    @ExceptionHandler(FilteredHostException.class)
    public ProblemDetail handleFilteredHost(FilteredHostException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.FORBIDDEN,
                "Requests to %s are not allowed".formatted(ex.getHost())
        );
        problem.setTitle("🚫 Destination Blocked");
        return problem;
    }
}
```

This returns a proper `ProblemDetail` response (RFC 9457) with a 403 status code, making it clear to the caller that the destination was blocked.

## Testing the Fix

Restart the application and run the same curl command:

```bash
curl "http://localhost:8080/api/preview?url=http://localhost:8080/internal-secrets"
```

Now you'll see:

```json
{
  "type": "about:blank",
  "title": "🚫 Destination Blocked",
  "status": 403,
  "detail": "Requests to localhost are not allowed",
  "instance": "/api/preview"
}
```

The internal secrets are no longer accessible through the preview endpoint. The `InetAddressFilter` blocked the request to `localhost` before it ever left the HTTP client.

Meanwhile, legitimate external URLs still work fine:

```bash
curl "http://localhost:8080/api/preview?url=https://spring.io"
```

This will return the preview as expected because `spring.io` resolves to an external, routable IP address.

## What Makes This Approach Great

There are a few things I really appreciate about how the Spring team implemented this.

The filter is applied automatically. When you declare the `InetAddressFilter` bean, every auto-configured HTTP client picks it up. You don't have to modify the `RestClient` in your controller or pass the filter in manually. The `RestClient.Builder` that Spring wires in for you already knows about it.

If you create your own `RestClient` instance outside of Spring's auto-configuration (for example, by calling `RestClient.create()` directly), you'll need to apply the filter yourself. But for the typical case where you inject a `RestClient.Builder` and call `build()`, it just works.

The `InetAddressFilter` interface is also composable. You can combine filters with `and()`, `or()`, and `negate()` to build whatever policy makes sense for your application. Need to allow requests to one specific internal service while blocking everything else? You can express that.

## Resources

Here are some helpful links if you want to learn more:

- [Spring Boot 4.1 Blog Post](https://spring.io/blog/2026/06/10/spring-boot-4)
- [Spring Boot 4.1 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.1-Release-Notes)
- [Spring Release Highlights](https://spring.io/projects/release-highlights)

This is part of an ongoing series exploring what's new in Spring Boot 4.1. If there's a feature from the release notes you'd like me to cover, let me know.

Happy Coding!