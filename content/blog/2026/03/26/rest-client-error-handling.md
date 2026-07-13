---
title: "Getting Started with Error Handling in the RestClient"
slug: rest-client-error-handling
description: "Learn best practices for error handling with Spring's RestClient, including global exception handlers, custom exceptions, Problem Detail responses, and built-in retry with resilience methods in Spring Framework 7."
author: "Dan Vega"
tags:
  - Spring Boot
  - Spring Framework
  - REST Client
  - Java
keywords:
  - spring boot rest client error handling
  - rest client exception handling
  - spring restclient error handling
  - spring boot problem detail
  - rest client retry
  - spring framework 7 resilience
  - restclient default status handler
  - spring boot global exception handler
date: 2026-03-26T09:00:00.000Z
published: true
cover: rest-client-error-handling.jpeg
video: https://www.youtube.com/embed/MuYzEZk6-zI
---


When your application calls an external API, things will go wrong. The service might be down, the resource might not exist, or the server might just be having a bad day. How you handle those failures in your RestClient calls makes the difference between an app that crashes with cryptic 500 errors and one that responds gracefully with meaningful information. Let's walk through some best practices for error handling with Spring's RestClient, from the default behavior all the way through retry logic with Spring Framework 7's new resilience methods.

::GitHubRepo{url="https://github.com/danvega/rest-client-error-handling"}
Follow along with the complete working example.
::

## Use the Default RestClient Builder

This is tip number one, and it's worth putting front and center. When you create a `RestClient` instance, you want to use the `RestClient.Builder` that Spring Boot auto-configures for you rather than creating one from scratch with `RestClient.create()`.

Why does this matter? The default `RestClient.Builder` comes pre-configured with important things like observability. When you include Spring Boot Actuator or the new Spring Boot OpenTelemetry starter in Spring Boot 4, you get all of that baked-in observability for free. If you hand-roll your own instance, you lose all of it.

In a controller, that looks like this:

```java
@RestController
public class HttpBinController {

    private final RestClient client;

    public HttpBinController(RestClient.Builder builder) {
        this.client = builder
                .baseUrl("https://httpbin.org")
                .build();
    }
}
```

Notice we're accepting the `RestClient.Builder` through constructor injection and then customizing it with our base URL. Spring Boot provides this builder automatically, so there's no additional configuration needed to get started.

For this tutorial, we're using [httpbin.org](https://httpbin.org), a simple HTTP request and response service that lets you test different status codes by calling endpoints like `/status/404`. It's perfect for testing error handling without having to stand up your own API.

## Understanding the Default Error Behavior

Before we customize anything, it helps to understand what happens out of the box. The RestClient's default behavior is to throw an exception on any 4xx or 5xx response *before your code even runs*. So if you call an endpoint that returns a 404, your application will throw an exception and return a 500 Internal Server Error to the caller.

Here's a simple controller with two endpoints to demonstrate:

```java
@GetMapping("/get")
public String get() {
    return client.get()
            .uri("/get")
            .retrieve()
            .body(String.class);
}

@GetMapping("/get/status/{code}")
public String getStatus(@PathVariable int code) {
    return client.get()
            .uri("/status/{code}", code)
            .retrieve()
            .body(String.class);
}
```

Calling `/get` works fine and returns a JSON response. But calling `/get/status/404` returns a 500 error to the caller because the RestClient throws an exception when it receives that 404 from httpbin.

You *can* suppress this on a per-request basis using `onStatus`:

```java
return client.get()
        .uri("/status/{code}", code)
        .retrieve()
        .onStatus(HttpStatusCode::isError, (request, response) -> {
            // suppress the default exception
        })
        .body(String.class);
```

This works, but the moment you write a second method that also calls external APIs, you're duplicating that error handling logic everywhere. That's where centralized configuration comes in.

## Centralize Your RestClient Configuration

Instead of building the RestClient inside your controller, move it into a `@Configuration` class. This way, every class that needs to talk to the same API can share the same RestClient instance with consistent error handling.

First, define the base URL in your `application.yml`:

```yaml
httpbin:
  base-url: https://httpbin.org
```

Then create the configuration class:

```java
@Configuration
public class RestClientConfig {

    @Value("${httpbin.base-url}")
    private String baseUrl;

    @Bean
    public RestClient httpBinClient(RestClient.Builder builder) {
        return builder
                .baseUrl(baseUrl)
                .defaultStatusHandler(HttpStatusCode::isError, (request, response) -> {
                    if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
                        throw new NotFoundException("Resource not found: " + request.getURI());
                    }
                    throw new ApiException(
                            "Error calling " + request.getURI() + ": " + response.getStatusText(),
                            response.getStatusCode()
                    );
                })
                .build();
    }
}
```

The `defaultStatusHandler` method lets you define error handling once at the RestClient level. Every request made through this client will go through this handler. In this example, we're throwing specific custom exceptions based on the status code: a `NotFoundException` for 404 responses and a general `ApiException` for everything else.

Your controller becomes much simpler now, accepting the `RestClient` directly:

```java
@RestController
public class HttpBinController {

    private final RestClient client;

    public HttpBinController(RestClient client) {
        this.client = client;
    }

    // ... endpoint methods
}
```

Since we defined the `RestClient` as a bean in our configuration, Spring will auto-wire it through constructor injection. If you're new to Spring, this is equivalent to annotating the constructor with `@Autowired`, but with a single constructor it's implicit.

## Define Custom Exceptions

The custom exceptions we're throwing in the status handler are straightforward. Start with a base `ApiException`:

```java
public class ApiException extends RuntimeException {

    private final HttpStatusCode statusCode;

    public ApiException(String message, HttpStatusCode statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public HttpStatusCode getStatusCode() {
        return statusCode;
    }
}
```

Then create a more specific `NotFoundException` that extends it:

```java
public class NotFoundException extends ApiException {

    public NotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
```

You can follow this pattern to create as many specific exception types as you need. Some teams create separate exceptions for 4xx client errors versus 5xx server errors. Others get more granular with `UnauthorizedException`, `ForbiddenException`, and so on. Choose the level of granularity that makes sense for your application.

## Return Structured Errors with Problem Detail

Now that we're throwing custom exceptions, we need to catch them and return something useful to the caller. This is where a global exception handler and Problem Detail come together.

`ProblemDetail` is a representation of [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457), which defines a standard format for HTTP API error responses. It was introduced in Spring Boot 3 and gives you a structured way to communicate errors that includes fields like `type`, `title`, `status`, `detail`, and `instance`. You can also add your own custom properties.

Create a global exception handler:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpStatusCodeException.class)
    public ProblemDetail handle(HttpStatusCodeException ex) {
        return ProblemDetail.forStatusAndDetail(
                ex.getStatusCode(),
                ex.getMessage()
        );
    }
}
```

The `@RestControllerAdvice` annotation combines `@ControllerAdvice` with `@ResponseBody`, meaning the return value of your exception handler methods gets serialized directly into the response body. The `@ExceptionHandler` annotation tells Spring to route any `HttpStatusCodeException` to this method.

Now when you call `/get/status/404`, instead of a generic 500 error, you get a well-structured JSON response:

```json
{
    "type": "about:blank",
    "title": "Not Found",
    "status": 404,
    "detail": "Resource not found: https://httpbin.org/status/404",
    "instance": "/get/status/404"
}
```

This is much more helpful for anyone consuming your API. They get the actual status code, a meaningful description, and context about what went wrong.

## Add Retry Logic with Resilience Methods

Sometimes the right response to an error isn't to fail immediately. If an external service is temporarily unavailable, retrying the request after a short delay might succeed. Spring Framework 7 and Spring Boot 4 bring resilience methods from the Spring Retry project directly into the framework, making this easy to set up.

First, enable resilience methods in your `application.properties` or `application.yml`:

```yaml
spring:
  retry:
    enabled: true
```

Then annotate your method with `@Retryable`:

```java
private static final Logger log = LoggerFactory.getLogger(HttpBinController.class);

@Retryable(include = ApiException.class, maxAttempts = 3, delay = 1000, multiplier = 2)
@GetMapping("/get/unstable")
public String getUnstable() {
    log.info("Attempting to get unstable resource");
    return client.get()
            .uri("/unstable")
            .retrieve()
            .body(String.class);
}
```

Let's break down the `@Retryable` configuration:

- **`include = ApiException.class`** tells Spring to only retry when an `ApiException` (or subclass) is thrown. You don't want to retry every exception. A 401 Unauthorized isn't going to succeed on the second try.
- **`maxAttempts = 3`** sets the maximum number of attempts.
- **`delay = 1000`** sets the initial delay to 1 second.
- **`multiplier = 2`** creates an exponential backoff. The first retry waits 1 second, the second waits 2 seconds, and the third waits 4 seconds.

Exponential backoff is important because you don't want to hammer a struggling service with rapid retries. Spacing them out gives the service time to recover.

When you call `/get/unstable`, you can see in the console logs that Spring retries the request multiple times before finally giving up:

```
Attempting to get unstable resource
Attempting to get unstable resource
Attempting to get unstable resource
```

## Putting It All Together

Here's a summary of the practices we covered:

1. **Use the default RestClient.Builder** that Spring Boot provides. You get observability and other pre-configured features for free.
2. **Centralize your RestClient configuration** in a `@Configuration` class with `defaultStatusHandler` so error handling is consistent across all requests.
3. **Create custom exceptions** that carry meaningful status codes and messages.
4. **Use a global exception handler** with `@RestControllerAdvice` to catch exceptions and return `ProblemDetail` responses.
5. **Add retry logic** with `@Retryable` for transient failures, using exponential backoff to be a good citizen to the services you depend on.

This isn't an exhaustive list of everything you can do. The [Spring Framework 7 documentation](https://docs.spring.io/spring-framework/reference/) has more information on error handling with the RestClient that goes beyond what we covered here. But these practices give you a solid foundation for building resilient API clients.

What are your go-to strategies for error handling with the RestClient? I'd love to hear what patterns have worked well for you. Happy Coding!