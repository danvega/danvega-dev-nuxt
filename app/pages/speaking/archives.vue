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
    </div>

    <div class="mt-12">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SpeakingCard v-for="event in archives" :key="event.title + event.name + event.startDate" :event="event" />
      </div>
    </div>
  </Container>
</template>
