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
            { text: 'Participations' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Participations">
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <ParticipationsStatistics ref="participationsStatistics" />
      <BaseHeading as="h2" :level="2"> Les participations en détail </BaseHeading>
      <!-- <ParticipationsByDate
        v-if="['admin'].includes($stores.auth.contextRole)"
        ref="participationsByDate"
      /> -->
      <ParticipationsByPeriod ref="participationsByPeriod" />
      <!-- <ParticipationsConversionByDate
        v-if="['admin'].includes($stores.auth.contextRole)"
        ref="participationsConversionByDate"
      /> -->
      <div class="flex flex-col gap-12">
        <ParticipationsByStates ref="participationsByStates" />
        <ParticipationsRefusedByResponsables ref="participationsRefusedByResponsables" />
        <ParticipationsCanceledByBenevoles ref="participationsCanceledByBenevoles" />
        <ParticipationsByActivities ref="participationsByActivities" />
        <ParticipationsByReseaux
          ref="participationsByReseaux"
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
        />
        <ParticipationsByDomaines ref="participationsByDomaines" />
        <ParticipationsByOrganisations
          ref="participationsByOrganisations"
          v-if="['admin', 'referent', 'tete_de_reseau'].includes($stores.auth.contextRole)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatisticsButton from '@/components/custom/FiltersStatisticsButton.vue'
import FiltersStatisticsActive from '@/components/custom/FiltersStatisticsActive.vue'
import ParticipationsStatistics from '@/components/numbers/ParticipationsStatistics.vue'
import ParticipationsByDate from '@/components/numbers/ParticipationsByDate.vue'
import ParticipationsByPeriod from '@/components/numbers/ParticipationsByPeriod.vue'
import ParticipationsByStates from '@/components/numbers/ParticipationsByStates.vue'
import ParticipationsByOrganisations from '@/components/numbers/ParticipationsByOrganisations.vue'
import ParticipationsByDomaines from '@/components/numbers/ParticipationsByDomaines.vue'
import ParticipationsByReseaux from '@/components/numbers/ParticipationsByReseaux.vue'
import ParticipationsByActivities from '@/components/numbers/ParticipationsByActivities.vue'
import ParticipationsConversionByDate from '@/components/numbers/ParticipationsConversionByDate.vue'
import ParticipationsRefusedByResponsables from '@/components/numbers/ParticipationsRefusedByResponsables.vue'
import ParticipationsCanceledByBenevoles from '@/components/numbers/ParticipationsCanceledByBenevoles.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsButton,
    FiltersStatisticsActive,
    ParticipationsStatistics,
    ParticipationsByDate,
    ParticipationsByPeriod,
    ParticipationsByStates,
    ParticipationsByOrganisations,
    ParticipationsByDomaines,
    ParticipationsByReseaux,
    ParticipationsByActivities,
    ParticipationsConversionByDate,
    ParticipationsRefusedByResponsables,
    ParticipationsCanceledByBenevoles,
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
      this.$refs.participationsByDate?.fetch()
      this.$refs.participationsStatistics?.fetch()
      this.$refs.participationsByStates?.fetch()
      this.$refs.participationsByDomaines?.fetch()
      this.$refs.participationsByOrganisations?.fetch()
      this.$refs.participationsByReseaux?.fetch()
      this.$refs.participationsByActivities?.fetch()
      this.$refs.participationsConversionByDate?.fetch()
      this.$refs.participationsByPeriod?.fetch()
      this.$refs.participationsCanceledByBenevoles?.fetch()
      this.$refs.participationsRefusedByResponsables?.fetch()
    },
  },
})
</script>

<style></style>
