<template>
  <div class="sticky top-[-50px] pointer-events-none">
    <div class="h-[50px]" />
    <div class="flex justify-end">
      <div class="inline-flex items-center leading-none py-4 pl-8 bg-[#FAFAFA] rounded-bl-3xl mr-[-1px] pointer-events-auto">
        <div class="text-gray-600">
          {{ operations.length|pluralize('sélectionnée') }}
        </div>
        <div
          class="text-jva-blue-500 font-medium ml-2 pl-2 border-l border-gray-600 cursor-pointer hover:text-gray-900"
          @click="$emit('unselectAll')"
        >
          Désélectionner
        </div>

        <Dropdown class="ml-6">
          <template #button>
            <Button size="lg" variant="white" icon="ChevronDownIcon">
              Actions
            </Button>
          </template>
          <template #items>
            <slot />
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    operations: {
      type: Array,
      required: true
    }
  }
}
</script>
