<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <BoxHeadingStatistics title="L’activité des organisations en un coup d’oeil" class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.organisations_count"
        :title="`${$options.filters.pluralize(statistics.organisations_count, 'Nouvelle organisation', 'Nouvelles organisations', false)}`"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="`${Math.round((statistics.organisations_response_time_avg / (3600*24)) * 10) / 10} jours`"
        :title="`Temps de réponse`"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="`${statistics.organisations_response_ratio_avg}%`"
        :title="`Taux de réponse`"
        link="/admin/statistics/organisations"
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
    await this.$axios.get('/statistics/global/organisations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
