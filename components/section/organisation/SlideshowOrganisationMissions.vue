<template>
  <div class="py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div class="">
          <Heading as="h2" size="alt-sm" class="mb-6 md:mb-2">
            {{ title }}
          </Heading>
        </div>
        <div class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <SlideshowArrows
              button-class="hover:bg-[#F6F6F6]"
              ref-name="slideshowOrganisationMissions"
              :refs="$refs"
              @previous="handleSlideshowPreviousClick"
              @next="handleSlideshowNextClick"
            />
            <Button
              class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#F6F6F6]"
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
          ref="slideshowOrganisationMissions"
          aria-labelledby="label-slideshow-organisation-missions"
          :search-parameters="searchParameters"
          @slide-click="onSlideClick"
        />
      </div>

      <div class="lg:hidden mt-6 text-center">
        <Button type="tertiary" @click="onViewMoreClick()">
          Plus de missions
        </Button>
      </div>
      <div v-if="showDisponibilities" class="mt-8 flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-6">
        <p class="font-bold text-xl xl:text-2xl">
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
              context="clickable"
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
import uuid from '@/mixins/uuid'

export default {
  components: {
    Button,
    Heading,
    Tag,
    AlgoliaSlideshowMissions
  },
  mixins: [uuid],
  props: {
    organisation: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    searchParameters: {
      type: Object,
      required: true
    },
    redirectParameters: {
      type: Object,
      required: true
    },
    showDisponibilities: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      links: [
        { label: '1 heure', to: `/missions-benevolat?structure.name=${this.organisation.name}&commitment__total=<%3D1&duration=1_hour&time_period=year` },
        { label: '2 heures', to: `/missions-benevolat?structure.name=${this.organisation.name}&commitment__total=<%3D2&duration=2_hours&time_period=year` },
        { label: 'Une demi-journée', to: `/missions-benevolat?structure.name=${this.organisation.name}&commitment__total=<%3D4&duration=half_day&time_period=year` },
        { label: '1 jour', to: `/missions-benevolat?structure.name=${this.organisation.name}&commitment__total=<%3D7&duration=day&time_period=year` },
        { label: '2 jours', to: `/missions-benevolat?structure.name=${this.organisation.name}&commitment__total=<%3D14&duration=2_days&time_period=year` },
        { label: '3 jours', to: `/missions-benevolat?structure.name=${this.organisation.name}&commitment__total=<%3D21&duration=3_days&time_period=year` }
      ]
    }
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowOrganisationMissions.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowOrganisationMissions.next()
    },
    onViewMoreClick () {
      this.$plausible.trackEvent('Association - CTA - Plus de missions', {
        props: {
          isLogged: this.$store.getters.isLogged,
          organisation: this.organisation.name
        }
      })

      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters
        }
      })
    },
    onSlideClick () {
      this.$plausible.trackEvent('Association - Clique - Missions', {
        props: {
          isLogged: this.$store.getters.isLogged,
          organisation: this.organisation.name
        }
      })
    },
    onDisponibilityClick () {
      this.$plausible.trackEvent('Association - CTA - Disponibilités - Missions', {
        props: {
          isLogged: this.$store.getters.isLogged,
          organisation: this.organisation.name
        }
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
