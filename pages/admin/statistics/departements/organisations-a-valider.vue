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

export default {
  components: {
    OrganisationsWaitingByDepartments,
    OrganisationsInProgressByDepartments
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
