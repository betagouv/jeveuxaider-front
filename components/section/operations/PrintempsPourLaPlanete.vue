<template>
  <div class="bg-white py-12 xl:py-24 relative overflow-hidden">
    <img
      aria-hidden="true"
      src="/images/home/decorations.svg"
      alt=""
      width="1692"
      height="553"
      class="absolute top-16 object-cover object-top w-[1692px] h-[553px] mx-auto"
    >
    <div class="container relative">
      <div class="flex flex-col justify-between items-center sm:flex-row gap-12">
        <div class="flex flex-col space-y-4 xl:space-y-8 max-w-[740px]">
          <p class="font-bold text-jva-blue-500 uppercase xl:text-2xl">
            Actions bénévoles pour la planète
          </p>
          <Heading as="h2" size="alt-sm">
            <span>Rejoignez le mouvement </span>
            <br class="hidden lg:block">
            <span>Printemps pour la planète</span>
          </Heading>
          <p :id="`label-missions-operation-${uuid}`" class="text-xl text-[#4D4D4D] xl:text-2xl xl:leading-[48px]">
            Passez de l’éveil à l’action en participant aux missions de bénévolat au service de ce que nous avons de plus précieux : notre planète.
          </p>
        </div>
        <img
          src="/images/operations/logo-printemps-pour-la-planete.svg"
          alt="Printemps pour la planète"
          width="231"
          height="231"
          class="flex-none w-[227px] h-[227px] sm:w-[169px] sm:h-[169px] lg:w-[200px] lg:h-[200px] xl:w-[382px] xl:h-[382px]"
        >
      </div>
      <div v-if="missions.length" class="mt-12">
        <div class="lg:flex lg:justify-between lg:items-center mb-4 lg:mb-8 xl:mb-14">
          <div class="">
            <p class="font-bold text-xl lg:text-2xl xl:text-[32px] xl:leading-[40px]">
              Opération du 3 au 23 avril
            </p>
          </div>
          <div class="hidden lg:block">
            <div class="flex space-x-2">
              <SlideshowArrows
                button-class="hover:bg-[#F6F6F6]"
                @previous="handleSlideshowPreviousClick"
                @next="handleSlideshowNextClick"
              />
              <Button class="flex-none" type="secondary" @click="handleClick()">
                Plus de missions
              </Button>
            </div>
          </div>
        </div>
        <Slideshow
          ref="slideshowOperation"
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
        <div class="lg:hidden mt-6 text-center">
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
    handleSlideshowPreviousClick () {
      this.$refs.slideshowOperation.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowOperation.next()
    },
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
