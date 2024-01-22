<template>
  <div class="">
    <div class="bg-jva-blue-500">
      <div class="container py-28 relative">
        <h1 class="text-white font-bold">
          <span class="text-[40px]">Votre prochaine mission de bénévolat</span><br />
          <span class="text-[80px] leading-[80px]">très (très) bientôt</span>
        </h1>
        <CalendarFilters
          v-model="selectedDate"
          :starting-date="startingDate"
          class="absolute bottom-[-100px] z-10"
          @update:modelValue="onChangedSelectedDate"
          @update:startingDate="onChangedStartingDate"
        />
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
import CalendarFilters from '@/components/calendar/CalendarFilters.vue'

export default defineNuxtComponent({
  components: {
    CalendarFilters,
  },
  data() {
    return {
      selectedDate: this.$dayjs().format('YYYY-MM-DD'),
      startingDate: this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  methods: {
    onChangedSelectedDate(date) {
      this.selectedDate = date
    },
    onChangedStartingDate(date) {
      this.startingDate = date
    },
  },
})
</script>
