<script lang="ts" setup>
useHead({
  title: 'DVaaS - Dan Vega as a Service | MCP Server',
  meta: [
    { name: 'title', content: 'DVaaS - Dan Vega as a Service | MCP Server' },
    { name: 'description', content: 'Access Dan Vega\'s entire content ecosystem through AI using the Model Context Protocol. Built with Spring AI and Spring Boot.' },
    { property: 'og:title', content: 'DVaaS - Dan Vega as a Service | MCP Server' },
    { property: 'og:description', content: 'Access Dan Vega\'s entire content ecosystem through AI using the Model Context Protocol.' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- Hero Section -->
    <header class="max-w-4xl">
      <h1 class="text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl">
        DVaaS
      </h1>
      <p class="mt-4 text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
        Dan Vega as a Service
      </p>
      <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        Access my entire content ecosystem through AI. Connect your AI assistant to 21 tools across my YouTube videos,
        blog posts, speaking engagements, newsletters, and podcast episodes using the Model Context Protocol.
      </p>

      <!-- Server URL Display -->
      <div class="mt-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-6">
        <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-2">MCP Server URL</p>
        <code class="text-base font-mono text-blue-600 dark:text-blue-400 break-all">
          https://mcp.danvega.dev/mcp
        </code>
      </div>

      <!-- CTA Buttons -->
      <div class="mt-8 flex flex-wrap gap-4">
        <a
          href="https://github.com/danvega/dvaas"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
          View on GitHub
        </a>
        <a
          href="#get-started"
          class="rounded-md bg-zinc-800 dark:bg-zinc-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors">
          Get Started
        </a>
      </div>
    </header>

    <div class="mt-24 space-y-24">

      <!-- What is MCP Section -->
      <section>
        <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          What is the Model Context Protocol?
        </h2>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          The Model Context Protocol (MCP) is an open standard for connecting AI applications to external systems.
          Think of it like <strong>USB-C for AI</strong> — just as USB-C provides a standardized way to connect devices,
          MCP provides a standardized way to connect AI applications to data sources and tools.
        </p>

        <!-- MCP Architecture -->
        <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">MCP Host</h3>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              AI applications like Claude Desktop, Cursor, or VSCode that users interact with
            </p>
          </div>

          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">MCP Client</h3>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Maintains 1:1 connections between the host and servers, managing communication
            </p>
          </div>

          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">MCP Server</h3>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Exposes data and tools to AI agents — like DVaaS!
            </p>
          </div>
        </div>

        <div class="mt-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-6 border border-blue-200 dark:border-blue-800">
          <p class="text-sm text-blue-900 dark:text-blue-300">
            <strong>Timeline:</strong> Introduced by Anthropic in November 2024, MCP has been rapidly adopted by major AI companies
            including OpenAI (March 2025) and Google DeepMind (April 2025), making it the universal standard for AI integrations.
          </p>
        </div>
      </section>

      <!-- What is DVaaS Section -->
      <section>
        <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          What is DVaaS?
        </h2>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          DVaaS (Dan Vega as a Service) is an MCP server that makes my entire professional ecosystem accessible to AI assistants.
          Instead of manually searching my website, YouTube channel, or newsletter archives, your AI can instantly access and search
          through all my content to answer your questions.
        </p>

        <!-- Tool Categories -->
        <div class="mt-12 space-y-8">
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">21 Tools Across 5 Categories</h3>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- YouTube Tools -->
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="h-8 w-8 text-red-600" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <h4 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">YouTube Tools</h4>
                <span class="ml-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">4 tools</span>
              </div>
              <p class="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Search videos, get channel statistics, find tutorials by topic, access video metadata
              </p>
            </div>

            <!-- Blog Tools -->
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h4 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Blog Tools</h4>
                <span class="ml-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">4 tools</span>
              </div>
              <p class="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Find blog posts, search content by keyword, get post details, browse by category
              </p>
            </div>

            <!-- Speaking Tools -->
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <h4 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Speaking Tools</h4>
                <span class="ml-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">4 tools</span>
              </div>
              <p class="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                View upcoming engagements, browse speaking archive, get event details, find by date range
              </p>
            </div>

            <!-- Newsletter Tools -->
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h4 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Newsletter Tools</h4>
                <span class="ml-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">4 tools</span>
              </div>
              <p class="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Access newsletter issues, search archives, get subscriber stats, find by topic
              </p>
            </div>

            <!-- Podcast Tools -->
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors md:col-span-2">
              <div class="flex items-center gap-3">
                <svg class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <h4 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Podcast Tools</h4>
                <span class="ml-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">5 tools</span>
              </div>
              <p class="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Browse podcast episodes, search transcripts, get episode data, find guests, access show notes
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Spring AI Integration -->
      <section>
        <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Built with Spring AI
        </h2>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          DVaaS is built using Spring AI, the application framework for AI engineering that brings Spring's proven design
          principles to the AI domain. It showcases how Java developers can leverage familiar Spring patterns to build
          sophisticated MCP servers.
        </p>

        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
            <h4 class="font-semibold text-zinc-800 dark:text-zinc-100">Spring Boot 3.5.5</h4>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Modern Java application foundation</p>
          </div>
          <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
            <h4 class="font-semibold text-zinc-800 dark:text-zinc-100">Spring AI 1.1.0-M3</h4>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">MCP support with Anthropic Claude</p>
          </div>
          <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
            <h4 class="font-semibold text-zinc-800 dark:text-zinc-100">Java 24</h4>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Latest language features & performance</p>
          </div>
        </div>

        <div class="mt-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-6">
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            <strong class="text-zinc-800 dark:text-zinc-100">For Java Developers:</strong> DVaaS serves as a real-world
            example of building MCP servers with Spring AI. The codebase demonstrates strongly-typed configuration,
            conditional tool loading, and the MCP server implementation pattern in a Spring Boot application.
          </p>
        </div>
      </section>

      <!-- How to Use It Section -->
      <section id="get-started">
        <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          How to Use DVaaS
        </h2>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Connect DVaaS to your favorite AI assistant in minutes. No API keys required — the server is publicly accessible.
        </p>

        <div class="mt-8">
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Configuration</h3>
          <p class="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Add DVaaS to your MCP client configuration:
          </p>
          <div class="mt-4 rounded-lg bg-zinc-900 p-6 overflow-x-auto">
            <pre class="text-sm text-zinc-100"><code>{
  "mcpServers": {
    "danvega": {
      "url": "https://mcp.danvega.dev/mcp"
    }
  }
}</code></pre>
          </div>
        </div>

        <div class="mt-12">
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Compatible AI Tools</h3>
          <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 text-center">
              <p class="font-medium text-zinc-800 dark:text-zinc-100">Claude Desktop</p>
            </div>
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 text-center">
              <p class="font-medium text-zinc-800 dark:text-zinc-100">Cursor</p>
            </div>
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 text-center">
              <p class="font-medium text-zinc-800 dark:text-zinc-100">VSCode</p>
            </div>
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 text-center">
              <p class="font-medium text-zinc-800 dark:text-zinc-100">Goose</p>
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-lg bg-green-50 dark:bg-green-950/30 p-6 border border-green-200 dark:border-green-800">
          <p class="text-sm text-green-900 dark:text-green-300">
            <strong>No Setup Required:</strong> DVaaS is hosted and publicly accessible. Just add the configuration and start asking questions!
          </p>
        </div>
      </section>

      <!-- Real-World Examples -->
      <section>
        <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          What Can You Ask?
        </h2>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Here are some example queries you can try with your AI assistant once DVaaS is connected:
        </p>

        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 p-6">
            <p class="text-base font-medium text-zinc-800 dark:text-zinc-100">
              "What are Dan's latest Spring Boot tutorials on YouTube?"
            </p>
          </div>
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20 p-6">
            <p class="text-base font-medium text-zinc-800 dark:text-zinc-100">
              "Find blog posts about Java virtual threads"
            </p>
          </div>
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-green-50 to-transparent dark:from-green-950/20 p-6">
            <p class="text-base font-medium text-zinc-800 dark:text-zinc-100">
              "When is Dan speaking next and at which conferences?"
            </p>
          </div>
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-950/20 p-6">
            <p class="text-base font-medium text-zinc-800 dark:text-zinc-100">
              "Show me podcast episodes where Dan discusses AI and Spring"
            </p>
          </div>
        </div>
      </section>

      <!-- Technical Details -->
      <section>
        <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Technical Details
        </h2>

        <div class="mt-8 space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Architecture</h3>
            <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
              DVaaS implements the MCP server specification with a Spring Boot application that exposes 21 tools through
              the Model Context Protocol. The server uses strongly-typed configuration properties and conditional tool loading
              based on available API credentials.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Self-Hosting</h3>
            <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
              Want to run your own instance? DVaaS is open source and available on GitHub. You'll need Java 24, Maven 3.6+,
              and API keys for the services you want to integrate.
            </p>
            <a
              href="https://github.com/danvega/dvaas"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"></path>
              </svg>
              View on GitHub
            </a>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Future Roadmap</h3>
            <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
              Planned expansions include:
            </p>
            <ul class="mt-4 space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside">
              <li>Social Media Tools (Twitter, LinkedIn integrations)</li>
              <li>Course Management Tools</li>
              <li>Analytics Tools</li>
              <li>Community Integration Tools</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="border-t border-zinc-200 dark:border-zinc-700 pt-12">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Ready to Get Started?
          </h2>
          <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Add DVaaS to your AI assistant and start exploring my content ecosystem through conversational AI.
          </p>

          <div class="mt-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-8">
            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-4">Server URL</p>
            <code class="text-lg font-mono text-blue-600 dark:text-blue-400">
              https://mcp.danvega.dev/mcp
            </code>
          </div>

          <div class="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/danvega/dvaas"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-md bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
              View GitHub Repository
            </a>
            <a
              href="https://docs.spring.io/spring-ai/reference/"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-8 py-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
              Learn About Spring AI
            </a>
          </div>
        </div>
      </section>

    </div>
  </Container>
</template>
