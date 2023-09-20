<template>
  <div
    class="card--organisation h-auto flex flex-col flex-1 bg-white overflow-hidden safari-fix-scale border border-[#E5E5E5]"
  >
    <div class="thumbnail--wrapper relative">
      <img
        :srcset="image1"
        sizes="300px"
        class="w-full h-full object-cover"
        width="300"
        height="143"
        @error="onImgError"
      />

      <template v-if="showState">
        <div class="custom-gradient absolute inset-0" />
        <DsfrBadge
          size="sm"
          :type="badgeTypeOrganisationSate"
          class="absolute top-3 left-3 shadow-lg"
        >
          {{ organisation.state }}
        </DsfrBadge>

        <div
          :class="[
            'absolute inset-0',
            ['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole) &&
            showInfos &&
            organisation.completion_rate < 100
              ? 'custom-gradient-3'
              : 'custom-gradient-2',
          ]"
        />
        <div
          v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
          class="text-white text-right absolute bottom-2 right-2 text-xs text-shadow leading-tight"
        >
          <div>Id: {{ organisation.id }}</div>
          <div v-if="showInfos && organisation.completion_rate < 100">
            Complétion: {{ organisation.completion_rate }}%
          </div>
        </div>
      </template>
    </div>

    <div class="mx-8 my-6 flex-1 flex flex-col items-start min-h-[110px]">
      <div v-if="domaines[0]" class="mb-4 flex flex-wrap gap-2">
        <DsfrTag
          :custom-theme="true"
          :class="`${domaineBackgroundColor(domaines[0].id)} text-white`"
        >
          {{ $filters.label(domaines[0].id, 'domaines') }}
        </DsfrTag>
        <DsfrTag v-if="domaines.length > 1"> +{{ domaines.length - 1 }} </DsfrTag>
      </div>

      <div class="text-[#666666] text-xs flex items-center justify-start truncate mb-4 max-w-full">
        <RiBuildingFill class="fill-current w-4 h-4 flex-none mr-2" />
        <span class="truncate">{{
          $filters.label(organisation.statut_juridique, 'structure_legal_status')
        }}</span>
      </div>

      <DsfrHeading as="h3" size="xs" class="line-clamp-3 mb-3" :title="organisation.name">
        {{ organisation.name }}
      </DsfrHeading>

      <div class="truncate text-[#3A3A3A] text-sm max-w-full mb-3">
        <div v-if="organisationCity" class="truncate">
          <span v-if="organisation.zip">{{ organisationCity }} ({{ organisation.zip }})</span>
          <span v-else-if="organisation.department"
            >{{ organisationCity }} ({{ organisation.department }})</span
          >
          <span v-else>{{ organisationCity }}</span>
        </div>
      </div>

      <div
        v-if="
          ['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole) && showInfos
        "
        class="text-[#666666] text-xs"
      >
        <div v-if="organisation.reseaux.length">
          Réseau:
          <span class="font-bold">{{
            organisation.reseaux.map((reseau) => reseau.name).join(', ')
          }}</span>
        </div>
      </div>

      <div
        class="flex items-end justify-between space-x-1 text-xs text-[#666666] pt-8 mt-auto w-full"
      >
        <span v-if="footerKey === 'places_left'">
          {{
            $filters.pluralize(
              organisation.places_left,
              'bénévole recherché',
              'bénévoles recherchés'
            )
          }}
        </span>
        <span v-if="footerKey === 'missions_available_count'">
          {{
            $filters.pluralize(
              organisation.missions_available_count,
              'mission disponible',
              'missions disponibles'
            )
          }}
        </span>
        <RiArrowRightLine class="flex-none ml-auto w-6 h-6 text-jva-blue-500 fill-current" />
      </div>
    </div>
  </div>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'
import MixinDomaines from '@/mixins/domaines'

export default defineNuxtComponent({
  mixins: [MixinOrganisation, MixinDomaines],
  props: {
    organisation: {
      type: Object,
      default: null,
    },
    showInfos: {
      type: Boolean,
      default: false,
    },
    showState: {
      type: Boolean,
      default: false,
    },
    footerKey: {
      type: String,
      default: 'places_left',
    },
  },
  computed: {
    image1() {
      if (this.organisation?.picture?.large) {
        return this.organisation?.picture?.large
      }

      return (
        this.organisation.override_image1?.urls.large ??
        this.organisation.illustrations?.[0]?.urls.large ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
      )
    },
    domaines() {
      if (this.organisation.statut_juridique != 'Collectivité') {
        return this.organisation.domaines
      }

      // Mémoire et cotoyenneté, Solidarité et insertion
      return [...this.organisation.domaines]
        .filter((domaine) => [7, 8].includes(domaine.id))
        .sort((a, b) => {
          return b.id - a.id
        })
    },
    badgeTypeOrganisationSate() {
      switch (this.organisation.state) {
        case 'Validée':
          return 'success'
        case 'Signalée':
        case 'Annulée':
        case 'Désinscrite':
          return 'error'
        case 'En attente de validation':
        case 'En cours de traitement':
          return 'warning'
        default:
          return 'info'
      }
    },
  },
  methods: {
    onImgError($event) {
      $event.target.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>

<style lang="postcss" scoped>
.card--organisation {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);
  @apply transition;
  @screen sm {
    &:hover {
      .thumbnail--wrapper img {
        transform: scale(1.05);
      }
      @apply shadow-xl;
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

.custom-gradient {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.7) 150%);
}

.custom-gradient-2 {
  background: linear-gradient(165deg, rgba(0, 0, 0, 0) 77%, rgba(0, 0, 0, 0.7) 100%);
}

.custom-gradient-3 {
  background: linear-gradient(155deg, rgba(0, 0, 0, 0) 66%, rgba(0, 0, 0, 0.7) 95%);
}

.text-shadow {
  text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25), 0px 4px 30px rgba(0, 0, 0, 0.85);
}
</style>
