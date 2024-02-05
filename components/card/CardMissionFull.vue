<template>
  <div class="flex gap-8 w-full">
    <div class="border bg-white w-[180px] px-6 py-8 border-b-4 border-b-[#3A3A3A] text-center">
      <NuxtImg
        v-if="mission.structure.logo"
        :src="mission.structure.logo.urls.large"
        :srcset="mission.structure.logo.urls.large"
        :alt="mission.structure.name"
        class="h-auto max-w-[100px] mb-6 inline"
        @error="onImgError"
      />
      <div class="font-bold mb-4">{{ mission.structure.name }}</div>

      <CustomPortraitsRandom v-if="participationsCount" :count="participationsCount" />

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
    <div class="flex-1 flex border h-[300px]">
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
          <!-- <div
            class="text-[#666666] text-xs flex items-center justify-start truncate mb-4 max-w-full order-2"
          >
            <RiBuildingFill class="fill-current w-4 h-4 flex-none mr-2" />
            <span class="truncate">{{ mission.structure.name }}</span>
          </div> -->
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
          <CustomMissionNextDates :mission="mission" />
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
  },
  methods: {
    onImgError() {
      this.$refs.thumbnail.$el.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>
