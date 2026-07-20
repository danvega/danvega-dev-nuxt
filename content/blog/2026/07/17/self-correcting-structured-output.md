---
title: "Self-Correcting Structured Output in Spring AI 2.0"
slug: self-correcting-structured-output
date: 2026-07-17T09:00:00.000Z
published: true
description: "Learn how Spring AI 2.0 validates LLM JSON against your schema and automatically retries failures with self-correcting structured output. A beginner guide."
author: "Dan Vega"
tags:
  - Spring AI
  - Spring Boot
  - Java
keywords:
  - self-correcting structured output
  - spring ai structured output
  - spring ai validateSchema
  - StructuredOutputValidationAdvisor
  - spring ai schema validation
  - spring ai 2.0
  - validate llm json output
cover: self-correcting-structured-output.jpg
video: https://www.youtube.com/embed/vxOeeNyOtZY
---

Everyone's fix for unreliable large language model (LLM) JSON is the same. Write a stricter prompt and beg the model, please only respond with valid JSON. That is not engineering, that is hoping. Spring AI 2.0 ships self-correcting structured output, and it treats bad JSON like a real failure mode: it validates the output against your schema, and when validation fails, it hands the error back to the model and calls it again automatically.

The best part is that this is one line in your entity call, and it is off by default so nothing you already have will break. By the end of this post your structured output will fix itself. If you would rather watch than read, the full walkthrough is on [YouTube](https://youtu.be/vxOeeNyOtZY).

::GitHubRepo{url="https://github.com/danvega/self-correcting-structured-output"}
Follow along with the complete working example.
::

## A Quick Refresher on Structured Output

If you have used Spring AI before, structured output should feel familiar. Instead of asking the model to hand you back a giant blob of text and then parsing it yourself, you define a Java type and tell the model, "this is the shape of the data I want back."

Behind the scenes Spring AI has a schema generator. It looks at your type, generates a JSON Schema, and appends that schema to the prompt. The idea is the model reads the schema and formats its response to match. When it works, Spring AI turns that string into a real Java object you can work with.

This works really well with frontier models like those from Anthropic, OpenAI, and Google. With smaller open source models running locally, not so much. That gap is exactly the problem self-correcting structured output solves. For a deeper look at the underlying API, the [Spring AI reference docs](https://docs.spring.io/spring-ai/reference/) are a great resource, and Christian Tzolov's [blog post on the Spring team's site](https://spring.io/blog/2026/06/23/spring-ai-self-correcting-structured-output) covers the feature in detail.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with Java, Maven, and Spring Boot. Add two dependencies to start: **Spring Web** so we can build a couple of REST endpoints, and the **Anthropic** starter as our first model.

We will start with Anthropic to see the happy path, then switch to Ollama with a small open source model so we can watch things fail on purpose. The code stays the same either way. That is the whole point of Spring AI's model abstraction: you write to an interface, not to a specific provider, so swapping models does not force you to rewrite anything.

Anytime you use an LLM with Spring AI you need to configure your API key and the model you want. In `application.yaml` (or `application.properties`) that looks like this:

```yaml
spring:
  ai:
    anthropic:
      api-key: ${ANTHROPIC_API_KEY}
      chat:
        options:
          model: claude-opus-4
```

I keep my key in an environment variable rather than hardcoding it. If you forget to set a key, the application will fail to start, so make sure whatever provider you use has a valid key configured.

## Modeling the Data

We are going to build this around conference talk submissions. This is a great use case because a talk proposal usually arrives as messy, free-form text and we want to pull it into clean, structured fields.

Here is the record that describes what we want back:

```java
public record TalkSubmission(
        String title,
        String talkAbstract,
        String level,       // beginner, intermediate, or advanced
        String track,
        String duration,
        List<String> tags,
        String speakerHandle
) {}
```

A `record` is a compact Java class for holding immutable data. Each component (like `title` or `tags`) becomes a field, and Spring AI uses these to build the JSON Schema it sends to the model.

## Demo One: The Way We Have Always Done It

Now let's build a controller with our first endpoint. This is the classic typed response approach: define the type, ask the model to fill it in, and hope for the best.

```java
@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private static final String SYSTEM_PROMPT = """
        You review conference talk submissions and extract them into structured data.
        The submissions are messy, free-form text written by speakers.
        Stay faithful to the speaker's original wording and details whenever possible.
        """;

    private final ChatClient chatClient;

    public SubmissionController(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem(SYSTEM_PROMPT)
                .build();
    }

    @PostMapping("/typed")
    public TalkSubmission typed(@RequestBody String rawSubmission) {
        return chatClient.prompt()
                .user(u -> u.text("Extract the talk submission: {submission}")
                        .param("submission", rawSubmission))
                .call()
                .entity(TalkSubmission.class);
    }
}
```

A few things worth explaining. The `ChatClient` is the high-level API for talking to a model, and we build it from an injected `ChatClient.Builder`. If the difference between `ChatClient` and `ChatModel` is confusing, I made a separate video on that which will help you get started.

The `user` method here takes a `Consumer<PromptUserSpec>` instead of a plain string. That lets us pass in a template with a `{submission}` placeholder and fill it with `.param(...)`. Finally, `.call().entity(TalkSubmission.class)` makes the blocking request and converts the response into our record.

To test it, drop a messy talk proposal into a file like `samples/messy-submission.txt`, then POST it to the endpoint. Running against Claude, this works great. We get back a clean `TalkSubmission` with the title, abstract, level, track, duration, tags, and speaker handle all populated. But what happens when it does not work?

## Watching It Fail With a Small Ollama Model

Let's force a failure. Comment out the Anthropic starter and pull in the Ollama starter instead so we can run a local open source model.

```yaml
spring:
  ai:
    ollama:
      chat:
        options:
          model: llama3.2:1b
```

The `llama3.2:1b` model is a one billion parameter model, small enough to run comfortably on a laptop but not great at following a JSON Schema. If you cannot run Ollama or Docker, you can follow along and read the results. If you can, grab a model from the [Ollama website](https://ollama.com) and pull it locally.

Send the same request again and you get a `500` error. Looking at the logs, you will see something like this:

```
Cannot map `null` into type `int`
(through reference chain: TalkSubmission)
```

The model returned JSON, but it either left out a field or gave a `null` where the record expected a value. This is the failure mode. We generated a schema, asked the model to follow it, and then prayed. When the prayer went unanswered, the whole request blew up with no backup plan.

## Demo Two: Schema Validation With validateSchema

Here is where Spring AI 2.0 earns its keep. We add a second endpoint that looks almost identical, with one line of difference in the entity call.

```java
@PostMapping("/validated")
public TalkSubmission validated(@RequestBody String rawSubmission) {
    return chatClient.prompt()
            .user(u -> u.text("Extract the talk submission: {submission}")
                    .param("submission", rawSubmission))
            .call()
            .entity(spec -> spec.validateSchema(TalkSubmission.class));
}
```

The `.entity(...)` call now takes a spec where we call `validateSchema(...)`. This tells Spring AI to check the model's JSON against the generated schema. When validation fails, Spring AI feeds the specific error back to the model and calls it again, giving the model a real chance to fix its mistake instead of leaving you with a stack trace.

Under the hood this registers the `StructuredOutputValidationAdvisor`, and it retries up to three times by default. Each retry includes the validation error, so the model is not guessing at what went wrong. If you need more attempts, you can build the advisor yourself and set `maxRepeatAttempts`.

To see this in action, turn on debug logging for the validation advisor:

```yaml
logging:
  level:
    org.springframework.ai.chat.client.advisor.StructuredOutputValidationAdvisor: DEBUG
```

Now when you POST to `/api/submissions/validated`, you will see logs like `Validating JSON output against schema` along with the validation errors it caught. Instead of failing silently, Spring AI recognizes the problem, hands it back to the model, and retries. Sometimes it succeeds on the first correction, sometimes it takes a couple of tries, but you now have a safety net where before you had hope.

## Seeing the Schema Spring AI Generates

Curious what that schema actually looks like? You can generate it yourself with the same `JsonSchemaGenerator` Spring AI uses under the hood.

```java
@GetMapping("/schema")
public String schema() {
    return JsonSchemaGenerator.generateForType(TalkSubmission.class);
}
```

Hit `localhost:8080/api/submissions/schema` and you will see the full JSON Schema, complete with every field from your record. This is exactly what gets sent to the model, and it is how Spring AI can walk down nested types and describe your whole object graph automatically.

## Going Further With Native Structured Output

There is one more level. Some frontier models like those from OpenAI and Anthropic support native structured output, meaning they enforce the schema at the API level rather than just appending it to the prompt text.

```java
@PostMapping("/native")
public TalkSubmission nativeOutput(@RequestBody String rawSubmission) {
    return chatClient.prompt()
            .user(u -> u.text("Extract the talk submission: {submission}")
                    .param("submission", rawSubmission))
            .call()
            .entity(spec -> spec.useProviderStructuredOutput().validateSchema(TalkSubmission.class));
}
```

Calling `useProviderStructuredOutput()` delivers the JSON Schema to the AI provider as an API-level constraint instead of adding it to the prompt. This is off by default because native support varies across models. It has no effect if the underlying model does not support it, and there are caveats (for example, OpenAI's structured output API does not accept a top-level JSON array schema). Switch back to a model like Claude and this pairs beautifully with schema validation.

## Wrapping Up

Structured output has always let us define the shape of the data we want from an LLM and turn the response into a real Java type. What Spring AI 2.0 adds is a genuine safety net. With a single `validateSchema(...)` call, you validate the model's response against your schema and automatically retry when it comes back wrong.

That is the difference between hoping and engineering. When you recognize a failure point and build in an automatic retry, you are handling the problem instead of praying it does not happen. Structured output is one of my favorite features in Spring AI, and self-correcting validation makes it noticeably more reliable.

This is just one of the new features in Spring AI 2.0, and more are on the way. If there is a specific one you want me to cover next, let me know. Until then, Happy Coding.