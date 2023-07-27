<template>
  <div v-show="nbMissions > 0" class="full-bleed">
    <div class="bg-white py-8 lg:py-12 w-full xl:max-w-[1280px] mx-auto overflow-hidden">
      <!-- Fixed heights to avoid layout shift -->
      <div class="container md:px-8 xl:px-0 xl:max-w-5xl min-h-[581px] lg:min-h-[605px]">
        <div :key="slideshowKey">
          <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8 mb-8 md:mb-12">
            <Heading as="h2" size="xl">
              {{ nbMissions|pluralize('mission disponible', 'missions disponibles') }} à distance
            </Heading>
            <div v-if="nbMissions > 3" class="hidden lg:block flex-none">
              <div class="flex space-x-2">
                <SlideshowArrows
                  button-class="hover:bg-[#EFECE8]"
                  ref-name="slideshowRemote"
                  :refs="$refs"
                  @previous="handleSlideshowPreviousClick"
                  @next="handleSlideshowNextClick"
                />
                <Button
                  class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]"
                  type="transparent"
                  @click="onViewMoreClick()"
                >
                  Plus de missions
                </Button>
              </div>
            </div>
          </div>

          <AlgoliaSlideshowMissions
            ref="slideshowRemote"
            aria-labelledby="label-slideshow-missions-distance"
            :search-parameters="{
              ...$store.state.algoliaSearch.searchParameters,
              numericFilters: $store.state.algoliaSearch.searchParameters.numericFilters.filter(f => f !== 'is_autonomy=1'),
              aroundLatLngViaIP: false,
              aroundLatLng: '',
              aroundRadius: 'all',
              hitsPerPage: 6,
              page: 0,
              facetFilters: [
                ...activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != 'type'),
                'type:Mission à distance'
              ]
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
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'

export default {
  components: {
    AlgoliaSlideshowMissions,
    Heading,
    Button
  },
  mixins: [AlgoliaMissionsQueryBuilder],
  data () {
    return {
      slideshowKey: 0,
      nbMissions: 0
    }
  },
  watch: {
    '$route' () {
      this.slideshowKey++
    }
  },
  methods: {
    onViewMoreClick () {
      this.$plausible.trackEvent('Recherche mission - Bloc à distance - CTA plus de missions', {
        props: { isLogged: this.$store.getters.isLogged }
      })
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, type: 'Mission à distance', page: 1 }
      })
    },
    onSlideClick (item) {
      this.$plausible.trackEvent('Recherche mission - Bloc à distance - Click Card Mission', {
        props: {
          isLogged: this.$store.getters.isLogged,
          isFromApi: item.provider === 'api_engagement',
          isRegistrationOpen: item.is_registration_open,
          hasPlacesLeft: item.has_places_left,
          isOutdated: item.is_outdated
        }
      })
    },
    onResults (response) {
      this.nbMissions = response.nbHits
    },
    handleSlideshowPreviousClick () {
      this.$refs.slideshowRemote.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowRemote.next()
    }
  }
}
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

:deep(.slick-list) {
  @screen lg {
    overflow: hidden !important;
    @apply -m-1 p-1; /* to handle outline on focus */
  }
}

:deep(.slick-track) {
  @screen sm {
    gap: 1rem !important;
  }
  @screen md {
    gap: 2rem !important;
  }
  @screen lg {
    gap: 1.5rem !important;
  }
  @screen xl {
    gap: 2rem !important;
  }
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
