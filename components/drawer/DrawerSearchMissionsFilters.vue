<template>
  <DrawerLeft :is-open="isOpen" @close="$emit('close')">
    <template #title>
      <div class="font-bold">
        Filtres de recherche
      </div>
    </template>
    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">
        Mots-clés
      </div>
      <SearchFilter />
    </div>
    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">
        Disponibilités
      </div>
      <CommitmentMobileFilter />
    </div>
    <FacetFilter
      show-more
      facet-name="activity.name"
      label="Activités"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('activity.name')"
    />
    <FacetFilter
      show-more
      facet-name="structure.name"
      label="Organisations"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('structure.name')"
    />
    <FacetFilter
      show-more
      facet-name="publics_beneficiaires"
      label="Publics aidés"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('publics_beneficiaires')"
    />
    <FacetFilter
      show-more
      facet-name="domaines"
      label="Domaines"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('domaines')"
    />
    <FacetFilter
      show-more
      facet-name="structure.reseaux.name"
      label="Réseaux"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('structure.reseaux.name')"
    />
    <FacetFilter
      show-more
      facet-name="department_name"
      label="Départements"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('department_name')"
    />
    <FacetFilter
      show-more
      facet-name="template_subtitle"
      label="Types de mission"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('template_subtitle')"
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
          @click.native="deleteAllFiltersExceptLocalisation()"
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
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'
import FacetFilter from '~/components/section/search/FacetFilter.vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
import CommitmentMobileFilter from '~/components/section/search/CommitmentMobileFilter.vue'

export default {
  components: {
    FacetFilter,
    SearchFilter,
    CommitmentMobileFilter
  },
  mixins: [AlgoliaMissionsQueryBuilder],
  props: {
    isOpen: { type: Boolean, default: false }
  },
  methods: {
    deleteAllFiltersExceptLocalisation () {
      const filteredQueries = (({ city, type, aroundLatLng }) => ({ city, type, aroundLatLng }))(this.$route.query)

      this.$router.push({
        path: this.$route.path,
        query: filteredQueries
      })
    }
  }
}
</script>
