<template>
  <button v-if="!href" :class="computedClass" v-bind="$attrs">
    <slot></slot>
  </button>
  <router-link v-else :to="href" :class="computedClass" v-bind="$attrs">
    <slot></slot>
  </router-link>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary'].includes(value)
    },
    href: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const variantStyles = ref({
      primary:
          'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
      secondary:
          'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'
    });

    const baseClass = 'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none';

    const computedClass = computed(() => {
      return `${baseClass} ${variantStyles.value[props.variant]} ${props.className}`;
    });

    return {
      computedClass
    };
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
