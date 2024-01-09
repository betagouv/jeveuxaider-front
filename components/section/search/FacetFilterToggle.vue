<template>
  <div class="relative">
    <span
      ref="tag"
      tabindex="-1"
      class="cursor-pointer w-full"
      @click="isOpen = !isOpen"
      @keydown.esc="isOpen = false"
    >
      <slot
        name="button"
        :is-open="isOpen"
        :active-values-count="activeValuesCount"
        :first-value-selected="firstValueSelected"
      >
        Toggle facet
      </slot>
    </span>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="onClickOutside"
        :class="[
          'mt-2 absolute z-20 bg-white border shadow-xl text-[15px] w-[350px]',
          optionsPositionClass,
          optionsClass,
        ]"
        @keydown.esc="isOpen = false"
      >
        <div class="px-4 pt-4">
          <div :id="`label-search-${uuid}`" class="font-medium">
            {{ label }}
          </div>

          <FacetSearch
            ref="facetSearch"
            v-model="facetQuery"
            :aria-labelledby="`label-search-${uuid}`"
            @update:modelValue="handleChangeSearchFacetValues"
            class="mt-3"
          />

          <div
            ref="scrollContainer"
            class="max-h-[254px] overflow-y-auto overscroll-contain custom-scrollbar-gray -mx-2 py-3"
          >
            <div class="py-1 mr-2 space-y-4 text-sm mx-2">
              <div v-if="[...activeValues, ...inactiveValues].length == 0" class="text-gray-400">
                Aucun résultat avec les filtres actuels.
              </div>

              <fieldset class="relative" style="min-inline-size: auto">
                <legend class="sr-only">
                  {{ legend }}
                </legend>

                <div class="space-y-4">
                  <div
                    v-for="facet in [...activeValues, ...inactiveValues]"
                    :key="facet.value"
                    :class="[
                      {
                        'text-jva-blue-500': isActiveFilter(facetName, facet.value),
                      },
                    ]"
                    class="flex items-center group"
                  >
                    <input
                      :id="`facetFilter__${facetName}_${facet.value}`"
                      :name="`facetFilter__${facetName}_${facet.value}`"
                      :value="isActiveFilter(facetName, facet.value)"
                      type="checkbox"
                      :checked="isActiveFilter(facetName, facet.value)"
                      class="rounded text-jva-blue-500 transition focus:ring-jva-blue-500 group-hover:border-jva-blue-500 cursor-pointer"
                      @change="handleFacetToggle(facetName, facet.value)"
                    />
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
              </fieldset>
            </div>
          </div>
        </div>

        <div class="border-t px-6 py-3 flex justify-end">
          <button
            class="text-sm"
            :class="[
              { 'text-gray-400 pointer-events-none': !activeValuesCount },
              {
                'text-jva-blue-500 cursor-pointer hover:underline': activeValuesCount,
              },
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
import FacetSearch from '@/components/section/search/FacetSearch.vue'
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  components: {
    FacetSearch,
  },
  props: {
    facetName: { type: String, required: true },
    label: { type: String, required: true },
    optionsClass: { type: String, default: '' },
    legend: { type: String, default: null },
  },
  setup() {
    const { isActiveFilter, deleteFilter, addFilter, searchForFacetValues } =
      useAlgoliaMissionsQueryBuilder()
    return {
      isActiveFilter,
      deleteFilter,
      addFilter,
      searchForFacetValues,
    }
  },
  data() {
    return {
      isOpen: false,
      facetHits: null,
      facetQuery: null,
      uuid: uuidv4(),
      optionsPositionClass: '',
    }
  },
  computed: {
    allValues() {
      if (this.facetHits) {
        return this.facetHits.map((facetHit) => {
          return {
            value: facetHit.value,
            count: facetHit.count,
          }
        })
      }

      const facet = this.$stores.algoliaSearch.facetResults(this.facetName)
      return Object.keys(facet).map((value) => {
        return {
          value,
          count: facet[value],
        }
      })
    },
    activeValues() {
      return this.allValues.filter((facet) => {
        return this.$route.query[this.facetName]?.split('|').includes(facet.value)
      })
    },
    inactiveValues() {
      return this.allValues.filter((facet) => {
        return !this.$route.query[this.facetName]?.split('|').includes(facet.value)
      })
    },
    firstValueSelected() {
      return this.$route.query[this.facetName]?.split('|')[0]
    },
    activeValuesCount() {
      return this.$route.query[this.facetName]?.split('|').length
    },
  },
  watch: {
    async isOpen(newVal) {
      if (newVal) {
        await this.$nextTick()
        this.handleOptionsPosition()
        this.$refs.facetSearch.$refs?.input?.focus()
      }
    },
    async $route(newVal, oldVal) {
      if (newVal.name !== oldVal.name) {
        return
      }
      if (this.facetHits && this.facetQuery) {
        const res = await this.searchForFacetValues(this.facetName, this.facetQuery)
        this.facetHits = res.facetHits
      }
    },
  },
  methods: {
    deleteFacet() {
      this.deleteFilter(this.facetName)
      this.isOpen = false
    },
    async handleChangeSearchFacetValues(facetQuery) {
      if (!facetQuery || facetQuery == '') {
        this.facetHits = null
        return
      }
      const res = await this.searchForFacetValues(this.facetName, facetQuery)
      this.facetHits = res.facetHits
    },
    onClickOutside(e) {
      this.isOpen = false
    },
    async handleFacetToggle(facetName, facetValue) {
      this.isActiveFilter(facetName, facetValue)
        ? await this.deleteFilter(facetName, facetValue, true)
        : await this.addFilter(facetName, facetValue, true)
    },
    handleOptionsPosition() {
      const elOptionsX = this.$refs.tag.getBoundingClientRect()?.x
      console.log('elOptionsX', elOptionsX)
      const windowCenterX = window.innerWidth / 2
      this.optionsPositionClass = elOptionsX > windowCenterX ? 'right-0' : ''
    },
  },
})
</script>

<style lang="postcss" scoped>
.custom-scrollbar-gray::-webkit-scrollbar-track {
  @apply my-2;
}
</style>
