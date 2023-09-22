<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            {
              text: 'Administration',
              to: ['admin'].includes($stores.auth.contextRole) ? '/admin' : null,
            },
            { text: 'Plus de chiffres', to: '/admin/statistics' },
            { text: 'Missions' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Missions">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <MissionsStatistics ref="missionsStatistics" />
      <BaseHeading as="h2" :level="2"> L’activité relative aux missions en détail </BaseHeading>
      <MissionsByDate ref="missionsByDate" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <MissionsByStates ref="missionsByStates" />
          <MissionsByTypes ref="missionsByTypes" />
          <MissionsByActivities ref="missionsByActivities" />
          <MissionsByTemplates ref="missionsByTemplates" />
        </div>
        <div class="space-y-12 w-1/2">
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
import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import MissionsStatistics from '@/components/numbers/MissionsStatistics.vue'
import MissionsByDate from '@/components/numbers/MissionsByDate.vue'
import MissionsByStates from '@/components/numbers/MissionsByStates.vue'
import MissionsByTypes from '@/components/numbers/MissionsByTypes.vue'
import MissionsByActivities from '@/components/numbers/MissionsByActivities.vue'
import MissionsByTemplates from '@/components/numbers/MissionsByTemplates.vue'
import MissionsByDomaines from '@/components/numbers/MissionsByDomaines.vue'
import MissionsByOrganisations from '@/components/numbers/MissionsByOrganisations.vue'
import MissionsByReseaux from '@/components/numbers/MissionsByReseaux.vue'
import MissionsByTemplateTypes from '@/components/numbers/MissionsByTemplateTypes.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
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
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (!['admin', 'referent'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
  },
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.missionsByDate.fetch()
      this.$refs.missionsStatistics.fetch()
      this.$refs.missionsByStates.fetch()
      this.$refs.missionsByDomaines.fetch()
      this.$refs.missionsByTypes.fetch()
      this.$refs.missionsByActivities.fetch()
      this.$refs.missionsByOrganisations.fetch()
      this.$refs.missionsByReseaux.fetch()
      this.$refs.missionsByTemplates.fetch()
      this.$refs.missionsByTemplateTypes.fetch()
    },
  },
})
</script>

<style></style>
