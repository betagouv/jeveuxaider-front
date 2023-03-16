<template>
  <div class="">
    <div class="py-6 xl:py-12 overflow-hidden">
      <div class="container">
        <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
          <div class="">
            <Heading as="h3" size="alt-sm" class="tracking-[-.5px]">
              <span aria-hidden="true">{{ activity.icon }} </span>
              <span>{{ activity.name }}</span>
            </Heading>
          </div>
          <div class="hidden lg:block">
            <div class="flex space-x-2">
              <SlideshowArrows
                button-class="hover:bg-[#EFECE8]"
                @previous="handleSlideshowPreviousClick"
                @next="handleSlideshowNextClick"
              />
              <Button
                class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]"
                type="transparent"
                @click="handleClick()"
              >
                Plus de missions
              </Button>
            </div>
          </div>
        </div>
        <div class="mt-12">
          <AlgoliaSlideshowMissions
            :ref="`slideshowActivityMission_${activity.key}`"
            :search-parameters="{
              hitsPerPage: 6,
              aroundPrecision: 2000,
              aroundLatLngViaIP: true,
              aroundRadius: 'all',
              facetFilters: [`activity.name:${activity.name}`],
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Heading,
    AlgoliaSlideshowMissions,
    Button
  },
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      missions: []
    }
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs[`slideshowActivityMission_${this.activity.key}`].previous()
    },
    handleSlideshowNextClick () {
      this.$refs[`slideshowActivityMission_${this.activity.key}`].next()
    },
    handleClick () {
      this.$router.push(`/missions-benevolat?activity.name=${this.activity.name}`)
    }
  }
}
</script>

<style lang="postcss" scoped>
.slide-wrapper {
  @apply !flex flex-col h-full max-w-[323px] transition;
  width: calc(100vw - 64px) !important; /* To let the next slide appear */
}
</style>
