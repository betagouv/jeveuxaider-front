<template>
  <div class="relative z-1">
    <div class="bg-jva-blue-500">
      <div class="container py-[56px] lg:pt-[104px] lg:pb-[114px] relative">
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
    <div class="relative">
      <div
        ref="filters"
        :class="[
          'z-10 sticky top-[-1px]',
          { 'bg-white shadow-lg': isPinned },
          { 'lg:container  lg:-translate-y-1/2': !isPinned },
        ]"
      >
        <div
          :class="[
            'flex flex-col lg:flex-row items-center bg-white relative',
            { 'lg:container ': isPinned },
            { '': !isPinned },
          ]"
        >
          <CalendarFilters
            :model-value="selectedDate"
            :starting-date="startingDate"
            class="flex-1"
            @update:modelValue="onChangedSelectedDate"
          />
          <div class="hidden lg:block w-full lg:w-[300px]">
            <div class="lg:border-l lg:py-4 lg:pl-8">
              <div class="text-[#3A3A3A]">Lieu de la mission</div>
              <LocalisationFilter label="Localisation" class="max-w-[200px]" />
            </div>
          </div>
        </div>
      </div>
      <div id="missions-presentiel" class="container mt-12 mb-12 lg:mt-0 lg:mb-24">
        <AlgoliaMissions
          :search-parameters="searchParamsPresentiel"
          :redirect-parameters="{
            type: 'Mission en présentiel',
            date_type: 'ponctual',
          }"
        />
      </div>
      <DecembreEnsemble />
      <div class="container my-12 lg:my-24">
        <DsfrHeading as="h3" size="2xl" class="tracking-[-.5px]">
          Vous pouvez aussi vous engager à distance
        </DsfrHeading>
        <AlgoliaMissions
          class="mt-12"
          :search-parameters="searchParamsDistance"
          :redirect-parameters="{
            type: 'Mission à distance',
            date_type: 'ponctual',
          }"
        />
      </div>
      <SectionSearchBlocFaq title="Vous avez des questions ?" />
      <SectionHomeBlocNewsletter />
    </div>
  </div>
</template>

<script>
import CalendarFilters from '@/components/calendar/CalendarFilters.vue'
import AlgoliaMissions from '@/components/section/search/missions/AlgoliaMissions.vue'
import DecembreEnsemble from '@/components/section/operations/DecembreEnsemble.vue'
import LocalisationFilter from '@/components/search/LocalisationFilter.vue'

export default defineNuxtComponent({
  components: {
    CalendarFilters,
    LocalisationFilter,
    AlgoliaMissions,
    DecembreEnsemble,
  },
  mounted() {
    this.isPinnedObserver = new IntersectionObserver(
      ([e]) => {
        console.log('e.intersectionRatio', e.intersectionRatio)
        this.isPinned = e.intersectionRatio < 1
      },
      { threshold: [1] }
    )
    this.isPinnedObserver.observe(this.$refs.filters)
  },
  beforeUnmount() {
    this.isPinnedObserver?.disconnect()
  },
  data() {
    return {
      isPinned: false,
      isPinnedObserver: null,
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
    searchParamsPresentiel() {
      return {
        hitsPerPage: 6,
        aroundPrecision: 2000,
        filters: `${this.commonFilters} AND type:"Mission en présentiel"`,
        aroundLatLngViaIP: true,
        aroundLatLng: this.$route.query.aroundLatLng,
        aroundRadius: 'all',
      }
    },
    searchParamsDistance() {
      return {
        hitsPerPage: 6,
        filters: `${this.commonFilters} AND type:"Mission à distance"`,
      }
    },
  },
  watch: {
    '$route.query.city': {
      handler(newVal) {
        this.scrollToTop()
      },
    },
    '$route.query.start': {
      handler(newVal) {
        if (newVal) {
          this.selectedDate = newVal
          this.scrollToTop()
        }
      },
    },
  },
  methods: {
    async scrollToTop() {
      await this.$nextTick()
      this.$scrollTo('#missions-presentiel', 300, {
        offset: this.$mq.current === 'xl' ? -200 : -178,
      })
    },
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
    // async onSearchUpdate() {
    //   console.log('onSearchUpdate', this.$mq.current)
    //   if (this.$mq.current === 'xl') {
    //     await this.$nextTick()
    //     this.$scrollTo('#missions-presentiel', 0, {
    //       offset: -200,
    //     })
    //   }
    // },
  },
})
</script>
