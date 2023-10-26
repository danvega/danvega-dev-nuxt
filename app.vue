<script setup lang="ts">
import SearchDialog from "~/components/SearchDialog.vue";

useHead({
  title: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner',
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner' },
    { name: 'twitter:description', content: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner' },
    { name: 'twitter:image', content: 'https://www.danvega.dev/images/danvega_dev_cover.png' },
    { name: 'twitter:site', content: '@therealdanvega' },
    { name: 'twitter:creator', content: '@therealdanvega' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: 'Dan Vega - Spring Developer Advocate, YouTuber and Lifelong Learner' },
    { name: 'og:description', content: 'Hello 👋🏻 My name is Dan Vega, Spring Developer Advocate, Husband and #GirlDad based outside of Cleveland OH. I created this website as a place to document my journey as I learn new things and share them with you. I have a real passion for teaching and I hope that one of blog posts, videos or courses helps you solve a problem or learn something new.' },
    { name: 'og:url', content: 'https://www.danvega.dev' },
    { name: 'og:image', content: 'https://www.danvega.dev/images/danvega_dev_cover.png' },
    { name: 'og:image:secure_url', content: 'https://www.danvega.dev/images/danvega_dev_cover.png' },
  ],
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>