<template>
  <div>
    <div class="absolute w-full" style="height: 360px">
      <img
        src="/images/missions/bg_header_mission.jpg"
        alt="Mission bénévolat"
        class="object-cover w-full h-full"
      >
    </div>

    <div class="relative mb-12">
      <Breadcrumb
        theme="transparent"
        class="relative z-10 px-4 xl:container !max-w-7xl"
        :items="[
          { label: 'Missions de bénévolat', link: '/missions-benevolat' },
          {
            label: mission.domaine_name,
            link: `/missions-benevolat?domaines=${mission.domaine_name}`,
          },
          {
            label: breadcrumbTitle,
            h1: true,
          },
        ]"
      />

      <div class="px-4 pb-12 max-w-3xl mx-auto lg:max-w-7xl">
        <div class="lg:flex lg:items-start lg:gap-6">
          <div class="space-y-6 flex-1">
            <Presentation :mission="mission" />
            <PresentielOrDistance :mission="mission" />
            <Box>
              <Heading as="div" :level="3" class="mb-4">
                Tout savoir sur cette mission
              </Heading>

              <TextFormatted :max-lines="7" :text="mission.description" class="text-cool-gray-500 whitespace-pre-line" />

              <ButtonJeProposeMonAideApiEngagement
                :url="mission.application_url"
                class="mt-8"
              />
            </Box>
          </div>

          <Box class="overflow-hidden mt-6 lg:w-96 lg:mt-0 z-20 flex-shrink-0 sticky top-6 lg:text-center" :padding="false">
            <img
              :srcset="thumbnailApi"
              sizes="(min-width: 1024px) 384px, 100vw"
              alt="Organisation"
              class="w-full object-cover object-top"
              width="630"
              height="300"
              data-not-lazy
              @error="onImgError"
            >

            <div class="px-6 py-12">
              <div
                v-if="formattedDate"
                class="text-base"
                v-html="formattedDate"
              />

              <div
                class="font-extrabold text-xl"
                v-html="placesLeftText"
              />

              <div class="mx-8">
                <ButtonJeProposeMonAideApiEngagement
                  :url="mission.application_url"
                  class="mt-8"
                />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Presentation from '@/components/section/mission/Presentation.vue'
import PresentielOrDistance from '@/components/section/mission/PresentielOrDistance.vue'
import ButtonJeProposeMonAideApiEngagement from '@/components/custom/ButtonJeProposeMonAideApiEngagement.vue'
import MixinMission from '@/mixins/mission'

export default {
  components: {
    Presentation,
    PresentielOrDistance,
    ButtonJeProposeMonAideApiEngagement
  },
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  computed: {
    placesLeftText () {
      if (
        this.mission.publisher_name != 'Réserve Civique' &&
        this.mission.places_left > 99
      ) {
        return 'Plusieurs bénévoles recherchés'
      } else if (this.mission.has_places_left && this.mission.places_left > 0) {
        return (
          this.$options.filters.pluralize(this.mission.places_left,
            'bénévole recherché',
            'bénévoles recherchés'
          )
        )
      } else {
        return this.mission.has_places_left === false
          ? 'Complet'
          : 'Plusieurs bénévoles recherchés'
      }
    },
    formattedDate () {
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date

      if (!endDate) {
        return null
      }

      if (this.$dayjs(endDate).diff(this.$dayjs(startDate), 'year') > 1) {
        return null
      }

      if (this.$dayjs(startDate).isSame(this.$dayjs(endDate))) {
        return `Le <b>${this.$dayjs(startDate).format('D MMMM YYYY')}</b>`
      }

      if (this.$dayjs(startDate).isSame(this.$dayjs(endDate), 'year')) {
        return `Du <b>${this.$dayjs(startDate).format('D MMMM')}</b> au <b>${this.$dayjs(endDate).format('D MMMM YYYY')}</b>`
      }

      return `Du <b>${this.$dayjs(startDate).format('D MMMM YYYY')}</b> au <b>${this.$dayjs(endDate).format('D MMMM YYYY')}</b>`
    },
    breadcrumbTitle () {
      return this.mission.city
        ? `Bénévolat ${this.mission.structure.name} à ${this.mission.city}`
        : `Bénévolat ${this.mission.structure.name}`
    }
  },
  methods: {
    onImgError ($event) {
      $event.target.srcset = '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
</script>
