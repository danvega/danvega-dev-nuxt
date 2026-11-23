<script lang="ts" setup="">
const title = 'Elf Hunt - Support';
useHead({
  title: title,
  meta: [
    { name: 'title', content: title },
    { name: 'description', content: 'Help with Elf Hunt, the Christmas seek-and-find game.' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Elf Hunt support
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        Elf Hunt is a Christmas seek-and-find game. A new house opens every day from December 1 to Christmas.
      </p>
    </header>

    <div class="mt-10 max-w-3xl space-y-8 text-base text-zinc-700 dark:text-zinc-300">
      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Get help</h2>
        <p class="mt-2">Email <a href="mailto:help@danvega.dev">help@danvega.dev</a>. You can also open the app, tap the gear in the town, answer the grown-up question and choose Report a problem. That email includes your app and iOS versions, which helps a lot.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Common questions</h2>
        <ul class="mt-2 list-disc space-y-2 pl-6">
          <li><strong>Why is a house locked?</strong> Houses open by date in December, and each house waits for the one before it. Missed days stay open, so you can always catch up.</li>
          <li><strong>I bought the unlock on another device.</strong> Tap the gear, answer the grown-up question and choose Restore purchase. Family Sharing is on, so one purchase covers your family.</li>
          <li><strong>Can more than one person play?</strong> Yes. Tap "Playing as" in the town to add up to six players. Each keeps their own houses, stickers and Santas.</li>
          <li><strong>The clock ran out.</strong> That's fine. Keep looking. The clock is a bonus, and you can always finish the house.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Privacy</h2>
        <p class="mt-2">Elf Hunt collects nothing. Read the <NuxtLink to="/elf-hunt/privacy">privacy policy</NuxtLink>.</p>
      </section>
    </div>
  </Container>
</template>
