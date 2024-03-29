<template>
  <div class="bg-white py-2 lg:py-4 lg:px-4 w-full overflow-hidden">
    <div ref="calendar" class="flex items-center justify-between">
      <div
        :class="['group pr-2 lg:pr-4 py-8', { 'pointer-events-none': !canSlideToPreviousDates }]"
        @click="onPreviousDatesClick"
      >
        <RiArrowLeftSLine
          :class="[
            'h-8 w-8 fill-current',
            { ' text-gray-300': !canSlideToPreviousDates },
            {
              ' cursor-pointer group-hover:text-jva-blue-500 group-hover:scale-125 transition-all':
                canSlideToPreviousDates,
            },
          ]"
        />
      </div>
      <div class="flex-1 flex justify-between">
        <div
          v-for="(date, i) in dates"
          :key="i"
          :class="[
            'group w-[93px] h-[98px] lg:w-[93px] lg:h-[96px] flex flex-col items-center justify-center cursor-pointer',
            { 'hover:bg-gray-50': date !== modelValue },
            { 'bg-jva-blue-500 text-white': date === modelValue },
          ]"
          @click="onDateClick(date)"
        >
          <div class="font-bold leading-[16px]">{{ $dayjs(date).format('dddd') }}</div>
          <div class="text-[28px] lg:text-[36px] font-bold leading-[40px] lg:py-1">
            {{ $dayjs(date).format('DD') }}
          </div>
          <div
            :class="[
              'text-sm leading-[12px] text-[#666666]',
              { 'text-[#C1C1FB]': date === modelValue },
            ]"
          >
            {{ $dayjs(date).format('MMMM') }}
          </div>
        </div>
      </div>
      <div class="group pl-2 lg:pl-4 py-8 cursor-pointer" @click="onNextDatesClick">
        <RiArrowRightSLine
          class="h-8 w-8 fill-current group-hover:text-jva-blue-500 group-hover:scale-125 transition-all"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    await this.$nextTick()
    this.onResize()
    window.addEventListener('resize', this.onResize, false)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  data() {
    return {
      startingDate: this.$route.query.start ?? this.$dayjs().format('YYYY-MM-DD'),
      nbDaysToDisplay: 7,
      waitingOnAnimRequest: false,
    }
  },
  computed: {
    canSlideToPreviousDates() {
      return this.$dayjs(this.dates[0]).isAfter(this.$dayjs())
    },
    dates() {
      return [...Array(this.nbDaysToDisplay).keys()].map((i) => {
        return this.$dayjs(this.startingDate).add(i, 'days').format('YYYY-MM-DD')
      })
    },
  },
  methods: {
    onDateClick(date) {
      this.$emit('update:modelValue', date)
    },
    onPreviousDatesClick() {
      this.startingDate = this.$dayjs(this.startingDate)
        .subtract(this.nbDaysToDisplay, 'days')
        .format('YYYY-MM-DD')
    },
    onNextDatesClick() {
      this.startingDate = this.$dayjs(this.startingDate)
        .add(this.nbDaysToDisplay, 'days')
        .format('YYYY-MM-DD')
    },
    onResize() {
      if (!this.waitingOnAnimRequest) {
        window.requestAnimationFrame(() => {
          let width = this.$refs.calendar?.offsetWidth
          // console.log('width', width)
          if (width >= 900) {
            this.nbDaysToDisplay = 7
          } else if (width >= 640) {
            this.nbDaysToDisplay = 6
          } else if (width >= 550) {
            this.nbDaysToDisplay = 5
          } else if (width >= 440) {
            this.nbDaysToDisplay = 4
          } else {
            this.nbDaysToDisplay = 3
          }
          this.waitingOnAnimRequest = false
        })
      }
      this.waitingOnAnimRequest = true
    },
  },
})
</script>
