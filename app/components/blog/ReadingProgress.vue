<script setup lang="ts">
const progress = ref(0)

function updateProgress() {
  const article = document.getElementById('blog-content')
  if (!article) return

  const rect = article.getBoundingClientRect()
  const articleTop = rect.top + window.scrollY
  const articleHeight = rect.height
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  const start = articleTop
  const end = articleTop + articleHeight - windowHeight

  if (scrollY <= start) {
    progress.value = 0
  } else if (scrollY >= end) {
    progress.value = 100
  } else {
    progress.value = ((scrollY - start) / (end - start)) * 100
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
    <div
      class="h-full bg-blue-500 transition-[width] duration-150 ease-out"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
