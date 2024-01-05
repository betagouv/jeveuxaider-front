<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Utilisateurs' }]" />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Utilisateurs">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatisticsPublic @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <UtilisateursStatistics ref="utilisateursStatistics" />
      <BaseHeading as="h2" :level="2"> Les utilisateurs en détail </BaseHeading>
      <UtilisateursByDate ref="utilisateursByDate" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 lg:w-1/2">
          <UtilisateursByActivities ref="utilisateursByActivities" />
        </div>
        <div class="space-y-12 lg:w-1/2">
          <TemoignagesByGrades ref="temoignagesByGrades" />
          <UtilisateursByAge ref="utilisateursByAge" />
          <ParticipationsDelaysByRegistrations ref="participationsDelaysByRegistrations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic.vue'
import UtilisateursStatistics from '@/components/statistics/UtilisateursStatistics.vue'
import UtilisateursByDate from '@/components/statistics/UtilisateursByDate.vue'
import UtilisateursByActivities from '@/components/statistics/UtilisateursByActivities.vue'
import UtilisateursByAge from '@/components/statistics/UtilisateursByAge.vue'
import ParticipationsDelaysByRegistrations from '@/components/statistics/ParticipationsDelaysByRegistrations.vue'
import TemoignagesByGrades from '@/components/statistics/TemoignagesByGrades.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsPublic,
    UtilisateursStatistics,
    UtilisateursByDate,
    UtilisateursByActivities,
    UtilisateursByAge,
    ParticipationsDelaysByRegistrations,
    TemoignagesByGrades,
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
  methods: {
    refetch() {
      this.$refs.utilisateursStatistics.fetch()
      this.$refs.utilisateursByDate.fetch()
      this.$refs.utilisateursByAge.fetch()
      this.$refs.utilisateursByActivities.fetch()
      this.$refs.participationsDelaysByRegistrations.fetch()
      this.$refs.temoignagesByGrades.fetch()
    },
  },
})
</script>

<style></style>
