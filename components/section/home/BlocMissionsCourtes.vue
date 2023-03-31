<template>
  <div class="bg-jva-blue-500 py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div class="">
          <Heading as="h2" size="alt-sm" class="mb-6 md:mb-2" color="text-white">
            Devenez bénévole d'un jour !
          </Heading>
          <p id="label-slideshow-missions-courtes" class="text-white text-xl xl:text-2xl">
            Des missions courtes selon vos envies
          </p>
        </div>
        <div class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <SlideshowArrows
              variant="white"
              button-class="hover:bg-jva-blue-900"
              ref-name="slideshowBenevoleDunJour"
              :refs="$refs"
              @previous="handleSlideshowPreviousClick"
              @next="handleSlideshowNextClick"
            />
            <Button
              class="flex-none text-white border-white hover:bg-jva-blue-900"
              type="transparent"
              @click="onViewMoreClick()"
            >
              Plus de missions
            </Button>
          </div>
        </div>
      </div>
      <div class="mt-12 xl:mt-20">
        <AlgoliaSlideshowMissions
          ref="slideshowBenevoleDunJour"
          dots-variant="light"
          aria-labelledby="label-slideshow-missions-courtes"
          :search-parameters="{
            hitsPerPage: 6,
            aroundPrecision: 2000,
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
            numericFilters: ['commitment__total <= 4'],
          }"
          @slide-click="onSlideClick"
        />
      </div>

      <div class="lg:hidden mt-6 text-center">
        <Button type="tertiary-no-outline" @click="onViewMoreClick()">
          Plus de missions
        </Button>
      </div>
      <div class="mt-8 flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-6">
        <p class="text-white font-bold text-xl xl:text-2xl">
          Quelles sont vos disponibilités ?
        </p>
        <div class="flex flex-wrap gap-4">
          <nuxt-link
            v-for="link,i in links"
            :key="i"
            :to="link.to"
            class="rounded-full"
            @click.native="onDisponibilityClick()"
          >
            <Tag
              size="md"
              :custom-theme="true"
              class="text-white border border-[#8080CD] cursor-ponter hover:bg-jva-blue-900 sm:hover:border-[#b8b8e8] active:!border-white"
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
import Heading from '@/components/dsfr/Heading.vue'
import Tag from '@/components/dsfr/Tag.vue'
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'

export default {
  components: {
    Button,
    Heading,
    Tag,
    AlgoliaSlideshowMissions
  },
  data () {
    return {
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
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowBenevoleDunJour.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowBenevoleDunJour.next()
    },
    onViewMoreClick () {
      window.plausible &&
        window.plausible('Homepage|CTA - Plus de missions - Mission courte', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/missions-benevolat?commitment__total=<%3D4&duration=half_day&time_period=year')
    },
    onSlideClick () {
      window.plausible &&
        window.plausible('Homepage|Clique - Mission courte', {
          props: { isLogged: this.$store.getters.isLogged }
        })
    },
    onDisponibilityClick () {
      window.plausible &&
        window.plausible('Homepage|CTA - Disponibilités - Mission courte', {
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
