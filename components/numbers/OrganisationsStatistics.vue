<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <Heading as="h2" :level="3" class="mb-4">
      Statistiques globales
    </Heading>
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.associations_actives"
        :title="`${$options.filters.pluralize(statistics.associations_actives, 'Association active', 'Associations actives', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.associations)}`"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="statistics.collectivites_actives"
        :title="`${$options.filters.pluralize(statistics.collectivites_actives, 'Collectivité active', 'Collectivités actives', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.collectivites)}`"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="statistics.organisations_publiques_actives"
        :title="`${$options.filters.pluralize(statistics.organisations_publiques_actives, 'Orga. publique active', 'Orgas. publiques actives', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations_publiques)}`"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="statistics.organisations_privees_actives"
        :title="`${$options.filters.pluralize(statistics.organisations_privees_actives, 'Orga. privée active', 'Orgas. privées actives', false)}`"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations_privees)}`"
        link="/admin/statistics/organisations"
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
    await this.$axios.get('/statistics/global/organisations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}

</script>
