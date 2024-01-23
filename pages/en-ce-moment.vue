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
          class="mt-[50px] -mb-[190px] z-10"
          @update:modelValue="onChangedSelectedDate"
          @update:startingDate="onChangedStartingDate"
        />
      </div>
    </div>
    <div class="container mt-48 mb-32">
      <AlgoliaMissions
        :search-parameters="{
          hitsPerPage: 6,
          aroundPrecision: 2000,
          filters: algoliaFilters,
          aroundLatLngViaIP: true,
          aroundRadius: 'all',
        }"
      />
    </div>
  </div>
</template>

<script>
import CalendarFilters from '@/components/calendar/CalendarFilters.vue'
import AlgoliaMissions from '@/components/section/search/missions/AlgoliaMissions.vue'

export default defineNuxtComponent({
  components: {
    CalendarFilters,
    AlgoliaMissions,
  },
  data() {
    return {
      selectedDate: this.$dayjs().format('YYYY-MM-DD'),
      startingDate: this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  computed: {
    algoliaFilters() {
      return `type:"Mission en présentiel"`
    },
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
