<script setup lang="ts">
const props = defineProps({
  error: Object
})

// Log error for debugging (only in development)
if (process.dev && props.error) {
  console.error('Error occurred:', props.error)
}

// Handle specific error types for better UX
const isTimeout = props.error?.statusCode === 504 || props.error?.message?.includes('timeout')
const isServerError = props.error?.statusCode >= 500
const isNotFound = props.error?.statusCode === 404

const errorTitle = computed(() => {
  if (isTimeout) return 'Request Timed Out'
  if (isNotFound) return 'Page Not Found'
  if (isServerError) return 'Server Error'
  return 'Oops, something went wrong!'
})

const errorMessage = computed(() => {
  if (isTimeout) return 'The request took too long to complete. Please try again in a moment.'
  if (isNotFound) return 'It looks like you have come up empty my friend. It happens once in awhile so don\'t feel bad about it.'
  if (isServerError) return 'We\'re experiencing some technical difficulties. Please try again later.'
  return 'It looks like you have come up empty my friend. It happens once in awhile so don\'t feel bad about it.'
})

// Function to reload the page for timeout errors
function reloadPage() {
  if (process.client) {
    window.location.reload()
  }
}

</script>

<template>
  <NuxtLayout name="default">
    <Container class="mt-16 sm:mt-32">
      <header class="max-w-4xl">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {{ errorTitle }}
        </h1>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {{ errorMessage }}
          <span v-if="!isTimeout">
            The good news for you is that you can use the navigation above to find what you're looking for.
            If you are looking for a specific blog post please try using the search. If nothing works and you
            still need please feel free to <NuxtLink to="/about">contact me</NuxtLink>.
          </span>
        </p>

        <!-- Show retry button for timeout errors -->
        <div v-if="isTimeout" class="mt-8">
          <button
            @click="reloadPage()"
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>

        <!-- Show error code in development -->
        <div v-if="process.dev && error" class="mt-4 text-sm text-gray-500">
          Error Code: {{ error.statusCode || 500 }}
        </div>
      </header>
      <div class="m-8 max-w-4xl flex justify-center items-center">
        <NuxtImg src="/images/undraw_empty.svg" loading="lazy"/>
      </div>
    </Container>
  </NuxtLayout>
</template>