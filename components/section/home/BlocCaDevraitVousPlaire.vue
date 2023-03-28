<template>
  <div class="bg-white">
    <div class="container">
      <div class="pt-12 pb-10 xl:pt-20 xl:pb-[72px]">
        <Heading as="h2" size="alt-md" class="text-center">
          <span class="relative">
            <img
              src="/images/home/sparkle-left.svg"
              alt=""
              width="37"
              height="33"
              aria-hidden="true"
              class="absolute left-[-26px] top-[-8px] xl:w-[50px] xl:left-[-38px] xl:top-[-8px] pointer-events-none"
            >
            <span>On vous a concocté une </span>
            <br class="hidden md:block">
            <span>petite sélection de missions</span>
          </span>
        </Heading>
        <p class="mt-4 text-[#666666] text-xl leading-7 text-center">
          Suggérées d’après
          <Link to="/profile/edit">
            vos préférences
          </Link> ›
        </p>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="h-[78px] w-[78px] lg:h-[90px] lg:w-[90px] mb-[-39px] lg:mb-[-45px] flex justify-center items-center bg-[#F9F6F2] border-8 border-white rounded-full">
        <RiArrowDownLine class="text-[#666666] w-8 lg:w-10 fill-current flex-none" />
      </div>
    </div>
    <div class="bg-[#F9F6F2] pt-14 pb-10 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 xl:pt-32 xl:pb-28 overflow-hidden">
      <div class="container">
        <div class="lg:flex lg:justify-between lg:items-center">
          <div class="">
            <Heading as="h3" size="alt-sm" class="mb-6" color="">
              Ça devrait vous plaire
            </Heading>
            <p id="label-slideshow-preferences-action" class="text-[#666666] text-xl leading-7">
              <span>Missions sélectionnées d’après vos </span>
              <Link to="/profile/edit">
                affinités et disponibilités
              </Link> ›
            </p>
          </div>
          <div class="hidden lg:block">
            <div class="flex space-x-2">
              <SlideshowArrows
                button-class="hover:bg-[#EFECE8]"
                ref-name="slideshowMissionsByAffinities"
                :refs="$refs"
                @previous="handleSlideshowPreviousClick"
                @next="handleSlideshowNextClick"
              />
              <Button
                class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]"
                type="transparent"
                @click="onViewMoreClick()"
              >
                Plus de missions
              </Button>
            </div>
          </div>
        </div>
        <div class="mt-12">
          <AlgoliaSlideshowMissions
            ref="slideshowMissionsByAffinities"
            aria-labelledby="label-slideshow-preferences-action"
            :search-parameters="{
              hitsPerPage: 6,
              aroundLatLngViaIP: true,
              aroundPrecision: 2000,
              aroundRadius: 'all',
              facetFilters: [facetFilterActivities],
              numericFilters: [numericFiltersCommitmentTotal],
            }"
            @slide-click="onSlideClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'
import Link from '@/components/dsfr/Link.vue'
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'
import allActivities from '@/assets/activities.json'

export default {
  components: {
    Heading,
    AlgoliaSlideshowMissions,
    Button,
    Link
  },
  fetchOnServer: false,
  data () {
    return {
      organisations: null,
      allActivities
    }
  },
  computed: {
    activities () {
      return this.$store.getters.profile.activities.length
        ? this.$store.getters.profile.activities
        : this.allActivities.filter(activity => activity.popular === true)
    },
    facetFilterActivities () {
      return this.activities.map(activity => `activity.name:${activity.name}`)
    },
    numericFiltersCommitmentTotal () {
      const commitmentTotal = this.$store.getters.profile.commitment__total ?? 4
      return [`commitment__total <= ${commitmentTotal}`]
    },
    searchPageWithFilters () {
      const filters = []
      filters.push(`commitment__total=<%3D${this.$store.getters.profile.commitment__total ?? '4'}`)
      filters.push(`duration=${this.$store.getters.profile.commitment__duration ?? 'half_day'}`)
      filters.push(`time_period=${this.$store.getters.profile.commitment__time_period ?? 'year'}`)
      filters.push(`activity.name=${this.activities.map(activity => encodeURIComponent(activity.name)).join('|')}`)
      return filters.join('&')
    }
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowMissionsByAffinities.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowMissionsByAffinities.next()
    },
    onViewMoreClick () {
      window.plausible &&
        window.plausible('Homepage|CTA - Plus de missions - Recommandations', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push(`/missions-benevolat?${this.searchPageWithFilters}`)
    },
    onSlideClick () {
      window.plausible &&
      window.plausible('Homepage|Clique - Mission recommandée', {
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
