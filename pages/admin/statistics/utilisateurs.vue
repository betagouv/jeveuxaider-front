<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
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
      <UtilisateursStatistics ref="utilisateursStatistics" class="lg:col-span-2" />
      <Heading as="h2" :level="2">
        Les utilisateurs en détail
      </Heading>
      <UtilisateursByDate ref="utilisateursByDate" class="lg:col-span-2" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <UtilisateursByDomaines ref="utilisateursByDomaines" />
        </div>
        <div class="space-y-12 w-1/2">
          <UtilisateursWithParticipations ref="utilisateursWithParticipations" />
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

export default {
  components: {
    FiltersStatistics,
    UtilisateursStatistics,
    UtilisateursByDate,
    UtilisateursByDomaines,
    UtilisateursWithParticipations
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.utilisateursStatistics.$fetch()
      this.$refs.utilisateursByDomaines.$fetch()
      this.$refs.utilisateursWithParticipations.$fetch()
    }
  }
}
</script>

<style>

</style>
