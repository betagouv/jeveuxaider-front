<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Missions" subtitle="Aperçu de l'offre actuelle" class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.missions_available"
        :title="`${$options.filters.pluralize(statistics.missions_available, 'Mission', 'Missions', false)}`"
        subtitle="en ligne"
        link="/admin/statistics/missions"
      />
      <CardStatistic
        :value="statistics.places_left"
        :title="`${$options.filters.pluralize(statistics.places_left, 'Place restante', 'Places restantes', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.places)} proposées`"
      />
      <CardStatistic :value="`${statistics.places_occupation_rate}%`" title="Taux de remplissage" :gauge-percentage="statistics.places_occupation_rate" />
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

    await this.$axios.get('/statistics/overview-missions', {
      // params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
