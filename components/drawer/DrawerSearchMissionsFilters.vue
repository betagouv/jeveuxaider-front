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
    <div v-if="isPresentiel" class="space-y-2">
      <div class="relative font-medium text-[15px]">
        En autonomie
      </div>
      <AutonomyMobileFilter />
    </div>
    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">
        Mineurs
      </div>
      <MinorsMobileFilter />
    </div>
    <FacetFilter
      show-more
      facet-name="activity.name"
      label="Activités"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('activity.name')"
      legend="Filtrer par type d'activité"
    />
    <FacetFilter
      show-more
      facet-name="structure.name"
      label="Organisations"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('structure.name')"
      legend="Filtrer par organisation"
    />
    <FacetFilter
      show-more
      facet-name="tags"
      label="Opérations nationales"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('tags')"
      legend="Filtrer par opération nationale"
    />
    <FacetFilter
      show-more
      facet-name="publics_beneficiaires"
      label="Publics aidés"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('publics_beneficiaires')"
      legend="Filtrer par public aidé"
    />
    <FacetFilter
      show-more
      facet-name="domaines"
      label="Domaines"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('domaines')"
      legend="Filtrer par domaine d'action"
    />
    <FacetFilter
      show-more
      facet-name="structure.reseaux.name"
      label="Réseaux"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('structure.reseaux.name')"
      legend="Filtrer par réseau"
    />
    <FacetFilter
      show-more
      facet-name="department_name"
      label="Départements"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('department_name')"
      legend="Filtrer par département"
    />
    <FacetFilter
      show-more
      facet-name="template_subtitle"
      label="Types de mission"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('template_subtitle')"
      legend="Filtrer par type de mission"
    />
    <FacetFilter
      show-more
      facet-name="publisher_name"
      label="Plateformes"
      :show-more-limit="3"
      :facets="$store.getters['algoliaSearch/facetResults']('publisher_name')"
      legend="Filtrer par plateforme"
    />

    <template #footer>
      <div
        :class="[
          'p-4 flex items-center space-x-3',
          nbMobileSecondaryFilters > 0 ? 'justify-between' : 'justify-end'
        ]"
      >
        <Link
          v-if="nbMobileSecondaryFilters > 0"
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
import AutonomyMobileFilter from '~/components/section/search/AutonomyMobileFilter.vue'
import MinorsMobileFilter from '~/components/section/search/MinorsMobileFilter.vue'
import Link from '@/components/dsfr/Link.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    FacetFilter,
    SearchFilter,
    CommitmentMobileFilter,
    AutonomyMobileFilter,
    MinorsMobileFilter,
    Link,
    Button
  },
  mixins: [AlgoliaMissionsQueryBuilder],
  props: {
    isOpen: { type: Boolean, default: false }
  },
  computed: {
    isPresentiel () { return !this.$route.query.type || this.$route.query.type == 'Mission en présentiel' }
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
