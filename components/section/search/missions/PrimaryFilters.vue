<template>
  <div class="bg-white px-6 sm:py-6 shadow-xl grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:!divide-x">
    <div class="py-6 sm:py-0 sm:pb-6 sm:pr-6 lg:pb-0 xl:px-6">
      <div class="text-[#7B7B7B] mb-1">
        Localisation
      </div>
      <div class="">
        <LocalisationFilter v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'" label="Localisation" />
        <div v-else>
          <div class="flex space-x-2 items-center">
            <RiComputerFill class="h-4 w-4 flex-none transition-opacity opacity-25 group-hover:opacity-100" />
            <span class="font-bold">Depuis chez moi</span>
          </div>
        </div>
      </div>
    </div>
    <div class="py-6 sm:py-0 sm:pb-6 lg:pb-0 lg:px-6 sm:!border-l sm:pl-6 lg:!border-l-0">
      <div class="text-[#7B7B7B] mb-1">
        Activités
      </div>
      <FacetFilterToggle
        facet-name="activities.name"
        label="Activités"
        :facets="$store.getters['algoliaSearch/facetResults']('activities.name')"
        legend="Filtrer par type d'activité"
      >
        <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
          <button :aria-expanded="isOpen || 'false'" class="w-full flex space-x-2 items-center justify-between group">
            <div class="flex space-x-2 items-center truncate">
              <RiBookmark3Fill class="h-4 w-4 transition-opacity opacity-25 group-hover:opacity-100 flex-none" />
              <span v-if="!firstValueSelected" class="italic pr-[1px] text-[#888888]">Toutes</span>
              <span v-else class="font-bold truncate">
                {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </span>
            </div>
            <ChevronDownIcon class="text-[#7B7B7B] h-4 w-4 group-hover:text-gray-900" />
          </button>
        </template>
      </FacetFilterToggle>
    </div>
    <div class="py-6 sm:py-0 sm:pt-6 sm:pr-6 lg:pt-0 lg:px-6 sm:!border-t lg:!border-t-0">
      <div class="text-[#7B7B7B] mb-1">
        Disponibilités
      </div>
      <CommitmentFilter>
        <template #button="{ activeValue }">
          <div class="flex space-x-2 items-center justify-between group w-full">
            <div class="flex space-x-2 items-center truncate">
              <RiTimeFill class="h-4 w-4 transition-opacity opacity-25 group-hover:opacity-100 flex-none" />
              <div :class="['truncate', {'font-bold': activeValue }, {'italic pr-[1px] text-[#888888]': !activeValue}]">
                {{ activeValue || 'Toutes' }}
              </div>
            </div>
            <ChevronDownIcon class="text-[#7B7B7B] h-4 w-4 group-hover:text-gray-900" />
          </div>
        </template>
      </CommitmentFilter>
    </div>
    <div class="py-6 sm:py-0 sm:pt-6 lg:pt-0 lg:px-6 sm:!border-l sm:!border-t lg:!border-t-0 sm:pl-6 lg:!border-l-0">
      <div class="text-[#7B7B7B] mb-1">
        Recherche
      </div>
      <SearchFilter />
    </div>
  </div>
</template>

<script>
import FacetFilterToggle from '~/components/section/search/FacetFilterToggle.vue'
import LocalisationFilter from '~/components/search/LocalisationFilter.vue'
import CommitmentFilter from '~/components/section/search/CommitmentFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import SearchFilter from '@/components/search/SearchFilter.vue'

export default {
  components: {
    FacetFilterToggle,
    CommitmentFilter,
    LocalisationFilter,
    SearchFilter
  },
  mixins: [AlgoliaQueryBuilder]
}
</script>
