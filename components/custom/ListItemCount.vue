<template>
  <div class="flex gap-2 items-center">
    <div
      v-if="color"
      class="rounded-lg"
      :class="[
        { 'h-[10px] w-[10px]': size == 'xxs' },
        { 'h-[30px] w-[30px]': size == 'xs' },
        { 'h-[30px] w-[30px]': size == 'sm' },

        {
          'bg-gray-600': ['gray', 'canceled', 'unsubscribed', 'no_response'].includes(color),
        },
        {
          'bg-gray-200': ['gray-light', 'draft', 'Brouillon', 'Désinscrite', 'other'].includes(
            color
          ),
        },
        {
          'bg-jva-blue-500': ['blue', 'finished', 'Terminée', 'mission_terminated'].includes(color),
        },
        {
          'bg-jva-orange-500': [
            'orange',
            'En attente de validation',
            'waiting',
            'requirements_not_fulfilled',
          ].includes(color),
        },
        {
          'bg-jva-green-500': ['green', 'Validée', 'validated'].includes(color),
        },
        {
          'bg-jva-red-500': [
            'red',
            'Signalée',
            'Annulée',
            'Refusée',
            'refused',
            'signaled',
            'not_available',
            'change_mind',
          ].includes(color),
        },

        {
          'bg-domaine-solidarite': [7, 'solidarite', 'solidarite-et-insertion'].includes(color),
        },
        { 'bg-domaine-nature': [10, 'nature'].includes(color) },
        {
          'bg-domaine-education': [
            9,
            'education',
            'En cours de traitement',
            'in_progress',
          ].includes(color),
        },
        { 'bg-domaine-sante': [1, 'sante', 'sante-pour-tous'].includes(color) },
        { 'bg-domaine-covid': [5, 'covid'].includes(color) },
        { 'bg-domaine-prevention': [2, 'prevention'].includes(color) },
        { 'bg-domaine-sport': [4, 'sport', 'sport-pour-tous'].includes(color) },
        { 'bg-domaine-memoire': [8, 'memoire'].includes(color) },
        { 'bg-domaine-cooperation': [6, 'cooperation'].includes(color) },
        { 'bg-domaine-culture': [3, 'culture', 'art'].includes(color) },
        {
          'bg-domaine-benevolat-competences': [11, 'benevolat-competences', 'benevolat'].includes(
            color
          ),
        },
        color,
      ]"
    />
    <div class="text-gray-600 truncate flex-1">
      {{ label }}
    </div>
    <div class="font-medium">
      <template v-if="display === 'count'">
        <template v-if="value">
          {{ $numeral(value) }}
        </template>
        <template v-else> - </template>
      </template>
      <template v-if="display === 'percent'">
        {{ $numeral(percentValue, '0.[0]') }}
        <span class="text-xs text-gray-600">%</span>
      </template>
      <template v-if="display === 'count_percent'">
        {{ $numeral(value) }}
        <span class="text-gray-500 text-sm"> ({{ $numeral(percentValue, '0.[0]') }}%)</span>
      </template>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    size: {
      type: String,
      default: 'xs',
      validator: (s) => ['xxs', 'xs', 'sm'].includes(s),
    },
    color: {
      type: [String, Number],
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      default: 'count', // count, percent, count_percent
    },
    count: {
      type: [String, Number],
      default: 0,
    },
    total: {
      type: [Number],
      default: null,
    },
  },
  computed: {
    value() {
      return this.count
    },
    percentValue() {
      return this.total ? (this.count / this.total) * 100 : 0
    },
  },
})
</script>
