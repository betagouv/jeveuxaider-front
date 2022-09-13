<template>
  <span
    :class="[
      'text-xs',
      {
        'text-red-500': value < 0,
        'text-green-500': value > 0
      }
    ]"
  >
    {{ value|formatNumber }}%
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>

</style>
