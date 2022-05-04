<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des activités...">
    <Heading as="h2" :level="3" class="mb-4">
      Topito des modèles
    </Heading>
    <StackedList v-if="items" :divided="false">
      <StackedListItem
        v-for="item, i in items"
        :key="i"
        :icon="`${(i+1)}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/missions`"
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
export default {
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
