<template>
  <div class="flex gap-8 w-full">
    <div class="border bg-white w-[180px] px-6 py-8 border-b-4 border-b-[#3A3A3A] text-center">
      <!-- <div class="font-bold mb-4">#{{ mission.id }}</div> -->

      <img
        v-if="mission.structure.logo"
        :srcset="mission.structure.logo.urls.large"
        :alt="mission.structure.name"
        class="h-auto max-w-[100px] mb-6 inline"
      />
      <div class="font-bold mb-4">{{ mission.structure.name }}</div>

      <!-- <div v-if="participationsCount" class="flex justify-center mb-4">
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
      </div> -->

      <div class="text-sm text-[#666666]">
        <template v-if="!mission.has_places_left"> La mission est désormais complète </template>
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
      </div>
    </div>
    <div class="flex-1 flex border h-[334px]">
      <div class="relative w-[398px] h-full">
        <NuxtImg
          ref="thumbnail"
          v-if="thumbnail && domainId"
          src="/images/card-thumbnail-default.jpg"
          :srcset="thumbnail"
          :alt="$filters.label(domainId, 'domaines')?.toString()"
          class="w-[398px] h-full object-cover"
          width="300"
          height="190"
          loading="lazy"
          @error="onImgError"
        />
        <div class="absolute top-4 left-4 flex flex-wrap gap-4 w-[398px] pr-8">
          <DsfrBadge
            v-if="isIdealPourDebuter"
            size="sm"
            class="shadow-lg !bg-[#FEECC2] !text-[#716043]"
          >
            Idéale pour débuter
          </DsfrBadge>
          <DsfrBadge
            v-if="isMissionCourte"
            size="sm"
            class="shadow-lg !bg-[#FEECC2] !text-[#716043]"
          >
            Mission courte
          </DsfrBadge>
          <DsfrBadge
            v-if="formattedCommitment"
            size="sm"
            class="shadow-lg !bg-[#FEECC2] !text-[#716043]"
          >
            {{ formattedCommitment }}
          </DsfrBadge>
        </div>
      </div>

      <div class="flex-1 flex flex-col bg-white px-10 py-8">
        <div class="flex-1">
          <div class="flex flex-wrap gap-4 order-1 mb-4">
            <DsfrTag
              :custom-theme="true"
              :class="`${domaineBackgroundColor(domainId)} text-white`"
              size="md"
            >
              {{ $filters.label(domainId, 'domaines') }}
            </DsfrTag>
            <DsfrTag v-if="hasSecondaryDomain" size="md"> +1 </DsfrTag>
          </div>
          <div
            class="text-[#666666] text-xs flex items-center justify-start truncate mb-4 max-w-full order-2"
          >
            <RiBuildingFill class="fill-current w-4 h-4 flex-none mr-2" />
            <span class="truncate">{{ mission.structure.name }}</span>
          </div>
          <DsfrHeading as="h3" size="md" class="line-clamp-2 mb-4 order-3" :title="mission.name">
            {{ mission.name }}
          </DsfrHeading>
          <div class="truncate text-[#3A3A3A] text-sm max-w-full">
            <template v-if="mission.is_autonomy">
              {{ autonomyCities }}
            </template>

            <template v-else-if="mission.city && mission.type == 'Mission en présentiel'">
              <span v-if="mission.zip">{{ missionCity }} ({{ mission.zip }})</span>
              <span v-else-if="mission.department"
                >{{ missionCity }} ({{ mission.department }})</span
              >
              <span v-else>{{ missionCity }}</span>
            </template>

            <template v-else> Mission à distance </template>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex flex-wrap items-center gap-4">
            <template v-if="mission.creneaux">
              <div
                v-for="(date, i) in mission.creneaux"
                :key="i"
                class="flex flex-col items-center justify-center border w-[65px] h-[65px]"
              >
                <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
                  {{ $dayjs.unix(date.timestamp).format('DD') }}
                </div>
                <div class="text-sm leading-[20px] text-[#666666]">
                  {{ $dayjs.unix(date.timestamp).format('MMM') }}
                </div>
                <div class="text-xs leading-[14px] text-[#666666]">
                  {{ $dayjs.unix(date.timestamp).format('YYYY') }}
                </div>
              </div>
            </template>
            <template v-else>
              <div
                v-if="mission.start_date"
                class="flex flex-col items-center justify-center border w-[65px] h-[65px]"
              >
                <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
                  {{ $dayjs.unix(mission.start_date).format('DD') }}
                </div>
                <div class="text-sm leading-[20px] text-[#666666]">
                  {{ $dayjs.unix(mission.start_date).format('MMM') }}
                </div>
                <div class="text-xs leading-[14px] text-[#666666]">
                  {{ $dayjs.unix(mission.start_date).format('YYYY') }}
                </div>
              </div>
              <template v-if="mission.end_date">
                <div class="text-gray-300 text-2xl">⇢</div>
                <div class="flex flex-col items-center justify-center border w-[65px] h-[65px]">
                  <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
                    {{ $dayjs.unix(mission.end_date).format('DD') }}
                  </div>
                  <div class="text-sm leading-[20px] text-[#666666]">
                    {{ $dayjs.unix(mission.end_date).format('MMM') }}
                  </div>
                  <div class="text-xs leading-[14px] text-[#666666]">
                    {{ $dayjs.unix(mission.end_date).format('YYYY') }}
                  </div>
                </div>
              </template>
            </template>
          </div>
          <RiArrowRightLine :class="['flex-none ml-auto w-6 h-6 fill-current text-jva-blue-500']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'
import MixinDomaines from '@/mixins/domaines'
import SpinIcon from '@/components/icon/SpinIcon.vue'
import DsfrSuccessIcon from '@/components/icon/dsfr/Success.vue'
import DsfrErrorIcon from '@/components/icon/dsfr/Error.vue'
import DsfrWarningIcon from '@/components/icon/dsfr/Warning.vue'
import DsfrNewIcon from '@/components/icon/dsfr/New.vue'
import DsfrInfoIcon from '@/components/icon/dsfr/Info.vue'

export default defineNuxtComponent({
  components: {
    DsfrSuccessIcon,
    DsfrErrorIcon,
    DsfrWarningIcon,
    DsfrNewIcon,
    DsfrInfoIcon,
    SpinIcon,
  },
  mixins: [MixinMission, MixinDomaines],
  props: {
    mission: {
      type: Object,
      default: null,
    },
    // showState: {
    //   type: Boolean,
    //   default: false,
    // },
    // showTags: {
    //   type: Boolean,
    //   default: false,
    // },
    // lazyLoading: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      nbPortraits: 5,
    }
  },
  async setup() {
    const { formatAutonomyCities } = await autonomyCitiesHelper()
    return {
      formatAutonomyCities,
    }
  },
  computed: {
    autonomyCities() {
      return this.formatAutonomyCities(this.mission.autonomy_zips)
    },
    // placesLeftText() {
    //   if (!this.mission.is_registration_open) {
    //     return 'Inscription fermée'
    //   } else if (
    //     this.mission.publisher_name &&
    //     this.mission.publisher_name !== 'JeVeuxAider.gouv.fr' &&
    //     this.mission.places_left > 99
    //   ) {
    //     return 'Plusieurs bénévoles recherchés'
    //   } else if (this.mission.places_left && this.mission.places_left > 0) {
    //     return this.$filters.pluralize(
    //       this.mission.places_left,
    //       'bénévole recherché',
    //       'bénévoles recherchés'
    //     )
    //   } else {
    //     return this.mission.has_places_left === false || this.mission.places_left === 0
    //       ? 'Complet'
    //       : 'Plusieurs bénévoles recherchés'
    //   }
    // },
    // formattedDate() {
    //   const startDate = this.mission.start_date
    //   const endDate = this.mission.end_date
    //   const now = this.$dayjs()
    //   if (!startDate) {
    //     return
    //   }
    //   const startDateObject =
    //     Number.isInteger(startDate) && this.$dayjs.unix(startDate).isValid()
    //       ? this.$dayjs.unix(startDate)
    //       : this.$dayjs(startDate, 'YYYY-MM-DD HH:mm:ss', 'fr', true).isValid()
    //       ? this.$dayjs(startDate, 'YYYY-MM-DD HH:mm:ss')
    //       : this.$dayjs(startDate).isValid()
    //       ? this.$dayjs(startDate)
    //       : null
    //   if (!startDateObject || startDateObject.isBefore(now)) {
    //     return null
    //   }
    //   const format = now.isSame(startDateObject, 'year') ? 'D MMMM' : 'D MMMM YYYY'
    //   if (endDate) {
    //     const endDateObject =
    //       Number.isInteger(endDate) && this.$dayjs.unix(endDate).isValid()
    //         ? this.$dayjs.unix(endDate)
    //         : this.$dayjs(endDate, 'YYYY-MM-DD HH:mm:ss', 'fr', true).isValid()
    //         ? this.$dayjs(endDate, 'YYYY-MM-DD HH:mm:ss')
    //         : this.$dayjs(endDate).isValid()
    //         ? this.$dayjs(endDate)
    //         : null
    //     if (endDateObject && this.$dayjs(startDateObject).isSame(this.$dayjs(endDateObject))) {
    //       return `le ${this.$dayjs(startDateObject).format(format)}`
    //     }
    //   }
    //   return `à partir du ${startDateObject.format(format)}`
    // },
    // iconOrganizationState() {
    //   switch (this.mission.structure.state) {
    //     case 'Validée':
    //       return DsfrSuccessIcon
    //     case 'Signalée':
    //     case 'Désinscrite':
    //       return DsfrErrorIcon
    //     case 'En attente de validation':
    //     case 'En cours de traitement':
    //       return DsfrWarningIcon
    //     default:
    //       return DsfrInfoIcon
    //   }
    // },
    // badgeTypeMissionSate() {
    //   switch (this.mission.state) {
    //     case 'Validée':
    //       return 'success'
    //     case 'Signalée':
    //     case 'Annulée':
    //       return 'error'
    //     case 'En attente de validation':
    //     case 'En cours de traitement':
    //       return 'warning'
    //     default:
    //       return 'info'
    //   }
    // },
  },
  methods: {
    onImgError() {
      this.$refs.thumbnail.$el.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>
