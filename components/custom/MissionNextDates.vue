<template>
  <div class="flex flex-wrap items-center gap-4">
    <template v-if="mission.dates">
      <template v-if="nextDates.length > 4">
        <div
          v-for="(date, i) in nextDates.slice(0, 3)"
          :key="i"
          class="flex flex-col items-center justify-center border w-[65px] h-[65px]"
        >
          <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
            {{ $dayjs.unix(date.timestamp).format('DD') }}
          </div>
          <div class="text-sm leading-[20px] text-[#666666]">
            {{ $dayjs.unix(date.timestamp).format('MMM') }}
          </div>
          <div class="text-xs leading-[14px] text-[#666666]">
            {{ $dayjs.unix(date.timestamp).format('YYYY') }}
          </div>
        </div>
        <div v-if="nextDates.length > 4" class="text-gray-400 text-2xl">⇢</div>
        <div class="flex flex-col items-center justify-center border w-[65px] h-[65px]">
          <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
            {{ $dayjs.unix(nextDates[nextDates.length - 1].timestamp).format('DD') }}
          </div>
          <div class="text-sm leading-[20px] text-[#666666]">
            {{ $dayjs.unix(nextDates[nextDates.length - 1].timestamp).format('MMM') }}
          </div>
          <div class="text-xs leading-[14px] text-[#666666]">
            {{ $dayjs.unix(nextDates[nextDates.length - 1].timestamp).format('YYYY') }}
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(date, i) in nextDates"
          :key="i"
          class="flex flex-col items-center justify-center border w-[65px] h-[65px]"
        >
          <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
            {{ $dayjs.unix(date.timestamp).format('DD') }}
          </div>
          <div class="text-sm leading-[20px] text-[#666666]">
            {{ $dayjs.unix(date.timestamp).format('MMM') }}
          </div>
          <div class="text-xs leading-[14px] text-[#666666]">
            {{ $dayjs.unix(date.timestamp).format('YYYY') }}
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div
        v-if="mission.start_date"
        class="flex flex-col items-center justify-center border w-[65px] h-[65px]"
      >
        <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
          {{ $dayjs.unix(firstDate).format('DD') }}
        </div>
        <div class="text-sm leading-[20px] text-[#666666]">
          {{ $dayjs.unix(firstDate).format('MMM') }}
        </div>
        <div class="text-xs leading-[14px] text-[#666666]">
          {{ $dayjs.unix(firstDate).format('YYYY') }}
        </div>
      </div>
      <div class="text-gray-400 text-2xl">⇢</div>
      <div class="flex flex-col items-center justify-center border w-[65px] h-[65px]">
        <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
          {{
            mission.end_date
              ? $dayjs.unix(mission.end_date).format('DD')
              : $dayjs.unix(lastDayOfYear).format('DD')
          }}
        </div>
        <div class="text-sm leading-[20px] text-[#666666]">
          {{
            mission.end_date
              ? $dayjs.unix(mission.end_date).format('MMM')
              : $dayjs.unix(lastDayOfYear).format('MMM')
          }}
        </div>
        <div class="text-xs leading-[14px] text-[#666666]">
          {{
            mission.end_date
              ? $dayjs.unix(mission.end_date).format('YYYY')
              : $dayjs.unix(lastDayOfYear).format('YYYY')
          }}
        </div>
      </div>
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
  computed: {
    firstDate() {
      // if start date before current day, pick current day
      if (this.mission.start_date < this.$dayjs().unix()) {
        return this.$dayjs().unix()
      }

      return this.mission.start_date
    },
    lastDayOfYear() {
      return this.$dayjs().endOf('year').unix()
    },
  },
})
</script>
