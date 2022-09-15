<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/statistics' },
          { label: 'Départements' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Départements"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics no-period @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <Tabs
      :tabs="[
        { name: 'Organisations à valider', to: '/admin/statistics/departements/organisations-a-valider' },
        { name: 'Missions à valider', to: '/admin/statistics/departements/missions-a-valider', current: true},
        { name: 'Missions périmées', to: '/admin/statistics/departements/missions-perimees'}
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MissionsWaitingByDepartments ref="missionsWaitingByDepartments" />
      <MissionsInProgressByDepartments ref="missionsInProgressByDepartments" />
    </div>
  </div>
</template>

<script>
import MissionsWaitingByDepartments from '@/components/numbers/MissionsWaitingByDepartments.vue'
import MissionsInProgressByDepartments from '@/components/numbers/MissionsInProgressByDepartments.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics'

export default {
  components: {
    FiltersStatistics,
    MissionsWaitingByDepartments,
    MissionsInProgressByDepartments
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.missionsWaitingByDepartments.$fetch()
      this.$refs.missionsInProgressByDepartments.$fetch()
    }
  }
}
</script>

<style>

</style>
