<script setup lang="ts">
import { useDateFormat } from "@vueuse/core/index";

const props = defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true }
});

const formatDatePublished = (date: string) => {
  return useDateFormat(date, "MMMM D, YYYY").value;
};

const readingTime = computed(() => {
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
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
    <!-- Left: Cover Image -->
    <div class="lg:col-span-3">
      <a v-if="post.meta?.cover" :href="`/blog/${post.meta?.slug}`" class="block overflow-hidden rounded-lg">
        <NuxtImg
          :src="getImagePath(post.meta?.date, post.meta?.cover)"
          :alt="post.title"
          class="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="eager"
        />
      </a>
      <a v-else :href="`/blog/${post.meta?.slug}`" class="flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <span v-if="primaryTag" class="text-2xl font-semibold text-zinc-400 dark:text-zinc-500">{{ primaryTag }}</span>
      </a>
    </div>

    <!-- Right: Post Details -->
    <div class="flex flex-col justify-center lg:col-span-2">
      <span class="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
        Latest
      </span>

      <h2 class="mt-4 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        <a :href="`/blog/${post.meta?.slug}`" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {{ post.title }}
        </a>
      </h2>

      <div class="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <time :datetime="post.meta?.date">{{ formatDatePublished(post.meta?.date) }}</time>
        <span v-if="readingTime">&middot; {{ readingTime.text }}</span>
      </div>

      <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400 line-clamp-3">
        {{ post.meta?.shortDesc != null ? post.meta?.shortDesc : post.description }}
      </p>

      <div v-if="post.meta?.tags" class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="tag in post.meta.tags.slice(0, 4)"
          :key="tag"
          class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
        >
          {{ tag }}
        </span>
      </div>

      <div class="mt-6">
        <a
          :href="`/blog/${post.meta?.slug}`"
          class="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          Read article
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1.5 h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
