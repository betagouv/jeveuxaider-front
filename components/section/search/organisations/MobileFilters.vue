<template>
  <div class="sm:hidden">
    <div class="bg-white border p-4 flex items-center divide-x">
      <LocalisationSuggestions
        class="w-full pr-4 mr-auto"
        @geolocFilterActiveStateToggle="isGeolocFilterActive = $event"
      />
      <transition
        enter-active-class="ease-out duration-200 delay-200"
        enter-class="opacity-0 translate-x-4 sm:translate-x-0 sm:scale-95"
        enter-to-class="opacity-100 translate-x-0 sm:scale-100"
      >
        <button v-show="!isGeolocFilterActive" class="flex-none p-2 ml-4 relative" @click="isFiltersOpen = true">
          <RiEqualizerFill class="text-jva-blue-500 fill-current w-6 h-6" />
          <div v-if="nbMobileSecondaryFilters > 0" class="absolute -top-1.5 -right-1 bg-[#A1A1F8] px-1.5 py-0.5 rounded-full text-white font-bold text-xs min-w-[22px] !leading-[18px] inline-flex justify-center">
            {{ nbMobileSecondaryFilters }}
          </div>
        </button>
      </transition>
    </div>

    <DrawerSearchOrganisationsFilters
      v-if="$store.state.algoliaSearch.results"
      :is-open="isFiltersOpen"
      @close="isFiltersOpen = false"
    />
  </div>
</template>

<script>
import DrawerSearchOrganisationsFilters from '@/components/drawer/DrawerSearchOrganisationsFilters.vue'
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'
import LocalisationSuggestions from '@/components/search/LocalisationSuggestions.vue'

export default {
  components: {
    DrawerSearchOrganisationsFilters,
    LocalisationSuggestions
  },
  mixins: [AlgoliaMissionsQueryBuilder],
  data () {
    return {
      isFiltersOpen: false,
      isGeolocFilterActive: false
    }
  },
  methods: {
    onTabSelect (tab) {
      if (tab.slug === 'remote') {
        this.onRemoteTabClick()
      } else if (tab.slug === 'onsite') {
        this.onsiteTabClick()
      }
    },
    onsiteTabClick () {
      this.addFilter('type', 'Mission en présentiel')
    },
    onRemoteTabClick () {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, type: 'Mission à distance', page: undefined, city: undefined, aroundLatLng: undefined, department_name: undefined, is_autonomy: undefined }
      })
    }
  }
}
</script>
