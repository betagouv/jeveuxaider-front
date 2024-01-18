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
      @clear="fetchSuggestions = []"
      @keydown.native.esc="handleCloseSuggestions"
    />

    <transition
      enter-active-class="ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div v-if="isGeolocFilterActive" class="text-sm">
        <div class="max-h-[250px] overflow-y-auto overscroll-contain custom-scrollbar-gray -mr-2">
          <div class="flex flex-col py-4">
            <!-- Seulement si geolocalisation par navigateur acceptée -->
            <button
              v-if="$stores.algoliaSearch.navigatorGeolocation"
              :class="[
                'py-[6px] cursor-pointer flex justify-between truncate flex-1 group !outline-none focus-visible:bg-[#E3E3FD] pr-2',
                { 'text-jva-blue-500': !$route.query.aroundLatLng },
              ]"
              @click="handleSelectedAdress(null)"
              @keydown.esc="handleCloseSuggestions"
            >
              <div class="truncate">
                <div class="flex">
                  <span class="truncate">Autour de moi</span>
                  <RiCheckLine
                    v-if="!$route.query.aroundLatLng"
                    class="ml-1 h-5 fill-current flex-none relative top-[2px]"
                  />
                </div>
              </div>
            </button>

            <button
              v-for="suggestion in suggestions"
              :key="suggestion.id"
              :class="[
                'py-[6px] cursor-pointer flex justify-between truncate flex-1 group !outline-none focus-visible:bg-[#E3E3FD] pr-2 relative',
                {
                  'text-jva-blue-500': $route.query?.aroundLatLng === suggestion.aroundLatLng,
                },
              ]"
              @click="handleSelectedAdress(suggestion)"
            >
              <div class="truncate">
                <div class="flex">
                  <span class="truncate">{{ suggestion.city }}</span>
                  <RiCheckLine
                    v-if="$route.query?.aroundLatLng === suggestion.aroundLatLng"
                    class="ml-1 h-5 fill-current flex-none relative top-[2px]"
                  />
                </div>
              </div>

              <div class="text-gray-600 ml-1 font-light">
                {{ suggestion.postcode }}
              </div>
            </button>
          </div>
        </div>

        <div class="border-t py-3 flex justify-between">
          <button
            :class="[
              { 'text-gray-400 pointer-events-none': !$route.query.city },
              { 'text-jva-blue-500 cursor-pointer': $route.query.city },
            ]"
            :disabled="!$route.query.city"
            @click="handleSelectedAdress(null)"
          >
            Réinitialiser
          </button>
          <button class="text-jva-blue-500" @click="isGeolocFilterActive = false">Fermer</button>
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
  setup() {
    const localisationHistoryCookie = useCookie('localisation-history')
    return {
      localisationHistoryCookie,
    }
  },
  data() {
    return {
      searchValue: '',
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
    isGeolocFilterActive(newVal) {
      this.$emit('geolocFilterActiveStateToggle', newVal)
    },
  },
  methods: {
    handleInput(payload) {
      this.searchValue = payload
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(async () => {
        this.fetchSuggestions = await useGeolocationFetch(payload, {
          context: 'algolia',
          inputGeoType: 'municipality',
        })
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
      this.searchValue = ''

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

<style lang="postcss" scoped>
.custom-scrollbar-gray::-webkit-scrollbar-track {
  @apply my-2;
}
</style>
