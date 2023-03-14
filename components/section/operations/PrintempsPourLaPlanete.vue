<template>
  <div class="bg-white py-12 overflow-hidden">
    <div class="container">
      <div class="flex flex-col lg:flex-wrap justify-between items-center">
        <div class="flex flex-col space-y-4">
          <p class="font-bold text-jva-blue-500 uppercase">
            Actions bénévoles pour la planète
          </p>
          <Heading as="h2" size="alt-xs">
            Rejoignez le mouvement Printemps pour la planète
          </Heading>
          <p :id="`label-missions-operation-${uuid}`" class="text-xl text-[#4D4D4D]">
            Passez de l’éveil à l’action en participant aux missions de bénévolat au service de ce que nous avons de plus précieux : notre planète.
          </p>
        </div>
        <div class="mt-12">
          <img
            src="/images/operations/logo-printemps-pour-la-planete.svg"
            alt="Printemps pour la planète"
            class="w-[227px] h-[227px]"
          >
        </div>
      </div>
      <div v-if="missions.length" class="mt-12">
        <p class="text-xl font-bold mb-4">
          Opération du 3 au 23 avril
        </p>
        <Slideshow
          :slides-are-links="true"
          :aria-labelledby="`label-missions-operation-${uuid}`"
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
        <div class="mt-6 text-center">
          <Button type="tertiary" @click="handleClick()">
            Plus de missions
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import Heading from '@/components/dsfr/Heading.vue'
import CardMission from '@/components/card/CardMission.vue'
import uuid from '@/mixins/uuid'

export default {
  components: {
    Heading,
    Button,
    CardMission
  },
  mixins: [uuid],
  data () {
    return {
      missions: [],
      tags: 'Décembre ensemble'
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: missions } = await this.$axios.post('/algolia/missions', {
      facetFilters: `tags:${this.tags}`,
      filters: 'provider:reserve_civique AND is_registration_open=1 AND has_places_left=1 AND is_outdated=0',
      aroundLatLngViaIP: true
    })
    this.missions = missions
  },
  methods: {
    handleClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage - Opérations nationales - Printemps pour la planète', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push(`/missions-benevolat?tags=${this.tags}`)
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
