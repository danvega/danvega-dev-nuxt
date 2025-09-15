<script lang="ts" setup="">

</script>

<template>
  <div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
    <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-6 w-6 flex-none">
        <path d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"></path>
        <path d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5" class="stroke-zinc-400 dark:stroke-zinc-500"></path>
      </svg>
      <span class="ml-3">Work</span>
    </h2>
    <ol class="mt-6 space-y-4">
      <li class="flex gap-4">
        <div class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
              src="/images/work/broadcom.jpeg"
              alt="VMware"
              width="32"
              height="32"
              class="h-7 w-7 rounded-full"
              style="color:transparent"
              loading="lazy"/>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Broadcom
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Spring Developer Advocate</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2022 until Present">
            <time dateTime="2022">2023</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2023">Present</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
            src="/images/work/vmware.jpeg"
            alt="VMware"
            width="32"
            height="32"
            class="h-7 w-7 rounded-full"
            style="color:transparent"
            loading="lazy"/>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            VMware
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Spring Developer Advocate</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2022 until Present">
            <time dateTime="2022">2022</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2023">2023</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
              src="/images/work/briebug.jpeg"
              alt="Briebug"
              width="32"
              height="32"
              class="h-7 w-7 rounded-full"
              style="color:transparent"
              loading="lazy"/>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">Briebug
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Principal Enterprise Java Architect</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2021 until 2022">
            <time dateTime="2021">2021</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2022">2022</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
              src="/images/work/tech_elevator.jpeg"
              alt="Tech Elevator"
              width="32"
              height="32"
              class="h-7 w-7 rounded-full"
              style="color:transparent"
              loading="lazy"/>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">Tech Elevator
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Curriculum Developer</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2018 until 2021">
            <time dateTime="2018">2018</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2021">2021</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
              src="/images/work/markel.jpeg"
              alt="Markel Corp"
              width="32"
              height="32"
              class="h-7 w-7 rounded-full"
              style="color:transparent"
              loading="lazy"/>
          </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Markel
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Senior Developer</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2012 until 2018">
            <time dateTime="2012">2012</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2018">2018</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
              src="/images/work/steris.jpeg"
              alt="STERIS"
              width="32"
              height="32"
              class="h-7 w-7 rounded-full"
              style="color:transparent"
              loading="lazy"/>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Steris
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Senior Web Developer</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2008 until 2012">
            <time dateTime="2008">2008</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2012">2012</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
              src="/images/work/letter_nine.jpeg"
              alt="LetterNine"
              width="32"
              height="32"
              class="h-7 w-7 rounded-full"
              style="color:transparent"
              loading="lazy"/>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">LetterNine
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Web Developer</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2004 until 2008">
            <time dateTime="2004">2004</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2008">2008</time>
          </dd>
        </dl>
      </li>
      <li class="flex gap-4">
        <div
            class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <NuxtImg
              src="/images/work/five9.jpeg"
              alt="Five9"
              width="32"
              height="32"
              class="h-7 w-7 rounded-full"
              style="color:transparent"
              loading="lazy"/>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">Five9
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">Technical Support Specialist</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-500 dark:text-zinc-500" aria-label="2001 until 2004">
            <time dateTime="2018">2001</time>
            <span aria-hidden="true">—</span>
            <time dateTime="2021">2004</time>
          </dd>
        </dl>
      </li>
    </ol>
<!--    <a class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"-->
<!--       href="#" disabled="">Download CV (Coming Soon)-->
<!--      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"-->
<!--           class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50">-->
<!--        <path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" stroke-width="1.5"-->
<!--              stroke-linecap="round" stroke-linejoin="round"></path>-->
<!--      </svg>-->
<!--    </a>-->
  </div>
</template>