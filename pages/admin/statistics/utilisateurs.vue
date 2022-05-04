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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <UtilisateursStatistics ref="utilisateursStatistics" class="lg:col-span-2" />
      <UtilisateursByDate ref="utilisateursByDate" class="lg:col-span-2" />
      <UtilisateursByDomaines ref="utilisateursByDomaines" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import UtilisateursStatistics from '@/components/numbers/UtilisateursStatistics.vue'
import UtilisateursByDate from '@/components/numbers/UtilisateursByDate.vue'
import UtilisateursByDomaines from '@/components/numbers/UtilisateursByDomaines.vue'

export default {
  components: {
    FiltersStatistics,
    UtilisateursStatistics,
    UtilisateursByDate,
    UtilisateursByDomaines
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.utilisateursStatistics.$fetch()
      this.$refs.utilisateursByDate.$fetch()
      this.$refs.utilisateursByDomaines.$fetch()
    }
  }
}
</script>

<style>

</style>
