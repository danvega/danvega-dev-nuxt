<script setup lang="ts">
import type { Project } from '~/types/ui'

const { project, mono = false } = defineProps<{
  project: Project
  mono?: boolean
}>()

const isExternal = (url: string) => url.startsWith('http')
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium" :class="{ 'font-mono': mono }">
    <a
      v-if="project.post"
      :href="project.post.url"
      class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
    >
      {{ mono ? './read-the-story' : 'Read the full story' }} <span aria-hidden="true">&rarr;</span>
    </a>
    <a
      v-if="project.url"
      :href="project.url"
      :target="isExternal(project.url) ? '_blank' : undefined"
      :rel="isExternal(project.url) ? 'noopener noreferrer' : undefined"
      class="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
    >
      {{ mono ? './visit' : 'Visit site' }} <span aria-hidden="true">&nearr;</span>
    </a>
    <a
      v-if="project.github"
      :href="project.github"
      target="_blank"
      rel="noopener noreferrer"
      class="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
    >
      {{ mono ? './source' : 'Source on GitHub' }} <span aria-hidden="true">&nearr;</span>
    </a>
  </div>
</template>
