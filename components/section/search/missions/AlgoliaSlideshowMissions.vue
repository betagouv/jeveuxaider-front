<template>
  <div>
    <Slideshow
      v-if="missions.length"
      ref="algoliaSlideshow"
      :slides-are-links="true"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :dots-variant="dotsVariant"
    >
      <nuxt-link
        v-for="mission in missions"
        :key="mission.id"
        class="slide-wrapper"
        :to="
          mission.provider == 'api_engagement'
            ? `/missions-benevolat/${mission.id}`
            : `/missions-benevolat/${mission.id}/${mission.slug}`
        "
      >
        <CardMission :mission="mission" />
      </nuxt-link>
    </Slideshow>
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'

export default {
  components: {
    CardMission
  },
  props: {
    searchParameters: {
      type: Object,
      required: true
    },
    ariaLabelledby: { type: String, default: null },
    ariaLabel: { type: String, default: null },
    dotsVariant: {
      type: String,
      default: 'dark',
      validator: v => ['dark', 'light'].includes(v)
    }
  },
  data () {
    return {
      missions: []
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { hits } = await this.$algolia.missionsIndex.search('', this.searchParameters)
    this.missions = hits
  },

  methods: {
    previous () {
      this.$refs.algoliaSlideshow.previous()
    },
    next () {
      this.$refs.algoliaSlideshow.next()
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
