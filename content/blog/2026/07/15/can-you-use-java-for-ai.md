---
title: "Can You Use Java for AI? Why Java Is Better Positioned Than You Think"
slug: can-you-use-java-for-ai
description: "Can you use Java for AI? Yes. For building real AI applications it might be the better choice. Why the JVM, Spring AI, and your existing team are enough."
author: "Dan Vega"
tags:
  - Java
  - AI
  - Spring AI
keywords:
  - Java for AI
  - can you use Java for AI
  - is Java good for AI
  - Java vs Python for AI
  - Java AI frameworks
  - Spring AI
  - Java LLM
  - Java AI
date: 2026-07-15T09:00:00.000Z
published: true
cover: can-you-use-java-for-ai-editorial.png
---

Can you use Java for AI? Yes. If you're building AI into real applications rather than training models, Java might be the better choice. The conversation around AI has been dominated by Python for so long that many developers assume the JVM isn't even in the running. I think that assumption is about two years out of date.

In this post I'll make the case for Java in the AI space. The work most of us do has shifted from training models to integrating them, and that shift plays directly to Java's strengths. I'll also show you where a framework like Spring AI fits in once you move past your first API call.

## The Java AI Opportunity

Whenever I talk about AI on the JVM, the first question is always some version of "Why are we even talking about this? Isn't AI a Python thing?" It's a fair question. My friend [James Ward](https://x.com/JamesWard/status/1965273179242541212) gave the answer I keep coming back to:

> I know most people here won't believe it, but I can guarantee you that in 2 years, the majority of AI Agent workloads will run on the JVM.

I happen to agree with him. His reasoning is the whole argument in miniature. AI agents are just integration systems. They need to be secure, observable, and scalable. The JVM is exactly where most of those workloads run today. With great JVM agent frameworks already here, there's no reason to build on a different stack.

## Java vs Python for AI: Python Earned Its Place

Let's give credit where it's due. The training era began in Python. It dominated AI research and model training because of genuinely great tools like TensorFlow, PyTorch, and Hugging Face. This isn't a Java vs Python debate where I pretend that history didn't happen. If your team is building and training models, Python is still the right tool for the job.

That said, don't count Java out of this space forever. I'm really excited about [Project Babylon](https://openjdk.org/projects/babylon/), an OpenJDK project bringing code reflection to Java so that Java code can run on GPUs. The strides we're making there could open up the machine learning side of the house too.

But the game has changed.

## From Training to Integration

Look at what most of us are actually doing with AI today. One side of the house is machine learning and data science. That work is about building and training models. It needs specialized ML frameworks, custom data pipelines, and GPU infrastructure. Python owns it.

The rest of us are on the other side of the house. No matter what language we use, we're all just consumers of these Large Language Models (LLMs). When you wire an LLM into your application, you deal with the things you already deal with every day:

- REST APIs and SDKs
- Authentication
- Rate limiting
- Retry logic and resilience
- Observability

We've done this before. When you need to talk to a database in Java, you can drop down to the low-level JDBC APIs or reach for an abstraction like Spring Data. The same pattern holds for message queues, payment gateways, and cloud services. This is an integration layer. LLMs are just the next integration.

## Java Was Built for This

Once you see AI as an integration problem, Java's position stops looking surprising:

- **Enterprise-grade infrastructure.** Spring, Kafka, and the observability tooling around them are already running in production at scale.
- **Type safety.** Java is a type-safe language. That matters more than ever when an LLM is generating your data.
- **Structured output.** You can parse AI responses into real objects with compile-time guarantees, not loose strings you hope are shaped correctly.
- **Battle-tested at scale.** Millions of JVM applications serve billions of requests every single day.

One of my favorite parts of my job is talking to customers. I keep discovering that the products I use every single day run on Java and Spring. And here's the part that matters for your organization: your existing team. There's no need to hire a Python shop or re-platform. Upskill the developers you already have.

## Calling an LLM Is the Easy Part

Consuming these models is simpler than you might think. You can start by calling an LLM like OpenAI with nothing but curl. Set up an API key and send a request to the chat completions endpoint. Pass your authorization header, the model, and your prompt, and you get a response back:

```bash
#!/bin/bash
echo "Calling Open AI..."
MY_OPENAI_KEY="YOUR_API_KEY_HERE"
PROMPT="Tell me an interesting fact about Java"

curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MY_OPENAI_KEY" \
  -d '{"model": "gpt-5", "messages": [{"role":"user", "content": "'"${PROMPT}"'"}] }'
```

The response comes with a bunch of metadata. You can sift through it and find the actual answer, but it's buried in there with everything else:

```json
{
  "id": "chatcmpl-ABNbjZ5oRbo72OevnCX2arPufJCYK",
  "object": "chat.completion",
  "model": "gpt-5",
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Java was initially designed with interactive television in mind..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 90,
    "total_tokens": 104
  }
}
```

You can do the same thing in Java. Construct a request, set the model and the prompt, and send it with the HTTP client that has been in the JDK since Java 11:

```java
public static void main(String[] args) throws IOException, InterruptedException {
    var apiKey = "YOUR_API_KEY_HERE";
    var body = """
            { "model": "gpt-5",
              "messages": [{
                "role": "user",
                "content": "Tell me an interesting fact about Java"
              }]
            }
            """;

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.openai.com/v1/chat/completions"))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer " + apiKey)
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build();

    var client = HttpClient.newHttpClient();
    var response = client.send(request, HttpResponse.BodyHandlers.ofString());
    System.out.println(response.body());
}
```

If all we needed to do was call an endpoint, we'd be done. Java is ready to go, right out of the box. But calling an endpoint isn't the hard part.

## Spring AI: More Than a REST Client

This is where I want to introduce [Spring AI](https://spring.io/projects/spring-ai). It is much more than a facility for making REST API calls. When you build real-world applications, there's a long list of challenges you need to solve for. This is exactly what a framework provides.

### Model Abstraction and Portability

The biggest one for me is model portability. When you write code in Spring AI, you write to an abstraction, not to an implementation. The latest and greatest model came out this week, and the benchmarks prove it. Next week there will be another one, and you don't want to rewrite your code every time. You write to the abstraction and configure the model underneath. That makes it easy to switch between models or even use multiple models in the same application. Every provider Spring AI supports has a lower-level interface talking to it, but you get one unified API across all of them. Your code doesn't change.

### Structured Output, Prompts, and Multimodality

Spring AI handles multimodality: text, images, audio, and at some point video. It gives you structured output parsing, because we don't want to deal with loose strings in Java. We want types. It also manages prompt templates. Create a template, put it on the classpath, and substitute dynamic variables at runtime.

### Tokens, Cost, and Observability

Tokens are the currency of LLMs, so you want to understand your spend every time you talk to a model. You saw those token counts in the `usage` block of the raw response above. That flows into observability and monitoring. The observability story in Spring Boot 3+ was rewritten from the ground up, and Spring AI contributes its metrics to that same Observation API. You also get error handling and retry logic out of the box, along with support for evaluation, testing, security, and compliance.

### Streaming, Memory, and Conversation Management

Spring AI supports both blocking and non-blocking calls. If you want a good user experience, streaming the response back to the user right away helps a lot.

Then there's memory. This is a feature we don't think about, because when you use a product like ChatGPT, the product is doing the remembering. The model itself is stateless. Ask it something, and it won't remember it in the next request. That conversation management is not something you want to build yourself, and Spring AI gives it to you out of the box.

### RAG, Tool Calling, MCP, and Agents

You get retrieval-augmented generation with embedding and vector store support. A number of vector stores work out of the box. Then there's tool calling, which is where things really opened up for me. You can provide your own functions and connectors to bring context into the conversation or take action, like sending an email or persisting an object to the database. From there you can build on the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). And yes, there are agent frameworks in the Spring AI space as well.

If all we were doing was making a REST call, we wouldn't need a framework. Spring AI earns its place by solving the real-world problems you'll hit when you build new AI applications or integrate AI into the ones you already have.

## So, Is Java Good for AI?

If the question is "should I train a model in Java," probably not. That side of the house still belongs to Python. But if the question is "should my team build AI-powered applications on the JVM," the answer is an easy **YES**. The integration era plays to everything Java is already good at, and the frameworks are here now.

If you want to go deeper, here are the resources I point people to:

- [AI for Java Developers](https://www.youtube.com/watch?v=FzLABAppJfM) is my free course. It takes you from your first API call to production patterns in about 5.5 hours.
- The [Spring AI reference documentation](https://docs.spring.io/spring-ai/reference/) is the best place to learn the framework. 
- The [Spring AI GitHub repo](https://github.com/spring-projects/spring-ai) is where the project lives.
- The [Spring AI Community](https://github.com/spring-ai-community) organization on GitHub hosts community-built extensions. It's also the home of [Awesome Spring AI](https://github.com/spring-ai-community/awesome-spring-ai), a curated list of resources I started that now lives with the community.
- When you're ready for tools and agents, read [Creating Your First MCP Server in Java](/blog/creating-your-first-mcp-server-java).
- [Embabel](https://github.com/embabel/embabel-agent) is an agent framework for the JVM from Rod Johnson, the creator of Spring. I wrote about my [first look at Embabel](/blog/embabel-first-look) if you want a tour.
- James Ward's [AI4JVM](https://github.com/jamesward/ai4jvm) is a curated guide to Java AI frameworks and the wider ecosystem beyond Spring.

The Python folks had the training era. I think James is right about who gets the agent era. Happy coding!
