<template>
  <div class="py-8 lg:py-28">
    <div class="container grid grid-cols-1">
      <h2 class="text-3xl sm:text-5xl sm:!leading-[1.1] tracking-tighter">
        <span class="relative">
          <span class="font-bold">{{ organisation.name }}</span>
          <img
            src="/images/home/sparkle-left.svg"
            alt=""
            aria-hidden="true"
            class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-12px] left-[-22px] lg:top-[-25px] lg:left-[-47px] pointer-events-none"
          />
        </span>
        en quelques mots
      </h2>
      <div class="mt-6 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        <div class="lg:col-span-7">
          <BaseTextFormatted
            :max-lines="6"
            :text="organisation.description"
            class="text-lg lg:text-2xl lg:leading-10"
          />
        </div>

        <div
          class="lg:col-span-5 grid grid-cols-1 gap-6 lg:gap-10 lg:border-l border-l-[#DBD5CE] lg:pl-10"
        >
          <div class="">
            <h3 class="text-2xl font-bold mb-4">Publics aidés</h3>
            <div v-if="organisation.publics_beneficiaires" class="flex flex-wrap gap-4">
              <Tag
                v-for="(option, i) in organisation.publics_beneficiaires"
                :key="i"
                size="md"
                :custom-theme="true"
                class="text-jva-blue-500 bg-[#E3E3FD]"
              >
                {{ $filters.label(option, 'mission_publics_beneficiaires') }}
              </Tag>
            </div>
          </div>
          <div class="">
            <h3 class="text-2xl font-bold mb-4">Causes défendues</h3>
            <div v-if="organisation.domaines" class="flex flex-wrap gap-4">
              <Tag
                v-for="(domaine, i) in organisation.domaines"
                :key="i"
                size="md"
                :custom-theme="true"
                :class="`${domaineBackgroundColor(domaine.id)} text-white`"
              >
                {{ $filters.label(domaine.id, 'domaines') }}
              </Tag>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div class="relative">
          <NuxtImg
            ref="illustration"
            src="/images/organisation-default-1.webp"
            :srcset="srcSet"
            class="min-h-[250px] lg:min-h-[630px] h-full w-auto object-cover"
            @error="onIllustrationError"
          />
          <div class="absolute bottom-7 left-7">
            <div class="flex space-x-4">
              <a
                v-if="organisation.website"
                :href="organisation.website"
                target="_blank"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiLink class="h-6 w-6 fill-current" />
              </a>
              <a
                v-if="organisation.facebook"
                target="_blank"
                :href="organisation.facebook"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiFacebookCircleFill class="h-6 w-6 fill-current" />
              </a>
              <a
                v-if="organisation.twitter"
                target="_blank"
                :href="organisation.twitter"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiTwitterFill class="h-6 w-6 fill-current" />
              </a>
              <a
                v-if="organisation.instagram"
                target="_blank"
                :href="organisation.instagram"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiInstagramFill class="h-6 w-6 fill-current" />
              </a>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <template v-if="!hasNoMissionAvailableAndNoParticipation">
            <div class="group p-10 bg-white shadow-2xl cursor-pointer" @click="onClickFindMissions">
              <DsfrPeuImporteIcon class="-mt-3 w-[80px] h-[80px]" />
              <div class="text-4xl lg:text-5xl font-bold">
                {{ $numeral(organisation.missions_available_count) }}
              </div>
              <div class="text-2xl font-bold">
                {{
                  $filters.pluralize(
                    organisation.missions_available_count,
                    'mission',
                    'missions',
                    false
                  )
                }}
                de bénévolat
              </div>
              <div class="">
                <DsfrLink icon="RiArrowRightSLine" class="text-jva-blue-500"
                  >sur JeVeuxAider.gouv.fr </DsfrLink
                >
              </div>
            </div>
            <div class="p-10 bg-white shadow-2xl">
              <template v-if="participationsCount === 0">
                <DsfrHealthIcon class="-mt-3 w-[80px] h-[80px]" />
              </template>
              <template v-else>
                <div class="flex mb-4">
                  <img
                    v-for="(portrait, index) in portraits"
                    :key="index"
                    :src="portrait"
                    alt=""
                    :class="[{ '-ml-2': index !== 0 }]"
                    class="portrait rounded-full"
                    style="width: 52px"
                  />
                </div>
              </template>
              <div class="text-4xl lg:text-5xl font-bold">
                {{ $numeral(participationsCount) }}
              </div>
              <div class="text-2xl font-bold">
                {{
                  $filters.pluralize(
                    participationsCount,
                    'bénévole s’est mobilisé',
                    'bénévoles se sont mobilisés',
                    false
                  )
                }}
              </div>
              <div class="text-[#666666]">grâce à JeVeuxAider.gouv.fr</div>
            </div>
          </template>
          <div
            class="p-10 bg-white shadow-2xl"
            :class="[{ 'col-span-2': hasNoMissionAvailableAndNoParticipation }]"
          >
            <div class="text-2xl font-bold">Informations</div>
            <div class="mt-4 flex flex-col gap-4">
              <div class="flex space-x-3">
                <div class="w-[20px]">
                  <RiMapPinFill class="mt-1 w-[16px] text-[#929292] fill-current" />
                </div>
                <div class="flex-1">
                  <p class="font-bold">Siège de l’association</p>
                  <p>{{ organisation.full_address || 'Non renseigné' }}</p>
                </div>
              </div>
              <div v-if="organisation.email" class="flex space-x-2">
                <div class="w-[20px]">
                  <RiMailFill class="mt-1 w-[16px] text-[#929292] fill-current" />
                </div>
                <div class="flex-1">
                  <BaseLink v-if="organisation.email" class="break-all">{{
                    organisation.email
                  }}</BaseLink>
                  <p v-else>Non renseigné</p>
                </div>
              </div>
              <div v-if="organisation.phone" class="flex space-x-2">
                <div class="w-[20px]">
                  <RiPhoneFill class="mt-1 w-[16px] text-[#929292] fill-current" />
                </div>
                <div class="flex-1">
                  <p>{{ organisation.phone || 'Non renseigné' }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-white shadow-2xl"
            :class="[{ 'col-span-2': hasNoMissionAvailableAndNoParticipation }]"
          >
            <iframe
              width="100%"
              height="100%"
              style="border: 0; min-height: 300px"
              loading="lazy"
              allowfullscreen
              :src="`https://www.google.com/maps/embed/v1/place?key=${googlePlacesKey}
            &q=${organisation.full_address}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'
import MixinDomaines from '@/mixins/domaines'
import DsfrHealthIcon from '@/components/icon/dsfr/Health.vue'
import DsfrPeuImporteIcon from '@/components/icon/dsfr/PeuImporte.vue'

export default defineNuxtComponent({
  components: {
    DsfrHealthIcon,
    DsfrPeuImporteIcon,
    Tag,
  },
  mixins: [MixinDomaines],
  props: {
    organisation: {
      type: Object,
      required: true,
    },
    srcSet: {
      type: String,
      required: true,
    },
    redirectParameters: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const runtimeConfig = useRuntimeConfig()

    return {
      googlePlacesKey: runtimeConfig.public.google.places,
    }
  },
  computed: {
    hasMissionsDistance() {
      return this.organisation.statistics.missions_available_distance_count
    },
    hasMissionsPresentiel() {
      return this.organisation.statistics.missions_available_presentiel_count
    },
    hasNoMissionAvailableAndNoParticipation() {
      return (
        this.organisation.participations_count === 0 &&
        this.organisation.missions_available_count === 0
      )
    },
    participationsCount() {
      return this.organisation.participations_count
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
  },
  methods: {
    onIllustrationError() {
      this.$refs.illustration.$el.srcset = '/images/organisation-default-1.webp'
    },
    onClickFindMissions() {
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
          type:
            this.hasMissionsDistance && !this.hasMissionsPresentiel
              ? 'Mission à distance'
              : undefined,
        },
      })
    },
  },
})
</script>
