<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Organisations' }]" />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Organisations">
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <OrganisationsStatistics ref="organisationsStatistics" />
      <BaseHeading as="h2" :level="2"> L’activité des organisations en détail </BaseHeading>
      <!-- <OrganisationsByDate ref="organisationsByDate" /> -->
      <div class="flex flex-col gap-12">
        <OrganisationsByPeriod ref="organisationsByPeriod" />
        <div class="flex flex-col lg:flex-row gap-12">
          <OrganisationsByStates ref="organisationsByStates" class="w-full" />
          <OrganisationsByTypes ref="organisationsByTypes" class="w-full" />
        </div>

        <OrganisationsByReseaux ref="organisationsByReseaux" />
        <!-- <ParticipationsRefusedByResponsables ref="participationsRefusedByResponsables" /> -->
        <OrganisationsByDomaines ref="organisationsByDomaines" />
      </div>
    </div>
  </div>
</template>

<script>
import OrganisationsStatistics from '@/components/statistics/OrganisationsStatistics.vue'
import OrganisationsByDate from '@/components/statistics/OrganisationsByDate.vue'
import OrganisationsByPeriod from '@/components/statistics/OrganisationsByPeriod.vue'
import OrganisationsByStates from '@/components/statistics/OrganisationsByStates.vue'
import OrganisationsByTypes from '@/components/statistics/OrganisationsByTypes.vue'
import OrganisationsByDomaines from '@/components/statistics/OrganisationsByDomaines.vue'
import OrganisationsByReseaux from '@/components/statistics/OrganisationsByReseaux.vue'
// import ParticipationsRefusedByResponsables from '@/components/statistics/ParticipationsRefusedByResponsables.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    OrganisationsStatistics,
    OrganisationsByDate,
    OrganisationsByPeriod,
    OrganisationsByStates,
    OrganisationsByTypes,
    OrganisationsByDomaines,
    OrganisationsByReseaux,
    // ParticipationsRefusedByResponsables,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-public',
    })
  },
  data() {
    return {}
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  computed: {
    filters() {
      return ['department', 'daterange']
    },
  },
  methods: {
    refetch() {
      this.$refs.organisationsByDate?.fetch()
      this.$refs.organisationsByPeriod?.fetch()
      this.$refs.organisationsStatistics?.fetch()
      this.$refs.organisationsByStates?.fetch()
      this.$refs.organisationsByTypes?.fetch()
      this.$refs.organisationsByDomaines?.fetch()
      this.$refs.organisationsByReseaux?.fetch()
      this.$refs.participationsRefusedByResponsables?.fetch()
    },
  },
})
</script>

<style></style>
