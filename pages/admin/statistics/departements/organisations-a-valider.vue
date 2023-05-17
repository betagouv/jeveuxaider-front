<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Administration', to: ['admin'].includes(
            $store.getters.contextRole
          ) ? '/admin' : null },
          { text: 'Plus de chiffres', to: '/admin/statistics' },
          { text: 'Départements' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Départements"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <Tabs
      :tabs="[
        { name: 'Organisations à valider', to: '/admin/statistics/departements/organisations-a-valider' , current: true },
        { name: 'Missions à valider', to: '/admin/statistics/departements/missions-a-valider'},
        { name: 'Missions périmées', to: '/admin/statistics/departements/missions-perimees'}
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <OrganisationsWaitingByDepartments ref="organisationsWaitingByDepartments" />
      <OrganisationsInProgressByDepartments ref="organisationsInProgressByDepartments" />
    </div>
  </div>
</template>

<script>
import OrganisationsWaitingByDepartments from '@/components/numbers/OrganisationsWaitingByDepartments.vue'
import OrganisationsInProgressByDepartments from '@/components/numbers/OrganisationsInProgressByDepartments.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    OrganisationsWaitingByDepartments,
    OrganisationsInProgressByDepartments,
    Breadcrumb
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.organisationsWaitingByDepartments.$fetch()
      this.$refs.organisationsInProgressByDepartments.$fetch()
    }
  }
}
</script>

<style>

</style>
