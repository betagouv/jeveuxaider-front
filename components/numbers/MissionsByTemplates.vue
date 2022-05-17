<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des activités...">
    <BoxHeadingStatistics title="Modèles de missions les plus utilisés" show-period class="mb-6" />

    <StackedList v-if="items" :divided="false">
      <StackedListItem
        v-for="item, i in items"
        :key="i"
        :icon="`${(i+1)}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/missions?filter[template.id]=${item.id}&template_name=${item.title}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.title" />
        <div class="text-gray-500 text-sm">
          {{ $options.filters.pluralize(item.count, 'mission', 'missions') }}
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
    await this.$axios.get('/statistics/missions-by-templates', {
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
