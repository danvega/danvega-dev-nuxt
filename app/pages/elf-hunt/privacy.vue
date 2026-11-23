<script lang="ts" setup="">
const title = 'Elf Hunt - Privacy Policy';
useHead({
  title: title,
  meta: [
    { name: 'title', content: title },
    { name: 'description', content: 'Elf Hunt collects nothing. No accounts, no ads, no analytics and no tracking.' }
  ]
});
</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Elf Hunt privacy policy
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">Last updated: November 22, 2026</p>
    </header>

    <div class="mt-10 max-w-3xl space-y-8 text-base text-zinc-700 dark:text-zinc-300">
      <p>Elf Hunt is a Christmas seek-and-find game made by Dan Vega.</p>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">What we collect</h2>
        <p class="mt-2">Nothing. Elf Hunt has no accounts, no ads, no analytics and no tracking. The game itself never sends anything over the internet. Purchases go through Apple.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">What stays on your device</h2>
        <p class="mt-2">The game saves progress on your device only: the houses you finished, stickers, Santas found, times, and the player names and hat colors you type in. Deleting the app deletes all of it. We never see it.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Purchases</h2>
        <p class="mt-2">The one in-app purchase is handled by Apple. We never see your payment details.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Email</h2>
        <p class="mt-2">If a grown-up chooses Send feedback or Report a problem, your email app opens with the app version, the kind of device (iPhone or iPad) and its iOS version filled in. Nothing is sent unless you send that email.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Children</h2>
        <p class="mt-2">Elf Hunt collects no personal information from anyone, including children. Links and email sit behind a grown-up question.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Changes</h2>
        <p class="mt-2">If this policy changes, the new version will be in the app and on this page.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Contact</h2>
        <p class="mt-2"><a href="mailto:help@danvega.dev">help@danvega.dev</a></p>
      </section>
    </div>
  </Container>
</template>
