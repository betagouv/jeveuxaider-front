<template>
  <div>
    {{ label }}
    <div v-for="(facetCount, facetValue, key) in facets" :key="key" @click="addFilter(facetName, facetValue, true)">
      {{ facetValue }} ({{ facetCount }})
    </div>
  </div>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  props: {
    facetName: {
      type: String,
      required: true
    },
    facets: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    console (value) {
      console.log(value)
    }
  }
}
</script>
