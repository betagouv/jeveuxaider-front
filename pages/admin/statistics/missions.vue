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
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <MissionsStatistics ref="missionsStatistics" />
      <!-- <MissionsByDate
        v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
        ref="missionsByDate"
      /> -->
      <div class="flex flex-col gap-12">
        <BaseHeading as="h2" :level="2" class="mt-12">
          L’activité relative aux missions en détail
        </BaseHeading>

        <MissionsByPeriod ref="missionsByPeriod" />
        <MissionsByStates ref="missionsByStates" />
        <div class="flex flex-col lg:flex-row gap-12">
          <MissionsByTypes ref="missionsByTypes" class="w-full" />
          <MissionsByTemplateTypes ref="missionsByTemplateTypes" class="w-full" />
        </div>
        <MissionsByActivities ref="missionsByActivities" />
        <MissionsByDomaines ref="missionsByDomaines" />
        <MissionsByTemplates ref="missionsByTemplates" />
      </div>

      <MissionsByOrganisations
        ref="missionsByOrganisations"
        v-if="['admin', 'referent', 'tete_de_reseau'].includes($stores.auth.contextRole)"
      />
      <MissionsByReseaux
        ref="missionsByReseaux"
        v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
      />
    </div>
  </div>
</template>

<script>
import MissionsStatistics from '@/components/numbers/MissionsStatistics.vue'
import MissionsByDate from '@/components/numbers/MissionsByDate.vue'
import MissionsByPeriod from '@/components/numbers/MissionsByPeriod.vue'
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
      layout: 'statistics-admin',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (
      !['admin', 'referent', 'tete_de_reseau', 'responsable'].includes($stores.auth.contextRole)
    ) {
      return showError({ statusCode: 403 })
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    filters() {
      if (this.$stores.auth.contextRole === 'admin') {
        return ['department', 'daterange', 'reseau', 'structure']
      }
      if (this.$stores.auth.contextRole === 'referent') {
        return ['daterange']
      }
      if (this.$stores.auth.contextRole === 'tete_de_reseau') {
        return ['daterange', 'department']
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        return ['daterange']
      }

      return []
    },
  },
  methods: {
    refetch() {
      this.$refs.missionsStatistics?.fetch()
      this.$refs.missionsByDate?.fetch()
      this.$refs.missionsByPeriod?.fetch()
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
