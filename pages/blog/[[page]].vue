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

// Get the count first
const articlesCount = await queryContent('blog')
    .where({
      published: true,
      ...(searchTag.value ? { tags: { $contains: searchTag.value } } : {})
    })
    .count();

// Then get the paginated posts
const posts = await queryContent('blog')
    .where({
      published: true,
      ...(searchTag.value ? { tags: { $contains: searchTag.value } } : {})
    })
    .skip(limit.value * (page.value - 1))
    .limit(limit.value)
    .sort({ date: -1 })
    .find();

if(posts.length === 0 && searchTag.value) {
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
              v-if="posts.length > 0"
              :limit="limit"
              :page="page"
              :count="articlesCount"
          />
        </div>
      </div>
    </div>
  </Container>
</template>