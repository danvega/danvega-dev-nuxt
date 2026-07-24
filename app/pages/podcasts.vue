<script lang="ts" setup>
import appearances from "../../assets/data/appearances.json";

interface Episode {
  title: string;
  date: string;
  dateLabel: string;
  duration: string;
  url?: string;
}

interface Show {
  slug: string;
  title: string;
  hosts: string;
  description: string;
  artwork: string;
  site: string;
  feed: string;
  episodeCount: number;
  cadence: string;
  episodes: Episode[];
}

const shows: Show[] = [
  {
    slug: "spring-office-hours",
    title: "Spring Office Hours",
    hosts: "Dan Vega & DaShaun Carter",
    description: "Join Dan Vega and DaShaun Carter as they explore what's new in the world of Spring. This is your chance to stay connected to what's happening with the Spring Framework, related projects, and the community. We stream live on YouTube every week, take questions from the chat, and break down new releases, features, and everything happening across the Spring portfolio.",
    artwork: "https://img.transistorcdn.com/B1PyCG9T4fkyq2-BxSh_895_PczyjL2VoV5SV8KkaOk/rs:fill:0:0:1/w:1400/h:1400/q:60/mb:500000/aHR0cHM6Ly9pbWct/dXBsb2FkLXByb2R1/Y3Rpb24udHJhbnNp/c3Rvci5mbS9zaG93/LzQxMDIwLzE2ODIz/ODU0MzItYXJ0d29y/ay5qcGc.jpg",
    site: "https://springofficehours.io",
    feed: "https://feeds.transistor.fm/spring-office-hours",
    episodeCount: 118,
    cadence: "Weekly, live on YouTube",
    episodes: [
      { title: "S5E18: The Latest from OpenAI, Anthropic and Spring AI 2.0", date: "2026-07-13", dateLabel: "Jul 13, 2026", duration: "65 min" },
      { title: "S5E17: Spring Boot 4.1 with Phil Webb", date: "2026-07-07", dateLabel: "Jul 7, 2026", duration: "60 min" },
      { title: "S5E16: May Release Train Shift & What's Coming in Spring Boot 4.1", date: "2026-05-19", dateLabel: "May 19, 2026", duration: "61 min" }
    ]
  },
  {
    slug: "fundamentals-of-software-engineering",
    title: "Fundamentals of Software Engineering",
    hosts: "Dan Vega & Nate Schutta",
    description: "Programmer, coder, developer—there are any number of titles used to describe people who create software, but what does it mean to be a software engineer? Being a software engineer is about far more than simply producing syntactically correct programs. Nate Schutta and I explore the timeless skills behind great software — the companion podcast to our book, Fundamentals of Software Engineering.",
    artwork: "https://img.transistorcdn.com/Y5ehralSoUjKu2Z2q8jZ-y-CpBlIfj2Y6E3-I_Ygzd4/rs:fill:0:0:1/w:1400/h:1400/q:60/mb:500000/aHR0cHM6Ly9pbWct/dXBsb2FkLXByb2R1/Y3Rpb24udHJhbnNp/c3Rvci5mbS82NmM2/MmE3OWEzYWVkMWFl/MWUxNzhkOWY1YzY1/Njg2Ny5qcGc.jpg",
    site: "https://fundamentalsofswe.com",
    feed: "https://feeds.transistor.fm/fundamentals-of-software-engineering",
    episodeCount: 10,
    cadence: "New show, companion to the book",
    episodes: [
      { title: "E10: Context Engineering Is Just Data Fundamentals in Disguise", date: "2026-07-13", dateLabel: "Jul 13, 2026", duration: "57 min" },
      { title: "E09: Effective Remote Work Tips and Why AI Doom Trolling Is a Choice", date: "2026-07-07", dateLabel: "Jul 7, 2026", duration: "56 min" },
      { title: "E08: Open Source, AI Tooling, and the Coming Token Crisis", date: "2026-06-27", dateLabel: "Jun 27, 2026", duration: "61 min" }
    ]
  }
];

interface GuestAppearance {
  show: string;
  host: string;
  title: string;
  dateLabel: string;
  description: string;
  url: string;
}

// Guest appearances live in assets/data/appearances.json (newest first);
// the podcast-appearance workflow adds new entries there
const guestAppearances: GuestAppearance[] = appearances;

// Live episode data from the Transistor RSS feeds (cached server-side);
// the static episodes above are the fallback if a feed is unreachable
const { data: liveFeeds } = await useFetch('/api/podcasts');

const showsWithEpisodes = computed(() =>
  shows.map(show => {
    const live = liveFeeds.value?.find(feed => feed.slug === show.slug);
    return live ? { ...show, episodeCount: live.episodeCount, episodes: live.episodes } : show;
  })
);

const latestAcrossShows = computed(() =>
  showsWithEpisodes.value
    .flatMap(show => show.episodes.map(episode => ({ ...episode, show })))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)
);

useHead({
  title: 'Dan Vega - Podcasts',
  meta: [
    { name: 'title', content: 'Dan Vega - Podcasts' },
    { name: 'description', content: 'Podcasts I host: Spring Office Hours and Fundamentals of Software Engineering, plus shows I have been a guest on.' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header>
      <p class="font-mono text-sm text-green-600 dark:text-green-400">$ ls ~/podcasts</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Podcasts
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I host two shows about the things I care about most: the Spring ecosystem and the craft of software
        engineering. New episodes ship regularly, and you can listen everywhere you get your podcasts.
      </p>
    </header>

    <!-- Hosted shows -->
    <section aria-labelledby="shows-heading">
      <h2 id="shows-heading" class="sr-only">Shows I Host</h2>
      <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <a v-for="show in showsWithEpisodes" :key="show.slug" :href="show.site" target="_blank" rel="noopener"
           class="group flex items-center gap-5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
          <img :src="show.artwork" :alt="`${show.title} artwork`"
               class="h-24 w-24 shrink-0 rounded-lg shadow-md" loading="lazy"/>
          <div>
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ show.title }}
            </h3>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{{ show.hosts }}</p>
            <p class="mt-1 font-mono text-xs text-zinc-500">{{ show.episodeCount }} episodes</p>
          </div>
        </a>
      </div>
      <div class="mt-12">
        <p class="font-mono text-sm text-green-600 dark:text-green-400">$ tail --follow episodes</p>
        <h2 class="mt-3 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">Latest Episodes</h2>
        <div class="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-700 divide-y divide-zinc-200 dark:divide-zinc-700">
          <a v-for="entry in latestAcrossShows" :key="entry.show.slug + entry.title"
             :href="entry.url || entry.show.site" target="_blank" rel="noopener"
             class="flex items-center gap-4 px-4 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <img :src="entry.show.artwork" :alt="`${entry.show.title} artwork`"
                 class="h-10 w-10 shrink-0 rounded-md" loading="lazy"/>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">{{ entry.title }}</p>
              <p class="mt-0.5 font-mono text-xs text-zinc-500">{{ entry.show.title }}</p>
            </div>
            <span class="shrink-0 text-xs text-zinc-500">{{ entry.dateLabel }} · {{ entry.duration }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Guest appearances -->
    <section aria-labelledby="guests-heading" class="mt-24">
      <p class="font-mono text-sm text-green-600 dark:text-green-400">$ grep "Dan Vega" guests.log</p>
      <h2 id="guests-heading" class="mt-3 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">Guest Appearances</h2>
      <p class="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
        Shows that were kind enough to have me on as a guest.
      </p>
      <div class="mt-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shadow-2xl">
        <div class="flex items-center gap-2 border-b border-zinc-700/60 bg-zinc-800 px-4 py-3">
          <span class="h-3 w-3 rounded-full bg-red-500"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span class="h-3 w-3 rounded-full bg-green-500"></span>
          <span class="ml-2 font-mono text-xs text-zinc-400">guests.log</span>
        </div>
        <ul class="divide-y divide-zinc-800">
          <li v-for="appearance in guestAppearances" :key="appearance.url">
            <a :href="appearance.url" target="_blank" rel="noopener"
               class="group flex flex-col gap-1 px-6 py-4 hover:bg-zinc-800/60 transition-colors sm:flex-row sm:items-baseline sm:gap-4">
              <span class="shrink-0 font-mono text-xs text-zinc-500 sm:w-20">{{ appearance.dateLabel }}</span>
              <span class="shrink-0 font-mono text-xs text-green-400 sm:w-40">{{ appearance.show }}</span>
              <span class="font-mono text-[13px] text-zinc-300 group-hover:text-white transition-colors">
                {{ appearance.title }} <span class="text-blue-400">→</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Want me on your show? -->
    <div class="mt-24 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-6 border border-blue-200 dark:border-blue-800">
      <p class="text-sm text-blue-900 dark:text-blue-300">
        <strong>Want me on your show?</strong> I love talking about Java, Spring, AI for Java developers, and career
        growth. Reach out on <a href="https://twitter.com/therealdanvega" class="underline hover:no-underline">Twitter</a>
        or find more ways to connect on the <a href="/about" class="underline hover:no-underline">about page</a>.
      </p>
    </div>
  </Container>
</template>
