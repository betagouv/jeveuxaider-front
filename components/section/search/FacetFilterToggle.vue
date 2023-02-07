<template>
  <div class="relative">
    <span tabindex="-1" class="cursor-pointer w-full" @click="isOpen = !isOpen" @keydown.esc="isOpen = false">
      <slot name="button" :isOpen="isOpen" :activeValuesCount="activeValuesCount" :firstValueSelected="firstValueSelected">
        Toggle facet
      </slot>
    </span>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="onClickOutside"
        :class="['mt-2 absolute z-20 bg-white border shadow-xl text-[15px] w-[350px]', optionsClass]"
        @keydown.esc="isOpen = false"
      >
        <div class="p-4 space-y-3">
          <div :id="`label-search-${_uid}`" class="font-medium">
            {{ label }}
          </div>

          <FacetSearch
            v-model="facetQuery"
            :aria-labelledby="`label-search-${_uid}`"
            @input="handleChangeSearchFacetValues"
          />

          <div class="relative overflow-hidden">
            <div
              class="absolute custom-gradient bottom-0 w-full pointer-events-none transition duration-500 z-10"
              :class="[{'h-0': isScrollAtBottom}, {'h-12': !isScrollAtBottom}]"
            />

            <div ref="scrollContainer" class="max-h-[250px] overflow-y-auto overscroll-contain custom-scrollbar-gray">
              <div class="py-1 mr-2 space-y-4 text-sm">
                <div v-if="[...activeValues, ...inactiveValues].length == 0" class="text-gray-400">
                  Aucun résultat avec les filtres actuels.
                </div>

                <fieldset class="space-y-4 relative" style="min-inline-size: auto;">
                  <legend hidden class="sr-only">
                    {{ legend }}
                  </legend>

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
                      @change="handleFacetToggle(facetName, facet.value)"
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
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t px-6 py-3 flex justify-end">
          <button
            class="text-sm"
            :class="[
              {'text-gray-400 pointer-events-none': !activeValuesCount},
              {'text-jva-blue-500 cursor-pointer hover:underline': activeValuesCount}
            ]"
            :disabled="!activeValuesCount"
            @click="deleteFacet()"
          >
            Effacer
          </button>
        </div>
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
    label: { type: String, required: true },
    optionsClass: { type: String, default: '' },
    legend: { type: String, default: null }
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

      const facet = this.$store.getters['algoliaSearch/facetResults'](this.facetName)
      return Object.keys(facet).map((value) => {
        return {
          value,
          count: facet[value]
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
      if (this.isOpen) {
        await this.$nextTick()
        this.isScrollAtBottom = this.$refs.scrollContainer.offsetHeight < 250
      }
    },
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
    handleScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      this.isScrollAtBottom = (scrollTop + clientHeight >= scrollHeight)
    },
    onClickOutside (e) {
      this.isOpen = false
    },
    async handleFacetToggle (facetName, facetValue) {
      this.isActiveFilter(facetName, facetValue)
        ? await this.deleteFilter(facetName, facetValue, true)
        : await this.addFilter(facetName, facetValue, true)
    }
  }
}
</script>

<style lang="postcss" scoped>
.custom-gradient {
  background-image: linear-gradient(180deg,hsla(0,0%,100%,0),#fff);
}
</style>
