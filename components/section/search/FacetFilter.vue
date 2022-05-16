<template>
  <div>
    {{ label }}
    <div v-for="facet in activeFacets" :key="facet.value" class="text-jva-blue-500 cursor-pointer" @click="deleteFilter(facetName, facet.value, true)">
      {{ facet.value }} ({{ facet.count }})
    </div>
    <div v-for="facet in inactiveFacets" :key="facet.value" class="cursor-pointer" @click="addFilter(facetName, facet.value, true)">
      {{ facet.value }} ({{ facet.count }})
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
  computed: {
    allFacets () {
      return Object.keys(this.facets).map((value) => {
        return {
          value,
          count: this.facets[value]
        }
      })
    },
    activeFacets () {
      return this.allFacets.filter((facet) => {
        return this.$route.query[this.facetName]?.split('|').includes(facet.value)
      })
    },
    inactiveFacets () {
      return this.allFacets.filter((facet) => {
        return !this.$route.query[this.facetName]?.split('|').includes(facet.value)
      })
    }
  }
}
</script>
