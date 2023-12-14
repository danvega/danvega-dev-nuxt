<script setup>
import { useDateFormat } from '@vueuse/core'

const { path } = useRoute();
const slug = getSlugFromPath(path);
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
      .where({ slug: slug, published: true })
      .findOne()
})

if(data.value == null) {
  throw createError({
    statusCode:404,
    statusMessage: `No Blog post found for slug: ${path}`
  })
}

const datePublished = useDateFormat(data.value.date, 'MMMM D, YYYY');
const dateUpdated = useDateFormat(data.value.updatedOn, 'MMMM D, YYYY');

const getImagePath = (date,cover) => {
  const createdOn = new Date(date);
  const year = createdOn.getFullYear();
  const month = `${createdOn.getMonth() + 1 < 10 ? "0" : ""}${createdOn.getMonth() + 1}`;
  const day = `${createdOn.getDate() < 10 ? "0" : ""}${createdOn.getDate()}`;
  return `/images/blog/${year}/${month}/${day}/${cover.replace('./','')}`;
};

function removeTrailingSlash(inputString) {
  if (inputString.endsWith("/")) {
    return inputString.slice(0, -1); // Remove the last character
  }
  return inputString; // No trailing slash, return the original string
}

function getSlugFromPath(path) {
  const cleanPath  = removeTrailingSlash(path);
  const parts = cleanPath.split("/");
  return parts[parts.length - 1];
}

const config = useRuntimeConfig();

useHead({
  title: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner',
  meta: [
    { name: 'title', content: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner' },
    { name: 'description', content: data.value.excerpt },
    { name: "keywords", content: data.value?.keywords },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.value.title },
    { name: 'twitter:description', content: data.value.excerpt },
    { name: 'twitter:site', content: '@therealdanvega' },
    { name: 'twitter:image', content: config.public.urlBase + getImagePath(data.value.date,data.value.cover) },
    { name: 'twitter:creator', content: '@therealdanvega' },
    { name: 'og:type', content: 'article' },
    { name: 'og:title', content: data.value.title },
    { name: 'og:description', content: data.value.excerpt },
    { name: 'og:url', content: config.urlBase + path },
    { name: 'og:image', content: config.urlBase + getImagePath(data.value.date,data.value.cover) },
    { name: 'og:image:secure_url', content: config.urlBase + getImagePath(data.value.date,data.value.cover) },
  ]
});
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
              <span class="ml-2" v-if="data?.updatedOn">| Updated On: {{ useDateFormat(data.updatedOn, 'MMMM D, YYYY').value }}</span>
            </time>
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {{ data?.title }}
            </h1>
          </header>
          <!-- if we have a video show that, else show the cover image -->
          <YouTube :src="data.video" v-if="data?.video" />
          <NuxtImg
              :src="getImagePath(data.date,data.cover)"
              class="prose dark:prose-invert rounded-2xl mt-8"
              alt="ALT TEXT"
              v-else-if="data?.cover"/>
          <ContentRenderer :value="data" class="prose dark:prose-invert mt-8" />
        </article>

        <BlogTags :tags="data.tags"/>

        <BlogNewsletterSignup />

      </div>
    </div>
  </Container>

</template>