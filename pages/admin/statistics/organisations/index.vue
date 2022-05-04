<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <OrganisationsStatistics ref="organisationsStatistics" class="lg:col-span-2" />
      <OrganisationsByDate ref="organisationsByDate" class="lg:col-span-2" />
      <OrganisationsByStates ref="organisationsByStates" />
      <OrganisationsByTypes ref="organisationsByTypes" />
      <OrganisationsByDomaines ref="organisationsByDomaines" />
      <OrganisationsByReseaux ref="organisationsByReseaux" />
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

export default {
  components: {
    FiltersStatistics,
    OrganisationsStatistics,
    OrganisationsByDate,
    OrganisationsByStates,
    OrganisationsByTypes,
    OrganisationsByDomaines,
    OrganisationsByReseaux
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.organisationsStatistics.$fetch()
      this.$refs.organisationsByDate.$fetch()
      this.$refs.organisationsByStates.$fetch()
      this.$refs.organisationsByTypes.$fetch()
      this.$refs.organisationsByDomaines.$fetch()
      this.$refs.organisationsByReseaux.$fetch()
    }
  }
}
</script>

<style>

</style>
