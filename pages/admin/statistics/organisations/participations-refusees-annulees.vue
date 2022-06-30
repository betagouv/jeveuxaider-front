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

    <Tabs
      :tabs="[
        { name: 'Participations à valider', to: '/admin/statistics/organisations/participations-a-valider'},
        { name: 'Missions périmées', to: '/admin/statistics/organisations/missions-perimees' },
        { name: 'Participations refusées / annulées', to: '/admin/statistics/organisations/participations-refusees-annulees', current: true }
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ParticipationsRefusedByOrganisations ref="participationsRefusedByOrganisations" />
      <ParticipationsCanceledByOrganisations ref="participationsCanceledByOrganisations" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ParticipationsRefusedByOrganisations from '@/components/numbers/ParticipationsRefusedByOrganisations.vue'
import ParticipationsCanceledByOrganisations from '@/components/numbers/ParticipationsCanceledByOrganisations.vue'

export default {
  components: {
    FiltersStatistics,
    ParticipationsRefusedByOrganisations,
    ParticipationsCanceledByOrganisations
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.participationsRefusedByOrganisations.$fetch()
      this.$refs.participationsCanceledByOrganisations.$fetch()
    }
  }
}
</script>

<style>

</style>
