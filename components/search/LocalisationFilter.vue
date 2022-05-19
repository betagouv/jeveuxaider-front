<template>
  <div>
    <div class="group flex justify-between items-center cursor-pointer" @click="isOpen = !isOpen">
      <div class="text-gray-900">
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
      <div class="mt-2 absolute z-40 bg-white border shadow-xl rounded-xl text-[15px] max-w-[375px] w-full">
        <div class="divide-y">
          <div class="p-4">
            <div class="font-medium">
              {{ label }}
            </div>
          </div>
          <div class="flex space-x-1 items-center bg-gray-50 px-4 py-2">
            <SearchIcon class="text-gray-500 h-5 w-5" />
            <input :value="searchValue" type="text" placeholder="Votre ville" class="border-0 w-full bg-transparent" @input="handleInput">
            <XIcon v-if="searchValue" class="text-gray-500 h-5 w-5" @click="reset" />
          </div>
          <div class="py-4 flex flex-col space-y-1">
            <div v-for="suggestion,i in suggestions" :key="i" class="px-4 py-1 text-gray-600 hover:bg-gray-50 cursor-pointer flex justify-between truncate flex-1" @click="handleSelectedAdress(suggestion)">
              <div class="truncate">
                {{ suggestion.city }}
              </div>
              <div class="text-gray-600 ml-1 font-light">
                {{ suggestion.postcode }}
              </div>
            </div>
          </div>
          <div class="border-t px-6 py-4 flex justify-between">
            <div v-if="$route.query.city" class="text-gray-600 cursor-pointer" @click="handleSelectedAdress(null)">
              Effacer
            </div>
            <div class="ml-auto text-jva-blue-500 cursor-pointer" @click="isOpen = false">
              Valider
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

export default {
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
    handleInput (evt) {
      this.searchValue = evt.target.value
      this.showOptions = true
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
