<script  lang="ts" setup="">
import {useDateFormat} from "@vueuse/core/index";
import Pagination from "~/components/blog/Pagination.vue";

const route = useRoute();
const total = await queryContent('blog')
    .where({ draft: {$ne: true} })
    .count()

// paginate all posts
const articles = await queryContent('blog')
    .limit(20)
    .sort({ date: -1 })
    .find();

/*
Pagination
  limit: 10,
  page: 1,
  total
  nextPage: true
  previousPage: true

  100 / 10 = 10 numbers (how many numbers should be displayed in the pagination bar
*/

// https://www.danvega.dev/blog/3
// https://www.danvega.dev/tag/spring

const formatDatePublished = (date) => {
  const formatted = useDateFormat(date, "MMMM D, YYYY");
  return formatted.value;
}
</script>

<template>

  <Container class="mt-16 sm:mt-32">
    <header class="max-w-2xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Writing on software design, company building, and the aerospace industry.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.
      </p>
    </header>
    <div class="mt-16 sm:mt-20">
      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">

          <article class="md:grid md:grid-cols-4 md:items-baseline" v-for="post in articles" :key="post._id">

            <!-- card : turn this into a component at some point -->
            <div class="md:col-span-3 group relative flex flex-col items-start">
              <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                <a :href="post._path">
                  <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                  <span class="relative z-10">{{ post.title }}</span>
                </a>
              </h2>
              <time class="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5" :datetime="post.date">
                <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                  <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                </span>
                {{ formatDatePublished(post.date) }}
              </time>
              <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {{ post.shortDesc != null ? post.shortDesc : post.description }}
              </p>
              <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">Read article
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                  <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </div>
            <time class="mt-1 md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500" :datetime="post.date">
              {{ formatDatePublished(post.date) }}
            </time>

          </article>


          <Pagination/>


        </div>
      </div>
    </div>
  </Container>

</template>