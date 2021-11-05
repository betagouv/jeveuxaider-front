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
          return 'bg-jva-gray-text-lighter'
        case 'orange':
          return 'bg-jva-orange-primary'
        case 'green':
          return 'bg-jva-green-primary'
        case 'red':
          return 'bg-jva-red-primary'
        default:
          return 'bg-jva-gray-text-lighter'
      }
    }
  }
}
</script>

<style>

</style>
