<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Missions' },
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MissionsStatistics ref="missionsStatistics" class="lg:col-span-2" />
      <MissionsByDate ref="missionsByDate" class="lg:col-span-2" />
      <MissionsByStates ref="missionsByStates" />
      <MissionsByStates2 ref="missionsByStates2" />
      <MissionsByDomaines ref="missionsByDomaines" />
      <MissionsByTypes ref="missionsByTypes" />
      <MissionsByActivities ref="missionsByActivities" />
      <MissionsByOrganisations ref="missionsByOrganisations" />
      <MissionsByReseaux ref="missionsByReseaux" />
      <MissionsByTemplates ref="missionsByTemplates" class="lg:col-span-2" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import MissionsStatistics from '@/components/numbers/MissionsStatistics.vue'
import MissionsByDate from '@/components/numbers/MissionsByDate.vue'
import MissionsByStates from '@/components/numbers/MissionsByStates.vue'
import MissionsByStates2 from '@/components/numbers/MissionsByStates2.vue'
import MissionsByTypes from '@/components/numbers/MissionsByTypes.vue'
import MissionsByActivities from '@/components/numbers/MissionsByActivities.vue'
import MissionsByTemplates from '@/components/numbers/MissionsByTemplates.vue'
import MissionsByDomaines from '@/components/numbers/MissionsByDomaines.vue'
import MissionsByOrganisations from '@/components/numbers/MissionsByOrganisations.vue'
import MissionsByReseaux from '@/components/numbers/MissionsByReseaux.vue'

export default {
  components: {
    FiltersStatistics,
    MissionsStatistics,
    MissionsByDate,
    MissionsByStates,
    MissionsByStates2,
    MissionsByTypes,
    MissionsByActivities,
    MissionsByTemplates,
    MissionsByDomaines,
    MissionsByOrganisations,
    MissionsByReseaux
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.missionsStatistics.$fetch()
      this.$refs.missionsByDate.$fetch()
      this.$refs.missionsByStates.$fetch()
      this.$refs.missionsByStates2.$fetch()
      this.$refs.missionsByDomaines.$fetch()
      this.$refs.missionsByTypes.$fetch()
      this.$refs.missionsByActivities.$fetch()
      this.$refs.missionsByOrganisations.$fetch()
      this.$refs.missionsByReseaux.$fetch()
      this.$refs.missionsByTemplates.$fetch()
    }
  }
}
</script>

<style>

</style>
