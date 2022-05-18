<template>
  <div>
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen" :activeValue="activeValue">
        Toggle facet
      </slot>
    </div>
    <div v-if="isOpen" v-click-outside="() => isOpen = false">
      <div class="absolute z-40 bg-white border shadow rounded">
        <div class="px-3 py-4">
          <div class="grid grid-cols-2 gap-4">
            <FormControl
              label="Durée d'engagement min."
              html-for="commitment__duration"
            >
              <SelectAdvanced
                v-model="commitment__duration"
                name="commitment__duration"
                placeholder="Durée"
                :options="$labels.duration"
                @changed="handleChange()"
              />
            </FormControl>
            <FormControl
              label="Fréquence"
              html-for="commitment__time_period"
            >
              <SelectAdvanced
                v-model="commitment__time_period"
                name="commitment__time_period"
                placeholder="Fréquence"
                :options="$labels.time_period"
                @changed="handleChange()"
              />
            </FormControl>
          </div>
        </div>
        <div class="border-t px-3 py-4 flex justify-between">
          <div v-if="activeValue" class="text-gray-600 cursor-pointer" @click="handleClickEffacer()">
            Effacer
          </div>
          <div class="ml-auto text-jva-blue-500 cursor-pointer" @click="isOpen = false">
            Valider
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  data () {
    return {
      isOpen: false,
      commitment__duration: this.$route.query.duration,
      commitment__time_period: this.$route.query.time_period
    }
  },
  computed: {
    activeValue () {
      if (!this.commitment__duration && !this.commitment__time_period) {
        return null
      }
      if (this.commitment__duration && !this.commitment__time_period) {
        return this.commitment__duration
      }
      return `${this.commitment__duration} par ${this.commitment__time_period}`
    },
    commitmentTotal () {
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
    }
  },
  methods: {
    handleChange () {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          commitment__total: `<${this.commitmentTotal}`,
          time_period: this.commitment__time_period,
          duration: this.commitment__duration,
          page: undefined
        }
      })
    },
    handleClickEffacer () {
      this.commitment__duration = null
      this.commitment__time_period = null
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          commitment__total: undefined,
          time_period: undefined,
          duration: undefined,
          page: undefined
        }
      })
      this.isOpen = false
    }
  }
}
</script>
