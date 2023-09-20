<template>
  <div ref="mobileFilters" class="sm:hidden sticky top-[-1px] z-30">
    <div :class="['bg-white border p-4', { 'full-bleed border-white shadow-xl': isPinned }]">
      <div class="max-w-[309px] xs:max-w-[359px] mx-auto">
        <div class="flex items-center divide-x">
          <LocalisationSuggestions
            class="w-full pr-4 mr-auto"
            @geolocFilterActiveStateToggle="isGeolocFilterActive = $event"
          />
          <transition
            enter-active-class="ease-out duration-200 delay-200"
            enter-from-class="opacity-0 translate-x-4 sm:translate-x-0 sm:scale-95"
            enter-to-class="opacity-100 translate-x-0 sm:scale-100"
          >
            <button
              v-show="!isGeolocFilterActive"
              class="flex-none p-2 ml-4 relative"
              @click="isFiltersOpen = true"
            >
              <RiEqualizerFill class="text-jva-blue-500 fill-current w-6 h-6" />
              <div
                v-if="getNbMobileActiveFilters() > 0"
                class="absolute -top-1.5 -right-1 bg-[#A1A1F8] px-1.5 py-0.5 rounded-full text-white font-bold text-xs min-w-[22px] !leading-[18px] inline-flex justify-center"
              >
                {{ getNbMobileActiveFilters() }}
              </div>
            </button>
          </transition>
        </div>
      </div>
    </div>

    <DrawerSearchOrganisationsFilters
      v-if="$stores.algoliaSearch.results"
      :is-open="isFiltersOpen"
      @close="isFiltersOpen = false"
    />
  </div>
</template>

<script>
import DrawerSearchOrganisationsFilters from '@/components/drawer/DrawerSearchOrganisationsFilters.vue'
import LocalisationSuggestions from '@/components/search/LocalisationSuggestions.vue'

export default defineNuxtComponent({
  components: {
    DrawerSearchOrganisationsFilters,
    LocalisationSuggestions,
  },
  setup() {
    const { getNbMobileActiveFilters, addFilter } = useAlgoliaOrganisationsQueryBuilder()

    return {
      getNbMobileActiveFilters,
      addFilter,
    }
  },
  data() {
    return {
      isFiltersOpen: false,
      isGeolocFilterActive: false,
      isPinned: false,
      isPinnedObserver: null,
    }
  },
  mounted() {
    this.isPinnedObserver = new IntersectionObserver(
      ([e]) => {
        this.isPinned = e.intersectionRatio < 1
      },
      { threshold: [1] }
    )
    this.isPinnedObserver.observe(this.$refs.mobileFilters)
  },
  beforeDestroy() {
    this.isPinnedObserver.disconnect()
  },
  methods: {
    onTabSelect(tab) {
      if (tab.slug === 'remote') {
        this.onRemoteTabClick()
      } else if (tab.slug === 'onsite') {
        this.onsiteTabClick()
      }
    },
    onsiteTabClick() {
      this.addFilter('type', 'Mission en présentiel')
    },
    onRemoteTabClick() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          type: 'Mission à distance',
          page: undefined,
          city: undefined,
          aroundLatLng: undefined,
          department_name: undefined,
          is_autonomy: undefined,
        },
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
.full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>
