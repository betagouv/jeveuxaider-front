<template>
  <div class="hidden sm:block lg:flex justify-between items-baseline !mt-8 lg:!mb-4">
    <div class="flex flex-wrap items-center justify-start gap-3 lg:ml-6 xl:ml-12">
      <template v-for="(filter, i) in filtersName">
        <FacetFilterToggle
          v-if="filter === 'publics_beneficiaires'"
          :key="i"
          facet-name="publics_beneficiaires"
          label="Publics aidés"
          legend="Filtrer par public aidé"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Publics aidés</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle
          v-if="filter === 'domaines.name'"
          :key="i"
          facet-name="domaines.name"
          label="Domaines"
          legend="Filtrer par domaine d'action"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Domaines</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle
          v-if="filter === 'reseaux.name'"
          :key="i"
          facet-name="reseaux.name"
          label="Réseaux"
          options-class="right-0 lg:left-0"
          legend="Filtrer par réseau"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Réseaux</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle
          v-if="filter === 'department_name'"
          :key="i"
          facet-name="department_name"
          label="Départements"
          options-class="right-0 lg:left-0"
          legend="Filtrer par département"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Départements</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle
          v-if="filter === 'statut_juridique'"
          :key="i"
          facet-name="statut_juridique"
          label="Types d’organisation"
          options-class="right-0 lg:left-0"
          legend="Filtrer par type d'organisation'"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Types d’organisation</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>
      </template>
    </div>

    <div class="flex mt-4 lg:mt-0 lg:mr-6 xl:mr-12">
      <DsfrLink
        :class="['text-jva-blue-500', { 'pointer-events-none opacity-0': !hasActiveFilters }]"
        @click.native="deleteAllFilters()"
      >
        Réinitialiser
      </DsfrLink>
    </div>
  </div>
</template>

<script>
import FacetFilterToggle from '~/components/section/search/FacetFilterToggle.vue'

export default defineNuxtComponent({
  components: {
    FacetFilterToggle,
  },
  setup() {
    const { hasActiveFilters, deleteAllFilters } = useAlgoliaOrganisationsQueryBuilder()
    return {
      hasActiveFilters,
      deleteAllFilters,
    }
  },
  props: {
    filtersName: {
      type: Array,
      required: true,
    },
  },
})
</script>
