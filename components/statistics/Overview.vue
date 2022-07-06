<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Vue d'ensemble" no-period class="mb-6" />

    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.benevoles"
        :title="`${$options.filters.pluralize(statistics.benevoles, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.benevoles, 'inscrit', 'inscrits', false)}`"
        :infos-bulle="`Correspond au nombre de bénévoles inscrits en ${$route.params.year}`"
      />
      <CardStatistic
        :value="statistics.participations"
        :title="`${$options.filters.pluralize(statistics.participations, 'Participation', 'Participations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.participations, 'effectuée', 'effectuées', false)}`"
        :infos-bulle="`Correspond au nombre de participations effectuées en ${$route.params.year}`"
      />
      <CardStatistic
        :value="statistics.organisations"
        :title="`${$options.filters.pluralize(statistics.organisations, 'Organisation', 'Organisations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.organisations, 'inscrite', 'inscrites', false)}`"
        :infos-bulle="`Correspond au nombre d’organisations inscrites et validées en ${$route.params.year}`"
      />
      <CardStatistic
        :value="statistics.missions"
        :title="`${$options.filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions, 'mis en ligne', 'mises en ligne', false)}`"
        :infos-bulle="`Correspond aux missions créées en ${$route.params.year}, qui sont validées ou bien terminées`"
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

    await this.$axios.get('/statistics/public/overview', {
      params: { ...this.$store.state.statistics.params }
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
