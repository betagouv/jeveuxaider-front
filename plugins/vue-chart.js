import Vue from 'vue'

import { Doughnut, Bar } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// import chartjsPluginColorschemes from 'chartjs-plugin-colorschemes'

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale, ChartDataLabels)

Vue.component('Doughnut', {
  extends: Doughnut,
  props: ['chartData', 'chartOptions'],
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
})

Vue.component('Bar', {
  extends: Bar,
  props: ['chartData', 'chartOptions'],
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
})
