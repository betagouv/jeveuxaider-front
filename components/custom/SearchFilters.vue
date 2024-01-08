<template>
  <div class="grid grid-cols-1 gap-6">
    <slot />
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
      <div :class="[hasPrefiltersSlot ? 'flex gap-3 text-sm flex-wrap items-center' : '']">
        <slot name="prefilters" />
      </div>
      <div
        :class="[hasSortstSlot ? 'lg:flex gap-3 text-sm flex-wrap items-center justify-end' : '']"
      >
        <slot name="sorts" />
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    },
    hasPrefiltersSlot() {
      return !!this.$slots.prefilters
    },
    hasSortstSlot() {
      return !!this.$slots.sorts
    },
  },
})
</script>
