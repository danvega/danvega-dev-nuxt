<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    required: false
  },
  center: {
    type: Boolean,
    default: false
  }
})

const getImageStyle = () => {
  if (props.width) {
    return { maxWidth: `${props.width}px !important`, width: `${props.width}px !important` }
  }
  return {}
}

const getWrapperClasses = () => {
  return props.center ? 'mx-auto' : ''
}
</script>

<template>
  <div :class="getWrapperClasses()" style="display: inline-block;">
    <img
      :src="src"
      :alt="alt"
      :style="getImageStyle()"
      class="rounded-3xl custom-width-image"
    />
  </div>
</template>
