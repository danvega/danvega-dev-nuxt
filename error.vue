<script setup lang="ts">
const props = defineProps({
  error: Object
})

</script>

<template>
  <NuxtLayout name="default">
    <Container class="mt-16 sm:mt-32">
      <header class="max-w-4xl">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Oops, something went wrong!
        </h1>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          It looks like you have come up empty my friend. It happens once in awhile so don't feel bad about it.
          The good news for you is that you can use the navigation above to find what you're looking for.
          If you are looking for a specific blog post please try using the search. If nothing works and you
          still need please feel free to <NuxtLink to="/about">contact me</NuxtLink>.
        </p>
      </header>
      <div class="m-8 max-w-4xl flex justify-center items-center">
        <NuxtImg src="/images/undraw_empty.svg" loading="lazy"/>
      </div>
    </Container>
  </NuxtLayout>
</template>