<template>
  <div
    :class="[
      'group flex gap-4 lg:gap-6 p-4 lg:p-6 border ',
      {'hover:bg-gray-50 cursor-pointer': selectable}]"
  >
    <div class="border-r pr-3 lg:pr-6">
      <slot name="icon" />
    </div>
    <div class="flex-1">
      <div class="text-lg lg:text-xl font-bold">
        {{ title }}
      </div>
      <div v-if="description" class="text-[#666666] text-sm lg:text-base">
        {{ description }}
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    selectable: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>

</style>
