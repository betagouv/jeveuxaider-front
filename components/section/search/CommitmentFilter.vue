<template>
  <div>
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen" :activeValue="activeValue">
        Toggle facet
      </slot>
    </div>

    <transition name="fade-in">
      <div v-if="isOpen" v-click-outside="() => isOpen = false">
        <div class="mt-2 absolute z-40 bg-white border shadow-xl rounded-xl text-[15px] max-w-[350px] w-full">
          <div class="p-4 space-y-3">
            <div class="relative">
              <div class="font-medium">
                Disponibilités
              </div>
              <XIcon
                class=" text-gray-400 hover:text-gray-500 cursor-pointer absolute right-0 top-0 -m-1"
                width="20"
                @click="isOpen = false"
              />
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
                  options-position="right"
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
