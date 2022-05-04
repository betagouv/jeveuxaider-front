<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <Heading as="h2" :level="3" class="mb-4">
      Par domaines
    </Heading>
    <div v-if="items" class="flex flex-col gap-2">
      <ListItemCount v-for="item in items" :key="item.id" :color="item.id" :label="item.name" :count="item.count" />
    </div>
  </Box>
</template>

<script>

import ListItemCount from '@/components/custom/ListItemCount.vue'
export default {
  components: {
    ListItemCount
  },
  data () {
    return {
      loading: true,
      items: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/organisations-by-domaines', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  }
}
</script>
