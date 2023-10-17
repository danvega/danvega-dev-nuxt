<script  lang="ts" setup="">
const props = defineProps({
  tags: {
    type: Array,
    required: true
  }
});

const encodeTag = (tag) => {
  return `/blog?tag=${encodeURIComponent(tag)}`;
}
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-4 my-8">
    <a v-for="tag in tags" :key="tag" :href="encodeTag(tag)">
      <span class="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700" >
        <svg class="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
          <circle cx="3" cy="3" r="3" />
        </svg>
        {{ tag }}
      </span>
    </a>
  </div>
</template>