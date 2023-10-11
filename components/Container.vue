<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <!--- outer container -->
  <div class="sm:px-8" :class="props.class">
    <div class="mx-auto w-full max-w-7xl lg:px-8">
      <!-- inner container -->
      <div class="relative px-4 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>