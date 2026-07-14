<script lang="ts" setup>
const props = defineProps({
  tags: {
    type: Array as PropType<string[]>,
    required: true
  }
});

// Render the canonical spelling, and collapse a post that carries two variants of
// the same tag down to one chip.
const displayTags = computed(() => {
  const seen = new Map<string, string>();
  for (const tag of props.tags) {
    const key = tagKey(tag);
    if (!seen.has(key)) seen.set(key, tagDisplayName(tag));
  }
  return [...seen.values()];
});

const encodeTag = (tag: string) => {
  return `/blog?tag=${encodeURIComponent(tag)}`;
}
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-4 my-8">
    <a v-for="tag in displayTags" :key="tag" :href="encodeTag(tag)">
      <span class="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700" >
        <svg class="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
          <circle cx="3" cy="3" r="3" />
        </svg>
        {{ tag }}
      </span>
    </a>
  </div>
</template>
