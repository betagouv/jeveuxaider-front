<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Missions ›" link="/admin/statistics/missions" no-period class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.missions_available"
        :title="`${$options.filters.pluralize(statistics.missions_available, 'Mission', 'Missions', false)}`"
        subtitle="en ligne"
        link="/admin/statistics/missions"
        infos-bulle="Nombre de missions en ligne à l’instant T"
      />
      <CardStatistic
        :value="statistics.missions_validated_and_over"
        :title="`${$options.filters.pluralize(statistics.missions_validated_and_over, 'Mission', 'Missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_validated_and_over, 'validée ou terminée', 'validées ou terminées', false)}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions créées, qui sont validées ou bien terminées"
      />
      <CardStatistic
        :value="statistics.missions_snu"
        :title="`${$options.filters.pluralize(statistics.missions_snu, 'Mission SNU-MIG', 'Missions SNU-MIG', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_snu, 'validée ou terminée', 'validée ou terminées', false)}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions proposées en MIG, qui sont validées ou bien terminées"
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

    await this.$axios.get('/statistics/overview-missions', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
