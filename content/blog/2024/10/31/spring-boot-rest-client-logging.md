---
title: "Implementing Request/Response Logging with Spring Boot's Rest Client"
description: Learn how to implement clean and efficient request/response logging for Spring Boot's Rest Client, including both inline and interceptor-based approaches.
slug: spring-boot-rest-client-logging
date: "2024-10-31T09:00:00.000Z"
published: true
author: Dan Vega
tags:
  - Spring Boot
  - Rest Client
video: https://www.youtube.com/embed/l35P5GylXN8
github: https://github.com/danvega/rc-logging
keywords: spring boot, rest client, http logging, request logging, response logging, spring framework, java, api logging, http interceptor
---

If you're working with Spring Boot's new Rest Client, you might find yourself needing to log HTTP requests and responses for debugging, monitoring, or audit purposes. Today, we'll explore how to implement clean and efficient logging for your Rest Client calls.

## Why Log Rest Client Calls?

When building applications that communicate with external services, having visibility into your HTTP interactions is crucial. Whether you're debugging integration issues, monitoring API performance, or maintaining an audit trail, proper request and response logging is essential.

Spring Boot's Rest Client, introduced in version 3.2, provides a modern and fluent API for making HTTP requests. While it's great at handling the communication, out-of-the-box logging can be verbose and not always suited to your needs.

## Two Approaches to Logging

Let's explore two different ways to implement logging with Spring Boot's Rest Client.

### 1. Inline Logging with RestClient.Builder

The simplest approach is to add logging directly when building your RestClient:

```java
@Service
public class PostClient {
    private static final Logger log = LoggerFactory.getLogger(PostClient.class);
    private final RestClient restClient;

    public PostClient(RestClient.Builder builder) {
        this.restClient = builder
            .baseUrl("https://api.example.com")
            .requestInterceptor((request, body, execution) -> {
                logRequest(request, body);
                var response = execution.execute(request, body);
                logResponse(request, response);
                return response;
            })
            .build();
    }

    private void logRequest(HttpRequest request, byte[] body) {
        log.info("Request: {} {}", request.getMethod(), request.getURI());
        logHeaders(request.getHeaders());
        if (body != null && body.length > 0) {
            log.info("Request body: {}", new String(body, StandardCharsets.UTF_8));
        }
    }

    private void logResponse(HttpRequest request, ClientHttpResponse response) throws IOException {
        log.info("Response status: {}", response.getStatusCode());
        logHeaders(response.getHeaders());
        byte[] responseBody = response.getBody().readAllBytes();
        if (responseBody.length > 0) {
            log.info("Response body: {}", new String(responseBody, StandardCharsets.UTF_8));
        }
    }
}
```

### 2. Dedicated Interceptor Class

For a more reusable solution, create a separate interceptor class:

```java
@Component
public class ClientLoggerRequestInterceptor implements ClientHttpRequestInterceptor {
    private static final Logger log = LoggerFactory.getLogger(ClientLoggerRequestInterceptor.class);

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, 
            ClientHttpRequestExecution execution) throws IOException {
        logRequest(request, body);
        var response = execution.execute(request, body);
        return logResponse(request, response);
    }

    private void logRequest(HttpRequest request, byte[] body) {
        log.info("Request: {} {}", request.getMethod(), request.getURI());
        logHeaders(request.getHeaders());
        if (body != null && body.length > 0) {
            log.info("Request body: {}", new String(body, StandardCharsets.UTF_8));
        }
    }

    private ClientHttpResponse logResponse(HttpRequest request, 
            ClientHttpResponse response) throws IOException {
        log.info("Response status: {}", response.getStatusCode());
        logHeaders(response.getHeaders());
        
        byte[] responseBody = response.getBody().readAllBytes();
        if (responseBody.length > 0) {
            log.info("Response body: {}", 
                new String(responseBody, StandardCharsets.UTF_8));
        }
        
        // Return wrapped response to allow reading the body again
        return new BufferingClientHttpResponseWrapper(response, responseBody);
    }
}
```

## Handling Response Bodies

One important consideration when logging responses is that the response body can only be read once. To handle this, we need to cache the response body and provide it back to the client. Here's a wrapper class to accomplish this:

```java
private static class BufferingClientHttpResponseWrapper implements ClientHttpResponse {
    private final ClientHttpResponse response;
    private final byte[] body;

    public BufferingClientHttpResponseWrapper(ClientHttpResponse response, 
            byte[] body) {
        this.response = response;
        this.body = body;
    }

    @Override
    public InputStream getBody() {
        return new ByteArrayInputStream(body);
    }

    // Delegate other methods to wrapped response
    @Override
    public HttpStatusCode getStatusCode() throws IOException {
        return response.getStatusCode();
    }

    @Override
    public HttpHeaders getHeaders() {
        return response.getHeaders();
    }
}
```

## Best Practices and Considerations

When implementing Rest Client logging, keep these points in mind:

1. **Security**: Be careful not to log sensitive information like authentication tokens or personal data.

2. **Performance**: Consider using appropriate log levels and conditional logging to minimize overhead.

3. **Configuration**: Make logging behavior configurable through application properties:

```properties
logging.level.your.client.package=DEBUG
client.logging.enabled=true
client.logging.include-headers=false
```

4. **Large Payloads**: Consider truncating large request/response bodies to prevent log bloat:

```java
private String truncateIfNeeded(String content, int maxLength) {
    if (content.length() <= maxLength) {
        return content;
    }
    return content.substring(0, maxLength) + "... (truncated)";
}
```

## Testing Your Logging Implementation

Here's a simple test to verify your logging implementation:

```java
@SpringBootTest
class ClientLoggerRequestInterceptorTest {

    @Autowired
    private ClientLoggerRequestInterceptor interceptor;

    @Test
    void shouldLogRequestAndResponse() throws IOException {
        // Create test request
        MockClientHttpRequest request = new MockClientHttpRequest();
        request.setMethod(HttpMethod.GET);
        request.setURI(URI.create("http://test.com/api"));

        // Execute with interceptor
        ClientHttpResponse response = interceptor.intercept(
            request, 
            "test body".getBytes(), 
            (req, body) -> new MockClientHttpResponse(
                "response".getBytes(), 
                HttpStatus.OK
            )
        );

        // Verify response can still be read
        String responseBody = new String(response.getBody().readAllBytes());
        assertThat(responseBody).isEqualTo("response");
    }
}
```

## Conclusion

Proper logging of HTTP interactions is essential for maintaining and troubleshooting applications. Spring Boot's Rest Client provides flexible options for implementing logging, whether through inline configuration or a dedicated interceptor.

Choose the approach that best fits your needs - inline logging for simplicity, or a dedicated interceptor for reusability across multiple clients. Remember to consider security, performance, and maintenance when implementing your logging solution.

Have you implemented logging for your Rest Client? What challenges did you face? Share your experiences in the comments below!

Happy coding! 🚀