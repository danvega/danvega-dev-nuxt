<template>
  <div class="group rounded-md bg-gray-50 dark:bg-zinc-800/50 p-4 border border-gray-200 dark:border-zinc-700/40 transition-all duration-200 hover:bg-gray-100 hover:dark:bg-zinc-800/70 hover:shadow-md hover:border-amber-300 hover:dark:border-amber-600/50">
    <div class="flex">
      <div class="flex-shrink-0">
        <LightBulbIcon class="h-5 w-5 text-amber-500 dark:text-amber-400 stroke-current transition-all duration-200 group-hover:text-amber-600 group-hover:dark:text-amber-300 group-hover:drop-shadow-sm" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-gray-800 dark:text-zinc-200 mt-0">{{ props.title }}</h3>
        <div class="mt-2 text-sm text-gray-700 dark:text-zinc-300">
          <div><slot /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LightBulbIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    default: 'Tip'
  }
})
</script>