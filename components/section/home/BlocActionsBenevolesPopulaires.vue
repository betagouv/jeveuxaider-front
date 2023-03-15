<template>
  <div class="bg-white py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div class="">
          <Heading as="h2" size="alt-sm" class="mb-6 md:mb-2">
            Actions bénévoles populaires
          </Heading>
          <p id="label-slideshow-missions-prioritaires" class="text-[#4D4D4D] text-xl xl:text-2xl">
            Découvrez les missions de bénévolat qui engagent le plus la communauté
          </p>
        </div>
        <div class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <SlideshowArrows
              button-class="hover:bg-[#F6F6F6]"
              @previous="handleSlideshowPreviousClick"
              @next="handleSlideshowNextClick"
            />
            <Button class="flex-none" type="secondary" @click="handleClick()">
              Plus de missions
            </Button>
          </div>
        </div>
      </div>
      <div v-if="missions.length" class="mt-12">
        <Slideshow
          ref="slideshowPopulaire"
          :slides-are-links="true"
          aria-labelledby="label-slideshow-missions-prioritaires"
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
      <div class="lg:hidden mt-6 text-center">
        <Button type="tertiary" @click="handleClick()">
          Plus de missions
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import CardMission from '@/components/card/CardMission.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Button,
    CardMission,
    Heading
  },
  data () {
    return {
      missions: []
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: missions } = await this.$axios.post('/algolia/missions', {
      filters: 'provider:reserve_civique AND is_registration_open=1 AND has_places_left=1 AND is_outdated=0',
      aroundLatLngViaIP: true
    })
    this.missions = missions
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowPopulaire.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowPopulaire.next()
    },
    handleClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage - Actions bénévoles populaires - Plus de missions', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/missions-benevolat')
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
