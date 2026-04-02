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

const tagGradientClass = computed(() => {
  const tag = primaryTag.value?.toLowerCase() || '';
  if (tag.includes('spring') || tag.includes('java')) {
    return 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20';
  }
  if (tag.includes('ai')) {
    return 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20';
  }
  if (tag.includes('vue') || tag.includes('nuxt')) {
    return 'from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20';
  }
  return 'from-zinc-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-700/30';
});
</script>

<template>
  <a
    :href="`/blog/${post.meta?.slug}`"
    class="group block rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
  >
    <!-- Cover Image or Gradient Fallback -->
    <div v-if="post.meta?.cover" class="overflow-hidden">
      <NuxtImg
        :src="getImagePath(post.meta?.date, post.meta?.cover)"
        :alt="post.title"
        class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div v-else class="flex aspect-video items-center justify-center bg-gradient-to-br" :class="tagGradientClass">
      <span v-if="primaryTag" class="text-lg font-semibold text-zinc-400 dark:text-zinc-500">{{ primaryTag }}</span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <time :datetime="post.meta?.date">{{ formatDatePublished(post.meta?.date) }}</time>
        <span v-if="readingTime">&middot; {{ readingTime.text }}</span>
      </div>

      <h3 class="mt-2 text-base font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ post.title }}
      </h3>

      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {{ post.meta?.shortDesc != null ? post.meta?.shortDesc : post.description }}
      </p>
    </div>
  </a>
</template>
