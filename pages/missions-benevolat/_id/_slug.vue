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
      class="relative z-10 container"
      :items="[
        { label: 'Missions de bénévolat', link: '/missions-benevolat' },
        {
          label: domainName,
          link: `/missions-benevolat?refinementList[domaines][0]=${domainName}`,
        },
        {
          label:
            mission.type == 'Mission en présentiel'
              ? `Bénévolat ${mission.structure.name} à ${mission.city}`
              : `Bénévolat ${mission.structure.name} à distance`,
          h1: true,
        },
      ]"
    />
    <div class="px-4 pb-12 max-w-3xl mx-auto lg:max-w-7xl">
      <div class="lg:flex lg:items-start lg:gap-6">
        <div class="space-y-6">
          <Presentation :mission="mission" />
          <PresentielOrDistance :mission="mission" />
          <Details :mission="mission" />
          <Box class="flex flex-col sm:flex-row gap-6 xl:gap-8 text-center sm:text-left">
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
              <div class="text-cool-gray-500 line-clamp-3">
                {{ mission.structure.description }}
              </div>

              <Button variant="white" rounded class="mt-4">
                <nuxt-link
                  v-if="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'"
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
            :srcset="illustration"
            sizes="(min-width: 1024px) 384px, 100vw"
            alt=""
            class="w-full object-cover object-top min-h-[183px]"
            width="630"
            height="300"
            data-not-lazy
            @error="$event.target.srcset = '/images/missions/mission-default.jpg, /images/missions/mission-default@2x.jpg 2x'"
          >

          <component
            :is="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'? 'nuxt-link' : 'div'"
            v-if="mission.structure.logo && (mission.structure.logo.thumb || mission.structure.logo.original)"
            target="_blank"
            :to="`/organisations/${mission.structure.slug}`"
            class="left-2/4 absolute -translate-x-1/2 -translate-y-3/4 bg-white shadow-lg rounded-xl p-4"
          >
            <img
              :src="mission.structure.logo.thumb ? mission.structure.logo.thumb : mission.structure.logo.original"
              :alt="mission.structure.name"
              class="my-auto h-10 object-contain"
              style="max-width: 120px"
              @error="$event.target.remove()"
            >
          </component>

          <div class="bg-white py-12">
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
                    style="width: 34px"
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

            <div class="px-8 sm:px-32 lg:px-8 mt-4 sm:mt-8">
              <div
                v-if="dates.length"
                class="grid sm:divide-x border-b pb-3 sm:pb-0"
                :class="[{ 'sm:grid-cols-2': dates.length == 2 }]"
              >
                <div
                  v-for="(date, i) in dates"
                  :key="i"
                  class="mx-auto sm:mx-0 sm:pb-3"
                  :class="[{ 'sm:pr-3': i == 0 }, { 'sm:pl-3': i == 1 }]"
                >
                  <div
                    class="flex items-center flex-col sm:flex-row gap-2"
                    :class="[{ 'justify-center': dates.length == 1 }]"
                  >
                    <CalendarIcon class="hidden sm:block  text-cool-gray-400" />

                    <div
                      class="font-bold text-center sm:text-left flex gap-2 items-baseline sm:block"
                    >
                      <div class="text-[#777E90]" style="font-size: 11px">
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

            <div class="flex flex-col gap-8">
              <div class="mx-8 sm:mx-12">
                <div class="text-center">
                  <div
                    class="mt-6 uppercase text-[#777E90] text-xs font-bold"
                  >
                    Engagement minimum
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
                </div>
              </div>

              <div class="mx-8 sm:mx-12">
                <ButtonJeProposeMonAide
                  v-if="canRegister"
                  :mission="mission"
                />
                <template v-else>
                  <Button size="xl" rounded full variant="white" plain>
                    Inscription fermée
                  </Button>
                </template>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
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
              :to="`/missions-benevolat?refinementList[domaines][0]=${mission.domaine.name}`"
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

export default {
  components: {
    CardMission,
    PresentielOrDistance,
    Presentation,
    Details,
    ButtonJeProposeMonAide
  },
  mixins: [MixinMission],
  async asyncData ({ $axios, params, error, store }) {
    const { data: mission } = await $axios.get(`/missions/${params.id}`).catch((err) => {
      return error({ statusCode: err.response.status, message: err.response.statusText })
    })

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
      similarMissions: []
    }
  },
  async fetch () {
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
          content: this.illustration
        }
      ]
    }
  },
  computed: {
    dates () {
      const dates = []
      const startDate = this.mission.start_date?.substring(0, 10)
      const endDate = this.mission.end_date?.substring(0, 10)
      const startDateYear = startDate?.substring(0, 4)
      const endDateYear = endDate?.substring(0, 4)
      const format =
        startDate && endDate && startDateYear !== endDateYear
          ? 'D MMMM YYYY'
          : 'D MMMM'

      // Si date de départ dépassée et pas de date de fin, masquer les dates
      if (this.$dayjs(startDate).isBefore(this.$dayjs()) && !endDate) {
        return dates
      }

      if (startDate) {
        dates.push({
          date: this.$dayjs(startDate).format(format),
          label: 'À PARTIR DU'
        })
      }

      if (endDate) {
        dates.push({
          date: this.$dayjs(endDate).format(format),
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
    illustration () {
      return this.mission.structure.override_image1?.urls.large ??
        this.mission.structure.illustrations[0]?.urls.large ??
        '/images/missions/mission-default.jpg, /images/missions/mission-default@2x.jpg 2x'
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

  ::v-deep .slick-slider {
    .slick-arrow {
      &.slick-prev {
        @apply translate-x-[-104px];
      }
      &.slick-next {
        @apply translate-x-[104px];
      }
    }
}
</style>
