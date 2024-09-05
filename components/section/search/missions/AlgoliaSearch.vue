<template>
  <div v-if="$stores.algoliaSearch.indexKey === 'missionsIndex'">
    <div v-if="$stores.algoliaSearch.results" class="container md:px-8 mb-12">
      <div class="flex flex-col space-y-8 sm:space-y-12">
        <BaseSectionHeading
          v-if="!noHeader"
          title="Trouver une mission de bénévolat"
          :secondary-title-bottom="`${$numeral(
            $stores.algoliaSearch.results.nbHits
          )} ${$filters.pluralize(
            $stores.algoliaSearch.results.nbHits,
            'mission disponible',
            'missions disponibles',
            false
          )}`"
        />

        <template v-if="!noFilters">
          <MobileFilters />
          <PrimaryFilters />
          <SecondaryFilters :filters-name="secondaryFilters" />
        </template>

        <div v-if="$stores.algoliaSearch.results.nbHits == 0" class="text-center">
          Il n'y a aucun résultat avec les filtres actuels.<br />
          <DsfrLink class="text-jva-blue-500" @click.native="deleteAllFilters()">
            Réinitialiser les filtres
          </DsfrLink>
        </div>

        <template
          v-if="
            withSlideshowRemote &&
            $route.query.type !== 'Mission à distance' &&
            $stores.algoliaSearch.searchParameters.page === 0
          "
        >
          <GridResults :hits="$stores.algoliaSearch.results.hits.slice(0, 6)" />
          <BlocSlideshowRemote />
          <GridResults
            :hits="
              $stores.algoliaSearch.results.hits.slice(6, $stores.algoliaSearch.results.hits.length)
            "
          />
        </template>
        <GridResults v-else :hits="$stores.algoliaSearch.results.hits" />

        <BlocSlideshowRemote
          v-if="
            withSlideshowRemote &&
            $route.query.type !== 'Mission à distance' &&
            $stores.algoliaSearch.results?.nbPages === Number($route.query?.page)
          "
        />

        <DsfrPagination
          v-if="!noPagination"
          :current-page="$stores.algoliaSearch.results.page + 1"
          :total-rows="
            $stores.algoliaSearch.results.nbHits > 1000
              ? 1000
              : $stores.algoliaSearch.results.nbHits
          "
          :per-page="18"
          :max-pages="10"
          :with-first-page="false"
          :with-last-page="false"
          :anchor-content-id="paginationAnchorContentId"
          @page-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryFilters from '@/components/section/search/missions/PrimaryFilters.vue'
import SecondaryFilters from '@/components/section/search/missions/SecondaryFilters.vue'
import MobileFilters from '@/components/section/search/missions/MobileFilters.vue'
import GridResults from '@/components/section/search/missions/GridResults.vue'
import BlocSlideshowRemote from '@/components/section/search/missions/BlocSlideshowRemote.vue'

export default defineNuxtComponent({
  components: {
    PrimaryFilters,
    SecondaryFilters,
    MobileFilters,
    GridResults,
    BlocSlideshowRemote,
  },
  props: {
    initialFilters: {
      type: String,
      default: '',
    },
    secondaryFilters: {
      type: Array,
      default: () => {
        return ['department_name']
      },
    },
    initialHitsPerPage: {
      type: Number,
      default: null,
    },
    initialAroundLatLng: {
      type: String,
      default: null,
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    noFilters: {
      type: Boolean,
      default: false,
    },
    noPagination: {
      type: Boolean,
      default: false,
    },
    withSlideshowRemote: {
      type: Boolean,
      default: false,
    },
    paginationAnchorContentId: {
      type: String,
      default: 'contenuprincipal',
    },
  },
  watch: {
    async $route(newVal, oldVal) {
      if (newVal.name !== oldVal.name) {
        return
      }
      this.$stores.algoliaSearch.filters = this.recomputeFilters(newVal.query)
      await this.search()
      this.handleNavigatorGeolocation()
    },
  },
  async setup(props) {
    const { $stores } = useNuxtApp()
    const { recomputeFilters } = useAlgoliaMissionsQueryBuilder()
    const runtimeConfig = useRuntimeConfig()
    const route = useRoute()

    $stores.algoliaSearch.reset()
    $stores.algoliaSearch.indexKey = 'missionsIndex'
    $stores.algoliaSearch.indexName = runtimeConfig.public.algolia.missionsIndex
    $stores.algoliaSearch.availableFacets = [
      'type',
      'activities.name',
      'structure.name',
      'tags',
      'department_name',
      'domaines',
      'structure.reseaux.name',
      'publics_beneficiaires',
      'template_subtitle',
      'publics_volontaires',
      'publisher_name',
      'commitment',
      'date_type',
    ]
    $stores.algoliaSearch.availableNumericFilters = ['is_autonomy']
    $stores.algoliaSearch.initialFilters = props.initialFilters
    $stores.algoliaSearch.filters = recomputeFilters()

    if (props.initialHitsPerPage) {
      $stores.algoliaSearch.hitsPerPage = props.initialHitsPerPage
    }
    if (props.initialAroundLatLng) {
      $stores.algoliaSearch.aroundLatLng = props.initialAroundLatLng
    }

    const { search, deleteAllFilters, onNavigatorGeolocation, onNavigatorGeolocationError } =
      useAlgoliaMissionsQueryBuilder()

    await search()

    return {
      search,
      deleteAllFilters,
      onNavigatorGeolocation,
      onNavigatorGeolocationError,
      recomputeFilters,
    }
  },
  mounted() {
    this.handleNavigatorGeolocation()
  },
  methods: {
    handleChangePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page },
      })
    },
    handleNavigatorGeolocation() {
      if (this.$route.query.type === 'Mission à distance') {
        return
      }

      if (
        navigator.geolocation &&
        !this.$stores.algoliaSearch.navigatorGeolocation &&
        !this.$stores.algoliaSearch.aroundLatLng &&
        !this.$stores.algoliaSearch.searchParameters?.aroundLatLng
      ) {
        if (!this.$route.query.aroundLatLng) {
          this.$stores.algoliaSearch.loadingNavigatorGeolocation = true
        }
        navigator.geolocation.getCurrentPosition(
          this.onNavigatorGeolocation,
          this.onNavigatorGeolocationError
        )
      }
    },
  },
})
</script>
