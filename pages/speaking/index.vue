<script setup lang="ts">
import events from "~/assets/data/events.json";

useHead({
  title: 'Dan Vega - Speaking',
  meta: [
    { name: 'title', content: 'Dan Vega - Speaking' },
    { name: 'description', content: 'I’ve spoken at events around the world and been interviewed for podcasts and live streams.' }
  ]
});

const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of the day
      return event.startDate && eventDate >= today;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        I’ve spoken at events around the world and been interviewed for podcasts and live streams.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love
        podcast interviews because they give me the opportunity to answer questions instead of just present my opinions.

        You can view some of my <a href="https://github.com/danvega/abstracts" class="text-blue-500 hover:text-blue-400">abstracts</a> here or my <a href="http://www.youtube.com/danvega" class="text-blue-500 hover:text-blue-400">YouTube channel</a>
        if you want to get an idea of my speaking style. For a full list of past events please check out the <NuxtLink to="/speaking/archives" class="text-blue-500 hover:text-blue-400">archives</NuxtLink>.
        If you would like me to speak at your event please feel free to <NuxtLink to="/about" class="text-blue-500 hover:text-blue-400">contact me</NuxtLink>.
      </p>
    </header>

    <!-- turn into components later on -->
    <div class="mt-16 sm:mt-20">
      <div class="space-y-20">

        <section aria-labelledby=":S1:" class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div class="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
            <h2 class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Upcoming Talks</h2>
            <div class="md:col-span-3">
              <div class="space-y-16">

                <article v-for="event in upcomingEvents" :key="event.url" class="group relative flex flex-col items-start">
                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a :href="event.url">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">{{ event.title }}</span>
                    </a>
                  </h3>
                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>{{ event.name }}, {{ event.startDate }} - {{ event.location}}
                  </p>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ event.description }}</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">
                    Learn More
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>


              </div>
            </div>
          </div>
        </section>

<!--        <section aria-labelledby=":S2:" class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">-->
<!--          <div class="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">-->
<!--            <h2 id=":S2:" class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Podcasts</h2>-->
<!--            <div class="md:col-span-3">-->
<!--              <div class="space-y-16">-->

<!--                <article class="group relative flex flex-col items-start">-->
<!--                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">-->
<!--                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>-->
<!--                    <a href="https://www.theartifact.io/">-->
<!--                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>-->
<!--                      <span class="relative z-10">The Artifact - Everything Spring Framework (with Dan Vega)</span></a>-->
<!--                  </h3>-->
<!--                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">-->
<!--                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">-->
<!--                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>-->
<!--                    </span>-->
<!--                    The Artifact, September 2023-->
<!--                  </p>-->
<!--                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">In this episode I had the opportunity to be a guest of Koushik Kothagal AKA JavaBrains. Koushik is one of the great teachers in our community and It was really great to sit down and talk all things DevRel, Education and Spring.</p>-->
<!--                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">-->
<!--                    Listen to podcast-->
<!--                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">-->
<!--                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>-->
<!--                    </svg>-->
<!--                  </div>-->
<!--                </article>-->

<!--                <article class="group relative flex flex-col items-start">-->
<!--                  <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">-->
<!--                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>-->
<!--                    <a href="https://www.javapubhouse.com/2023/02/episode-102-oh-my-spring-boot-3-is-out-an-interview-with-dan-vega-from-the-pivotal-team.html">-->
<!--                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>-->
<!--                      <span class="relative z-10">Java Pub House - Episode 102. Oh my… Spring Boot 3 is out!</span></a>-->
<!--                  </h3>-->
<!--                  <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">-->
<!--                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">-->
<!--                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>-->
<!--                    </span>-->
<!--                    Java Pub House, February 2023-->
<!--                  </p>-->
<!--                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">Ok, so it’s an incredible time to be in the Java Ecosystem, and one of the biggest frameworks out there just dropped their three-point-oh version! That’s right! So Spring Boot is not officially 3.0, and it has as a Baseline Java 17! (oohh!!). So we brought in the big guns to talk about what does it mean to Upgrade to Spring Boot 3, and what are the new cool toys we can expect from that upgrade!</p>-->
<!--                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">-->
<!--                    Listen to podcast-->
<!--                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">-->
<!--                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>-->
<!--                    </svg>-->
<!--                  </div>-->
<!--                </article>-->


<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </section>-->


      </div>
    </div>

  </Container>
</template>