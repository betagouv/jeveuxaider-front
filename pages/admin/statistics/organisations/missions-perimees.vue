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
    />

    <Tabs
      :tabs="[
        { name: 'Participations à valider', to: '/admin/statistics/organisations/participations-a-valider'},
        { name: 'Missions périmées', to: '/admin/statistics/organisations/missions-perimees', current: true }
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MissionsOutdatedByOrganisations ref="missionsOutdatedByOrganisations" />
    </div>
  </div>
</template>

<script>
import MissionsOutdatedByOrganisations from '~/components/numbers/MissionsOutdatedByOrganisations.vue'

export default {
  components: {
    MissionsOutdatedByOrganisations
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.missionsOutdatedByOrganisations.$fetch()
    }
  }
}
</script>

<style>

</style>
