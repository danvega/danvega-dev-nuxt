<template>
  <div class="group rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800 transition-all duration-200 hover:bg-blue-100 hover:dark:bg-blue-900/30 hover:shadow-md hover:border-blue-300 hover:dark:border-blue-700 mb-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <!-- GitHub Package Icon -->
        <svg class="h-6 w-6 text-blue-600 dark:text-blue-400 transition-all duration-200 group-hover:text-blue-700 group-hover:dark:text-blue-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-4 flex-1">
        <h3 class="text-sm font-semibold text-blue-900 dark:text-blue-100 mt-0 mb-1 flex items-center">
          📦 Get the Code
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          <slot />
        </p>
        <p class="text-sm text-blue-800 dark:text-blue-200 mt-1">
          <a :href="url" target="_blank" class="font-medium underline hover:no-underline transition-all duration-200">
            {{ cleanUrl }}
          </a>
        </p>
      </div>
      <div class="ml-4 flex-shrink-0">
        <a
          :href="url"
          target="_blank"
          class="inline-flex items-center rounded-md bg-blue-600 dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          View Repo
          <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

// Clean display URL
const cleanUrl = computed(() => {
  return props.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
})
</script>