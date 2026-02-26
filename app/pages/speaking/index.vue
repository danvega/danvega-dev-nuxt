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
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        I've spoken at events around the world and been interviewed for podcasts and live streams.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        One of my favorite ways to share my ideas is live on stage, where there's so much more communication bandwidth than there is in writing, and I love
        podcast interviews because they give me the opportunity to answer questions instead of just present my opinions.

        You can view some of my <a href="https://github.com/danvega/abstracts" class="text-blue-500 hover:text-blue-400">abstracts</a> here or my <a href="http://www.youtube.com/danvega" class="text-blue-500 hover:text-blue-400">YouTube channel</a>
        if you want to get an idea of my speaking style. For a full list of past events please check out the <NuxtLink to="/speaking/archives" class="text-blue-500 hover:text-blue-400">archives</NuxtLink>.
        If you would like me to speak at your event please feel free to <NuxtLink to="/about" class="text-blue-500 hover:text-blue-400">contact me</NuxtLink>.
      </p>
    </header>

    <div class="mt-16 sm:mt-20">
      <h2 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-8">Upcoming Talks</h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SpeakingCard v-for="event in upcomingEvents" :key="event.title + event.name" :event="event" />
      </div>
    </div>
  </Container>
</template>
