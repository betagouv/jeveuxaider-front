<template>
  <div
    :class="[
      'group flex gap-6 p-6 border ',
      {'hover:bg-gray-50 cursor-pointer': selectable}]"
  >
    <div class="border-r pr-6">
      <slot name="icon" />
    </div>
    <div class="flex-1">
      <div class="text-xl font-bold">
        {{ title }}
      </div>
      <div v-if="description" class="text-[#666666]">
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
