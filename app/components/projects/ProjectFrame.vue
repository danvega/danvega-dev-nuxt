<script setup lang="ts">
import type { Project } from '~/types/ui'

const { project, eager = false } = defineProps<{
  project: Project
  eager?: boolean
}>()
</script>

<template>
  <!-- Browser and terminal frames stay dark in both themes so screenshots read as real windows -->
  <div
    v-if="project.frame !== 'bare'"
    class="overflow-hidden rounded-xl bg-zinc-900 shadow-2xl shadow-zinc-800/10 ring-1 ring-zinc-900/10 dark:shadow-none dark:ring-white/10"
  >
    <div class="flex items-center gap-2 border-b border-white/10 bg-zinc-800 px-4 py-3">
      <span class="size-3 shrink-0 rounded-full bg-red-500" />
      <span class="size-3 shrink-0 rounded-full bg-yellow-500" />
      <span class="size-3 shrink-0 rounded-full bg-green-500" />
      <div
        v-if="project.frame === 'browser'"
        class="ml-3 min-w-0 flex-1 truncate rounded-md bg-zinc-900/70 px-3 py-1 font-mono text-xs text-zinc-400"
      >
        {{ project.frameLabel }}
      </div>
      <div v-else class="ml-2 min-w-0 truncate font-mono text-xs text-zinc-400">
        {{ project.frameLabel }}
      </div>
    </div>
    <NuxtImg
      :src="`/images/projects/${project.image}`"
      alt=""
      width="1920"
      sizes="100vw lg:960px"
      class="aspect-[16/10] w-full object-cover object-left-top"
      :loading="eager ? 'eager' : 'lazy'"
    />
  </div>
  <div
    v-else
    class="overflow-hidden rounded-xl bg-zinc-900 shadow-2xl shadow-zinc-800/10 ring-1 ring-zinc-900/10 dark:shadow-none dark:ring-white/10"
  >
    <NuxtImg
      :src="`/images/projects/${project.image}`"
      alt=""
      width="1920"
      sizes="100vw lg:960px"
      class="aspect-[16/10] w-full object-cover object-left-top"
      :loading="eager ? 'eager' : 'lazy'"
    />
  </div>
</template>
