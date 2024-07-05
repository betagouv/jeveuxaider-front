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
            { text: 'Utilisateurs' },
          ]"
        />
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
      <BaseHeading as="h2" :level="2"> Les utilisateurs en détail </BaseHeading>
      <UtilisateursByDate ref="utilisateursByDate" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <UtilisateursByActivities ref="utilisateursByActivities" />
        </div>
        <div class="space-y-12 w-1/2">
          <UtilisateursWithParticipations ref="utilisateursWithParticipations" />
          <UtilisateursByAge ref="utilisateursByAge" />
          <ParticipationsDelaysByRegistrations ref="participationsDelaysByRegistrations" />
          <ParticipationsCanceledByBenevoles ref="participationsCanceledByBenevoles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import UtilisateursStatistics from '@/components/numbers/UtilisateursStatistics.vue'
import UtilisateursByDate from '@/components/numbers/UtilisateursByDate.vue'
import UtilisateursByActivities from '@/components/numbers/UtilisateursByActivities.vue'
import UtilisateursWithParticipations from '@/components/numbers/UtilisateursWithParticipations.vue'
import ParticipationsCanceledByBenevoles from '@/components/numbers/ParticipationsCanceledByBenevoles.vue'
import ParticipationsDelaysByRegistrations from '@/components/numbers/ParticipationsDelaysByRegistrations.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UtilisateursByAge from '@/components/numbers/UtilisateursByAge.vue'

export default defineNuxtComponent({
  components: {
    // FiltersStatistics,
    UtilisateursStatistics,
    UtilisateursByDate,
    UtilisateursByActivities,
    UtilisateursByAge,
    UtilisateursWithParticipations,
    ParticipationsCanceledByBenevoles,
    ParticipationsDelaysByRegistrations,
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
        return ['department', 'daterange']
      }
      if (this.$stores.auth.contextRole === 'referent') {
        return ['daterange']
      }
      if (this.$stores.auth.contextRole === 'tete_de_reseau') {
        return ['daterange']
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        return ['daterange']
      }

      return []
    },
  },
  methods: {
    refetch() {
      if (this.$refs.utilisateursStatistics) this.$refs.utilisateursStatistics.fetch()
      if (this.$refs.utilisateursByDate) this.$refs.utilisateursByDate.fetch()
      if (this.$refs.utilisateursByAge) this.$refs.utilisateursByAge.fetch()
      if (this.$refs.participationsCanceledByBenevoles)
        this.$refs.participationsCanceledByBenevoles.fetch()
      if (this.$refs.utilisateursByActivities) this.$refs.utilisateursByActivities.fetch()
      if (this.$refs.utilisateursWithParticipations)
        this.$refs.utilisateursWithParticipations.fetch()
      if (this.$refs.participationsDelaysByRegistrations)
        this.$refs.participationsDelaysByRegistrations.fetch()
    },
  },
})
</script>

<style></style>
