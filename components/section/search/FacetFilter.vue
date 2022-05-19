<template>
  <div>
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen" :activeValuesCount="activeValuesCount" :firstValueSelected="firstValueSelected">
        Toggle facet
      </slot>
    </div>
    <div v-if="isOpen" v-click-outside="() => isOpen = false">
      <div class="mt-2 absolute z-40 bg-white border shadow-xl rounded-xl text-[15px] max-w-[275px] w-full">
        <div class="p-4 space-y-3">
          <div class="font-medium">
            {{ label }}
          </div>
          <Input
            v-model="facetQuery"
            name="query-facet"
            placeholder="Recherche"
            variant="facet"
            clearable
            @input="handleChangeSearchFacetValues"
          />
          <div class="relative overflow-hidden">
            <div
              class="absolute custom-gradient bottom-0 w-full pointer-events-none transition duration-500"
              :class="[{'h-0': isScrollAtBottom}, {'h-12': !isScrollAtBottom}]"
            />

            <div ref="scrollContainer" class="max-h-[250px] overflow-y-auto overscroll-contain">
              <div class="mr-2 space-y-1 text-sm">
                <div
                  v-for="facet in [...activeValues, ...inactiveValues]"
                  :key="facet.value"
                  :class="[{'text-jva-blue-500': isActiveFilter(facetName, facet.value)}]"
                  class="cursor-pointer"
                  @click="isActiveFilter(facetName, facet.value) ? deleteFilter(facetName, facet.value, true) : addFilter(facetName, facet.value, true)"
                >
                  <div class="flex justify-between">
                    <div class="truncate">
                      {{ facet.value }}
                    </div>
                    <div class="text-gray-600 ml-1 font-light">
                      {{ facet.count }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t px-6 py-4 flex justify-between">
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
    },
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isOpen: false,
      facetHits: null,
      facetQuery: null,
      isScrollAtBottom: false
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
  watch: {
    async isOpen (newVal) {
      if (newVal) {
        await this.$nextTick()
        this.isScrollAtBottom = this.$refs.scrollContainer.offsetHeight < 250
        this.$refs.scrollContainer.addEventListener('scroll', this.handleScroll)
      } else {
        this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll)
      }
    }
  },
  methods: {
    deleteFacet () {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [this.facetName]: undefined, page: undefined }
      })
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
    handleScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      this.isScrollAtBottom = (scrollTop + clientHeight >= scrollHeight)
    }
  }
}
</script>

<style lang="postcss" scoped>
.custom-gradient {
  background-image: linear-gradient(180deg,hsla(0,0%,100%,0),#fff);
}
</style>
