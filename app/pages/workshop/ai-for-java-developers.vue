<script lang="ts" setup>
useHead({
  title: 'AI for Java Developers Workshop | Dan Vega',
  meta: [
    { name: 'description', content: 'A comprehensive 4-hour workshop equipping Java developers with practical skills to implement powerful AI features using Spring AI.' },
    { property: 'og:title', content: 'AI for Java Developers Workshop' },
    { property: 'og:description', content: 'Learn to build sophisticated AI integrations using familiar Java paradigms with Spring AI.' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        AI for Java Developers
      </h1>
      <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        A comprehensive 4-hour workshop equipping Java developers with practical skills to implement powerful AI features in their applications.
      </p>
    </div>

    <!-- Workshop Overview Section -->
    <section class="mb-24">
      <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
        Workshop Overview
      </h2>
      <div class="prose prose-zinc dark:prose-invert max-w-none">
        <p class="text-base text-zinc-600 dark:text-zinc-400">
          As AI becomes table stakes for enterprise applications, Java developers need to add intelligent features without rewriting their entire tech stack. This workshop equips you with the practical skills needed to implement powerful AI features in your applications through a combination of theory and hands-on coding.
        </p>
        <p class="text-base text-zinc-600 dark:text-zinc-400 mt-4">
          Starting with foundational concepts, we'll progress to implementing specific AI capabilities including natural language processing, computer vision, and interactive chatbots. The workshop explores advanced techniques such as Retrieval-Augmented Generation (RAG) for enhanced context awareness, and the Model Context Protocol (MCP) for effective AI orchestration.
        </p>
        <p class="text-base text-zinc-600 dark:text-zinc-400 mt-4">
          Using Spring AI's powerful abstractions, you'll learn how to write model-agnostic code that works seamlessly with both cloud-based and local AI models, giving you the flexibility to choose the right solution for your specific needs.
        </p>
      </div>
    </section>

    <!-- What You'll Learn Section -->
    <section class="mb-24">
      <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
        What You'll Learn
      </h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-4">
            <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Prompt Engineering</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Master the most critical skill for AI developers with prompt templates and best practices.</p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 mb-4">
            <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Chat Client & Streaming</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Build chat applications with streaming responses and conversation memory.</p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 mb-4">
            <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Structured Outputs</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Get typed, predictable responses from AI models mapped to Java objects.</p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900 mb-4">
            <svg class="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Multimodal Processing</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Work with images and audio using vision models for detection and generation.</p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900 mb-4">
            <svg class="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">RAG (Retrieval-Augmented Generation)</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Enhance AI accuracy by grounding responses in your own data sources.</p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900 mb-4">
            <svg class="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Function Calling & Tools</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Extend AI capabilities by connecting models to real-world actions and data.</p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-700 mb-4">
            <svg class="h-5 w-5 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Local Models with Ollama</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Run AI models locally for development, testing, and privacy-sensitive applications.</p>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900 mb-4">
            <svg class="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Testing AI Applications</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Learn approaches for testing non-deterministic AI systems with evaluators and Testcontainers.</p>
        </div>
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="mb-24">
      <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
        Quick Links
      </h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="https://github.com/danvega/spring-ai-workshop"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 dark:bg-zinc-700">
              <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">GitHub Repository</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Workshop starter code and examples</p>
            </div>
          </div>
        </a>

        <a
          href="https://docs.spring.io/spring-ai/reference/index.html"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Documentation</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Spring AI Reference Documentation</p>
            </div>
          </div>
        </a>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="mb-24">
      <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
        Workshop Resources
      </h2>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
            Slides
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400 mb-4">
            Access the workshop presentation slides
          </p>
          <a
            href="https://github.com/danvega/spring-ai-workshop/blob/main/slides/ai-for-java-developers-codemash.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            View Slides
            <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
            Spring AI Community
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400 mb-4">
            A community-driven organization for building Spring-based integrations with AI models, agents, vector databases, and more.
          </p>
          <a
            href="https://github.com/spring-ai-community"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            View Examples
            <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Support Section -->
    <section>
      <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-8 text-center">
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
          Need Help?
        </h2>
        <p class="text-base text-zinc-600 dark:text-zinc-400 mb-6">
          If you have questions during the workshop, feel free to raise your hand or message in the chat.
        </p>
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          For follow-up questions after the workshop, you can reach me at
          <a href="https://danvega.dev/about" class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            danvega.dev/about
          </a>
        </p>
      </div>
    </section>
  </Container>
</template>
