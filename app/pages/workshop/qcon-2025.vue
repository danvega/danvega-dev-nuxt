<script lang="ts" setup>
definePageMeta({
  middleware: 'workshop-auth'
});

useHead({
  title: 'QCon Workshop 2025 | Dan Vega',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});

const { logout } = useWorkshopAuth()
const config = useRuntimeConfig()
const apiKey = config.public.workshopApiKey || 'API key not configured'

const handleLogout = () => {
  logout()
  navigateTo('/workshop/login')
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center justify-between">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          QCon Spring AI Workshop 2025
        </h1>
        <button
          @click="handleLogout"
          class="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        Welcome to the workshop! Below you'll find all the resources, API keys, and links you'll need for today's session.
      </p>
    </div>

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
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Workshop starter code</p>
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

    <!-- API Keys Section -->
    <section class="mb-24">
      <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
        API Keys & Credentials
      </h2>

      <div class="space-y-6">
        <!-- Example API Key 1 -->
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 p-6">
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            OpenAI API Key
          </h3>
          <div class="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4">
            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-2">API Key</p>
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
              {{ apiKey }}
            </code>
          </div>
          <div class="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 p-4 border border-yellow-200 dark:border-yellow-800">
            <p class="text-sm text-yellow-900 dark:text-yellow-300">
              <strong>Note:</strong> This key is for workshop use only and will be deactivated after the session.
            </p>
          </div>
        </div>
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
            href="https://slides.example.com"
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
            ✨ A community-driven organization for building Spring-based integrations with AI models, agents, vector databases, and more.
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
