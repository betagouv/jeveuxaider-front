<template>
  <div v-show="nbMissions > 0" class="full-bleed">
    <div class="bg-white py-8 lg:py-12 w-full xl:max-w-[1280px] mx-auto overflow-hidden">
      <!-- Fixed heights to avoid layout shift -->
      <div class="container md:px-8 xl:px-0 xl:max-w-5xl min-h-[581px] lg:min-h-[605px]">
        <div>
          <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8 mb-8 md:mb-12">
            <DsfrHeading as="h2" size="xl">
              {{ $filters.pluralize(nbMissions, 'mission disponible', 'missions disponibles') }}
              à distance
            </DsfrHeading>
            <div v-show="nbMissions > 3" class="hidden lg:block flex-none">
              <div class="flex space-x-2">
                <!-- Arrows -->
                <div id="slideshowRemoteArrows" />

                <DsfrButton
                  class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]"
                  type="transparent"
                  @click="onViewMoreClick()"
                >
                  Plus de missions
                </DsfrButton>
              </div>
            </div>
          </div>

          <AlgoliaSlideshowMissions
            :bleed="false"
            navigation-id="slideshowRemoteArrows"
            navigation-button-class="hover:bg-[#EFECE8]"
            aria-labelledby="label-slideshow-missions-distance"
            :search-parameters="{
              ...$stores.algoliaSearch.searchParameters,
              numericFilters: $stores.algoliaSearch.searchParameters.numericFilters?.filter(
                (f) => f !== 'is_autonomy=1'
              ),
              aroundLatLngViaIP: false,
              aroundLatLng: '',
              aroundRadius: 'all',
              hitsPerPage: 6,
              page: 0,
              facetFilters: [
                ...getActiveFacets().filter(
                  (facetFilter) => facetFilter[0].split(':')[0] != 'type'
                ),
                'type:Mission à distance',
              ],
            }"
            @slide-click="onSlideClick"
            @results="onResults"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSlideshowMissions,
  },
  props: {
    scrollToId: {
      type: String,
      default: 'recherche',
    },
  },
  setup() {
    const { getActiveFacets } = useAlgoliaMissionsQueryBuilder()
    return {
      getActiveFacets,
    }
  },
  data() {
    return {
      slideshowKey: 0,
      nbMissions: 0,
    }
  },
  watch: {
    $route() {
      this.slideshowKey++
    },
  },
  methods: {
    onViewMoreClick() {
      this.$plausible.trackEvent('Recherche mission - Bloc à distance - CTA plus de missions', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          type: 'Mission à distance',
          city: undefined,
          aroundLatLng: undefined,
          department_name: undefined,
          is_autonomy: undefined,
          page: undefined,
        },
      })
      window.scrollTo({
        top: document.getElementById(this.scrollToId).offsetTop,
      })
    },
    onSlideClick(item) {
      this.$plausible.trackEvent('Recherche mission - Bloc à distance - Click Card Mission', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          isFromApi: item.provider === 'api_engagement',
          isRegistrationOpen: item.is_registration_open,
          hasPlacesLeft: item.has_places_left,
          isOutdated: item.is_outdated,
        },
      })
    },
    onResults(response) {
      this.nbMissions = response.nbHits
    },
  },
})
</script>

<style lang="postcss" scoped>
.full-bleed {
  width: 100dvw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50dvw;
  margin-right: -50dvw;
}

:deep(.slide-wrapper) {
  width: calc(100vw - 2rem) !important;
  max-width: 393px;
  @screen sm {
    width: 100% !important;
    max-width: 288px;
  }
  @screen md {
    max-width: 336px;
  }
  @screen lg {
    max-width: 304px;
  }
  @screen xl {
    max-width: 320px;
  }
}
</style>
