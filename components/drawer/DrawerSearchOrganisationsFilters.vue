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
      :limit-options="3"
      :facets="$store.getters['algoliaSearchOrganisations/facetResults']('publics_beneficiaires')"
    />
    <FacetFilter
      show-more
      facet-name="domaines"
      label="Domaines"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchOrganisations/facetResults']('domaines')"
    />
    <FacetFilter
      show-more
      facet-name="reseaux.name"
      label="Réseaux"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchOrganisations/facetResults']('structure.reseaux.name')"
    />
    <FacetFilter
      show-more
      facet-name="department_name"
      label="Départements"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchOrganisations/facetResults']('department_name')"
    />

    <template #footer>
      <div
        :class="[
          'p-4 flex items-center space-x-3',
          hasActiveFilters ? 'justify-between' : 'justify-end'
        ]"
      >
        <Link
          v-if="hasActiveFilters"
          class="text-gray-500 underline text-sm"
          @click.native="deleteAllFiltersExceptLocalisation()"
        >
          Réinitialiser
        </Link>
        <Button @click.native="$emit('close')">
          <template v-if="$store.state.algoliaSearchOrganisations.results.nbHits == 0">
            Aucun résultat
          </template>
          <template v-else-if="$store.state.algoliaSearchOrganisations.results.nbHits == 1">
            Voir les résultats
          </template>
          <template v-else>
            Voir les {{ $store.state.algoliaSearchOrganisations.results.nbHits }} résultats
          </template>
        </Button>
      </div>
    </template>
  </DrawerLeft>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import FacetFilter from '~/components/section/search/FacetFilter.vue'

export default {
  components: {
    FacetFilter
  },
  mixins: [AlgoliaQueryBuilder],
  props: {
    isOpen: { type: Boolean, default: false }
  },
  methods: {
    deleteAllFiltersExceptLocalisation () {
      const filteredQueries = (({ city, aroundLatLng }) => ({ city, aroundLatLng }))(this.$route.query)

      this.$router.push({
        path: this.$route.path,
        query: filteredQueries
      })
    }
  }
}
</script>
