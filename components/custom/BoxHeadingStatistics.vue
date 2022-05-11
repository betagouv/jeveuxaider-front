<template>
  <div>
    <Heading as="h2" :level="3">
      <template v-if="link">
        <router-link :to="link" class="hover:text-jva-blue-500">
          {{ title }}
        </router-link>
      </template>
      <template v-else>
        {{ title }}
      </template>
    </Heading>
    <div v-if="subtitle || showPeriod" class="text-gray-400 font-semibold">
      <template v-if="showPeriod">
        {{ periodLabel }}
      </template>
      <template v-else>
        {{ subtitle }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    showPeriod: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: null
    }
  },
  computed: {
    periodLabel () {
      switch (this.$store.state.statistics.params.period) {
        case 'current_year':
          return `Cette année : ${this.$dayjs().year()}`
        case 'last_year':
          return `L'année dernière : ${this.$dayjs().subtract(1, 'year').year()}`
        case 'current_month':
          return `Ce mois-ci : ${this.$dayjs().format('MMMM YYYY')}`
        case 'last_month':
          return `Le mois dernier : ${this.$dayjs().subtract(1, 'month').format('MMMM YYYY')}`
        default:
          return this.$options.filters.label(this.$store.state.statistics.params.period, 'statistics_period')
      }
    }
  }
}
</script>

<style>

</style>
