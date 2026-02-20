<script setup lang="ts">
import SimplePagination from "~/components/blog/SimplePagination.vue";

definePageMeta({
  path: '/blog/:page(\\d+)?'
});

useHead({
  title: 'Dan Vega - Blog',
  meta: [
    { name: 'title', content: 'Dan Vega - Blog' },
    { name: 'description', content: 'Writing on software development and anything else I find interesting.' }
  ]
});

const route = useRoute();
const page = ref(route.params.page ? parseInt(route.params.page) : 1);
const limit = ref(5);

const searchTag = computed(() =>
    Array.isArray(route.query.tag) ? route.query.tag[0] : route.query.tag
);

// Use enhanced data fetching with reactive keys and automatic caching
const { usePaginatedBlogPosts } = useBlogData()
const { data: blogData } = await usePaginatedBlogPosts(page, limit, searchTag)

const posts = computed(() => blogData.value?.posts || []);
const articlesCount = computed(() => blogData.value?.totalPosts || 0);

if(posts.value?.length === 0 && searchTag.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `No blog posts found for tag: ${searchTag.value}`
  });
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Writing on software development and anything else I find interesting.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        All of my long-form thoughts on programming, content creation, and more, collected in chronological order.
      </p>
      <div class="mt-4 flex items-center gap-6">
        <a href="/blog/tags" class="flex items-center space-x-2 text-zinc-600 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <span>Browse by topic</span>
        </a>
        <a href="/rss.xml" title="RSS Feed" class="flex items-center space-x-2 text-zinc-600 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
          </svg>
          <span>RSS Feed</span>
        </a>
      </div>
      <div v-if="searchTag" class="mt-4 inline-flex items-center">
        <p v-if="searchTag" class="mt-2 text-base text-zinc-600 dark:text-zinc-400">
          Filtering by tag: <span class="text-green-500">{{ searchTag }}</span>
        </p>
      </div>
    </header>
    <div class="mt-16 sm:mt-20">
      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">
          <article
              v-for="post in posts"
              :key="post._id"
              class="md:grid md:grid-cols-4 md:items-baseline"
          >
            <BlogCard :post="post"/>
          </article>
          <SimplePagination
              v-if="posts?.length > 0"
              :limit="limit"
              :page="page"
              :count="articlesCount"
          />
        </div>
      </div>
    </div>
  </Container>
</template>