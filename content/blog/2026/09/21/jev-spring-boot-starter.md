---
title: "Jev Spring Boot Starter: One Dependency, Done"
slug: jev-spring-boot-starter
description: "Use the Jev Spring Boot Starter to call TypeSafe's Jev API with one dependency and an injected JevClient, then see how Spring Boot 4 auto-configuration works."
author: "Dan Vega"
tags:
  - Spring Boot
  - Java
  - Jev
keywords:
  - jev spring boot starter
  - spring boot 4 custom starter
  - spring boot auto-configuration tutorial
  - AutoConfiguration.imports
  - "@ConditionalOnMissingBean spring boot"
  - jev java client
  - spring boot restclient
date: 2026-09-21T09:00:00.000Z
published: true
cover: jev-spring-boot-starter.png
video: https://www.youtube.com/embed/fq_nYo4BnrY
---


In the last post, we called Jev from Spring Boot by hand. We built a `RestClient`, a handful of records, and a properties class. It worked. But every new app that talks to Jev needs those same files again, and copying them from project to project gets old fast. So I packaged it all up into a **Jev Spring Boot starter**. You add one dependency, set one environment variable, inject a `JevClient`, and you're asking typed questions.

In this tutorial you'll install the starter, build a small support ticket triage app with it, and then open the starter up. By the end you'll know how every Spring Boot starter you use actually works.

::GitHubRepo{url="https://github.com/danvega/jev-spring-boot-starter"}
Follow along with the complete working example.
::

## A Quick Jev Recap

If you missed the first post, start with [Getting Started with Jev in Spring Boot 4](/blog/getting-started-with-jev-in-spring-boot-4-typesafe-ai). Here's the short version.

Jev, from TypeSafe, is not a large language model (LLM). You don't get back free-form text. You ask questions and get **typed answers**. There are three primitives:

- **noul**: a yes or no style answer
- **choice**: pick one label from a list you provide
- **score**: rate something against levels you define

There's no official Java SDK (software development kit) for Jev. You get an HTTP endpoint. That's why last time we wired up our own client. The hand-built version lives in [hello-jev-spring](https://github.com/danvega/hello-jev-spring) if you want to compare the before and after.

One thing I really like about Jev is the pricing model. You only pay for input tokens, not output tokens. For classification and routing work, that makes it fast and cheap. It doesn't replace an LLM. It's an "and," not an "or."

## What Is a Spring Boot Starter?

You're probably already using starters, even if you've never thought about them. Head over to [start.spring.io](https://start.spring.io), add the **Spring Web** dependency, and click **Explore**. In the generated `pom.xml` you'll see `spring-boot-starter-webmvc`.

A starter is a bundle of three things:

1. The dependencies a technology needs
2. Properties you can configure
3. Auto-configuration that creates beans for you

If you've ever built a Spring web app without Boot, you know how much wiring that saves. You don't have to plug a dozen pieces together yourself.

Starters aren't only for Spring projects either. Add Java Template Engine (JTE) on start.spring.io and you'll see `jte-spring-boot-starter-4`. That one comes from the community.

### Spring Boot Starter Naming Conventions

Notice the naming difference. Official Spring starters begin with `spring-boot-starter-`. Third-party starters put their own name first, like `jte-spring-boot-starter-4`. This is a convention from the Spring Boot docs, and it lets you tell the two apart at a glance.

That's why this one is named `jev-spring-boot-starter`. It's a community starter, not an official Spring project.

## Why Use the Jev Spring Boot Starter?

Less code is the obvious win. But a good starter also follows Boot's rules, and that's where it earns its place in your `pom.xml`.

- **It reuses Boot's `RestClient.Builder`.** The starter clones the builder Spring Boot already configured. Your message converters and timeouts carry over.
- **It backs off to your bean.** Define your own `JevClient` and the starter steps aside.
- **No HTTP calls at startup.** Your app boots even if the Jev API is slow or down.
- **It fails fast on a missing key.** You get a clear error instead of a mystery 401 later.
- **IDE completion for `jev.*` properties.** The configuration processor generates metadata, so your IDE knows what's available.
- **Virtual threads on JDK 21+.** Turn them on with one property and blocking HTTP calls become cheap.

To be clear, you don't have to use this starter. Other Jev starters showed up within the first 48 hours, and some of them cover more use cases. I wanted something small and simple. It also makes a great example for learning how starters work.

## How to Install the Jev Spring Boot Starter

The starter is version `0.1.0-SNAPSHOT`, and it's not on Maven Central. That means you can't add it from start.spring.io. You install it into your local Maven repository first.

Clone the repository and run the Maven wrapper:

```bash
git clone https://github.com/danvega/jev-spring-boot-starter.git
cd jev-spring-boot-starter
./mvnw clean install
```

When it finishes, you'll see Maven install the starter into `~/.m2/repository/dev/danvega/jev-spring-boot-starter`. Now any project on your machine can depend on it.

The tests run offline, so you don't need an API key for this step. CI runs against Spring Boot 4.0.0, 4.0.8, and 4.1.1 across Java 17, 21, and 25.

## Building a Triage App with the Jev Spring Boot Starter

Let's build something with it. We'll create an app that takes a messy support ticket and answers three questions. Is it urgent? Which team should handle it? How severe is it?

### Create the Project

Go to [start.spring.io](https://start.spring.io) and pick the latest Spring Boot version (I used 4.1.1). Set the group to `dev.danvega` and the artifact to `tickets`. Choose YAML for configuration and add **Spring Web** as the only dependency. Click **Generate** and open the project in your IDE.

### Add the Dependency

Open `pom.xml` and add the starter:

```xml
<dependency>
    <groupId>dev.danvega</groupId>
    <artifactId>jev-spring-boot-starter</artifactId>
    <version>0.1.0-SNAPSHOT</version>
</dependency>
```

Reload Maven. If this fails to resolve, you probably skipped the `./mvnw clean install` step. Go back and run it first.

### Set Your API Key

The starter reads your key from the `TYPESAFE_API_KEY` environment variable:

```bash
export TYPESAFE_API_KEY=your-key-here
```

That's the only required setting. There's no enable annotation and no configuration class.

### Optional Configuration

You don't need any properties. I like to add a few anyway in `application.yml`:

```yaml
spring:
  threads:
    virtual:
      enabled: true
  http:
    clients:
      connect-timeout: 5s
      read-timeout: 30s
```

The timeout settings aren't specific to this starter. They're standard Spring Boot properties for `RestClient`. Because the starter builds on Boot's `RestClient.Builder`, it picks them up for free.

If you need to override Jev settings, the starter exposes them under the `jev` prefix:

```yaml
jev:
  api-key: ${TYPESAFE_API_KEY}
  base-url: https://api.typesafe.ai
  model: jev-latest
  enabled: true
```

The values above are the defaults. The model defaults to `jev-latest`, and `enabled` defaults to `true`.

### Write the Triage Controller

Now for the fun part. First, a record to hold the incoming ticket:

```java
public record Ticket(String message) {
}
```

Next, a REST controller that injects `JevClient` through the constructor:

```java
@RestController
public class TriageController {

    private final JevClient jev;

    public TriageController(JevClient jev) {
        this.jev = jev;
    }

    @PostMapping("/triage")
    public JevResponse triage(@RequestBody Ticket ticket) {
        return jev.evaluate(ticket.message(), Map.of(
                "urgent", Question.noul("Does this customer need urgent help?"),
                "team", Question.choice("Which team should handle this ticket?",
                        "billing", "integrations", "support"),
                "severity", Question.score("How severe is this issue?",
                        "Cosmetic, no impact to functionality",
                        "Feature is degraded but a workaround exists",
                        "Blocking issue, no workaround exists")
        ));
    }
}
```

Let's walk through it. `JevClient` came from the starter. We never defined it, and Spring injects it anyway.

The `evaluate` method takes two things. The first is the state, which is the text Jev reasons about (our ticket message). The second is a map of named questions.

`Question` is a sealed interface with three records behind it, one for each Jev primitive. The static factories `noul`, `choice`, and `score` keep things readable. `choice` takes a varargs list of labels. `score` takes a varargs list of levels, ordered from least to most severe.

You won't always ask all three. If you only need to route tickets, a single `choice` question is enough. I'm showing all three here so you can see each type.

### Run It and Test the Endpoint

Start the app and send a ticket:

```bash
curl -X POST localhost:8080/triage \
  -H "Content-Type: application/json" \
  -d '{"message": "My Stripe integration has been failing for three days. I cannot accept payments!"}'
```

The `JevResponse` comes back with an answer for each question. For the Stripe ticket, `urgent` came back true. The `team` choice was `integrations` with a confidence of 1.0, along with the probability for each label. The `severity` score was 2.0, the top of our three levels. The response also includes `usage` with input and output token counts.

Try a couple of calmer tickets to see the answers change:

- "Could you send me a copy of last month's invoice when you have a chance?" routes to `billing` with a severity near zero.
- "Where can I change the color theme in my dashboard?" routes to `support` with a severity of 0.0.

### Reading Typed Answers

Returning the raw `JevResponse` is fine for a demo. In a real app you'll want to pull out specific values. The response has named accessors for each primitive:

```java
JevResponse response = jev.evaluate(ticket.message(), questions);

var urgent = response.noul("urgent").noul();
var team = response.choice("team").choice();
var confidence = response.choice("team").confidence();
var severity = response.score("severity").score();
```

The `examples/support-triage` project in the repo does exactly this. It maps the answers into its own `Triage` record with team, confidence, urgency, and severity. It also includes a test that uses a local HTTP stub, so it runs without an API key.

The client also validates that the answer names and types match the questions you asked. It makes one attempt with no retries. If you want retries, add them around your call.

## How the Jev Spring Boot Starter Works Under the Hood

So how did `JevClient` show up in our app without any configuration? Let's open the starter. The same pattern applies to every Spring Boot starter, including the official ones.

### The AutoConfiguration.imports File

Start in `src/main/resources/META-INF/spring/`. There's a file named `org.springframework.boot.autoconfigure.AutoConfiguration.imports`. It contains one line, the fully qualified name of `JevAutoConfiguration`.

This is how Spring Boot finds the starter. At startup, Boot reads every `AutoConfiguration.imports` file on the classpath. It treats each listed class as a candidate for auto-configuration. No component scanning, no annotation on your main class. If the jar is on the classpath, Boot sees it.

### JevAutoConfiguration and Conditions

Here's a simplified look at the auto-configuration class. Check the repo for the full version and imports.

```java
@AutoConfiguration(after = RestClientAutoConfiguration.class)
@ConditionalOnClass(RestClient.class)
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
@ConditionalOnProperty(prefix = "jev", name = "enabled", matchIfMissing = true)
@EnableConfigurationProperties(JevProperties.class)
public class JevAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    JevClient jevClient(RestClient.Builder builder, JevProperties properties) {
        // Fail fast with a clear message if no key is configured
        Assert.hasText(properties.getApiKey(), "Set TYPESAFE_API_KEY or jev.api-key");

        RestClient restClient = builder.clone()
                .baseUrl(properties.getBaseUrl())
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + properties.getApiKey())
                .build();

        return new JevClient(restClient, properties.getModel());
    }
}
```

Each annotation answers the question "should this configuration run?"

- `@AutoConfiguration(after = RestClientAutoConfiguration.class)` makes sure Boot's `RestClient.Builder` exists before we ask for it.
- `@ConditionalOnClass(RestClient.class)` only runs when `RestClient` is on the classpath. The starter brings in `spring-boot-starter-restclient`, so it will be.
- `@ConditionalOnWebApplication` limits it to servlet apps. This starter is built for Spring MVC, not every scenario.
- `@ConditionalOnProperty` lets you switch it off with `jev.enabled=false`. `matchIfMissing = true` means it's on by default.
- `@ConditionalOnMissingBean` is the back-off. If you define your own `JevClient` bean, yours wins and the starter does nothing.

Notice what the bean method doesn't do. It never calls the Jev API. It builds a client and returns it. That's why the app starts even when the network is down.

The `builder.clone()` call matters too. It copies Boot's configured builder, so your timeouts and converters come along. Cloning also means the starter's base URL and auth header don't leak into other `RestClient` instances in your app.

### JevProperties and IDE Completion

`JevProperties` is annotated with `@ConfigurationProperties("jev")`. It binds `jev.api-key`, `jev.base-url`, `jev.model`, and `jev.enabled` from your configuration. If `jev.api-key` isn't set, it falls back to `TYPESAFE_API_KEY`.

The starter also includes the Spring Boot configuration processor. At build time it generates metadata for these properties. That's why your IDE autocompletes `jev.` in `application.yml` and shows the defaults.

The Spring Boot reference docs have a great section on [creating your own auto-configuration](https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html) if you want to build a starter for your own team.

## Overriding the Starter's Defaults

A starter should get you going fast without locking you in. Here are the escape hatches:

- **Your own `JevClient` bean.** Define one and `@ConditionalOnMissingBean` backs off.
- **Timeouts.** Set `spring.http.clients.connect-timeout` and `spring.http.clients.read-timeout`.
- **Interceptors.** Register a `RestClientCustomizer` bean to add logging or custom headers.
- **Per-call model.** Build a `JevRequest` with a model string and pass it to `evaluate(JevRequest)`.

## One Dependency Instead of Six Files

We went from six hand-written files to one dependency. You installed the Jev Spring Boot starter locally and built a triage app that returns three typed answers. Then we opened the starter to see the imports file, the conditions, and the properties class that make it work.

That's the real value of Spring. It handles the infrastructure so you can focus on the business logic. I don't want to build a REST client every time I talk to Jev. Give me a `JevClient` and let me get to work.

Next time we'll use this starter for some bigger examples, like classification, model routing, and real-time use cases. If you want those in your inbox, sign up for the [newsletter](https://danvega.dev/newsletter). In the meantime, grab the [starter](https://github.com/danvega/jev-spring-boot-starter), compare it with [hello-jev-spring](https://github.com/danvega/hello-jev-spring), and try building a starter of your own.

Happy Coding