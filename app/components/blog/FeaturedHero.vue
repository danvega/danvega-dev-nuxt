<script setup lang="ts">
import { useDateFormat } from "@vueuse/core/index";

const props = defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true }
});

const formatDatePublished = (date: string) => {
  return useDateFormat(date, "MMMM D, YYYY").value;
};

const readingTime = computed(() => {
  if (props.post?.readingTime) return props.post.readingTime;
  if (!props.post?.body) return null;
  return useReadingTime(props.post.body);
});

const getImagePath = (date: string, cover: string) => {
  if (cover) {
    const createdOn = new Date(date);
    const year = createdOn.getFullYear();
    const month = `${createdOn.getMonth() + 1 < 10 ? '0' : ''}${createdOn.getMonth() + 1}`;
    const day = `${createdOn.getDate() < 10 ? '0' : ''}${createdOn.getDate()}`;
    return `/images/blog/${year}/${month}/${day}/${cover.replace('./', '')}`;
  }
};

const primaryTag = computed(() => {
  const tags = props.post.meta?.tags;
  return tags && tags.length > 0 ? tags[0] : null;
});
</script>

<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <!-- Left: Cover Image -->
    <div>
      <a v-if="post.meta?.cover" :href="`/blog/${post.meta?.slug}`" class="block overflow-hidden rounded-lg">
        <NuxtImg
          :src="getImagePath(post.meta?.date, post.meta?.cover)"
          :alt="post.title"
          class="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="eager"
        />
      </a>
      <a v-else :href="`/blog/${post.meta?.slug}`" class="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <span v-if="primaryTag" class="text-2xl font-semibold text-zinc-400 dark:text-zinc-500">{{ primaryTag }}</span>
      </a>
    </div>

    <!-- Right: Post Details -->
    <div class="flex flex-col justify-center">
      <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        <span v-if="primaryTag" class="text-blue-600 dark:text-blue-400">{{ primaryTag }}</span>
        <span v-if="primaryTag" class="mx-2 text-zinc-300 dark:text-zinc-600">/</span>
        <time :datetime="post.meta?.date">{{ formatDatePublished(post.meta?.date) }}</time>
      </p>

      <h2 class="mt-4 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
        <a :href="`/blog/${post.meta?.slug}`" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {{ post.title }}
        </a>
      </h2>

      <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 line-clamp-3">
        {{ post.meta?.shortDesc != null ? post.meta?.shortDesc : post.description }}
      </p>

      <div class="mt-5 flex items-center gap-4">
        <a
          :href="`/blog/${post.meta?.slug}`"
          class="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Read article
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
        <span v-if="readingTime" class="text-sm text-zinc-500 dark:text-zinc-500">{{ readingTime.text }}</span>
      </div>
    </div>
  </div>
</template>
