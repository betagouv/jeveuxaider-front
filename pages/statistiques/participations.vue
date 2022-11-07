<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Statistiques', link: '/statistiques' },
          { label: 'Mises en relation' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Mises en relation"
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
        Les mises en relation en détail
      </Heading>
      <ParticipationsByDate ref="participationsByDate" class="lg:col-span-2" />

      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 lg:w-1/2">
          <ParticipationsByActivities ref="participationsByActivities" />
          <ParticipationsByReseaux ref="participationsByReseaux" />
        </div>
        <div class="space-y-12 lg:w-1/2">
          <ParticipationsByDomaines ref="participationsByDomaines" />
          <ParticipationsByOrganisations ref="participationsByOrganisations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ParticipationsStatistics from '@/components/statistics/ParticipationsStatistics.vue'
import ParticipationsByDate from '@/components/statistics/ParticipationsByDate.vue'
import ParticipationsByOrganisations from '@/components/statistics/ParticipationsByOrganisations.vue'
import ParticipationsByDomaines from '@/components/statistics/ParticipationsByDomaines.vue'
import ParticipationsByReseaux from '@/components/statistics/ParticipationsByReseaux.vue'
import ParticipationsByActivities from '@/components/statistics/ParticipationsByActivities.vue'

export default {
  components: {
    FiltersStatistics,
    ParticipationsStatistics,
    ParticipationsByDate,
    ParticipationsByOrganisations,
    ParticipationsByDomaines,
    ParticipationsByReseaux,
    ParticipationsByActivities
  },
  layout: 'statistics-public',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.participationsByDate.$fetch()
      this.$refs.participationsStatistics.$fetch()
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
