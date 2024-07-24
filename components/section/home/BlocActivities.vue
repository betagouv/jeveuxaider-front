<template>
  <div>
    <div class="container">
      <div class="pt-12 pb-10 xl:pt-24 xl:pb-[72px]">
        <DsfrHeading as="h2" size="alt-md" class="text-center">
          <span class="relative">
            <img
              src="/images/home/sparkle-left.svg"
              alt=""
              width="37"
              height="33"
              aria-hidden="true"
              class="absolute left-[-26px] top-[-5px] xl:w-[50px] xl:left-[-38px] xl:top-[-8px] pointer-events-none"
            />
            <span>C’est votre première fois ? <br class="hidden md:block" />Suivez le guide</span>
          </span>
        </DsfrHeading>
      </div>
    </div>

    <div class="flex justify-center">
      <div
        class="h-[78px] w-[78px] lg:h-[90px] lg:w-[90px] mb-[-39px] lg:mb-[-45px] flex justify-center items-center bg-jva-orange-300 border-8 border-[#F9F6F2] rounded-full"
      >
        <RiArrowDownLine class="text-[#F9F6F2] w-8 lg:w-10 fill-current flex-none" />
      </div>
    </div>
    <div
      class="bg-jva-orange-300 pt-14 pb-10 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 xl:pt-32 xl:pb-28 overflow-hidden"
    >
      <div class="container sm:overflow-hidden">
        <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
          <div>
            <DsfrHeading as="h3" size="alt-sm" class="mb-6 md:mb-2" color="text-[#522F29]">
              Le bénévolat et plus si affinités
            </DsfrHeading>
            <p
              id="label-slideshow-activities-action"
              class="text-[#522F29] text-xl xl:text-2xl leading-tight"
            >
              Contribuez à une cause qui vous touche au coeur
            </p>
          </div>
          <div class="hidden lg:block flex-none">
            <div id="slideshowActivitiesArrows" />
          </div>
        </div>
        <div :key="chunkSize" class="mt-12">
          <BaseSlideshow
            navigation-id="slideshowActivitiesArrows"
            navigation-variant="brown"
            navigation-button-class="hover:bg-[#EA9680]"
            aria-labelledby="label-slideshow-activities-action"
            dots-variant="light"
            :auto-height="true"
            :space-between="48"
            :breakpoints="null"
          >
            <swiper-slide
              v-for="(group, i) in activitiesGroups"
              :key="i"
              class="!flex flex-col gap-4 xl:gap-7 sm:flex-row flex-wrap"
            >
              <div v-for="activity in group" :key="activity.key">
                <button
                  class="inline-flex p-4 xl:px-8 xl:py-5 bg-white shadow xl:shadow-xl text-lg xl:text-[22px] font-bold w-full sm:w-auto sm:hover:bg-[#F6F6F6] transition text-left"
                  @click="onClick(activity)"
                >
                  <span aria-hidden="true" class="flex-none">{{ activity.icon }}</span>
                  <span class="ml-3">{{ activity.name }}</span>
                </button>
              </div>
            </swiper-slide>
          </BaseSlideshow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activities from '@/assets/activities.json'

export default defineNuxtComponent({
  data() {
    return {
      activities: activities.sort((a, b) => b.popular - a.popular),
      chunkSize: 5,
      waitingOnAnimRequest: false,
    }
  },
  computed: {
    activitiesGroups() {
      const [list, chunkSize] = [[...this.activities], this.chunkSize]
      return [...Array(Math.ceil(list.length / chunkSize))].map((_) => list.splice(0, chunkSize))
    },
  },
  async mounted() {
    await this.$nextTick()
    this.onResize()
    window.addEventListener('resize', this.onResize, false)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      if (!this.waitingOnAnimRequest) {
        window.requestAnimationFrame(() => {
          if (window.innerWidth >= 1024) {
            this.chunkSize = 14
          } else if (window.innerWidth >= 768) {
            this.chunkSize = 7
          } else {
            this.chunkSize = 5
          }
          this.waitingOnAnimRequest = false
        })
      }
      this.waitingOnAnimRequest = true
    },
    onClick(activity) {
      this.$plausible.trackEvent('Homepage - Clique - Activités', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$router.push(`/missions-benevolat?activities.name=${activity.name}`)
    },
  },
})
</script>

<style lang="postcss" scoped>
:deep(.slick-track) {
  width: 100% !important;
  @apply sm:!gap-16;
}

:deep(.slick-slide) {
  width: 100%;
  flex: none;
}
</style>
