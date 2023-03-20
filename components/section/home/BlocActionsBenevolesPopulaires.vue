<template>
  <div class="bg-white py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div class="">
          <Heading as="h2" size="alt-sm" class="mb-6 md:mb-2">
            Actions bénévoles populaires
          </Heading>
          <p id="label-slideshow-missions-populaires" class="text-[#4D4D4D] text-xl xl:text-2xl">
            Découvrez les missions de bénévolat qui engagent le plus la communauté
          </p>
        </div>
        <div class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <SlideshowArrows
              button-class="hover:bg-[#F6F6F6]"
              ref-name="slideshowPopulaire"
              :refs="$refs"
              @previous="handleSlideshowPreviousClick"
              @next="handleSlideshowNextClick"
            />
            <Button class="flex-none" type="secondary" @click="onViewMoreClick()">
              Plus de missions
            </Button>
          </div>
        </div>
      </div>
      <div v-if="organisations.length > 0" class="mt-12">
        <AlgoliaSlideshowMissions
          ref="slideshowPopulaire"
          aria-labelledby="label-slideshow-missions-populaires"
          :search-parameters="{
            hitsPerPage: 6,
            aroundPrecision: 2000,
            aroundLatLngViaIP: true,
            facetFilters: [facetFilterOrganisationsNames],
            aroundRadius: 'all'
          }"
          @slide-click="onSlideClick()"
        />
      </div>
      <div class="lg:hidden mt-6 text-center">
        <Button type="tertiary" @click="onViewMoreClick()">
          Plus de missions
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import Heading from '@/components/dsfr/Heading.vue'
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'

export default {
  components: {
    Button,
    AlgoliaSlideshowMissions,
    Heading
  },
  data () {
    return {
      organisations: []
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: organisations } = await this.$axios.get('/organisations/popular')
    this.organisations = organisations
  },
  computed: {
    facetFilterOrganisationsNames () {
      if (this.organisations.length == 0) {
        return ''
      }
      const names = this.organisations.map((organisation) => {
        return `structure.name:${organisation.name}`
      })
      return names
    },
    searchPageWithFilters () {
      const filters = []

      if (this.organisations.length > 0) {
        filters.push(`structure.name=${this.organisations.map((organisation) => {
          return encodeURIComponent(organisation.name)
        }).join('|')}`)
      }

      return filters.join('&')
    }
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowPopulaire.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowPopulaire.next()
    },
    onViewMoreClick () {
      window.plausible &&
        window.plausible('Homepage|CTA - Plus de missions - Mission populaire', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push(`/missions-benevolat?${this.searchPageWithFilters}`)
    },
    onSlideClick () {
      window.plausible &&
        window.plausible('Homepage|Clique - Mission populaire', {
          props: { isLogged: this.$store.getters.isLogged }
        })
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
