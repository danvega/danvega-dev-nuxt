<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, Dialog, DialogPanel, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import {useGetSlugFromPath} from "~/composables/pathUtils";

const { getSlugFromPath } = useGetSlugFromPath();
const emit = defineEmits(['closeSearchDialog']);
const { posts = [], showSearchDialog = false } = defineProps<{posts?: Array, showSearchDialog?: boolean }>()
const isOpen = ref( false )
const query = ref('')
const filteredPosts = computed(() =>
    query.value === ''
        ? []
        : posts.filter((post) => {
          return post.title.toLowerCase().includes(query.value.toLowerCase())
        })
);
const keys = useMagicKeys()
const CmdK = keys['Meta+K']

watch(() => showSearchDialog, () => {
    setIsOpen(true);
});

watch(CmdK, (v) => {
  if (v) {
    setIsOpen(true);
  }
})

function setIsOpen(value) {
  isOpen.value = value;
  emit('closeSearchDialog')
}

function onAfterLeave() {
  query.value = '';
  setIsOpen(false);
}

function onSelect(post) {
  window.location = `/blog/${getSlugFromPath(post._path)}`;
}
</script>

<template>
  <TransitionRoot :show="isOpen" as="template" @after-leave="onAfterLeave" appear>
    <Dialog as="div" class="relative z-10" :open="isOpen" @close="setIsOpen(false)">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 pt-[20vh]">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <DialogPanel class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <Combobox @update:modelValue="onSelect">
              <div class="relative">
                <MagnifyingGlassIcon class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search Blog Posts..." @change="query = $event.target.value" />
              </div>

              <ComboboxOptions v-if="filteredPosts.length > 0" static class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                <ComboboxOption v-for="post in filteredPosts" :key="post.id" :value="post" as="template" v-slot="{ active }">
                  <li :class="['cursor-default select-none px-4 py-2', active && 'bg-blue-600 text-white']">
                    {{ post.title }}
                  </li>
                </ComboboxOption>
              </ComboboxOptions>

              <p v-if="query !== '' && filteredPosts.length === 0" class="p-4 text-sm text-gray-500">No posts found.</p>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

