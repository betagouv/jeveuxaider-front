<template>
  <div class="relative">
    <button class="flex w-full" @click="isOpen = !isOpen" @keydown.esc="isOpen = false">
      <slot name="button" :isOpen="isOpen" :activeValue="activeValue">
        Toggle facet
      </slot>
    </button>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="() => isOpen = false"
        class="mt-2 absolute z-20 bg-white border shadow-xl text-[15px] w-[350px]"
        @keydown.esc="isOpen = false"
      >
        <div class="p-4 space-y-3">
          <div class="font-medium">
            Disponibilités
          </div>
          <div class="flex space-x-4">
            <FormControl
              html-for="commitment__duration"
              class="flex-1"
            >
              <SelectAdvanced
                v-model="commitment__duration"
                name="commitment__duration"
                placeholder="1 heure"
                :options="$labels.duration"
                @changed="handleChange()"
              />
            </FormControl>
            <FormControl
              html-for="commitment__time_period"
              class="min-w-[120px]"
            >
              <SelectAdvanced
                v-model="commitment__time_period"
                name="commitment__time_period"
                placeholder="par an"
                options-class="right-0"
                :options="$labels.time_period"
                @changed="handleChange()"
              />
            </FormControl>
          </div>
        </div>

        <div class="border-t px-6 py-3 flex justify-end">
          <button
            class="text-sm"
            :class="[
              {'text-gray-400 pointer-events-none': !activeValue},
              {'text-jva-blue-500 cursor-pointer hover:underline': activeValue}
            ]"
            :disabled="!activeValue"
            @click="handleClickEffacer()"
          >
            Effacer
          </button>
        </div>
      </div>
    </transition>
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
        return this.$options.filters.label(this.commitment__duration, 'duration')
      }
      return `${this.$options.filters.label(this.commitment__duration, 'duration')} par ${this.$options.filters.label(this.commitment__time_period, 'time_period')}`
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
        case '2_days':
          $hours = 21
          break
        case '3_days':
          $hours = 21
          break
        case '4_days':
          $hours = 28
          break
        case '5_days':
          $hours = 35
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
    }
  },
  watch: {
    '$route.query.duration' (newVal) {
      this.commitment__duration = newVal
    },
    '$route.query.time_period' (newVal) {
      this.commitment__time_period = newVal
    }
  },
  methods: {
    handleChange () {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          commitment__total: `<=${this.commitmentTotal}`,
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
