<template>
  <div class="relative">
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen" :activeValuesCount="activeValuesCount" :firstValueSelected="firstValueSelected">
        Toggle facet
      </slot>
    </div>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="onClickOutside"
        :class="['mt-2 absolute z-20 bg-white border shadow-xl rounded-xl text-[15px] w-[350px]', optionsClass]"
      >
        <div class="p-4 space-y-3">
          <div class="font-medium">
            {{ label }}
          </div>

          <FacetSearch v-model="facetQuery" @input="handleChangeSearchFacetValues" />

          <div class="relative overflow-hidden">
            <div
              class="absolute custom-gradient bottom-0 w-full pointer-events-none transition duration-500"
              :class="[{'h-0': isScrollAtBottom}, {'h-12': !isScrollAtBottom}]"
            />

            <div ref="scrollContainer" class="max-h-[250px] overflow-y-auto overscroll-contain custom-scrollbar-gray">
              <div class="py-1 mr-2 space-y-4 text-sm">
                <div v-if="[...activeValues, ...inactiveValues].length == 0" class="text-gray-400">
                  Aucun résultat avec les filtres actuels.
                </div>

                <div
                  v-for="(facet) in [...activeValues, ...inactiveValues]"
                  :key="facet.value"
                  :class="[{'text-jva-blue-500': isActiveFilter(facetName, facet.value)}]"
                  class="flex items-center pl-1 group"
                >
                  <input
                    :id="`facetFilter__${facetName}_${facet.value}`"
                    :name="`facetFilter__${facetName}_${facet.value}`"
                    :value="isActiveFilter(facetName, facet.value)"
                    type="checkbox"
                    :checked="isActiveFilter(facetName, facet.value)"
                    class="rounded text-jva-blue-500 transition focus:ring-jva-blue-500 group-hover:border-jva-blue-500 cursor-pointer"
                    @change="isActiveFilter(facetName, facet.value) ? deleteFilter(facetName, facet.value, true) : addFilter(facetName, facet.value, true)"
                  >
                  <label
                    :for="`facetFilter__${facetName}_${facet.value}`"
                    class="pl-2 flex justify-between truncate flex-1 group-hover:text-jva-blue-500 cursor-pointer"
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
            </div>
          </div>
        </div>

        <div class="border-t px-6 py-3 flex justify-end">
          <div
            class="text-sm"
            :class="[
              {'text-gray-400 pointer-events-none': !activeValuesCount},
              {'text-jva-blue-500 cursor-pointer hover:underline': activeValuesCount}
            ]"
            @click="deleteFacet()"
          >
            Effacer
          </div>
        </div>
      </div>
    </transition>
  </div>
  </transition>
  </div>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import FacetSearch from '@/components/section/search/FacetSearch.vue'

export default {
  components: {
    FacetSearch
  },
  mixins: [AlgoliaQueryBuilder],
  props: {
    facetName: { type: String, required: true },
    facets: { type: Object, required: true },
    label: { type: String, required: true },
    optionsClass: { type: String, default: '' }
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
    },
    async facetHits () {
      await this.$nextTick()
      this.isScrollAtBottom = this.$refs.scrollContainer.offsetHeight < 250
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
    handleScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      this.isScrollAtBottom = (scrollTop + clientHeight >= scrollHeight)
    },
    onClickOutside (e) {
      console.log('Click outside', e)
      this.isOpen = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.custom-gradient {
  background-image: linear-gradient(180deg,hsla(0,0%,100%,0),#fff);
}
</style>
