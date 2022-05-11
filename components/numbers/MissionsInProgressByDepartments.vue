<template>
  <div>
    <Box padding="sm" :loading="loading" loading-text="Récupération des missions...">
      <BoxHeadingStatistics title="Missions en cours de traitement" subtitle="Classées par départements" class="mb-6" />
      <StackedList v-if="items" :divided="false">
        <StackedListItem
          v-for="item, i in items"
          :key="i"
          :icon="`${(i+1)}.`"
          icon-class="text-xl font-semibold text-gray-500"
          :link="`/admin/missions?filter[department]=${item.department}&filter[state]=En cours de traitement`"
        >
          <div class="text-gray-900 font-semibold">
            {{ item.department }} - {{ item.department | label('departments') }}
          </div>
          <div class="text-gray-500 text-sm">
            {{ $options.filters.pluralize(item.count, 'mission', 'missions') }}
          </div>
        </StackedListItem>
      </StackedList>
    </Box>
  </div>
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
    await this.$axios.get('/statistics/missions-in-progress-by-departments', {
      // params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  }
}
</script>

<style>

</style>
