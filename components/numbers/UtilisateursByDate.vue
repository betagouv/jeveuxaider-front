<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <div class="mb-6">
      <Heading as="h2" :level="3">
        Nouveaux utilisateurs par date
      </Heading>
      <div class="text-gray-400 font-semibold">
        Année {{ $store.state.statistics.params.year }}
      </div>
    </div>
    <div class="w-full">
      <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" :height="300" />
    </div>
  </Box>
</template>

<script>
import BarChart from '@/components/chart/BarChart'

export default {
  components: { BarChart },
  data () {
    return {
      loading: true,
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
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
    await this.$axios.get('/charts/utilisateurs-by-date', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.chartData = {
        labels: ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        datasets: [{
          data: response.data,
          backgroundColor: '#f87979'
        }]
      }
    })
  }
}
</script>
