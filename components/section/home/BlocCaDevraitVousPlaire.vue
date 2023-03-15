<template>
  <div class="bg-white">
    <div class="container">
      <div class="pt-24 pb-12">
        <Heading as="h2" size="alt-md" class="text-center">
          <span class="relative">
            <img
              src="/images/home/sparkle-left.svg"
              class="absolute left-[-26px] top-[-5px]"
              width="37"
              height="33"
              aria-hidden="true"
            >
            <span>On vous a concocté une petite sélection de missions</span>
          </span>
        </Heading>
        <p class="mt-4 text-[#666666] text-[28px] leading-10 text-center">
          Suggérées d’après
          <nuxt-link to="/profile/edit" class="underline hover:text-gray-800">
            vos préférences
          </nuxt-link> ›
        </p>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="relative h-[78px] w-[78px] flex justify-center items-center bg-[#F9F6F2] border-8 border-white rounded-full top-[31px]">
        <RiArrowDownLine class="text-[#666666] w-8 fill-current flex-none" />
      </div>
    </div>
    <div class="bg-[#F9F6F2] py-12 overflow-hidden">
      <div class="container">
        <div class="lg:flex lg:justify-between lg:items-center">
          <div class="">
            <Heading as="h3" size="alt-sm" class="mb-6" color="">
              Ça devrait vous plaire
            </Heading>
            <p id="label-slideshow-preferences-action" class="text-[#666666] text-xl leading-tight">
              Missions sélectionnées d’après vos  <nuxt-link to="/profile/edit" class="underline hover:text-gray-800">
                affinités et disponibilités
              </nuxt-link> ›
            </p>
          </div>
          <div class="hidden lg:block">
            <div class="flex space-x-2">
              <SlideshowArrows
                button-class="hover:bg-[#EFECE8]"
                @previous="handleSlideshowPreviousClick"
                @next="handleSlideshowNextClick"
              />
              <Button class="flex-none" type="transparent" extra-class="text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]" @click="handleClick()">
                Plus de missions
              </Button>
            </div>
          </div>
        </div>
        <div v-if="missions.length" class="mt-12">
          <Slideshow
            ref="slideshowMissionsByAffinities"
            aria-labelledby="label-slideshow-preferences-action"
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
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import CardMission from '@/components/card/CardMission.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Heading,
    CardMission,
    Button
  },
  data () {
    return {
      missions: [],
      defaultFilters: 'provider:reserve_civique AND is_registration_open=1 AND has_places_left=1 AND is_outdated=0'
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: missions } = await this.$axios.post('/algolia/missions', {
      filters: `${this.profileActivitiesFilters}`,
      numericFilters: [`${this.profileCommitmentFilters}`],
      aroundLatLngViaIP: true
    })
    this.missions = missions
  },
  computed: {
    profileActivitiesFilters () {
      if (this.$store.getters.profile.activities.length === 0) {
        return ''
      }
      const activities = this.$store.getters.profile.activities.map((activity) => {
        return `activity.id=${activity.id}`
      })
      return `(${activities.join(' OR ')})`
    },
    profileCommitmentFilters () {
      if (!this.$store.getters.profile.commitment__total) {
        return ''
      }
      return `"commitment__total <= ${this.$store.getters.profile.commitment__total}"`
    },
    searchPageWithFilters () {
      const filters = []
      if (this.$store.getters.profile.commitment__total) {
        filters.push(`commitment__total=<%3D${this.$store.getters.profile.commitment__total}`)
      }
      // if (this.$store.getters.profile.commitment__duration) {
      //   filters.push(`duration=${this.$store.getters.profile.commitment__duration}`)
      // }
      // if (this.$store.getters.profile.commitment__time_period) {
      //   filters.push(`time_period=${this.$store.getters.profile.commitment__time_period}`)
      // }
      if (this.$store.getters.profile.activities) {
        filters.push(`activity.name=${this.$store.getters.profile.activities.map((activity) => {
          return activity.name
        }).join('|')}`)
      }

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
    handleClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage - Ca devrait vous plaire', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push(`/missions-benevolat?${this.searchPageWithFilters}`)
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
