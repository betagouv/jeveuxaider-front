<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Répartition des organisations par statut juridique"
      class="mb-6"
      infos-bulle="Répartition des organisations inscrites et validées sur la période par statut juridique"
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
import DoughnutChart from '@/components/chart/DoughnutChart.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

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
      await apiFetch('/statistics/organisations-by-types', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.chartData = {
          labels: ['Associations', 'Collectivités', 'Orga. publiques', 'Orga. privées'],
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
