<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })

// Handle specific error types for better UX
const isTimeout = props.error?.statusCode === 504 || props.error?.message?.includes('timeout')
const isServerError = (props.error?.statusCode ?? 0) >= 500
const isNotFound = props.error?.statusCode === 404

const errorTitle = computed(() => {
  if (isTimeout) return 'Request Timed Out'
  if (isNotFound) return 'Page Not Found'
  if (isServerError) return 'Server Error'
  return 'Oops, something went wrong!'
})

const errorMessage = computed(() => {
  if (isTimeout) return 'The request took too long to complete. Please try again in a moment.'
  if (isNotFound) return 'It looks like you have come up empty my friend. It happens once in awhile so don\'t feel bad about it.'
  if (isServerError) return 'We\'re experiencing some technical difficulties. Please try again later.'
  return 'It looks like you have come up empty my friend. It happens once in awhile so don\'t feel bad about it.'
})

function reloadPage() {
  if (process.client) {
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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <NuxtLayout name="default">
    <div class="sm:px-8 mt-16 sm:mt-32">
      <div class="mx-auto w-full max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <header class="max-w-4xl">
              <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {{ errorTitle }}
              </h1>
              <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                {{ errorMessage }}
                <span v-if="!isTimeout">
                  The good news for you is that you can use the navigation above to find what you're looking for.
                  If you are looking for a specific blog post please try using the search. If nothing works and you
                  still need please feel free to <a href="/about" class="text-blue-500 hover:text-blue-400">contact me</a>.
                </span>
              </p>

              <div v-if="isTimeout" class="mt-8">
                <button
                  @click="reloadPage()"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </header>

            <div class="m-8 max-w-4xl flex justify-center items-center">
              <img src="/images/undraw_empty.svg" loading="lazy" alt="Page not found illustration" />
            </div>

            <!-- Popular articles section for 404 -->
            <div v-if="isNotFound" class="max-w-4xl mt-8">
              <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                Popular Articles
              </h2>
              <ul v-if="recentPosts.length" class="mt-6 space-y-4">
                <li v-for="post in recentPosts" :key="post.slug">
                  <a :href="`/blog/${post.slug}`" class="group flex flex-col">
                    <span class="text-base font-medium text-zinc-800 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {{ post.title }}
                    </span>
                    <time class="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                      {{ formatDate(post.date) }}
                    </time>
                  </a>
                </li>
              </ul>
              <div class="mt-8">
                <a href="/blog" class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
                  Browse all articles
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
