<template>
  <div class="relative">
    <button
      :aria-expanded="isOpen || 'false'"
      class="flex w-full"
      @click="isOpen = !isOpen"
      @keydown.esc="isOpen = false"
    >
      <slot name="button" :isOpen="isOpen" :activeValue="activeValue"> Toggle facet </slot>
    </button>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="() => (isOpen = false)"
        class="mt-2 absolute right-0 xl:right-auto z-20 bg-white border shadow-xl w-[409px]"
        @keydown.esc="isOpen = false"
      >
        <div class="flex flex-col p-8 space-y-8">
          <div class="space-y-4">
            <div class="font-medium">Vous cherchez une mission</div>
            <BaseRadioGroup
              v-model="dateType"
              :options="[
                { key: 'ponctual', label: 'Ponctuelle', icon: 'RiCalendarEventLine' },
                { key: 'recurring', label: 'Régulière', icon: 'RiTimeLine' },
              ]"
              variant="tabs"
              @update:modelValue="onDateTypeChanged"
            />
          </div>

          <div v-if="dateType === 'ponctual'" class="">
            <div class="flex gap-4">
              <div class="flex-1 space-y-4">
                <div class="font-medium">À partir du</div>
                <BaseInput
                  ref="inputDatePicker"
                  :modelValue="$route.query?.from"
                  name="from"
                  type="date"
                  disabled
                />
              </div>
              <div class="flex-1 space-y-4">
                <div class="font-medium">Jusqu'au</div>
                <BaseInput
                  ref="inputDatePicker"
                  :modelValue="$route.query?.to"
                  name="to"
                  type="date"
                  disabled
                />
              </div>
            </div>
            <div class="mt-4">
              <v-date-picker
                v-model.range="calendar"
                :disabled-dates="[{ start: null, end: $dayjs().subtract(1, 'day').toDate() }]"
                @update:modelValue="onDayclick"
              />
            </div>
          </div>
        </div>

        <div class="border-t px-8 py-4 flex justify-end">
          <button
            class="text-sm"
            :class="[
              { 'text-gray-400 pointer-events-none': !activeValue },
              {
                'text-jva-blue-500 cursor-pointer hover:underline': activeValue,
              },
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
export default defineNuxtComponent({
  setup() {
    const { addFilter } = useAlgoliaMissionsQueryBuilder()
    return {
      addFilter,
    }
  },
  data() {
    return {
      isOpen: false,
      dateType: this.$route.query.date_type ?? null,
      calendar: {
        start: this.$route.query.from ?? new Date(),
        end: this.$route.query.to ?? new Date(),
      },
    }
  },
  computed: {
    activeValue() {
      if (this.dateType === 'ponctual' && this.$route.query.from && this.$route.query.to) {
        return `${this.$dayjs(this.$route.query.from).format('DD/MM/YYYY')} - ${this.$dayjs(
          this.$route.query.to
        ).format('DD/MM/YYYY')}`
      }
      if (this.dateType === 'ponctual' && this.$route.query.from) {
        return `${this.$dayjs(this.$route.query.from).format('DD/MM/YYYY')}`
      }
      if (this.dateType === 'recurring') {
        return 'Récurrent'
      }
      return null
    },
  },
  watch: {
    // '$route.query.date_type'(newVal) {
    //   this.dateType = newVal
    // },
    '$route.query.from'(newVal) {
      this.from = newVal
    },
    '$route.query.to'(newVal) {
      this.to = newVal
    },
    // '$route.query.duration'(newVal) {
    //   this.commitment__duration = newVal
    // },
    // '$route.query.time_period'(newVal) {
    //   this.commitment__time_period = newVal
    // },
  },
  methods: {
    onDayclick(payload) {
      const startTimestamp = this.$dayjs(payload.start).unix()
      const endTimestamp = this.$dayjs(payload.end).unix()

      const query = `start_date<=${startTimestamp} AND (end_date>=${startTimestamp} OR has_end_date=0 OR dates.timestamp:${startTimestamp} TO ${endTimestamp})`
      this.$stores.algoliaSearch.initialFilters = query

      console.log('onDayclick query', query)
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          from: this.$dayjs(payload.start).format('YYYY-MM-DD'),
          to: this.$dayjs(payload.end).format('YYYY-MM-DD'),
          page: undefined,
        },
      })
    },
    onDateTypeChanged(dateType) {
      this.addFilter('date_type', dateType)
    },
    handleClickEffacer() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          from: undefined,
          date_type: undefined,
          to: undefined,
          page: undefined,
        },
      })
      this.isOpen = false
    },
  },
})
</script>
