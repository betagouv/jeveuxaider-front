<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Répartition en pourcentage" no-period class="mb-6" />
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
            label: 'Admins',
            backgroundColor: '#4C5871',
            data: [],
          },
          {
            label: 'Référents',
            backgroundColor: '#EF8C8E',
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + '%' // Display y-axis values as percentages
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          datalabels: {
            display: false,
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: 50, // Position the line at 50%
                yMax: 50,
                borderColor: 'rgba(0, 0, 0, 0.5)', // Line color (gray with opacity)
                borderWidth: 2,
                borderDash: [10, 5], // Dashed style: 10px dash, 5px gap
                label: {
                  enabled: true,
                  content: '50%',
                  position: 'end',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                },
              },
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
      await apiFetch('/statistics/activity-logs/admins-vs-referents', {
        params: {
          ...this.$route.query,
        },
      }).then((response) => {
        this.loading = false

        // Prepare chart data
        const labels = []
        const adminData = []
        const referentData = []

        response.forEach((item) => {
          const total = item.actions_admin_count + item.actions_referent_count

          const adminPercentage =
            total > 0 ? ((item.actions_admin_count / total) * 100).toFixed(1) : 0
          const referentPercentage =
            total > 0 ? ((item.actions_referent_count / total) * 100).toFixed(1) : 0

          labels.push(this.$dayjs(item.created_at).format('\SW-YY')) // Format date
          adminData.push(adminPercentage)
          referentData.push(referentPercentage)
        })

        // Set chart data
        this.chartData.labels = labels
        this.chartData.datasets[0].data = adminData
        this.chartData.datasets[1].data = referentData
      })
    },
  },
})
</script>
