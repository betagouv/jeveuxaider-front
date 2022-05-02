<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des organisations...">
    <Heading as="h2" :level="3" class="mb-4">
      Organisations les plus attractives
    </Heading>
    <StackedList v-if="items" :divided="false">
      <StackedListItem
        v-for="item, i in items"
        :key="i"
        :icon="`${(i+1)}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/organisations/${item.id}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-500 text-sm">
          {{ $options.filters.pluralize(item.count, 'participation', 'participations') }}
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
    await this.$axios.get('/numbers/participations-by-organisations', {
      params: this.$store.state.numbers.params
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  }
}
</script>

<style>

</style>
