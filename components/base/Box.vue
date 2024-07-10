<template>
  <div
    class="bg-white"
    :class="[
      {
        'shadow-lg': variant == 'shadow',
        border: variant == 'flat',
        'p-4 sm:p-8 lg:p-10': padding == 'lg',
        'p-6 lg:p-8': padding == 'sm',
        'p-4 lg:p-6': padding == 'xs',
      },
    ]"
  >
    <slot name="header" />
    <template v-if="loading">
      <LoadingIndicator> {{ loadingText }}</LoadingIndicator>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'

export default defineNuxtComponent({
  components: {
    LoadingIndicator,
  },
  props: {
    loading: { type: Boolean, default: false },
    loadingText: { type: String, default: 'Chargement en cours' },
    variant: {
      type: [String, Boolean],
      default: 'shadow',
      validator: (s) => ['shadow', 'flat', false].includes(s),
    },
    padding: {
      type: [String, Boolean],
      default: 'lg',
      validator: (s) => ['xs', 'sm', 'lg', false].includes(s),
    },
  },
})
</script>
