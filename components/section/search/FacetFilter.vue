<template>
  <div>
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen" :activeValues="activeValues" :firstValueSelected="firstValueSelected">
        Toggle facet
      </slot>
    </div>
    <div v-if="isOpen" v-click-outside="() => isOpen = false">
      <div class="absolute z-40 bg-white border shadow rounded">
        <Input
          v-model="facetQuery"
          name="query-facet"
          placeholder="Recherche"
          clearable
          @input="handleChangeSearchFacetValues"
        />
        <div class="max-h-[320px] overflow-y-auto space-y-2 px-3 py-4">
          <div v-for="facet in activeValues" :key="facet.value" class="text-jva-blue-500 cursor-pointer" @click="deleteFilter(facetName, facet.value, true)">
            {{ facet.value }} ({{ facet.count }})
          </div>
          <div v-for="facet in inactiveValues" :key="facet.value" class="cursor-pointer" @click="addFilter(facetName, facet.value, true)">
            {{ facet.value }} ({{ facet.count }})
          </div>
        </div>
        <div class="border-t px-3 py-4 flex justify-between">
          <div v-if="activeValues.length > 0" class="text-gray-600 cursor-pointer" @click="deleteFacet()">
            Effacer
          </div>
          <div class="ml-auto text-jva-blue-500 cursor-pointer" @click="isOpen = false">
            Valider
          </div>
        </div>
      </div>
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
    }
  },
  data () {
    return {
      isOpen: false,
      facetHits: null,
      facetQuery: null
    }
  },
  computed: {
    allValues () {
      if (this.facetHits) {
        console.log('values facetHits')
        return this.facetHits.map((facetHit) => {
          return {
            value: facetHit.value,
            count: facetHit.count
          }
        })
      }
      return Object.keys(this.facets).map((value) => {
        return {
          value,
          count: this.facets[value]
        }
      })
    },
    activeValues () {
      return this.allValues.filter((facet) => {
        return this.$route.query[this.facetName]?.split('|').includes(facet.value)
      })
    },
    inactiveValues () {
      return this.allValues.filter((facet) => {
        return !this.$route.query[this.facetName]?.split('|').includes(facet.value)
      })
    },
    firstValueSelected () {
      return this.$route.query[this.facetName]?.split('|')[0]
    }
  },
  methods: {
    deleteFacet () {
      this.deleteFilter(this.facetName)
      this.isOpen = false
    },
    async handleChangeSearchFacetValues (facetQuery) {
      if (!facetQuery || facetQuery == '') {
        this.facetHits = null
        return
      }
      const res = await this.searchForFacetValues(this.facetName, facetQuery)
      this.facetHits = res.facetHits
    }
  }
}
</script>
