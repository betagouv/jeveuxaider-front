<template>
  <div
    class="bg-white"
    :class="[
      {
        'shadow-lg': variant == 'shadow',
        border: variant == 'flat',
        'px-6 py-8 xl:py-12 xl:px-16': padding == 'lg',
        'px-6 py-8 xl:py-10 xl:px-8': padding == 'sm',
        'px-4 py-4 xl:py-4 xl:px-6': padding == 'xs',
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
