<script setup lang="ts">
interface SpeakingEvent {
  title: string
  name: string
  startDate: string
  endDate?: string
  location: string
  description?: string
  url?: string
  slug?: string
}

const { event } = defineProps<{
  event: SpeakingEvent
}>()

const linkTo = computed(() => {
  if (event.slug) return `/speaking/${event.slug}`
  return null
})
</script>

<template>
  <div class="group rounded-lg border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/50 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
    <!-- Thumbnail with overlay link -->
    <div class="aspect-video overflow-hidden relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-5 flex flex-col justify-between">
      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)" />
      <!-- Radial glow -->
      <div class="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
      <div class="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-indigo-400/15 blur-2xl" />

      <div class="relative z-[1]">
        <p class="flex items-center text-xs font-medium text-blue-200/80">
          <span class="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
          {{ event.name }}
        </p>
        <h4 class="mt-2 text-base font-bold leading-snug text-white line-clamp-3">{{ event.title }}</h4>
      </div>
      <div class="relative z-[1] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
            <span class="text-[10px] font-bold text-white">DV</span>
          </div>
          <p class="text-xs font-medium text-blue-100/90">Dan Vega</p>
        </div>
        <p class="text-xs text-blue-200/70">{{ event.location }}</p>
      </div>
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <!-- Clickable overlay -->
      <NuxtLink v-if="linkTo" :to="linkTo" class="absolute inset-0 z-10">
        <span class="sr-only">{{ event.title }}</span>
      </NuxtLink>
      <a v-else-if="event.url" :href="event.url" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-10">
        <span class="sr-only">{{ event.title }}</span>
      </a>
    </div>

    <!-- Card Body -->
    <div class="p-5">
      <!-- Conference badge -->
      <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
        {{ event.name }}
      </span>

      <!-- Title -->
      <h3 class="mt-3 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 line-clamp-2">
        <NuxtLink v-if="linkTo" :to="linkTo" class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          {{ event.title }}
        </NuxtLink>
        <a v-else-if="event.url" :href="event.url" target="_blank" rel="noopener noreferrer" class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          {{ event.title }}
        </a>
        <span v-else>{{ event.title }}</span>
      </h3>

      <!-- Date + Location -->
      <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {{ event.startDate }} &middot; {{ event.location }}
      </p>

      <!-- CTA -->
      <div class="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
        <NuxtLink v-if="linkTo" :to="linkTo" class="flex items-center hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
          View Details
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
        <a v-else-if="event.url" :href="event.url" target="_blank" rel="noopener noreferrer" class="flex items-center hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
          Learn More
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
