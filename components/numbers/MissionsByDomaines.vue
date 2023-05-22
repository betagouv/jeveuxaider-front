<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Répartition des missions par domaines d’action" class="mb-6" infos-bulle="Répartition des missions validées ou terminées, créées sur la période par domaines d'action" />
    <div v-if="items" class="flex flex-col gap-2">
      <ListItemCount
        v-for="item in items"
        :key="item.id"
        :color="item.id ? item.id : 'gray-light'"
        :label="item.name ? item.name : 'Sans domaine'"
        :count="item.count"
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
      items: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/missions-by-domaines', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  },
  computed: {
    total () {
      return this.items ? this.items.reduce((acc, curr) => acc + curr.count, 0) : 0
    }
  }
}
</script>
