<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Répartition des bénévoles en fonction de leur âge"
      class="mb-6"
      infos-bulle="Répartition par âge des bénévoles inscrits sur la période sélectionnée"
    />
    <div class="w-full">
      <BarChart
        v-if="chartData"
        :chart-data="chartData"
        :chart-options="chartOptions"
        :height="300"
      />
    </div>
  </BaseBox>
</template>

<script>
import ListItemCount from '@/components/custom/ListItemCount.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'
import BarChart from '@/components/chart/BarChart.vue'

export default defineNuxtComponent({
  components: {
    ListItemCount,
    BarChart,
    BoxHeadingStatistics,
  },
  data() {
    return {
      loading: true,
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: '#818cf8',
            data: [],
          },
        ],
      },
      chartDatasets: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
      },
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/statistics/public/utilisateurs-by-age', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        console.log('response', response)
        this.chartDatasets = response
        this.chartData.labels = response.map((item) => item.age_range)
        this.chartData.datasets[0].data = response.map((item) => item.count)
      })
    },
  },
  computed: {
    total() {
      return this.statistics ? Object.values(this.statistics).reduce((a, b) => a + b) : 0
    },
  },
})
</script>
