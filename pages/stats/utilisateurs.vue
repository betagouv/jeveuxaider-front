<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Utilisateurs' }]" />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Utilisateurs">
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <UtilisateursStatistics ref="utilisateursStatistics" />
      <!-- <UtilisateursByDate ref="utilisateursByDate" /> -->
      <div class="flex flex-col gap-12">
        <BaseHeading as="h2" :level="2" class="mt-8"> Les utilisateurs en détail </BaseHeading>

        <UtilisateursByPeriod ref="utilisateursByPeriod" />
        <UtilisateursByAge ref="utilisateursByAge" />
        <UtilisateursByActivities ref="utilisateursByActivities" />
        <TemoignagesByGrades ref="temoignagesByGrades" />
        <ParticipationsDelaysByRegistrations ref="participationsDelaysByRegistrations" />
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic.vue'
import UtilisateursStatistics from '@/components/statistics/UtilisateursStatistics.vue'
import UtilisateursByDate from '@/components/statistics/UtilisateursByDate.vue'
import UtilisateursByPeriod from '@/components/statistics/UtilisateursByPeriod.vue'
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
    UtilisateursByPeriod,
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
      this.$refs.utilisateursStatistics?.fetch()
      this.$refs.utilisateursByDate?.fetch()
      this.$refs.utilisateursByPeriod?.fetch()
      this.$refs.utilisateursByAge?.fetch()
      this.$refs.utilisateursByActivities?.fetch()
      this.$refs.participationsDelaysByRegistrations?.fetch()
      this.$refs.temoignagesByGrades?.fetch()
    },
  },
})
</script>

<style></style>
