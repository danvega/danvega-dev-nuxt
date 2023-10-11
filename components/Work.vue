<script lang="ts" setup="">

</script>

<template>
  <div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
    <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"
           stroke-linejoin="round" aria-hidden="true" class="h-6 w-6 flex-none">
        <path
            d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
            class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"></path>
        <path
            d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
            class="stroke-zinc-400 dark:stroke-zinc-500"></path>
      </svg>
      <span class="ml-3">Work</span></h2>
    <ol class="mt-6 space-y-4">
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <img alt="" loading="lazy" width="32" height="32" decoding="async" data-nimg="1"
               class="h-7 w-7" style="color:transparent"
               src="/images/logos/planetaria.svg"/></div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Planetaria
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">CEO</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
              aria-label="2019 until Present">
            <time dateTime="2019">2019</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2023">Present</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <img alt="" loading="lazy" width="28" height="28" decoding="async" data-nimg="1"
               class="h-7 w-7" style="color:transparent"
               src="/images/logos/airbnb.svg"/></div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">Airbnb
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Product Designer</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-400 dark:text-zinc-500" aria-label="2014 until 2019">
            <time dateTime="2014">2014</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2019">2019</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <img alt="" loading="lazy" width="28" height="28" decoding="async" data-nimg="1"
               class="h-7 w-7" style="color:transparent"
               src="/images/logos/facebook.svg"/></div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">Facebook
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">iOS Software Engineer</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-400 dark:text-zinc-500" aria-label="2011 until 2014">
            <time dateTime="2011">2011</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2014">2014</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <img alt="" loading="lazy" width="28" height="28" decoding="async" data-nimg="1"
               class="h-7 w-7" style="color:transparent"
               src="/images/logos/starbucks.svg"/></div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Starbucks
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Shift Supervisor</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-400 dark:text-zinc-500" aria-label="2008 until 2011">
            <time dateTime="2008">2008</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2011">2011</time>
          </dd>
        </dl>
      </li>
    </ol>
    <a class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
       href="#">Download CV
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"
           class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50">
        <path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </a></div>
</template>