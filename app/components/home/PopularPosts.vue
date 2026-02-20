<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

const { data: posts } = await useAsyncData('featured-posts', async () => {
  try {
    const results = await queryCollection('blog')
      .where('published', '=', true)
      .where('featured', '=', true)
      .order('date', 'DESC')
      .limit(5)
      .all()

    return results.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      date: post.date
    }))
  } catch {
    return []
  }
}, {
  default: () => [],
  server: true
})

const formatDate = (date: string) => useDateFormat(date, 'MMM D, YYYY').value
</script>

<template>
  <div v-if="posts && posts.length > 0" class="mt-12">
    <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6 flex-none">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
      <span class="ml-3">Popular Posts</span>
    </h2>
    <ul class="mt-6 space-y-4">
      <li v-for="post in posts" :key="post.slug">
        <a
          :href="`/blog/${post.slug}`"
          class="group flex flex-col"
        >
          <span class="text-sm font-medium text-zinc-800 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            {{ post.title }}
          </span>
          <time class="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            {{ formatDate(post.date) }}
          </time>
        </a>
      </li>
    </ul>
  </div>
</template>
