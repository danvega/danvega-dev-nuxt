<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  date?: string
}>()
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-zinc-900 p-16">
    <div class="flex flex-col gap-4">
      <p v-if="date" class="text-xl text-zinc-400">{{ date }}</p>
      <h1 class="text-6xl font-bold leading-tight text-white">{{ title }}</h1>
      <p v-if="description" class="mt-4 text-2xl text-zinc-300 line-clamp-2">{{ description }}</p>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
          <span class="text-2xl font-bold text-white">DV</span>
        </div>
        <div>
          <p class="text-2xl font-semibold text-white">Dan Vega</p>
          <p class="text-lg text-zinc-400">danvega.dev</p>
        </div>
      </div>
    </div>
  </div>
</template>
