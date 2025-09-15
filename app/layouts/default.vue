<script setup lang="ts">
// Dynamic import for SearchDialog to reduce initial bundle size
const SearchDialog = defineAsyncComponent(() => import("~/components/SearchDialog.vue"));
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

// Lazy load search data only when needed - performance optimization
import type { SearchResult } from '~/types/content'

const searchData = ref<SearchResult[]>([])
const isSearchDataLoaded = ref(false)

const loadSearchData = async () => {
  if (isSearchDataLoaded.value) return

  try {
    const { useAllBlogPosts } = useBlogData()
    const { data: allBlogPosts } = await useAllBlogPosts()

    searchData.value = allBlogPosts.value?.map(post => ({
      title: post.title,
      _path: post.path || ''
    })) || []

    isSearchDataLoaded.value = true
  } catch (error) {
    console.error('Failed to load search data:', error)
  }
}


const isSearchDialogOpen = ref(false);
async function showSearchDialog() {
  await loadSearchData() // Load search data when dialog is opened
  isSearchDialogOpen.value = true;
}
</script>

<template>
  <SearchDialog :posts="searchData" :show-search-dialog="isSearchDialogOpen" @close-search-dialog="isSearchDialogOpen = false"/>
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