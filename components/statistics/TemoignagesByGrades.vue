<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Retours des bénévoles sur leurs missions"
      class="mb-6"
      infos-bulle="Fonctionnalité mise en place au mois de septembre 2021"
    />
    <div v-if="items" class="flex flex-col gap-2">
      <div v-for="(item, i) in items" :key="i" class="flex justify-between items-center">
        <ClientOnly>
          <StarRating
            v-model:rating="item.grade"
            :show-rating="false"
            inactive-color="#E0E0E0"
            active-color="#EF9F03"
            :read-only="true"
            :star-size="30"
          />
        </ClientOnly>

        <div class="font-medium">
          {{ item.count }}
          <span class="text-gray-500 text-sm"> ({{ Math.round(item.percent * 100) }}%)</span>
        </div>
      </div>
    </div>
  </BaseBox>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
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
      await apiFetch('/statistics/public/temoignages-by-grades', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
    gradeBgClass(grade) {
      switch (grade) {
        case 5:
          return 'bg-yellow-500'
        case 4:
          return 'bg-yellow-400'
        case 3:
          return 'bg-yellow-300'
        case 2:
          return 'bg-yellow-200'
        case 1:
          return 'bg-yellow-100'
        default:
          return 'gray-light'
      }
    },
  },
})
</script>
