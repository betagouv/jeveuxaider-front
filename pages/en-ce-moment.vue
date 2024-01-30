<template>
  <div class="relative">
    <div class="bg-jva-blue-500">
      <div class="container py-[56px] lg:pt-[104px] lg:pb-0 relative">
        <h1 class="text-white font-bold">
          <span class="text-[22px] lg:text-[40px]">Votre prochaine mission de bénévolat</span><br />
          <span class="relative">
            <img
              src="/images/home/sparkle-right.svg"
              alt=""
              aria-hidden="true"
              class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[50px] lg:h-[51px] lg:bottom-[35px] lg:right-[-40px] pointer-events-none"
            />
            <span class="text-[48px] leading-[56px] lg:text-[80px] lg:leading-[90px]"
              >très (très) bientôt</span
            >
          </span>
        </h1>
      </div>
    </div>
    <div class="relative -top-px">
      <div class="bg-jva-blue-500 z-10 lg:sticky lg:top-[-54px] lg:mb-[150px]">
        <div class="lg:container">
          <div
            class="flex flex-col lg:flex-row items-center bg-white relative lg:translate-y-1/2 shadow-md lg:shadow-lg"
          >
            <CalendarFilters
              :model-value="selectedDate"
              :starting-date="startingDate"
              class="flex-1"
              @update:modelValue="onChangedSelectedDate"
            />
            <div
              class="hidden lg:block w-full lg:w-[234px] border-t lg:border-l lg:border-t-0 lg:py-8 lg:pl-8"
            >
              <div>Lieu de la mission</div>
              <div>@TODO</div>
            </div>
          </div>
        </div>
      </div>
      <div id="missions-presentiel" class="container mt-12 mb-12 lg:mb-24">
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
            date_type: 'ponctual',
          }"
          @update="onSearchUpdate"
        />
      </div>
      <DecembreEnsemble />
      <div class="container my-12 lg:my-24">
        <DsfrHeading as="h3" size="2xl" class="tracking-[-.5px]">
          Vous pouvez aussi vous engager à distance
        </DsfrHeading>
        <AlgoliaMissions
          class="mt-12"
          :search-parameters="{
            hitsPerPage: 6,
            filters: distanceFilters,
          }"
          :redirect-parameters="{
            type: 'Mission à distance',
            date_type: 'ponctual',
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
import { dragscroll } from 'vue-dragscroll'

export default defineNuxtComponent({
  components: {
    CalendarFilters,
    AlgoliaMissions,
    DecembreEnsemble,
  },
  directives: {
    dragscroll,
  },
  data() {
    return {
      selectedDate: this.$route.query.start ?? this.$dayjs().format('YYYY-MM-DD'),
      startingDate: this.$route.query.start ?? this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  computed: {
    commonFilters() {
      const timestamp = this.$dayjs(this.selectedDate).unix()
      const query = `start_date<=${timestamp} AND (end_date_no_creneaux>=${timestamp} OR has_end_date=0 OR dates.timestamp=${timestamp})`
      return `${query} AND commitment__total<=4 AND date_type:"ponctual"`
    },
    presentielFilters() {
      return `${this.commonFilters} AND type:"Mission en présentiel"`
    },
    distanceFilters() {
      return `${this.commonFilters} AND type:"Mission à distance"`
    },
  },
  watch: {
    '$route.query.start': {
      handler(newVal, oldVal) {
        if (newVal) {
          this.selectedDate = newVal
        }
      },
    },
  },
  methods: {
    onChangedSelectedDate(date) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          start: this.$dayjs(date).format('YYYY-MM-DD'),
          page: undefined,
        },
      })
    },
    async onSearchUpdate() {
      if (this.$mq.current === 'xl') {
        await this.$nextTick()
        this.$scrollTo('#missions-presentiel', 500, {
          offset: -220,
        })
      }
    },
  },
})
</script>
