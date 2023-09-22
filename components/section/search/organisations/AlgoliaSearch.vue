<template>
  <div v-if="$stores.algoliaSearch.indexKey === 'organisationsIndex'">
    <div v-if="$stores.algoliaSearch.results" class="container md:px-8 mb-12">
      <div class="flex flex-col space-y-8 sm:space-y-12">
        <BaseSectionHeading
          title="Trouver une organisation près de chez vous"
          :secondary-title-bottom="`${$numeral(
            $stores.algoliaSearch.results.nbHits
          )} ${$filters.pluralize(
            $stores.algoliaSearch.results.nbHits,
            'organisation est inscrite sur JeVeuxAider.gouv.fr',
            'organisations sont inscrites sur JeVeuxAider.gouv.fr',
            false
          )}`"
        />

        <MobileFilters />
        <PrimaryFilters />
        <SecondaryFilters :filters-name="secondaryFilters" />

        <div v-if="$stores.algoliaSearch.results.nbHits == 0" class="text-center">
          Il n'y a aucun résultat avec les filtres actuels.<br />
          <DsfrLink class="text-jva-blue-500" @click.native="deleteAllFilters()">
            Réinitialiser les filtres
          </DsfrLink>
        </div>

        <div
          class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-6 xl:gap-8 xl:max-w-5xl mx-auto"
        >
          <NuxtLink
            v-for="item in $stores.algoliaSearch.results.hits"
            :key="item.id"
            class="flex min-w-0 transition"
            :to="
              item.statut_juridique === 'Association'
                ? `/organisations/${item.slug}`
                : `/missions-benevolat?structure.name=${item.name}`
            "
            @click.native="handleClickCard(item)"
          >
            <CardOrganisation :organisation="item" footer-key="missions_available_count" />
          </NuxtLink>
        </div>

        <DsfrPagination
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
          @page-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardOrganisation from '@/components/card/CardOrganisation.vue'
import PrimaryFilters from '@/components/section/search/organisations/PrimaryFilters.vue'
import SecondaryFilters from '@/components/section/search/organisations/SecondaryFilters.vue'
import MobileFilters from '@/components/section/search/organisations/MobileFilters.vue'

export default defineNuxtComponent({
  components: {
    CardOrganisation,
    PrimaryFilters,
    SecondaryFilters,
    MobileFilters,
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
  },
  watch: {
    async $route(newVal, oldVal) {
      if (newVal.name !== oldVal.name) {
        return
      }
      await this.search()
      this.handleNavigatorGeolocation()
    },
  },
  async setup(props) {
    const { $stores } = useNuxtApp()
    const runtimeConfig = useRuntimeConfig()

    $stores.algoliaSearch.reset()
    $stores.algoliaSearch.indexKey = 'organisationsIndex'
    $stores.algoliaSearch.indexName = runtimeConfig.public.algolia.organisationsIndex
    $stores.algoliaSearch.availableFacets = [
      'department_name',
      'domaines.name',
      'reseaux.name',
      'publics_beneficiaires',
      'activities.name',
      'statut_juridique',
    ]
    $stores.algoliaSearch.initialFilters = props.initialFilters
    $stores.algoliaSearch.searchParameters = props.searchParameters

    const { search, deleteAllFilters, onNavigatorGeolocation, onNavigatorGeolocationError } =
      useAlgoliaOrganisationsQueryBuilder()

    await search()

    return {
      search,
      deleteAllFilters,
      onNavigatorGeolocation,
      onNavigatorGeolocationError,
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
    handleClickCard(organisation) {
      this.$plausible.trackEvent('Click Card Organisations - Liste résultat', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
    },
    handleNavigatorGeolocation() {
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
