<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <BoxHeadingStatistics title="Les utilisateurs en un coup d’oeil" class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.utilisateurs"
        :title="`${$options.filters.pluralize(statistics.utilisateurs, 'Utilisateur', 'Utilisateurs', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.utilisateurs, 'inscrit', 'inscrits', false)}`"
        infos-bulle="Nombre d'utilisateurs inscrits sur la période"
      />
      <CardStatistic
        :value="statistics.benevoles"
        :title="`${$options.filters.pluralize(statistics.benevoles, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.benevoles, 'inscrit', 'inscrits', false)}`"
        infos-bulle="Nombre de bénévoles inscrits sur la période"
      />
      <CardStatistic
        :value="statistics.benevoles_visibles_marketplace"
        :title="`${$options.filters.pluralize(statistics.benevoles_visibles_marketplace, 'Bénévole visible', 'Bénévoles visibles', false)}`"
        subtitle="pour une mise en relation inversée"
        infos-bulle="Nombre de bénévoles inscrits sur la période et visibles pour une mise en relation inversée"
      />
      <CardStatistic
        :value="statistics.benevoles_notifications_martketplace"
        :title="`${$options.filters.pluralize(statistics.benevoles_notifications_martketplace, 'Demande', 'Demandes', false)}`"
        subtitle="de mise en relation par les organisations"
        infos-bulle="Nombre de notifications envoyées aux bénévoles sur la période pour les inviter à participer à leurs missions"
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
    await this.$axios.get('/statistics/public/global/utilisateurs', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
