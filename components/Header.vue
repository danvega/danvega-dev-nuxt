<script setup lang="ts">

</script>

<template>

  <header class="pointer-events-none relative z-50 flex flex-none flex-col" style="height:var(--header-height);margin-bottom:var(--header-mb)">
    <div class="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"></div>
    <div class="sm:px-8 top-0 order-last -mb-3 pt-3" style="position:var(--header-position)">

      <!-- container.tsx -->
      <div class="mx-auto w-full max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">


            <div class="top-[var(--avatar-top,theme(spacing.3))] w-full" style="position:var(--header-inner-position)">
              <div class="relative">

                <!-- avatar container -->
                <div class="absolute left-0 top-3 origin-left transition-opacity h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10" style="opacity:var(--avatar-border-opacity, 0);transform:var(--avatar-border-transform)"></div>
                <!-- avatar -->
                <a aria-label="Home" class="block h-16 w-16 origin-left pointer-events-auto" style="transform:var(--avatar-image-transform)" href="/">
                  <img alt="Dan Vega"
                     width="512" height="512"
                     class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-16 w-16"
                     style="color:transparent"
                     src="/images/dan_avatar.jpg"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="top-0 z-10 h-16 pt-6" style="position:var(--header-position)">

      <div class="sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full" style="position:var(--header-inner-position)">
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <div class="relative px-4 sm:px-8 lg:px-12">
            <div class="mx-auto max-w-2xl lg:max-w-5xl">
              <div class="relative flex gap-4">
                <div class="flex flex-1"></div>

                <!-- nav container -->
                <div class="flex flex-1 justify-end md:justify-center">
                  <Navbar/>
                </div>

                <ThemeToggle/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!--- Header.tsx isHomePage -->
  <div class="flex-none" style="height:var(--content-offset)"></div>

</template>