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
        class="mt-2 absolute right-0 xl:left-auto z-20 bg-white border shadow-xl w-[376px]"
        @keydown.esc="isOpen = false"
      >
        <div class="flex flex-col p-4 space-y-4">
          <div class="flex gap-4">
            <div class="flex-1 space-y-1">
              <div class="font-medium text-[15px]">À partir du</div>
              <BaseInput :modelValue="$route.query?.start" name="start" type="date" disabled />
            </div>
            <div class="flex-1 space-y-1">
              <div class="font-medium text-[15px]">Jusqu'au</div>
              <BaseInput :modelValue="$route.query?.end" name="end" type="date" disabled />
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
  data() {
    return {
      isOpen: false,
      // dateType: this.$route.query.date_type ?? null,
      calendar: {
        start: this.$route.query?.start ?? null,
        end: this.$route.query?.end ?? this.$route.query?.start ?? null,
      },
    }
  },
  computed: {
    activeValue() {
      if (this.$route.query.start && this.$route.query.end) {
        if (this.$route.query.start === this.$route.query.end) {
          return `${this.$dayjs(this.$route.query.start).format('DD/MM/YYYY')}`
        }
        return `${this.$dayjs(this.$route.query.start).format('DD/MM/YYYY')} au ${this.$dayjs(
          this.$route.query.end
        ).format('DD/MM/YYYY')}`
      }
      if (this.$route.query.start) {
        return `${this.$dayjs(this.$route.query.start).format('DD/MM/YYYY')}`
      }
      return null
    },
  },
  watch: {
    '$route.query.start'(newVal) {
      this.calendar.start = newVal
    },
    '$route.query.end'(newVal) {
      this.calendar.end = newVal
    },
  },
  methods: {
    onDayclick(payload) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          start: this.$dayjs(payload.start).format('YYYY-MM-DD'),
          end: this.$dayjs(payload.end).format('YYYY-MM-DD'),
          // date_type: 'ponctual', // 'ponctual' or 'recurring
          page: undefined,
        },
      })
    },
    // onDateTypeChanged(dateType) {
    //   this.addFilter('date_type', dateType)
    // },
    handleClickEffacer() {
      this.calendar.start = null
      this.calendar.end = null
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          start: undefined,
          // date_type: undefined,
          end: undefined,
          page: undefined,
        },
      })
      this.isOpen = false
    },
  },
})
</script>
