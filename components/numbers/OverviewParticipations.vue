<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Mises en relation ›"
      link="/admin/statistics/participations"
      no-period
      class="mb-6"
    />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.participations"
        title="Mises en relation"
        subtitle="créées"
        link="/admin/statistics/participations"
        infos-bulle="Total du nombre de mises en relation depuis le début"
      />
      <CardStatistic
        :value="statistics.participations_validated"
        title="Mises en relation"
        subtitle="validées"
        link="/admin/statistics/participations"
        infos-bulle="Nombre de participations validées parmi les mises en relation reçues depuis le début"
      />
      <CardStatistic
        :value="`${statistics.participations_conversion_rate}%`"
        title="Taux de conversion"
        :gauge-percentage="statistics.participations_conversion_rate"
        infos-bulle="Correspond au ratio entre le nombre de mises en relation proposées et le nombre de participations validées depuis le début"
      />
      <CardStatistic
        :value="statistics.participations_in_progress"
        title="Mises en relation"
        link="/admin/statistics/participations"
        subtitle="à traiter"
        infos-bulle="Nombre de participations en attente de validation ou en cours de traitement parmi les mises en relation reçues depuis le début"
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

      await apiFetch('/statistics/overview-participations', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
