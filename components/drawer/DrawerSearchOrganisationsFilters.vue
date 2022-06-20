<template>
  <DrawerLeft :is-open="isOpen" @close="$emit('close')">
    <template #title>
      <div class="font-bold">
        Filtres de recherche
      </div>
    </template>
    <FacetFilter
      show-more
      facet-name="publics_beneficiaires"
      label="Publics aidés"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('publics_beneficiaires')"
    />
    <FacetFilter
      show-more
      facet-name="domaines.name"
      label="Domaines"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('domaines.name')"
    />
    <FacetFilter
      show-more
      facet-name="statut_juridique"
      label="Statuts juridiques"
      :show-more-limit="5"
      :facets="$store.getters['algoliaSearch/facetResults']('statut_juridique')"
    />
    <FacetFilter
      show-more
      facet-name="reseaux.name"
      label="Réseaux"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('reseaux.name')"
    />
    <FacetFilter
      show-more
      facet-name="department_name"
      label="Départements"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('department_name')"
    />

    <template #footer>
      <div
        :class="[
          'p-4 flex items-center space-x-3',
          activeMoreFacets.length ? 'justify-between' : 'justify-end'
        ]"
      >
        <Link
          v-if="activeMoreFacets.length"
          class="text-gray-500 underline text-sm"
          @click.native="deleteFilters()"
        >
          Réinitialiser
        </Link>
        <Button @click.native="$emit('close')">
          <template v-if="$store.state.algoliaSearch.results.nbHits == 0">
            Aucun résultat
          </template>
          <template v-else-if="$store.state.algoliaSearch.results.nbHits == 1">
            Voir les résultats
          </template>
          <template v-else>
            Voir les {{ $store.state.algoliaSearch.results.nbHits }} résultats
          </template>
        </Button>
      </div>
    </template>
  </DrawerLeft>
</template>

<script>
import AlgoliaOrganisationsQueryBuilder from '@/mixins/algolia-organisations-query-builder'
import FacetFilter from '~/components/section/search/FacetFilter.vue'

export default {
  components: {
    FacetFilter
  },
  mixins: [AlgoliaOrganisationsQueryBuilder],
  props: {
    isOpen: { type: Boolean, default: false }
  },
  methods: {
    deleteFilters () {
      const filteredQueries = (({ city, aroundLatLng, search }) => ({ city, aroundLatLng, search }))(this.$route.query)

      this.$router.push({
        path: this.$route.path,
        query: filteredQueries
      })
    }
  }
}
</script>
