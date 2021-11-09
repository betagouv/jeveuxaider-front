<template>
  <span
    class="inline-flex items-center rounded-full font-medium px-3 py-1 text-xs text-white"
    :class="colorClass"
  >
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'gray',
      validator: s =>
        ['gray', 'orange', 'green', 'red'].includes(s)
    }
  },
  computed: {
    colorClass () {
      switch (this.color) {
        case 'gray':
          return 'bg-jva-gray-400'
        case 'orange':
          return 'bg-jva-orange-500'
        case 'green':
          return 'bg-jva-green-500'
        case 'red':
          return 'bg-jva-red-500'
        default:
          return 'bg-jva-gray-400'
      }
    }
  }
}
</script>

<style>

</style>
