<template>
  <span
    class="inline-flex items-center rounded-full font-semibold max-w-full"
    :class="[
      {'px-2 py-0.5 text-xs': size == 'xxs'},
      {'px-3 py-1 text-xs': size == 'xs'},
      {'px-4 py-2 text-sm': size == 'sm'},

      // GRAY
      {'text-white bg-gray-600': ['gray'].includes(color) && !plain},
      { 'border text-gray-600 border-gray-600': ['gray'].includes(color) && plain},

      // GRAY LIGHT
      {'bg-gray-200 text-gray-900': ['gray-light','draft','Brouillon','Désinscrite'].includes(color) && !plain},
      { 'border text-gray-500 border-gray-500': ['gray-light', 'draft','Brouillon','Désinscrite'].includes(color) && plain},

      // BLUE
      {'text-white bg-jva-blue-500': ['blue', 'Terminée'].includes(color) && !plain},
      { 'border text-jva-blue-500 border-jva-blue-500': ['blue', 'Terminée'].includes(color) && plain},

      // ORANGE
      {'text-white bg-jva-orange-500': ['orange', 'En attente de validation', 'En cours de traitement', 'waiting'].includes(color) && !plain},
      { 'border text-jva-orange-500 border-jva-orange-500': ['orange', 'En attente de validation', 'En cours de traitement','waiting'].includes(color) && plain},

      // GREEN
      {'text-white bg-jva-green-500': ['green', 'Validée', 'validated'].includes(color) && !plain},
      { 'border text-jva-green-500 border-jva-green-500': ['green', 'Validée', 'validated'].includes(color) && plain},

      // RED
      {'text-white bg-jva-red-500': ['red', 'Signalée', 'Annulée', 'Refusée', 'refused'].includes(color) && !plain},
      { 'border text-jva-red-500 border-jva-red-500': ['red', 'Signalée', 'Annulée', 'Refusée', 'refused'].includes(color) && plain},

      // DOMAINE: Solidarité
      {'text-white bg-domaine-solidarite': [7,'solidarite','solidarite-et-insertion'].includes(color) && !plain},
      { 'border text-domaine-solidarite border-domaine-solidarite': [7,'solidarite','solidarite-et-insertion'].includes(color) && plain},

      // DOMAINE: Nature
      {'text-white bg-domaine-nature': [10,'nature'].includes(color) && !plain},
      { 'border text-domaine-nature border-domaine-nature': [10,'nature'].includes(color) && plain},

      // DOMAINE: Education
      {'text-white bg-domaine-education': [9,'education'].includes(color) && !plain},
      { 'border text-domaine-education border-domaine-education': [9,'education'].includes(color) && plain},

      // DOMAINE: Santé
      {'text-white bg-domaine-sante': [1,'sante','sante-pour-tous'].includes(color) && !plain},
      { 'border text-domaine-sante border-domaine-sante': [1,'sante','sante-pour-tous'].includes(color) && plain},

      // DOMAINE: Covid
      {'text-white bg-domaine-covid': [5,'covid'].includes(color) && !plain},
      { 'border text-domaine-covid border-domaine-covid': [5,'covid'].includes(color) && plain},

      // DOMAINE: Prévention
      {'text-white bg-domaine-prevention': [2,'prevention'].includes(color) && !plain},
      { 'border text-domaine-prevention border-domaine-prevention': [2,'prevention'].includes(color) && plain},

      // DOMAINE: Sport
      {'text-white bg-domaine-sport': [4,'sport','sport-pour-tous'].includes(color) && !plain},
      { 'border text-domaine-sport border-domaine-sport': [4,'sport', 'sport-pour-tous'].includes(color) && plain},

      // DOMAINE: Mémoire
      {'text-white bg-domaine-memoire': [8,'memoire'].includes(color) && !plain},
      { 'border text-domaine-memoire border-domaine-memoire': [8,'memoire'].includes(color) && plain},

      // DOMAINE: Coopération
      {'text-white bg-domaine-cooperation': [6,'cooperation'].includes(color) && !plain},
      { 'border text-domaine-cooperation border-domaine-cooperation': [6,'cooperation'].includes(color) && plain},

      // DOMAINE: Culture
      {'text-white bg-domaine-culture': [3,'culture'].includes(color) && !plain},
      { 'border text-domaine-culture border-domaine-culture': [3,'culture'].includes(color) && plain}
    ]"
  >
    <span class="truncate">
      <slot />
    </span>
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
      validator: s => ['xxs', 'xs', 'sm'].includes(s)
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
