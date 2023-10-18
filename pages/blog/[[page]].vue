<script setup lang="ts">
import SimplePagination from "~/components/blog/SimplePagination.vue";
import BlogCard from "~/components/blog/BlogCard.vue";

definePageMeta(
  {
    path: '/blog/:page(\\d+)?'
  }
)

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

const articlesCount = await queryContent('blog')
    .where({tags: {$in: route.query.tag}})
    .count();

const posts = await queryContent('blog')
    .where( {tags: {$in: route.query.tag}})
    .skip(limit.value * (page.value - 1))
    .limit(limit.value)
    .sort({ date: -1 })
    .find()

if(posts.length == 0) {
  throw createError({
    statusCode:404,
    statusMessage: `No Blog posts found for path: ${route.path}`
  })
}
</script>

<template>

  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Writing on software development and anything else I find interesting.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        All of my long-form thoughts on programming, content creation,and more, collected in chronological order.
      </p>
    </header>
    <div class="mt-16 sm:mt-20">
      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">
          <article class="md:grid md:grid-cols-4 md:items-baseline" v-for="post in posts" :key="post._id">
            <BlogCard :post="post"/>
          </article>
          <SimplePagination :count="articlesCount" :page="page" :limit="limit"/>
        </div>
      </div>
    </div>
  </Container>

</template>