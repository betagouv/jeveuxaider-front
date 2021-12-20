<template>
  <span
    class="inline-flex items-center rounded-full font-semibold"
    :class="[
      {'px-3 py-1 text-xs': size == 'xs'},
      {'px-4 py-2 text-sm': size == 'sm'},

      // GRAY
      {'text-white bg-gray-600': ['gray'].includes(color) && !plain},
      { 'border text-gray-600 border-gray-600': ['gray'].includes(color) && plain},

      // GRAY LIGHT
      {'bg-gray-200 text-gray-900': ['gray-light'].includes(color) && !plain},
      { 'border text-gray-600 border-gray-600': ['gray-light'].includes(color) && plain},

      // BLUE
      {'text-white bg-jva-blue-500': ['blue'].includes(color) && !plain},
      { 'border text-jva-blue-500 border-jva-blue-500': ['blue'].includes(color) && plain},

      // ORANGE
      {'text-white bg-jva-orange-500': ['orange'].includes(color) && !plain},
      { 'border text-jva-orange-500 border-jva-orange-500': ['orange'].includes(color) && plain},

      // GREEN
      {'text-white bg-jva-green-500': ['green'].includes(color) && !plain},
      { 'border text-jva-green-500 border-jva-green-500': ['green'].includes(color) && plain},

      // RED
      {'text-white bg-jva-red-500': ['red'].includes(color) && !plain},
      { 'border text-jva-red-500 border-jva-red-500': ['red'].includes(color) && plain},

      // DOMAINE: Solidarité
      {'text-white bg-domaine-solidarite': [6,'solidarite','solidarite-et-insertion'].includes(color) && !plain},
      { 'border text-domaine-solidarite border-domaine-solidarite': [6,'solidarite','solidarite-et-insertion'].includes(color) && plain},

      // DOMAINE: Nature
      {'text-white bg-domaine-nature': [4,'nature'].includes(color) && !plain},
      { 'border text-domaine-nature border-domaine-nature': [4,'nature'].includes(color) && plain},

      // DOMAINE: Education
      {'text-white bg-domaine-education': [2,'education'].includes(color) && !plain},
      { 'border text-domaine-education border-domaine-education': [2,'education'].includes(color) && plain},

      // DOMAINE: Santé
      {'text-white bg-domaine-sante': [3,'sante','sante-pour-tous'].includes(color) && !plain},
      { 'border text-domaine-sante border-domaine-sante': [3,'sante','sante-pour-tous'].includes(color) && plain},

      // DOMAINE: Covid
      {'text-white bg-domaine-covid': [1,'covid'].includes(color) && !plain},
      { 'border text-domaine-covid border-domaine-covid': [1,'covid'].includes(color) && plain},

      // DOMAINE: Prévention
      {'text-white bg-domaine-prevention': [8,'prevention'].includes(color) && !plain},
      { 'border text-domaine-prevention border-domaine-prevention': [8,'prevention'].includes(color) && plain},

      // DOMAINE: Sport
      {'text-white bg-domaine-sport': [7,'sport','sport-pour-tous'].includes(color) && !plain},
      { 'border text-domaine-sport border-domaine-sport': [7,'sport', 'sport-pour-tous'].includes(color) && plain},

      // DOMAINE: Mémoire
      {'text-white bg-domaine-memoire': [9,'memoire'].includes(color) && !plain},
      { 'border text-domaine-memoire border-domaine-memoire': [9,'memoire'].includes(color) && plain},

      // DOMAINE: Coopération
      {'text-white bg-domaine-cooperation': [10,'cooperation'].includes(color) && !plain},
      { 'border text-domaine-cooperation border-domaine-cooperation': [10,'cooperation'].includes(color) && plain},

      // DOMAINE: Culture
      {'text-white bg-domaine-culture': [11,'culture'].includes(color) && !plain},
      { 'border text-domaine-culture border-domaine-culture': [11,'culture'].includes(color) && plain}
    ]"
  >
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    plain: {
      type: Boolean,
      default: false
    },
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

  }
}
</script>

<style>

</style>
