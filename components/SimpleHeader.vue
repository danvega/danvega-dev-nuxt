<script  lang="ts" setup="">
import NavigationButtons from "~/components/NavigationButtons.vue";

const emit = defineEmits(['showSearchDialog']);

const navItems: NavItem[] = [
  {name: "About",link: "/about"},
  {name: "Blog",link: "/articles"},
  {name: "Newsletter",link: "/newsletter"},
  {name: "Speaking",link: "/speaking"},
  {name: "Courses",link: "/courses"},
  {name: "Uses",link: "/uses"}
];
</script>

<template>
  <header class="pointer-events-none relative z-50 flex flex-none flex-col" style="height:var(--header-height);margin-bottom:var(--header-mb)">

    <!-- these 2 divs are different for the simple header -->
    <div class="top-0 z-10 h-16 pt-6" style="position:var(--header-position)">
      <div class="sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full" style="position:var(--header-inner-position)">

        <!-- container -->
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <div class="relative px-4 sm:px-8 lg:px-12">
            <div class="mx-auto max-w-2xl lg:max-w-5xl">

              <!-- these 2 are different for simple header -->
              <div class="relative flex gap-4">
                <div class="flex flex-1">

                  <!-- avatar container | avatar is different for simple header-->
                  <div class="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
                    <!--- avatar -->
                    <a aria-label="Home" class="pointer-events-auto" href="/">
                      <img alt="" width="512" height="512"
                           class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
                           style="color: transparent;" src="/images/dan_avatar.jpg">
                    </a>
                  </div>

                </div>

                <!-- nav container -->
                <div class="flex flex-1 justify-end md:justify-center">
                  <Navbar />
                </div>

                <NavigationButtons @show-search-dialog="$emit('showSearchDialog')"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>