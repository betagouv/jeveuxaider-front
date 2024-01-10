<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Nouvelles mises en relation des bénévoles"
      no-period
      class="mb-6"
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
import BarChart from '@/components/chart/BarChart.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: { BarChart, BoxHeadingStatistics },
  data() {
    return {
      loading: true,
      chartData: null,
      chartDatasets: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
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
      await apiFetch('/charts/participations-by-date', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        const colors = ['#fb7185', '#e879f9', '#a78bfa', '#818cf8', '#29C2AF']
        this.chartDatasets = []

        Object.entries(response).forEach(([key, dataset], index) =>
          this.chartDatasets.push({
            label: key,
            data: dataset,
            backgroundColor: colors[index],
            hidden: ![
              this.$dayjs().subtract(1, 'year').year().toString(),
              this.$dayjs().year().toString(),
            ].includes(key),
          })
        )

        this.chartDatasets.push()
        this.chartData = {
          labels: [
            'Jan.',
            'Fév.',
            'Mars',
            'Avr.',
            'Mai',
            'Juin',
            'Juil.',
            'Aout',
            'Sept.',
            'Oct.',
            'Nov.',
            'Déc.',
          ],
          datasets: this.chartDatasets,
        }
      })
    },
  },
})
</script>
