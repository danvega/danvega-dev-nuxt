<script setup>
import { useDateFormat } from '@vueuse/core'

const { path } = useRoute()

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
      .where({ _path: path })
      .findOne()
})

// add a type for blog post
// construct image path (/images/year/month/day/)
// date format
const datePublished = useDateFormat(data.date, 'MMMM D, YYYY')
// date updated
// time to read?


const getImagePath = (date,cover) => {
  const createdOn = new Date(date);
  const year = createdOn.getFullYear();
  const month = `${createdOn.getMonth() + 1 < 10 ? "0" : ""}${createdOn.getMonth() + 1}`;
  const day = `${createdOn.getDate() < 10 ? "0" : ""}${createdOn.getDate()}`;
  return `/images/blog/${year}/${month}/${day}/${cover.replace('./','')}`;
};
</script>

<template>

  <Container class="mt-16 sm:mt-32">
    <div class="xl:relative">
      <div class="mx-auto max-w-7xl">

<!--        <button type="button" aria-label="Go back to articles" class="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0">-->
<!--          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400">-->
<!--            <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>-->
<!--          </svg>-->
<!--        </button>-->

        <article>
          <header className="flex flex-col">
            <time dateTime="September 5, 2022" class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
              <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span class="ml-3">Published On: {{ datePublished }}</span>
            </time>
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {{ data.title }}
            </h1>
          </header>

          <!--- if video, show video -->
          <!--- https://betterprogramming.pub/4-steps-to-embed-youtube-in-nuxt-js-with-a-markdown-file-9d5fe9a0167a -->
          <!-- https://github.com/paulirish/lite-youtube-embed -->

          <!-- else show image -->
          <img :src="getImagePath(data.date,data.cover)"
               class="prose dark:prose-invert rounded-2xl mt-8"
               alt="Spring JDBC Client"/>

          <ContentRenderer :value="data" class="prose dark:prose-invert mt-8" />
        </article>

        <!-- tags -->
        <!-- newsletter signup -->
        <!-- <pre>{{ data }}</pre>-->

      </div>
    </div>
  </Container>

</template>