<template>
  <div>
    <div class="container">
      <Heading as="h2" size="alt-md" class="mt-12 text-center">
        <span class="relative">
          <img
            src="/images/home/sparkle-left.svg"
            class="absolute left-[-26px] top-[-5px]"
            width="37"
            height="33"
            aria-hidden="true"
          >
          <span>C’est votre première fois ? <br class="hidden md:block">Suivez le guide</span>
        </span>
      </Heading>
    </div>

    <div class="flex justify-center">
      <div class="relative h-[78px] w-[78px] flex justify-center items-center bg-jva-orange-300 border-8 border-[#F9F6F2] rounded-full top-[31px]">
        <RiArrowDownLine class="text-[#F9F6F2] w-8 fill-current flex-none" />
      </div>
    </div>
    <div class="bg-jva-orange-300 py-12 overflow-hidden">
      <div class="container">
        <div class="lg:flex lg:justify-between lg:items-center">
          <div class="">
            <Heading as="h3" size="alt-sm" class="mb-6" color="text-[#522F29]">
              Le bénévolat et plus si affinités
            </Heading>
            <p id="label-slideshow-activities-action" class="text-[#522F29] text-xl leading-tight">
              Contribuez à une cause qui vous touche au coeur
            </p>
          </div>
          <div class="hidden lg:block">
            <SlideshowArrows
              variant="brown"
              @previous="handleSlideshowPreviousClick"
              @next="handleSlideshowNextClick"
            />
          </div>
        </div>
        <div class="mt-12">
          <!-- @todo: accessibilité -->
          <Slideshow
            ref="slideshowActivities"
            aria-labelledby="label-slideshow-activities-action"
            dots-variant="light"
            :adaptive-height="true"
            class="sm:overflow-hidden"
          >
            <div v-for="(group,i) in activitiesGroups" :key="i" class="!flex flex-col gap-4 sm:flex-row flex-wrap">
              <div
                v-for="activity in group"
                :key="activity.key"
              >
                <nuxt-link
                  :to="`/missions-benevolat?activity.name=${activity.name}`"
                  class="inline-flex p-4 bg-white shadow text-lg font-bold w-full sm:w-auto"
                >
                  <span aria-hidden="true" class="flex-none">{{ activity.icon }}</span>
                  <span class="ml-3">{{ activity.name }}</span>
                </nuxt-link>
              </div>
            </div>
          </Slideshow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activities from '@/assets/activities.json'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Heading
  },
  data () {
    return {
      activities
    }
  },
  computed: {
    activitiesGroups () {
      const [list, chunkSize] = [[...this.activities], 7]
      return [...Array(Math.ceil(list.length / chunkSize))].map(_ => list.splice(0, chunkSize))
    }
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowActivities.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowActivities.next()
    }
  }
}
</script>

<style lang="postcss" scoped>
:deep(.slick-track) {
  width: 100% !important;
}

:deep(.slick-slide) {
  width: 100%;
  flex: none;
}
</style>
