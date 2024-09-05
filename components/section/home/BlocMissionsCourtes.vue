<template>
  <div class="bg-jva-blue-500 py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div>
          <DsfrHeading as="h2" size="alt-sm" class="mb-6 md:mb-2" color="text-white">
            Devenez bénévole d'un jour !
          </DsfrHeading>
          <p id="label-slideshow-missions-courtes" class="text-white text-xl xl:text-2xl">
            Des missions courtes selon vos envies
          </p>
        </div>
        <div class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <div id="slideshowBenevoleDunJourArrows" />
            <DsfrButton
              class="flex-none text-white border-white hover:bg-jva-blue-900"
              type="transparent"
              @click="onViewMoreClick()"
            >
              Plus de missions
            </DsfrButton>
          </div>
        </div>
      </div>
      <div class="mt-12 xl:mt-20">
        <AlgoliaSlideshowMissions
          navigation-id="slideshowBenevoleDunJourArrows"
          navigation-variant="white"
          navigation-button-class="hover:bg-jva-blue-900"
          dots-variant="light"
          aria-labelledby="label-slideshow-missions-courtes"
          :search-parameters="{
            hitsPerPage: 6,
            aroundPrecision: 2000,
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
            facetFilters: ['commitment:few_hours'],
          }"
          @slide-click="onSlideClick"
        />
      </div>

      <div class="lg:hidden mt-6 text-center">
        <DsfrButton type="tertiary-no-outline" @click="onViewMoreClick()">
          Plus de missions
        </DsfrButton>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSlideshowMissions,
  },
  methods: {
    onViewMoreClick() {
      this.$plausible.trackEvent('Homepage - CTA - Plus de missions - Mission courte', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$router.push('/missions-benevolat?commitment=few_hours')
    },
    onSlideClick() {
      this.$plausible.trackEvent('Homepage - Clique - Mission courte', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
    },
    onDisponibilityClick() {
      this.$plausible.trackEvent('Homepage - CTA - Disponibilités - Mission courte', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
    },
  },
})
</script>
