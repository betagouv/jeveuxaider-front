<template>
  <div class="relative">
    <div class="bg-jva-blue-500 sticky">
      <div class="container pt-[104px] relative">
        <h1 class="text-white font-bold">
          <span class="text-[40px]">Votre prochaine mission de bénévolat</span><br />
          <span class="text-[80px] leading-[80px]">très (très) bientôt</span>
        </h1>
      </div>
    </div>
    <div class="">
      <div class="bg-jva-blue-500 z-10 sticky top-[-64px] mb-[150px]">
        <div class="container">
          <div class="flex items-center bg-white relative translate-y-1/2 shadow-lg">
            <CalendarFilters
              ref="calendarFilters"
              :model-value="selectedDate"
              :starting-date="startingDate"
              class="flex-1"
              @update:modelValue="onChangedSelectedDate"
            />
            <div class="w-[234px] border-l py-8 pl-8">
              <div>Lieu de la mission</div>
              <div>@TODO</div>
            </div>
          </div>
        </div>
      </div>
      <div id="missions-presentiel" class="container mt-12 mb-24">
        <AlgoliaMissions
          :search-parameters="{
            hitsPerPage: 6,
            aroundPrecision: 2000,
            filters: presentielFilters,
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
          }"
          :redirect-parameters="{
            type: 'Mission en présentiel',
          }"
        />
      </div>
      <DecembreEnsemble />
      <div class="container mt-24 mb-24">
        <DsfrHeading as="h3" size="2xl" class="tracking-[-.5px]">
          Vous pouvez aussi vous engager à distance
        </DsfrHeading>
        <AlgoliaMissions
          class="mt-12"
          :search-parameters="{
            hitsPerPage: 6,
            filters: distanceFilters,
          }"
        />
      </div>
      <SectionSearchBlocFaq title="Vous avez des questions?" />
      <SectionHomeBlocNewsletter />
    </div>
  </div>
</template>

<script>
import CalendarFilters from '@/components/calendar/CalendarFilters.vue'
import AlgoliaMissions from '@/components/section/search/missions/AlgoliaMissions.vue'
import DecembreEnsemble from '@/components/section/operations/DecembreEnsemble.vue'

export default defineNuxtComponent({
  components: {
    CalendarFilters,
    AlgoliaMissions,
    DecembreEnsemble,
  },
  data() {
    return {
      selectedDate: this.$route.query.from ?? this.$dayjs().format('YYYY-MM-DD'),
      startingDate: this.$route.query.from ?? this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  computed: {
    commonFilters() {
      const timestamp = this.$dayjs(this.selectedDate).unix()
      const query = `start_date<=${timestamp} AND (end_date>=${timestamp} OR has_end_date=0 OR creneaux.timestamp=${timestamp})`
      // const query = `dates.timestamp=${timestamp}`
      return `${query} AND commitment__total<=1 AND date_type:"ponctual"`
    },
    presentielFilters() {
      return `${this.commonFilters} AND type:"Mission en présentiel"`
    },
    distanceFilters() {
      return `${this.commonFilters} AND type:"Mission à distance"`
    },
  },
  watch: {
    '$route.query': {
      handler(newVal, oldVal) {
        this.selectedDate = newVal.from
      },
    },
  },
  methods: {
    onChangedSelectedDate(date) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          from: this.$dayjs(date).format('YYYY-MM-DD'),
          // to: unixDateEndOfDay,
          page: undefined,
        },
      })

      this.$scrollTo('#missions-presentiel', 500, {
        offset: -220,
      })
    },
  },
})
</script>
