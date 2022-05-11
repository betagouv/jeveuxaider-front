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
        { name: 'Participations à valider', to: '/admin/statistics/organisations/participations-a-valider', current: true},
        { name: 'Missions périmées', to: '/admin/statistics/organisations/missions-perimees' }
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ParticipationsWaitingByOrganisations ref="participationsWaitingByOrganisations" />
      <ParticipationsInProgressByOrganisations ref="participationsInProgressByOrganisations" />
    </div>
  </div>
</template>

<script>
import ParticipationsWaitingByOrganisations from '~/components/numbers/ParticipationsWaitingByOrganisations.vue'
import ParticipationsInProgressByOrganisations from '~/components/numbers/ParticipationsInProgressByOrganisations.vue'

export default {
  components: {
    ParticipationsWaitingByOrganisations,
    ParticipationsInProgressByOrganisations
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.participationsWaitingByOrganisations.$fetch()
      this.$refs.participationsInProgressByOrganisations.$fetch()
    }
  }
}
</script>

<style>

</style>
