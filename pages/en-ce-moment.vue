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
      selectedDate: this.$route.query.from ?? this.$dayjs().format('YYYY-MM-DD'),
      startingDate: this.$route.query.from ?? this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  computed: {
    algoliaFilters() {
      const timestamp = this.$dayjs(this.selectedDate).unix()
      const query = `(start_date<=${timestamp} OR creneaux.timestamp=${timestamp})`
      return `${query} AND type:"Mission en présentiel" AND commitment__total<=4 AND is_registration_open=1`
    },
  },
  methods: {
    onChangedSelectedDate(date) {
      console.log('onChangedSelectedDate', date)
      this.selectedDate = date
      this.$stores.algoliaSearch.initialFilters = this.algoliaFilters

      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          from: this.$dayjs(date).format('YYYY-MM-DD'),
          // to: unixDateEndOfDay,
          page: undefined,
        },
      })
    },
    onChangedStartingDate(date) {
      this.startingDate = date
    },
  },
})
</script>
