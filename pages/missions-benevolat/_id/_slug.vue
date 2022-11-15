<template>
  <div>
    <client-only>
      <portal v-if="!hasPageOnline" to="header-top">
        <transition name="fade">
          <Banner>
            La mission n'est pas visible car elle est au statut « {{ mission.state }} » et l'organisation est « {{ mission.structure.state }} »
            <template #action>
              <Link
                icon="RiArrowRightLine"
                :to="`/admin/missions?filter[id]=${mission.id}`"
              >
                Gérer
              </Link>
            </template>
          </Banner>
        </transition>
      </portal>
    </client-only>

    <div class="absolute bg-gradient-to-b from-[#ECECFE] to-transparent w-full overflow-hidden" style="height: 777px">
      <img
        src="/images/homepage/deco_2.svg"
        alt="Décorations"
        class="deco--2 absolute hidden lg:block pointer-events-none"
        data-not-lazy
      >

      <img
        src="/images/homepage/deco_3.svg"
        alt="Décorations"
        class="deco--3 absolute hidden lg:block pointer-events-none"
        data-not-lazy
      >
    </div>

    <div class="mx-auto px-4 lg:container lg:max-w-7xl">
      <Breadcrumb
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
    <div class="px-4 pb-12 max-w-3xl mx-auto lg:max-w-7xl">
      <div class="lg:flex lg:items-start lg:gap-8">
        <div class="space-y-8 flex-1">
          <Presentation :mission="mission" />
          <PresentielOrDistance :mission="mission" />
          <Details :mission="mission" />
          <Box
            v-if="!['Organisation publique', 'Collectivité'].includes(mission.structure.statut_juridique)"
            class="flex flex-col sm:flex-row gap-6 xl:gap-8 text-center sm:text-left"
          >
            <img
              v-if="mission.structure.logo && (mission.structure.logo.thumb || mission.structure.logo.original)"
              :src="mission.structure.logo.thumb ? mission.structure.logo.thumb : mission.structure.logo.original"
              :alt="mission.structure.name"
              class="mx-auto lg:mx-0 my-auto h-20 object-contain"
              style="max-width: 150px"
            >

            <div>
              <div class="text-lg mb-4 text-gray-800">
                Découvrez
                <span class="lowercase">{{ mission.structure.statut_juridique|label('structure_legal_status')|prefix }}</span>
                {{ mission.structure.name }}
              </div>

              <div class="text-cool-gray-500 line-clamp-3 break-word">
                {{ mission.structure.description }}
              </div>

              <nuxt-link
                v-if="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'"
                :to="`/organisations/${mission.structure.slug}`"
              >
                <DsfrButton type="secondary" class="mt-8">
                  En savoir plus
                </DsfrButton>
              </nuxt-link>
            </div>
          </Box>
        </div>

        <Box class="overflow-hidden mt-8 lg:w-96 lg:mt-0 z-20 flex-shrink-0 sticky top-6" :padding="false">
          <img
            :srcset="illustrationSrcset"
            :src="illustrationSrc"
            sizes="(min-width: 1024px) 384px, 100vw"
            alt=""
            class="w-full object-cover object-top h-[180px] lg:h-[130px]"
            width="761"
            height="363"
            @error="$event.target.srcset = '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'"
          >

          <component
            :is="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'? 'nuxt-link' : 'div'"
            v-if="mission.structure.logo"
            target="_blank"
            :to="`/organisations/${mission.structure.slug}`"
            class="left-1/2 absolute -translate-x-1/2 -translate-y-2/3 bg-white shadow-lg p-3 h-[64px] flex"
          >
            <img
              sizes="120px"
              :srcset="mission.structure.logo.urls.small"
              :src="mission.structure.logo.urls.original"
              :alt="mission.structure.name"
              class="my-auto object-contain w-full h-full"
              style="max-width: 120px"
              @error="$event.target.remove()"
            >
          </component>

          <div class="bg-white pb-8 pt-10">
            <div class="px-4 text-center">
              <div class="text-xl font-bold">
                <template v-if="!mission.has_places_left">
                  La mission est désormais complète
                </template>
                <template v-else>
                  <template v-if="['Terminée', 'Annulée'].includes(mission.state)">
                    Ils recherchaient
                  </template>
                  <template v-else>
                    Ils recherchent
                  </template>
                  {{ mission.participations_max|pluralize('bénévole', 'bénévoles') }}
                </template>
              </div>

              <template v-if="participationsCount">
                <div
                  class="uppercase text-cool-gray-500 text-xs"
                >
                  {{ participationsCount|pluralize('personne déjà inscrite','personnes déjà inscrites') }}
                </div>

                <div class="mt-4 flex justify-center">
                  <img
                    v-for="(portrait, index) in portraits"
                    :key="index"
                    :src="portrait"
                    alt=""
                    :class="[{ '-ml-1': index !== 0 }]"
                    class="portrait rounded-full"
                    style="width: 36px"
                  >
                  <div
                    v-if="participationsCount - 3 > 0"
                    class="h-9 w-9 text-cool-gray-500 shadow bg-gray-50 border font-bold inline-flex items-center justify-center rounded-full text-xs -ml-1"
                  >
                    {{ formattedBenevoleCount }}
                  </div>
                </div>
              </template>
            </div>

            <div v-if="dates.length && !mission.dates" class="px-8 sm:px-32 lg:px-8 mt-4 sm:mt-8">
              <div
                class="grid pb-3 sm:pb-0"
                :class="[{ 'sm:grid-cols-2 sm:divide-x border-b': dates.length == 2 }]"
              >
                <div
                  v-for="(date, i) in dates"
                  :key="i"
                  class="mx-auto sm:mx-0 sm:pb-3"
                  :class="[{ 'sm:pr-3': i == 0 && dates.length > 1 }, { 'sm:pl-3': i == 1 && dates.length > 1 }]"
                >
                  <div
                    class="flex items-center flex-col sm:flex-row gap-2"
                    :class="[{ 'justify-center': dates.length === 1 }]"
                  >
                    <div
                      class="text-center flex gap-2 items-baseline sm:block"
                      :class="[{'sm:text-right ml-auto': i === 0 && dates.length > 1}, {'sm:text-left': i === 1 && dates.length > 1}]"
                    >
                      <!-- <RiCalendarEventFill class="hidden sm:inline text-cool-gray-400 fill-current w-4 h-4" /> -->
                      <div class="text-cool-gray-500 space-x-2 text-[11px]">
                        {{ date.label }}
                      </div>
                      <div class="text-black font-bold">
                        {{ date.date }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col">
              <!-- Durée de la mission -->
              <div class="mx-8 sm:mx-12">
                <div class="text-center">
                  <div class="mt-3 uppercase text-cool-gray-500 text-[11px]" :class="[dates.length && !mission.dates ? 'mt-3' : 'mt-5']">
                    Durée de la mission
                  </div>
                  <div class="font-bold">
                    <template v-if="mission.commitment__duration">
                      <span>{{ mission.commitment__duration|label('duration') }}</span>
                      <template v-if="mission.commitment__time_period">
                        <span class="font-normal"> par </span>
                        <span>{{ mission.commitment__time_period|label('time_period') }}</span>
                      </template>
                    </template>
                    <template v-else>
                      Non spécifié
                    </template>
                  </div>
                  <div v-if="mission.recurrent_description" class="text-cool-gray-500 text-sm">
                    {{ mission.recurrent_description }}
                  </div>
                </div>
              </div>

              <div class="mt-4 mx-6">
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
                <template v-else-if="canRegister">
                  <template v-if="mission.dates">
                    <div v-if="!dateSelected" class="flex justify-center">
                      <client-only>
                        <!-- todo slot day-content pour accessibility button -->
                        <v-calendar
                          ref="calendar"
                          :attributes="calendarAttrs"
                          :min-date="new Date()"
                          trim-weeks
                          @dayclick="handleDayClick"
                          @transition-end="addHighlightClasses"
                          @hook:mounted="addHighlightClasses"
                        />
                      </client-only>
                    </div>
                    <div v-else-if="dateSelected" class="mt-3 relative mx-6">
                      <div class="left-0 top-[-3px] absolute cursor-pointer group p-1 hover:bg-[#edf2f7] rounded-sm" @click="handlePreviousStepClick">
                        <ChevronLeftIcon class="text-[#718096] h-5 w-5" />
                      </div>
                      <div class="text-center font-bold capitalize">
                        {{ $dayjs(dateSelected.id).format('dddd D MMMM') }}
                      </div>

                      <TagsGroup
                        v-model="slotSelected"
                        :options="$labels.slots.filter(slot => dateSelected.slots.includes(slot.key))"
                        class="mt-4"
                        wrapper-class="justify-center"
                      />

                      <div class="flex items-center justify-center mt-6">
                        <ButtonJeProposeMonAide
                          :disabled="!slotSelected || slotSelected.length == 0"
                          :mission="{...mission, dateSelected, slotSelected}"
                          label="Continuer"
                          type="secondary"
                          size="md"
                        />
                      </div>
                    </div>
                  </template>

                  <div v-else class="relative text-center mt-4">
                    <ButtonJeProposeMonAide :mission="mission" class="w-full" />
                  </div>
                </template>

                <DsfrButton v-else disabled size="lg" class="w-full mt-6">
                  Inscription fermée
                </DsfrButton>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>

    <!-- TESTIMONIALS -->
    <Testimonials
      :model="mission.structure"
      model-type="organisation"
    />

    <div
      v-if="similarMissions.length > 0"
      class="bg-[#ECECFE] overflow-hidden mt-12"
    >
      <div class="container mx-auto px-8 sm:px-4">
        <div class="pt-16 pb-24">
          <Heading as="div" class="text-center mb-12">
            Vous pourriez aussi aimer&nbsp;…
          </Heading>

          <Slideshow
            class="mb-6"
            :slides-are-links="true"
            :slides-count="similarMissions.length"
          >
            <nuxt-link
              v-for="mission in similarMissions"
              :key="mission.id"
              class="card--mission--wrapper"
              :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
            >
              <CardMission :mission="mission" class="!h-full" />
            </nuxt-link>
          </Slideshow>

          <div v-if="mission.domaine" class="text-center">
            <Link
              :to="`/missions-benevolat?domaines=${mission.domaine.name}`"
              class="text-jva-blue-500"
              icon="RiArrowRightLine"
            >
              Plus de missions
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardMission from '~/components/card/CardMission'
import PresentielOrDistance from '@/components/section/mission/PresentielOrDistance.vue'
import Presentation from '@/components/section/mission/Presentation.vue'
import Details from '@/components/section/mission/Details.vue'
import ButtonJeProposeMonAide from '@/components/custom/ButtonJeProposeMonAide.vue'
import MixinMission from '@/mixins/mission'
import Testimonials from '@/components/section/temoignage/Testimonials'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Link from '@/components/dsfr/Link.vue'
import Heading from '@/components/dsfr/Heading.vue'
import DsfrButton from '@/components/dsfr/Button.vue'
import TagsGroup from '@/components/dsfr/TagsGroup.vue'
import MixinHotjar from '@/mixins/hotjar.client.js'
import LoadingIndicator from '@/components/custom/LoadingIndicator'

export default {
  components: {
    CardMission,
    PresentielOrDistance,
    Presentation,
    Details,
    ButtonJeProposeMonAide,
    Testimonials,
    Breadcrumb,
    Link,
    Heading,
    DsfrButton,
    TagsGroup,
    LoadingIndicator
  },
  mixins: [MixinMission, MixinHotjar],
  async asyncData ({ $axios, params, error, store }) {
    const { data: mission } = await $axios.get(`/missions/${params.id}`).catch((err) => {
      return error({ statusCode: err.response.status, message: err.response.statusText })
    })
    if (!mission) {
      return error({ statusCode: 404 })
    }

    if (!(mission.structure.state === 'Validée' && ['Validée', 'Terminée'].includes(mission.state))) {
      if (store.getters.isLogged) {
        if (
          store.getters.contextRole != 'admin' &&
            store.getters.contextableId != mission.structure_id
        ) {
          return error({ statusCode: 403 })
        }
      } else {
        return error({ statusCode: 403 })
      }
    }

    return {
      mission
    }
  },
  data () {
    return {
      dateSelected: null,
      slotSelected: null,
      similarMissions: [],
      userParticipation: null,
      loading: false
    }
  },
  async fetch () {
    if (this.$store.getters.isLogged) {
      this.loading = true
      const { data: userParticipation } = await this.$axios.get(`/user/mission/${this.mission.id}/has-participation`)
      this.userParticipation = userParticipation || null
      this.loading = false
    }

    const { data: missions } = await this.$axios.get(`/missions/${this.mission.id}/similar`)
    this.similarMissions = missions
  },
  head () {
    return {
      title: this.mission.name.substring(0, 80),
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/missions-benevolat/${this.mission.id}/${this.mission.slug}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.mission.description
            .replace(/<\/?[^>]+>/gi, ' ')
            .substring(0, 300)
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.illustrationSrcset
        }
      ]
    }
  },
  computed: {
    dates () {
      const dates = []
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date
      const sameStartAndEnd = this.$dayjs(startDate).isSame(this.$dayjs(endDate))

      // Si date de début dépassée et pas de date de fin, masquer les dates
      if (this.$dayjs(startDate).isBefore(this.$dayjs()) && !endDate) {
        return dates
      }

      if (startDate) {
        dates.push({
          date: endDate && sameStartAndEnd ? `Le ${this.$dayjs(startDate).format('D MMM YYYY')}` : this.$dayjs(startDate).format('D MMM YYYY'),
          label: endDate && sameStartAndEnd ? null : 'À PARTIR DU'
        })
      }

      if (endDate && !sameStartAndEnd) {
        dates.push({
          date: this.$dayjs(endDate).format('D MMM YYYY'),
          label: "JUSQU'AU"
        })
      }

      return dates
    },
    domainName () {
      return (
        this.mission?.domaine?.name ??
        this.mission?.template?.domaine?.name ??
        null
      )
    },
    formattedBenevoleCount () {
      const count = this.participationsCount - 3
      return count < 1000 ? `+${count}` : '+1k'
    },
    participationsCount () {
      return this.mission.participations_max - this.mission.places_left
    },
    portraits () {
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
    illustrationSrcset () {
      return this.mission.template?.photo?.urls?.large ??
        this.mission.illustrations?.[0]?.urls?.large ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    illustrationSrc () {
      return this.mission.template?.photo?.urls?.original ??
        this.mission.illustrations?.[0]?.urls?.original ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    missionType () {
      return this.mission.is_autonomy ? 'Mission en autonomie' : this.mission.type
    },
    calendarAttrs () {
      const highlight = {
        class: 'bg-jva-blue-600',
        contentClass: 'text-white',
        contentStyle: {
          fontWeight: 600
        }
      }

      return [
        {
          key: 'creneaux',
          highlight,
          dates: this.mission.dates
            .filter(date => this.$dayjs(date.date).isAfter(this.$dayjs(), 'day') || this.$dayjs(date.date).isSame(this.$dayjs(), 'day'))
            .map(day => day.date)
        }
      ]
    },
    userParticipationLink () {
      return !this.userParticipation
        ? null
        : this.userParticipation.conversation?.id ? `/messages/${this.userParticipation.conversation.id}` : '/profile/missions'
    }
  },
  mounted () {
    // get next date calendar
    if (this.mission.dates) {
      const nextDates = this.mission.dates.filter(date => this.$dayjs(date.date).isAfter(this.$dayjs(), 'day') || this.$dayjs(date.date).isSame(this.$dayjs(), 'day'))
      if (nextDates.length > 0 && this.$refs.calendar) {
        this.$refs.calendar.move(new Date(nextDates[0].date))
      }
    }
  },
  methods: {
    handlePreviousStepClick () {
      this.dateSelected = null
      this.slotSelected = null
    },
    handleDayClick (dateSelected) {
      const dateFound = this.mission.dates.find(date => date.id == dateSelected.id)
      if (dateFound && (this.$dayjs(dateFound.date).isAfter(this.$dayjs(), 'day') || this.$dayjs(dateFound.date).isSame(this.$dayjs(), 'day'))) {
        this.dateSelected = dateFound
      }
    },
    addHighlightClasses () {
      this.mission.dates.forEach((date) => {
        this.$refs.calendar.$el.querySelector(`.id-${date.id}`)?.classList.add('has-highlight')
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
  .custom-gradient {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 70.1%
    );
  }

  .card--mission--wrapper {
    @apply !flex flex-col h-full max-w-[323px] transition;
    width: calc(100vw - 64px) !important;
    @apply w-full;
  }

  :deep(.slick-slider) {
    .slick-arrow {
      &.slick-prev {
        @apply translate-x-[-104px];
      }
      &.slick-next {
        @apply translate-x-[104px];
      }
    }
  }

:deep(.vc-title) {
  @apply text-black font-bold;
  font-size: 16px;
  text-transform: capitalize;
}

:deep(.vc-container) {
  border: none;
}

:deep(.vc-container div) {
  @apply font-sans;
}

:deep(.vc-day .vc-day-content) {
  font-size: 15px;
  width: 32px;
  height: 32px;
  outline: none;
  border-radius: 0;
  @screen sm {
    width: 40px;
  }
  &:focus-visible {
    outline-style: solid;
    outline-color: #0a76f6;
    outline-width: 2px;
    outline-offset: 2px;
    background-color: transparent;
  }

}

:deep(.vc-day .vc-highlight) {
  border-radius: 0 !important;
  height: 100%;
  width: 100%;
}
:deep(.vc-weekday) {
  @apply hidden;
}

:deep(.vc-day-content:hover) {
  @apply hover:bg-transparent;
}

:deep(.vc-day.has-highlight:hover .vc-highlight) {
  @apply bg-jva-blue-300 text-white;
}
:deep(.vc-day.has-highlight:hover .vc-day-content) {
  @apply text-white;
}

:deep(.vc-header),
:deep(.vc-arrows-container) {
  padding-top: 0;
}

:deep(.vc-weeks) {
  @apply gap-1;
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
