<script setup lang="ts">
import type { Course } from '~/types/ui'

defineProps({
  course: { type: Object as PropType<Course>, required: true },
  eager: { type: Boolean, default: false }
});
</script>

<template>
  <a
    :href="course.link"
    class="group block rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
  >
    <div class="overflow-hidden">
      <NuxtImg
        :src="`/images/courses/${course.cover}`"
        :alt="course.title"
        width="325"
        height="183"
        sizes="sm:100vw md:50vw lg:325px"
        :loading="eager ? 'eager' : 'lazy'"
        class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div class="p-5">
      <div class="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <span v-if="course.topic">{{ course.topic }}</span>
        <span v-if="course.topic && course.platform">&middot;</span>
        <span v-if="course.platform">{{ course.platform }}</span>
      </div>

      <h3 class="mt-2 text-base font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ course.title }}
      </h3>

      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {{ course.description }}
      </p>
    </div>
  </a>
</template>
