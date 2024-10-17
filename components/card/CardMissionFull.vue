<template>
  <div class="card--mission flex gap-8 w-full">
    <div class="border bg-white w-[180px] px-6 py-8 border-b-4 border-b-[#3A3A3A] text-center">
      <NuxtImg
        v-if="mission.structure.logo"
        ref="logo"
        :src="mission.structure.logo.urls.original"
        :srcset="mission.structure.logo.urls.large"
        :alt="mission.structure.name"
        class="h-auto max-h-[65px] max-w-[100px] m-auto mb-6"
        @error="onLogoError"
      />

      <div class="font-bold mb-4 line-clamp-3">{{ mission.structure.name }}</div>

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
    <div class="lg:flex-1 flex border min-w-0 h-[330px] lg:h-[300px]">
      <div class="thumbnail--wrapper relative w-[398px] h-full">
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
        <div class="absolute top-4 left-4 flex flex-wrap gap-2 w-[360px] pr-8">
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
        <CustomButtonMissionFavorite
          v-if="$stores.auth.isLogged"
          :mission="mission"
          variant="icon"
          class="absolute top-4 right-4"
        />
      </div>

      <div class="lg:flex-1 min-w-0 flex flex-col bg-white px-10 py-8">
        <div class="flex-1">
          <div class="flex flex-wrap gap-4 mb-4">
            <DsfrTag
              :custom-theme="true"
              :class="`${domaineBackgroundColor(domainId)} text-white`"
              size="md"
            >
              {{ $filters.label(domainId, 'domaines') }}
            </DsfrTag>
            <DsfrTag v-if="hasSecondaryDomain" size="md"> +1 </DsfrTag>
          </div>
          <DsfrHeading as="h3" size="md" class="line-clamp-2 mb-4" :title="mission.name">
            {{ mission.name ?? 'Titre à définir' }}
          </DsfrHeading>
          <div class="truncate text-[#3A3A3A] text-sm max-w-full flex-none">
            <!-- <template v-if="mission.is_autonomy">
              {{ autonomyCities }}
            </template> -->

            <!-- <template v-else-if="mission.city && mission.type == 'Mission en présentiel'">
              <span v-if="mission.zip">{{ missionCity }} ({{ mission.zip }})</span>
              <span v-else-if="mission.department"
                >{{ missionCity }} ({{ mission.department }})</span
              >
              <span v-else>{{ missionCity }}</span>
            </template> -->
            <template v-if="mission.type === 'Mission en présentiel' && mission.addresses">
              {{ uniqueCities.join(', ') }}
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

export default defineNuxtComponent({
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
  computed: {
    // autonomyCities() {
    //   const { formatAutonomyCities } = autonomyCitiesHelper()
    //   return formatAutonomyCities(this.mission.autonomy_zips)
    // },
  },
  methods: {
    onLogoError() {
      this.$refs.logo.$el.remove()
    },
    onImgError() {
      this.$refs.thumbnail.$el.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>

<style lang="postcss" scoped>
.card--mission {
  /* box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05); */
  @apply transition;
  @screen sm {
    &:hover {
      .thumbnail--wrapper img {
        transform: scale(1.05);
      }
      /* @apply shadow-xl; */
    }
  }
}

.thumbnail--wrapper {
  @apply bg-gray-200 overflow-hidden;
  img {
    transition: all 0.25s;
  }
}
</style>
