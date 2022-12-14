<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Vue d'ensemble du trafic entrant" class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.periodRedirections"
        title="Redirections"
        subtitle="sur la période"
        infos-bulle="Nombre de redirections des partenaires vers JVA sur la période"
      />
      <CardStatistic
        :value="statistics.periodApplications"
        title="Candidatures"
        subtitle="sur la période"
        infos-bulle="Nombre de candidatures des partenaires vers JVA depuis le début"
      />
      <CardStatistic
        :value="statistics.totalRedirections"
        title="Redirections"
        subtitle="au total"
        infos-bulle="Nombre de redirections des partenaires vers JVA sur la période"
      />
      <CardStatistic
        :value="statistics.totalApplications"
        title="Candidatures"
        subtitle="au total"
        infos-bulle="Nombre de candidatures des partenaires vers JVA depuis le début"
      />
    </div>
  </Box>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics'

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

    await this.$axios.get('/statistics/overview-api-engagement-entrant', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
