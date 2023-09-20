<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Places ›" link="/admin/statistics/places" no-period class="mb-6" />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.places"
        :title="`${$filters.pluralize(statistics.places, 'Place', 'Places', false)}`"
        :subtitle="`${$filters.pluralize(statistics.places, 'proposée', 'proposées', false)}`"
        infos-bulle="Nombre de places proposées à l’instant T"
      />
      <CardStatistic
        :value="statistics.places_left"
        :title="`${$filters.pluralize(statistics.places_left, 'Place', 'Places', false)}`"
        :subtitle="`${$filters.pluralize(
          statistics.places_left,
          'disponible',
          'disponibles',
          false
        )}`"
        infos-bulle="Nombre de places vacantes à l’instant T"
      />
      <CardStatistic
        :value="`${statistics.places_occupation_rate}%`"
        title="Taux de remplissage"
        :gauge-percentage="statistics.places_occupation_rate"
        infos-bulle="Correspond au ratio entre le nombre de places disponibles et le nombre de places proposées, à l’instant T"
      />
    </div>
  </BaseBox>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    CardStatistic,
    BoxHeadingStatistics,
  },
  data() {
    return {
      loading: true,
      statistics: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true

      await apiFetch('/statistics/overview-places', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
