<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Modèles de missions"
      class="mb-6"
      infos-bulle="Répartition des missions validées ou terminées, créées sur la période, en fonction de l’utilisation d’un modèle de mission"
    />
    <div class="w-full">
      <DoughnutChart
        v-if="chartData"
        :chart-data="chartData"
        :chart-options="chartOptions"
        :height="300"
      />
    </div>
  </BaseBox>
</template>

<script>
import DoughnutChart from '@/components/chart/DoughnutChart'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics'

export default defineNuxtComponent({
  components: { DoughnutChart, BoxHeadingStatistics },
  data() {
    return {
      loading: true,
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
            },
            formatter: (value, ctx) => {
              const datasets = ctx.chart.data.datasets
              if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                const sum = datasets[0].data.reduce((a, b) => a + b, 0)
                const percentage = Math.round((value / sum) * 100)
                return percentage > 4 ? percentage + '%' : ''
              }
            },
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
      await apiFetch('/statistics/missions-by-template-types', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.chartData = {
          labels: ['Avec modèle', 'Sans modèle'],
          datasets: [
            {
              data: Object.values(response),
              backgroundColor: ['#fb7185', '#e879f9', '#a78bfa', '#818cf8', '#138bdf8'],
            },
          ],
        }
      })
    },
  },
})
</script>
