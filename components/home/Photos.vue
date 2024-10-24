<script  lang="ts" setup="">
// const photos : Photo[] = [
//   {id: 1, width: 1024, height: 769, src: "/images/photos/vmware_raghu.jpeg", alt: "VMware Explore Las Vegas"},
//   {id: 2, width: 1024, height: 768, src: "/images/photos/team_devnexus.jpeg", alt: "Devnexus 2023"},
//   {id: 3, width: 1024, height: 769, src: "/images/photos/vmware_sanfran.jpeg", alt: "VMware San Francisco"},
//   {id: 4, width: 769, height: 1024, src: "/images/photos/dan_ken.jpeg", alt: "Dan & Ken Kousen"},
//   {id: 5, width: 1086, height: 724, src: "/images/photos/dan_kcdc.jpeg", alt: "KCDC 2023"},
//   {id: 6, width: 1024, height: 768, src: "/images/photos/dan_shar_nate_vegas.jpeg", alt: "Dan/Shar/Nate Las Vegas"},
//   {id: 7, width: 1024, height: 768, src: "/images/photos/golf_lasvegas.jpeg", alt: "Golf in Las Vegas"},
//   {id: 8, width: 768, height: 1024, src: "/images/photos/family_hilton_head.jpeg", alt: "Family in Hilton Head"},
//   {id: 9, width: 768, height: 1024, src: "/images/photos/dad_bella_dance.jpeg", alt: "Daddy Daughter Dance"},
//   {id: 10, width: 1440, height: 817, src: "/images/photos/lawrence_dan_connecttech.jpeg", alt: "Lawrence & Dan at ConnectTech"},
//   {id: 11, width: 2000, height: 1500, src: "/images/photos/dan_purnima_dashaun_springone.png", alt: "Dan/Purnima/Dashaun SpringOne"},
//   {id: 12, width: 1920, height: 1968, src: "/images/photos/springone_office_hours.png", alt: "Spring Office Hours Live"},
//   {id: 13, width: 2000, height: 1500, src: "/images/photos/dan_springone_graphql_2023.png", alt: "Spring Office Hours Live"},
//   {id: 14, width: 1024, height: 768, src: "/images/photos/spring_io_dan_dashaun.jpeg", alt: "Dan & DaShaun Live from Spring I/O"},
//   {id: 15, width: 1024, height: 768, src: "/images/photos/spring_io_laur.jpeg", alt: "Meeting Laur for the first time with a Signed copy of his book"},
//   {id: 16, width: 1024, height: 768, src: "/images/photos/spring_io_morning_session.jpeg", alt: "Live from the morning session"},
//   {id: 17, width: 1024, height: 768, src: "/images/photos/spring_io_my_session.jpeg", alt: "A view from my session"},
//   {id: 18, width: 1920, height: 1629, src: "/images/photos/kcdc_01.jpeg", alt: "Me Presenting at KCDC 2024 on Spring Boot 3"},
//   {id: 19, width: 1920, height: 1227, src: "/images/photos/kcdc_02.jpeg", alt: "KCDC Backdrop"},
//   {id: 20, width: 1920, height: 1440, src: "/images/photos/kcdc_03.jpeg", alt: "Me and DaShaun before my session"},
//   {id: 21, width: 2048, height: 1076, src: "/images/photos/spring_one_2024_01.jpeg", alt: "Spring Spotlight Keynote"},
//   {id: 22, width: 1024, height: 768, src: "/images/photos/spring_one_2024_02.jpeg", alt: "Spring Spotlight Keynote"},
//   {id: 23, width: 1024, height: 768, src: "/images/photos/spring_one_2024_03.jpeg", alt: "GraphQL Session"},
//   {id: 24, width: 1024, height: 768, src: "/images/photos/spring_one_2024_04.jpeg", alt: "GraphQL Session"},
// ];

const photos = ref<Photo[]>([]);
const randomPhotos = ref<Photo[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null)

async function fetchPhotos() {
  try {
    const response = await fetch('/api/photos'); // Adjust this URL to your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    const data = await response.json();
    photos.value = data.map((photo: any, index: number) => ({
      id: index + 1,
      width: photo.width || 1024, // Default values if not provided by API
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
    <div v-if="isLoading" class="text-center">
      Loading photos...
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