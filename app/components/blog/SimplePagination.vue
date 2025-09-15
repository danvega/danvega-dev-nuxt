<script setup lang="ts">

const props = defineProps({
  count: {type: Number, required: true},
  page: {type: Number, required: true},
  limit: {type: Number, required: true}
});

const route = useRoute();
const tag = route.query.tag;

const prevLink = () => {
  let link = "/blog";
  if(props.page > 2) {
    link = link + `/${props.page - 1}`;
  }
  if(tag) {
    link = link + "?tag=" + tag;
  }
  return link;
}

const nextLink = () => {
  if(tag) {
    return `/blog/${props.page + 1}?tag=${tag}`
  } else {
    return `/blog/${props.page + 1}`;
  }
}

const toCount = () => {
  if(props.count < props.limit * props.page) {
    return props.count;
  } else {
    return props.limit * props.page;
  }
}
</script>

<template>
<nav class="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-zinc-900 px-4 py-3 sm:px-6" aria-label="Pagination">
  <div class="hidden sm:block">
    <p class="text-sm text-gray-700 dark:text-zinc-100">
      Showing
      <span class="font-medium">{{props.page > 1 ? (props.page -1) * props.limit : 1}}</span>
      to
      <span class="font-medium">{{toCount()}}</span>
      of
      <span class="font-medium">{{ props.count }}</span>
      results
    </p>
  </div>
  <div class="flex flex-1 justify-between sm:justify-end">
    <a :href="prevLink()"
       v-if="props.page != 1"
       class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:text-zinc-500 pl-3.5 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
      Previous
    </a>
    <a :href="nextLink()"
       v-if="(props.page * props.limit) < count"
       class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
      Next
    </a>
  </div>
</nav>
</template>