<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Missions' }]" />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Missions">
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <MissionsStatistics ref="missionsStatistics" />
      <!-- <MissionsByDate ref="missionsByDate" /> -->
      <div class="flex flex-col gap-12">
        <BaseHeading as="h2" :level="2" class="mt-12">
          L’activité relative aux missions en détail
        </BaseHeading>

        <MissionsByPeriod ref="missionsByPeriod" />
        <MissionsByStates ref="missionsByStates" />
        <MissionsByTypes ref="missionsByTypes" />
        <MissionsByActivities ref="missionsByActivities" />
        <MissionsByTemplates ref="missionsByTemplates" />
        <MissionsByDomaines ref="missionsByDomaines" />
        <MissionsByTemplateTypes ref="missionsByTemplateTypes" />
        <MissionsByOrganisations ref="missionsByOrganisations" />
        <MissionsByReseaux ref="missionsByReseaux" />
      </div>
    </div>
  </div>
</template>

<script>
import MissionsStatistics from '@/components/statistics/MissionsStatistics.vue'
import MissionsByDate from '@/components/statistics/MissionsByDate.vue'
import MissionsByPeriod from '@/components/statistics/MissionsByPeriod.vue'
import MissionsByStates from '@/components/statistics/MissionsByStates.vue'
import MissionsByTypes from '@/components/statistics/MissionsByTypes.vue'
import MissionsByActivities from '@/components/statistics/MissionsByActivities.vue'
import MissionsByTemplates from '@/components/statistics/MissionsByTemplates.vue'
import MissionsByDomaines from '@/components/statistics/MissionsByDomaines.vue'
import MissionsByOrganisations from '@/components/statistics/MissionsByOrganisations.vue'
import MissionsByReseaux from '@/components/statistics/MissionsByReseaux.vue'
import MissionsByTemplateTypes from '@/components/statistics/MissionsByTemplateTypes.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    MissionsStatistics,
    MissionsByDate,
    MissionsByPeriod,
    MissionsByStates,
    MissionsByTypes,
    MissionsByActivities,
    MissionsByTemplates,
    MissionsByDomaines,
    MissionsByOrganisations,
    MissionsByReseaux,
    MissionsByTemplateTypes,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-public',
    })
  },
  data() {
    return {}
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  computed: {
    filters() {
      return ['department', 'daterange']
    },
  },
  methods: {
    refetch() {
      this.$refs.missionsByDate?.fetch()
      this.$refs.missionsByPeriod?.fetch()
      this.$refs.missionsStatistics?.fetch()
      this.$refs.missionsByStates?.fetch()
      this.$refs.missionsByDomaines?.fetch()
      this.$refs.missionsByTypes?.fetch()
      this.$refs.missionsByActivities?.fetch()
      this.$refs.missionsByOrganisations?.fetch()
      this.$refs.missionsByReseaux?.fetch()
      this.$refs.missionsByTemplates?.fetch()
      this.$refs.missionsByTemplateTypes?.fetch()
    },
  },
})
</script>

<style></style>
