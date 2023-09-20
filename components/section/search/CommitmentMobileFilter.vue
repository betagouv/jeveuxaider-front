<template>
  <div>
    <div class="flex space-x-4">
      <BaseFormControl html-for="commitment__duration" class="flex-1">
        <BaseSelectAdvanced
          v-model="commitment__duration"
          name="commitment__duration"
          placeholder="1 heure"
          :options="$labels.duration"
          @changed="handleChange()"
        />
      </BaseFormControl>
      <BaseFormControl html-for="commitment__time_period" class="min-w-[120px]">
        <BaseSelectAdvanced
          v-model="commitment__time_period"
          name="commitment__time_period"
          placeholder="par an"
          options-class="right-0"
          :options="$labels.time_period"
          @changed="handleChange()"
        />
      </BaseFormControl>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      isOpen: false,
      commitment__duration: this.$route.query.duration,
      commitment__time_period: this.$route.query.time_period,
    }
  },
  computed: {
    activeValue() {
      if (!this.commitment__duration && !this.commitment__time_period) {
        return null
      }
      if (this.commitment__duration && !this.commitment__time_period) {
        return this.$filters.label(this.commitment__duration, 'duration')
      }
      return `${this.$filters.label(
        this.commitment__duration,
        'duration'
      )} par ${this.$filters.label(this.commitment__time_period, 'time_period')}`
    },
    commitmentTotal() {
      let $hours = 1
      switch (this.commitment__duration) {
        case '1_hour':
          $hours = 1
          break
        case '2_hours':
          $hours = 2
          break
        case 'half_day':
          $hours = 4
          break
        case 'day':
          $hours = 7
          break
        case '3_days':
          $hours = 21
          break
        case '5_days':
          $hours = 48
          break
        default:
          break
      }

      let $multiplier = 1
      switch (this.commitment__time_period) {
        case 'day':
          $multiplier = 365
          break
        case 'week':
          $multiplier = 52
          break
        case 'month':
          $multiplier = 12
          break
        default:
          break
      }
      return $hours * $multiplier
    },
  },
  watch: {
    '$route.query.duration'(newVal) {
      this.commitment__duration = newVal
    },
    '$route.query.time_period'(newVal) {
      this.commitment__time_period = newVal
    },
  },
  methods: {
    handleChange() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          commitment__total: `<=${this.commitmentTotal}`,
          time_period: this.commitment__time_period,
          duration: this.commitment__duration,
          page: undefined,
        },
      })
    },
    handleClickEffacer() {
      this.commitment__duration = null
      this.commitment__time_period = null
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          commitment__total: undefined,
          time_period: undefined,
          duration: undefined,
          page: undefined,
        },
      })
      this.isOpen = false
    },
  },
})
</script>
