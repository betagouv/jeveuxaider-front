<template>
  <div>
    <div v-if="$store.state.algoliaSearch.results" class="container md:px-8 mb-12">
      <div class="flex flex-col space-y-8 sm:space-y-12">
        <SectionHeading
          v-if="!noHeader"
          title="Trouver une mission de bénévolat"
          :secondary-title-bottom="`${$options.filters.formatNumber($store.state.algoliaSearch.results.nbHits)} ${$options.filters.pluralize(
            $store.state.algoliaSearch.results.nbHits,
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

        <div v-if="$store.state.algoliaSearch.results.nbHits == 0" class="text-center">
          Il n'y a aucun résultat avec les filtres actuels.<br>
          <Link
            class="text-jva-blue-500"
            @click.native="deleteAllFilters()"
          >
            Réinitialiser les filtres
          </Link>
        </div>

        <template v-if="withSlideshowRemote && $route.query.type !== 'Mission à distance' && $store.state.algoliaSearch.searchParameters.page === 0">
          <GridResults :hits="$store.state.algoliaSearch.results.hits.slice(0, 6)" />
          <BlocSlideshowRemote />
          <GridResults :hits="$store.state.algoliaSearch.results.hits.slice(6, $store.state.algoliaSearch.results.hits.length)" />
        </template>
        <GridResults v-else :hits="$store.state.algoliaSearch.results.hits" />

        <BlocSlideshowRemote
          v-if="withSlideshowRemote && $route.query.type !== 'Mission à distance' && $store.state.algoliaSearch.results?.nbPages === Number($route.query?.page)"
        />

        <Pagination
          v-if="!noPagination"
          :current-page="$store.state.algoliaSearch.results.page + 1"
          :total-rows="$store.state.algoliaSearch.results.nbHits > 1000 ? 1000 : $store.state.algoliaSearch.results.nbHits"
          :per-page="18"
          :max-pages="10"
          :with-first-page="false"
          :with-last-page="false"
          @page-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'
import PrimaryFilters from '~/components/section/search/missions/PrimaryFilters.vue'
import SecondaryFilters from '~/components/section/search/missions/SecondaryFilters.vue'
import MobileFilters from '~/components/section/search/missions/MobileFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Link from '@/components/dsfr/Link.vue'
import GridResults from '@/components/section/search/missions/GridResults.vue'
import BlocSlideshowRemote from '@/components/section/search/missions/BlocSlideshowRemote.vue'

export default {
  components: {
    PrimaryFilters,
    SecondaryFilters,
    MobileFilters,
    Pagination,
    Link,
    GridResults,
    BlocSlideshowRemote
  },
  mixins: [AlgoliaMissionsQueryBuilder],
  props: {
    initialFilters: {
      type: String,
      default: ''
    },
    secondaryFilters: {
      type: Array,
      default: () => {
        return [
          'department_name'
        ]
      }
    },
    initialHitsPerPage: {
      type: Number,
      default: null
    },
    initialAroundLatLng: {
      type: String,
      default: null
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    noFilters: {
      type: Boolean,
      default: false
    },
    noPagination: {
      type: Boolean,
      default: false
    },
    withSlideshowRemote: {
      type: Boolean,
      default: false
    }
  },
  async fetch () {
    await this.search()
  },
  watch: {
    $route: '$fetch'
  },
  created () {
    this.$store.commit('algoliaSearch/setIndexKey', 'missionsIndex')
    this.$store.commit('algoliaSearch/setIndexName', this.$config.algolia.missionsIndex)
    this.$store.commit('algoliaSearch/setAvailableFacets', ['type', 'activities.name', 'structure.name', 'tags', 'department_name', 'domaines', 'structure.reseaux.name', 'publics_beneficiaires', 'template_subtitle', 'publics_volontaires', 'publisher_name', 'date_type'])
    this.$store.commit('algoliaSearch/setAvailableNumericFilters', ['commitment__total', 'is_autonomy'])
    this.$store.commit('algoliaSearch/setInitialFilters', this.initialFilters)
    if (this.initialHitsPerPage) {
      this.$store.commit('algoliaSearch/setHitsPerPage', this.initialHitsPerPage)
    }
    if (this.initialAroundLatLng) {
      this.$store.commit('algoliaSearch/setAroundLatLng', this.initialAroundLatLng)
    }
    this.$store.commit('algoliaSearch/setSearchParameters', this.searchParameters)
  },
  mounted () {
    if (navigator.geolocation && !this.$store.state.algoliaSearch.aroundLatLng && !this.$store.state.algoliaSearch.navigatorGeolocation) {
      if (!this.$route.query.aroundLatLng) {
        this.$store.commit('algoliaSearch/setLoadingNavigatorGeolocation', true)
      }
      navigator.geolocation.getCurrentPosition(this.onNavigatorGeolocation, this.onNavigatorGeolocationError)
    }
  },
  beforeDestroy () {
    this.$store.dispatch('algoliaSearch/reset')
  },
  methods: {
    handleChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page }
      })
    }
  }
}
</script>
