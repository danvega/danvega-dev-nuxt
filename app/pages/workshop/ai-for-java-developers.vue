<script lang="ts" setup>
const repoUrl = 'https://github.com/danvega/spring-ai-workshop'
const slidesUrl = 'https://github.com/danvega/spring-ai-workshop/tree/main/slides'
const keyUrl = 'https://workshop.danvega.dev'
const jdkVersion = '26'

const details = [
  { label: 'When', value: 'Thursday, Nov 19, 2026 at 9:00 AM PST' },
  { label: 'Length', value: '3 hours' },
  { label: 'Where', value: 'Seacliff D, Hyatt Regency San Francisco' },
  { label: 'Level', value: 'Beginner to intermediate' }
]

const instructors = [
  { name: 'Dan Vega', title: 'Spring Developer Advocate at Broadcom, Java Champion' },
  { name: 'Nate Schutta', title: 'Software Architect at Thoughtworks, Java Champion, author' }
]

const prerequisites = [
  `JDK ${jdkVersion} or later`,
  'IntelliJ IDEA or the IDE you like best',
  'Git',
  'Docker Desktop',
  'Comfort with Spring Boot. No AI experience needed.'
]

const labs = [
  {
    title: 'Talk to a model',
    body: 'Use the ChatClient to send your first prompt. Then point the same code at a different model with one config change.'
  },
  {
    title: 'Prompt templates',
    body: 'Move prompts out of your Java code into reusable templates with variables.'
  },
  {
    title: 'Structured output',
    body: 'Turn a model response into a Java record you can use in your domain.'
  },
  {
    title: 'Tool calling',
    body: 'Let the model call your Java methods to fetch live data and take real actions.'
  },
  {
    title: 'Build an MCP server',
    body: 'Expose your app to any MCP client, like Claude Code or your IDE, with the Model Context Protocol.'
  }
]

const cloneCommands = `git clone ${repoUrl}.git
cd spring-ai-workshop
./mvnw spring-boot:run`

const resources = [
  { title: 'GitHub Repository', body: 'The code we build together, plus more demos to try later.', url: repoUrl },
  { title: 'Slides', body: 'The workshop slides.', url: slidesUrl },
  { title: 'Spring AI Reference', body: 'The official Spring AI documentation.', url: 'https://docs.spring.io/spring-ai/reference/index.html' },
  { title: 'Spring AI Community', body: 'Community projects for models, agents, vector stores, and more.', url: 'https://github.com/spring-ai-community' }
]

const copied = ref<string | null>(null)

async function copy(id: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = id
    setTimeout(() => { if (copied.value === id) copied.value = null }, 2000)
  } catch {
    copied.value = null
  }
}

useHead({
  title: 'AI for Java Developers Workshop | Dan Vega',
  meta: [
    { name: 'title', content: 'AI for Java Developers Workshop' },
    { name: 'description', content: 'A 3-hour hands-on Spring AI workshop at QCon San Francisco 2026. Build an AI-powered Spring Boot app one feature at a time.' },
    { property: 'og:title', content: 'AI for Java Developers Workshop' },
    { property: 'og:description', content: 'Hands-on Spring AI at QCon San Francisco 2026 with Dan Vega and Nate Schutta.' }
  ]
})
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- Header -->
    <header class="mb-16">
      <p class="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        QCon San Francisco 2026
      </p>
      <h1 class="mt-2 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        AI for Java Developers
      </h1>
      <p class="mt-6 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        You don't need Python to build AI apps. In three hours you'll code along with us and leave with a working AI-powered Spring Boot app that you understand top to bottom.
      </p>

      <dl class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in details"
          :key="item.label"
          class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-4"
        >
          <dt class="text-sm font-semibold text-zinc-500">{{ item.label }}</dt>
          <dd class="mt-1 text-base text-zinc-800 dark:text-zinc-100">{{ item.value }}</dd>
        </div>
      </dl>

      <div class="mt-8 flex flex-wrap gap-4">
        <a
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          Get the code
        </a>
        <a
          :href="slidesUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-6 py-3 text-base font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
        >
          Slides
        </a>
      </div>
    </header>

    <!-- Setup -->
    <section class="mb-24" aria-labelledby="setup-heading">
      <h2 id="setup-heading" class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Before we start
      </h2>
      <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        Get these three steps done first. If anything breaks, raise your hand and one of us will come help.
      </p>

      <div class="mt-10 space-y-12">
        <!-- Step 1 -->
        <div>
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">1. Install the tools</h3>
          <ul class="mt-4 space-y-2">
            <li
              v-for="item in prerequisites"
              :key="item"
              class="flex gap-3 text-base text-zinc-600 dark:text-zinc-400"
            >
              <svg class="mt-1 h-5 w-5 flex-none text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Step 2 -->
        <div>
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">2. Set up the API key</h3>
          <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            You don't need your own OpenAI account today. We'll share a key for the workshop. Open the key page, enter the room code from the screen, and copy the line it gives you into the terminal where you run the app.
          </p>

          <div class="mt-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-6">
            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Key page (live during the workshop)</p>
            <a
              :href="keyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-base font-mono text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 break-all"
            >
              workshop.danvega.dev
            </a>
          </div>

          <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            The repo reads the key from <code class="font-mono text-blue-600 dark:text-blue-400">OPENAI_API_KEY</code>, so there's nothing else to change. Running from IntelliJ? Add <code class="font-mono">OPENAI_API_KEY</code> to your run configuration under Environment variables.
          </p>

          <div class="mt-6 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 p-6 border border-yellow-200 dark:border-yellow-800">
            <p class="text-sm text-yellow-900 dark:text-yellow-300">
              <strong>Keep the key out of your code.</strong> Use the environment variable and don't paste the key into a file you commit. If it lands on GitHub, OpenAI turns it off for the whole room.
            </p>
            <p class="mt-2 text-sm text-yellow-900 dark:text-yellow-300">
              The workshop key is deleted after the session. To keep going at home, create your own at
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" class="underline">platform.openai.com</a>.
            </p>
          </div>
        </div>

        <!-- Step 3 -->
        <div>
          <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">3. Clone and run the app</h3>
          <div class="mt-4 flex items-center justify-end">
            <button
              type="button"
              class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              @click="copy('clone', cloneCommands)"
            >
              {{ copied === 'clone' ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <div class="mt-2 rounded-lg bg-zinc-900 p-6 overflow-x-auto">
            <pre class="text-sm text-zinc-100"><code>{{ cloneCommands }}</code></pre>
          </div>
          <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            The app starts on <code class="font-mono text-blue-600 dark:text-blue-400">http://localhost:8080</code>. On Windows, use <code class="font-mono">mvnw.cmd</code> instead of <code class="font-mono">./mvnw</code>.
          </p>
        </div>
      </div>
    </section>

    <!-- Labs -->
    <section class="mb-24" aria-labelledby="labs-heading">
      <h2 id="labs-heading" class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        What we'll build together
      </h2>
      <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        One feature at a time, each one building on the last.
      </p>
      <ol class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <li
          v-for="(lab, index) in labs"
          :key="lab.title"
          class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-base font-bold text-blue-600 dark:text-blue-400">
            {{ index + 1 }}
          </div>
          <h3 class="mt-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">{{ lab.title }}</h3>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ lab.body }}</p>
        </li>
      </ol>
      <p class="mt-8 text-base text-zinc-600 dark:text-zinc-400">
        Finish early? The repo has more demos to explore on your own: chat memory, advisors, streaming, RAG, multimodal, guardrails, and evals.
      </p>
    </section>

    <!-- Resources -->
    <section class="mb-24" aria-labelledby="resources-heading">
      <h2 id="resources-heading" class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Resources
      </h2>
      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <a
          v-for="item in resources"
          :key="item.title"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
        >
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ item.body }}</p>
        </a>
      </div>
    </section>

    <!-- Instructors -->
    <section class="mb-24" aria-labelledby="instructors-heading">
      <h2 id="instructors-heading" class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Your instructors
      </h2>
      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="person in instructors"
          :key="person.name"
          class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6"
        >
          <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{{ person.name }}</h3>
          <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{{ person.title }}</p>
        </div>
      </div>
    </section>

    <!-- Help -->
    <section>
      <div class="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-8 text-center">
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Questions?</h2>
        <p class="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          During the workshop, raise your hand. We'll come to you.
        </p>
        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          After the workshop, you can reach me at
          <NuxtLink to="/about" class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">danvega.dev/about</NuxtLink>.
        </p>
      </div>
    </section>
  </Container>
</template>
