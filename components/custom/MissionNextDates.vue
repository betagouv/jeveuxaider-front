<template>
  <div class="flex flex-wrap items-center gap-4">
    <template v-if="mission.dates">
      <template v-if="nextDates.length > 4">
        <CustomDateDisplay
          v-for="(date, i) in nextDates.slice(0, 3)"
          :key="i"
          :unix-date="date.timestamp"
        />
        <div v-if="nextDates.length > 4" class="text-gray-400 text-2xl">⇢</div>
        <CustomDateDisplay :unix-date="nextDates[nextDates.length - 1].timestamp" />
      </template>
      <template v-else>
        <CustomDateDisplay v-for="(date, i) in nextDates" :key="i" :unix-date="date.timestamp" />
      </template>
    </template>
    <template v-else>
      <CustomDateDisplay v-if="mission.start_date" :unix-date="firstUnixDate" />
      <template v-if="showIntermediateDate">
        <div class="text-gray-400 text-2xl">⇢</div>
        <CustomDateDisplay :unix-date="$dayjs(selectedDate).unix()" />
      </template>
      <div class="text-gray-400 text-2xl">⇢</div>
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
        return this.$dayjs().endOf('year').unix()
      }
      return this.mission.end_date
    },
    showIntermediateDate() {
      if (this.selectedDate && this.firstUnixDate !== this.$dayjs(this.selectedDate).unix()) {
        return true
      }
      return false
    },
  },
})
</script>
