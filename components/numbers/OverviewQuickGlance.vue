<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="L’activité sur JeVeuxAider.gouv.fr en un coup d’oeil" show-period class="mb-6" />

    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.organisations"
        :title="`${$options.filters.pluralize(statistics.organisations, 'Organisation', 'Organisations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.organisations, 'inscrite', 'inscrites', false)}`"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="statistics.missions"
        :title="`${$options.filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions, 'créée', 'créées', false)}`"
        link="/admin/statistics/missions"
      />
      <CardStatistic
        :value="statistics.participations"
        :title="`${$options.filters.pluralize(statistics.participations, 'Participation', 'Participations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.participations, 'proposée', 'proposées', false)}`"
        link="/admin/statistics/participations"
      />
      <CardStatistic
        :value="statistics.utilisateurs"
        :title="`${$options.filters.pluralize(statistics.utilisateurs, 'Utilisateur', 'Utilisateurs', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.utilisateurs, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
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

    await this.$axios.get('/statistics/overview-quick-glance', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
