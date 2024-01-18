<template>
  <div class="grid grid-cols-1 gap-6">
    <slot />
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
      <div :class="[hasPrefiltersSlot ? 'flex gap-3 text-sm flex-wrap items-center' : '']">
        <slot name="prefilters" />
        <DsfrLink v-if="hasActiveFilters" class="text-jva-blue-500" @click="$emit('reset-filters')">
          Réinitialiser les filtres
        </DsfrLink>
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
    hasActiveFilters() {
      return Object.keys(this.$route.query).some((q) => q !== 'page')
    },
  },
})
</script>
