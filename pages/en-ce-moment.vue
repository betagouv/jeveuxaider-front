<template>
  <div class="relative z-1">
    <div class="lg:block bg-jva-blue-500">
      <div class="container py-[32px] lg:pt-[74px] lg:pb-[114px] relative">
        <h1 class="text-white font-bold">
          <span class="lg:hidden text-[28px]">Votre prochaine mission de bénévolat</span>
          <span class="hidden lg:inline text-[22px] lg:text-[40px]"
            >Votre prochaine mission de bénévolat</span
          ><br />
          <span class="hidden lg:inline relative">
            <img
              src="/images/home/sparkle-right.svg"
              alt=""
              aria-hidden="true"
              class="lg:block absolute w-[31px] h-[33px] bottom-[28px] right-[-27px] lg:w-[50px] lg:h-[51px] lg:bottom-[40px] lg:right-[-40px] pointer-events-none"
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
          'relative z-20 lg:-translate-y-1/2',
          { 'bg-white sticky lg:shadow-xl top-[-1px] lg:top-[63px]': isPinned },
          { 'lg:container ': !isPinned },
        ]"
      >
        <div
          :class="[
            'flex flex-col lg:flex-row items-center bg-white relative shadow-xl lg:shadow-none',
            { 'lg:container ': isPinned },
            { '': !isPinned },
          ]"
        >
          <CalendarFilters
            :model-value="selectedDate"
            :starting-date="startingDate"
            class="flex-1"
            :is-pinned="isPinned"
            @update:modelValue="onChangedSelectedDate"
          />
          <div
            class="border-t border-t-[#DDDDDD] lg:border-t-0 py-2 w-full lg:w-[300px] xl:w-[350px]"
          >
            <div class="hidden lg:block lg:border-l lg:py-4 lg:pl-8">
              <div class="text-[#3A3A3A]">À proximité de</div>
              <LocalisationFilter label="Localisation" class="lg:max-w-[200px]" />
            </div>
            <div class="px-2 lg:hidden"><LocalisationMobileFilter /></div>
          </div>
        </div>
      </div>
      <div id="missions-presentiel" class="container mt-12 mb-12 lg:mt-0 lg:mb-24">
        <ClientOnly>
          <AlgoliaMissions
            index-key="missionsReplicaCreneauxIndex"
            :search-parameters="searchParamsPresentiel"
            :redirect-parameters="{
              type: 'Mission en présentiel',
            }"
            origin="calendrier"
          />
        </ClientOnly>
      </div>
      <RestosDuCoeur />
      <div class="container my-12 lg:my-24">
        <DsfrHeading as="h3" size="2xl" class="tracking-[-.5px]">
          Vous pouvez aussi vous engager à distance
        </DsfrHeading>
        <ClientOnly>
          <AlgoliaMissions
            class="mt-12"
            index-key="missionsReplicaCreneauxIndex"
            :search-parameters="searchParamsDistance"
            :redirect-parameters="{
              type: 'Mission à distance',
            }"
            origin="calendrier"
          />
        </ClientOnly>
      </div>
      <SectionSearchBlocFaq title="Vous avez des questions ?" />
      <SectionHomeBlocNewsletter />
    </div>
  </div>
</template>

<script>
import CalendarFilters from '@/components/calendar/CalendarFilters.vue'
import AlgoliaMissions from '@/components/section/search/missions/AlgoliaMissions.vue'
import RestosDuCoeur from '@/components/section/operations/RestosDuCoeur.vue'
import LocalisationFilter from '@/components/search/LocalisationFilter.vue'
import LocalisationMobileFilter from '@/components/search/LocalisationMobileFilter.vue'

export default defineNuxtComponent({
  components: {
    CalendarFilters,
    LocalisationFilter,
    LocalisationMobileFilter,
    AlgoliaMissions,
    RestosDuCoeur,
  },
  mounted() {
    this.isPinnedObserver = new IntersectionObserver(
      ([e]) => {
        this.isPinned = e.intersectionRatio < 1
      },
      {
        threshold: [1],
      }
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
      return `${query} AND commitment__total<=4 AND date_type:"ponctual" AND has_places_left=1 AND is_registration_open=1`
    },
    searchParamsPresentiel() {
      return {
        hitsPerPage: 6,
        aroundPrecision: 2000,
        filters: `${this.commonFilters} AND type:"Mission en présentiel"`,
        aroundLatLngViaIP: true,
        aroundLatLng: this.$route.query.aroundLatLng,
        aroundRadius: 20000,
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
        offset: this.$mq.current === 'xl' ? -190 : -190,
      })
    },
    onChangedSelectedDate(date) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          start: this.$dayjs(date).format('YYYY-MM-DD'),
          end: this.$dayjs(date).format('YYYY-MM-DD'),
          page: undefined,
        },
      })
    },
  },
})
</script>
