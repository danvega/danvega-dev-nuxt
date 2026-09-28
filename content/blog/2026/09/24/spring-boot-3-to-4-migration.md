---
title: "Spring Boot 3 to 4 Migration: Fixing Every Break"
slug: spring-boot-3-to-4-migration
description: "A hands-on Spring Boot 3 to 4 migration: upgrade a real app, then fix Jackson 3, modular starters, the missing H2 console, test imports, and JSpecify."
author: "Dan Vega"
tags:
  - Spring Boot
  - Java
  - Jackson
keywords:
  - spring boot 3 to 4 migration
  - spring boot 4 modularization
  - jackson 3 spring boot 4
  - spring boot 4 h2 console
  - "@MockitoBean spring boot 4"
  - jspecify null safety spring boot
  - spring boot 4 migration guide
  - spring application advisor
date: 2026-09-24T09:00:00.000Z
published: true
cover: spring-boot-3-to-4-migration.png
video: https://www.youtube.com/embed/HiPkoGTeNJc
---


Open source support for Spring Boot 3.5 ended on June 30, 2026. If your app still runs on Spring Boot 3, a Spring Boot 3 to 4 migration is on your roadmap whether you planned it or not. Unpatched apps are an easy target, and AI tools have gotten very good at finding vulnerabilities.

Most guides give you a list of changes. That's useful, but it doesn't show you what the upgrade feels like. So in this post we'll take a small, working Spring Boot 3.5 app, bump it to Spring Boot 4.1, and fix each thing that breaks. Along the way I'll explain *why* each break happens. Some breaks come from the compiler. Some come from tests. And a couple give you no warning at all, and those are the ones that bite you in production.

::GitHubRepo{url="https://github.com/danvega/spring-boot-3-4-migration"}
Follow along with the complete working example.
::

The `main` branch holds the Spring Boot 3.x version of the app. There's also a `4.0` branch with the finished migration if you want to compare. If you're following along, create your own branch off `main` before you start changing things.

## The Spring Boot 3 App We're Upgrading

The demo is a small conference talks API. It's simple on purpose. Each piece exercises one of the areas that changed in Spring Boot 4:

- A `Talk` record with an id, title, speaker, start time, room, and seat count
- A `TalkController` with REST endpoints to list, fetch, and create talks
- A `TalkRepository` built on Spring Data JDBC
- A `TalkRequest` record for incoming create requests
- A `DataLoader` that seeds the database
- A `JacksonConfig` class and a `ScheduleExporter`, both using Jackson 2
- A `package-info.java` that uses Spring's `@NonNullApi` annotation

The database is H2, and Flyway handles schema migrations. Here are the relevant dependencies from the starting **pom.xml**:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.5.16</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jdbc</artifactId>
    </dependency>
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

The project also has an **.sdkmanrc** file. [SDKMAN](https://sdkman.io/) reads it to switch Java versions per project. We start on Java 17.

Before touching anything, confirm the app works:

```bash
./mvnw clean verify
```

Everything passes. When you start the app, keep an eye on two lines in the console output. One says Flyway migrated schema `PUBLIC` to version 1. That's the migration in **src/main/resources/db/migration** creating the `talk` table. The other says the H2 console is available at `/h2-console`. Both of those lines matter later.

### Checking Where Your Version Stands

If you ever want to know whether your version still gets updates, go to [spring.io](https://spring.io/projects/spring-boot#support), open the Spring Boot project, and click the **Support** tab. Spring Boot 3.5 is no longer green for open source support. Spring Boot 4.0 open source support runs through December 31, 2026. Commercial support extends those dates if you need more time.

## Why Spring Boot 3 Worked Without Starters: One Big Auto-Configuration Jar

Here's the concept that explains half the breaks in this post. Look at the pom again. We don't use a Flyway starter. We only have the raw `flyway-core` dependency. Same for H2. And yet Flyway runs and the H2 console shows up. How?

In Spring Boot 3 and earlier, every app included one large `spring-boot-autoconfigure` jar. That jar had auto-configuration for pretty much everything Spring Boot supports, whether you used it or not. The configuration sat there waiting for a class to show up on the classpath. Add `flyway-core`, and Flyway auto-configuration kicks in.

That was fine early on. But as Spring Boot grew, that jar grew with it. **Spring Boot 4 modularization** splits auto-configuration into smaller modules, each tied to its own starter. Your app only carries the configuration it needs. The trade-off is that a raw library on the classpath no longer triggers configuration by itself. Keep that in mind. It's coming back twice.

## Bumping to Spring Boot 4.1 and Java 25

One piece of advice before bumping anything. We're starting from 3.5.16, which is close to the latest 3.x release. If you're on 3.0 or 3.1, don't jump straight to 4. Upgrade incrementally to 3.5 first, fix what breaks, then move to 4. It's the safest path.

Change the parent version in **pom.xml**:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
</parent>
```

Spring Boot 4 still supports Java 17, but I'm moving to Java 25 while I'm here. Update **.sdkmanrc**:

```properties
java=25-oracle
```

Then apply it and confirm:

```bash
sdk env
java -version
```

If you use IntelliJ, reload the project so it picks up the new JDK. Now run the build again:

```bash
./mvnw clean verify
```

And the errors start.

## Break 1: Jackson 3 Moves to the tools.jackson Package

The first errors look like this:

```
package com.fasterxml.jackson.databind does not exist
```

Spring Boot 4 ships with Jackson 3, and Jackson 3 lives in a new package: `tools.jackson`. This is a loud break. The compiler tells you exactly which files to fix. That makes it one of the easier ones.

### Replacing the Jackson 2 Customizer

The `JacksonConfig` class customized the mapper that Spring Boot builds for us. In Spring Boot 3 that looked something like this (the enabled feature here is an example, so yours will vary):

```java
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;

@Configuration
public class JacksonConfig {

    @Bean
    Jackson2ObjectMapperBuilderCustomizer jacksonCustomizer() {
        return builder -> builder.featuresToEnable(SerializationFeature.INDENT_OUTPUT);
    }
}
```

Both the package and the customizer type are gone. In Spring Boot 4, you use a `JsonMapperBuilderCustomizer`. Same idea, new type:

```java
import tools.jackson.databind.SerializationFeature;
import org.springframework.boot.jackson.autoconfigure.JsonMapperBuilderCustomizer;

@Configuration
public class JacksonConfig {

    @Bean
    JsonMapperBuilderCustomizer jsonCustomizer() {
        return builder -> builder.enable(SerializationFeature.INDENT_OUTPUT);
    }
}
```

### From ObjectMapper to the Immutable JsonMapper

The `ScheduleExporter` builds its own mapper by hand. Here's a simplified version of the Spring Boot 3 code:

```java
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Component
public class ScheduleExporter {

    private final ObjectMapper mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    public String export(List<Talk> talks) {
        try {
            return mapper.writeValueAsString(talks);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException(e);
        }
    }
}
```

Three things change in Jackson 3.

First, `ObjectMapper` gives way to `JsonMapper`, which is immutable. You configure it with a builder, and once it's built, it can't change. That makes it safe to share across threads.

Second, `JavaTimeModule` is gone. Jackson 3 supports `java.time` types out of the box, so there's nothing to register.

Third, Jackson 3 exceptions are unchecked. That means the try/catch can go. This is a nice change because it lets you call Jackson methods inside lambdas and streams without wrapping everything.

```java
import tools.jackson.databind.json.JsonMapper;

@Component
public class ScheduleExporter {

    private final JsonMapper mapper = JsonMapper.builder().build();

    public String export(List<Talk> talks) {
        return mapper.writeValueAsString(talks);
    }
}
```

You could also inject the `JsonMapper` that Spring Boot creates for you through constructor injection. That works well. I'm building it by hand here on purpose, because it sets up a problem we'll hit in a minute.

## Break 2: Renamed Starters and Broken Test Imports

Run `./mvnw clean verify` again. The main code compiles now, but the tests don't. The `TalkControllerTest` has missing imports, and `@MockBean` doesn't resolve.

This is modularization again. Spring Boot 4 splits the old catch-all starters into focused ones. `spring-boot-starter-web` becomes `spring-boot-starter-webmvc` (with `spring-boot-starter-webflux` as the reactive option). The test support follows the same pattern:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webmvc-test</artifactId>
    <scope>test</scope>
</dependency>
```

Reload Maven after changing these. The test annotations have also moved into the new web MVC test module, so the imports change.

### Replacing @MockBean with @MockitoBean

`@MockBean` was deprecated in Spring Boot 3.4 and removed in Spring Boot 4. Its replacement is `@MockitoBean`, which lives in Spring Framework itself. Here's the updated test setup:

```java
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@WebMvcTest(TalkController.class)
class TalkControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    TalkRepository repository;

    // tests...
}
```

If you have tests that use `@AutoConfigureMockMvc`, update that import too. It now comes from `org.springframework.boot.webmvc.test.autoconfigure`.

## Break 3: Flyway Stops Running Without an Error

Run the build again. We get further, but now the failures are confusing. The console shows messages like "Skipped repeated attempt for load context," which doesn't tell you much.

When the console output isn't helpful, check **target/surefire-reports**. The report for the failing test has the real cause:

```
Table "TALK" not found
```

The database is empty. Flyway didn't fail. It never ran.

Remember the big auto-configuration jar? In Spring Boot 3, having `flyway-core` on the classpath was enough. In Spring Boot 4, Flyway auto-configuration lives in its own module, and you get it through the Flyway starter. If you open [start.spring.io](https://start.spring.io), add Flyway, and click **Explore**, you'll see the starter it generates:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-flyway</artifactId>
</dependency>
```

Replace `flyway-core` with this, reload Maven, and Flyway runs again.

### The Classic Auto-Configuration Escape Hatch

If you have a large app and need to move fast, Spring Boot 4 offers a fallback. Adding `spring-boot-autoconfigure-classic` brings back the old all-in-one auto-configuration behavior. It's there to help you get over the hump. The goal is to move off it, though. A lighter app with explicit starters is the whole point of modularization.

## Break 4: Jackson 3 Writes Dates Differently

Next run, a new failure:

```
TalksApplicationTests > export writes dates as arrays
No value at JSON path "$[0].startsAt[0]"
```

Nothing failed to compile. The code is fine. What changed is the output.

Jackson 2 writes dates as timestamps by default, so a `LocalDateTime` came out as an array like `[2026,9,17,10,0]`. Jackson 3 writes ISO-8601 strings by default, like `"2026-09-17T10:00:00"`. That's a better default. It's also a silent change to your JSON.

Here's the interesting part. Spring Boot 3 already turned on ISO dates for the mapper it builds for you. So our REST API output doesn't change at all. The only mapper affected is the one we built by hand in `ScheduleExporter`. This is exactly why you should look for every place you create a mapper yourself.

You have two options. You can accept the new default and update your tests and consumers. That's fine if you own all the JSON and only have a few tests. Or you can keep the existing contract. The export format might be read by another system, so I'll keep it:

```java
import tools.jackson.databind.cfg.DateTimeFeature;
import tools.jackson.databind.json.JsonMapper;

private final JsonMapper mapper = JsonMapper.builder()
        .enable(DateTimeFeature.WRITE_DATES_AS_TIMESTAMPS)
        .build();
```

In Jackson 3, date-related settings live in the `DateTimeFeature` enum. Enabling `WRITE_DATES_AS_TIMESTAMPS` restores the Jackson 2 behavior. Run the build and everything is green.

## Break 5: Where Did the Spring Boot 4 H2 Console Go?

Green build. Tests pass. Start the app and hit a few endpoints, and talks come back fine. Now open `http://localhost:8080/h2-console` in the browser.

It's gone. And the startup log no longer mentions it either.

This is the break I find most surprising, because nothing tells you about it. The build is green and the app runs. The cause is the same modularization story. The `h2` dependency gives you the H2 database. It doesn't bring the auto-configuration that registers the console. In Spring Boot 4, that's a separate module. If you add H2 on start.spring.io, you'll see it generates this dependency:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-h2console</artifactId>
</dependency>
```

Add it, reload, restart, and the log shows "H2 console available at '/h2-console'" again. The classic auto-configuration escape hatch would also fix this, but explicit dependencies are the better long-term path.

## Break 6: Null Safety with JSpecify

The last two issues don't break the build at all. Run a compile and read the output carefully:

```bash
./mvnw clean compile
```

You'll see a warning:

```
Some input files use or override a deprecated API.
```

The source is **package-info.java**, which uses `@NonNullApi` from `org.springframework.lang`. Those Spring annotations are built on JSR-305 (Java Specification Request 305) meta-annotations. They're now deprecated in favor of [JSpecify](https://jspecify.dev/), a standard set of nullness annotations that the wider Java community is adopting. Spring Framework 7 and Spring Boot 4 use JSpecify throughout.

Replace `@NonNullApi` with `@NullMarked`:

```java
@NullMarked
package dev.danvega.talks;

import org.jspecify.annotations.NullMarked;
```

`@NullMarked` says everything in this package is non-null unless marked otherwise. Then swap each Spring `@Nullable` for the JSpecify version. In this app, that's in the controller, the repository, and `TalkRequest`:

```java
import org.jspecify.annotations.Nullable;
```

The annotation name stays the same, so the change is only the import. I like to compare these annotations to tests. Tests give me confidence my feature won't break. Null safety annotations give me confidence I won't get a `NullPointerException` at 2 a.m. on a Saturday.

## Break 7: Jackson 3 Rejects Null for Primitive Types

The last break is the sneakiest. The build passes. All tests pass. Start the app and send a request that creates a talk with no seat count:

```http
POST http://localhost:8080/api/talks
Content-Type: application/json

{
  "title": "Spring Boot 4 in Practice",
  "speaker": "Dan Vega",
  "seats": null
}
```

In Spring Boot 3, this returned a `201 Created`. The `int` field quietly became `0`. In Spring Boot 4, you get a `400 Bad Request`, and the log shows:

```
JSON parse error: Cannot map `null` into type `int`
```

Jackson 3 changed another default. Sending `null` into a primitive is now an error. Honestly, that's probably the right call. But no test covered it, so nothing warned us. If any of your clients send nulls today, their requests start failing after the upgrade.

You can restore the old behavior in **application.properties**. To target this one setting:

```properties
spring.jackson.deserialization.fail-on-null-for-primitives=false
```

Or, to go back to Jackson 2 defaults across the board:

```properties
spring.jackson.use-jackson2-defaults=true
```

Send the request again and it succeeds, with seats set to `0`. My advice is to treat these properties as a bridge. Use them to ship the upgrade safely, then decide which new defaults you want to adopt.

## Upgrading at Scale with OpenRewrite and Spring Application Advisor

That was a manageable upgrade for one app. It's a lot easier than the move from 2.x to 3.0, which changed far more (especially around security). But what if you have hundreds or thousands of apps? Doing this by hand doesn't scale.

[OpenRewrite](https://docs.openrewrite.org/) is an open source project that automates code changes through **recipes**. There are lots of community recipes for Spring upgrades.

**Spring Application Advisor** builds on OpenRewrite with recipes written by the Spring team. It's part of [Spring's commercial support offering](https://enterprise.spring.io/). Once you have access, the workflow is three commands. First, scan the project to record its dependencies, tools, and versions:

```bash
advisor build-config get
```

Next, generate an upgrade plan. Advisor works out the order to upgrade things in, such as JUnit, Spring Data, and Spring Boot, and breaks the work into steps:

```bash
advisor upgrade-plan get
```

Finally, apply it:

```bash
advisor upgrade-plan apply
```

It validates the license for the rewrite artifacts, then rewrites your sources, handling the kinds of changes we made by hand above. What I like most about this approach is that it's repeatable. We get a new JDK every six months and a new Spring Boot release every six months. I don't want upgrades sitting in the backlog for a year. I want to stay current all the time.

## Your Spring Boot 3 to 4 Migration Checklist

We took a working Spring Boot 3.5 app to Spring Boot 4.1 and fixed seven breaks along the way:

1. Jackson imports move from `com.fasterxml.jackson` to `tools.jackson`, and `ObjectMapper` gives way to the immutable `JsonMapper`.
2. Starters are renamed (`spring-boot-starter-webmvc`, `spring-boot-starter-webmvc-test`), test imports move, and `@MockBean` becomes `@MockitoBean`.
3. Flyway needs `spring-boot-starter-flyway` or it silently never runs.
4. Hand-built Jackson mappers write ISO-8601 dates instead of timestamps.
5. The H2 console needs `spring-boot-h2console`.
6. Spring's JSR-305 nullness annotations give way to JSpecify's `@NullMarked` and `@Nullable`.
7. Jackson 3 returns a 400 when a client sends `null` into a primitive field.

The compiler catches the first two. Tests catch the next two, if you have them. The last three give you no warning. So after you get a green build, start the app, click around, and send real requests. That's where the silent changes show up.

If you want to go further, read the official Spring Boot 4.0 migration guide on GitHub. It covers areas we skipped, like `RestTemplate` changes and observability. And if you're managing many apps, look into OpenRewrite or Application Advisor so upgrades become routine instead of a yearly project.

Happy Coding