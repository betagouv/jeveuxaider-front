<template>
  <div>
    <div class="group flex justify-between items-center cursor-pointer" @click="isOpen = !isOpen">
      <div class="flex space-x-2 items-center text-gray-900">
        <LocationMarkerIcon class="h-5 w-5" />
        <div v-if="ipLatLng">
          Près de chez moi <span v-if="ipCity">({{ ipCity }})</span>
        </div>
        <div v-else>
          {{ $route.query.city }}
        </div>
      </div>
      <ChevronDownIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
    </div>
    <div v-if="isOpen" v-click-outside="onClickOutside">
      <div class="mt-2 absolute z-40 bg-white border shadow-xl rounded-xl text-[15px] max-w-[350px] w-full">
        <div class="p-4 pb-0 space-y-3">
          <div class="font-medium">
            {{ label }}
          </div>

          <FacetSearch ref="facetSearch" v-model="searchValue" placeholder="Nom ou code postal" @input="handleInput" />
        </div>

        <div class="text-sm">
          <div class="flex flex-col py-2">
            <div v-for="suggestion in suggestions" :key="suggestion.id" class="px-4 py-1 cursor-pointer flex justify-between truncate flex-1 group" @click="handleSelectedAdress(suggestion)">
              <div class="flex items-center">
                <LocationMarkerIcon class="flex-none mr-2 transition text-gray-400 group-hover:text-jva-blue-500 group-hover:scale-110" width="16" height="16" />
                <div class="truncate">
                  {{ suggestion.city }}
                </div>
              </div>

              <div class="text-gray-600 ml-1 font-light">
                {{ suggestion.postcode }}
              </div>
            </div>
          </div>

          <div class="border-t px-6 py-3 flex justify-end">
            <div
              :class="[
                {'text-gray-400 pointer-events-none': !$route.query.city},
                {'text-jva-blue-500 cursor-pointer': $route.query.city}
              ]"
              @click="handleSelectedAdress(null)"
            >
              Effacer
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import FacetSearch from '@/components/section/search/FacetSearch.vue'

export default {
  components: {
    FacetSearch
  },
  mixins: [AlgoliaQueryBuilder],
  props: {
    label: {
      type: String,
      required: true
    },
    ipLatLng: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isOpen: false,
      ipCity: null,
      searchValue: this.$route.query.city,
      fetchSuggestions: [],
      initialSuggestions: [
        {
          id: 'initial_1',
          city: 'Paris',
          coordinates: ['2.347', '48.859']
        },
        {
          id: 'initial_2',
          city: 'Lyon',
          coordinates: ['4.835', '45.758']
        },
        {
          id: 'initial_3',
          city: 'Marseille',
          coordinates: ['5.405', '43.282']
        }
      ]
    }
  },
  computed: {
    suggestions () {
      return this.fetchSuggestions.length ? this.fetchSuggestions : this.initialSuggestions
    }
  },
  watch: {
    '$route.query.city' (newVal) {
      this.searchValue = newVal
    },
    async isOpen (isOpen) {
      if (isOpen) {
        await this.$nextTick()
        this.$refs.facetSearch.$refs?.input?.focus()
      }
    }
  },
  async mounted () {
    if (this.ipLatLng) {
      const [lat, lng] = this.ipLatLng.split(',')
      const res = await this.$axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${lng}&lat=${lat}`)
      this.ipCity = res.data?.features[0]?.properties?.city
    }
  },
  methods: {
    reset () {
      this.searchValue = null
    },
    onClickOutside () {
      this.isOpen = false
    },
    async fetchGeoSuggestions () {
      const { data } = await this.$axios.get('https://api-adresse.data.gouv.fr/search', {
        params: {
          q: this.searchValue,
          limit: 5,
          type: 'municipality'
        }
      })

      const formatOptions = data.features.map((option) => {
        return {
          ...option.properties,
          coordinates: option.geometry.coordinates,
          typeLabel: this.$options.filters.label(option.properties.type, 'geoType')
        }
      })
      this.fetchSuggestions = formatOptions
    },
    handleInput (payload) {
      this.searchValue = payload
      if (!this.searchValue) {
        return
      }

      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        this.fetchGeoSuggestions()
      }, 275)
      this.timeout()
    },
    handleSelectedAdress (suggestion) {
      if (suggestion === null) {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, aroundLatLng: undefined, city: undefined, page: undefined }
        })
      } else {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, aroundLatLng: `${suggestion.coordinates[1]},${suggestion.coordinates[0]}`, city: suggestion.city, page: undefined }
        })
      }
      this.isOpen = false
    }
  }
}
</script>
