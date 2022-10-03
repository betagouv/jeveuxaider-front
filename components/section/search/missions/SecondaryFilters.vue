<template>
  <div class="lg:flex justify-between items-center mt-8 lg:mb-4">
    <div class="hidden sm:flex flex-wrap items-center justify-start gap-3 lg:ml-6 xl:ml-12">
      <template v-for="filter,i in visibleFilters">
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

        <MinorsFilter v-if="filter === 'is_minors'" :key="i" />
      </template>

      <div
        v-if="visibleFilters.length < filtersName.length"
        class="inline-flex items-center justify-center rounded-full max-w-full border w-[34px] h-[34px] text-sm cursor-pointer text-gray-600 border-gray-500 hover:bg-gray-200"
        @click="showAllFilters = true"
      >
        <PlusIcon width="16" height="16" />
      </div>
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
import MinorsFilter from '~/components/section/search/MinorsFilter.vue'

export default {
  components: {
    FacetFilterToggle,
    BadgeFilter,
    AutonomyFilter,
    MinorsFilter
  },
  mixins: [AlgoliaQueryBuilder],
  props: {
    filtersName: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showAllFilters: false
    }
  },
  computed: {
    activeFilters () {
      this.sanitizeQuery()
      let filters = Object.keys(this.$route.query).filter(f => f && this.filtersName.includes(f) && f !== 'page')
      const publicsVolontaires = this.$route.query?.publics_volontaires?.split('|')
      if (publicsVolontaires?.includes('Mineurs')) {
        filters.push('is_minors')
        if (publicsVolontaires.length === 1) {
          filters = filters.filter(f => f !== 'publics_volontaires')
        }
      }
      return filters || []
    },
    inactiveFilters () {
      return this.filtersName.filter(f => !this.activeFilters.includes(f))
    },
    visibleFilters () {
      if (this.showAllFilters) {
        return this.filtersName
      }

      const visibleFilters = this.$route.query?.type === 'Mission à distance'
        ? this.filtersName.filter(f => !['is_autonomy', 'department_name'].includes(f)).slice(0, 3)
        : this.filtersName.slice(0, 3)

      this.activeFilters.forEach((f) => {
        if (!visibleFilters.includes(f)) {
          visibleFilters.push(f)
        }
      })

      if (this.activeFilters.length && visibleFilters.length < 3) {
        visibleFilters.push(...this.inactiveFilters.slice(0, 3 - this.activeFilters.length))
      }

      return visibleFilters
    }
  },
  methods: {
    sanitizeQuery () {
      Object.keys(this.$route.query).forEach(key => this.$route.query[key] === undefined ? delete this.$route.query[key] : {})
    }
  }
}
</script>
