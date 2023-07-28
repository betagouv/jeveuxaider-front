<template>
  <div>
    <div v-if="$store.state.algoliaSearch.results" class="container md:px-8 mb-12">
      <div class="flex flex-col space-y-8 sm:space-y-12">
        <SectionHeading
          title="Trouver une organisation près de chez vous"
          :secondary-title-bottom="`${$options.filters.formatNumber($store.state.algoliaSearch.results.nbHits)} ${$options.filters.pluralize(
            $store.state.algoliaSearch.results.nbHits,
            'organisation est inscrite sur JeVeuxAider.gouv.fr',
            'organisations sont inscrites sur JeVeuxAider.gouv.fr',
            false
          )}`"
        />

        <MobileFilters />
        <PrimaryFilters />
        <SecondaryFilters :filters-name="secondaryFilters" />

        <div v-if="$store.state.algoliaSearch.results.nbHits == 0" class="text-center">
          Il n'y a aucun résultat avec les filtres actuels.<br>
          <Link
            class="text-jva-blue-500"
            @click.native="deleteAllFilters()"
          >
            Réinitialiser les filtres
          </Link>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-6 xl:gap-8 xl:max-w-5xl mx-auto">
          <nuxt-link
            v-for="item in $store.state.algoliaSearch.results.hits"
            :key="item.id"
            class="flex min-w-0 transition"
            :to="
              item.statut_juridique === 'Association'
                ? `/organisations/${item.slug}`
                : `/missions-benevolat?structure.name=${item.name}`
            "
            @click.native="handleClickCard(item)"
          >
            <CardOrganisation
              :organisation="item"
              footer-key="missions_available_count"
            />
          </nuxt-link>
        </div>

        <Pagination
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

import CardOrganisation from '@/components/card/CardOrganisation.vue'
import AlgoliaOrganisationsQueryBuilder from '@/mixins/algolia-organisations-query-builder'
import PrimaryFilters from '~/components/section/search/organisations/PrimaryFilters.vue'
import SecondaryFilters from '~/components/section/search/organisations/SecondaryFilters.vue'
import MobileFilters from '~/components/section/search/organisations/MobileFilters.vue'
import Link from '@/components/dsfr/Link.vue'
import Pagination from '@/components/dsfr/Pagination.vue'

export default {
  components: {
    CardOrganisation,
    PrimaryFilters,
    SecondaryFilters,
    MobileFilters,
    Link,
    Pagination
  },
  mixins: [AlgoliaOrganisationsQueryBuilder],
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
    }
  },
  async fetch () {
    await this.search()
  },
  watch: {
    $route () {
      this.$fetch()
      this.handleNavigatorGeolocation()
    }
  },
  created () {
    this.$store.commit('algoliaSearch/setIndexKey', 'organisationsIndex')
    this.$store.commit('algoliaSearch/setIndexName', this.$config.algolia.organisationsIndex)
    this.$store.commit('algoliaSearch/setAvailableFacets', ['department_name', 'domaines.name', 'reseaux.name', 'publics_beneficiaires', 'activities.name', 'statut_juridique'])
    this.$store.commit('algoliaSearch/setInitialFilters', this.initialFilters)
    this.$store.commit('algoliaSearch/setSearchParameters', this.searchParameters)
  },
  mounted () {
    this.handleNavigatorGeolocation()
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
    },
    handleClickCard (organisation) {
      this.$plausible.trackEvent('Click Card Organisations - Liste résultat', {
        props: { isLogged: this.$store.getters.isLogged }
      })
    },
    handleNavigatorGeolocation () {
      if (navigator.geolocation && !this.$store.state.algoliaSearch.navigatorGeolocation && !this.$store.state.algoliaSearch.aroundLatLng && !this.$store.state.algoliaSearch.searchParameters?.aroundLatLng) {
        if (!this.$route.query.aroundLatLng) {
          this.$store.commit('algoliaSearch/setLoadingNavigatorGeolocation', true)
        }
        navigator.geolocation.getCurrentPosition(this.onNavigatorGeolocation, this.onNavigatorGeolocationError)
      }
    }
  }
}
</script>
