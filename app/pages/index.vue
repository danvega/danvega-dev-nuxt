<script setup lang="ts">
import Work from "~/components/home/Work.vue";
import BlogNewsletterSignup from "~/components/blog/BlogNewsletterSignup.vue";
import Photos from "~/components/home/Photos.vue";

const about = ref("Hello 👋🏻 My name is Dan Vega, Java Champion, Spring Developer Advocate, Husband and #GirlDad based outside of Cleveland OH. I created this website as a place to document my journey as I learn new things and share them with you. I have a real passion for teaching and I hope that one of blog posts, videos or courses helps you solve a problem or learn something new.");

const config = useRuntimeConfig();

useHead({
  title: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner',
  meta: [
    { name: 'title', content: 'Dan Vega - Java Champion, Spring Developer Advocate, YouTuber and Lifelong Learner' },
    { name: 'description', content: about }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Dan Vega',
        jobTitle: 'Spring Developer Advocate',
        worksFor: {
          '@type': 'Organization',
          name: 'Broadcom'
        },
        url: config.public.urlBase,
        image: config.public.urlBase + '/images/danvega-dev.png',
        sameAs: [
          'https://twitter.com/therealdanvega',
          'https://github.com/danvega',
          'https://www.youtube.com/@danvega',
          'https://www.linkedin.com/in/danvega'
        ],
        description: about.value
      })
    }
  ]
});
</script>

<template>
<main class="flex-auto">
  <div class="sm:px-8 mt-16 sm:mt-20">
    <div class="mx-auto w-full max-w-7xl lg:px-8">
      <div class="relative px-4 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <!-- Intro -->
            <div>
              <p class="font-mono text-sm text-green-600 dark:text-green-400">$ whoami</p>
              <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                Dan Vega
              </h1>
              <p class="mt-3 font-mono text-lg text-blue-600 dark:text-blue-400">Spring Developer Advocate @ Broadcom</p>
              <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                {{ about }}
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <a href="https://www.youtube.com/@danvega" class="inline-flex items-center gap-2 rounded-md bg-zinc-800 dark:bg-zinc-700 px-5 py-2.5 font-mono text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors">
                  ./watch --youtube
                </a>
                <a href="/newsletter" class="inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-5 py-2.5 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                  ./subscribe
                </a>
              </div>
              <SocialIcons/>
            </div>

            <!-- Code window -->
            <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shadow-2xl">
              <div class="flex items-center gap-2 border-b border-zinc-700/60 bg-zinc-800 px-4 py-3">
                <span class="h-3 w-3 rounded-full bg-red-500"></span>
                <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span class="h-3 w-3 rounded-full bg-green-500"></span>
                <span class="ml-2 font-mono text-xs text-zinc-400">Developer.java</span>
              </div>
              <pre class="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-zinc-300"><code><span class="text-purple-400">public record</span> <span class="text-sky-400">Developer</span>(
  <span class="text-sky-400">String</span> name,        <span class="text-zinc-500">// Dan Vega</span>
  <span class="text-sky-400">String</span> role,        <span class="text-zinc-500">// Spring Dev Advocate</span>
  <span class="text-sky-400">int</span> yearsExperience <span class="text-zinc-500">// 25 and counting</span>
) {}

<span class="text-purple-400">var</span> dan = <span class="text-purple-400">new</span> <span class="text-sky-400">Developer</span>(
  <span class="text-green-400">"Dan Vega"</span>,
  <span class="text-green-400">"Java Champion"</span>,
  <span class="text-orange-400">25</span>
);

<span class="text-sky-400">System</span>.out.println(<span class="text-green-400">"Let's build something 🚀"</span>);</code></pre>
            </div>
          </div>

          <!-- Command strip -->
          <div class="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <a href="/blog" class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <span class="text-green-600 dark:text-green-400">~</span> /blog
            </a>
            <a href="/newsletter" class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <span class="text-green-600 dark:text-green-400">~</span> /newsletter
            </a>
            <a href="/speaking" class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <span class="text-green-600 dark:text-green-400">~</span> /speaking
            </a>
            <a href="/courses" class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <span class="text-green-600 dark:text-green-400">~</span> /courses
            </a>
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
              <LatestArticles/>
            </div>
            <div class="space-y-10 lg:pl-16 xl:pl-24">
              <Work/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sm:px-8">
    <div class="mx-auto w-full max-w-7xl lg:px-8">
      <div class="relative px-4 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <BlogNewsletterSignup
            heading="Want more like this? Get the newsletter."
            campaign="home-page-footer"
            input-id="home-footer-email"
          />
        </div>
      </div>
    </div>
  </div>
</main>
</template>
