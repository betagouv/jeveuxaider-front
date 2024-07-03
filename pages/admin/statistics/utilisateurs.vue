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
      <!-- <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template> -->
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
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.utilisateursStatistics.fetch()
      this.$refs.utilisateursByDate.fetch()
      this.$refs.utilisateursByAge.fetch()
      this.$refs.participationsCanceledByBenevoles.fetch()
      this.$refs.utilisateursByActivities.fetch()
      this.$refs.utilisateursWithParticipations.fetch()
      this.$refs.participationsDelaysByRegistrations.fetch()
    },
  },
})
</script>

<style></style>
