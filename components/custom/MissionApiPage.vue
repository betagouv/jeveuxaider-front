<template>
  <div>
    <div
      class="absolute bg-gradient-to-b from-[#ECECFE] to-transparent w-full overflow-hidden pointer-events-none"
      style="height: 777px"
    >
      <img
        src="/images/homepage/deco_2.svg"
        alt=""
        class="deco--2 absolute hidden lg:block pointer-events-none"
        data-not-lazy
      />

      <img
        src="/images/homepage/deco_3.svg"
        alt=""
        class="deco--3 absolute hidden lg:block pointer-events-none"
        data-not-lazy
      />
    </div>

    <div class="mb-12">
      <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl">
        <DsfrBreadcrumb
          :links="[
            { text: 'Missions de bénévolat', to: '/missions-benevolat' },
            {
              text: mission.domaine.name,
              to: `/missions-benevolat?domaines=${mission.domaine.name}`,
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
            <BaseBox>
              <div class="text-lg mb-4 text-gray-800">Tout savoir sur cette mission</div>

              <BaseTextFormatted
                :max-lines="7"
                :text="mission.description"
                class="text-cool-gray-500"
              />
            </BaseBox>
          </div>

          <BaseBox
            class="overflow-hidden mt-6 lg:w-96 lg:mt-0 z-20 flex-shrink-0 sticky top-6 lg:text-center"
            :padding="false"
          >
            <NuxtImg
              ref="thumbnailApi"
              src="/images/card-thumbnail-default.jpg"
              :srcset="thumbnailApi"
              sizes="(min-width: 1024px) 384px, 100vw"
              alt="Organisation"
              class="w-full object-cover object-top"
              width="630"
              height="300"
              data-not-lazy
              @error="onImgError"
            />

            <div class="pb-8 pt-6 px-6">
              <div v-if="formattedDate" class="text-base" v-html="formattedDate" />

              <div class="font-extrabold text-xl" v-html="placesLeftText" />

              <ButtonJeProposeMonAideApiEngagement
                :url="mission.application_url"
                class="mt-8 w-full"
              />
            </div>
          </BaseBox>
        </div>
      </div>
    </div>

    <div
      v-if="similarMissions.length > 0"
      id="missions-similaires"
      class="bg-[#ECECFE] overflow-hidden mt-12"
    >
      <div class="container mx-auto px-8 sm:px-4">
        <div class="pt-16 pb-24">
          <DsfrHeading :id="`label-autres-missions-${uuid}`" as="div" class="text-center mb-12">
            Vous pourriez aussi aimer&nbsp;…
          </DsfrHeading>

          <BaseSlideshow class="mb-6" :aria-labelledby="`label-autres-missions-${uuid}`">
            <swiper-slide
              v-for="similarMission in similarMissions"
              :key="similarMission.id"
              class="card--mission--wrapper"
            >
              <nuxt-link
                no-prefetch
                :to="`/missions-benevolat/${similarMission.id}/${similarMission.slug}`"
                @click.native="onClickSimilarMission"
                class="h-full"
              >
                <CardMission :mission="similarMission" class="!h-full" />
              </nuxt-link>
            </swiper-slide>
          </BaseSlideshow>

          <div v-if="activity || domaine" class="text-center">
            <DsfrLink
              class="text-jva-blue-500"
              icon="RiArrowRightLine"
              @click.native="onClickMoreMissions"
            >
              Plus de missions
            </DsfrLink>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA MOBILE FIXED FOOTER -->
    <div
      class="sm:hidden fixed bottom-0 p-4 bg-white z-50 w-full left-0 right-0"
      style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%)"
    >
      <ButtonJeProposeMonAideApiEngagement :url="mission.application_url" class="w-full" />

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
import CardMission from '@/components/card/CardMission.vue'
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  components: {
    Presentation,
    PresentielOrDistance,
    ButtonJeProposeMonAideApiEngagement,
    CardMission,
  },
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      similarMissions: [],
      slideshowKey: 0,
      uuid: uuidv4(),
    }
  },
  async setup(props) {
    const { data: similarMissions } = await useApiFetch('/missions/similar-for-api', {
      method: 'POST',
      body: {
        mission: props.mission,
      },
    })

    return {
      similarMissions,
    }
  },
  computed: {
    placesLeftText() {
      if (this.mission.publisher_name != 'JeVeuxAider.gouv.fr' && this.mission.places_left > 99) {
        return 'Plusieurs bénévoles recherchés'
      } else if (this.mission.has_places_left && this.mission.places_left > 0) {
        return this.$filters.pluralize(
          this.mission.places_left,
          'bénévole recherché',
          'bénévoles recherchés'
        )
      } else {
        return this.mission.has_places_left === false ? 'Complet' : 'Plusieurs bénévoles recherchés'
      }
    },
    formattedDate() {
      const startDate = this.$dayjs(this.mission.start_date)
      const endDate = this.$dayjs(this.mission.end_date)

      if (!endDate) {
        return null
      }

      if (endDate.diff(startDate, 'year') > 1) {
        return null
      }

      if (startDate.isSame(endDate)) {
        return `Le <b>${startDate.format('D MMMM YYYY')}</b>`
      }

      if (startDate.isSame(endDate, 'year')) {
        return `Du <b>${startDate.format('D MMMM')}</b> au <b>${endDate.format('D MMMM YYYY')}</b>`
      }

      return `Du <b>${startDate.format('D MMMM YYYY')}</b> au <b>${endDate.format(
        'D MMMM YYYY'
      )}</b>`
    },
    breadcrumbTitle() {
      return this.mission.city
        ? `Bénévolat ${this.mission.structure.name} à ${this.mission.city}`
        : `Bénévolat ${this.mission.structure.name}`
    },
  },
  mounted() {
    this.$plausible.trackEvent('Mission - Visite', {
      props: {
        isFromApi: this.mission.isFromApi ?? false,
        isRegistrationOpen: this.mission.is_registration_open,
        hasPlacesLeft: this.mission.has_places_left,
        isOutdated: this.hasExpired,
      },
    })
  },
  methods: {
    onImgError() {
      this.$refs.thumbnailApi.$el.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>

<style lang="postcss" scoped>
.card--mission--wrapper {
  @apply !flex flex-col h-full max-w-[320px] transition;
  width: calc(100vw - 64px) !important;
  @apply w-full;
}

.deco--2 {
  left: calc(50% - 772px);
  top: 150px;
}

.deco--3 {
  right: calc(50% - 728px);
  top: -12px;
}
</style>
