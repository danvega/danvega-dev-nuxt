<script setup lang="ts">
import NewsletterSignup from "~/components/home/NewsletterSignup.vue";
import Work from "~/components/home/Work.vue";
import Photos from "~/components/home/Photos.vue";

const title = ref("Junior Software Developer & Cybersecurity Student at the University of Gabes");
const about = ref("Hello 👋🏻 My name is Nidhal Naffati, Spring Developer Advocate, Husband and #GirlDad based outside of Cleveland OH. I created this website as a place to document my journey as I learn new things and share them with you. I have a real passion for teaching and I hope that one of blog posts, videos or courses helps you solve a problem or learn something new.");

useHead({
  title: 'Nidhal Naffati - Junior Software Developer and Cybersecurity Student',
  meta: [
    { name: 'title', content: 'Nidhal Naffati - Junior Software Developer and Cybersecurity Student' },
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
          <div class="max-w-2xl">
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
              <LatestArticles/>
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