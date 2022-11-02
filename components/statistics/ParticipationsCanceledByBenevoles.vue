<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Motifs des participations annulées par les bénévoles" class="mb-6" infos-bulle="Répartition des motifs d'annulation des bénévoles sur la période" />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="no_response" label="L'organisation ne répond pas" :count="statistics.no_response" />
      <ListItemCount color="requirements_not_fulfilled" label="La mission ne correspond pas à mes attentes" :count="statistics.requirements_not_fulfilled" />
      <ListItemCount color="not_available" label="Je ne suis plus disponible" :count="statistics.not_available" />
      <ListItemCount color="other" label="Autres" :count="statistics.other" />
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
    await this.$axios.get('/statistics/public/participations-canceled-by-benevoles', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
