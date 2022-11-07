<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Motifs des participations refusées" class="mb-6" infos-bulle="Répartition des motifs de refus pour les mises en relation sur la période sélectionnée" />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="no_response" label="Le bénévole ne répond pas" :count="statistics.no_response" />
      <ListItemCount color="requirements_not_fulfilled" label="Le bénévole ne correspond pas aux besoins" :count="statistics.requirements_not_fulfilled" />
      <ListItemCount color="change_mind" label="Le bénévole a changé d'avis." :count="statistics.change_mind" />
      <ListItemCount color="mission_terminated" label="La mission est terminée." :count="statistics.mission_terminated" />
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
    await this.$axios.get('/statistics/participations-refused-by-responsables', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
