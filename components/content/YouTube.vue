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

const getEmbedUrl = () => {
  if(props.src) {
    return props.src;
  } else {
    return `https://www.youtube.com/embed/${props.id}`
  }
}

// video id from newsletter: erp-7MCK5BU
// full embed path from blog post front matter: https://www.youtube.com/embed/4OVe0MWgZ4k
</script>

<template>
  <!-- update to non iframe later -->
  <iframe :src="getEmbedUrl()"
          class="w-full aspect-video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
  </iframe>
</template>