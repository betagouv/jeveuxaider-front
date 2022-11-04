<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Nouvelles missions validées" no-period class="mb-6" />
    <div class="w-full">
      <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" :height="300" />
    </div>
  </Box>
</template>

<script>
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
        plugins: {
          legend: {
            position: 'bottom'
          },
          datalabels: {
            display: false
          }
        }
      }
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/public/missions-by-date', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      const colors = ['#fb7185', '#e879f9', '#a78bfa', '#818cf8', '#138bdf8']
      this.chartDatasets = []

      Object.entries(response.data).forEach(([key, dataset], index) => this.chartDatasets.push({
        label: key,
        data: dataset,
        backgroundColor: colors[index],
        hidden: ![this.$dayjs().subtract(1, 'year').year().toString(), this.$dayjs().year().toString()].includes(key)
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
