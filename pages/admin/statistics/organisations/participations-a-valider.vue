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
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ParticipationsWaitingByOrganisations from '~/components/numbers/ParticipationsWaitingByOrganisations.vue'
import ParticipationsInProgressByOrganisations from '~/components/numbers/ParticipationsInProgressByOrganisations.vue'

export default {
  components: {
    FiltersStatistics,
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
