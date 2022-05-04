<template>
  <div>
    <Box padding="sm" :loading="loading" loading-text="Récupération des missions...">
      <Heading as="h2" :level="3" class="mb-4">
        Dont la date de fin est passée
      </Heading>
      <StackedList v-if="items" :divided="false">
        <StackedListItem
          v-for="item, i in items"
          :key="i"
          :icon="`${(i+1)}.`"
          icon-class="text-xl font-semibold text-gray-500"
          :link="`/admin/missions?context_name=${item.name}&filter[structure.id]=${item.id}&filter[state]=Validée&filter[date]=over`"
        >
          <div class="text-gray-900 font-semibold" v-html="item.name" />
          <div class="text-gray-500 text-sm">
            {{ $options.filters.pluralize(item.count, 'mission', 'missions') }}
          </div>
        </StackedListItem>
      </StackedList>
    </Box>
  </div>
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
    await this.$axios.get('/statistics/missions-outdated-by-organisations', {
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
