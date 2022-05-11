<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Statuts des participations" show-period class="mb-6" />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="waiting" label="En attente de validation" :count="statistics.waiting" />
      <ListItemCount color="in_progress" label="En cours de traitement" :count="statistics.in_progress" />
      <ListItemCount color="validated" label="Validée" :count="statistics.validated" />
      <ListItemCount color="canceled" label="Annulée" :count="statistics.canceled" />
      <ListItemCount color="refused" label="Refusée" :count="statistics.refused" />
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
    await this.$axios.get('/statistics/participations-by-states', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
