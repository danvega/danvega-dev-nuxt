<script setup>
import { useDateFormat } from '@vueuse/core'

const { path } = useRoute()
let slug = ref();
if (path) {
  const trimmedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  slug = trimmedPath.split('/').pop();
}

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
      .where({ slug } )
      .findOne()
})

if(data.value == null) {
  throw createError({
    statusCode:404,
    statusMessage: `No Newsletter found for slug: ${path}`
  })
}

const formatDatePublished = (date) => {
  const formatted = useDateFormat(date, "MMMM D, YYYY");
  return formatted.value;
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
  <div class="xl:relative">
    <div class="mx-auto max-w-7xl">

      <article>
        <header className="flex flex-col">
          <time dateTime="September 5, 2022" class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
            <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            <span class="ml-3">Published On: {{formatDatePublished(data.date)}}</span>
          </time>
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {{ data.title }}
          </h1>
        </header>

        <ContentRenderer :value="data" class="prose dark:prose-invert mt-8" />

      </article>

      <!-- <pre>{{ data }}</pre>-->

    </div>
  </div>
  </Container>
</template>