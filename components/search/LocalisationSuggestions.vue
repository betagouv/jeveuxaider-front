<template>
  <div>
    <div class="text-sm -full">
      <div class="">
        <div class="p-4 pb-0 space-y-3">
          MA POSITION: xxxxx
        </div>
      </div>
      <div class="">
        <div class="p-4 pb-0 space-y-3">
          <div class="font-medium">
            Saisissez votre ville
          </div>
          <FacetSearch ref="facetSearch" v-model="searchValue" @input="handleInput" />
        </div>
        <div class="flex flex-col py-2">
          <div v-for="suggestion,i in suggestions" :key="i" class="px-4 py-1 text-gray-600 hover:bg-gray-50 cursor-pointer flex justify-between truncate flex-1" @click="handleSelectedAdress(suggestion)">
            <div class="truncate">
              {{ suggestion.city }}
            </div>
            <div class="text-gray-600 ml-1 font-light">
              {{ suggestion.postcode }}
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
    ipLatLng: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      ipCity: null,
      searchValue: this.$route.query.city,
      fetchSuggestions: [],
      initialSuggestions: [
        {
          city: 'Paris',
          coordinates: ['2.347', '48.859']
        },
        {
          city: 'Lyon',
          coordinates: ['4.835', '45.758']
        },
        {
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
      this.$emit('updated')
    }
  }
}
</script>
