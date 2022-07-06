<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Âge à l'inscription" class="mb-6" infos-bulle="Âge de l'utilisateur lorsqu'il s'est inscrit" />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="bg-green-900" label="Moins de 18 ans" :count="statistics.LESS_THAN_18" display="percent" :total="total" />
      <ListItemCount color="bg-green-800" label="Entre 18 et 25 ans" :count="statistics.BETWEEN_18_AND_25" display="percent" :total="total" />
      <ListItemCount color="bg-green-700" label="Entre 25 et 35 ans" :count="statistics.BETWEEN_25_AND_35" display="percent" :total="total" />
      <ListItemCount color="bg-green-600" label="Entre 35 et 45 ans" :count="statistics.BETWEEN_35_AND_45" display="percent" :total="total" />
      <ListItemCount color="bg-green-500" label="Entre 45 et 55 ans" :count="statistics.BETWEEN_45_AND_55" display="percent" :total="total" />
      <ListItemCount color="bg-green-400" label="Entre 55 et 65 ans" :count="statistics.BETWEEN_55_AND_65" display="percent" :total="total" />
      <ListItemCount color="bg-green-300" label="Entre 65 et 75 ans" :count="statistics.BETWEEN_65_AND_75" display="percent" :total="total" />
      <ListItemCount color="bg-green-200" label="Plus de 75 ans" :count="statistics.MORE_THAN_75" display="percent" :total="total" />
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
    await this.$axios.get('/statistics/public/utilisateurs-by-age', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  },
  computed: {
    total () {
      return Object.values(this.statistics).reduce((a, b) => a + b)
    }
  }
}
</script>
