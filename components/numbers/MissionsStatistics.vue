<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <Heading as="h2" :level="3" class="mb-4">
      Statistiques globales
    </Heading>
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.missions_actives"
        :title="`${$options.filters.pluralize(statistics.missions_actives, 'Mission active', 'Missions actives', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.missions)}`"
        link="/admin/missions"
      />
      <CardStatistic
        :value="statistics.missions_libres_actives"
        :title="`${$options.filters.pluralize(statistics.missions_libres_actives, 'Active sans modèle', 'Actives sans modèle', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.missions_libres)}`"
        link="/admin/missions"
      />
      <CardStatistic
        :value="statistics.missions_templates_actives"
        :title="`${$options.filters.pluralize(statistics.missions_templates_actives, 'Active avec modèle', 'Actives avec modèle', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.missions_templates)}`"
        link="/admin/missions"
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
    await this.$axios.get('/statistics/global/missions', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
