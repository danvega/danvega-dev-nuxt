<script setup lang="ts">
defineProps<{
  title: string
  conference: string
  date?: string
  location?: string
}>()
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-zinc-900 p-16">
    <div class="flex flex-col gap-4">
      <p class="flex items-center text-xl text-zinc-400">
        <span class="mr-3 flex h-3 w-3 rounded-full bg-blue-500" />
        {{ conference }}
      </p>
      <h1 class="text-6xl font-bold leading-tight text-white">{{ title }}</h1>
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
      <div v-if="date || location" class="text-right">
        <p v-if="date" class="text-lg text-zinc-300">{{ date }}</p>
        <p v-if="location" class="text-lg text-zinc-400">{{ location }}</p>
      </div>
    </div>
  </div>
</template>
