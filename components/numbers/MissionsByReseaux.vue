<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des réseaux...">
    <BoxHeadingStatistics title="Réseaux les plus actifs" class="mb-6" infos-bulle="Liste des réseaux ayant créé le plus de missions validées sur la période sélectionnée" />
    <StackedList v-if="items" :divided="false">
      <StackedListItem
        v-for="item, i in items"
        :key="i"
        :icon="`${(i+1)}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/missions?filter[structure.reseaux.name]=${item.name}&filter[structure.reseaux.id]=${item.id}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-500 text-sm">
          {{ $options.filters.pluralize(item.count, 'mission validée', 'missions validées') }}
        </div>
      </StackedListItem>
    </StackedList>
  </Box>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default {
  components: {
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
    await this.$axios.get('/statistics/missions-by-reseaux', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  }
}
</script>

<style>

</style>
