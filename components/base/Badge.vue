<template>
  <span
    class="inline-flex items-center rounded-full font-semibold"
    :class="[
      colorClass,
      {'px-3 py-1 text-xs': size == 'xs'},
      {'px-4 py-2 text-sm': size == 'sm'},
    ]"
  >
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'xs',
      validator: s => ['xs', 'sm'].includes(s)
    },
    color: {
      type: [String, Number],
      default: 'gray'
    }
  },
  computed: {
    colorClass () {
      switch (this.color) {
        case 'white':
          return 'bg-white border'
        case 'blue':
          return 'text-white bg-jva-blue-500'
        case 'gray':
          return 'text-white bg-gray-600'
        case 'gray-light':
          return 'text-white bg-gray-200 text-gray-900'
        case 'orange':
          return 'text-white bg-jva-orange-500'
        case 'green':
          return 'text-white bg-jva-green-500'
        case 'red':
          return 'text-white bg-jva-red-500'
        case 6:
        case 'solidarite':
        case 'solidarite-et-insertion':
          return 'text-white bg-domaine-solidarite'
        case 4:
        case 'nature':
          return 'text-white bg-domaine-nature'
        case 2:
        case 'education':
          return 'text-white bg-domaine-education'
        case 3:
        case 'sante':
        case 'sante-pour-tous':
          return 'text-white bg-domaine-sante'
        case 1:
        case 'covid':
          return 'text-white bg-domaine-covid'
        case 8:
        case 'prevention':
          return 'text-white bg-domaine-prevention'
        case 7:
        case 'sport':
        case 'sport-pour-tous':
          return 'text-white bg-domaine-sport'
        case 9:
        case 'memoire':
          return 'text-white bg-domaine-memoire'
        case 10:
        case 'cooperation':
          return 'text-white bg-domaine-cooperation'
        case 11:
        case 'culture':
          return 'text-white bg-domaine-culture'
        default:
          return 'text-white bg-gray-600'
      }
    }
  }
}
</script>

<style>

</style>
