<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Délais d'engagement" class="mb-6" infos-bulle="Délais d'engagement sur la période entre l'inscription d'un utilisateur et sa première demande de candidature" />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="bg-green-900" label="Moins de une minute" :count="statistics.LESS_THAN_1_MIN" />
      <ListItemCount color="bg-green-700" label="Moins de 5 minutes" :count="statistics.LESS_THAN_5_MIN" />
      <ListItemCount color="bg-green-500" label="Moins de une heure" :count="statistics.LESS_THAN_1_HOUR" />
      <ListItemCount color="bg-green-300" label="Moins de un jour" :count="statistics.LESS_THAN_1_DAY" />
      <ListItemCount color="bg-green-100" label="Moins de 5 jours" :count="statistics.LESS_THAN_5_DAYS" />
      <ListItemCount color="bg-green-50" label="Plus de 5 jours" :count="statistics.OTHER" />
    </div>
  </Box>
</template>

<script>
import ListItemCount from '@/components/custom/ListItemCount.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default {
  components: {
    ListItemCount,
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
    await this.$axios.get('/statistics/public/participations-delays-by-registrations', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
