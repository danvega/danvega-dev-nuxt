<script lang="ts" setup="">

</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-2xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
       If you want to learn check out one of my courses.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        Below you will find a list of courses that I currently have available. I put a lot of effort and passion into each one of my courses and I hope that shows. If you're interested in a topic that I don't have listed here please contact me.</p>
    </header>

    <div class="mt-16 sm:mt-20">
      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">

          <article class="md:grid md:grid-cols-4 md:items-baseline">

            <!-- card : turn this into a component at some point -->
            <div class="">
            </div>
            <div class="md:col-span-3 group relative flex flex-col items-start">
              <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                <a href="https://www.udemy.com/course/vue-intro/?referralCode=E9DECFF78CA706D7A68A">
                  <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                  <span class="relative z-10">VUE FOR BEGINNERS: UP AND RUNNING WITH VUE</span>
                </a>
              </h2>
              <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                A beginner's guide to learn the basics of the JavaScript Framework Vue.js.
              </p>
              <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">Visit Course
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
                  <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
              <img
                  src="/images/courses/vue_udemy_cover.png"
                  alt="Vue for Beginners"
                  class="rounded-2xl w-1/2 mt-4"/>
            </div>


          </article>


        </div>
      </div>
    </div>

  </Container>
</template>