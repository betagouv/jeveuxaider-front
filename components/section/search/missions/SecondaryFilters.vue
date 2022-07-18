<template>
  <div class="lg:flex justify-between items-center mt-8 lg:mb-4">
    <div class="hidden sm:flex flex-wrap items-center justify-start gap-3 lg:ml-6 xl:ml-12">
      <template v-for="filter,i in filtersName">
        <AutonomyFilter v-if="filter === 'is_autonomy'" :key="i" />

        <FacetFilterToggle v-if="filter === 'structure.name'" :key="i" facet-name="structure.name" label="Organisations">
          <template #button="{ firstValueSelected, activeValuesCount }">
            <BadgeFilter :is-active="!!activeValuesCount">
              <span v-if="!firstValueSelected">Organisations</span>
              <div v-else class="text-jva-blue-500 flex">
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </BadgeFilter>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle v-if="filter === 'publics_beneficiaires'" :key="i" facet-name="publics_beneficiaires" label="Publics aidés">
          <template #button="{ firstValueSelected, activeValuesCount }">
            <BadgeFilter :is-active="!!activeValuesCount">
              <span v-if="!firstValueSelected">Publics aidés</span>
              <div v-else class="text-jva-blue-500 flex">
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </BadgeFilter>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle v-if="filter === 'domaines'" :key="i" facet-name="domaines" label="Domaines">
          <template #button="{ firstValueSelected, activeValuesCount }">
            <BadgeFilter :is-active="!!activeValuesCount">
              <span v-if="!firstValueSelected">Domaines</span>
              <div v-else class="text-jva-blue-500 flex">
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </BadgeFilter>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle v-if="filter === 'structure.reseaux.name'" :key="i" facet-name="structure.reseaux.name" label="Réseaux" options-class="right-0 md:left-0">
          <template #button="{ firstValueSelected, activeValuesCount }">
            <BadgeFilter :is-active="!!activeValuesCount">
              <span v-if="!firstValueSelected">Réseaux</span>
              <div v-else class="text-jva-blue-500 flex">
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </BadgeFilter>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle
          v-if="$route.query.type != 'Mission à distance' && filter === 'department_name'"
          :key="i"
          facet-name="department_name"
          label="Départements"
          options-class="right-0 lg:left-0"
        >
          <template #button="{ firstValueSelected, activeValuesCount }">
            <BadgeFilter :is-active="!!activeValuesCount">
              <span v-if="!firstValueSelected">Départements</span>
              <div v-else class="text-jva-blue-500 flex">
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </BadgeFilter>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle v-if="filter === 'template_subtitle'" :key="i" facet-name="template_subtitle" label="Types de mission" options-class="right-0 md:left-0">
          <template #button="{ firstValueSelected, activeValuesCount }">
            <BadgeFilter :is-active="!!activeValuesCount">
              <span v-if="!firstValueSelected">Types de mission</span>
              <div v-else class="text-jva-blue-500 flex">
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </BadgeFilter>
          </template>
        </FacetFilterToggle>
      </template>
    </div>

    <div class="hidden sm:flex lg:items-center lg:justify-center mt-4 lg:mt-0 lg:mr-6 xl:mr-12">
      <Link
        class="uppercase hover:underline text-sm"
        :link-class="[{'pointer-events-none opacity-0': !hasActiveFilters}]"
        @click.native="deleteAllFilters()"
      >
        Réinitialiser
      </Link>
    </div>
  </div>
</template>

<script>
import FacetFilterToggle from '~/components/section/search/FacetFilterToggle.vue'
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import AutonomyFilter from '~/components/section/search/AutonomyFilter.vue'

export default {
  components: {
    FacetFilterToggle,
    BadgeFilter,
    AutonomyFilter
  },
  mixins: [AlgoliaQueryBuilder],
  props: {
    filtersName: {
      type: Array,
      required: true
    }
  }
}
</script>
