<template>
  <div class="sticky top-[-152px] pointer-events-none">
    <div class="h-[152px]" />
    <div class="flex justify-end">
      <div
        class="inline-flex items-center leading-none py-4 pl-8 rounded-bl-3xl mr-[-1px] pointer-events-auto bg-[#F9F6F2]"
      >
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
            <BaseButton size="lg" variant="white" icon="RiArrowDownSLine"> Actions </BaseButton>
          </template>
          <template #items>
            <slot />
          </template>
        </BaseDropdown>
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
})
</script>
