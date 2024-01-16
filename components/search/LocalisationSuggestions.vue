<template>
  <div v-click-outside="() => (isGeolocFilterActive = false)">
    <div :id="`label-search-${uuid}`" class="text-[#7B7B7B] mb-1">Localisation</div>

    <!-- Fake input -->
    <button
      v-if="!isGeolocFilterActive"
      ref="fakeInput"
      class="flex space-x-3 items-center text-gray-900 truncate w-full"
      @click="handleFakeInputClick"
    >
      <RiMapPin2Fill class="h-5 w-5 flex-none fill-current text-gray-400" />
      <div
        v-if="!$route.query.city && $stores.algoliaSearch.navigatorGeolocation"
        class="truncate font-bold w-full text-left"
      >
        Autour de moi
      </div>
      <div
        v-else-if="!$route.query.city && $stores.algoliaSearch.results.aroundLatLng"
        class="truncate italic pr-[1px] text-[#888888] w-full text-left"
      >
        Ville ou code postal
      </div>
      <div v-else class="font-bold truncate w-full text-left">
        {{ $route.query.city }}
      </div>
      <RiLoader5Line
        v-if="$stores.algoliaSearch.loadingNavigatorGeolocation"
        class="animate-spin h-5 w-5 text-gray-400 fill-current self-end"
      />
    </button>

    <!-- Real input -->
    <FacetSearch
      v-else
      ref="facetSearch"
      v-model="searchValue"
      placeholder="Ville ou code postal"
      icon="RiMapPin2Fill"
      :aria-labelledby="`label-search-${uuid}`"
      @focus="isGeolocFilterActive = true"
      @update:modelValue="handleInput"
      @clear="
        () => {
          handleSelectedAdress(null)
          isGeolocFilterActive = true
        }
      "
      @keydown.native.esc="handleCloseSuggestions"
    />

    <!-- Transition to avoid missclick due to layout shift -->
    <transition
      enter-active-class="ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="tease-in duration-100"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 -translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div v-if="isGeolocFilterActive" class="flex flex-col py-2 text-sm">
        <!-- Seulement si geolocalisation par navigateur acceptée -->
        <button
          v-if="$stores.algoliaSearch.navigatorGeolocation"
          :class="[
            'py-2 cursor-pointer flex justify-between truncate flex-1 group !outline-none focus-visible:bg-[#E3E3FD] -mx-4 px-4',
            { 'text-jva-blue-500': !$route.query.aroundLatLng },
          ]"
          @click="handleSelectedAdress(null)"
          @keydown.esc="handleCloseSuggestions"
        >
          <div>Autour de moi</div>
        </button>

        <button
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          :class="[
            'py-2 cursor-pointer flex justify-between truncate flex-1 group !outline-none focus-visible:bg-[#E3E3FD] -mx-4 px-4',
            {
              'text-jva-blue-500': $route.query?.aroundLatLng === suggestion.aroundLatLng,
            },
          ]"
          @click="handleSelectedAdress(suggestion)"
        >
          <div class="truncate">
            {{ suggestion.city }}
          </div>

          <div class="text-gray-600 ml-1 font-light">
            {{ suggestion.postcode }}
          </div>
        </button>
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
  setup() {
    const localisationHistoryCookie = useCookie('localisation-history')
    return {
      localisationHistoryCookie,
    }
  },
  data() {
    return {
      searchValue: this.$route.query.city,
      fetchSuggestions: [],
      initialSuggestions: [
        {
          id: 'initial_1',
          city: 'Paris',
          aroundLatLng: '48.859,2.347',
          postcode: '75001',
        },
        {
          id: 'initial_2',
          city: 'Marseille',
          aroundLatLng: '43.282,5.405',
          postcode: '13001',
        },
        {
          id: 'initial_3',
          city: 'Lyon',
          aroundLatLng: '45.758,4.835',
          postcode: '69001',
        },
        {
          id: 'initial_4',
          city: 'Toulouse',
          aroundLatLng: '43.603746,1.434497',
          postcode: '31000',
        },
        {
          id: 'initial_5',
          city: 'Bordeaux',
          aroundLatLng: '44.851895,-0.587877',
          postcode: '33200',
        },
      ],
      isGeolocFilterActive: false,
      uuid: uuidv4(),
    }
  },
  computed: {
    suggestions() {
      return this.fetchSuggestions.length
        ? this.fetchSuggestions
        : [...(this.localisationHistoryCookie ?? []), ...this.initialSuggestions]
            .reduce(
              (unique, item) =>
                unique.find((i) => i.aroundLatLng == item.aroundLatLng)
                  ? unique
                  : [...unique, item],
              []
            )
            .slice(0, 5)
    },
  },
  watch: {
    '$route.query.city'(newVal) {
      this.searchValue = newVal
    },
    isGeolocFilterActive(newVal) {
      this.$emit('geolocFilterActiveStateToggle', newVal)
    },
  },
  methods: {
    async fetchGeoSuggestions() {
      const suggestions = await $fetch('https://api-adresse.data.gouv.fr/search', {
        params: {
          q: this.searchValue.substring(0, 85),
          limit: 25,
          type: 'municipality',
        },
      })

      const formatOptions = suggestions.features.map((option) => {
        return {
          ...option.properties,
          aroundLatLng: `${option.geometry.coordinates[1]},${option.geometry.coordinates[0]}`,
          typeLabel: this.$filters.label(option.properties.type, 'geoType'),
        }
      })
      this.fetchSuggestions = formatOptions
    },
    handleInput(payload) {
      this.searchValue = payload
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(() => {
        if (!this.searchValue || this.searchValue?.trim().length < 3) {
          if (this.searchValue === '') {
            this.fetchSuggestions = []
          }
          return
        }

        // First character must be a letter or a number to avoid error 400
        var re = new RegExp(/^[a-z0-9]$/i)
        if (!re.test(this.searchValue[0])) {
          this.fetchSuggestions = []
          return
        }

        this.fetchGeoSuggestions()
      }, 275)
      this.timeout()
    },
    handleSelectedAdress(suggestion) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          aroundLatLng: suggestion?.aroundLatLng,
          city: suggestion?.city,
          page: undefined,
        },
      })
      this.isOpen = false
      this.fetchSuggestions = []

      if (suggestion) {
        this.setHistory(suggestion)
      }

      this.handleCloseSuggestions()
    },
    setHistory(suggestion) {
      const history = [
        {
          aroundLatLng: suggestion.aroundLatLng,
          city: suggestion.city,
          postcode: suggestion.postcode,
        },
        ...(toRaw(this.localisationHistoryCookie) ?? []),
      ]
        .reduce(
          (unique, item) =>
            unique.find((i) => i.aroundLatLng == item.aroundLatLng) ? unique : [...unique, item],
          []
        )
        .slice(0, 5)

      this.localisationHistoryCookie = history
    },
    async handleFakeInputClick() {
      this.isGeolocFilterActive = true
      await this.$nextTick()
      this.$refs.facetSearch?.$refs.input?.focus()
    },
    async handleCloseSuggestions() {
      this.isGeolocFilterActive = false
      await this.$nextTick()
      this.$refs.fakeInput?.focus()
    },
  },
})
</script>
