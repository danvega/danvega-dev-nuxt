<script lang="ts" setup="" xmlns="http://www.w3.org/1999/html">
import {useDateFormat} from "@vueuse/core";

useHead({
  title: 'Dan Vega - Newsletter',
  meta: [
    { name: 'title', content: 'Dan Vega - Newsletter' },
    { name: 'description', content: 'My Weekly(ish) Newsletter' }
  ]
});

// Use enhanced newsletter data fetching with limit of 10
const { useLatestNewsletterPosts } = useNewsletterData()
const { data: news } = await useLatestNewsletterPosts(10)

const extractDateFromPath = (path?: string) => {
  const match = path?.match(/\/newsletter\/(\d{4})\/(\d{2})\/(\d{2})\//)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return undefined
}

const formatDatePublished = (date?: string) => {
  if (!date) return '';
  const formatted = useDateFormat(date, "MMMM D, YYYY");
  return formatted.value;
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-2xl">
      <p class="font-mono text-sm text-green-600 dark:text-green-400">$ ls ~/newsletters</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Words, shipped weekly.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I write two newsletters: a weekly(ish) letter on Java, Spring, and whatever I'm learning, and
        ByteSized AI — practical AI for developers in small, digestible doses.
      </p>
    </header>

    <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- the-weeklyish.md -->
      <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
        <div class="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
          <span class="h-3 w-3 rounded-full bg-red-500"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span class="h-3 w-3 rounded-full bg-green-500"></span>
          <span class="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">the-weeklyish.md</span>
        </div>
        <div class="p-6">
          <p class="font-mono text-sm text-zinc-500 dark:text-zinc-400"><span class="text-green-600 dark:text-green-400">~</span> every Monday morning</p>
          <h2 class="mt-2 text-xl font-semibold text-zinc-800 dark:text-zinc-100">The Weekly(ish)</h2>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Java, Spring, career notes, and what I'm learning — a no-pressure weekly letter from me to you.
          </p>
          <form action="/api/beehiiv/subscribe" method="post" class="mt-6 flex gap-3">
            <input type="hidden" name="campaign" value="newsletter" />
            <input type="email" name="email" required placeholder="you@example.com" aria-label="Email address"
                   class="min-w-0 flex-auto rounded-md border-0 px-3 py-2 font-mono text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-600" />
            <button type="submit" class="rounded-md bg-zinc-800 dark:bg-zinc-700 px-4 py-2 font-mono text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors">
              ./subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- bytesized-ai.md -->
      <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
        <div class="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
          <span class="h-3 w-3 rounded-full bg-red-500"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span class="h-3 w-3 rounded-full bg-green-500"></span>
          <span class="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">bytesized-ai.md</span>
        </div>
        <div class="p-6">
          <p class="font-mono text-sm text-zinc-500 dark:text-zinc-400"><span class="text-green-600 dark:text-green-400">~</span> bytesizedai.dev</p>
          <h2 class="mt-2 text-xl font-semibold text-zinc-800 dark:text-zinc-100">ByteSized AI</h2>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            AI for developers in bite-sized pieces — tools, models, and techniques that actually matter.
          </p>
          <div class="mt-6">
            <a href="https://bytesizedai.dev" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
              ./visit --bytesizedai
            </a>
          </div>
        </div>
      </div>
    </div>

    <section class="mt-16 sm:mt-20">
      <p class="font-mono text-sm text-green-600 dark:text-green-400">$ newsletter --history</p>
      <div class="mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
        <div class="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
          <span class="h-3 w-3 rounded-full bg-red-500"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span class="h-3 w-3 rounded-full bg-green-500"></span>
          <span class="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">recent-issues.log</span>
        </div>
        <div class="divide-y divide-zinc-200 dark:divide-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/50">
          <a v-for="post in news" :key="post._id" :href="`/newsletter/${post.meta?.slug}`"
             class="group block px-6 py-5 hover:bg-white dark:hover:bg-zinc-800 transition-colors">
            <time class="font-mono text-xs text-zinc-500 dark:text-zinc-400" :datetime="extractDateFromPath(post.path)">
              <span class="text-green-600 dark:text-green-400">~</span> {{ formatDatePublished(extractDateFromPath(post.path)) }}
            </time>
            <h3 class="mt-1 text-base font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ post.title }}
            </h3>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{{ post.description }}</p>
          </a>
        </div>
      </div>
    </section>

  </Container>
</template>
