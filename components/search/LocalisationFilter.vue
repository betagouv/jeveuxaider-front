<template>
  <div class="relative">
    <button
      class="group flex justify-between items-center cursor-pointer w-full"
      :aria-expanded="isOpen || 'false'"
      @click="isOpen = !isOpen"
      @keydown.esc="isOpen = false"
    >
      <div class="flex space-x-2 items-center text-gray-900 truncate">
        <RiMapPin2Fill
          class="h-4 w-4 flex-none transition-opacity opacity-25 group-hover:opacity-100"
        />
        <p
          v-if="!$route.query.city && $stores.algoliaSearch.navigatorGeolocation"
          class="truncate font-bold"
        >
          Autour de moi
        </p>
        <p v-else-if="!$route.query.city" class="truncate italic pr-[1px] text-[#888888]">
          Ville ou code postal
        </p>
        <p v-else class="font-bold truncate">
          {{ $route.query.city }}
        </p>
      </div>

      <RiLoader5Line
        v-if="$stores.algoliaSearch.loadingNavigatorGeolocation"
        class="animate-spin h-5 w-5 text-gray-400 fill-current"
      />
      <RiArrowDownSLine v-else class="text-gray-500 h-4 w-4 group-hover:text-gray-900 flex-none" />
    </button>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="onClickOutside"
        class="mt-2 absolute right-0 lg:right-auto z-40 bg-white border shadow-xl text-[15px] w-[350px]"
        @keydown.esc="isOpen = false"
      >
        <div class="p-4 pb-0 space-y-3">
          <div :id="`label-search-${uuid}`" class="font-medium">
            {{ label }}
          </div>

          <FacetSearch
            ref="facetSearch"
            v-model="searchValue"
            placeholder="Renseignez une ville ou un code postal"
            :aria-labelledby="`label-search-${uuid}`"
            @update:modelValue="handleInput"
            @clear="fetchSuggestions = []"
          />
        </div>

        <div class="text-sm">
          <div class="max-h-[268px] overflow-y-auto overscroll-contain custom-scrollbar-gray mr-2">
            <div class="flex flex-col py-2">
              <!-- Seulement si geolocalisation par navigateur acceptée -->
              <button
                v-if="$stores.algoliaSearch.navigatorGeolocation"
                :class="[
                  'px-4 py-[6px] cursor-pointer flex justify-between truncate flex-1 group !outline-none focus-visible:bg-[#E3E3FD]',
                  { 'text-jva-blue-500': !$route.query.aroundLatLng },
                ]"
                @click="handleSelectedAdress(null)"
              >
                <div class="flex items-center">
                  <RiMapPin2Fill
                    :class="[
                      'flex-none mr-2 transition group-hover:text-jva-blue-500 group-hover:scale-110 fill-current',
                      !$route.query.aroundLatLng ? 'text-jva-blue-500' : 'text-gray-400',
                    ]"
                    width="16"
                    height="16"
                  />
                  <div>Autour de moi</div>
                </div>
              </button>

              <button
                v-for="suggestion in suggestions"
                :key="suggestion.id"
                :class="[
                  'px-4 py-[6px] cursor-pointer flex justify-between truncate flex-1 group !outline-none focus-visible:bg-[#E3E3FD]',
                  {
                    'text-jva-blue-500': $route.query?.aroundLatLng === suggestion.aroundLatLng,
                  },
                ]"
                @click="handleSelectedAdress(suggestion)"
              >
                <div class="flex items-center">
                  <RiMapPin2Fill
                    :class="[
                      'flex-none mr-2 transition group-hover:text-jva-blue-500 group-hover:scale-110 fill-current',
                      $route.query?.aroundLatLng === suggestion.aroundLatLng
                        ? 'text-jva-blue-500'
                        : 'text-gray-400',
                    ]"
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
              </button>
            </div>
          </div>

          <div class="border-t px-6 py-3 flex justify-end">
            <button
              :class="[
                { 'text-gray-400 pointer-events-none': !$route.query.city },
                { 'text-jva-blue-500 cursor-pointer': $route.query.city },
              ]"
              :disabled="!$route.query.city"
              @click="handleSelectedAdress(null)"
            >
              Effacer
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FacetSearch from '@/components/section/search/FacetSearch.vue'
import { toRaw } from 'vue'

export default defineNuxtComponent({
  components: {
    FacetSearch,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup() {
    const uuid = useId()
    const localisationHistoryCookie = useCookie('localisation-history')
    return {
      localisationHistoryCookie,
      uuid,
    }
  },
  data() {
    return {
      isOpen: false,
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
    async isOpen(isOpen) {
      if (isOpen) {
        await this.$nextTick()
        this.$refs.facetSearch?.$refs?.input?.focus()
      }
    },
  },
  methods: {
    onClickOutside() {
      this.isOpen = false
    },
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
  },
})
</script>

<style lang="postcss" scoped>
.custom-scrollbar-gray::-webkit-scrollbar-track {
  @apply my-2;
}
</style>
