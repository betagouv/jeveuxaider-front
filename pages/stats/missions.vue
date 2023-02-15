<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Statistiques', to: '/stats' },
          { text: 'Missions' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Missions"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <MissionsStatistics ref="missionsStatistics" />
      <Heading as="h2" :level="2">
        L’activité relative aux missions en détail
      </Heading>
      <MissionsByDate ref="missionsByDate" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 lg:w-1/2">
          <MissionsByStates ref="missionsByStates" />
          <MissionsByTypes ref="missionsByTypes" />
          <MissionsByActivities ref="missionsByActivities" />
          <MissionsByTemplates ref="missionsByTemplates" />
        </div>
        <div class="space-y-12 lg:w-1/2">
          <MissionsByDomaines ref="missionsByDomaines" />
          <MissionsByTemplateTypes ref="missionsByTemplateTypes" />
          <MissionsByOrganisations ref="missionsByOrganisations" />
          <MissionsByReseaux ref="missionsByReseaux" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import MissionsStatistics from '@/components/statistics/MissionsStatistics.vue'
import MissionsByDate from '@/components/statistics/MissionsByDate.vue'
import MissionsByStates from '@/components/statistics/MissionsByStates.vue'
import MissionsByTypes from '@/components/statistics/MissionsByTypes.vue'
import MissionsByActivities from '@/components/statistics/MissionsByActivities.vue'
import MissionsByTemplates from '@/components/statistics/MissionsByTemplates.vue'
import MissionsByDomaines from '@/components/statistics/MissionsByDomaines.vue'
import MissionsByOrganisations from '@/components/statistics/MissionsByOrganisations.vue'
import MissionsByReseaux from '@/components/statistics/MissionsByReseaux.vue'
import MissionsByTemplateTypes from '@/components/statistics/MissionsByTemplateTypes.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    MissionsStatistics,
    MissionsByDate,
    MissionsByStates,
    MissionsByTypes,
    MissionsByActivities,
    MissionsByTemplates,
    MissionsByDomaines,
    MissionsByOrganisations,
    MissionsByReseaux,
    MissionsByTemplateTypes,
    Breadcrumb
  },
  layout: 'statistics-public',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.missionsByDate.$fetch()
      this.$refs.missionsStatistics.$fetch()
      this.$refs.missionsByStates.$fetch()
      this.$refs.missionsByDomaines.$fetch()
      this.$refs.missionsByTypes.$fetch()
      this.$refs.missionsByActivities.$fetch()
      this.$refs.missionsByOrganisations.$fetch()
      this.$refs.missionsByReseaux.$fetch()
      this.$refs.missionsByTemplates.$fetch()
      this.$refs.missionsByTemplateTypes.$fetch()
    }
  }
}
</script>

<style>

</style>
