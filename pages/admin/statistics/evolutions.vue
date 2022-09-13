<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Évolutions' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Évolutions des indicateurs clés"
      secondary-title-bottom="Tableau des indicateurs avec leurs variations sur le mois précédent"
    >
      <!-- <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template> -->
    </SectionHeading>

    <div class="space-y-12">
      <EvolutionsByMonth ref="evolutionsByMonth" />
    </div>
  </div>
</template>

<script>
// import FiltersStatistics from '@/components/custom/FiltersStatistics'
import EvolutionsByMonth from '@/components/numbers/EvolutionsByMonth.vue'

export default {
  components: {
    // FiltersStatistics,
    EvolutionsByMonth
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.evolutionsByMonth.$fetch()
    }
  }
}
</script>

<style>

</style>
