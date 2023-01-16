<template>
  <div>
    <Tabs
      name="Près de chez moi ou depuis chez moi"
      :tabs="[
        { content: 'Prés de chez moi', slug: 'onsite' },
        { content: 'Depuis chez moi', slug: 'remote' },
      ]"
      tabpanel-class="py-4 bg-white"
      tabswrapper-class="!px-2 !text-[15px] xs:!px-3 xs:!text-base"
      :selected-tab="$route.query['type'] === 'Mission à distance' ? 1 : 0"
      @selected="onTabSelect"
    >
      <div slot="tab-0">
        <div class="flex items-center divide-x">
          <LocalisationSuggestions
            class="w-full pr-4 mr-auto"
            @geolocFilterActiveStateToggle="isGeolocFilterActive = $event"
          />
          <transition
            enter-active-class="ease-out duration-200 delay-200"
            enter-class="opacity-0 translate-x-4 sm:translate-x-0 sm:scale-95"
            enter-to-class="opacity-100 translate-x-0 sm:scale-100"
          >
            <portal-target v-show="!isGeolocFilterActive" name="mobile-button-filter" multiple />
          </transition>
        </div>
      </div>

      <div slot="tab-1">
        <div class="flex items-center divide-x">
          <div class="w-full pr-4 mr-auto">
            <div class="text-[#7B7B7B] mb-1">
              Localisation
            </div>
            <div class="flex space-x-3 items-center">
              <RiComputerFill class="h-5 w-5 flex-none fill-current text-gray-400" />
              <span class="font-bold">Depuis chez moi</span>
            </div>
          </div>
          <portal-target v-show="!isGeolocFilterActive" name="mobile-button-filter" multiple />
        </div>
      </div>
    </Tabs>

    <portal to="mobile-button-filter">
      <div class="flex-none p-2 pl-6 relative" @click="isFiltersOpen = true">
        <RiEqualizerFill class="text-jva-blue-500 fill-current w-6 h-6" />
        <div v-if="nbMobileSecondaryFilters > 0" class="absolute -top-1.5 -right-1 bg-[#A1A1F8] px-1.5 py-0.5 rounded-full text-white font-bold text-xs min-w-[22px] !leading-[18px] inline-flex justify-center">
          {{ nbMobileSecondaryFilters }}
        </div>
      </div>
    </portal>

    <DrawerSearchMissionsFilters
      v-if="$store.state.algoliaSearch.results"
      :is-open="isFiltersOpen"
      @close="isFiltersOpen = false"
    />
  </div>
</template>

<script>
import Tabs from '@/components/dsfr/Tabs.vue'
import DrawerSearchMissionsFilters from '@/components/drawer/DrawerSearchMissionsFilters.vue'
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'
import LocalisationSuggestions from '@/components/search/LocalisationSuggestions.vue'

export default {
  components: {
    Tabs,
    DrawerSearchMissionsFilters,
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
