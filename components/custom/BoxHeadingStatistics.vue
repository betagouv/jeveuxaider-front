<template>
  <div class="relative">
    <div
      v-if="infosBulle"
      v-tooltip="{
        content: infosBulle,
        hideOnTargetClick: true,
        placement: 'top',
      }"
      class="hidden sm:block p-2 cursor-help absolute top-0 -right-2 group"
    >
      <InformationCircleIcon class="h-4 w-4 text-gray-400 group-hover:text-gray-900" />
    </div>
    <Heading
      as="h2"
      :level="3"
      :class="[
        { 'sm:pr-6': infosBulle}
      ]"
    >
      <template v-if="link">
        <router-link :to="link" class="hover:text-jva-blue-500">
          {{ title }}
        </router-link>
      </template>
      <template v-else>
        {{ title }}
      </template>
    </Heading>
    <div v-if="contextLabels.length" class="text-gray-400 font-semibold">
      {{ contextLabels.join(' · ') }}
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
    noPeriod: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: null
    },
    infosBulle: {
      type: String,
      default: null
    }
  },
  computed: {
    contextLabels () {
      const contextLabels = []
      if (this.subtitle) {
        return [this.subtitle]
      }
      if (!this.noPeriod) {
        if (this.$store.state.statistics.params.period) {
          contextLabels.push(this.periodLabel)
        }
      }
      if (this.$store.state.statistics.params.department) {
        contextLabels.push(`${this.$store.state.statistics.params.department} ${this.$options.filters.label(this.$store.state.statistics.params.department, 'departments')}`)
      }
      return contextLabels
    },
    periodLabel () {
      switch (this.$store.state.statistics.params.period) {
        case 'current_year':
          return `En ${this.$dayjs().year()}`
        case 'last_year':
          return `En ${this.$dayjs().subtract(1, 'year').year()}`
        case 'current_month':
          return `En ${this.$dayjs().format('MMMM YYYY')}`
        case 'last_month':
          return `En : ${this.$dayjs().subtract(1, 'month').format('MMMM YYYY')}`
        default:
          return this.$options.filters.label(this.$store.state.statistics.params.period, 'statistics_period')
      }
    }
  }
}
</script>

<style>

</style>
