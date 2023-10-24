<template>
  <div v-show="hasResults" class="bg-white py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div>
          <DsfrHeading as="h2" size="alt-sm" class="mb-6 md:mb-2">
            Actions bénévoles populaires
          </DsfrHeading>
          <p id="label-slideshow-missions-populaires" class="text-[#4D4D4D] text-xl xl:text-2xl">
            Découvrez les missions de bénévolat qui engagent le plus la communauté
          </p>
        </div>
        <div v-if="organisations.length > 0" class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <div id="slideshowPopulaireArrows" />
            <DsfrButton class="flex-none" type="secondary" @click="onViewMoreClick()">
              Plus de missions
            </DsfrButton>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <AlgoliaSlideshowMissions
          v-if="organisations.length > 0"
          navigation-id="slideshowPopulaireArrows"
          navigation-button-class="hover:bg-[#F6F6F6]"
          aria-labelledby="label-slideshow-missions-populaires"
          :search-parameters="{
            hitsPerPage: 6,
            aroundPrecision: 2000,
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
            facetFilters: facetFilterOrganisationsNames,
          }"
          @slide-click="onSlideClick()"
          @results="hasResults = $event.length > 0"
        />
      </div>
      <div class="lg:hidden mt-6 text-center">
        <DsfrButton type="tertiary" @click="onViewMoreClick()"> Plus de missions </DsfrButton>
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
  data() {
    return {
      organisations: [],
      hasResults: false,
    }
  },
  created() {
    if (process.client) {
      this.fetch()
    }
  },
  computed: {
    facetFilterOrganisationsNames() {
      if (this.organisations.length == 0) {
        return []
      }
      const names = this.organisations.map((organisation) => {
        return `structure.name:${organisation.name}`
      })
      return [names]
    },
    searchPageWithFilters() {
      const filters = []

      if (this.organisations.length > 0) {
        filters.push(
          `structure.name=${this.organisations
            .map((organisation) => {
              return encodeURIComponent(organisation.name)
            })
            .join('|')}`
        )
      }

      return filters.join('&')
    },
  },
  methods: {
    async fetch() {
      const data = await apiFetch('/organisations/popular')
      this.organisations = data.organisations
    },
    handleSlideshowPreviousClick() {
      this.$refs.slideshowPopulaire.previous()
    },
    handleSlideshowNextClick() {
      this.$refs.slideshowPopulaire.next()
    },
    onViewMoreClick() {
      this.$plausible.trackEvent('Homepage - CTA - Plus de missions - Mission populaire', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$router.push(`/missions-benevolat?${this.searchPageWithFilters}`)
    },
    onSlideClick() {
      this.$plausible.trackEvent('Homepage - Clique - Mission populaire', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
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
