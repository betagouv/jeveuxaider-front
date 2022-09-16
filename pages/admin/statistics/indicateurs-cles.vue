<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Statistiques', link: '/admin/statistics' },
          { label: 'Indicateurs clés' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Indicateurs clés"
      secondary-title-bottom="Évolution des indicateurs avec leurs variations par rapport à l'année précédente"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <EvolutionsByYear ref="evolutionsByYear" />
      <EvolutionsByMonth ref="evolutionsByMonth" />
    </div>
  </div>
</template>

<script>
import EvolutionsByYear from '@/components/numbers/EvolutionsByYear.vue'
import EvolutionsByMonth from '@/components/numbers/EvolutionsByMonth.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics'

export default {
  components: {
    EvolutionsByYear,
    EvolutionsByMonth,
    FiltersStatistics
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.evolutionsByYear.$fetch()
      this.$refs.evolutionsByMonth.$fetch()
    }
  }
}
</script>

<style>

</style>
