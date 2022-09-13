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
      secondary-title-bottom="Indicateurs avec leurs variations par rapport à l'année précédente"
    />

    <div class="space-y-12">
      <EvolutionsByYear ref="evolutionsByYear" />
      <EvolutionsByMonth ref="evolutionsByMonth" />
    </div>
  </div>
</template>

<script>
import EvolutionsByYear from '@/components/numbers/EvolutionsByYear.vue'
import EvolutionsByMonth from '@/components/numbers/EvolutionsByMonth.vue'

export default {
  components: {
    EvolutionsByYear,
    EvolutionsByMonth
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
