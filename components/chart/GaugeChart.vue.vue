<template>
  <ClientOnly>
    <Doughnut
      :options="chartOptions"
      :data="chartData"
      :chart-id="chartId"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </ClientOnly>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement } from 'chart.js'

ChartJS.register(ArcElement)

export default defineNuxtComponent({
  components: {
    Doughnut,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      default: 100,
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {
          responsive: true,
          maintainAspectRatio: false,
          rotation: -90,
          circumference: 180,
          cutout: '90%',
          hoverBorderColor: 'white',
        }
      },
    },
    chartId: {
      type: String,
      default: 'gauge-chart',
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        datasets: [
          {
            data: [this.value, this.max - this.value],
            backgroundColor: ['#FF463D', 'rgba(0, 0, 0, 0.07)'],
          },
        ],
      },
    }
  },
})
</script>
