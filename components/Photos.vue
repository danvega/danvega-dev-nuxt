<script  lang="ts" setup="">
const photos : Photo[] = [
  {id: 1, width: 3744, height: 5616, src: "/images/photos/image-1.jpg", rotate: "rotate-2"},
  {id: 2, width: 3936, height: 2624, src: "/images/photos/image-2.jpg", rotate: "-rotate-2"},
  {id: 3, width: 5760, height: 3840, src: "/images/photos/image-3.jpg", rotate: "rotate-2"},
  {id: 4, width: 2400, height: 3000, src: "/images/photos/image-4.jpg", rotate: "rotate-2"},
  {id: 5, width: 4240, height: 2384, src: "/images/photos/image-5.jpg", rotate: "-rotate-2"},
];
</script>

<template>
  <div class="mt-16 sm:mt-20">
    <div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      <div v-for="photo in photos" :key="photo.id"
           class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl"
           :class="photo.rotate">
        <img alt="" loading="lazy" :width="photo.width" :height="photo.height" decoding="async" data-nimg="1"
             class="absolute inset-0 h-full w-full object-cover" style="color:transparent"
             :src="photo.src"/>
      </div>
    </div>
  </div>
</template>