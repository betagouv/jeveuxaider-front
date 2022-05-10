<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <div class="mb-6">
      <Heading as="h2" :level="3">
        Chiffres clés
      </Heading>
      <div class="text-gray-400 font-semibold">
        Sur la période XXX
      </div>
    </div>
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.organisations_count"
        :title="`${$options.filters.pluralize(statistics.organisations_count, 'Organisation', 'Organisations', false)}`"
        subtitle="inscrites"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="`${statistics.organisations_response_time_avg}sec`"
        :title="`Temps de réponse`"
        subtitle="en moyenne"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="`${statistics.organisations_response_ratio_avg}%`"
        :title="`Taux de réponse`"
        subtitle="en moyenne"
        link="/admin/statistics/organisations"
      />
    </div>
  </Box>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'

export default {
  components: {
    CardStatistic
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
