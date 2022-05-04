<template>
  <div>
    <Box padding="sm" :loading="loading" loading-text="Récupération des missions...">
      <Heading as="h2" :level="3" class="mb-4">
        En attente de validation
      </Heading>
      <StackedList v-if="items" :divided="false">
        <StackedListItem
          v-for="item, i in items"
          :key="i"
          :icon="`${(i+1)}.`"
          icon-class="text-xl font-semibold text-gray-500"
          :link="`/admin/missions?filter[department]=${item.department}&filter[state]=En attente de validation`"
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

export default {
  components: {

  },
  data () {
    return {
      loading: true,
      items: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/missions-waiting-by-departments', {
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
