---
title: "Getting Started with Spring AI and RAG: A Practical Guide"
slug: getting-started-with-spring-ai-rag
date: "2024-10-22T09:00:00.000Z"
published: true
author: "Dan Vega"
description: "Learn how to build intelligent applications using Retrieval Augmented Generation (RAG) with Spring AI. This practical guide covers everything from understanding tokens and context windows to implementing a full RAG solution."
tags:
  - spring
  - spring-ai
  - java
keywords:
  - Spring AI
  - Spring Boot
  - Java
video: https://www.youtube.com/embed/6Pgmr7xMjiY
---

If you're building intelligent applications with Spring Boot, you've likely encountered some common limitations when working with Large Language Models (LLMs). Whether it's dealing with outdated information, incorporating private data, or preventing hallucinations, these challenges can impact the effectiveness of your AI-powered features. In this guide, you'll learn how to use Retrieval Augmented Generation (RAG) with Spring AI to build more accurate and contextually aware applications.

## Why RAG Matters

When working with LLMs, you'll encounter three main limitations:

1. **Training Data Cutoff**: LLMs are trained on data up to a specific date, making them unreliable for current information.
2. **Private Information**: Your organization's internal documents and knowledge aren't part of the LLM's training data.
3. **Potential Hallucinations**: Without proper context, LLMs might generate inaccurate or fictional responses.

RAG addresses these challenges by combining document retrieval with LLM generation. This approach lets you leverage both the power of LLMs and your specific data sources.

## Understanding Tokens and Context Windows

Before diving into implementation, let's explore two critical concepts that affect your application's performance and cost.

### The Currency of LLMs: Tokens

Tokens are the fundamental units of text processing in LLMs. Here's what you need to know:

- 100 tokens ≈ 75 words
- Cost example for GPT-4:
  - Input tokens: $2.50 per 1M tokens
  - Output tokens: $10.00 per 1M tokens


### Context Window Limitations

Each LLM has a maximum context window size:

- GPT-4: 32,768 tokens
- Claude 3: 200,000 tokens
- Gemini Pro: 1,000,000 tokens


Understanding these limitations is crucial for building efficient RAG applications, as they determine how much context you can include with each request.

## Building Your First RAG Application

Let's create a Spring Boot application that demonstrates RAG using a financial market report as our document source.

### Step 1: Project Setup

Visit [start.spring.io](https://start.spring.io) and select the following dependencies:

- Spring Web
- Spring AI OpenAI
- PDF Document Reader
- PGVector Store
- Docker Compose Support

### Step 2: Configuration

Configure your application properties:

```properties
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.chat.model=gpt-4
spring.ai.vectorstore.pgvector.initialize-schema=true
```

Set up your vector database using Docker Compose:

```yaml
services:
  db:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_DB: markets
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
```

### Step 3: Document Ingestion

Create a service to handle document processing and storage. If you are following the example from my repo you should have a pdf in the docs directory. If you do not place one of your own documents there and update the 
reference for the marketPDF. 

```java
@Component
public class IngestionService implements CommandLineRunner {
    private final VectorStore vectorStore;
    private final Logger log = LoggerFactory.getLogger(IngestionService.class);
    
    @Value("classpath:/docs/market-report.pdf")
    private Resource marketPDF;
    
    public IngestionService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }
    
    @Override
    public void run(String... args) {
        var pdfReader = new ParagraphPdfDocumentReader(marketPDF);
        TextSplitter textSplitter = new TokenTextSplitter();
        vectorStore.accept(textSplitter.apply(pdfReader.get()));
        log.info("Vector store loaded with data");
    }
}
```

### Step 4: Query Processing

Create a controller to handle RAG queries. This will create a GET mapping for the root which can be located at http://locahost:8080/ by default.

```java
@RestController
public class ChatController {
    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder
                .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore))
                .build();
    }

    @GetMapping("/")
    public String chat(@RequestParam(defaultValue = "What's the current state of the market?") String query) {
        return chatClient.prompt()
                .user(query)
                .call()
                .content();
    }
}
```

If you run the application you can send a GET request to http://localhost:8080/ and the chat method will be executed. If you provide your own documents just update the user query above. 

## Best Practices

When implementing RAG with Spring AI, keep these best practices in mind:

### Document Processing
- Split documents into meaningful chunks
- Consider document update frequency
- Handle processing errors gracefully

### Resource Optimization
- Monitor token usage
- Implement caching where appropriate
- Use batch processing for large document sets

### Security Considerations
- Protect sensitive document content
- Implement proper authentication
- Secure API endpoints

## Next Steps

Now that you understand the basics of RAG with Spring AI, consider these advanced topics:

1. **Local LLM Integration**: Use [Ollama](https://ollama.ai) for processing sensitive data locally
2. **Custom Document Readers**: Create readers for your specific document formats
3. **Advanced Vector Search**: Implement filtering and hybrid search strategies

You can find more examples in the [Spring AI documentation](https://docs.spring.io/spring-ai/reference/), including advanced configuration options and additional vector store implementations.

## Conclusion

RAG with Spring AI provides a powerful way to enhance your applications with domain-specific knowledge while leveraging the capabilities of Large Language Models. By following the implementation patterns and best practices outlined in this guide, you can build intelligent applications that provide accurate, contextually relevant responses while maintaining control over costs and performance.

Remember that RAG isn't just about feeding documents to an LLM – it's about intelligently selecting and using relevant information to enhance your AI applications. As you build your RAG implementation, focus on optimizing both the ingestion and retrieval phases to create efficient, cost-effective solutions.

Happy coding!