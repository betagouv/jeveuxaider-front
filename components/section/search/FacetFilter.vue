<template>
  <div>
    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">
        <div v-if="!showSearch" class="h-[29px]">
          <span :id="`label-search-${uuid}`">{{ label }}</span>
          <SearchIcon
            class=" text-gray-400 hover:text-gray-500 cursor-pointer absolute right-0 top-0"
            width="20"
            @click="toggleSearch"
          />
        </div>

        <FacetSearch
          v-else
          ref="facetSearch"
          v-model="facetQuery"
          always-show-clear
          :aria-labelledby="`label-search-${uuid}`"
          @input="handleChangeSearchFacetValues"
          @clear="showSearch = false"
        />
      </div>

      <div class="text-sm space-y-4">
        <div v-if="[...activeValues, ...inactiveValues].length == 0" class="text-gray-400">
          Aucun résultat avec les filtres actuels.
        </div>

        <fieldset class="relative" style="min-inline-size: auto;">
          <legend class="sr-only">
            {{ legend }}
          </legend>
          <div class="space-y-4">
            <div
              v-for="(facet) in limitedValues"
              :key="facet.value"
              :class="[{'text-jva-blue-500': isActiveFilter(facetName, facet.value)}]"
              class="cursor-pointer flex items-center"
            >
              <input
                :id="`facetMobileFilter__${facetName}_${facet.value}`"
                :name="`facetMobileFilter__${facetName}_${facet.value}`"
                :value="isActiveFilter(facetName, facet.value)"
                type="checkbox"
                :checked="isActiveFilter(facetName, facet.value)"
                class="rounded text-jva-blue-500"
                @change="isActiveFilter(facetName, facet.value) ? deleteFilter(facetName, facet.value, true) : addFilter(facetName, facet.value, true)"
              >
              <label
                :for="`facetMobileFilter__${facetName}_${facet.value}`"
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
          </div>
        </fieldset>

        <div v-if="showMore && allValues.length > showMoreLimit" class="">
          <div class="" @click="showAllValues = !showAllValues">
            {{ showAllValues ? 'Moins' : 'Plus' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import FacetSearch from '@/components/section/search/FacetSearch.vue'
import uuid from '@/mixins/uuid'

export default {
  components: {
    FacetSearch
  },
  mixins: [AlgoliaQueryBuilder, uuid],
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
    showMoreLimit: {
      type: Number,
      default: 3
    },
    showMore: {
      type: Boolean,
      default: false
    },
    legend: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isOpen: false,
      facetHits: null,
      facetQuery: null,
      showSearch: false,
      showAllValues: false
    }
  },
  computed: {
    allValues () {
      if (this.facetHits) {
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
    limitedValues () {
      return this.showMore && !this.showAllValues ? [...this.activeValues, ...this.inactiveValues].slice(0, this.showMoreLimit) : [...this.activeValues, ...this.inactiveValues]
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
  watch: {
    async '$route' () {
      if (this.facetHits && this.facetQuery) {
        const res = await this.searchForFacetValues(this.facetName, this.facetQuery)
        this.facetHits = res.facetHits
      }
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
    },
    async toggleSearch () {
      this.showSearch = !this.showSearch
      if (this.showSearch) {
        await this.$nextTick()
        this.$refs.facetSearch.$refs.input?.focus()
      }
    }
  }
}
</script>
