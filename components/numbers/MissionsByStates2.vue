<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <Heading as="h2" :level="3" class="mb-4">
      Par statuts
    </Heading>
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="draft" label="Brouillon" :count="statistics.draft" />
      <ListItemCount color="waiting" label="En attente de validation" :count="statistics.waiting" />
      <ListItemCount color="in_progress" label="En cours de traitement" :count="statistics.in_progress" />
      <ListItemCount color="validated" label="Validée" :count="statistics.validated" />
      <ListItemCount color="finished" label="Terminée" :count="statistics.finished" />
      <ListItemCount color="canceled" label="Annulée" :count="statistics.canceled" />
      <ListItemCount color="signaled" label="Signalée" :count="statistics.signaled" />
    </div>
  </Box>
</template>

<script>
import ListItemCount from '@/components/custom/ListItemCount.vue'
export default {
  components: {
    ListItemCount
  },
  data () {
    return {
      loading: true,
      statistics: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/missions-by-states', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
