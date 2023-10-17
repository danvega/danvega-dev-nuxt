<script lang="ts" setup="" xmlns="http://www.w3.org/1999/html">
import {useDateFormat} from "@vueuse/core/index";

useHead({
  title: 'Dan Vega - Newsletter',
  meta: [
    { name: 'title', content: 'Dan Vega - Newsletter' },
    { name: 'description', content: 'My Weekly(ish) Newsletter' }
  ]
});

const news = await queryContent('newsletter')
    .where({draft: {$ne: true}})
    .limit(5)
    .sort({ date: -1 })
    .find();

const formatDatePublished = (date: string) => {
  const formatted = useDateFormat(date, "MMMM D, YYYY");
  return formatted.value;
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-2xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        My Weekly(ish) Newsletter.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I started this newsletter as a way to keep myself writing each and every week. I have a blog that I like to write for but a blog post can be a lot of a pressure. This is a no pressure way for me to write and in the meantime connect with you on a weekly basis. Enter your email below to recieve my weekly newsletter every Monday morning.</p>
    </header>

    <form
        action="https://app.convertkit.com/forms/1094354/subscriptions"
        method="post"
        data-sv-form="1094354"
        data-uid="2245659c84"
        data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;: &quot;redirect&quot;,&quot;redirect_url&quot;: &quot;https://www.danvega.dev/newsletter/thank-you/;}}}"
        class="mt-8 md:w-3/4 flex flex-row rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <div class="w-3/4">
          <div>
            <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
          </div>
        </div>
        <div class="pl-4">
            <button type="button" class="rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Subscribe
            </button>
        </div>
    </form>

    <div class="mt-16 sm:mt-20">
      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">

          <article class="md:grid md:grid-cols-4 md:items-baseline" v-for="post in news" :key="post._id">

            <!-- card : turn this into a component at some point -->
            <div class="md:col-span-3 group relative flex flex-col items-start">
              <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                <a :href="`/newsletter/${post.slug}`">
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
                {{ post.description }}
              </p>
              <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">Read Newsletter
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                  <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </div>
            <time class="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500" :datetime="post.date">
              {{ formatDatePublished(post.date) }}
            </time>

          </article>


        </div>
      </div>
    </div>

  </Container>
</template>