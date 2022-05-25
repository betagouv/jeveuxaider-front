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

    <div class="space-y-12">
      <ParticipationsStatistics ref="participationsStatistics" class="lg:col-span-2" />
      <Heading as="h2" :level="2">
        Les participations en détail
      </Heading>
      <ParticipationsByDate ref="participationsByDate" class="lg:col-span-2" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <ParticipationsByStates ref="participationsByStates" />
          <ParticipationsByActivities ref="participationsByActivities" />
          <ParticipationsByReseaux ref="participationsByReseaux" />
        </div>
        <div class="space-y-12 w-1/2">
          <ParticipationsByDomaines ref="participationsByDomaines" />
          <ParticipationsByOrganisations ref="participationsByOrganisations" />
        </div>
      </div>
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
import ParticipationsByActivities from '@/components/numbers/ParticipationsByActivities.vue'

export default {
  components: {
    FiltersStatistics,
    ParticipationsStatistics,
    ParticipationsByDate,
    ParticipationsByStates,
    ParticipationsByOrganisations,
    ParticipationsByDomaines,
    ParticipationsByReseaux,
    ParticipationsByActivities
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.participationsByDate.$fetch()
      this.$refs.participationsStatistics.$fetch()
      this.$refs.participationsByStates.$fetch()
      this.$refs.participationsByDomaines.$fetch()
      this.$refs.participationsByOrganisations.$fetch()
      this.$refs.participationsByReseaux.$fetch()
      this.$refs.participationsByActivities.$fetch()
    }
  }
}
</script>

<style>

</style>
