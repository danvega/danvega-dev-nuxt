<script  lang="ts" setup="">
const photos = ref<Photo[]>([]);
const randomPhotos = ref<Photo[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null)

async function fetchPhotos() {
  try {
    const response = await fetch('/api/photos');
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    const data = await response.json();
    photos.value = data.map((photo: any, index: number) => ({
      id: index + 1,
      width: photo.width || 1024,
      height: photo.height || 768,
      src: `/images/photos/${photo.filename}`,
      alt: photo.alt || `Photo ${index + 1}`
    }));
    isLoading.value = false;
  } catch (e) {
    console.error('Error fetching photos:', e);
    error.value = 'Failed to load photos. Please try again later.';
    isLoading.value = false;
  }
}

function getRandomPhotos(photoList: Photo[], count: number): Photo[] {
  const shuffled = [...photoList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function updateRandomPhotos() {
  if (photos.value.length > 0) {
    randomPhotos.value = getRandomPhotos(photos.value, 5);
  }
}

let intervalId: number;

onMounted(async () => {
  await fetchPhotos();
  updateRandomPhotos(); // Initial set of random photos
  intervalId = setInterval(updateRandomPhotos, 5000); // Update every 5 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="mt-16 sm:mt-20">
    <div v-if="isLoading" class="-my-4 flex flex-wrap justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      <div v-for="n in 5" :key="n"
           class="aspect-[9/10] w-44 sm:w-72 rounded-xl bg-zinc-200 dark:bg-zinc-700 animate-pulse">
      </div>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <div v-else class="-my-4 flex flex-wrap justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      <TransitionGroup name="fade" tag="div" class="flex flex-wrap justify-center gap-5 sm:gap-8">
        <div v-for="(photo, index) in randomPhotos" :key="photo.id"
             class="group relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:z-10"
             :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'">
          <NuxtImg
              :src="photo.src"
              :alt="photo.alt"
              format="webp"
              loading="lazy"
              width="288"
              height="320"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
              style="color:transparent"/>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
