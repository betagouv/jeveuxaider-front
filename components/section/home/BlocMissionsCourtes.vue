<template>
  <div class="bg-jva-blue-500 py-12 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center">
        <div class="">
          <Heading as="h2" size="alt-xs" class="mb-6" color="text-white">
            Devenez bénévole d’un jour !
          </Heading>
          <p id="label-slideshow-missions-courtes" class="text-white text-xl">
            Des missions courtes et sans engagement selon vos envies.
          </p>
        </div>
        <div class="hidden lg:block">
          <div class="flex space-x-2">
            <SlideshowArrows
              variant="white"
              button-class="hover:bg-jva-blue-900"
              @previous="handleSlideshowPreviousClick"
              @next="handleSlideshowNextClick"
            />
            <Button class="flex-none" type="transparent" extra-class="text-jva-blue-500 border-jva-blue-500" @click="handleClick()">
              Plus de missions
            </Button>
          </div>
        </div>
      </div>
      <div v-if="missions.length" class="mt-12">
        <Slideshow
          ref="slideshowBenevoleDunJour"
          :slides-are-links="true"
          aria-labelledby="label-slideshow-missions-courtes"
          dots-variant="light"
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
      <div class="mt-6 text-center">
        <Button type="tertiary-no-outline" @click="handleClick()">
          Plus de missions
        </Button>
      </div>
      <div class="mt-8 flex flex-col space-y-6">
        <p class="text-white font-bold text-xl">
          Quelles sont vos disponibilités ?
        </p>
        <div class="flex flex-wrap gap-4">
          <nuxt-link
            v-for="link,i in links"
            :key="i"
            :to="link.to"
            class="rounded-full"
          >
            <Tag
              size="md"
              :custom-theme="true"
              class="text-white border border-[#8080CD] cursor-ponter sm:hover:border-[#b8b8e8] active:!border-white"
            >
              {{ link.label }}
            </Tag>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import CardMission from '@/components/card/CardMission.vue'
import Heading from '@/components/dsfr/Heading.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Button,
    CardMission,
    Heading,
    Tag
  },
  data () {
    return {
      missions: [],
      links: [
        { label: '1 heure', to: '/missions-benevolat?commitment__total=<%3D1&duration=1_hour&time_period=year' },
        { label: '2 heures', to: '/missions-benevolat?commitment__total=<%3D2&duration=2_hours&time_period=year' },
        { label: 'Une demi-journée', to: '/missions-benevolat?commitment__total=<%3D4&duration=half_day&time_period=year' },
        { label: '1 jour', to: '/missions-benevolat?commitment__total=<%3D7&duration=day&time_period=year' },
        { label: '2 jours', to: '/missions-benevolat?commitment__total=<%3D14&duration=2_days&time_period=year' },
        { label: '3 jours', to: '/missions-benevolat?commitment__total=<%3D21&duration=3_days&time_period=year' }
      ]
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: missions } = await this.$axios.post('/algolia/missions', {
      filters: 'provider:reserve_civique AND is_registration_open=1 AND has_places_left=1 AND is_outdated=0',
      numericFilters: ['commitment__total <= 4'],
      aroundLatLngViaIP: true
    })
    this.missions = missions
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowBenevoleDunJour.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowBenevoleDunJour.next()
    },
    handleClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage - Mission courtes - Plus de missions', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/missions-benevolat?commitment__total=<%3D4&duration=half_day&time_period=year')
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
