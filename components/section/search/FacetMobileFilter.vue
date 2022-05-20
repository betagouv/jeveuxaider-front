<template>
  <div class="">
    <div class="space-y-3">
      <div class="relative">
        <div class="font-medium">
          {{ label }}
        </div>
        <SearchIcon
          class=" text-gray-400 hover:text-gray-500 cursor-pointer absolute right-0 top-0 -m-1"
          width="20"
          @click="showSearch = true"
        />
      </div>

      <Input
        v-model="facetQuery"
        name="query-facet"
        placeholder="Recherche"
        variant="facet"
        clearable
        @input="handleChangeSearchFacetValues"
      />

      <div
        v-for="(facet, key) in [...activeValues, ...inactiveValues]"
        :key="facet.value"
        :class="[{'text-jva-blue-500': isActiveFilter(facetName, facet.value)}]"
        class="cursor-pointer flex items-center px-1"
      >
        <input
          :id="`${facetName}_${key}`"
          :name="`${facetName}_${key}`"
          :value="isActiveFilter(facetName, facet.value)"
          type="checkbox"
          :checked="isActiveFilter(facetName, facet.value)"
          class="rounded text-jva-blue-500 focus:ring-jva-blue-500"
          @change="isActiveFilter(facetName, facet.value) ? deleteFilter(facetName, facet.value, true) : addFilter(facetName, facet.value, true)"
        >
        <label
          :for="`${facetName}_${key}`"
          class="ml-2 flex justify-between truncate flex-1"
        >
          <div class="truncate">
            {{ facet.value }}
          </div>
          <div class="text-gray-600 ml-1 font-light">
            {{ facet.count }}
          </div>
        </label>
      </div>

      <div v-if="showMore && allValues.length > limitedFacets" class="">
        <div class="">
          Plus
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
    },
    label: {
      type: String,
      required: true
    },
    limitedFacets: {
      type: Number,
      default: 3
    },
    showMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false,
      facetHits: null,
      facetQuery: null,
      showSearch: false
    }
  },
  computed: {
    allValues () {
      if (this.facetHits) {
        console.log('values', this.facetHits)
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
    },
    activeValuesCount () {
      return this.$route.query[this.facetName]?.split('|').length
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
