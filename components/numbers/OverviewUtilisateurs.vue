<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Utilisateurs ›" link="/admin/statistics/utilisateurs" no-period class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.utilisateurs"
        :title="`${$options.filters.pluralize(statistics.utilisateurs, 'Utilisateur', 'Utilisateurs', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.utilisateurs, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre de tous les utilisateurs inscrits depuis le début"
      />
      <CardStatistic
        :value="statistics.benevoles"
        :title="`${$options.filters.pluralize(statistics.benevoles, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.benevoles, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre de tous les bénévoles inscrits depuis le début"
      />
      <CardStatistic
        :value="statistics.benevoles_actifs"
        :title="`${$options.filters.pluralize(statistics.benevoles_actifs, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.benevoles_actifs, 'actif', 'actifs', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre de bénévoles ayant fait au moins une demande de candidature depuis le début"
      />
      <CardStatistic
        :value="statistics.participations_validated"
        :title="`${$options.filters.pluralize(statistics.participations_validated, 'Participation', 'Participations', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.participations_validated, 'validée', 'validées', false)}`"
        link="/admin/statistics/participations"
        infos-bulle="Nombre de participations validées depuis le début"
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

    await this.$axios.get('/statistics/overview-utilisateurs', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
