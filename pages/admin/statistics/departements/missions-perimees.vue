<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Départements' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Départements"
    />

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

export default {
  components: {
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
