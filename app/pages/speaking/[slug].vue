<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { useSpeakingPost } = useSpeakingData()
const { data: talk, error } = await useSpeakingPost(slug)

if (error.value || !talk.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Talk not found'
  })
}

const formattedDate = computed(() => {
  if (!talk.value?.date) return ''
  return new Date(talk.value.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

useHead({
  title: `${talk.value.title} - ${talk.value.conference} | Dan Vega`,
  meta: [
    { name: 'description', content: talk.value.description || '' },
    { property: 'og:title', content: `${talk.value.title} - ${talk.value.conference}` },
    { property: 'og:description', content: talk.value.description || '' }
  ]
})
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <div class="max-w-3xl">
      <!-- Back link -->
      <NuxtLink
        to="/speaking"
        class="group mb-8 inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
      >
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="mr-2 h-4 w-4 stroke-current transition-transform group-hover:-translate-x-1">
          <path d="M9.25 5.75 6.75 8l2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Back to Speaking
      </NuxtLink>

      <!-- Conference badge -->
      <p class="mt-6 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
        <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
        </span>
        <template v-if="talk.conferenceUrl">
          <a :href="talk.conferenceUrl" target="_blank" rel="noopener noreferrer" class="hover:text-blue-500 transition-colors">
            {{ talk.conference }}
          </a>
        </template>
        <template v-else>
          {{ talk.conference }}
        </template>
        <span class="mx-2">&middot;</span>
        {{ formattedDate }}
        <span class="mx-2">&middot;</span>
        {{ talk.location }}
      </p>

      <!-- Title -->
      <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        {{ talk.title }}
      </h1>

      <!-- Description -->
      <p v-if="talk.description" class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        {{ talk.description }}
      </p>

      <!-- Body content (markdown) -->
      <div class="mt-10 prose dark:prose-invert max-w-none">
        <ContentRenderer v-if="talk.body" :value="talk" />
      </div>
    </div>
  </Container>
</template>
