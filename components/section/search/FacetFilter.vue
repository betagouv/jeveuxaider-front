<template>
  <div>
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen" :activeValuesCount="activeValuesCount" :firstValueSelected="firstValueSelected">
        Toggle facet
      </slot>
    </div>
    <div v-if="isOpen" v-click-outside="onClickOutside">
      <div class="mt-2 absolute z-40 bg-white border shadow-xl rounded-xl text-[15px] max-w-[350px] w-full">
        <div class="p-4 space-y-3">
          <div class="relative">
            <div class="font-medium">
              {{ label }}
            </div>
            <XIcon
              class=" text-gray-400 hover:text-gray-500 cursor-pointer absolute right-0 top-0 -m-1"
              width="20"
              @click="isOpen = false"
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
          <div class="relative overflow-hidden">
            <div
              class="absolute custom-gradient bottom-0 w-full pointer-events-none transition duration-500"
              :class="[{'h-0': isScrollAtBottom}, {'h-12': !isScrollAtBottom}]"
            />

            <div ref="scrollContainer" class="max-h-[250px] overflow-y-auto overscroll-contain">
              <div class="py-1 mr-2 space-y-2 text-sm">
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
    },
    facetQuery () {
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
    onClickOutside () {
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
