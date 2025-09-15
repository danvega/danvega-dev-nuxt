<script setup>
import { useDateFormat } from '@vueuse/core'

const { path } = useRoute();
const slug = getSlugFromPath(path);

// Use enhanced newsletter data fetching
const { useNewsletterPost } = useNewsletterData()
const { data } = await useNewsletterPost(slug)

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

const datePublished = useDateFormat(data.value?.meta?.date, 'MMMM D, YYYY');

const config = useRuntimeConfig();

useHead({
  title: data.value?.title,
  meta: [
    { name: 'title', content: data.value?.title },
    { name: 'description', content: data.value?.description },
    { name: "keywords", content: data.value?.meta?.tags?.join(', ') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.value?.title },
    { name: 'twitter:description', content: data.value?.description },
    { name: 'twitter:site', content: '@therealdanvega' },
    { name: 'twitter:creator', content: '@therealdanvega' },
    { name: 'og:type', content: 'article' },
    { name: 'og:title', content: data.value?.title },
    { name: 'og:description', content: data.value?.description },
    { name: 'og:url', content: config.public.urlBase + `/newsletter/${slug}` },
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
  <div class="xl:relative">
    <div class="mx-auto max-w-7xl">

      <article>
        <header className="flex flex-col">
          <time :dateTime="data?.meta?.date" class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
            <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            <span class="ml-3">Published On: {{ datePublished }}</span>
          </time>
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {{ data?.title }}
          </h1>
        </header>

        <ContentRenderer v-if="data" :value="data" class="prose dark:prose-invert mt-8" />
        <div v-else class="prose dark:prose-invert mt-8">
          <p>Content is loading or unavailable.</p>
        </div>

      </article>

      <!-- <pre>{{ data }}</pre>-->

    </div>
  </div>
  </Container>
</template>