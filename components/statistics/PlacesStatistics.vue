<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="L'offre actuelle de JeVeuxAider.gouv.fr en un coup d'oeil"
      no-period
      class="mb-6"
    />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <!-- <CardStatistic
        :value="statistics.missions_available"
        :title="`${$filters.pluralize(statistics.missions_available, 'Mission', 'Missions', false)}`"
        subtitle="en ligne"
        infos-bulle="Nombre de missions en ligne en ce moment"
      /> -->
      <CardStatistic
        :value="statistics.places"
        :title="`${$filters.pluralize(statistics.places, 'Place', 'Places', false)}`"
        :subtitle="`${$filters.pluralize(statistics.places, 'proposée', 'proposées', false)}`"
        infos-bulle="Nombre de places proposées sur les missions en ligne en ce moment"
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
        infos-bulle="Nombre de places disponibles sur les missions en ligne en ce moment"
      />
    </div>
  </BaseBox>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic.vue'
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

      await apiFetch('/statistics/public/global/places', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
