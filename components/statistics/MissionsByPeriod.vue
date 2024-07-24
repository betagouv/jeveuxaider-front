<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Nouvelles missions par mois" no-period class="mb-6" />
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
import BarChart from '@/components/chart/BarChart.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: { BarChart, BoxHeadingStatistics },
  data() {
    return {
      loading: true,
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: '#fb7185',
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
      await apiFetch('/statistics/public/missions-by-period', {
        params: {
          ...this.$route.query,
        },
      }).then((response) => {
        this.loading = false
        // const colors = ['#fb7185', '#e879f9', '#a78bfa', '#818cf8', '#29C2AF']
        this.chartDatasets = response
        this.chartData.labels = response.map((item) => this.$dayjs(item.date).format('MMM YY'))
        this.chartData.datasets[0].data = response.map((item) => item.count)
      })
    },
  },
})
</script>
