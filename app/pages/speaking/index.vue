<script setup lang="ts">
import events from "../../../assets/data/events.json";

useHead({
  title: 'Dan Vega - Speaking',
  meta: [
    { name: 'title', content: 'Dan Vega - Speaking' },
    { name: 'description', content: "I've spoken at events around the world and been interviewed for podcasts and live streams." }
  ]
});

const upcomingEvents = events
    .filter((event) => {
      const endDate = new Date(event.endDate || event.startDate);
      const cutoff = new Date();
      cutoff.setHours(0, 0, 0, 0);
      cutoff.setDate(cutoff.getDate() - 3); // Keep events for 3 days after they end
      return event.startDate && endDate >= cutoff;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

// Stats derived from the full event history
const cityCount = new Set(events.map((e) => e.location)).size;
const firstYear = Math.min(...events.map((e) => new Date(e.startDate).getFullYear()));

function dateParts(dateString: string) {
  const date = new Date(dateString);
  return {
    month: date.toLocaleString('en-US', { month: 'short' }),
    day: date.toLocaleString('en-US', { day: 'numeric' })
  };
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <div>
        <p class="font-mono text-sm text-green-600 dark:text-green-400">$ ls ~/talks</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
          Hi, I'm Dan. I help developers make sense of Spring, modern Java, and AI live on stage.
        </h1>
        <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          I've given 100+ talks in {{ cityCount }} cities, from SpringOne and Spring I/O keynotes to
          local Java User Groups. Every talk gets live code, honest opinions, and something you can build the
          same afternoon.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink to="/about" class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
            Invite me to speak
          </NuxtLink>
          <a href="http://www.youtube.com/danvega" class="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-6 py-3 text-base font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            Watch a talk
          </a>
        </div>
        <p class="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
          Speaking since {{ firstYear }} &middot; <a href="https://github.com/danvega/abstracts" class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">abstracts</a> &middot;
          <NuxtLink to="/speaking/archives" class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">past talks</NuxtLink>
        </p>
      </div>
      <div class="relative">
        <div class="absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-100 to-transparent dark:from-blue-950/40 -rotate-2" />
        <img src="/images/photos/spring_io_2025_05.jpg" alt="Dan Vega speaking on the main stage at Spring I/O" class="relative rounded-xl shadow-lg object-cover w-full" />
      </div>
    </header>

    <div class="mt-16 sm:mt-20">
      <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">Where you can catch me next</h2>
      <div class="mt-8 divide-y divide-zinc-200 dark:divide-zinc-700/60 border-y border-zinc-200 dark:border-zinc-700/60">
        <div v-for="event in upcomingEvents" :key="event.title + event.name + event.startDate" class="group relative flex items-start gap-6 py-6">
          <div class="flex h-16 w-16 flex-none flex-col items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
            <span class="text-xs font-semibold uppercase text-blue-600 dark:text-blue-400">{{ dateParts(event.startDate).month }}</span>
            <span class="text-xl font-bold text-zinc-800 dark:text-zinc-100">{{ dateParts(event.startDate).day }}</span>
          </div>
          <div class="min-w-0 flex-auto">
            <p class="text-xs font-medium text-zinc-500 dark:text-zinc-500">{{ event.name }} &middot; {{ event.location }}</p>
            <h3 class="mt-1 text-lg font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <NuxtLink v-if="event.slug" :to="`/speaking/${event.slug}`">
                <span class="absolute inset-0" />
                {{ event.title }}
              </NuxtLink>
              <a v-else-if="event.url" :href="event.url" target="_blank" rel="noopener noreferrer">
                <span class="absolute inset-0" />
                {{ event.title }}
              </a>
              <span v-else>{{ event.title }}</span>
            </h3>
            <p v-if="event.description" class="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
