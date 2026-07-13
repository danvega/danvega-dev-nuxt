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

// Archives grouped by year, newest first
const archivesByYear = Object.entries(
  archives.reduce((groups, event) => {
    const year = new Date(event.startDate).getFullYear();
    (groups[year] ||= []).push(event);
    return groups;
  }, {} as Record<number, typeof archives>)
).sort((a, b) => Number(b[0]) - Number(a[0]));

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
    <header class="max-w-4xl">
      <h1 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
        A look back at the talks I've given.
      </h1>
      <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        Conference keynotes, hands-on workshops, user group meetups, and everything in between, from SpringOne
        and Spring I/O to CodeMash and KCDC. Browse by year, and if something here would be a fit for your event,
        <NuxtLink to="/about" class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">let's talk</NuxtLink>.
      </p>
    </header>

    <div class="mt-12 space-y-16">
      <section v-for="[year, yearEvents] in archivesByYear" :key="year" :aria-labelledby="`year-${year}`">
        <div class="flex items-baseline gap-4">
          <h2 :id="`year-${year}`" class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{{ year }}</h2>
          <p class="text-sm text-zinc-500 dark:text-zinc-500">{{ yearEvents.length }} {{ yearEvents.length === 1 ? 'talk' : 'talks' }}</p>
        </div>
        <div class="mt-6 divide-y divide-zinc-200 dark:divide-zinc-700/60 border-y border-zinc-200 dark:border-zinc-700/60">
          <div v-for="event in yearEvents" :key="event.title + event.name + event.startDate" class="group relative flex items-baseline gap-4 py-4 sm:gap-6">
            <p class="w-16 flex-none text-sm text-zinc-500 dark:text-zinc-500">
              {{ dateParts(event.startDate).month }} {{ dateParts(event.startDate).day }}
            </p>
            <div class="min-w-0 flex-auto">
              <h3 class="text-base font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
              <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{{ event.name }} &middot; {{ event.location }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Container>
</template>
