<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Participations validées par rapport aux mises en relation"
      class="mb-6"
      no-period
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
import pattern from 'patternomaly'
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
            onClick: (evt, legendItem, legend) => {
              let newVal = !legendItem.hidden
              legend.chart.data.datasets.forEach((dataset) => {
                if (dataset.label === legendItem.text) {
                  dataset.hidden = newVal
                }
              })
              legend.chart.update()
            },
            labels: {
              filter: (legendItem, chartData) => {
                let entries = chartData.datasets.map((e) => e.label)
                return entries.indexOf(legendItem.text) === legendItem.datasetIndex
              },
            },
          },
          datalabels: {
            color: 'white',
            font: {
              size: 9,
              weight: 'bold',
            },
            formatter(value, ctx) {
              const datasets = ctx.chart.data.datasets
              if (datasets[ctx.datasetIndex] != null) {
                const dataset = datasets[ctx.datasetIndex]
                if (ctx.datasetIndex % 2 === 0) {
                  return `${(
                    (value * 100) /
                    (value + datasets[ctx.datasetIndex + 1]['data'][ctx.dataIndex])
                  ).toFixed(0)}%`
                }
              }
              return ''
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
      await apiFetch('/charts/participations-conversion-by-date', {
        params: this.$stores.statistics.params,
      }).then((data) => {
        this.loading = false

        // Extract the labels (months) from the data
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]

        const colors = [
          '#fb7185',

          pattern.draw('dot', '#fb7185'),
          '#e879f9',

          pattern.draw('dot', '#e879f9'),
          '#a78bfa',

          pattern.draw('dot', '#a78bfa'),
          '#818cf8',

          pattern.draw('dot', '#818cf8'),
          '#138bdf8',

          pattern.draw('dot', '#138bdf8'),
        ]

        // Extract the years from the data
        const legends = Object.keys(data)

        // Create datasets for "Validées" and "Autres statuts"
        const datasets = legends.map((legend, index) => {
          let year = legend.split(' - ')[0]
          return {
            label: year,
            data: data[legend],
            backgroundColor: colors[index],
            stack: year,
            hidden: ![
              this.$dayjs().subtract(1, 'year').year().toString(),
              this.$dayjs().year().toString(),
            ].includes(year),
          }
        })

        this.chartData = {
          labels: months,
          datasets: datasets,
        }
      })
    },
  },
})
</script>
