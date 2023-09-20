<template>
  <BaseDrawerLeft :is-open="isOpen" @close="$emit('close')">
    <template #title>
      <div class="font-bold">Filtres de recherche</div>
    </template>
    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">Mots-clés</div>
      <SearchFilter />
    </div>
    <FacetFilter
      show-more
      facet-name="publics_beneficiaires"
      label="Publics aidés"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('publics_beneficiaires')"
      legend="Filtrer par public aidé"
    />
    <FacetFilter
      show-more
      facet-name="domaines.name"
      label="Domaines"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('domaines.name')"
      legend="Filtrer par domaine d'action"
    />
    <FacetFilter
      show-more
      facet-name="statut_juridique"
      label="Types d’organisation"
      :show-more-limit="5"
      :facets="$stores.algoliaSearch.facetResults('statut_juridique')"
      legend="Filtrer par type d'organisation'"
    />
    <FacetFilter
      show-more
      facet-name="reseaux.name"
      label="Réseaux"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('reseaux.name')"
      legend="Filtrer par réseau"
    />
    <FacetFilter
      show-more
      facet-name="department_name"
      label="Départements"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('department_name')"
      legend="Filtrer par département"
    />

    <template #footer>
      <div
        :class="[
          'p-4 flex items-center space-x-3',
          getNbMobileActiveFilters() ? 'justify-between' : 'justify-end',
        ]"
      >
        <DsfrLink v-if="getNbMobileActiveFilters()" @click.native="deleteFilters()">
          Réinitialiser
        </DsfrLink>
        <DsfrButton @click.native="$emit('close')">
          <template v-if="$stores.algoliaSearch.results.nbHits == 0"> Aucun résultat </template>
          <template v-else-if="$stores.algoliaSearch.results.nbHits == 1">
            Voir les résultats
          </template>
          <template v-else>
            Voir les {{ $stores.algoliaSearch.results.nbHits }} résultats
          </template>
        </DsfrButton>
      </div>
    </template>
  </BaseDrawerLeft>
</template>

<script>
import FacetFilter from '~/components/section/search/FacetFilter.vue'
import SearchFilter from '@/components/search/SearchFilter.vue'

export default defineNuxtComponent({
  components: {
    FacetFilter,
    SearchFilter,
  },
  setup() {
    const { getNbMobileActiveFilters } = useAlgoliaOrganisationsQueryBuilder()

    return {
      getNbMobileActiveFilters,
    }
  },
  props: {
    isOpen: { type: Boolean, default: false },
  },
  methods: {
    deleteFilters() {
      const filteredQueries = (({ city, aroundLatLng }) => ({
        city,
        aroundLatLng,
      }))(this.$route.query)

      this.$router.push({
        path: this.$route.path,
        query: filteredQueries,
      })
    },
  },
})
</script>
