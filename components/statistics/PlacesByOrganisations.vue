<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des organisations...">
    <BoxHeadingStatistics title="Organisations avec le plus de places" no-period class="mb-6" infos-bulle="Liste des organisations avec le plus de places disponibles en ce moment" />
    <StackedList v-if="items" :divided="false">
      <StackedListItem
        v-for="item, i in items"
        :key="i"
        :icon="`${(i+1)}.`"
        icon-class="text-xl font-semibold text-gray-500"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-500 text-sm">
          {{ $options.filters.pluralize(item.count, 'place disponible', 'places disponibles') }}
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
    await this.$axios.get('/statistics/public/places-by-organisations', {
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
