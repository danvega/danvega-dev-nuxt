<script setup lang="ts">
withDefaults(defineProps<{
  heading?: string;
  campaign?: string;
  inputId?: string;
}>(), {
  heading: 'Enjoyed this post? Get the next one.',
  campaign: 'blog-post-footer',
  inputId: 'blog-footer-email'
});
</script>

<template>
  <div class="mt-16 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
    <div class="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
      <span class="h-3 w-3 rounded-full bg-red-500"></span>
      <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
      <span class="h-3 w-3 rounded-full bg-green-500"></span>
      <span class="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">subscribe.sh</span>
    </div>
    <div class="p-6">
      <p class="font-mono text-sm text-green-600 dark:text-green-400">$ subscribe --list weeklyish</p>
      <h2 class="mt-3 text-xl font-semibold text-zinc-800 dark:text-zinc-100">
        {{ heading }}
      </h2>
      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Java, Spring, and what I'm learning — one email, weekly(ish). Unsubscribe anytime.
      </p>
      <form action="/api/beehiiv/subscribe" method="post" class="mt-6 flex flex-col gap-3 sm:flex-row">
        <input type="hidden" name="campaign" :value="campaign" />
        <label :for="inputId" class="sr-only">Email address</label>
        <input :id="inputId" type="email" name="email" required autocomplete="email" placeholder="you@example.com"
               class="min-w-0 flex-auto rounded-md border-0 px-3 py-2 font-mono text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-600" />
        <button type="submit"
                class="flex-none rounded-md bg-zinc-800 dark:bg-zinc-700 px-4 py-2 font-mono text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors">
          ./subscribe
        </button>
      </form>
    </div>
  </div>
</template>
