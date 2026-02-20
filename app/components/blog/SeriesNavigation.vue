<script setup lang="ts">
const props = defineProps<{
  series: string
  seriesTitle?: string
  currentSlug: string
}>()

const { useSeriesPosts } = useBlogData()
const { data: seriesPosts } = await useSeriesPosts(props.series)

const currentIndex = computed(() =>
  seriesPosts.value?.findIndex(p => p.slug === props.currentSlug) ?? -1
)

const prevPost = computed(() =>
  currentIndex.value > 0 ? seriesPosts.value?.[currentIndex.value - 1] : null
)

const nextPost = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < (seriesPosts.value?.length ?? 0) - 1
    ? seriesPosts.value?.[currentIndex.value + 1]
    : null
)
</script>

<template>
  <div v-if="seriesPosts && seriesPosts.length > 1" class="my-8 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
    <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      {{ seriesTitle || `Series: ${series}` }}
    </h3>
    <ol class="mt-4 space-y-2">
      <li
        v-for="(post, index) in seriesPosts"
        :key="post.slug"
        class="flex items-center gap-2 text-sm"
      >
        <span class="flex-none w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
          :class="post.slug === currentSlug
            ? 'bg-blue-500 text-white'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'"
        >
          {{ index + 1 }}
        </span>
        <a
          v-if="post.slug !== currentSlug"
          :href="`/blog/${post.slug}`"
          class="text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          {{ post.title }}
        </a>
        <span v-else class="font-medium text-zinc-800 dark:text-zinc-100">
          {{ post.title }}
        </span>
      </li>
    </ol>
    <div v-if="prevPost || nextPost" class="mt-4 flex justify-between gap-4 border-t border-zinc-200 dark:border-zinc-700 pt-4">
      <a
        v-if="prevPost"
        :href="`/blog/${prevPost.slug}`"
        class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
      >
        &larr; {{ prevPost.title }}
      </a>
      <span v-else />
      <a
        v-if="nextPost"
        :href="`/blog/${nextPost.slug}`"
        class="text-sm text-right text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
      >
        {{ nextPost.title }} &rarr;
      </a>
    </div>
  </div>
</template>
