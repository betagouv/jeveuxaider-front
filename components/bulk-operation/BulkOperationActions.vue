<template>
  <div ref="bulkOperationActions">
    <div
      :class="['', { 'bg-[#F9F6F2] fixed top-0 right-0 z-10 py-4 px-8 rounded-bl-3xl': isPinned }]"
    >
      <div class="flex justify-end">
        <div class="inline-flex items-center leading-none pointer-events-auto bg-[#F9F6F2]">
          <div class="text-gray-600">
            {{ $filters.pluralize(operations.length, 'sélectionnée') }}
          </div>
          <div
            class="text-jva-blue-500 font-medium ml-2 pl-2 border-l border-gray-600 cursor-pointer hover:text-gray-900"
            @click="$emit('unselectAll')"
          >
            Désélectionner
          </div>

          <BaseDropdown class="ml-6">
            <template #button>
              <DsfrButton type="secondary" icon="RiArrowDownSLine" icon-position="right">
                Actions
              </DsfrButton>
            </template>
            <template #items>
              <slot />
            </template>
          </BaseDropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    operations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isPinned: false,
      isPinnedObserver: null,
    }
  },
  mounted() {
    this.isPinnedObserver = new IntersectionObserver(([e]) => {
      this.isPinned = e.intersectionRatio < 1
    }, {})
    this.isPinnedObserver.observe(this.$refs.bulkOperationActions)
  },
  beforeUnmount() {
    this.isPinnedObserver?.disconnect()
  },
})
</script>
