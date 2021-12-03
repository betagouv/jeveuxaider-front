<template>
  <div
    class="w-full bg-gray-200"
    :class="[
      { 'h-1': size === 'xs'},
      { 'h-2': size === 'sm'},
      { 'h-3': size === 'lg'},
    ]"
  >
    <div
      class="bg-[#FF9A7B]"
      :class="[
        { 'h-1': size === 'xs'},
        { 'h-2': size === 'sm'},
        { 'h-3': size === 'lg'},
      ]"
      :style="`width:${percentage}%`"
    />
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: 'sm',
      validator: s => ['xs', 'sm', 'lg'].includes(s)
    }
  }
}
</script>

<style>

</style>
