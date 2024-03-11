<template>
  <div>
    <ClientOnly>
      <Teleport v-if="!mission.is_online" to="#teleport-header-top">
        <transition name="fade">
          <BaseBanner>
            {{
              mission.state == 'Validée' && mission.structure.state == 'Validée'
                ? "La mission n'est pas visible car elle a été mise hors ligne par un modérateur"
                : "La mission n'est pas visible car elle est au statut « " +
                  mission.state +
                  " » et l'organisation est « " +
                  mission.structure.state +
                  ' »'
            }}

            <template #action>
              <DsfrLink icon="RiArrowRightLine" :to="`/admin/missions?filter[id]=${mission.id}`">
                Gérer
              </DsfrLink>
            </template>
          </BaseBanner>
        </transition>
      </Teleport>
    </ClientOnly>

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

    <div class="mx-auto px-4 lg:max-w-7xl xl:!container">
      <DsfrBreadcrumb
        class="relative z-10 px-4 xl:container !max-w-7xl text-shadow"
        :links="[
          { text: 'Missions de bénévolat', to: '/missions-benevolat' },
          {
            text: domainName,
            to: `/missions-benevolat?domaines=${domainName}`,
          },
          {
            text:
              missionType == 'Mission en autonomie'
                ? `Bénévolat ${mission.structure.name} en autonomie`
                : missionType == 'Mission en présentiel'
                ? `Bénévolat ${mission.structure.name} à ${mission.city}`
                : `Bénévolat ${mission.structure.name} à distance`,
            is: 'h1',
          },
        ]"
      />
    </div>

    <div class="px-4 pb-12 max-w-3xl mx-auto lg:max-w-7xl xl:!container">
      <div class="lg:flex lg:items-start lg:gap-8">
        <div class="space-y-8 flex-1">
          <Presentation :mission="mission" />
          <PresentielOrDistance :mission="mission" />
          <Details :mission="mission" />
          <BaseBox
            v-if="
              !['Organisation publique', 'Collectivité'].includes(
                mission.structure.statut_juridique
              )
            "
            class="flex flex-col sm:flex-row gap-6 xl:gap-8 text-center sm:text-left"
          >
            <img
              v-if="
                mission.structure.logo &&
                (mission.structure.logo.thumb || mission.structure.logo.original)
              "
              :src="
                mission.structure.logo.thumb
                  ? mission.structure.logo.thumb
                  : mission.structure.logo.original
              "
              :alt="mission.structure.name"
              class="mx-auto lg:mx-0 my-auto h-20 object-contain"
              style="max-width: 150px"
            />

            <div>
              <div class="text-lg mb-4 text-gray-800">
                Découvrez
                <span class="lowercase">
                  {{
                    $filters.prefix(
                      $filters.label(mission.structure.statut_juridique, 'structure_legal_status')
                    )
                  }}</span
                >
                {{ mission.structure.name }}
              </div>

              <p class="text-cool-gray-500 line-clamp-3 break-word">
                {{ mission.structure.description }}
              </p>

              <NuxtLink
                no-prefetch
                v-if="
                  mission.structure.statut_juridique == 'Association' &&
                  mission.structure.state == 'Validée'
                "
                :to="`/organisations/${mission.structure.slug}`"
              >
                <DsfrButton type="secondary" class="mt-8" tabindex="-1">
                  En savoir plus
                </DsfrButton>
              </NuxtLink>
            </div>
          </BaseBox>
        </div>

        <BaseBox
          class="overflow-hidden mt-8 lg:w-96 lg:mt-0 z-20 flex-shrink-0 sticky top-8"
          :padding="false"
        >
          <NuxtImg
            ref="illustration"
            :srcset="illustrationSrcset"
            :src="illustrationSrc"
            sizes="(min-width: 1024px) 384px, 100vw"
            alt=""
            :class="[
              'w-full object-cover object-top h-[180px] lg:h-[130px] transition duration-1000',
              { grayscale: !canRegister && !userParticipation },
            ]"
            width="761"
            height="363"
            @error="
              $refs.illustration.$el.srcset =
                '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
            "
          />
          <!-- Logo Organisation -->
          <component
            :is="logoOrganisationComponent"
            v-if="mission.structure.logo"
            target="_blank"
            no-prefetch
            :to="`/organisations/${mission.structure.slug}`"
            class="left-1/2 absolute -translate-x-1/2 -translate-y-2/3 bg-white shadow-lg p-3 h-[64px] flex"
          >
            <NuxtImg
              ref="logoOrganisation"
              sizes="120px"
              :srcset="mission.structure.logo.urls.small"
              :src="mission.structure.logo.urls.original"
              :alt="mission.structure.name"
              :class="[
                'my-auto object-contain w-full h-full transition duration-1000',
                { grayscale: !canRegister && !userParticipation },
              ]"
              style="max-width: 120px"
              @error="$refs.logoOrganisation.$el.parentElement.remove()"
            />
          </component>

          <div :class="['bg-white pb-8 pt-10 px-6', { 'divide-y': canRegister }]">
            <!-- Ils recherchent -->
            <div class="text-center pb-6">
              <p class="text-xl leading-tight mb-1 font-bold text-black">
                <template v-if="!mission.has_places_left">
                  La mission est désormais complète
                </template>
                <template v-else-if="!mission.is_registration_open">
                  Les inscriptions sont fermées
                </template>
                <template v-else>
                  <template v-if="['Terminée', 'Annulée'].includes(mission.state)">
                    Ils recherchaient
                  </template>
                  <template v-else> Ils recherchent </template>
                  {{ $filters.pluralize(mission.participations_max, 'bénévole', 'bénévoles') }}
                </template>
              </p>

              <template v-if="participationsCount">
                <p class="uppercase text-cool-gray-500 text-xs font-semibold">
                  {{
                    $filters.pluralize(
                      participationsCount,
                      'personne déjà inscrite',
                      'personnes déjà inscrites'
                    )
                  }}
                </p>

                <div class="mt-4 flex justify-center">
                  <img
                    v-for="(portrait, index) in portraits"
                    :key="index"
                    :src="portrait"
                    alt=""
                    :class="[{ '-ml-1': index !== 0 }]"
                    class="portrait rounded-full"
                    style="width: 34px"
                  />
                  <div
                    v-if="participationsCount - 3 > 0"
                    class="h-9 w-9 text-cool-gray-500 shadow bg-gray-50 border font-bold inline-flex items-center justify-center rounded-full text-xs -ml-1"
                  >
                    {{ formattedBenevoleCount }}
                  </div>
                </div>
              </template>
            </div>

            <!-- Dates début et fin -->
            <div v-if="canRegister && dates.length && !mission.dates" class="py-6">
              <div class="grid" :class="[{ 'sm:grid-cols-2 sm:divide-x': dates.length == 2 }]">
                <div
                  v-for="(date, i) in dates"
                  :key="i"
                  class="mx-auto sm:mx-0"
                  :class="[
                    { 'sm:pr-3': i == 0 && dates.length > 1 },
                    { 'sm:pl-3': i == 1 && dates.length > 1 },
                  ]"
                >
                  <div
                    class="flex items-center flex-col sm:flex-row gap-2"
                    :class="[{ 'justify-center': dates.length === 1 }]"
                  >
                    <dl
                      class="text-center flex gap-2 items-baseline sm:block"
                      :class="[
                        { 'sm:text-right ml-auto': i === 0 && dates.length > 1 },
                        { 'sm:text-left': i === 1 && dates.length > 1 },
                      ]"
                    >
                      <dt class="uppercase text-cool-gray-500 font-semibold text-xs space-x-2">
                        {{ date.label }}
                      </dt>
                      <dd class="text-black font-bold">
                        {{ date.date }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <!-- Durée de la mission -->
            <div v-if="canRegister" class="text-center py-6">
              <p class="uppercase text-cool-gray-500 font-semibold text-xs">Durée de la mission</p>
              <p class="text-black font-bold">
                <template v-if="mission.commitment__duration">
                  <span>{{ $filters.label(mission.commitment__duration, 'duration') }}</span>
                  <template v-if="mission.commitment__time_period">
                    <span class="font-normal"> par </span>
                    <span>{{
                      $filters.label(mission.commitment__time_period, 'time_period')
                    }}</span>
                  </template>
                </template>
                <template v-else> Non spécifié </template>
              </p>
              <p v-if="mission.recurrent_description" class="text-cool-gray-500 text-sm">
                {{ mission.recurrent_description }}
              </p>
            </div>

            <!-- CTA -->
            <div class="pt-6">
              <div v-if="canRegister && nextDates" class="text-center mb-6">
                <p class="uppercase text-cool-gray-500 font-semibold text-xs space-x-2 mb-2">
                  Prochaines dates
                </p>
                <p v-if="nextDates.length == 0" class="text-black font-bold -mt-2">
                  Plus de date disponible
                </p>
                <ul class="space-x-2">
                  <DsfrBadge
                    v-for="date in nextDates.slice(0, 3)"
                    :key="date.id"
                    as="li"
                    :no-icon="true"
                    type="new"
                  >
                    {{ $dayjs(date.id).format('D MMM') }}
                  </DsfrBadge>
                  <DsfrBadge v-if="nextDates.length > 3" :no-icon="true" type="new" as="li">
                    ...
                  </DsfrBadge>
                </ul>
              </div>
              <LoadingIndicator v-if="loading" class="min-h-[66px]" />
              <DsfrButton
                v-else-if="userParticipation"
                size="lg"
                class="w-full mt-6"
                type="secondary"
                @click.native="$router.push(userParticipationLink)"
              >
                Suivre ma candidature
              </DsfrButton>
              <div v-else-if="canRegister" class="relative text-center">
                <ButtonJeProposeMonAide :mission="mission" class="w-full" />
              </div>

              <template v-else>
                <DsfrButton disabled size="lg" class="w-full"> Inscription fermée </DsfrButton>
                <DsfrButton
                  v-if="similarMissions.length > 0"
                  v-scroll-to="{ el: '#missions-similaires', duration: 2000 }"
                  size="lg"
                  class="w-full mt-4"
                  @click.native="onClickGoToSimilarMissions"
                >
                  Voir les missions similaires
                </DsfrButton>
              </template>

              <p
                v-if="canRegister && structureScore?.response_time"
                class="mt-4 px-8 text-cool-gray-500 text-xs text-center leading-4"
              >
                <span class="font-semibold">{{ mission.structure.name }}</span> répond généralement
                <span class="font-semibold">{{ missionStructureResponseTimeFormatted }}</span>
              </p>
            </div>
          </div>
        </BaseBox>
      </div>
    </div>

    <!-- TESTIMONIALS -->
    <Testimonials :model="mission.structure" model-type="organisation" />

    <!-- MISSIONS SIMILAIRES -->
    <div
      v-if="similarMissions.length > 0"
      id="missions-similaires"
      v-observe-visibility="
        !userParticipation && !canRegister ? handleVisibilityFixedCtaMobile : false
      "
      class="bg-[#ECECFE] overflow-hidden pt-12"
    >
      <div class="container mx-auto px-8 sm:px-4">
        <div class="pt-16 pb-24">
          <DsfrHeading :id="`label-autres-missions-${uuid}`" as="div" class="text-center mb-12">
            Vous pourriez aussi aimer&nbsp;…
          </DsfrHeading>

          <BaseSlideshow
            class="mb-6"
            :slides-are-links="true"
            :aria-labelledby="`label-autres-missions-${uuid}`"
          >
            <swiper-slide
              v-for="mission in similarMissions"
              :key="mission.id"
              class="card--mission--wrapper"
            >
              <NuxtLink
                no-prefetch
                :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
                @click.native="onClickSimilarMission"
                class="h-full"
              >
                <CardMission :mission="mission" class="h-full" />
              </NuxtLink>
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
      v-show="showFixedCtaMobile"
      :class="[
        'sm:hidden fixed bottom-0 px-4 bg-white z-50 w-full left-0 right-0',
        { 'pt-4 pb-2': canRegister || userParticipation },
        { 'pt-2 pb-4': !canRegister && !userParticipation },
      ]"
      style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%)"
    >
      <div class="">
        <LoadingIndicator v-if="loading" class="min-h-[66px]" />
        <DsfrButton
          v-else-if="userParticipation"
          size="lg"
          class="w-full"
          type="secondary"
          @click.native="$router.push(userParticipationLink)"
        >
          Suivre ma candidature
        </DsfrButton>
        <div v-else-if="canRegister" class="relative text-center">
          <ButtonJeProposeMonAide :mission="mission" class="w-full" />
        </div>

        <div v-else>
          <p class="text-gray-500 uppercase text-center text-xs font-bold">Inscription fermée</p>
          <DsfrButton
            v-if="similarMissions.length > 0"
            v-scroll-to="{ el: '#missions-similaires', duration: 2000, lazy: false, offset: 56 }"
            size="lg"
            class="w-full mt-2"
            @click.native="onClickGoToSimilarMissions"
          >
            Voir les missions similaires
          </DsfrButton>
        </div>

        <div
          v-if="canRegister && mission.commitment__duration"
          class="mt-1 text-sm font-bold text-center"
        >
          <span>{{ $filters.label(mission.commitment__duration, 'duration') }}</span>
          <template v-if="mission.commitment__time_period">
            <span class="font-normal"> par </span>
            <span>{{ $filters.label(mission.commitment__time_period, 'time_period') }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'
import PresentielOrDistance from '@/components/section/mission/PresentielOrDistance.vue'
import Presentation from '@/components/section/mission/Presentation.vue'
import Details from '@/components/section/mission/Details.vue'
import ButtonJeProposeMonAide from '@/components/custom/ButtonJeProposeMonAide.vue'
import MixinMission from '@/mixins/mission'
import Testimonials from '@/components/section/temoignage/Testimonials.vue'
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default defineNuxtComponent({
  components: {
    CardMission,
    PresentielOrDistance,
    Presentation,
    Details,
    ButtonJeProposeMonAide,
    Testimonials,
    LoadingIndicator,
  },
  mixins: [MixinMission],
  async setup() {
    const route = useRoute()
    const { $stores } = useNuxtApp()
    const { data: mission, error } = await useApiFetch(`/missions/${route.params.id}`)

    if (error.value) {
      showError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }

    if (!mission.value) {
      showError({ statusCode: 404 })
    }

    if (!mission.value.is_online) {
      if (!$stores.auth.isLogged) {
        showError({ statusCode: 403 })
      }

      if (
        $stores.auth.contextRole != 'admin' &&
        $stores.auth.contextableId != mission.value?.structure_id
      ) {
        showError({ statusCode: 403 })
      }
    }

    useHead({
      title: mission.value.name.substring(0, 80),
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/missions-benevolat/${mission.value.id}/${mission.value.slug}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: mission.value.description.replace(/<\/?[^>]+>/gi, ' ').substring(0, 300),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            mission.value.template?.photo?.urls?.original ??
            mission.value.illustrations?.[0]?.urls?.original ??
            '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x',
        },
      ],
    })

    return {
      mission,
    }
  },
  data() {
    return {
      similarMissions: [],
      userParticipation: null,
      loading: true,
      showFixedCtaMobile: true,
      structureScore: null,
      uuid: uuidv4(),
    }
  },
  created() {
    this.fetch()
  },
  mounted() {
    this.$plausible.trackEvent('Mission - Visite', {
      props: {
        isFromApi: this.mission?.isFromApi ?? false,
        isRegistrationOpen: this.mission?.is_registration_open,
        hasPlacesLeft: this.mission?.has_places_left,
        isOutdated: this.hasExpired,
      },
    })
  },
  computed: {
    dates() {
      const dates = []
      const startDate = this.mission?.start_date
      const endDate = this.mission?.end_date
      const sameStartAndEnd = this.$dayjs(startDate).isSame(this.$dayjs(endDate))

      // Si date de début dépassée et pas de date de fin, masquer les dates
      if (this.$dayjs(startDate).isBefore(this.$dayjs()) && !endDate) {
        return dates
      }

      if (startDate) {
        dates.push({
          date:
            endDate && sameStartAndEnd
              ? `Le ${this.$dayjs(startDate).format('D MMM YYYY')}`
              : this.$dayjs(startDate).format('D MMM YYYY'),
          label: endDate && sameStartAndEnd ? null : 'À PARTIR DU',
        })
      }

      if (endDate && !sameStartAndEnd) {
        dates.push({
          date: this.$dayjs(endDate).format('D MMM YYYY'),
          label: "JUSQU'AU",
        })
      }

      return dates
    },
    domainName() {
      return this.mission?.domaine?.name ?? this.mission?.template?.domaine?.name ?? null
    },
    formattedBenevoleCount() {
      const count = this.participationsCount - 3
      return count < 1000 ? `+${count}` : '+1k'
    },
    participationsCount() {
      return this.mission?.participations_max - this.mission?.places_left
    },
    portraits() {
      const portraits = []
      const randomNumbers = []
      const portraitsCount = 74 // The total number of portraits existing
      const portraitsToGetCount = Math.min(this.participationsCount, 3)

      while (randomNumbers.length < portraitsToGetCount) {
        const result = Math.floor(Math.random() * portraitsCount) + 1
        if (!randomNumbers.includes(result)) {
          randomNumbers.push(result)
        }
      }

      randomNumbers.forEach((i) => {
        portraits.push(`/images/portraits/${i}.png`)
      })

      return portraits
    },
    illustrationSrcset() {
      return (
        this.mission.template?.photo?.urls?.large ??
        this.mission.illustrations?.[0]?.urls?.large ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
      )
    },
    illustrationSrc() {
      return (
        this.mission.template?.photo?.urls?.original ??
        this.mission.illustrations?.[0]?.urls?.original ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
      )
    },
    missionType() {
      return this.mission?.is_autonomy ? 'Mission en autonomie' : this.mission?.type
    },
    userParticipationLink() {
      return !this.userParticipation
        ? null
        : this.userParticipation.conversation?.id
        ? `/messages/${this.userParticipation.conversation.id}`
        : '/profile/missions'
    },
    logoOrganisationComponent() {
      return this.mission.structure.statut_juridique == 'Association' &&
        this.mission.structure.state == 'Validée'
        ? resolveComponent('NuxtLink')
        : 'div'
    },
  },
  methods: {
    async fetch() {
      if (process.client) {
        this.loading = true
        const promises = [this.fetchStructureScore(), this.fetchSimilarMissions()]
        if (this.$stores.auth.isLogged) {
          promises.push(this.fetchUserParticipation())
        }
        await Promise.all(promises)
        this.loading = false
      }
    },
    async fetchStructureScore() {
      const runtimeConfig = useRuntimeConfig()
      const structureScore = await axios.get(
        `${runtimeConfig.public.apiUrl}/api/structures/${this.mission?.structure_id}/score`
      )
      this.structureScore = structureScore.data
    },
    async fetchSimilarMissions() {
      const runtimeConfig = useRuntimeConfig()
      const similarMissions = await axios.get(
        `${runtimeConfig.public.apiUrl}/api/missions/${this.mission?.id}/similar`
      )
      this.similarMissions = similarMissions.data
    },
    async fetchUserParticipation() {
      const { participation } = await apiFetch(
        `/user/mission/${this.mission?.id}/has-participation`
      )
      this.userParticipation = participation
      if (this.canRegister || this.userParticipation) {
        // No need to wait
        this.loading = false
      }
    },
    handleVisibilityFixedCtaMobile(isVisible) {
      this.showFixedCtaMobile = !isVisible
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
