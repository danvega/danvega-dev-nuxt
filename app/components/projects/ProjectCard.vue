<script setup lang="ts">
import type { Project } from '~/types/ui'

const { project } = defineProps<{
  project: Project
}>()

const statusColors: Record<string, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  'in-progress': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  archived: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
}

const statusLabels: Record<string, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
  archived: 'Archived'
}

const gradientColors = [
  'from-blue-600 via-blue-700 to-indigo-900',
  'from-purple-600 via-purple-700 to-indigo-900',
  'from-green-600 via-green-700 to-teal-900',
  'from-orange-600 via-orange-700 to-red-900',
  'from-pink-600 via-pink-700 to-purple-900',
  'from-teal-600 via-teal-700 to-cyan-900',
  'from-indigo-600 via-indigo-700 to-blue-900'
]

const gradientIndex = project.slug.length % gradientColors.length
const gradient = gradientColors[gradientIndex]
</script>

<template>
  <div class="group rounded-lg border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/50 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
    <!-- Screenshot or gradient placeholder -->
    <div class="aspect-video overflow-hidden relative bg-gradient-to-br" :class="gradient">
      <!-- Grid pattern overlay (placeholder) -->
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)" />
      <!-- Radial glow -->
      <div class="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div class="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <!-- Project title overlay -->
      <div class="relative z-[1] flex items-center justify-center h-full p-6">
        <h3 class="text-xl font-bold text-white text-center">{{ project.title }}</h3>
      </div>
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>

    <!-- Card body -->
    <div class="p-5">
      <!-- Status badge -->
      <span v-if="project.status" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" :class="statusColors[project.status]">
        {{ statusLabels[project.status] }}
      </span>

      <!-- Title -->
      <h3 class="mt-3 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        {{ project.title }}
      </h3>

      <!-- Description -->
      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
        {{ project.description }}
      </p>

      <!-- Tech stack pills -->
      <div v-if="project.techStack.length" class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="tech in project.techStack"
          :key="tech"
          class="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Action links -->
      <div class="mt-4 flex items-center gap-4">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
          GitHub
        </a>
        <a
          v-if="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Visit
        </a>
      </div>
    </div>
  </div>
</template>
