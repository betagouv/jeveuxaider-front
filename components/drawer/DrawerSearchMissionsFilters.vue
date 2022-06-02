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
      facet-name="publics_beneficiaires"
      label="Publics aidés"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchMissions/facetResults']('publics_beneficiaires')"
    />
    <FacetFilter
      show-more
      facet-name="activity.name"
      label="Activités"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchMissions/facetResults']('activity.name')"
    />
    <FacetFilter
      show-more
      facet-name="structure.name"
      label="Organisations"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchMissions/facetResults']('structure.name')"
    />
    <FacetFilter
      show-more
      facet-name="domaines"
      label="Domaines"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchMissions/facetResults']('domaines')"
    />
    <FacetFilter
      show-more
      facet-name="structure.reseaux.name"
      label="Réseaux"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchMissions/facetResults']('structure.reseaux.name')"
    />
    <FacetFilter
      show-more
      facet-name="department_name"
      label="Départements"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchMissions/facetResults']('department_name')"
    />
    <FacetFilter
      show-more
      facet-name="template_subtitle"
      label="Types de mission"
      :limit-options="3"
      :facets="$store.getters['algoliaSearchMissions/facetResults']('template_subtitle')"
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
          <template v-if="$store.state.algoliaSearchMissions.results.nbHits == 0">
            Aucun résultat
          </template>
          <template v-else-if="$store.state.algoliaSearchMissions.results.nbHits == 1">
            Voir les résultats
          </template>
          <template v-else>
            Voir les {{ $store.state.algoliaSearchMissions.results.nbHits }} résultats
          </template>
        </Button>
      </div>
    </template>
  </DrawerLeft>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import FacetFilter from '~/components/section/search/FacetFilter.vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
import CommitmentMobileFilter from '~/components/section/search/CommitmentMobileFilter.vue'

export default {
  components: {
    FacetFilter,
    SearchFilter,
    CommitmentMobileFilter
  },
  mixins: [AlgoliaQueryBuilder],
  props: {
    isOpen: { type: Boolean, default: false }
  },
  methods: {
    deleteAllFiltersExceptLocalisation () {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          search: undefined,
          template_subtitle: undefined,
          department_name: undefined,
          'activity.name': undefined,
          'structure.name': undefined,
          'structure.reseaux.name': undefined,
          publics_beneficiaires: undefined,
          domaines: undefined,
          commitment__total: undefined,
          duration: undefined,
          time_period: undefined,
          page: undefined
        }
      })
    }
  }
}
</script>
