<template>
  <div class="hidden sm:block lg:flex justify-between gap-8 items-baseline !mt-8 lg:!mb-4">
    <div class="flex flex-wrap items-center justify-start gap-3 lg:ml-6 xl:ml-12">
      <template v-for="(filter, i) in visibleFilters">
        <FacetFilterToggle
          v-if="filter === 'date_type'"
          :key="i"
          facet-name="date_type"
          label="Types d'engagement"
          legend="Filtrer par type d'engagement"
          :facet-value-resolver="{
            recurring: 'Engagement régulier',
            ponctual: 'Engagement ponctuel',
          }"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Types d'engagement</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

        <DatesFilter v-if="filter === 'dates'">
          <template #button="{ activeValue, isOpen }">
            <DsfrTag
              :is-active="!!activeValue"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!activeValue">Dates</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ activeValue }}</span>
              </div>
            </DsfrTag>
          </template>
        </DatesFilter>

        <SecondarySearchFilter v-if="filter === 'search'">
          <template #button="{ activeValue, isOpen }">
            <DsfrTag
              :is-active="!!activeValue"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!activeValue">Mots clés</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ activeValue }}</span>
              </div>
            </DsfrTag>
          </template>
        </SecondarySearchFilter>

        <FacetFilterToggle
          v-if="filter === 'structure.name'"
          :key="i"
          facet-name="structure.name"
          label="Organisations"
          legend="Filtrer par organisation"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Organisations</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

        <FacetFilterToggle
          v-if="filter === 'tags'"
          :key="i"
          facet-name="tags"
          label="Opérations nationales"
          legend="Filtrer par opération nationale"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Opérations nationales</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

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
          v-if="filter === 'domaines'"
          :key="i"
          facet-name="domaines"
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
          v-if="filter === 'structure.reseaux.name'"
          :key="i"
          facet-name="structure.reseaux.name"
          label="Réseaux"
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
          v-if="$route.query.type != 'Mission à distance' && filter === 'department_name'"
          :key="i"
          facet-name="department_name"
          label="Départements"
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
          v-if="filter === 'template_subtitle'"
          :key="i"
          facet-name="template_subtitle"
          label="Types de mission"
          legend="Filtrer par type de mission"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Types de mission</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>

        <MinorsFilter v-if="filter === 'is_minors'" :key="i" />

        <PonctualFilter v-if="filter === 'is_ponctual'" :key="i" />

        <FacetFilterToggle
          v-if="filter === 'publisher_name'"
          :key="i"
          facet-name="publisher_name"
          label="Plateformes"
          legend="Filtrer par plateforme"
        >
          <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
            <DsfrTag
              :is-active="!!activeValuesCount"
              context="clickable"
              size="md"
              as="button"
              :aria-expanded="isOpen || 'false'"
            >
              <span v-if="!firstValueSelected">Plateformes</span>
              <div v-else>
                <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
              </div>
            </DsfrTag>
          </template>
        </FacetFilterToggle>
      </template>

      <DsfrTag
        v-if="visibleFilters.length < filtersName.length"
        context="clickable"
        icon="RiAddLine"
        :icon-only="true"
        size="md"
        as="button"
        title="Afficher plus de filtres"
        @click.native="showAllFilters = true"
      />
    </div>

    <div class="flex mt-4 lg:mt-0 lg:mr-6 xl:mr-12">
      <DsfrLink
        :class="['text-jva-blue-500', { 'pointer-events-none opacity-0': !hasActiveFilters() }]"
        @click.native="deleteAllFilters()"
      >
        Réinitialiser
      </DsfrLink>
    </div>
  </div>
</template>

<script>
import FacetFilterToggle from '@/components/section/search/FacetFilterToggle.vue'
import MinorsFilter from '@/components/section/search/MinorsFilter.vue'
import PonctualFilter from '@/components/section/search/PonctualFilter.vue'
import DatesFilter from '@/components/section/search/DatesFilter.vue'
import SecondarySearchFilter from '@/components/search/SecondarySearchFilter.vue'

export default defineNuxtComponent({
  components: {
    FacetFilterToggle,
    MinorsFilter,
    PonctualFilter,
    DatesFilter,
    SecondarySearchFilter,
  },
  props: {
    filtersName: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { hasActiveFilters, deleteAllFilters } = useAlgoliaMissionsQueryBuilder()
    return {
      hasActiveFilters,
      deleteAllFilters,
    }
  },
  data() {
    return {
      showAllFilters: false,
    }
  },
  computed: {
    activeFilters() {
      this.sanitizeQuery()
      let filters = Object.keys(this.$route.query).filter(
        (f) => f && this.filtersName.includes(f) && f !== 'page'
      )

      const publicsVolontaires = this.$route.query?.publics_volontaires?.split('|')
      if (publicsVolontaires?.includes('Mineurs')) {
        filters.push('is_minors')
        if (publicsVolontaires.length === 1) {
          filters = filters.filter((f) => f !== 'publics_volontaires')
        }
      }

      return filters || []
    },
    inactiveFilters() {
      return this.filtersName.filter((f) => !this.activeFilters.includes(f))
    },
    visibleFilters() {
      if (this.showAllFilters) {
        return this.filtersName
      }

      const visibleFilters = this.filtersName.filter((f) =>
        ['search', 'is_ponctual', 'structure.name'].includes(f)
      )

      this.activeFilters.forEach((f) => {
        if (!visibleFilters.includes(f)) {
          visibleFilters.push(f)
        }
      })

      if (this.activeFilters.length && visibleFilters.length < 2) {
        visibleFilters.push(...this.inactiveFilters.slice(0, 2 - this.activeFilters.length))
      }

      return visibleFilters
    },
  },
  methods: {
    sanitizeQuery() {
      Object.keys(this.$route.query).forEach((key) =>
        this.$route.query[key] === undefined ? delete this.$route.query[key] : {}
      )
    },
  },
})
</script>
