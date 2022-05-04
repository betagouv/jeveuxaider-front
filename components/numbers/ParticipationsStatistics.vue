<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <Heading as="h2" :level="3" class="mb-4">
      Statistiques globales
    </Heading>
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.participations_actives"
        :title="`${$options.filters.pluralize(statistics.participations_actives, 'Participation active', 'Participations actives', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.participations)}`"
        link="/admin/statistics/participations"
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
    await this.$axios.get('/statistics/global/participations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
