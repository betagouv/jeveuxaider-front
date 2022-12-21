<template>
  <div>
    <div class="mb-12">
      <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl">
        <Breadcrumb
          :links="[
            { text: 'Missions de bénévolat', to: '/missions-benevolat' },
            {
              text: mission.domaine_name,
              to: `/missions-benevolat?domaines=${mission.domaine_name}`,
            },
            {
              text: breadcrumbTitle,
              is: 'h1',
            },
          ]"
        />
      </div>

      <div class="px-4 pb-12 max-w-3xl mx-auto lg:max-w-7xl">
        <div class="lg:flex lg:items-start lg:gap-8">
          <div class="space-y-8 flex-1">
            <Presentation :mission="mission" />
            <PresentielOrDistance :mission="mission" />
            <Box>
              <div class="text-lg mb-4 text-gray-800">
                Tout savoir sur cette mission
              </div>

              <TextFormatted :max-lines="7" :text="mission.description" class="text-cool-gray-500" />
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
                  class="mt-8 w-full"
                />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>

    <!-- CTA MOBILE FIXED FOOTER -->
    <div
      class="sm:hidden fixed bottom-0 p-4 bg-white z-50 w-full left-0 right-0"
      style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%);"
    >
      <ButtonJeProposeMonAideApiEngagement
        :url="mission.application_url"
        class="w-full"
      />

      <div
        v-if="formattedDate"
        class="text-cool-gray-500 text-sm text-center mt-4"
        v-html="formattedDate"
      />
    </div>
  </div>
</template>

<script>
import Presentation from '@/components/section/mission/Presentation.vue'
import PresentielOrDistance from '@/components/section/mission/PresentielOrDistance.vue'
import ButtonJeProposeMonAideApiEngagement from '@/components/custom/ButtonJeProposeMonAideApiEngagement.vue'
import MixinMission from '@/mixins/mission'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    Presentation,
    PresentielOrDistance,
    ButtonJeProposeMonAideApiEngagement,
    Breadcrumb
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
