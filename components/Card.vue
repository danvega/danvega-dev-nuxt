<template>
  <!-- Card Component -->
  <Component :class="[className, 'group relative flex flex-col items-start']">
    <slot></slot>
  </Component>

  <!-- Card.Link Component -->
  <template v-if="isLink">
    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
    <router-link :to="href">
      <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
      <span class="relative z-10">
        <slot name="link"></slot>
      </span>
    </router-link>
  </template>

  <!-- Card.Title Component -->
  <template v-if="isTitle">
    <Component :class="['text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100']">
      <slot v-if="!href" name="title"></slot>
      <CardLink v-if="href" :href="href">
        <slot name="title"></slot>
      </CardLink>
    </Component>
  </template>

  <!-- Card.Description Component -->
  <template v-if="isDescription">
    <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      <slot name="description"></slot>
    </p>
  </template>

  <!-- Card.Cta Component -->
  <template v-if="isCta">
    <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
      <slot name="cta"></slot>
      <ChevronRightIcon class="ml-1 h-4 w-4 stroke-current" />
    </div>
  </template>

  <!-- Card.Eyebrow Component -->
  <template v-if="isEyebrow">
    <Component :class="eyebrowClasses">
      <span v-if="decorate" class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
        <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
      </span>
      <slot name="eyebrow"></slot>
    </Component>
  </template>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Card',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    className: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    decorate: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ChevronRightIcon: {
      props: ['className'],
      template: `
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" :class="className">
          <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      `
    }
  },
  setup(props) {
    const Component = ref(props.as);

    const eyebrowClasses = computed(() => {
      return [
        props.className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        props.decorate && 'pl-3.5'
      ];
    });

    return {
      Component,
      eyebrowClasses
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
