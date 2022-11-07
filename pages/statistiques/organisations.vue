<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Statistiques', link: '/statistiques' },
          { label: 'Organisations' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Organisations"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <OrganisationsStatistics ref="organisationsStatistics" class="" />
      <Heading as="h2" :level="2">
        L’activité des organisations en détail
      </Heading>
      <OrganisationsByDate ref="organisationsByDate" class="" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 lg:w-1/2">
          <OrganisationsByStates ref="organisationsByStates" />
          <OrganisationsByReseaux ref="organisationsByReseaux" />
          <!-- <ParticipationsRefusedByResponsables ref="participationsRefusedByResponsables" /> -->
        </div>
        <div class="space-y-12 lg:w-1/2">
          <OrganisationsByTypes ref="organisationsByTypes" />
          <OrganisationsByDomaines ref="organisationsByDomaines" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import OrganisationsStatistics from '@/components/statistics/OrganisationsStatistics.vue'
import OrganisationsByDate from '@/components/statistics/OrganisationsByDate.vue'
import OrganisationsByStates from '@/components/statistics/OrganisationsByStates.vue'
import OrganisationsByTypes from '@/components/statistics/OrganisationsByTypes.vue'
import OrganisationsByDomaines from '@/components/statistics/OrganisationsByDomaines.vue'
import OrganisationsByReseaux from '@/components/statistics/OrganisationsByReseaux.vue'
// import ParticipationsRefusedByResponsables from '@/components/statistics/ParticipationsRefusedByResponsables.vue'

export default {
  components: {
    FiltersStatistics,
    OrganisationsStatistics,
    OrganisationsByDate,
    OrganisationsByStates,
    OrganisationsByTypes,
    OrganisationsByDomaines,
    OrganisationsByReseaux
    // ParticipationsRefusedByResponsables
  },
  layout: 'statistics-public',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.organisationsByDate.$fetch()
      this.$refs.organisationsStatistics.$fetch()
      this.$refs.organisationsByStates.$fetch()
      this.$refs.organisationsByTypes.$fetch()
      // this.$refs.participationsRefusedByResponsables.$fetch()
      this.$refs.organisationsByDomaines.$fetch()
      this.$refs.organisationsByReseaux.$fetch()
    }
  }
}
</script>

<style>

</style>
