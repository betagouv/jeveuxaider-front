<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <BoxHeadingStatistics title="L’activité relative aux missions en un coup d’oeil" class="mb-6" />
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.missions"
        :title="`${$options.filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions, 'créée', 'créées', false)}`"
        link="/admin/missions"
        infos-bulle="Nombre de missions créées sur la période"
      />
      <CardStatistic
        :value="statistics.missions_participations_max_sum"
        :title="`${$options.filters.pluralize(statistics.missions_participations_max_sum, 'Place', 'Places', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_participations_max_sum, 'proposée', 'proposées', false)}`"
        infos-bulle="Total de places proposées des missions créées sur la période"
      />
      <CardStatistic
        :value="statistics.missions_snu"
        :title="`${$options.filters.pluralize(statistics.missions_snu, 'Mission SNU-MIG', 'Missions SNU-MIG', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_snu, 'créée', 'créées', false)}`"
        link="/admin/missions"
        infos-bulle="Nombre de missions proposées sur le SNU via JeVeuxAider.gouv.fr, parmi les missions créées sur la période"
      />
      <CardStatistic
        :value="statistics.missions_snu_participations_max_sum"
        :title="`${$options.filters.pluralize(statistics.missions_snu_participations_max_sum, 'Place SNU-MIG', 'Places SNU-MIG', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_snu_participations_max_sum, 'proposée', 'proposées', false)}`"
        infos-bulle="Total des places proposées sur le SNU via JeVeuxAider.gouv.fr, parmi les missions créées sur la période"
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
    await this.$axios.get('/statistics/global/missions', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
