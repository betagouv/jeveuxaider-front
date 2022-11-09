<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Places ›" link="/statistiques/places" no-period class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.places"
        :title="`${$options.filters.pluralize(statistics.places, 'Place', 'Places', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.places, 'proposée', 'proposées', false)}`"
        infos-bulle="Nombre de places proposées à l’instant T"
      />
      <CardStatistic
        :value="statistics.places_left"
        :title="`${$options.filters.pluralize(statistics.places_left, 'Place', 'Places', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.places_left, 'disponible', 'disponibles', false)}`"
        infos-bulle="Nombre de places vacantes à l’instant T"
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

    await this.$axios.get('/statistics/public/overview-places', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
