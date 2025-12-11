---
title: "MockMvcTester vs RestTestClient: Which one Should You Use in Spring Boot 4?"
slug: mock-vs-rest
date: 2025-12-10T09:00:00.000Z
published: true
description: "A comparison of MockMvcTester and RestTestClient for testing Spring Boot web applications, exploring when to use each approach and their key differences."
author: Dan Vega
tags:
  - Spring Boot
cover: ./mock-vs-rest.png
video: https://www.youtube.com/embed/xWcqvrpj2PM
github: https://github.com/danvega/mock-vs-rest
keywords: MockMvcTester, RestTestClient, Spring Boot Testing, Spring MVC Test, Web Testing, Integration Testing, Spring Framework 7, Spring Boot 4
---

Spring Framework 7 gives you two modern options for testing your controllers: MockMvcTester and RestTestClient. 
Both work well, both support AssertJ, and both use mock infrastructure under the hood. So which one should you pick?

I asked the Spring team this exact question, and the answer might surprise you: it's largely a matter of preference. 
But there are some meaningful differences that could tip the scales for your project.

::GitHubRepo{url="https://github.com/danvega/mock-vs-rest"}
Follow along with the complete working example.
::

## The Quick Answer

Here's a decision table to help you choose:

| If you need... | Choose |
|----------------|--------|
| Server-side inspection (handlers, exceptions) | MockMvcTester |
| Multipart/file upload testing | MockMvcTester |
| One API for mock AND real HTTP tests | RestTestClient |
| Non-JSON deserialization (XML, Protobuf) | RestTestClient |
| Typed response bodies | RestTestClient |

Both support AssertJ-style assertions, so that's not a differentiator anymore.

## Setting Up Your Tests

Before looking at examples, let's see how to configure each approach. 
Both work with `@WebMvcTest`, which creates a slice of your Spring context containing only web-related beans.

### MockMvcTester Setup

MockMvcTester requires no extra annotations. Just autowire it:

```java
@WebMvcTest(BookController.class)
class BookControllerMockMvcTesterTest {

    @Autowired
    MockMvcTester mockMvcTester;

    @MockitoBean
    BookRepository bookRepository;
}
```

### RestTestClient Setup

RestTestClient needs the `@AutoConfigureRestTestClient` annotation:

```java
@WebMvcTest(BookController.class)
@AutoConfigureRestTestClient
class BookControllerRestTestClientTest {

    @Autowired
    RestTestClient client;

    @MockitoBean
    BookRepository bookRepository;
}
```

The `@AutoConfigureRestTestClient` annotation tells Spring Boot to create and configure a RestTestClient that's bound to your 
MockMvc instance. Without it, you'd need to create the client manually.

## MockMvcTester in Action

MockMvcTester wraps your requests in AssertJ's `assertThat()` method, making the assertions feel natural if you're already using AssertJ in your project.

### Basic GET Request

```java
@Test
@DisplayName("GET /api/books - should return all books")
void shouldReturnAllBooks() {
    var books = List.of(
            new Book(1L, "Fundamentals of Software Engineering", List.of("Nathaniel Schutta", "Dan Vega"), "978-1098143237", 2025),
            new Book(2L, "Effective Java", "Joshua Bloch", "978-0134685991", 2018)
    );
    when(bookRepository.findAll()).thenReturn(books);

    assertThat(mockMvcTester.get().uri("/api/books"))
            .hasStatusOk()
            .hasContentTypeCompatibleWith(MediaType.APPLICATION_JSON)
            .bodyJson()
            .extractingPath("$")
            .asArray()
            .hasSize(2);
}
```

The flow reads naturally: make a GET request, assert the status is OK, check the content type, then extract, and verify the JSON body.

### POST with JSON Body

```java
@Test
@DisplayName("POST /api/books - should create a new book")
void shouldCreateBook() {
    var newBook = new Book(1L, "Domain-Driven Design", "Eric Evans", "978-0321125217", 2003);
    when(bookRepository.save(any(Book.class))).thenReturn(newBook);

    String requestBody = """
            {
                "title": "Domain-Driven Design",
                "authors": ["Eric Evans"],
                "isbn": "978-0321125217",
                "publishedYear": 2003
            }
            """;

    assertThat(mockMvcTester.post()
            .uri("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody))
            .hasStatus(HttpStatus.CREATED)
            .bodyJson()
            .extractingPath("$.title")
            .isEqualTo("Domain-Driven Design");
}
```

### MockMvcTester's Unique Strength: Server-Side Inspection

One thing MockMvcTester can do that the `RestTestClient` cannot is inspect server-side details like which handler method was invoked:

```java
@Test
@DisplayName("MockMvcTester can verify which handler method was invoked")
void canVerifyHandlerMethod() {
    when(bookRepository.findAll()).thenReturn(List.of());

    var result = mockMvcTester.get().uri("/api/books");

    assertThat(result)
            .hasStatusOk()
            .apply(mvcResult -> assertThat((org.springframework.web.method.HandlerMethod) mvcResult.getHandler())
                    .isNotNull()
                    .satisfies(handler -> {
                        assertThat(handler.getMethod().getName()).isEqualTo("findAll");
                        assertThat(handler.getBeanType()).isEqualTo(BookController.class);
                    }));
}
```

This can be useful when you want to verify that request mapping is working correctly, not just that the response looks right.

## RestTestClient in Action

RestTestClient uses a fluent API similar to WebTestClient. If you've tested WebFlux applications before, this will feel familiar.

### Basic GET Request

```java
@Test
@DisplayName("GET /api/books - should return all books")
void shouldReturnAllBooks() {
    var books = List.of(
            new Book(1L, "Fundamentals of Software Engineering", List.of("Nathaniel Schutta", "Dan Vega"), "978-1098143237", 2025),
            new Book(2L, "Effective Java", "Joshua Bloch", "978-0134685991", 2018)
    );
    when(bookRepository.findAll()).thenReturn(books);

    client.get().uri("/api/books")
            .exchange()
            .expectStatus().isOk()
            .expectHeader().contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$").isArray()
            .jsonPath("$.length()").isEqualTo(2);
}
```

Notice the `exchange()` method, which sends the request and returns a response spec that you chain assertions onto.

### POST with JSON Body

```java
@Test
@DisplayName("POST /api/books - should create a new book")
void shouldCreateBook() {
    var newBook = new Book(1L, "Domain-Driven Design", "Eric Evans", "978-0321125217", 2003);
    when(bookRepository.save(any(Book.class))).thenReturn(newBook);

    client.post().uri("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .body("""
                    {
                        "title": "Domain-Driven Design",
                        "authors": ["Eric Evans"],
                        "isbn": "978-0321125217",
                        "publishedYear": 2003
                    }
                    """)
            .exchange()
            .expectStatus().isCreated()
            .expectBody()
            .jsonPath("$.title").isEqualTo("Domain-Driven Design");
}
```

### RestTestClient's Unique Strength: Typed Deserialization

RestTestClient shines when you want to deserialize responses directly into Java objects:

```java
@Test
@DisplayName("RestTestClient can deserialize response to typed object")
void canDeserializeToTypedObject() {
    var book = new Book(1L, "Fundamentals of Software Engineering", List.of("Nathaniel Schutta", "Dan Vega"), "978-1098143237", 2025);
    when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

    client.get().uri("/api/books/1")
            .exchange()
            .expectStatus().isOk()
            .expectBody(Book.class)
            .value(b -> {
                assert b.title().equals("Fundamentals of Software Engineering");
                assert b.authors().contains("Dan Vega");
            });
}
```

You can also deserialize to typed lists using `ParameterizedTypeReference`:

```java
@Test
@DisplayName("RestTestClient can deserialize response to typed list")
void canDeserializeToTypedList() {
    var books = List.of(
            new Book(1L, "Fundamentals of Software Engineering", List.of("Nathaniel Schutta", "Dan Vega"), "978-1098143237", 2025),
            new Book(2L, "Effective Java", "Joshua Bloch", "978-0134685991", 2018)
    );
    when(bookRepository.findAll()).thenReturn(books);

    client.get().uri("/api/books")
            .exchange()
            .expectStatus().isOk()
            .expectBody(new ParameterizedTypeReference<List<Book>>() {})
            .value(b -> {
                assert b.get(0).title().equals("Fundamentals of Software Engineering");
                assert b.get(1).authors().contains("Joshua Bloch");
            });
}
```

### RestTestClient Also Supports AssertJ

If you prefer AssertJ-style assertions with RestTestClient, you can use `RestTestClientResponse`:

```java
@Test
@DisplayName("RestTestClient supports AssertJ-style assertions via RestTestClientResponse")
void canUseAssertJStyleAssertions() {
    var book = new Book(1L, "Fundamentals of Software Engineering", List.of("Nathaniel Schutta", "Dan Vega"), "978-1098143237", 2025);
    when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

    var spec = client.get().uri("/api/books/1").exchange();
    var response = RestTestClientResponse.from(spec);

    assertThat(response)
            .hasStatusOk()
            .bodyJson()
            .extractingPath("$.title")
            .isEqualTo("Fundamentals of Software Engineering");
}
```

This gives you the same assertion style as MockMvcTester while keeping RestTestClient's other benefits.

## The Binding Flexibility Advantage

One feature that sets RestTestClient apart is its binding flexibility. The same API works across different test configurations:

| Binding | Use Case | Spring Context? |
|---------|----------|-----------------|
| `bindToController(new BookController())` | Pure unit test | No |
| `bindTo(mockMvc)` | Slice test with validation | Partial |
| `bindToApplicationContext(ctx)` | Full integration test | Full |
| `bindToServer()` | Real HTTP (CORS, compression) | Full + Server |

When you use `@AutoConfigureRestTestClient`:
- In `@WebMvcTest`, it automatically binds to MockMvc
- In `@SpringBootTest`, it auto-switches based on your web environment configuration

This means you can write tests that work the same way whether you're using mock infrastructure or hitting a real running server.

## Current Limitations

Neither approach is perfect. Here's what to watch out for:

**RestTestClient** doesn't support multipart requests yet. If you need to test file uploads, use MockMvcTester. There's an open issue (Spring Framework #35569) tracking this.

**MockMvcTester** is focused on JSON. If you're working with XML, Protobuf, or other content types, RestTestClient's broader `HttpMessageConverter` support will serve you better.

## Which Should You Choose?

After working with both, here's my take:

**Start with MockMvcTester if:**
- Your team already uses AssertJ extensively
- You're testing JSON APIs (most Spring Boot apps)
- You need file upload testing
- You want the most direct AssertJ integration

**Start with RestTestClient if:**
- You want consistency with WebTestClient
- You're building tests that might later need real HTTP
- You work with multiple content types
- You prefer typed response deserialization

The good news? Both are solid choices. The APIs are different, but neither is objectively better. Pick the one that feels more natural to you and your team.

## Running the Examples

If you want to try these examples yourself, the complete working code is available on GitHub. Clone the repository and run:

```bash
# Run all tests
./mvnw test

# Run MockMvcTester tests only
./mvnw test -Dtest=BookControllerMockMvcTesterTest

# Run RestTestClient tests only
./mvnw test -Dtest=BookControllerRestTestClientTest
```

Happy Coding!