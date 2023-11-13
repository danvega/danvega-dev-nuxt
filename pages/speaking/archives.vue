<script setup lang="ts">
import events from "~/assets/data/events.json";

useHead({
  title: 'Dan Vega - Speaking Archives',
  meta: [
    { name: 'title', content: 'Dan Vega - Speaking Archives' },
    { name: 'description', content: 'A list of past events I have given talks at.' }
  ]
});

const archivedEvents = events
    .filter((event) => {
      return event.startDate && new Date(event.startDate) < new Date();
    });

</script>

<template>
  <Container class="mt-16 sm:mt-32">

    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Speaking Archives
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400"></p>
    </header>

    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-zinc-200 sm:pl-0">Date</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-zinc-200 sm:pl-0">Event</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-zinc-200 sm:pl-0">Location</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="event in archivedEvents" :key="event.url">
          <td class="whitespace-nowrap px-3 py-4 text-sm text-zinc-800 dark:text-zinc-100">{{ event.startDate }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-zinc-800 dark:text-zinc-100"><a :href="event.url">{{ event.name }}</a></td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-zinc-800 dark:text-zinc-100">{{ event.location }}</td>
        </tr>
      </tbody>
  </table>

  </Container>
</template>