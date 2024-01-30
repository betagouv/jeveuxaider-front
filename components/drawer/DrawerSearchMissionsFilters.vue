<template>
  <BaseDrawerLeft :is-open="isOpen" @close="$emit('close')">
    <template #title>
      <div class="font-bold">Filtres de recherche</div>
    </template>

    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">Dates</div>
      <DatesMobileFilter />
    </div>

    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">Disponibilités</div>
      <CommitmentMobileFilter />
    </div>

    <FacetFilter
      show-more
      facet-name="activities.name"
      label="Activités"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('activities.name')"
      legend="Filtrer par type d'activité"
    />

    <div v-if="isPresentiel" class="space-y-2">
      <div class="relative font-medium text-[15px]">En autonomie</div>
      <AutonomyMobileFilter />
    </div>

    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">Missions courtes</div>
      <PonctualMobileFilter />
    </div>

    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">Mineurs</div>
      <MinorsMobileFilter />
    </div>

    <FacetFilter
      show-more
      facet-name="structure.name"
      label="Organisations"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('structure.name')"
      legend="Filtrer par organisation"
    />

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
      facet-name="tags"
      label="Opérations nationales"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('tags')"
      legend="Filtrer par opération nationale"
    />

    <FacetFilter
      show-more
      facet-name="domaines"
      label="Domaines"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('domaines')"
      legend="Filtrer par domaine d'action"
    />

    <FacetFilter
      show-more
      facet-name="structure.reseaux.name"
      label="Réseaux"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('structure.reseaux.name')"
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

    <FacetFilter
      show-more
      facet-name="template_subtitle"
      label="Types de mission"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('template_subtitle')"
      legend="Filtrer par type de mission"
    />

    <FacetFilter
      show-more
      facet-name="publisher_name"
      label="Plateformes"
      :show-more-limit="3"
      :facets="$stores.algoliaSearch.facetResults('publisher_name')"
      legend="Filtrer par plateforme"
    />

    <div class="space-y-2">
      <div class="relative font-medium text-[15px]">Mots-clés</div>
      <SearchFilter />
    </div>

    <template #footer>
      <div
        :class="[
          'p-4 flex items-center space-x-3',
          getNbMobileSecondaryFilters() > 0 ? 'justify-between' : 'justify-end',
        ]"
      >
        <DsfrLink
          v-if="getNbMobileSecondaryFilters() > 0"
          @click.native="deleteAllFiltersExceptLocalisation()"
        >
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
import FacetFilter from '@/components/section/search/FacetFilter.vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
import CommitmentMobileFilter from '@/components/section/search/CommitmentMobileFilter.vue'
import AutonomyMobileFilter from '@/components/section/search/AutonomyMobileFilter.vue'
import MinorsMobileFilter from '@/components/section/search/MinorsMobileFilter.vue'
import PonctualMobileFilter from '@/components/section/search/PonctualMobileFilter.vue'
import DatesMobileFilter from '@/components/section/search/DatesMobileFilter.vue'

export default defineNuxtComponent({
  components: {
    FacetFilter,
    SearchFilter,
    CommitmentMobileFilter,
    AutonomyMobileFilter,
    MinorsMobileFilter,
    PonctualMobileFilter,
    DatesMobileFilter,
  },
  setup() {
    const { getNbMobileSecondaryFilters } = useAlgoliaMissionsQueryBuilder()
    return {
      getNbMobileSecondaryFilters,
    }
  },
  props: {
    isOpen: { type: Boolean, default: false },
  },
  computed: {
    isPresentiel() {
      return !this.$route.query.type || this.$route.query.type == 'Mission en présentiel'
    },
  },
  methods: {
    deleteAllFiltersExceptLocalisation() {
      const filteredQueries = (({ city, type, aroundLatLng }) => ({
        city,
        type,
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
