<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des réseaux...">
    <Heading as="h2" :level="3" class="mb-4">
      Topito des réseaux
    </Heading>
    <StackedList v-if="items" :divided="false">
      <StackedListItem
        v-for="item, i in items"
        :key="i"
        :icon="`${(i+1)}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/contenus/reseaux/${item.id}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-500 text-sm">
          {{ $options.filters.pluralize(item.count, 'antenne', 'antennes') }}
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
    await this.$axios.get('/statistics/organisations-by-reseaux', {
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
