<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
    description: 'URL to the PDF file'
  },
  height: {
    type: String,
    default: '500px',
    description: 'Height of the PDF viewer'
  },
  width: {
    type: String,
    default: '100%',
    description: 'Width of the PDF viewer'
  },
  title: {
    type: String,
    default: 'PDF Document',
    description: 'Title for accessibility'
  }
})
</script>

<template>
  <div class="pdf-embed my-4">
    <iframe 
      :src="src" 
      :height="height" 
      :width="width"
      frameborder="0" 
      :title="title"
      class="pdf-iframe"
      allowfullscreen>
      <p>Your browser does not support embedded PDFs. Please <a :href="src">download the PDF</a> to view it.</p>
    </iframe>
  </div>
</template>

<style>
.pdf-embed {
  position: relative;
  overflow: hidden;
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.pdf-iframe {
  border: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .pdf-embed {
    height: 400px;
  }
}
</style>