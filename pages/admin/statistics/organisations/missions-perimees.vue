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
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <Tabs
      :tabs="[
        { name: 'Participations à valider', to: '/admin/statistics/organisations/participations-a-valider'},
        { name: 'Missions périmées', to: '/admin/statistics/organisations/missions-perimees', current: true },
        { name: 'Participations refusées / annulées', to: '/admin/statistics/organisations/participations-refusees-annulees'}
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MissionsOutdatedByOrganisations ref="missionsOutdatedByOrganisations" />
    </div>
  </div>
</template>

<script>
import MissionsOutdatedByOrganisations from '~/components/numbers/MissionsOutdatedByOrganisations.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    MissionsOutdatedByOrganisations,
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
      this.$refs.missionsOutdatedByOrganisations.$fetch()
    }
  }
}
</script>

<style>

</style>
