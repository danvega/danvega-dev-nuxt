<script  lang="ts" setup="">
const props = defineProps({
  src: {
    type: String,
    required: false
  },
  id: {
    type: String,
    required: false
  }
})

const getYouTubeId = () => props.id ? props.id : props.src.split('/').pop();

// video id from newsletter: erp-7MCK5BU
// full embed path from blog post front matter: https://www.youtube.com/embed/4OVe0MWgZ4k
</script>

<template>
  <lite-youtube
      :videoid="getYouTubeId()"
      params="controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1"
      class="max-w-full bg-cover bg-center"/>
</template>