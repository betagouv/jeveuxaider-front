<template>
  <div class="bg-jva-blue-500 px-4 py-12 ">
    <div class="text-[40px] font-bold mb-6 leading-10 text-white">
      Devenez bénévole d’un jour !
    </div>
    <div class="text-white text-xl">
      Des missions courtes et sans engagement selon vos envies.
    </div>
    <div v-if="missions.length" class="overflow-hidden mt-12">
      <Slideshow
        :slides-are-links="true"
        :aria-labelledby="`label-missions-courtes-${_uid}`"
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
    <div class="mt-8 text-center">
      <Button type="tertiary-no-outline" @click="handleClick()">
        Plus de missions
      </Button>
    </div>
    <div class="mt-8 flex flex-col space-y-6">
      <div class="text-white font-bold text-xl">
        Quelles sont vos disponibilités ?
      </div>
      <div class="flex flex-wrap gap-4">
        <nuxt-link
          v-for="link,i in links"
          :key="i"
          :to="link.to"
          class="border border-white rounded-full text-white px-3 py-1"
        >
          {{ link.label }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import CardMission from '@/components/card/CardMission.vue'

export default {
  components: {
    Button,
    CardMission
  },
  data () {
    return {
      missions: [],
      links: [
        { label: '1 hour', to: '/missions-benevolat?commitment__total=<%3D1&duration=1_hour&time_period=year' },
        { label: '2 hours', to: '/missions-benevolat?commitment__total=<%3D2&duration=2_hours&time_period=year' },
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
