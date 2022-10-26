<template>
  <div>
    <div class="space-y-3">
      <div class="font-medium text-[15px]">
        Ma ville est…
      </div>
      <FacetSearch ref="facetSearch" v-model="searchValue" placeholder="Nom ou code postal" @input="handleInput" @clear="handleSelectedAdress(null)" />
    </div>
    <div class="flex flex-col py-2 text-sm">
      <div v-for="suggestion in suggestions" :key="suggestion.id" class="py-1 cursor-pointer flex justify-between truncate flex-1 group" @click="handleSelectedAdress(suggestion)">
        <div class="flex items-center">
          <LocationMarkerIcon
            class="flex-none mr-2 transition text-gray-400"
            width="16"
            height="16"
          />
          <div class="truncate">
            {{ suggestion.city }}
          </div>
        </div>

        <div class="text-gray-600 ml-1 font-light">
          {{ suggestion.postcode }}
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
      searchValue: this.$route.query.city,
      fetchSuggestions: [],
      initialSuggestions: [
        {
          id: 'initial_1',
          city: 'Paris',
          aroundLatLng: '48.859,2.347',
          postcode: '75001'
        },
        {
          id: 'initial_2',
          city: 'Marseille',
          aroundLatLng: '43.282,5.405',
          postcode: '13001'
        },
        {
          id: 'initial_3',
          city: 'Lyon',
          aroundLatLng: '45.758,4.835',
          postcode: '69001'
        },
        {
          id: 'initial_4',
          city: 'Toulouse',
          aroundLatLng: '43.603746,1.434497',
          postcode: '31000'
        },
        {
          id: 'initial_5',
          city: 'Bordeaux',
          aroundLatLng: '44.851895,-0.587877',
          postcode: '33200'
        }
      ]
    }
  },
  computed: {
    suggestions () {
      return this.fetchSuggestions.length
        ? this.fetchSuggestions
        : [
            ...this.$cookies.get('localisation-history') ?? [],
            ...this.initialSuggestions
          ].reduce((unique, item) => (unique.find(i => i.aroundLatLng == item.aroundLatLng) ? unique : [...unique, item]), []).slice(0, 5)
    }
  },
  watch: {
    '$route.query.city' (newVal) {
      this.searchValue = newVal
    }
  },
  methods: {
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
          aroundLatLng: `${option.geometry.coordinates[1]},${option.geometry.coordinates[0]}`,
          typeLabel: this.$options.filters.label(option.properties.type, 'geoType')
        }
      })
      this.fetchSuggestions = formatOptions
    },
    handleInput (payload) {
      this.searchValue = payload
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        if (this.searchValue?.length < 3) {
          if (!this.searchValue) {
            this.fetchSuggestions = []
          }
          return
        }
        this.fetchGeoSuggestions()
      }, 275)
      this.timeout()
    },
    handleSelectedAdress (suggestion) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          aroundLatLng: suggestion?.aroundLatLng,
          city: suggestion?.city,
          page: undefined
        }
      })
      this.isOpen = false
      this.fetchSuggestions = []

      if (suggestion) {
        this.setHistory(suggestion)
      }

      this.$emit('updated')
    },
    setHistory (suggestion) {
      const history = [
        {
          aroundLatLng: suggestion.aroundLatLng,
          city: suggestion.city,
          postcode: suggestion.postcode
        },
        ...this.$cookies.get('localisation-history') ?? []
      ].reduce((unique, item) => (unique.find(i => i.aroundLatLng == item.aroundLatLng) ? unique : [...unique, item]), []).slice(0, 5)
      this.$cookies.set('localisation-history', history)
    }
  }
}
</script>
