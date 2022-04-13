<template>
  <div
    v-tooltip="tooltip ? tooltip : null"
    class="w-full bg-gray-200 bg bg-blue bg-jva-blu"
    :class="[
      { 'h-1': size === 'xs'},
      { 'h-2': size === 'sm'},
      { 'h-3': size === 'lg'},
    ]"
  >
    <div
      :class="[
        gaugeColorClass,
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
    tooltip: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'sm',
      validator: s => ['xs', 'sm', 'lg'].includes(s)
    },
    color: {
      type: String,
      default: 'salmon',
      validator: s => ['salmon', 'green', 'blue'].includes(s)
    }
  },
  computed: {
    gaugeColorClass () {
      switch (this.color) {
        case 'salmon':
          return 'bg-[#FF9A7B]'
        case 'green':
          return 'bg-jva-green-500'
        case 'blue':
          return 'bg-jva-blue-500'
        default:
          return 'bg-[#FF9A7B]'
      }
    }
  }
}
</script>

<style>

</style>
