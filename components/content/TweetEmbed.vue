<template>
  <div class="tweet-embed">
    <blockquote class="twitter-tweet" :data-theme="theme">
      <a :href="tweetUrl">Loading tweet...</a>
    </blockquote>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'light'
  }
})

const tweetUrl = `https://twitter.com/x/status/${props.id}`

onMounted(() => {
  // Load Twitter widget script
  const script = document.createElement('script')
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
  script.setAttribute('async', true)
  document.head.appendChild(script)
})
</script>