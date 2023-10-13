<script setup>
import { useDateFormat } from '@vueuse/core'

const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
      .where({ _path: path })
      .findOne()
})

// add a type for blog post
// date format
const datePublished = useDateFormat(data.date, 'MMMM D, YYYY')
// date updated
// time to read?


const getYouTubeVideoID = (video) => {
  let id = "";
  if(video.length) {
    const parts = video.split("/");
    id = parts[parts.length - 1];
  }
  return id;
}

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

        <article>
          <header className="flex flex-col">
            <time dateTime="September 5, 2022" class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
              <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span class="ml-3">Published On: {{ datePublished }}</span>
            </time>
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {{ data?.title }}
            </h1>
          </header>

          <YouTube :src="data.video" v-if="data?.video" />

          <!-- else show image -->
          <img :src="getImagePath(data.date,data.cover)"
               class="prose dark:prose-invert rounded-2xl mt-8"
               alt="ALT TEXT"
               v-else-if="data?.cover"/>

          <ContentRenderer :value="data" class="prose dark:prose-invert mt-8" />

        </article>

        <!-- tags -->
        <!-- newsletter signup -->
        <!-- <pre>{{ data }}</pre>-->

      </div>
    </div>
  </Container>

</template>