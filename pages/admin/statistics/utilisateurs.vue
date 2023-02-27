<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Plus de chiffres', to: '/admin/statistics' },
          { text: 'Utilisateurs' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Utilisateurs"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <UtilisateursStatistics ref="utilisateursStatistics" />
      <Heading as="h2" :level="2">
        Les utilisateurs en détail
      </Heading>
      <UtilisateursByDate ref="utilisateursByDate" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <UtilisateursByAge ref="utilisateursByAge" />
          <ParticipationsCanceledByBenevoles ref="participationsCanceledByBenevoles" />
        </div>
        <div class="space-y-12 w-1/2">
          <UtilisateursWithParticipations ref="utilisateursWithParticipations" />
          <ParticipationsDelaysByRegistrations ref="participationsDelaysByRegistrations" />
          <UtilisateursByDomaines ref="utilisateursByDomaines" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import UtilisateursStatistics from '@/components/numbers/UtilisateursStatistics.vue'
import UtilisateursByDate from '@/components/numbers/UtilisateursByDate.vue'
import UtilisateursByDomaines from '@/components/numbers/UtilisateursByDomaines.vue'
import UtilisateursWithParticipations from '@/components/numbers/UtilisateursWithParticipations.vue'
import ParticipationsCanceledByBenevoles from '@/components/numbers/ParticipationsCanceledByBenevoles.vue'
import ParticipationsDelaysByRegistrations from '@/components/numbers/ParticipationsDelaysByRegistrations.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UtilisateursByAge from '@/components/numbers/UtilisateursByAge.vue'

export default {
  components: {
    FiltersStatistics,
    UtilisateursStatistics,
    UtilisateursByDate,
    UtilisateursByDomaines,
    UtilisateursByAge,
    UtilisateursWithParticipations,
    ParticipationsCanceledByBenevoles,
    ParticipationsDelaysByRegistrations,
    Breadcrumb
  },
  layout: 'statistics',
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.utilisateursStatistics.$fetch()
      this.$refs.utilisateursByDate.$fetch()
      this.$refs.utilisateursByAge.$fetch()
      this.$refs.participationsCanceledByBenevoles.$fetch()
      this.$refs.utilisateursByDomaines.$fetch()
      this.$refs.utilisateursWithParticipations.$fetch()
      this.$refs.participationsDelaysByRegistrations.$fetch()
    }
  }
}
</script>

<style>

</style>
