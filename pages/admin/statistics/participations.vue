<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Participations' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Participations"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ParticipationsStatistics ref="participationsStatistics" class="lg:col-span-2" />
      <ParticipationsByDate ref="participationsByDate" class="lg:col-span-2" />
      <ParticipationsByStates ref="participationsByStates" />
      <ParticipationsByDomaines ref="participationsByDomaines" />
      <ParticipationsByOrganisations ref="participationsByOrganisations" />
      <ParticipationsByReseaux ref="participationsByReseaux" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ParticipationsStatistics from '@/components/numbers/ParticipationsStatistics.vue'
import ParticipationsByDate from '@/components/numbers/ParticipationsByDate.vue'
import ParticipationsByStates from '@/components/numbers/ParticipationsByStates.vue'
import ParticipationsByOrganisations from '@/components/numbers/ParticipationsByOrganisations.vue'
import ParticipationsByDomaines from '@/components/numbers/ParticipationsByDomaines.vue'
import ParticipationsByReseaux from '@/components/numbers/ParticipationsByReseaux.vue'

export default {
  components: {
    FiltersStatistics,
    ParticipationsStatistics,
    ParticipationsByDate,
    ParticipationsByStates,
    ParticipationsByOrganisations,
    ParticipationsByDomaines,
    ParticipationsByReseaux
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.participationsStatistics.$fetch()
      this.$refs.participationsByDate.$fetch()
      this.$refs.participationsByStates.$fetch()
      this.$refs.participationsByDomaines.$fetch()
      this.$refs.participationsByOrganisations.$fetch()
      this.$refs.participationsByReseaux.$fetch()
    }
  }
}
</script>

<style>

</style>
