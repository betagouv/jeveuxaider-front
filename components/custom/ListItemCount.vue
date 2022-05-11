<template>
  <div class="flex gap-2 items-center">
    <div
      class="rounded-lg"
      :class="[
        {'h-[10px] w-[10px]': size == 'xxs'},
        {'h-[30px] w-[30px]': size == 'xs'},
        {'h-[30px] w-[30px]': size == 'sm'},

        {'bg-gray-600': ['gray','canceled','finished','Terminée','unsubscribed'].includes(color)},
        {'bg-gray-200': ['gray-light','draft','Brouillon','Désinscrite'].includes(color)},
        {'bg-jva-blue-500': ['blue', 'Terminée'].includes(color)},
        {'bg-jva-orange-500': ['orange', 'En attente de validation', 'En cours de traitement', 'waiting','in_progress'].includes(color)},
        {'bg-jva-green-500': ['green', 'Validée', 'validated'].includes(color)},
        {'bg-jva-red-500': ['red', 'Signalée', 'Annulée', 'Refusée', 'refused','signaled'].includes(color)},

        {'bg-domaine-solidarite': [7,'solidarite','solidarite-et-insertion'].includes(color)},
        {'bg-domaine-nature': [10,'nature'].includes(color)},
        {'bg-domaine-education': [9,'education'].includes(color)},
        {'bg-domaine-sante': [1,'sante','sante-pour-tous'].includes(color)},
        {'bg-domaine-covid': [5,'covid'].includes(color)},
        {'bg-domaine-prevention': [2,'prevention'].includes(color)},
        {'bg-domaine-sport': [4,'sport','sport-pour-tous'].includes(color)},
        {'bg-domaine-memoire': [8,'memoire'].includes(color)},
        {'bg-domaine-cooperation': [6,'cooperation'].includes(color)},
        {'bg-domaine-culture': [3,'culture','art'].includes(color)},
      ]"
    />
    <div class="text-gray-500">
      {{ label }}
    </div>
    <div class="font-medium">
      <template v-if="count">
        {{ count | formatNumber }}
      </template>
      <template v-else>
        -
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'xs',
      validator: s => ['xxs', 'xs', 'sm'].includes(s)
    },
    color: {
      type: [String, Number],
      default: 'gray'
    },
    label: {
      type: String,
      required: true
    },
    count: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style>

</style>
