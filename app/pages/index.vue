<script setup lang="ts">
import NewsletterSignup from "~/components/home/NewsletterSignup.vue";
import Work from "~/components/home/Work.vue";
import Photos from "~/components/home/Photos.vue";

const title = ref("Java Champion, Spring Developer Advocate, YouTuber and Lifelong Learner");
const about = ref("Hello 👋🏻 My name is Dan Vega, Java Champion, Spring Developer Advocate, Husband and #GirlDad based outside of Cleveland OH. I created this website as a place to document my journey as I learn new things and share them with you. I have a real passion for teaching and I hope that one of blog posts, videos or courses helps you solve a problem or learn something new.");

useHead({
  title: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner',
  meta: [
    { name: 'title', content: 'Dan Vega - Java Champion, Spring Developer Advocate, YouTuber and Lifelong Learner' },
    { name: 'description', content: about }
  ]
});
</script>

<template>
<main class="flex-auto">
  <div class="sm:px-8 mt-9">
    <div class="mx-auto w-full max-w-7xl lg:px-8">
      <div class="relative px-4 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <div class="max-w-4xl">
            <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {{ title }}
            </h1>
            <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              {{ about }}
            </p>
            <SocialIcons/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Photos/>
  <div class="sm:px-8 mt-24 md:mt-28">
    <div class="mx-auto w-full max-w-7xl lg:px-8">
      <div class="relative px-4 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div class="flex flex-col gap-16">
              <!-- Static Latest Articles Content -->
              <div class="flex flex-col gap-16">
                <article class="group relative flex flex-col items-start">
                  <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="/blog/jdk-24-virtual-threads-without-pinning">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">JDK 24's Major Improvement: Virtual Threads Without Pinning</span>
                    </a>
                  </h2>
                  <time class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5" dateTime="2025-04-09T17:00:00.000Z">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>
                    April 9, 2025
                  </time>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">Learn how JDK 24's enhancement to virtual threads that eliminates pinning with synchronized blocks can dramatically improve performance in your Spring Boot applications.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">
                    Read article
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>

                <article class="group relative flex flex-col items-start">
                  <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="/blog/docker-model-runner">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">Running AI Models Locally with Docker and Spring AI</span>
                    </a>
                  </h2>
                  <time class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5" dateTime="2025-04-07T17:00:00.000Z">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>
                    April 7, 2025
                  </time>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">Learn how to use Docker's Model Runner feature to run AI models locally with your Spring Boot applications, with zero API keys, zero data sharing, and zero monthly fees.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">
                    Read article
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>

                <article class="group relative flex flex-col items-start">
                  <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="/blog/creating-your-first-mcp-server-java">
                      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span class="relative z-10">Creating Your First Model Context Protocol (MCP) Server in Java</span>
                    </a>
                  </h2>
                  <time class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5" dateTime="2025-03-26T17:00:00.000Z">
                    <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>
                    March 26, 2025
                  </time>
                  <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">Learn how to build and deploy a custom MCP server with Java to extend AI models with your own data and services.</p>
                  <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">
                    Read article
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                      <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </article>
              </div>
            </div>
            <div class="space-y-10 lg:pl-16 xl:pl-24">
              <NewsletterSignup/>
              <Work/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>
