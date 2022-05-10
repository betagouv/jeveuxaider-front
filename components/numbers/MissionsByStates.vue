<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <Heading as="h2" :level="3" class="mb-4">
      Par statuts
    </Heading>
    <div class="w-full">
      <DoughnutChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" :height="300" />
    </div>
  </Box>
</template>

<script>
import DoughnutChart from '@/components/chart/DoughnutChart'

export default {
  components: { DoughnutChart },
  data () {
    return {
      loading: true,
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: (value, ctx) => {
              const datasets = ctx.chart.data.datasets
              if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                const sum = datasets[0].data.reduce((a, b) => a + b, 0)
                const percentage = Math.round((value / sum) * 100) + '%'
                return percentage
              }
            }
          }
        }
      }
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/missions-by-states', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.chartData = {
        labels: ['Brouillon', 'En attente de validation', 'En cours de traitement', 'Validée', 'Signalée', 'Désinscrite'],
        datasets: [
          {
            data: Object.values(response.data),
            backgroundColor: ['#138bdf8', '#fb923c', '#facc15', '#34d399', '#f87171', '#a8a29e']
          }
        ]
      }
    })
  }
}
</script>
