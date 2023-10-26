<script setup lang="ts">
import SearchDialog from "~/components/SearchDialog.vue";
const emit = defineEmits(['showSearchDialog']);
const route = useRoute();
const isHome = useIsHome(route);

function useIsHome(route: any) {
  const isHome = ref(false);
  const updateIsHome = () => {
    isHome.value = route.name === 'index';
  };
  // Initial check
  updateIsHome();

  // Watch for route changes
  watch(() => route.path, updateIsHome);

  return isHome;
}

const { data } = await useAsyncData('searchBlogPosts', () => queryContent('blog')
    .sort({ date: -1 })
    .only(['id','title','_path'])
    .find())


const isSearchDialogOpen = ref(false);
function showSearchDialog() {
  isSearchDialogOpen.value = true;
}
</script>

<template>
  <SearchDialog :posts="data" :show-search-dialog="isSearchDialogOpen" @close-search-dialog="isSearchDialogOpen = false"/>
  <div class="flex h-full bg-zinc-50 dark:bg-black">
    <div class="flex w-full">
      <div class="fixed inset-0 flex justify-center sm:px-8">
        <div class="flex w-full max-w-7xl lg:px-8">
          <div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"></div>
        </div>
      </div>
      <div class="relative flex w-full flex-col">
        <Header v-if="isHome" @show-search-dialog="showSearchDialog"/>
        <SimpleHeader v-else @show-search-dialog="showSearchDialog"/>
          <main class="flex-auto">
            <slot />
          </main>
        <Footer/>
      </div>
    </div>
  </div>
</template>>