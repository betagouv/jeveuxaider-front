<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des activités...">
    <BoxHeadingStatistics
      title="Activités avec le plus de places"
      no-period
      class="mb-6"
      infos-bulle="Liste des activités avec le plus de places disponibles en ce moment"
    />
    <div v-if="items" class="flex flex-col gap-2">
      <ListItemCount
        v-for="item in items"
        :key="item.id"
        :label="item.name ? activityLabelWithIconResolver(item.id) : 'Sans activité'"
        :count="item.count"
        :total="total"
        display="count_percent"
      />
    </div>
  </BaseBox>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'
import ListItemCount from '@/components/custom/ListItemCount.vue'
import activities from '@/assets/activities.json'

export default defineNuxtComponent({
  components: {
    BoxHeadingStatistics,
    ListItemCount,
  },
  data() {
    return {
      activities,
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
      await apiFetch('/statistics/public/places-by-activities', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
    activityLabelWithIconResolver(activityId) {
      return this.activities.find((a) => a.id === activityId)?.label
    },
  },
  computed: {
    total() {
      return this.items ? this.items.reduce((acc, curr) => acc + curr.count, 0) : 0
    },
  },
})
</script>
