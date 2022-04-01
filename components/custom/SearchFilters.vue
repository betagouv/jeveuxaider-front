<template>
  <div class="grid grid-cols-1 gap-4">
    <slot />
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start">
      <div
        :class="[
          hasPrefiltersSlot ? 'hidden lg:flex gap-4 text-sm flex-wrap items-center' : '',
        ]"
      >
        <slot name="prefilters" />
      </div>
      <div
        :class="[
          hasSortstSlot ? 'hidden lg:flex gap-4 text-sm flex-wrap items-center justify-end' : '',
        ]"
      >
        <slot name="sorts" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    hasPrefiltersSlot () {
      return !!this.$slots.prefilters
    },
    hasSortstSlot () {
      return !!this.$slots.sorts
    }
  }
}
</script>

<style>

</style>
