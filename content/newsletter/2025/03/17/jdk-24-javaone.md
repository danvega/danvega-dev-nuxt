---
title: JDK 24, JavaOne, The Virtual Java User Group (vJUG) and my return to YouTube!
slug: jdk-24-javaone
date: 2025-03-17T00:00:00.000Z
---

Are you ready for Java's biggest upgrade of the year? JDK 24 lands on Tuesday, bringing 24 powerful JEPs that will transform how we build applications. As Java celebrates its 30th birthday, I'm packing my bags for JavaOne in San Francisco, where I'll be speaking about bridging the gap between Java and frontend development. This newsletter is packed with technical insights you won't want to miss—from unlocking AI potential with Spring AI to monitoring token usage in your LLM applications. Between my return to YouTube after a month-long hiatus and fresh tutorials on Google Gemini integration, we've got plenty to explore. Whether you're curious about quantum-resistant cryptography or struggling with structured LLM outputs, this edition has something to elevate your development workflow.

## JDK 24: Java's Most Feature-Packed Release Yet!

Java developers, get ready for a productivity revolution! JDK 24 arrives on March 18 with an impressive lineup of 24 JEPs that push Java's capabilities into exciting new territory. The new Class-File API (JEP 484) transforms how framework developers and bytecode manipulation tools operate, offering a standard, fully-supported API for reading, writing, and transforming Java class files without resorting to third-party libraries. This opens up countless possibilities for code generation, runtime analysis, and custom language features that were previously difficult to implement reliably.

Stream enthusiasts will fall in love with Stream Gatherers (JEP 485), which supercharges Java's functional programming model by enabling complex multi-element transformations within streams. Unlike traditional map/filter operations that process elements individually, gatherers can correlate and transform groups of elements, making operations like windowing, batch processing, and complex aggregations dramatically more elegant.

Developers working with concurrent applications will appreciate the maturing Structured Concurrency API (JEP 499) and enhanced Scoped Values (JEP 487), which together solve thorny context-propagation problems in multi-threaded environments. And if you're building for the future, the quantum-resistant cryptography implementations (JEPs 496 & 497) ensure your security-critical applications will stay protected even in the post-quantum era.

### Complete JDK 24 Feature List

- [JEP 404](https://openjdk.org/jeps/404): Generational Shenandoah (Experimental)
- [JEP 450](https://openjdk.org/jeps/450): Compact Object Headers (Experimental)
- [JEP 472](https://openjdk.org/jeps/472): Prepare to Restrict the Use of JNI
- [JEP 475](https://openjdk.org/jeps/475): Late Barrier Expansion for G1
- [JEP 478](https://openjdk.org/jeps/478): Key Derivation Function API (Preview)
- [JEP 479](https://openjdk.org/jeps/479): Remove the Windows 32-bit x86 Port
- [JEP 483](https://openjdk.org/jeps/483): Ahead-of-Time Class Loading & Linking
- [JEP 484](https://openjdk.org/jeps/484): Class-File API
- [JEP 485](https://openjdk.org/jeps/485): Stream Gatherers
- [JEP 486](https://openjdk.org/jeps/486): Permanently Disable the Security Manager
- [JEP 487](https://openjdk.org/jeps/487): Scoped Values (Fourth Preview)
- [JEP 488](https://openjdk.org/jeps/488): Primitive Types in Patterns, instanceof, and switch (Second Preview)
- [JEP 489](https://openjdk.org/jeps/489): Vector API (Ninth Incubator)
- [JEP 490](https://openjdk.org/jeps/490): ZGC: Remove the Non-Generational Mode
- [JEP 491](https://openjdk.org/jeps/491): Synchronize Virtual Threads without Pinning
- [JEP 492](https://openjdk.org/jeps/492): Flexible Constructor Bodies (Third Preview)
- [JEP 493](https://openjdk.org/jeps/493): Linking Run-Time Images without JMODs
- [JEP 494](https://openjdk.org/jeps/494): Module Import Declarations (Second Preview)
- [JEP 495](https://openjdk.org/jeps/495): Simple Source Files and Instance Main Methods (Fourth Preview)
- [JEP 496](https://openjdk.org/jeps/496): Quantum-Resistant Module-Lattice-Based Key Encapsulation Mechanism
- [JEP 497](https://openjdk.org/jeps/497): Quantum-Resistant Module-Lattice-Based Digital Signature Algorithm
- [JEP 498](https://openjdk.org/jeps/498): Warn upon Use of Memory-Access Methods in sun.misc.Unsafe
- [JEP 499](https://openjdk.org/jeps/499): Structured Concurrency (Fourth Preview)
- [JEP 501](https://openjdk.org/jeps/501): Deprecate the 32-bit x86 Port for Removal

## Join Me at JavaOne 2025: Where Java's Future Unfolds

As we celebrate Java's 30th birthday, I'm thrilled to announce that I'll be speaking at JavaOne 2025! My session, "A Java Developer's Guide to Navigating the Frontend Landscape [SES1487]," will explore how Java developers can leverage their existing skills while embracing modern frontend technologies.

In a world where full-stack development has become increasingly important, many Java developers find themselves stepping into unfamiliar frontend territory. My talk will bridge this gap by providing practical strategies for tackling JavaScript frameworks, build tools, and UI libraries with a Java developer's mindset. You'll walk away with concrete approaches to apply your Java expertise to frontend challenges, making the transition smoother and more intuitive.

### Why This Session Matters

The boundary between backend and frontend continues to blur, creating both challenges and opportunities for Java developers. Rather than treating these as separate worlds, we'll explore how your Java expertise provides a solid foundation for frontend work. From state management patterns that mirror Java concepts to leveraging type safety with TypeScript, you'll discover that your backend knowledge is more transferable than you might think.

We'll also dive into the cultural and workflow differences between these ecosystems, and how to navigate them successfully. If you've ever felt overwhelmed by the rapidly evolving frontend landscape, this session will provide the compass you need to chart your course forward.

### Let's Connect at JavaOne!

If you're planning to attend, I'd love to continue the conversation after my session. Whether you're facing specific frontend challenges in your Java projects or just want to share experiences, I'm looking forward to connecting with fellow developers who are bridging these worlds.

The conference has an incredible lineup this year, from the Java 24 launch to the special 30th birthday celebrations. Between the world-class learning opportunities, networking events, and even the Wednesday night party at Devil's Canyon Brewing Company, it's shaping up to be an unmissable event for the Java community.

My session is scheduled for [add your session date/time], and I hope to see you there! Drop by to say hello, or reach out beforehand if you have specific topics you'd like me to address during the Q&A portion.

See you in Redwood Shores!

## Building Intelligent Applications with Spring AI

I was deeply honored to speak at the virtual Java User Group (vJUG) last week, presenting to what is the largest Java User Group on the planet. My session focused on Spring AI, where I introduced the fundamentals of AI and large language models before exploring how Java developers can integrate these technologies into their applications.

I began by covering key AI concepts before diving into Spring AI's architecture, demonstrating how it provides a portable API supporting multiple AI providers and modalities. Through live coding examples, I showcased Spring AI's practical features including structured output, chat memory, multimodal capabilities, and tools integration. I emphasized how Spring AI simplifies LLM integration by abstracting away provider-specific implementations, allowing developers to switch between models like OpenAI's GPT and Google's Gemini with minimal code changes. I also addressed important considerations around tokens, context windows, and pricing when building production applications with LLMs. For those interested in exploring further, I've created a GitHub repository ([github.com/danvega/spring-ai-workshop](https://github.com/danvega/spring-ai-workshop)) with additional examples and resources.

:YouTube{id=XjfWyc6xmSA}

## Back in Action: Breaking the Content Creation Hiatus

After a 33-day break from YouTube, I'm excited to share that I've returned with four fresh technical tutorials this week! Between client projects and conference preparations, finding time for content creation has been challenging—but your messages asking when new videos would arrive kept me motivated.

Each video tackles a specific challenge I've personally encountered while building AI-powered applications. Whether you're looking to extend LLM capabilities with external data sources, need consistent response formats from unpredictable models, or want to avoid surprise bills at month-end, there's something here to enhance your development workflow.

What AI challenges are you currently facing in your projects? Reply to this email with your questions—your feedback directly shapes my upcoming content. And if you found these tutorials helpful, sharing them with a colleague goes a long way toward growing our community.

### Unleashing LLM Potential with Model Context Protocol (MCP)

Model Context Protocol (MCP) addresses a critical limitation of large language models: their inability to access real-time data, personal documents, or external systems. This standardized protocol enables LLMs to communicate with external data sources and tools through a client-server architecture. Similar to how USB standardized device connections, MCP establishes a unified way for models to interact with various data sources without requiring custom integrations for each service.

The implementation utilizes MCP servers (like file system access, Brave search, GitHub integration) that can be plugged into MCP-compatible clients such as Claude Desktop, Claude Code, Cursor, and WinSurf. By following this protocol, developers can create reusable tools that extend LLM capabilities without duplicating integration efforts across teams or applications. The video demonstrates this by configuring Claude Desktop to access local files and perform web searches for real-time information about recent shows like Daredevil Born Again. [GitHub Documentation](https://github.com/anthropics/model-context-protocol)

:YouTube{id=nNLshWCoe0o}

### Streamlining Google Gemini Flash 2.0 Integration with API Keys

Google Gemini Flash 2.0 offers exceptional performance for AI applications with its speed, accuracy, and cost-efficiency. While previous implementations required using Google Vertex API with Google credentials, this tutorial demonstrates a simpler approach using just API keys through OpenAI compatibility. The technique leverages Spring AI's existing OpenAI integration by configuring two critical properties: changing the base URL to Google's Generative Language API endpoint and using Google Gemini API keys in place of OpenAI keys.

The implementation includes a sample Spring Boot application that connects to Gemini models using this compatibility layer, plus a bonus endpoint that lists all available Google Gemini models. This approach creates a path forward until the official Google Gemini Java SDK matures and gets integrated into Spring AI directly. For developers concerned with API costs and performance, Gemini Flash 2.0 provides an excellent alternative with straightforward integration into existing Spring applications. [GitHub Repository](https://github.com/danvega/gemini-flash-api)

:YouTube{id=5zhNfPH-jps}

### Controlling AI Responses with Structured Output in Spring AI

Structured output solves a critical challenge when working with LLMs in applications: unpredictable response formats. While consumers might be satisfied with any format when asking questions conversationally, applications need consistent, typed responses that can be deserialized into objects. The tutorial demonstrates how different LLMs implement structured output through their own JSON schema specifications, making standardization difficult for developers working with multiple models.

Spring AI elegantly solves this complexity by handling format conversion behind the scenes. By simply defining a Java record and using the `entity()` method with a parameterized type reference, Spring AI automatically generates the appropriate schema for the target LLM. The implementation shows a REST controller that transforms an unstructured list of NBA teams into a structured collection of objects with consistent properties. This approach eliminates the need to understand each LLM's schema details while ensuring applications receive predictable, strongly-typed responses that integrate seamlessly with Java's type system. [GitHub Repository](https://github.com/danvega/structured-output)

:YouTube{id=8buYgH3T8XA}

### Building AI Application Observability with Spring Boot, Prometheus, and Grafana

For developers paying per token in AI applications, operating without visibility into usage metrics is like running blindfolded toward an inevitable billing surprise. This technical solution implements comprehensive monitoring using a stack of complementary technologies: Spring Boot Actuator exposes application metrics through HTTP endpoints, Prometheus collects and stores these metrics as time-series data, and Grafana transforms this data into customizable dashboards for real-time monitoring.

The implementation provides detailed visibility into critical AI metrics including token usage (both prompt and completion tokens), response times, error rates, and system resource consumption. Using Docker Compose for simplified deployment, the solution includes pre-configured dashboards that developers can immediately use or customize. By tracking these metrics, teams can implement appropriate guardrails around token consumption, optimize response times by identifying requests that would benefit from streaming responses, and avoid unexpected billing surprises. The complete monitoring solution requires minimal code changes to existing Spring AI applications while providing maximum visibility into performance and cost metrics. [GitHub Repository](https://github.com/danvega/spring-ai-metrics)

:YouTube{id=pBVKkcBhw6I}

## UNTIL NEXT WEEK

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)