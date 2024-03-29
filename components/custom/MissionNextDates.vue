<template>
  <div ref="nextDates" class="flex flex-wrap items-center gap-1 xl:gap-2">
    <template v-if="mission.dates">
      <template v-if="nextDates.length > maxNbDaysToDisplay">
        <CustomDateDisplay
          v-for="(date, i) in nextDates.slice(0, maxNbDaysToDisplay - 1)"
          :key="i"
          :unix-date="date.timestamp"
        />
        <div v-if="nextDates.length > maxNbDaysToDisplay" class="text-gray-400 text-lg xl:text-xl">
          ⇢
        </div>
        <CustomDateDisplay :unix-date="nextDates[nextDates.length - 1].timestamp" />
      </template>
      <template v-else>
        <CustomDateDisplay v-for="(date, i) in nextDates" :key="i" :unix-date="date.timestamp" />
      </template>
    </template>
    <template v-else>
      <CustomDateDisplay v-if="mission.start_date" :unix-date="firstUnixDate" />
      <template v-if="showIntermediateDate">
        <div class="text-gray-400 text-lg xl:text-xl">⇢</div>
        <CustomDateDisplay :unix-date="$dayjs(selectedDate).unix()" />
      </template>
      <div class="text-gray-400 text-lg xl:text-xl">⇢</div>
      <CustomDateDisplay :unix-date="lastUnixDate" />
    </template>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      maxNbDaysToDisplay: 4,
      selectedDate: this.$route.query?.start ?? this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  watch: {
    '$route.query.start': {
      handler(newVal) {
        this.selectedDate = newVal
      },
    },
  },
  computed: {
    firstUnixDate() {
      if (this.$dayjs(this.selectedDate).isBefore(this.$dayjs())) {
        return this.$dayjs(this.selectedDate).unix()
      }

      if (this.mission.start_date < this.$dayjs().unix()) {
        return this.$dayjs().unix()
      }
      return this.mission.start_date
    },
    lastUnixDate() {
      if (!this.mission.end_date) {
        return this.selectedDate
          ? this.$dayjs(this.selectedDate).endOf('year').unix()
          : this.$dayjs().endOf('year').unix()
      }
      return this.mission.end_date
    },
    showIntermediateDate() {
      if (!this.selectedDate) {
        return false
      }
      if (this.firstUnixDate !== this.$dayjs(this.selectedDate).unix()) {
        if (this.lastUnixDate !== this.$dayjs(this.selectedDate).endOf('day').unix()) {
          return true
        }
      }

      return false
    },
  },
  methods: {},
})
</script>
