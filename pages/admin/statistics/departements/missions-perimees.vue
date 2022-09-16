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
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <Tabs
      :tabs="[
        { name: 'Organisations à valider', to: '/admin/statistics/departements/organisations-a-valider' },
        { name: 'Missions à valider', to: '/admin/statistics/departements/missions-a-valider'},
        { name: 'Missions périmées', to: '/admin/statistics/departements/missions-perimees', current: true}
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MissionsOutdatedByDepartments ref="missionsOutdatedByDepartments" />
    </div>
  </div>
</template>

<script>
import MissionsOutdatedByDepartments from '@/components/numbers/MissionsOutdatedByDepartments.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics'

export default {
  components: {
    FiltersStatistics,
    MissionsOutdatedByDepartments
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.missionsOutdatedByDepartments.$fetch()
    }
  }
}
</script>

<style>

</style>
