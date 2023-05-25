<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Responsables ›" link="/support/responsables/participations-to-be-treated" no-period class="mb-6" />
    <div v-if="overview" class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="overview.responsables_online_count"
        title="En ligne"
        infos-bulle="Connectés il y a moins de 10 minutes"
        :subtitle="`sur ${$options.filters.formatNumber(overview.responsables_count)} responsables`"
      />
      <CardStatistic
        :value="overview.responsables_inactive_count"
        title="Inactifs"
        infos-bulle="Non connectés depuis plus d'un mois"
        subtitle="depuis plus d'un mois"
      />
      <CardStatistic
        :value="overview.participations_need_to_be_treated_count"
        title="Participations"
        subtitle="à modérer"
        infos-bulle="Nombre de participations à modérer (en attente de validation depuis 10 jours ou en cours de traitement depuis 2 mois)"
      />
      <CardStatistic
        :value="overview.participations_waiting_count"
        title="Participations"
        subtitle="en attente de validation"
        infos-bulle="Nombre de participations en attente de validation depuis 10 jours"
      />
      <CardStatistic
        :value="overview.participations_in_progress_count"
        title="Participations"
        subtitle="en cours de traitement"
        infos-bulle="Nombre de participations en cours de traitement depuis 2 mois"
      />
      <CardStatistic
        :value="overview.missions_outdated_count"
        title="Missions"
        subtitle="périmées"
        infos-bulle="Nombre de missions validées dont la date de fin est passée"
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
      overview: null
    }
  },
  async fetch () {
    this.loading = true

    await this.$axios.get('/support/responsables/overview').then((response) => {
      this.loading = false
      this.overview = response.data
    })
  }
}
</script>
