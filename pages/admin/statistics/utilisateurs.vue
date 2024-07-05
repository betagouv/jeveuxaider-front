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
      <!-- <UtilisateursByDate ref="utilisateursByDate" /> -->

      <div class="flex flex-col gap-12">
        <UtilisateursByPeriod ref="utilisateursByPeriod" />

        <UtilisateursByActivities ref="utilisateursByActivities" />
        <UtilisateursByAge ref="utilisateursByAge" />
        <div class="flex flex-col lg:flex-row gap-12">
          <UtilisateursWithParticipations ref="utilisateursWithParticipations" class="w-full" />
          <ParticipationsDelaysByRegistrations
            ref="participationsDelaysByRegistrations"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UtilisateursStatistics from '@/components/numbers/UtilisateursStatistics.vue'
import UtilisateursByDate from '@/components/numbers/UtilisateursByDate.vue'
import UtilisateursByPeriod from '@/components/numbers/UtilisateursByPeriod.vue'
import UtilisateursByActivities from '@/components/numbers/UtilisateursByActivities.vue'
import UtilisateursWithParticipations from '@/components/numbers/UtilisateursWithParticipations.vue'
import ParticipationsCanceledByBenevoles from '@/components/numbers/ParticipationsCanceledByBenevoles.vue'
import ParticipationsDelaysByRegistrations from '@/components/numbers/ParticipationsDelaysByRegistrations.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UtilisateursByAge from '@/components/numbers/UtilisateursByAge.vue'

export default defineNuxtComponent({
  components: {
    UtilisateursStatistics,
    UtilisateursByDate,
    UtilisateursByPeriod,
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
      this.$refs.utilisateursStatistics?.fetch()
      this.$refs.utilisateursByDate?.fetch()
      this.$refs.utilisateursByPeriod?.fetch()
      this.$refs.utilisateursByAge?.fetch()
      this.$refs.participationsCanceledByBenevoles?.fetch()
      this.$refs.utilisateursByActivities?.fetch()
      this.$refs.utilisateursWithParticipations?.fetch()
      this.$refs.participationsDelaysByRegistrations?.fetch()
    },
  },
})
</script>

<style></style>
