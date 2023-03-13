<template>
  <div class="bg-white px-4 py-12">
    <div class="text-[40px] font-bold mb-6 leading-10">
      Actions bénévoles populaires
    </div>
    <div class="text-[#4D4D4D] text-xl">
      Découvrez les missions de bénévolat qui engagent le plus la communauté
    </div>
    <div v-if="missions.length" class="overflow-hidden mt-12">
      <Slideshow
        :slides-are-links="true"
        :aria-labelledby="`label-missions-prioritaires-${_uid}`"
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
      <Button type="tertiary" @click="handleClick()">
        Plus de missions
      </Button>
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
