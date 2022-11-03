<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Statistiques', link: '/statistiques' },
          { label: 'Utilisateurs' },
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
          <UtilisateursByDomaines ref="utilisateursByDomaines" />
          <ParticipationsCanceledByBenevoles ref="participationsCanceledByBenevoles" />
        </div>
        <div class="space-y-12 w-1/2">
          <TemoignagesByGrades ref="temoignagesByGrades" />
          <ParticipationsDelaysByRegistrations ref="participationsDelaysByRegistrations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import UtilisateursStatistics from '@/components/statistics/UtilisateursStatistics.vue'
import UtilisateursByDate from '@/components/statistics/UtilisateursByDate.vue'
import UtilisateursByDomaines from '@/components/statistics/UtilisateursByDomaines.vue'
import ParticipationsCanceledByBenevoles from '@/components/statistics/ParticipationsCanceledByBenevoles.vue'
import ParticipationsDelaysByRegistrations from '@/components/statistics/ParticipationsDelaysByRegistrations.vue'
import TemoignagesByGrades from '@/components/statistics/TemoignagesByGrades.vue'

export default {
  components: {
    FiltersStatistics,
    UtilisateursStatistics,
    UtilisateursByDate,
    UtilisateursByDomaines,
    ParticipationsCanceledByBenevoles,
    ParticipationsDelaysByRegistrations,
    TemoignagesByGrades
  },
  layout: 'statistics-public',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.utilisateursStatistics.$fetch()
      this.$refs.utilisateursByDate.$fetch()
      this.$refs.participationsCanceledByBenevoles.$fetch()
      this.$refs.utilisateursByDomaines.$fetch()
      this.$refs.participationsDelaysByRegistrations.$fetch()
      this.$refs.temoignagesByGrades.$fetch()
    }
  }
}
</script>

<style>

</style>
