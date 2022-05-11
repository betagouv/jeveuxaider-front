<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <BoxHeadingStatistics title="Chiffres clés" show-period class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.missions"
        :title="`${$options.filters.pluralize(statistics.missions, 'Nouvelle mission', 'Nouvelles missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions, 'créée', 'créées', false)}`"
        link="/admin/missions"
      />
      <CardStatistic
        :value="statistics.missions_participations_max_sum"
        :title="`${$options.filters.pluralize(statistics.missions_participations_max_sum, 'Nouvelle place ', 'Nouvelles places', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_participations_max_sum, 'proposée', 'proposées', false)}`"
        link="/admin/missions"
      />
      <CardStatistic
        :value="statistics.missions_snu"
        :title="`${$options.filters.pluralize(statistics.missions_snu, 'Nouvelle mission', 'Nouvelles missions', false)}`"
        subtitle="SNU MIG"
        link="/admin/missions"
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
    await this.$axios.get('/statistics/global/missions', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
