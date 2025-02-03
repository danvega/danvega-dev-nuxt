---
title: DeepSeek takes the internet by storm, Java Challengers Podcast & Conference Season
slug: deepseek-java-challengers
date: "2025-02-03T07:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. I sat down to start writing this on Friday which happens to be the last day of January. I sent out a tweet congratulating people on making it to January 87th because that what it feels like. January just feel like the longest month ever when you’re in the dead of winter. We have now turned the calendar to February, the shortest month of the year as we make the march towards Spring!

Last week you couldn’t throw a rock without hitting something that was talking about DeepSeek. This is the new model from the Chinese Artificial Intelligence company that was reportedly trained at a fraction of a cost as some of the frontier models. That very claim has come with some scrutiny but regardless DeepSeek tok over the world last week.

In this episode of the newsletter I will tell you a little bit more about DeepSeek and some of the videos I published on the topic last week. I was also a guest on the Java Challengers podcast and can’t wait to tell you about it.

## DeepSeek

DeepSeek is a Chinese AI company founded in 2023 by Liang Wenfeng and backed by the High-Flyer hedge fund. It focuses on developing open‐source large language models that are both cost‑efficient and high‑performance. Notably, its flagship model, DeepSeek‑R1, emphasizes advanced reasoning and logical inference, and its rapid rise—quickly overtaking ChatGPT as the top free app on the U.S. iOS App Store—has stirred both the global AI community and financial markets. In essence, DeepSeek is reshaping the AI landscape by delivering powerful, open‑source solutions at a fraction of the cost of many Western rivals.

### DeepSeek Introduction

DeepSeek unveiled its R1 model in January 2025, achieving performance comparable to leading language models while requiring significantly less computing power and cost. The model is fully open source under an MIT license, allowing unrestricted commercial use and modification. Benchmarks demonstrate R1's capabilities across mathematical reasoning, coding, and scientific knowledge, matching or exceeding GPT-4's performance on standard tests like MMLU and SWE Bench.

The implementation offers multiple deployment options: a hosted API service with competitive pricing (14¢/million input tokens), chat interface at [chat.deepseek.com](https://chat.deepseek.com/), and local installation through Ollama. For developers wanting to run R1 locally, DeepSeek provides distilled versions ranging from 1.5B to 70B parameters. The video demonstrates setting up a local environment using Ollama and Open WebUI, creating a ChatGPT-like interface for the model while keeping all data and processing on your machine. GitHub: [github.com/deepseek-ai/DeepSeek-LLM](https://github.com/deepseek-ai/DeepSeek-LLM)

:YouTube{id=DDjHLQKtV-k}

### DeepSeek Integration with Java & Spring

DeepSeek's R1 reasoning model can now be integrated into Java and Spring applications through two implementation approaches. The first uses Java's native HTTP client to interact with DeepSeek's REST API, which follows OpenAI's API specification. The second leverages Spring AI's framework, offering a unified abstraction layer that simplifies AI integration and supports both cloud API and local model deployment.

The Spring implementation introduces key advantages like streaming responses and multi-provider support through Spring AI's ChatClient interface. Notably, developers can run smaller R1 models (7B parameters) locally using Ollama integration, offering faster response times compared to the cloud API. The tutorial demonstrates proper configuration for both remote and local deployments, including API authentication, model selection, and streaming response handling in a production environment.

:YouTube{id=TWlBGA3x3cQ}

## Java Challengers

I was grateful to be invited on The Java Challengers podcast to speak with Rafael about my 20+ year journey in software development. Our wide-ranging conversation covered several key themes:

Career Development:

- Started at a two-year technical college, moved to San Francisco for a startup, and progressed through various roles including curriculum developer and Spring Developer Advocate
- Emphasized the importance of community involvement and networking in career growth
- Discussed the path to becoming a Java Champion through consistent community contributions

Technical Leadership:

- Defined characteristics of senior developers: strong problem-solving skills, deep technical knowledge, and mentorship abilities
- Highlighted the importance of reading code vs writing code
- Stressed understanding core Java fundamentals, concurrency, and distributed systems

Learning and Growth:

- Recommended prioritizing learning based on community needs and personal interests
- Suggested blocking dedicated time for learning, even during work hours when appropriate
- Emphasized consistency over intensity in learning new technologies

Professional Development:

- Discussed strategies for handling imposter syndrome
- Highlighted the value of embracing failure as a learning opportunity
- Emphasized the importance of empathy and collaboration in software development

Content Creation:

- Shared experiences running a successful YouTube channel focused on Spring
- Discussed the Spring Office Hours podcast
- Talked about our upcoming book ["Fundamentals of Software Engineering"](https://learning.oreilly.com/library/view/fundamentals-of-software/9781098143220/)

:YouTube{id=XNZF-kgEMG4}

The conversation provided practical advice for developers at all stages of their careers, emphasizing the importance of continuous learning, community involvement, and maintaining a growth mindset.

## Upcoming Conferences

We are getting closer to conference season and I’m getting really excited about some of the events I get to attend. As always if you want to see where I will be speaking next you can check out the [speaking page](https://www.danvega.dev/speaking) on my website for an up to date list.

### ConFoo

This conference is happening at the end of the month in Montreal CA. I am really looking forward to returning to this wonderful conference after last year which was my first time there. I will be giving 2 talks on building intell

- [Code Smarter, Not Harder: AI-Powered Dev Hacks for All](https://confoo.ca/en/2025/session/code-smarter-not-harder-ai-powered-dev-hacks-for-all)
- [Spring into AI: Building Intelligent apps with Spring AI](https://confoo.ca/en/2025/session/spring-into-ai-building-intelligent-apps-with-spring-ai)

### DevNexus

I missed last years DevNexus so I am extra excited about this years event. I’ll be speaking, working the booth, helping to run a happy hour and whatever else I can get involved in. I put together a little video talking about my session at DevNexus that you can check out [here](https://www.linkedin.com/posts/vmware-tanzu_devnexus-activity-7291189292171698176-DNFy).

### JavaOne

I’m so excited to attend and speak at my very first JavaOne conference in March. The early bird pricing is going up soon so make sure you register for [this amazing conference](https://www.oracle.com/javaone/) ASAP.

### Microsoft jDConf

I just found out that I was selected to speak at Microsoft jDConf and this will be another first for me. This is a virtual conference that you can [register for free](https://jdconf.com/).

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega) (I’m not calling it X).

Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)