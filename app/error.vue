<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

// Handle specific error types for better UX
const isTimeout = props.error?.statusCode === 504 || props.error?.message?.includes('timeout')
const isServerError = (props.error?.statusCode ?? 0) >= 500
const isNotFound = props.error?.statusCode === 404

const route = useRoute()
const requestedPath = computed(() => route.fullPath || '/')

const errorTitle = computed(() => {
  if (isTimeout) return 'Request Timed Out'
  if (isServerError) return 'Server Error'
  return 'Oops, something went wrong!'
})

const errorMessage = computed(() => {
  if (isTimeout) return 'The request took too long to complete. Please try again in a moment.'
  if (isServerError) return 'We\'re experiencing some technical difficulties. Please try again later.'
  return 'It looks like you have come up empty my friend. It happens once in awhile so don\'t feel bad about it.'
})

function reloadPage() {
  if (import.meta.client) {
    window.location.reload()
  }
}

// Fetch recent posts client-side only
const recentPosts = ref<{ slug: string; title: string; date: string }[]>([])

onMounted(async () => {
  if (!isNotFound) return
  try {
    const posts = await queryCollection('blog')
      .where('published', '=', true)
      .order('date', 'DESC')
      .limit(3)
      .all()
    recentPosts.value = posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      date: post.date
    }))
  } catch {
    // Silently fail
  }
})

const shortDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<template>
  <NuxtLayout name="default">
    <Container class="py-16 sm:py-32">
      <!-- Non-404 errors keep a straightforward treatment -->
      <div v-if="!isNotFound" class="mx-auto max-w-2xl lg:max-w-5xl">
        <header class="max-w-4xl">
          <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {{ errorTitle }}
          </h1>
          <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {{ errorMessage }}
            <span v-if="!isTimeout">
              The good news for you is that you can use the navigation above to find what you're looking for.
              If nothing works and you still need help, please feel free to
              <a href="/about" class="text-blue-500 hover:text-blue-400">contact me</a>.
            </span>
          </p>

          <div v-if="isTimeout" class="mt-8">
            <button
              @click="reloadPage()"
              class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        </header>
      </div>

      <!-- 404: a shell session that comes up empty -->
      <div v-else class="mx-auto max-w-2xl lg:max-w-3xl">
        <header class="max-w-2xl">
          <p class="font-mono text-sm text-green-600 dark:text-green-400">$ cd {{ requestedPath }}</p>
          <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            No such file or directory.
          </h1>
          <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            That path doesn't exist on this machine. Happens to all of us. Here's what
            <span class="font-mono text-zinc-800 dark:text-zinc-200">ls</span> turns up instead.
          </p>
        </header>

        <div class="mt-12 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div class="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
            <span class="h-3 w-3 rounded-full bg-red-500"></span>
            <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span class="h-3 w-3 rounded-full bg-green-500"></span>
            <span class="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">danvega@dev — zsh</span>
          </div>

          <div class="space-y-1 overflow-x-auto p-6 font-mono text-sm leading-relaxed">
            <p class="text-zinc-500 dark:text-zinc-400">
              <span class="text-green-600 dark:text-green-400">$</span>
              <span class="ml-2 text-zinc-800 dark:text-zinc-200">cat {{ requestedPath }}</span>
            </p>
            <p class="text-red-600 dark:text-red-400">cat: {{ requestedPath }}: No such file or directory</p>
            <p class="text-zinc-500 dark:text-zinc-500">exit 404</p>

            <p class="pt-4 text-zinc-500 dark:text-zinc-400">
              <span class="text-green-600 dark:text-green-400">$</span>
              <span class="ml-2 text-zinc-800 dark:text-zinc-200">ls -lt ~/blog | head -3</span>
            </p>
            <ul v-if="recentPosts.length" class="space-y-1">
              <li v-for="post in recentPosts" :key="post.slug" class="flex gap-3">
                <span class="hidden shrink-0 text-zinc-400 sm:inline dark:text-zinc-600">-rw-r--r--</span>
                <span class="shrink-0 text-zinc-400 dark:text-zinc-600">{{ shortDate(post.date) }}</span>
                <a :href="`/blog/${post.slug}`" class="break-all text-blue-600 transition-colors hover:text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                  {{ post.slug }}.md
                </a>
              </li>
            </ul>
            <p v-else class="text-zinc-400 dark:text-zinc-600">loading…</p>

            <p class="pt-4 text-zinc-500 dark:text-zinc-400">
              <span class="text-green-600 dark:text-green-400">$</span>
              <span class="ml-2 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-zinc-800 align-middle dark:bg-zinc-200"></span>
            </p>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-4">
          <a href="/blog" class="rounded-md bg-zinc-800 px-4 py-2 font-mono text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600">
            ./browse --all
          </a>
          <a href="/" class="rounded-md border border-zinc-300 bg-white px-4 py-2 font-mono text-sm font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
            cd ~
          </a>
        </div>
      </div>
    </Container>
  </NuxtLayout>
</template>
