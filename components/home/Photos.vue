<script  lang="ts" setup="">
const photos : Photo[] = [
  {id: 1, width: 1000, height: 1500, src: "/images/photos/image-1.jpg", rotate: "rotate-2", alt: "Image 1"},
  {id: 2, width: 1000, height: 667, src: "/images/photos/image-2.jpg", rotate: "-rotate-2", alt: "Image 2"},
  {id: 3, width: 1000, height: 667, src: "/images/photos/image-3.jpg", rotate: "rotate-2", alt: "Image 3"},
  {id: 4, width: 1000, height: 1250, src: "/images/photos/image-4.jpg", rotate: "rotate-2", alt: "Image 4"},
  {id: 5, width: 1000, height: 562, src: "/images/photos/image-5.jpg", rotate: "-rotate-2", alt: "Image 5"},
];
</script>

<template>
  <div class="mt-16 sm:mt-20">
    <div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      <div v-for="photo in photos" :key="photo.id"
           class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl"
           :class="photo.rotate">
        <NuxtImg
            :src="photo.src"
            :alt="photo.alt"
            format="webp"
            loading="lazy"
            width="288"
            height="320"
            class="absolute inset-0 h-full w-full object-cover"
            style="color:transparent"/>
      </div>
    </div>
  </div>
</template>