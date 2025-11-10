<script lang="ts" setup="">
import {Popover, PopoverButton, PopoverOverlay, PopoverPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";

type NavItem = {
  name: string,
  link: string
}

const navItems: NavItem[] = [
  {name: "About",link: "/about"},
  {name: "Blog",link: "/blog/"},
  {name: "Newsletter",link: "/newsletter/"},
  {name: "Speaking",link: "/speaking"},
  {name: "Books",link: "/books/fundamentals-of-software-engineering"},
  {name: "Courses",link: "/courses"},
  {name: "Uses",link: "/uses"}
];
</script>

<template>

  <ClientOnly>
    <Popover class="pointer-events-auto md:hidden">
    <PopoverButton class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/2">
      Menu
      <svg viewBox="0 0 8 6" aria-hidden="true" class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400">
        <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </PopoverButton>
    <TransitionRoot>
      <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"/>
      <PopoverOverlay class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80"/>
      <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"/>
    </TransitionRoot>
    <PopoverPanel class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800" focus>
      <div class="flex flex-row-reverse items-center justify-between">
        <PopoverButton aria-label="Close menu" className="-m-1 p-1">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 text-zinc-500 dark:text-zinc-400">
            <path d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PopoverButton>
        <h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Navigation
        </h2>
      </div>
      <nav class="mt-6">
        <ul class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
          <li>
            <PopoverButton
                as="a"
                href="/"
                aria-label="Nav Button"
                class="hover:text-blue-500 dark:hover:text-blue-400 block py-2">
              Home
            </PopoverButton>
          </li>
          <li v-for="nav in navItems" :key="nav.name">
            <PopoverButton
                as="a"
                :aria-label="nav.name"
                class="hover:text-blue-500 dark:hover:text-blue-400 block py-2"
                :href="nav.link">
              {{ nav.name }}
            </PopoverButton>
          </li>
        </ul>
      </nav>
    </PopoverPanel>
  </Popover>
  </ClientOnly>

  <!-- desktop nav -->
    <nav class="pointer-events-auto hidden md:block">
      <ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
         <li v-for="nav in navItems" :key="nav.name">
          <NuxtLink
            :href="nav.link"
            active-class="text-blue-500 dark:text-blue-400"
            class="relative block px-3 py-2 transition hover:text-blue-500 dark:hover:text-blue-400">{{nav.name}}</NuxtLink>
        </li>
      </ul>
    </nav>

</template>