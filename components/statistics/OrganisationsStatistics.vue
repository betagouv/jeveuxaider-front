<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <BoxHeadingStatistics title="L’activité des organisations en un coup d’oeil" class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.organisations_count"
        :title="`${$options.filters.pluralize(statistics.organisations_count, 'Organisation', 'Organisations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.organisations_count, 'inscrite', 'inscrites', false)}`"
        infos-bulle="Nombre d’organisations qui se sont inscrites sur la période sélectionnée"
      />
      <CardStatistic
        :value="statistics.organisations_validated_count"
        :title="`${$options.filters.pluralize(statistics.organisations_validated_count, 'Organisation', 'Organisations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.organisations_validated_count, 'validée', 'validées', false)}`"
        infos-bulle="Correspond au nombre d’organisations inscrites et validées sur la période"
      />
      <CardStatistic
        :value="`${statistics.organisations_conversion_rate}%`"
        title="Taux de conversion"
        :gauge-percentage="statistics.organisations_conversion_rate"
        infos-bulle="Correspond au ratio entre le nombre d'organisations inscrites et le nombre de organisations validées sur la période"
      />
      <CardStatistic
        :value="`${Math.round((statistics.organisations_response_time_avg / (3600*24)) * 10) / 10} jours`"
        :title="`Temps de réponse`"
        infos-bulle="Temps moyen de traitement des mises en relation reçues sur la période sélectionnée"
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
    await this.$axios.get('/statistics/public/global/organisations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
