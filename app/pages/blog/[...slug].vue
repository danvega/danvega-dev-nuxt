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

// Reading time
const readingTime = computed(() => {
  if (!data.value?.body) return null
  return useReadingTime(data.value.body)
})

const config = useRuntimeConfig();

// Build JSON-LD structured data
const jsonLd = computed(() => {
  if (!data.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.value.title,
    description: data.value.description,
    datePublished: data.value.meta?.date,
    author: {
      '@type': 'Person',
      name: data.value.meta?.author || 'Dan Vega',
      url: config.public.urlBase
    },
    image: data.value.meta?.cover
      ? config.public.urlBase + getImagePath(data.value.meta.date, data.value.meta.cover)
      : undefined,
    url: config.public.urlBase + path,
    keywords: data.value.meta?.tags?.join(', ')
  }
})

defineOgImage({
  component: 'Blog',
  title: data.value?.title || '',
  description: data.value?.description || '',
  date: datePublished.value
})

useHead({
  title: data.value?.title,
  meta: [
    { name: 'title', content: data.value?.title },
    { name: 'description', content: data.value?.description },
    { name: "keywords", content: data.value?.meta?.keywords },
    { name: 'twitter:site', content: '@therealdanvega' },
    { name: 'twitter:creator', content: '@therealdanvega' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: data.value?.title },
    { property: 'og:description', content: data.value?.description },
    { property: 'og:url', content: config.public.urlBase + path },
  ],
  script: jsonLd.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd.value)
    }
  ] : []
});
</script>

<template>
  <div>
    <BlogReadingProgress />

    <!-- Header Section with constrained content -->
    <Container class="mt-16 sm:mt-32">
      <div class="xl:relative">
        <div class="mx-auto max-w-7xl">
          <article>
            <header className="flex flex-col">
              <time dateTime="September 5, 2022" class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span class="ml-3">Published On: {{ datePublished }}</span>
                <span class="ml-2" v-if="data?.meta?.updatedOn">• Updated On: {{ useDateFormat(data?.meta?.updatedOn, 'MMMM D, YYYY').value }}</span>
                <span class="ml-2" v-if="readingTime">• {{ readingTime.text }}</span>
              </time>
              <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {{ data?.title }}
              </h1>
            </header>
          </article>
        </div>
      </div>
    </Container>

    <!-- Cover Image/Video Section - Same width as content -->
    <Container class="mt-8 mb-8" v-if="data?.meta?.video || data?.meta?.cover">
      <div class="xl:relative">
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <!-- if we have a video show that, else show the cover image -->
            <YouTube :src="data?.meta?.video" v-if="data?.meta?.video" class="w-full rounded-2xl"/>
            <NuxtImg
                :src="getImagePath(data?.meta?.date,data?.meta?.cover)"
                class="w-full rounded-2xl"
                alt="Cover image for the blog post"
                v-if="data?.meta?.cover && !data?.meta?.video"/>
          </div>
        </div>
      </div>
    </Container>

    <!-- Series Navigation (if part of a series) -->
    <Container v-if="data?.meta?.series">
      <div class="xl:relative">
        <div class="mx-auto max-w-7xl">
          <BlogSeriesNavigation
            :series="data.meta.series"
            :series-title="data.meta.seriesTitle"
            :current-slug="data.meta.slug"
          />
        </div>
      </div>
    </Container>

    <!-- Content Section with constrained content -->
    <Container>
      <div class="xl:relative">
        <div class="mx-auto max-w-7xl">
          <article id="blog-content">
            <ContentRenderer :value="data" class="prose dark:prose-invert" />
          </article>

          <BlogTags :tags="data?.meta?.tags"/>

          <!-- Series Navigation at bottom too -->
          <BlogSeriesNavigation
            v-if="data?.meta?.series"
            :series="data.meta.series"
            :series-title="data.meta.seriesTitle"
            :current-slug="data.meta.slug"
          />

          <BlogRelatedPosts
            v-if="data?.meta?.tags?.length"
            :current-slug="data?.meta?.slug"
            :tags="data?.meta?.tags"
          />

          <BlogNewsletterSignup />

        </div>
      </div>
    </Container>
  </div>
</template>
