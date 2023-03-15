<template>
  <div class="">
    <div class="py-12 overflow-hidden">
      <div class="container">
        <div class="lg:flex lg:justify-between lg:items-center">
          <div class="">
            <Heading as="h3" size="alt-sm" class="mb-6" color="">
              {{ activity.icon }} {{ activity.name }}
            </Heading>
          </div>
          <div class="hidden lg:block">
            <div class="flex space-x-2">
              <SlideshowArrows
                button-class="hover:bg-[#EFECE8]"
                @previous="handleSlideshowPreviousClick"
                @next="handleSlideshowNextClick"
              />
              <Button class="flex-none" type="transparent" extra-class="text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]" @click="handleClick()">
                Plus de missions
              </Button>
            </div>
          </div>
        </div>
        <div v-if="missions.length" class="mt-12">
          <Slideshow
            :ref="`slideshowActivityMission_${activity.key}`"
          >
            <nuxt-link
              v-for="mission in missions"
              :key="mission.id"
              class="slide-wrapper"
              :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
            >
              <CardMission :mission="mission" />
            </nuxt-link>
          </Slideshow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import CardMission from '@/components/card/CardMission.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Heading,
    CardMission,
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
  fetchOnServer: false,
  async fetch () {
    const { data: missions } = await this.$axios.post('/algolia/missions', {
      facetFilters: `activity.name:${this.activity.name}`,
      aroundLatLngViaIP: true
    })
    this.missions = missions
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
