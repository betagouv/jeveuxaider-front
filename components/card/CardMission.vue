<template>
  <div
    class="card--mission h-auto flex flex-col flex-1 bg-white overflow-hidden safari-fix-scale border border-[#E5E5E5]"
  >
    <div class="thumbnail--wrapper relative">
      <NuxtImg
        ref="thumbnail"
        v-if="thumbnail && domainId"
        src="/images/card-thumbnail-default.jpg"
        :srcset="thumbnail"
        :alt="$filters.label(domainId, 'domaines')?.toString()"
        class="w-full h-full object-cover"
        width="300"
        height="143"
        :loading="lazyLoading ? 'lazy' : undefined"
        @error="onImgError"
      />

      <template v-if="showState">
        <div class="custom-gradient absolute inset-0" />
        <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
          <DsfrBadge class="shadow-lg" size="sm" :type="badgeTypeMissionSate">
            {{ mission.state }}
          </DsfrBadge>

          <DsfrBadge
            class="shadow-lg"
            size="sm"
            type="gray"
            v-if="!mission.is_online && mission.state == 'Validée'"
            v-tooltip="{
              content:
                'Cette mission a été mise hors ligne par un membre du support. Elle n’est plus visible des bénévoles.',
            }"
          >
            <div class="flex items-center">
              <div class="h-2 w-2 rounded-full mr-1 bg-red-600"></div>
              Hors ligne
            </div>
          </DsfrBadge>
        </div>

        <div class="custom-gradient-2 absolute inset-0 pointer-events-none" />
        <div
          v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
          class="text-white absolute bottom-1 right-2 text-xs text-shadow"
        >
          Id: {{ mission.id }}
        </div>
      </template>
      <template v-else>
        <div class="absolute top-4 left-4 flex flex-wrap gap-2 w-[318px] pr-8">
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
      </template>
    </div>

    <div class="m-8 flex-1 flex flex-col items-start">
      <div class="flex flex-col w-full">
        <DsfrHeading as="h3" size="xs" class="line-clamp-3 mb-3 order-3" :title="mission.name">
          {{ mission.name }}
        </DsfrHeading>

        <div class="mb-4 flex flex-wrap gap-2 order-1">
          <DsfrTag :custom-theme="true" :class="`${domaineBackgroundColor(domainId)} text-white`">
            {{ $filters.label(domainId, 'domaines') }}
          </DsfrTag>
          <DsfrTag
            v-if="
              (mission.template && mission.template.domaine_secondary_id) ||
              mission.domaine_secondary_id
            "
          >
            +1
          </DsfrTag>
        </div>

        <div
          class="text-[#666666] text-xs flex items-center justify-start truncate mb-4 max-w-full order-2"
        >
          <component
            :is="iconOrganizationState"
            v-if="['admin', 'referent'].includes($stores.auth.contextRole) && showState"
            class="w-4 h-4 mr-2 fill-current flex-none"
          />
          <RiBuildingFill v-else class="fill-current w-4 h-4 flex-none mr-2" />
          <span class="truncate">{{ mission.structure.name }}</span>
        </div>
      </div>

      <div class="truncate text-[#3A3A3A] text-sm max-w-full">
        <template v-if="mission.is_autonomy">
          {{ autonomyCities }}
        </template>

        <template v-else-if="mission.city && mission.type == 'Mission en présentiel'">
          <span v-if="mission.zip">{{ missionCity }} ({{ mission.zip }})</span>
          <span v-else-if="mission.department">{{ missionCity }} ({{ mission.department }})</span>
          <span v-else>{{ missionCity }}</span>
        </template>

        <template v-else> Mission à distance </template>
      </div>

      <div
        v-if="mission.provider == 'api_engagement'"
        class="text-[#666666] text-xs self-stretch mt-2"
      >
        <div class="flex items-center justify-between space-x-6">
          <div>
            <div class="leading-none">Mission proposée par</div>
            <div class="font-bold">
              {{ mission.publisher_name }}
            </div>
          </div>
          <img
            :src="mission.publisher_logo"
            :alt="mission.publisher_name"
            width="70"
            class="h-auto max-h-[38px] object-contain"
          />
        </div>
      </div>

      <template v-if="showTags && mission.tags">
        <div class="mt-3 max-w-full">
          <DsfrBadge v-for="tag in mission.tags" :key="tag.id" size="sm" class="truncate">
            {{ tag.name }}
          </DsfrBadge>
        </div>
      </template>

      <div
        class="flex items-end justify-between space-x-1 text-xs text-[#666666] pt-8 mt-auto w-full"
      >
        <div v-if="hasExpired">
          <p>Inscription terminée</p>
        </div>
        <div v-else>
          <p>{{ placesLeftText }}</p>
          <p v-if="formattedDate && placesLeftText !== 'Complet' && mission.is_registration_open">
            {{ formattedDate }}
          </p>
        </div>
        <RiArrowRightLine :class="['flex-none ml-auto w-6 h-6 fill-current text-jva-blue-500']" />
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
    showState: {
      type: Boolean,
      default: false,
    },
    showTags: {
      type: Boolean,
      default: false,
    },
    lazyLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    autonomyCities() {
      const { formatAutonomyCities } = autonomyCitiesHelper()
      return formatAutonomyCities(this.mission.autonomy_zips)
    },
    placesLeftText() {
      if (!this.mission.is_registration_open) {
        return 'Inscription fermée'
      } else if (
        this.mission.publisher_name &&
        this.mission.publisher_name !== 'JeVeuxAider.gouv.fr' &&
        this.mission.places_left > 99
      ) {
        return 'Plusieurs bénévoles recherchés'
      } else if (this.mission.places_left && this.mission.places_left > 0) {
        return this.$filters.pluralize(
          this.mission.places_left,
          'bénévole recherché',
          'bénévoles recherchés'
        )
      } else {
        return this.mission.has_places_left === false || this.mission.places_left === 0
          ? 'Complet'
          : 'Plusieurs bénévoles recherchés'
      }
    },
    formattedDate() {
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date
      const now = this.$dayjs()

      if (!startDate) {
        return
      }

      if (this.$route.query?.start && this.$route.name === 'en-ce-moment') {
        return `le ${this.$dayjs(this.$route.query?.start).format('D MMMM YYYY')}`
      }

      const startDateObject =
        Number.isInteger(startDate) && this.$dayjs.unix(startDate).isValid()
          ? this.$dayjs.unix(startDate)
          : this.$dayjs(startDate, 'YYYY-MM-DD HH:mm:ss', 'fr', true).isValid()
          ? this.$dayjs(startDate, 'YYYY-MM-DD HH:mm:ss')
          : this.$dayjs(startDate).isValid()
          ? this.$dayjs(startDate)
          : null

      if (!startDateObject || startDateObject.isBefore(now)) {
        return null
      }

      const format = now.isSame(startDateObject, 'year') ? 'D MMMM' : 'D MMMM YYYY'

      if (endDate) {
        const endDateObject =
          Number.isInteger(endDate) && this.$dayjs.unix(endDate).isValid()
            ? this.$dayjs.unix(endDate)
            : this.$dayjs(endDate, 'YYYY-MM-DD HH:mm:ss', 'fr', true).isValid()
            ? this.$dayjs(endDate, 'YYYY-MM-DD HH:mm:ss')
            : this.$dayjs(endDate).isValid()
            ? this.$dayjs(endDate)
            : null

        if (endDateObject && this.$dayjs(startDateObject).isSame(this.$dayjs(endDateObject))) {
          return `le ${this.$dayjs(startDateObject).format(format)}`
        }
      }

      return `à partir du ${startDateObject.format(format)}`
    },
    iconOrganizationState() {
      switch (this.mission.structure.state) {
        case 'Validée':
          return DsfrSuccessIcon
        case 'Signalée':
        case 'Désinscrite':
          return DsfrErrorIcon
        case 'En attente de validation':
        case 'En cours de traitement':
          return DsfrWarningIcon
        default:
          return DsfrInfoIcon
      }
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
  height: 143px;
  @apply bg-gray-200 overflow-hidden;
  img {
    transition: all 0.25s;
  }
}

.pill {
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 11px;
  font-weight: bold;
  color: #171725;
  height: 23.5px;
  @apply px-3 inline-flex items-center truncate;
}

.custom-gradient {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.7) 150%);
}

.custom-gradient-2 {
  background: linear-gradient(165deg, rgba(0, 0, 0, 0) 77%, rgba(0, 0, 0, 0.7) 100%);
}

.text-shadow {
  text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25), 0px 4px 30px rgba(0, 0, 0, 0.85);
}

/* .fake-purge {
  @apply text-domaine-nature text-domaine-education text-domaine-sante text-domaine-covid text-domaine-prevention text-domaine-culture text-domaine-cooperation text-domaine-memoire text-domaine-solidarite text-domaine-benevolat-competences
} */
</style>
