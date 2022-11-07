<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <BoxHeadingStatistics title="Les mises en relation en un coup d’oeil" class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.participations"
        :title="`${$options.filters.pluralize(statistics.participations, 'Mise en relation', 'Mises en relation', false)}`"
        infos-bulle="Total du nombre de mises en relation créées sur la période sélectionnée"
      />
      <CardStatistic
        :value="statistics.messages"
        :title="`${$options.filters.pluralize(statistics.messages, 'Message', 'Messages', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.messages, 'échangé', 'échangés', false)}`"
        infos-bulle="Total de messages échangés sur la messagerie sur la période sélectionnée"
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
    await this.$axios.get('/statistics/public/global/participations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
