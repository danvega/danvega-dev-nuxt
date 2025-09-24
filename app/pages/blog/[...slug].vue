<script setup>
import { useDateFormat } from '@vueuse/core'

const { path } = useRoute();
const slug = getSlugFromPath(path);

// Use enhanced blog data fetching with automatic caching
const { useBlogPost } = useBlogData()
const { data } = await useBlogPost(slug)


const datePublished = useDateFormat(data.value?.meta?.date, 'MMMM D, YYYY');
useDateFormat(data.value?.meta?.updatedOn, 'MMMM D, YYYY');
const getImagePath = (date,cover) => {
  if(cover) {
    const createdOn = new Date(date);
    const year = createdOn.getFullYear();
    const month = `${createdOn.getMonth() + 1 < 10 ? "0" : ""}${createdOn.getMonth() + 1}`;
    const day = `${createdOn.getDate() < 10 ? "0" : ""}${createdOn.getDate()}`;
    return `/images/blog/${year}/${month}/${day}/${cover.replace('./','')}`;
  }
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
  title: data.value?.title,
  meta: [
    { name: 'title', content: data.value?.title },
    { name: 'description', content: data.value?.description },
    { name: "keywords", content: data.value?.meta?.keywords },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.value?.title },
    { name: 'twitter:description', content: data.value?.description },
    { name: 'twitter:site', content: '@therealdanvega' },
    { name: 'twitter:image', content: config.public.urlBase + getImagePath(data.value?.meta?.date,data.value?.meta?.cover) },
    { name: 'twitter:creator', content: '@therealdanvega' },
    { name: 'og:type', content: 'article' },
    { name: 'og:title', content: data.value?.title },
    { name: 'og:description', content: data.value?.description },
    { name: 'og:url', content: config.public.urlBase + path },
    { name: 'og:image', content: config.public.urlBase + getImagePath(data.value?.meta?.date,data.value?.meta?.cover) },
    { name: 'og:image:secure_url', content: config.public.urlBase + getImagePath(data.value?.meta?.date,data.value?.meta?.cover) },
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
              <span class="ml-2" v-if="data?.meta?.updatedOn">• Updated On: {{ useDateFormat(data?.meta?.updatedOn, 'MMMM D, YYYY').value }}</span>
            </time>
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {{ data?.title }}
            </h1>
          </header>
          <!-- if we have a video show that, else show the cover image -->
          <YouTube :src="data?.meta?.video" v-if="data?.meta?.video" class="prose dark:prose-invert rounded-2xl mt-8"/>
          <NuxtImg
              :src="getImagePath(data?.meta?.date,data?.meta?.cover)"
              class="prose dark:prose-invert rounded-2xl mt-8"
              alt="ALT TEXT"
              v-if="data?.meta?.cover && !data?.meta?.video"/>
          <ContentRenderer :value="data" class="prose dark:prose-invert mt-8" />
        </article>

        <BlogTags :tags="data?.meta?.tags"/>

        <BlogNewsletterSignup />

      </div>
    </div>
  </Container>

</template>