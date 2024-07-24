<template>
  <div v-if="missions?.length">
    <BaseSlideshow
      :key="slideshowKey"
      ref="algoliaSlideshow"
      :bleed="bleed"
      :dots-variant="dotsVariant"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :navigation-id="navigationId"
      :navigation-button-class="navigationButtonClass"
      :navigation-variant="navigationVariant"
      @init="onInit"
    >
      <swiper-slide v-for="mission in missions" :key="mission.id" class="slide-wrapper">
        <NuxtLink
          no-prefetch
          class="h-full"
          :to="
            mission.provider == 'api_engagement'
              ? `/missions-benevolat/${mission.id}`
              : `/missions-benevolat/${mission.id}/${mission.slug}`
          "
          @click.native="$emit('slide-click', mission)"
        >
          <CardMission class="h-full" :lazy-loading="false" :mission="mission" />
        </NuxtLink>
      </swiper-slide>
    </BaseSlideshow>
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'

export default defineNuxtComponent({
  components: {
    CardMission,
  },
  props: {
    searchParameters: {
      type: Object,
      required: true,
    },
    ariaLabelledby: { type: String, default: null },
    ariaLabel: { type: String, default: null },
    dotsVariant: {
      type: String,
      default: 'dark',
      validator: (v) => ['dark', 'light'].includes(v),
    },
    navigationId: {
      type: String,
      default: null,
    },
    navigationButtonClass: { type: String, default: '' },
    navigationVariant: { type: String, default: undefined },
    bleed: { type: Boolean, default: undefined },
  },
  data() {
    return {
      currentSlideIndex: 0,
      swiperInstance: null,
      slideshowKey: 0,
    }
  },
  async setup(props, { emit }) {
    const { $algolia } = useNuxtApp()
    const response = await $algolia.missionsIndex.search('', props.searchParameters)
    emit('results', response)
    return {
      missions: response.hits,
    }
  },
  methods: {
    previous() {
      this.$refs.algoliaSlideshow.previous()
    },
    next() {
      this.$refs.algoliaSlideshow.next()
    },
    onInit($event) {
      this.swiperInstance = $event
    },
  },
  watch: {
    async searchParameters(newVal) {
      const response = await this.$algolia.missionsIndex.search('', newVal)
      this.missions = response.hits
      this.$emit('results', response)
      await nextTick()
      this.slideshowKey++
    },
  },
})
</script>

<style lang="postcss" scoped>
.slide-wrapper {
  @apply !flex flex-col h-full max-w-[320px] transition;
  width: calc(100vw - 64px) !important; /* To let the next slide appear */
}
</style>
