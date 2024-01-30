<template>
  <div class="bg-white p-4 w-full overflow-hidden">
    <div class="flex items-center justify-between">
      <div
        :class="['group pr-4 py-8', { 'pointer-events-none': !canSlideToPreviousDates }]"
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
        <ClientOnly>
          <div
            v-for="(date, i) in dates"
            :key="i"
            :class="[
              'group w-[93px] h-[98px] lg:w-[109px] lg:h-[110px] flex flex-col items-center justify-center cursor-pointer',
              { 'hover:bg-gray-50': date !== modelValue },
              { 'bg-jva-blue-500 text-white': date === modelValue },
            ]"
            @click="onDateClick(date)"
          >
            <div class="font-bold leading-[16px]">{{ $dayjs(date).format('dddd') }}</div>
            <div class="text-[28px] lg:text-[40px] font-bold leading-[40px] lg:py-2">
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
        </ClientOnly>
      </div>
      <div class="group pl-4 py-8 cursor-pointer" @click="onNextDatesClick">
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
  },
  data() {
    return {
      startingDate: this.$route.query.start ?? this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  computed: {
    nbDaysToDisplay() {
      console.log('this.$mq.current', this.$mq.current)
      switch (this.$mq.current) {
        case 'md':
        case 'sm':
          return 5
        case 'xs':
        case 'xxs':
        case 'xxxs':
          return 3
      }
      return 7
    },
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
  },
})
</script>
