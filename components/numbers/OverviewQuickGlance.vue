<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="L’activité sur JeVeuxAider.gouv.fr en un coup d’oeil" class="mb-6" />

    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.organisations"
        :title="`${$options.filters.pluralize(statistics.organisations, 'Organisation', 'Organisations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.organisations, 'validée', 'validées', false)}`"
        link="/admin/statistics/organisations"
        infos-bulle="Correspond au nombre d’organisations inscrites et validées sur la période"
      />
      <CardStatistic
        :value="statistics.missions"
        :title="`${$options.filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions, 'validée ou terminée', 'validées ou terminées', false)}`"
        link="/admin/statistics/missions"
        infos-bulle="Correspond aux missions créées sur la période, qui sont validées ou bien terminées"
      />
      <CardStatistic
        :value="statistics.participations"
        :title="`${$options.filters.pluralize(statistics.participations, 'Participation', 'Participations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.participations, 'validée', 'validées', false)}`"
        link="/admin/statistics/participations"
        infos-bulle="Correspond au nombre de participations validées sur la période"
      />
      <CardStatistic
        :value="statistics.utilisateurs"
        :title="`${$options.filters.pluralize(statistics.utilisateurs, 'Utilisateur', 'Utilisateurs', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.utilisateurs, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Correspond au nombre d’utilisateurs inscrits sur la période"
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

    await this.$axios.get('/statistics/overview-quick-glance', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
