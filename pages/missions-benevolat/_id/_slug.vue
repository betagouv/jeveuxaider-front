<template>
  <div>
    <client-only>
      <portal v-if="!hasPageOnline" to="header-top">
        <transition name="fade">
          <Banner icon="ExclamationIcon">
            La mission n'est pas visible car elle est au statut «{{ mission.state }}» et l'organisation est «{{ mission.structure.state }}»
            <template #action>
              <nuxt-link :to="`/admin/missions?filter[id]=${mission.id}`">
                <Button variant="white">
                  Gérer
                </Button>
              </nuxt-link>
            </template>
          </Banner>
        </transition>
      </portal>
    </client-only>
    <div class="absolute w-full" style="height: 360px">
      <img
        src="/images/missions/bg_header_mission.jpg"
        alt="Mission bénévolat"
        class="object-cover w-full h-full"
      >
    </div>
    <Breadcrumb
      theme="transparent"
      class="relative z-10 px-4 xl:container !max-w-7xl"
      :items="[
        { label: 'Missions de bénévolat', link: '/missions-benevolat' },
        {
          label: domainName,
          link: `/missions-benevolat?domaines=${domainName}`,
        },
        {
          label:
            missionType == 'Mission en autonomie'
              ? `Bénévolat ${mission.structure.name} en autonomie`
              : missionType == 'Mission en présentiel'
                ? `Bénévolat ${mission.structure.name} à ${mission.city}`
                : `Bénévolat ${mission.structure.name} à distance`,
          h1: true,
        },
      ]"
    />
    <div class="px-4 pb-12 max-w-3xl mx-auto lg:max-w-7xl">
      <div class="lg:flex lg:items-start lg:gap-6">
        <div class="space-y-6 flex-1">
          <Presentation :mission="mission" />
          <PresentielOrDistance :mission="mission" />
          <Details :mission="mission" />
          <Box
            v-if="!['Organisation publique', 'Collectivité'].includes(mission.structure.statut_juridique)"
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
            >

            <div>
              <h2 class="font-bold text-2xl tracking-[-1px] mb-4">
                Découvrez <span class="lowercase">{{ mission.structure.statut_juridique|label('structure_legal_status')|prefix }}</span>
                <component
                  :is="
                    mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée' ? 'nuxt-link' : 'span'
                  "
                  target="_blank"
                  :to="`/organisations/${mission.structure.slug}`"
                  class="font-extrabold uppercase"
                >
                  {{ mission.structure.name }}
                </component>
              </h2>
              <div class="text-cool-gray-500 line-clamp-3 break-word">
                {{ mission.structure.description }}
              </div>

              <Button v-if="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'" variant="white" rounded class="mt-4">
                <nuxt-link
                  :to="`/organisations/${mission.structure.slug}`"
                >
                  En savoir plus
                </nuxt-link>
              </Button>
            </div>
          </Box>
        </div>

        <Box class="overflow-hidden mt-6 lg:w-96 lg:mt-0 z-20 flex-shrink-0 sticky top-6" :padding="false">
          <img
            :srcset="illustrationSrcset"
            :src="illustrationSrc"
            sizes="(min-width: 1024px) 384px, 100vw"
            alt=""
            class="w-full object-cover object-top h-[130px]"
            width="761"
            height="363"
            @error="$event.target.srcset = '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'"
          >

          <component
            :is="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'? 'nuxt-link' : 'div'"
            v-if="mission.structure.logo"
            target="_blank"
            :to="`/organisations/${mission.structure.slug}`"
            class="left-1/2 absolute -translate-x-1/2 -translate-y-2/3 bg-white shadow-lg rounded-xl p-3 h-[72px] flex"
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

          <div class="bg-white pb-4 pt-6">
            <div class="px-4 text-center">
              <div class="font-extrabold text-xl">
                <template v-if="!mission.has_places_left">
                  La mission est désormais complète
                </template>

                <template v-else>
                  <template
                    v-if="['Terminée', 'Annulée'].includes(mission.state)"
                  >
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
                  class="mt-2 uppercase text-cool-gray-500 text-xs font-bold"
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
                    :class="[{ 'justify-center': dates.length == 1 }]"
                  >
                    <CalendarIcon class="hidden sm:block  text-cool-gray-400" />

                    <div
                      class="font-bold text-center sm:text-left flex gap-2 items-baseline sm:block"
                    >
                      <div class="text-cool-gray-500" style="font-size: 11px">
                        {{ date.label }}
                      </div>
                      <div class="text-black">
                        {{ date.date }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col">
              <div class="mx-8 sm:mx-12">
                <div class="text-center">
                  <div
                    class="mt-4 uppercase text-cool-gray-500 text-xs font-bold"
                  >
                    Durée de la mission
                  </div>
                  <div class="font-bold">
                    <template v-if="mission.commitment__duration">
                      <span>{{ mission.commitment__duration|label('duration') }}</span>
                      <template v-if="mission.commitment__time_period">
                        <span class="font-normal">par</span>
                        <span>{{ mission.commitment__time_period|label('time_period') }}</span>
                      </template>
                    </template>
                    <template v-else>
                      Non spécifié
                    </template>
                  </div>
                  <div v-if="mission.recurrent_description" class="text-cool-gray-500 mt-1">
                    {{ mission.recurrent_description }}
                  </div>
                </div>
              </div>

              <div class="mt-4 mx-6">
                <LoadingIndicator
                  v-if="conversationId === null && $store.getters.isLogged"
                  class="min-h-[66px]"
                />

                <Button
                  v-else-if="conversationId"
                  size="xl"
                  rounded
                  full
                  variant="white"
                  plain
                  class="mt-4"
                  @click.native="$router.push(`/messages/${conversationId}`)"
                >
                  Suivre ma candidature
                </Button>
                <template v-else-if="canRegister">
                  <template v-if="mission.dates">
                    <div v-if="!dateSelected" class="flex justify-center">
                      <v-calendar

                        ref="calendar"
                        :attributes="calendarAttrs"
                        :min-date="new Date()"
                        trim-weeks
                        @dayclick="handleDayClick"
                        @transition-end="addHighlightClasses"
                        @hook:mounted="addHighlightClasses"
                      />
                    </div>
                    <div v-else-if="dateSelected" class="mt-3 relative mx-6">
                      <div class="left-0 top--0.5 absolute cursor-pointer group p-1 hover:bg-[#edf2f7] rounded-sm" @click="handlePreviousStepClick">
                        <ChevronLeftIcon class="text-[#718096] h-5 w-5" />
                      </div>
                      <div class="text-center font-bold capitalize">
                        {{ $dayjs(dateSelected.id).format('dddd D MMMM') }}
                      </div>

                      <CheckboxGroup
                        v-model="slotSelected"
                        class="mt-6"
                        class-checkbox="justify-center"
                        name="slots"
                        variant="button"
                        :options="$labels.slots.filter(slot => dateSelected.slots.includes(slot.key))"
                      />
                      <div class="flex items-center justify-center mt-6">
                        <ButtonJeProposeMonAide
                          :disabled="!slotSelected || slotSelected.length == 0"
                          :mission="{...mission, dateSelected, slotSelected}"
                        />
                      </div>
                    </div>
                  </template>
                  <ButtonJeProposeMonAide
                    v-else
                    class="mt-4"
                    :mission="mission"
                  />
                </template>
                <Button
                  v-else
                  size="xl"
                  rounded
                  full
                  variant="white"
                  plain
                  class="mt-4"
                >
                  Inscription fermée
                </Button>
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
      class="bg-[#282562] border-t-8 border-jva-red-500 overflow-hidden"
    >
      <div class="container mx-auto px-8 sm:px-4">
        <div class="pt-16 pb-24">
          <div class="text-white font-bold text-4xl text-center mb-8">
            Vous pourriez aussi aimer&nbsp;…
          </div>

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
            <nuxt-link
              :to="`/missions-benevolat?domaines=${mission.domaine.name}`"
              class="inline-block border-2 border-gray-500 rounded-full text-white hover:border-white !outline-none focus:ring transition font-bold text-sm px-4 py-2 mt-6"
            >
              Plus de missions
            </nuxt-link>
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
      conversationId: null
    }
  },
  async fetch () {
    const { data: missions } = await this.$axios.get(`/missions/${this.mission.id}/similar`)
    this.similarMissions = missions

    if (this.$store.getters.isLogged) {
      const { data: conversationId } = await this.$axios.get(`/user/mission/${this.mission.id}/has-participation`)
      this.conversationId = conversationId
    }
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
    @apply !flex flex-col h-full max-w-[323px] rounded-[10px] transition;
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
  @apply font-sans
}

:deep(.vc-day .vc-day-content) {
  font-size: 15px;
  width: 43px;
  height: 42px;
  line-height: 42px;
}

:deep(.vc-day .vc-highlight) {
  border-radius: 0 !important;
  height: 38px;
  width: 38px;
}
:deep(.vc-weekday) {
  @apply hidden;
}

:deep(.vc-day-content:hover) {
  @apply hover:bg-transparent
}

:deep(.vc-day.has-highlight:hover .vc-highlight) {
  @apply bg-jva-blue-300 text-white
}
:deep(.vc-day.has-highlight:hover .vc-day-content) {
  @apply  text-white
}
</style>
