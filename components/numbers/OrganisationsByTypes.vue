<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <Heading as="h2" :level="3" class="mb-4">
      Par statuts juridiques
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
            }
          }
        }
      }
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/organisations-by-types', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.chartData = {
        labels: ['Associations', 'Collectivités', 'Orga. publiques', 'Orga. privées'],
        datasets: [
          {
            data: Object.values(response.data),
            backgroundColor: ['#f87979', '#f87979', '#f87979', '#f87979']
          }
        ]
      }
    })
  }
}
</script>
