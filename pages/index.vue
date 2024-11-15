<script setup lang="ts">
import NewsletterSignup from "~/components/home/NewsletterSignup.vue";
import Work from "~/components/home/Work.vue";
import Photos from "~/components/home/Photos.vue";
import confetti from 'canvas-confetti';

const title = ref("Java Champion, Spring Developer Advocate, YouTuber and Lifelong Learner");
const about = ref("Hello 👋🏻 My name is Dan Vega, Java Champion, Spring Developer Advocate, Husband and #GirlDad based outside of Cleveland OH. I created this website as a place to document my journey as I learn new things and share them with you. I have a real passion for teaching and I hope that one of blog posts, videos or courses helps you solve a problem or learn something new.");

useHead({
  title: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner',
  meta: [
    { name: 'title', content: 'Dan Vega - Java Champion, Spring Developer Advocate, YouTuber and Lifelong Learner' },
    { name: 'description', content: about }
  ]
});

const handleKeydown = (event: KeyboardEvent) => {
  if (event.code === 'Space' && event.ctrlKey && !event.repeat) {
    event.preventDefault(); // Prevent scrolling
    console.log('Confetti time!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      scalar: 1.5 // Increase the size of the confetti
    });
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
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
