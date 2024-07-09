<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Domaines d’action avec le plus de places"
      no-period
      class="mb-6"
      infos-bulle="Liste des domaines d'action avec le plus de places disponibles en ce moment"
    />
    <div v-if="items" class="flex flex-col gap-2">
      <ListItemCount
        v-for="item in items"
        :key="item.id"
        :color="item.id ? item.id : 'gray-light'"
        :label="item.name ? item.name : 'Sans domaine'"
        :count="item.count"
        :total="total"
        display="count_percent"
      />
    </div>
  </BaseBox>
</template>

<script>
import ListItemCount from '@/components/custom/ListItemCount.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    ListItemCount,
    BoxHeadingStatistics,
  },
  data() {
    return {
      loading: true,
      items: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/statistics/public/places-by-domaines', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
  computed: {
    total() {
      return this.items ? this.items.reduce((acc, curr) => acc + curr.count, 0) : 0
    },
  },
})
</script>
