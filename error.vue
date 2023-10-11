<script setup lang="ts">
const props = defineProps({
  error: Object
})

</script>

<template>
  <NuxtLayout name="default">
    <Container class="mt-16 sm:mt-32">
      <header class="max-w-2xl">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Page Not Found
        </h1>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          This is not the page you are looking for.
        </p>
      </header>
      <div class="h-full">
        <br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/>
      </div>
    </Container>
  </NuxtLayout>
</template>