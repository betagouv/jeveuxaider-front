<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Répartition des organisations par statut" class="mb-6" infos-bulle="Répartition des organisations inscrites sur la période par statut" />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount
        color="draft"
        label="Brouillon"
        :count="statistics.draft"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="waiting"
        label="En attente de validation"
        :count="statistics.waiting"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="in_progress"
        label="En cours de traitement"
        :count="statistics.in_progress"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="validated"
        label="Validée"
        :count="statistics.validated"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="signaled"
        label="Signalée"
        :count="statistics.signaled"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="unsubscribed"
        label="Désinscrite"
        :count="statistics.signaled"
        :total="total"
        display="count_percent"
      />
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
    await this.$axios.get('/statistics/organisations-by-states', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  },
  computed: {
    total () {
      return this.statistics ? Object.values(this.statistics).reduce((a, b) => a + b, 0) : 0
    }
  }
}
</script>
