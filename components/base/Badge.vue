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
      default: 'gray'
    }
  },
  computed: {
    colorClass () {
      switch (this.color) {
        case 'gray':
          return 'bg-gray-400'
        case 'orange':
          return 'bg-jva-orange-500'
        case 'green':
          return 'bg-jva-green-500'
        case 'red':
          return 'bg-jva-red-500'
        case 'solidarite':
        case 'solidarite-et-insertion':
          return 'bg-domaine-solidarite'
        case 'nature':
          return 'bg-domaine-nature'
        case 'education':
          return 'bg-domaine-education'
        case 'sante':
        case 'sante-pour-tous':
          return 'bg-domaine-sante'
        case 'covid':
          return 'bg-domaine-covid'
        case 'prevention':
          return 'bg-domaine-prevention'
        case 'sport':
          return 'bg-domaine-sport'
        case 'memoire':
          return 'bg-domaine-memoire'
        case 'cooperation':
          return 'bg-domaine-cooperation'
        case 'culture':
          return 'bg-domaine-culture'
        default:
          return 'bg-gray-400'
      }
    }
  }
}
</script>

<style>

</style>
