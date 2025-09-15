<script lang="ts" setup="">
// route success=true show success message
const route = useRoute();
const showSuccessMessage = ref(false);

if(route.query.success) {
  showSuccessMessage.value = true;
}
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-4xl h-screen">
      <p class="mt-6 mb-8 text-base bg-blue-200 p-4 rounded-xl text-zinc-600 dark:bg-blue-500 dark:text-white" v-if="showSuccessMessage">
        Success! Now check your email to confirm your subscription.
      </p>
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Thanks for subscribing.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings.
      </p>

      <NuxtImg src="/images/undraw_Newsletter_re_wrob.svg" class="my-20 mx-auto rounded-2xl"/>
    </header>
  </Container>
</template>