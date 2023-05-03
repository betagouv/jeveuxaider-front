<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Répartition des participations par statut"
      class="mb-6"
      infos-bulle="Répartition des participations sur la période par statut"
    />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="waiting" label="En attente de validation" :count="statistics.waiting" :total="total" display="count_percent" />
      <ListItemCount color="in_progress" label="En cours de traitement" :count="statistics.in_progress" :total="total" display="count_percent" />
      <ListItemCount color="validated" label="Validée" :count="statistics.validated" :total="total" display="count_percent" />
      <ListItemCount color="canceled" label="Annulée" :count="statistics.canceled" :total="total" display="count_percent" />
      <ListItemCount color="refused" label="Refusée" :count="statistics.refused" :total="total" display="count_percent" />
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
  },
  computed: {
    total () {
      return this.statistics ? Object.values(this.statistics).reduce((a, b) => a + b) : 0
    }
  }
}
</script>
