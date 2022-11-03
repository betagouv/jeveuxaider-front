<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Organisations ›" no-period class="mb-6" link="/statistiques/organisations" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.organisations"
        :title="`${$options.filters.pluralize(statistics.organisations, 'Organisation', 'Organisations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.organisations, 'inscrite', 'inscrites', false)}`"
        infos-bulle="Nombre d’organisations inscrites depuis le début"
      />
      <CardStatistic
        :value="statistics.organisations_actives"
        :title="`${$options.filters.pluralize(statistics.organisations_actives, 'Organisation', 'Organisations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.organisations, 'active', 'actives', false)}`"
        infos-bulle="Nombre d’organisations ayant au moins une mission en ligne"
      />
      <CardStatistic
        :value="statistics.territoires"
        :title="`${$options.filters.pluralize(statistics.territoires, 'Territoire', 'Territoires', false)}`"
        subtitle="en ligne"
        infos-bulle="Nombre de territoires en ligne en ce moment"
      />
      <CardStatistic
        :value="statistics.reseaux"
        :title="`${$options.filters.pluralize(statistics.reseaux, 'Réseau', 'Réseaux', false)}`"
        subtitle="en ligne"
        infos-bulle="Nombre de territoires en ligne en ce moment"
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

    await this.$axios.get('/statistics/public/overview-organisations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
