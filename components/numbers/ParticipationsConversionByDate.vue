<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Participations validées par rapport aux candidatures" class="mb-6" />
    <div class="w-full">
      <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" :height="300" />
    </div>
  </Box>
</template>

<script>
import pattern from 'patternomaly'
import BarChart from '@/components/chart/BarChart'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics'

export default {
  components: { BarChart, BoxHeadingStatistics },
  data () {
    return {
      loading: true,
      chartData: null,
      chartDatasets: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        },
        plugins: {
          legend: {
            display: false,
            position: 'bottom'
          },
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter (value, ctx) {
              const datasets = ctx.chart.data.datasets
              if (datasets[ctx.datasetIndex] != null) {
                const barTotal = datasets.map(function (x) { return x.data[ctx.dataIndex] }).reduce((a, b) => a + b, 0)
                return datasets.indexOf(ctx.dataset) === 0 ? (value * 100 / barTotal).toFixed(0) + '%' : ''
              }
            }
          }
        }
      }
    }
  },
  fetchOnServer: false,
  async fetch () {
    this.loading = true
    await this.$axios.get('/charts/participations-conversion-by-date', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      const colors = ['#FF9A7B', pattern.draw('weave', '#FFBDA9')]
      this.chartDatasets = []

      Object.entries(response.data).forEach(([key, dataset], index) => this.chartDatasets.push({
        label: key,
        data: dataset,
        backgroundColor: colors[index]
      }))

      this.chartDatasets.push()
      this.chartData = {
        labels: ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        datasets: this.chartDatasets
      }
    })
  }
}
</script>
