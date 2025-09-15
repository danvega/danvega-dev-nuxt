<script setup lang="ts">
import events from "../../../assets/data/events.json";

useHead({
  title: 'Dan Vega - Speaking Archives',
  meta: [
    { name: 'title', content: 'Dan Vega - Speaking Archives' },
    { name: 'description', content: 'Archive of past speaking engagements and events' }
  ]
});

const archives = events
  .filter((event) => {
    const eventDate = new Date(event.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  })
  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <div class="w-full max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-8">
        Speaking Archives
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Over the years, I've had the privilege of sharing knowledge and insights at some of the most prestigious tech conferences around the globe. From SpringOne and VMware Explore to JavaOne and various Java User Groups, I've engaged with diverse audiences across North America, Europe, and beyond.
        </p>
        <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Specializing in Spring Framework, Java, and modern web development, my talks have reached thousands of developers, contributing to the growth and evolution of our developer community. I'm passionate about sharing practical insights and fostering meaningful technical discussions.
        </p>

      <div class="space-y-4 mt-8">
        <div
          v-for="event in archives"
          :key="event.url"
          class="group relative bg-white dark:bg-zinc-800/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-zinc-200 dark:border-zinc-700/40"
        >
          <!-- Hover backdrop -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <div class="relative p-6 sm:px-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {{ event.title }}
                </h3>

                <div class="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-6">
                  <div class="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                    <span class="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </span>
                    {{ event.startDate }}
                  </div>

                  <div class="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                    <span class="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    {{ event.location }}
                  </div>
                </div>

                <p v-if="event.description" class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {{ event.description }}
                </p>
              </div>
            </div>

            <!-- URL Link -->
            <a
              v-if="event.url"
              :href="event.url"
              class="absolute inset-0 z-10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">View event details for {{ event.title }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
