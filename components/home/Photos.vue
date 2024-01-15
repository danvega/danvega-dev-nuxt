<script  lang="ts" setup="">
const photos : Photo[] = [
  {id: 1, width: 1024, height: 769, src: "/images/photos/vmware_raghu.jpeg", alt: "VMware Explore Las Vegas"},
  {id: 2, width: 1024, height: 768, src: "/images/photos/team_devnexus.jpeg", alt: "Devnexus 2023"},
  {id: 3, width: 1024, height: 769, src: "/images/photos/vmware_sanfran.jpeg", alt: "VMware San Francisco"},
  {id: 4, width: 769, height: 1024, src: "/images/photos/dan_ken.jpeg", alt: "Dan & Ken Kousen"},
  {id: 5, width: 1086, height: 724, src: "/images/photos/dan_kcdc.jpeg", alt: "KCDC 2023"},
  {id: 6, width: 1024, height: 768, src: "/images/photos/dan_shar_nate_vegas.jpeg", alt: "Dan/Shar/Nate Las Vegas"},
  {id: 7, width: 1024, height: 768, src: "/images/photos/golf_lasvegas.jpeg", alt: "Golf in Las Vegas"},
  {id: 8, width: 768, height: 1024, src: "/images/photos/family_hilton_head.jpeg", alt: "Family in Hilton Head"},
  {id: 9, width: 768, height: 1024, src: "/images/photos/dad_bella_dance.jpeg", alt: "Daddy Daughter Dance"},
  {id: 10, width: 1440, height: 817, src: "/images/photos/lawrence_dan_connecttech.jpeg", alt: "Lawrence & Dan at ConnectTech"},
  {id: 11, width: 2000, height: 1500, src: "/images/photos/dan_purnima_dashaun_springone.png", alt: "Dan/Purnima/Dashaun SpringOne"},
  {id: 12, width: 2000, height: 2667, src: "/images/photos/springone_office_hours.png", alt: "Spring Office Hours Live"},
  {id: 13, width: 2000, height: 1500, src: "/images/photos/dan_springone_graphql_2023.png", alt: "Spring Office Hours Live"},
];

function getRandomPhotos(photos: Photo[], count: number): Photo[] {
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }
  return photos.slice(0, count);
}

const randomPhotos = getRandomPhotos(photos, 4);
</script>

<template>
  <div class="mt-16 sm:mt-20">
    <div class="-my-4 flex flex-wrap justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      <div v-for="(photo, index) in randomPhotos" :key="photo.id"
           class="relative aspect-[9/10] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
           :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'">
        <NuxtImg
            :src="photo.src"
            :alt="photo.alt"
            format="webp"
            loading="lazy"
            class="h-full w-full object-cover"
            style="color:transparent"/>
      </div>
    </div>
  </div>
</template>