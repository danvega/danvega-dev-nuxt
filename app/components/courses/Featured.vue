<script setup lang="ts">
import type { Course } from '~/types/ui'

defineProps({
  course: { type: Object as PropType<Course>, required: true }
});
</script>

<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <!-- Left: Cover Image -->
    <div>
      <a :href="course.link" class="block overflow-hidden rounded-lg">
        <NuxtImg
          :src="`/images/courses/${course.cover}`"
          :alt="course.title"
          width="496"
          height="279"
          sizes="sm:100vw lg:496px"
          loading="eager"
          fetchpriority="high"
          class="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </a>
    </div>

    <!-- Right: Course Details -->
    <div class="flex flex-col justify-center">
      <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        <span class="text-blue-600 dark:text-blue-400">Featured Course</span>
        <span v-if="course.topic" class="mx-2 text-zinc-300 dark:text-zinc-600">/</span>
        <span v-if="course.topic">{{ course.topic }}</span>
      </p>

      <h2 class="mt-4 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
        <a :href="course.link" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {{ course.shortTitle ?? course.title }}
        </a>
      </h2>

      <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {{ course.description }}
      </p>

      <div class="mt-5 flex items-center gap-4">
        <a
          :href="course.link"
          class="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Start the course
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
        <span v-if="course.platform" class="text-sm text-zinc-500 dark:text-zinc-500">{{ course.platform }}</span>
      </div>
    </div>
  </div>
</template>
