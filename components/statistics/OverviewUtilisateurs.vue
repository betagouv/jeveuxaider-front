<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Utilisateurs ›" link="/statistiques/utilisateurs" no-period class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.utilisateurs"
        :title="`${$options.filters.pluralize(statistics.utilisateurs, 'Utilisateur', 'Utilisateurs', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.utilisateurs, 'inscrit', 'inscrits', false)}`"
        infos-bulle="Nombre total d’utilisateurs inscrits sur JeVeuxAider.gouv.fr"
      />
      <CardStatistic
        :value="statistics.benevoles"
        :title="`${$options.filters.pluralize(statistics.benevoles, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.benevoles, 'inscrit', 'inscrits', false)}`"
        infos-bulle="Nombre total d’utilisateurs inscrits en tant que “bénévoles” sur JeVeuxAider.gouv.fr"
      />
      <CardStatistic
        :value="statistics.benevoles_visibles_marketplace"
        :title="`${$options.filters.pluralize(statistics.benevoles_visibles_marketplace, 'Bénévole visible', 'Bénévoles visibles', false)}`"
        subtitle="pour une mise en relation inversée"
        infos-bulle="Nombre de bénévoles visibles pour une mise en relation inversée"
      />
    </div>
  </Box>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default {
  components: {
    CardStatistic,
    BoxHeadingStatistics
  },
  data () {
    return {
      loading: true,
      statistics: null
    }
  },
  async fetch () {
    this.loading = true

    await this.$axios.get('/statistics/public/overview-utilisateurs', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
