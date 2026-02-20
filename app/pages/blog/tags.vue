<script setup lang="ts">
useHead({
  title: 'Browse by Topic | Dan Vega',
  meta: [
    { name: 'title', content: 'Browse by Topic' },
    { name: 'description', content: 'Browse blog posts by topic and tag.' }
  ]
})

const { useAllTags } = useBlogData()
const { data: tags } = await useAllTags()
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Browse by Topic
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        Explore articles organized by topic. Click any tag to see all related posts.
      </p>
    </header>
    <div class="mt-12 flex flex-wrap gap-3">
      <a
        v-for="tag in tags"
        :key="tag.name"
        :href="`/blog?tag=${encodeURIComponent(tag.name)}`"
        class="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {{ tag.name }}
        <span class="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {{ tag.count }}
        </span>
      </a>
    </div>
    <div class="mt-8">
      <a href="/blog" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
        &larr; Back to all articles
      </a>
    </div>
  </Container>
</template>
