<script setup lang="ts">
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

const getYouTubeId = () => {
  if (props.id) return props.id;
  if (props.src) {
    // Extract video ID from various YouTube URL formats
    return props.src.split('/').pop();
  }
  return null;
}

// video id from newsletter: erp-7MCK5BU
// full embed path from blog post front matter: https://www.youtube.com/embed/V4gsffMge7E
</script>

<template>
  <lite-youtube
      :videoid="getYouTubeId()"
      class="max-w-full bg-cover bg-center"/>
</template>