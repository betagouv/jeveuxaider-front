<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Nombre d'actions de modération" no-period class="mb-6" />
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
        plugins: {
          legend: {
            display: true,
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
          const adminPercentage = item.actions_admin_count
          const referentPercentage = item.actions_referent_count

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
