<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/statistics' },
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
        <div class="space-y-12 w-1/2">
          <OrganisationsByStates ref="organisationsByStates" />
          <OrganisationsByTypes ref="organisationsByTypes" />
          <ParticipationsRefusedByResponsables ref="participationsRefusedByResponsables" />
        </div>
        <div class="space-y-12 w-1/2">
          <OrganisationsByDomaines ref="organisationsByDomaines" />
          <OrganisationsByReseaux ref="organisationsByReseaux" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import OrganisationsStatistics from '@/components/numbers/OrganisationsStatistics.vue'
import OrganisationsByDate from '@/components/numbers/OrganisationsByDate.vue'
import OrganisationsByStates from '@/components/numbers/OrganisationsByStates.vue'
import OrganisationsByTypes from '@/components/numbers/OrganisationsByTypes.vue'
import OrganisationsByDomaines from '@/components/numbers/OrganisationsByDomaines.vue'
import OrganisationsByReseaux from '@/components/numbers/OrganisationsByReseaux.vue'
import ParticipationsRefusedByResponsables from '@/components/numbers/ParticipationsRefusedByResponsables.vue'

export default {
  components: {
    FiltersStatistics,
    OrganisationsStatistics,
    OrganisationsByDate,
    OrganisationsByStates,
    OrganisationsByTypes,
    OrganisationsByDomaines,
    OrganisationsByReseaux,
    ParticipationsRefusedByResponsables
  },
  layout: 'statistics',
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.organisationsByDate.$fetch()
      this.$refs.organisationsStatistics.$fetch()
      this.$refs.organisationsByStates.$fetch()
      this.$refs.organisationsByTypes.$fetch()
      this.$refs.participationsRefusedByResponsables.$fetch()
      this.$refs.organisationsByDomaines.$fetch()
      this.$refs.organisationsByReseaux.$fetch()
    }
  }
}
</script>

<style>

</style>
