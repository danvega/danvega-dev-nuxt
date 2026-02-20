<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

const props = defineProps<{
  currentSlug: string
  tags: string[]
}>()

const { useAllBlogPosts } = useBlogData()
const { data: allPosts } = await useAllBlogPosts()

const relatedPosts = computed(() => {
  if (!allPosts.value || !props.tags?.length) return []

  return allPosts.value
    .filter(post => post.meta?.slug !== props.currentSlug && Array.isArray(post.meta?.tags))
    .map(post => {
      const sharedTags = post.meta!.tags!.filter(tag => props.tags.includes(tag))
      return { ...post, score: sharedTags.length }
    })
    .filter(post => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
})

const formatDate = (date: string) => useDateFormat(date, 'MMMM D, YYYY').value
</script>

<template>
  <div v-if="relatedPosts.length > 0" class="mt-16">
    <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
      Related Articles
    </h2>
    <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
      <a
        v-for="post in relatedPosts"
        :key="post._id"
        :href="`/blog/${post.meta?.slug}`"
        class="group rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
      >
        <time class="text-sm text-zinc-500 dark:text-zinc-500">
          {{ formatDate(post.meta?.date) }}
        </time>
        <h3 class="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {{ post.title }}
        </h3>
        <p class="mt-1 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {{ post.meta?.shortDesc || post.description }}
        </p>
      </a>
    </div>
  </div>
</template>
