<template>
  <div class="bg-white px-6 sm:py-6 shadow-xl rounded-xl grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:!divide-x">
    <div class="py-6 sm:py-0 sm:pb-6 sm:pr-6 lg:pb-0 xl:px-6">
      <div class="text-gray-500 mb-1">
        Localisation
      </div>
      <div class="">
        <LocalisationFilter label="Saisissez votre ville" :ip-lat-lng="$store.state.algoliaSearchOrganisations.results.aroundLatLng" />
      </div>
    </div>
    <div class="py-6 sm:py-0 sm:pb-6 lg:pb-0 lg:px-6 sm:!border-l sm:pl-6 lg:!border-l-0">
      <div class="text-gray-500 mb-1">
        Activités
      </div>
      <FacetFilterToggle facet-name="activity.name" label="Activités" :facets="$store.getters['algoliaSearchOrganisations/facetResults']('activity.name')">
        <template #button="{ firstValueSelected, activeValuesCount }">
          <div class="flex space-x-2 items-center justify-between group">
            <div class="flex space-x-2 items-center">
              <HandIcon class="h-5 w-5 transition-opacity opacity-50 group-hover:opacity-100" />
              <span v-if="!firstValueSelected">Toutes</span>
              <span v-else class="font-bold">
                {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </span>
            </div>
            <ChevronDownIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
          </div>
        </template>
      </FacetFilterToggle>
    </div>
    <div class="py-6 sm:py-0 sm:pt-6 sm:pr-6 lg:pt-0 lg:px-6 sm:!border-t lg:!border-t-0">
      <div class="text-gray-500 mb-1">
        Publics aidés
      </div>
      <FacetFilterToggle facet-name="publics_beneficiaires" label="Publics aidés" :facets="$store.getters['algoliaSearchOrganisations/facetResults']('publics_beneficiaires')">
        <template #button="{ firstValueSelected, activeValuesCount }">
          <div class="flex space-x-2 items-center justify-between group">
            <div class="flex space-x-2 items-center">
              <HandIcon class="h-5 w-5 transition-opacity opacity-50 group-hover:opacity-100" />
              <span v-if="!firstValueSelected">Toutes</span>
              <span v-else class="font-bold">
                {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </span>
            </div>
            <ChevronDownIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
          </div>
        </template>
      </FacetFilterToggle>
    </div>
    <div class="py-6 sm:py-0 sm:pt-6 lg:pt-0 lg:px-6 sm:!border-l sm:!border-t lg:!border-t-0 sm:pl-6 lg:!border-l-0">
      <div class="text-gray-500 mb-1">
        Recherche
      </div>
      <SearchFilter />
    </div>
  </div>
</template>

<script>
import FacetFilterToggle from '~/components/section/search/FacetFilterToggle.vue'
import LocalisationFilter from '~/components/search/LocalisationFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import SearchFilter from '@/components/search/SearchFilter.vue'

export default {
  components: {
    FacetFilterToggle,
    LocalisationFilter,
    SearchFilter
  },
  mixins: [AlgoliaQueryBuilder]
}
</script>
