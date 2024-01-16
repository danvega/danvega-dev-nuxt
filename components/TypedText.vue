<template>
  <p id="typedMessage" class="typed"></p>
</template>

<script setup>
import Typed from 'typed.js'
import {onMounted, ref, defineProps} from 'vue'

const props = defineProps(['typed'])

const options = {
  strings: props.typed,
  bindInputFocusEvents: true,
  loop: true,
  backSpeed: 10,
  typeSpeed: 50,
  showCursor: false,
  cursorChar: '|',
  smartBackspace: true,
  delay: 400,
}

const typedText = ref('')

onMounted(() => {
  typedText.value = new Typed('#typedMessage', options)
})
</script>

<style scoped>
.typed::after {
  content: '|';
  animation: blink 0.7s infinite;
}
</style>