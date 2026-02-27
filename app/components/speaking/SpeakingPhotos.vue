<script setup lang="ts">
interface Photo {
  id: number
  src: string
  alt: string
  filename: string
}

const props = defineProps<{
  slug: string
}>()

const { data: photos } = await useFetch<Photo[]>(`/api/speaking/${props.slug}/photos`)

const lightboxPhoto = ref<Photo | null>(null)

function openLightbox(photo: Photo) {
  lightboxPhoto.value = photo
}

function closeLightbox() {
  lightboxPhoto.value = null
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeLightbox()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div v-if="photos?.length" class="mt-16">
    <h2 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
      Photos
    </h2>

    <!-- Single photo -->
    <div v-if="photos.length === 1" class="mt-8">
      <button
        class="overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="openLightbox(photos[0])"
      >
        <NuxtImg
          :src="photos[0].src"
          :alt="photos[0].alt"
          format="webp"
          loading="lazy"
          sizes="sm:100vw md:768px"
          class="w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </button>
    </div>

    <!-- Two photos -->
    <div v-else-if="photos.length === 2" class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      <button
        v-for="photo in photos"
        :key="photo.id"
        class="overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="openLightbox(photo)"
      >
        <NuxtImg
          :src="photo.src"
          :alt="photo.alt"
          format="webp"
          loading="lazy"
          sizes="sm:100vw md:384px"
          class="aspect-[4/3] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </button>
    </div>

    <!-- Three or more photos -->
    <div v-else class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="photo in photos"
        :key="photo.id"
        class="overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="openLightbox(photo)"
      >
        <NuxtImg
          :src="photo.src"
          :alt="photo.alt"
          format="webp"
          loading="lazy"
          sizes="sm:100vw md:384px lg:256px"
          class="aspect-[4/3] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxPhoto"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        @click.self="closeLightbox"
      >
        <button
          class="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close"
          @click="closeLightbox"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <NuxtImg
          :src="lightboxPhoto.src"
          :alt="lightboxPhoto.alt"
          format="webp"
          class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
        />
      </div>
    </Teleport>
  </div>
</template>
