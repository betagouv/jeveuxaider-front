<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Administration', to: ['admin'].includes(
            $store.getters.contextRole
          ) ? '/admin' : null },
          { text: 'Plus de chiffres', to: '/admin/statistics' },
          { text: 'Organisations' },
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
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    ParticipationsRefusedByOrganisations,
    ParticipationsCanceledByOrganisations,
    Breadcrumb
  },
  layout: 'statistics',
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
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
