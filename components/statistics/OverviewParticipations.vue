<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Mises en relation ›" link="/statistiques/participations" no-period class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.participations"
        :title="`${$options.filters.pluralize(statistics.participations, 'Mise en relation', 'Mises en relation', false)}`"
        infos-bulle="Total de mises en relation depuis le début"
      />
      <CardStatistic
        :value="statistics.messages"
        :title="`${$options.filters.pluralize(statistics.messages, 'Message', 'Messages', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.messages, 'échangé', 'échangés', false)}`"
        infos-bulle="Total de messages échangés sur la messagerie depuis le début"
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

    await this.$axios.get('/statistics/public/overview-participations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
