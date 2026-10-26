<script setup lang="ts">
import type { Project } from '~/types/ui'

const { project, size = 'md' } = defineProps<{
  project: Project
  size?: 'md' | 'lg'
}>()
</script>

<template>
  <img
    v-if="project.icon"
    :src="`/images/projects/icons/${project.icon}`"
    alt=""
    class="shrink-0 rounded-[22%] bg-white object-cover outline outline-1 -outline-offset-1 outline-black/5 dark:bg-zinc-800 dark:outline-white/10"
    :class="size === 'lg' ? 'size-14' : 'size-10'"
  >
  <div
    v-else
    class="flex shrink-0 items-center justify-center rounded-[22%] font-mono font-semibold text-white outline outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
    :class="size === 'lg' ? 'size-14 text-base' : 'size-10 text-xs'"
    :style="{ backgroundColor: project.accent ?? '#3f3f46' }"
    aria-hidden="true"
  >
    {{ project.monogram ?? project.title.charAt(0) }}
  </div>
</template>
