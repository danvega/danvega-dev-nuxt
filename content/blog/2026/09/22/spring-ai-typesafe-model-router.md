---
title: "Spring AI TypeSafe: Build a Model Router From Scratch"
slug: spring-ai-typesafe-model-router
description: "Learn Spring AI TypeSafe by building a model router from an empty app. One Choice question to Jev picks the cheapest OpenAI model tier for every prompt."
author: "Dan Vega"
tags:
  - Spring AI
  - Spring Boot
  - Java
keywords:
  - spring ai typesafe
  - spring-ai-starter-typesafe
  - spring ai model router
  - jev spring ai
  - TypeSafeClient spring ai
  - spring ai choice primitive
  - OpenAiChatOptions model per request
date: 2026-09-22T09:00:00.000Z
published: true
cover: spring-ai-typesafe-model-router.png
video: https://www.youtube.com/embed/_5V6sJxRgqk
---


Most Spring AI apps send every prompt to one default model. That means "hello there" costs the same as "design a multi-region failover strategy for a Postgres cluster." Spring AI TypeSafe gives you a fast, cheap way to fix that. It's a new community project, released on September 21, 2026, that brings Jev (TypeSafe AI's structured judgment model) into Spring AI through an official starter.

In this tutorial you'll start from an empty Spring Boot app and build a small model router. One Choice question asks Jev which tier a prompt belongs in: luna, terra, sol, or astra. Jev answers in about 300 milliseconds with a label, a confidence score, and a probability for each tier. Then the prompt goes to that model. The whole thing is four classes and one dependency.

::GitHubRepo{url="https://github.com/danvega/spring-ai-model-router"}
Follow along with the complete working example.
::

## What Is Spring AI TypeSafe?

Christian Tzolov from the Spring AI team announced the project in [Spring AI and TypeSafe Jev: fast, cheap, structured decisions](https://spring.io/blog/2026/09/21/spring-ai-typesafe-structured-judgment). The pitch is simple. AI apps are full of small decisions. You might need to pick the next step in a multi-agent system, judge an output, rank documents, or route a request. Those decisions need to be fast, cheap, repeatable, and structured.

A large language model (LLM) can make those calls, but it's slow and pricey for the job. You also end up writing prompt templates, JSON schemas, and parsing code. Jev skips all of that. You ask typed questions and get numbers back. The blog post reports a median of 275 ms for one question and 310 ms for three. A 14-question call costs $0.000043, compared to $0.0018 for claude-haiku.

I like to think of Jev as an "and," not an "or." You still use an LLM to write the answer. Jev decides things around it.

### Where the Project Lives

The code is in the [spring-ai-community/spring-ai-typesafe](https://github.com/spring-ai-community/spring-ai-typesafe) repository, with [reference docs here](https://spring-ai-community.github.io/spring-ai-typesafe/latest/). If you haven't seen the Spring AI Community GitHub organization before, it's where community contributions and incubator-style projects live. These projects are new and still moving. They aren't part of the main Spring AI repo yet.

The project ships two pieces you should know about:

- **spring-ai-starter-typesafe**: auto-configures a `TypeSafeClient` bean. You set one property, `spring.ai.typesafe.api-key`, and you're ready.
- **typesafe-spring-ai**: higher-level building blocks like `JevJudge`, `JevSelfRefineAdvisor`, `JevGuardrailAdvisor`, `JevDocumentFilter`, `JevDocumentReranker`, and `JevToolIndex`.

For the router, you only need the starter.

The repo also has demos worth reading after this tutorial. `TicketTriageDemo` does confidence-gated routing. `CascadeDemo` tries a cheap model first and uses Jev as the gate. Neither is exactly a model router, but both use the same idea.

Two caveats from the announcement. Jev does not stream. Also, any state you pass must be a string, object, array, or null.

If you're brand new to Jev, start with my earlier posts: [Getting Started with Jev in Spring Boot 4](/blog/getting-started-with-jev-in-spring-boot-4-typesafe-ai), [I Built a Spring Boot Starter for Jev](/blog/i-built-a-spring-boot-starter-for-jev-one-dependency-done), and [Jev Isn't an LLM, So What Does It Do?](/blog/jev-isnt-an-llm-so-what-does-it-do-3-real-apps).

## Why Build a Spring AI Model Router?

Here's the problem. In a typical Spring AI app you configure one default model, and every prompt goes there. Some prompts need a frontier model. Many don't. A greeting or a one-line fact could go to a smaller, faster, cheaper model.

Spring AI already lets you change the model on a single request. What it can't do for you is decide which model a prompt needs. You can't write an `if` statement that reads a prompt and judges how hard it is. That judgment is exactly what Jev is good at.

For this demo I'm using four OpenAI models, each with a different price and reasoning level:

| Tier | Model | Good for |
|------|-------|----------|
| luna | gpt-5.6-luna | Greetings, one-line facts |
| terra | gpt-5.6-terra | Summaries, short functions |
| sol | gpt-5.6-sol | Multi-step reasoning, code across files |
| astra | gpt-6-astra | Research, architecture, proofs |

You don't have to use OpenAI. Spring AI writes to an abstraction, not a specific vendor. Swap in Anthropic, Google Gemini, Ollama, or Docker Model Runner by changing your dependency and configuration.

## Create the Project and Add the Starter

Head over to [start.spring.io](https://start.spring.io) and create a new project with these settings:

- **Language**: Java
- **Spring Boot**: 4.1.1
- **Java**: 27 (any recent version works)
- **Dependencies**: Spring Web and OpenAI

Click **Generate**, unzip the file, and open it in your IDE. The project uses Spring AI 2.0.1.

The TypeSafe starter isn't on Spring Initializr yet because it's brand new. Add it to your **pom.xml** by hand:

```xml
<dependency>
    <groupId>org.springaicommunity</groupId>
    <artifactId>spring-ai-starter-typesafe</artifactId>
    <version>0.1.0</version>
</dependency>
```

Reload Maven after you add it.

### Configure Your API Keys

You need two keys: `OPENAI_API_KEY` and `TYPESAFE_API_KEY`. Export them as environment variables and reference them in **application.yaml**. Don't hard-code keys in this file. It's too easy to commit them by accident.

```yaml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      chat:
        options:
          model: gpt-6-astra
    typesafe:
      api-key: ${TYPESAFE_API_KEY}
```

The default model is `gpt-6-astra`. That's the fallback if nothing overrides it. The router will override it on every request.

Don't skip the `spring.ai.typesafe.api-key` property. I ran into this during the build. Without it, the auto-configuration never creates the `TypeSafeClient` bean. Your IDE and the app will both complain that the bean can't be found. If constructor injection of `TypeSafeClient` fails, check this property first.

## Define Your Models With a ModelTier Enum

Start with the models. I'm using an enum called `ModelTier` for simplicity. You could move this into configuration properties later.

```java
public enum ModelTier {

    LUNA("gpt-5.6-luna", "Quick, low-stakes requests: greetings, one-line facts."),
    TERRA("gpt-5.6-terra", "Everyday work: summaries, short functions."),
    SOL("gpt-5.6-sol", "Complex professional work: multi-step reasoning, code across files."),
    ASTRA("gpt-6-astra", "The workhorse for the hardest problems: deep research, system architecture, tricky debugging, long tasks where a mistake is costly.");

    private final String modelId;
    private final String description;

    ModelTier(String modelId, String description) {
        this.modelId = modelId;
        this.description = description;
    }

    public String modelId() {
        return modelId;
    }

    public String description() {
        return description;
    }
}
```

Two fields matter here. The `modelId` is what you pass to OpenAI. The `description` is what Jev reads to decide which tier fits a prompt. Write your descriptions carefully, because they are the routing rules.

You aren't limited to one vendor. You could mix Anthropic, Google, and OpenAI models in the same enum.

## Ask Jev One Choice Question in the ModelRouter

This is where Spring AI TypeSafe comes in. The library has three primitives for asking Jev questions. The router uses one of them: **Choice**. A Choice has instructions and a list of options. Jev picks one option and tells you how sure it is. The [docs](https://spring-ai-community.github.io/spring-ai-typesafe/latest/) cover the other two primitives.

First, create a record for the result:

```java
public record RoutingDecision(
        ModelTier tier,
        String model,
        double confidence,
        Map<String, Double> probabilities) {
}
```

The `confidence` and `probabilities` come straight from Jev. The probability map lets you see how Jev weighed every tier, which helps when you tune your descriptions.

Now create the `ModelRouter`. Marking it with `@Service` tells Spring to create and manage it as a bean, so you can inject it anywhere.

```java
@Service
public class ModelRouter {

    private static final Logger log = LoggerFactory.getLogger(ModelRouter.class);
    private static final String QUESTION = "tier";

    private final TypeSafeClient typeSafeClient;
    private final Choice tierChoice;

    public ModelRouter(TypeSafeClient typeSafeClient) {
        this.typeSafeClient = typeSafeClient;

        var choice = Choice.builder()
                .instructions("Which model tier is the cheapest one that can still answer this prompt well? "
                        + "Prefer the cheapest tier unless the prompt clearly needs more capability.");

        // Each enum constant becomes an option: name as the key, description as the text
        for (ModelTier tier : ModelTier.values()) {
            choice.option(tier.name(), tier.description());
        }

        this.tierChoice = choice.build();
    }

    public RoutingDecision route(String prompt) {
        var answer = typeSafeClient
                .system1(prompt, Map.of(QUESTION, tierChoice))
                .choice(QUESTION);

        var tier = ModelTier.valueOf(answer.value());
        log.info("Routing to {} ({}) with confidence {}", tier, tier.modelId(), answer.confidence());

        return new RoutingDecision(tier, tier.modelId(), answer.confidence(), answer.probabilities());
    }
}
```

Let's walk through it.

The `TypeSafeClient` comes in through constructor injection. The starter auto-configured it for you, as long as the API key property is set.

In the constructor, you build the Choice once. The instructions tell Jev what you're asking and to lean toward the cheaper tier. That bias matters. Without it, a judge might play it safe and send everything to the biggest model. Then the loop adds one option per `ModelTier`. There's a limit on how many options a Choice can hold (around 250), so four tiers is nowhere close.

Building the Choice in the constructor means you don't rebuild it on every request. It's the same question each time. Only the prompt changes.

In `route`, you call `system1` with the prompt and a map of named questions. Here there's one question, keyed `"tier"`. You read the answer back with `.choice("tier")`. Because each option's key was `tier.name()`, `answer.value()` maps straight back to the enum with `ModelTier.valueOf`.

One thing I'd add in your own version is timing around the `system1` call. Jev is fast, and it's nice to see that in the logs.

## Route Each Request in the ChatController

The last class is the REST controller. It takes a prompt, asks the router for a decision, and sends the prompt to the chosen model.

```java
@RestController
public class ChatController {

    private final ChatClient chatClient;
    private final ModelRouter router;

    public ChatController(ChatClient.Builder builder, ModelRouter router) {
        this.chatClient = builder.build();
        this.router = router;
    }

    @PostMapping("/chat")
    public ChatResult chat(@RequestBody ChatRequest request) {
        RoutingDecision decision = router.route(request.prompt());

        String answer = chatClient.prompt()
                .user(request.prompt())
                .options(OpenAiChatOptions.builder()
                        .model(decision.model()) // override the default model for this request
                        .build())
                .call()
                .content();

        return new ChatResult(decision, answer);
    }

    record ChatRequest(String prompt) {}

    record ChatResult(RoutingDecision routing, String answer) {}
}
```

A few Spring AI details are worth explaining if you're new.

`ChatClient` is an interface. That's what lets your code stay vendor neutral. Spring Boot auto-configures a `ChatClient.Builder` for your provider, and you call `build()` to get a client. There are static `create` factory methods too, but injecting the builder is the preferred approach.

`OpenAiChatOptions` lets you change settings for one request without touching the default. Here you set the model to whatever the router picked. The `call()` method is blocking, and `content()` returns the response as a string.

The two records are defined inline because only this controller uses them. `ChatResult` returns both the routing decision and the answer. That way the caller sees which model answered and how confident Jev was.

This is the only endpoint in the app. It's a single `POST /chat`.

## Test Your Spring AI Model Router

Start the app. It runs on port 8080. Send a simple prompt first:

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "hello there"}'
```

When I ran this, the routing came back as luna, the cheapest tier, using `gpt-5.6-luna`. The probability map showed the other tiers were barely considered. The answer was a friendly "How can I help you today?"

Now try something harder:

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Design a multi-region failover strategy for a Postgres cluster."}'
```

This one routed to sol (`gpt-5.6-sol`) with a confidence of 0.55. Same endpoint, a different model, and the decision comes back alongside the answer.

The response shape looks like this:

```json
{
  "routing": {
    "tier": "SOL",
    "model": "gpt-5.6-sol",
    "confidence": 0.55,
    "probabilities": { "...": "one entry per tier" }
  },
  "answer": "..."
}
```

You may notice the second request feels slow. That isn't Jev. The routing decision takes roughly 300 ms. The rest of the time is the LLM writing a long answer. This is also why you don't want an LLM making the routing call. You'd pay that latency twice.

### Running the Tests Without Keys

The repo includes `ModelRouterTest`, which mocks the Jev client. You can run the unit tests without any API keys. That makes it easy to check your routing logic in CI (continuous integration) without spending money on real calls.

## Taking the Model Router Further

You built a working model router with four classes: `ModelTier`, `ModelRouter`, `RoutingDecision`, and `ChatController`. Spring AI TypeSafe did the hard part with one dependency and one Choice question. Every prompt now goes to the cheapest model that can handle it, and you can see why.

If you're running a Spring AI app that sends everything to one model, a router like this is worth adding. A few ideas to take it further:

- Move the tiers into configuration so you can change models without a redeploy.
- Add a confidence threshold that falls back to a bigger model when Jev isn't sure.
- Mix vendors in your tiers, since Spring AI makes switching providers a config change.
- Explore `JevGuardrailAdvisor`, `JevJudge`, and the `CascadeDemo` in the [spring-ai-typesafe repo](https://github.com/spring-ai-community/spring-ai-typesafe).

Routing is one use case. Guardrails, judges, and classification all fit the same pattern. It's great to see Jev pair this easily with Spring AI, and the team put the project, docs, and blog post together fast. Grab the [finished code](https://github.com/danvega/spring-ai-model-router) and give it a try.

Happy Coding