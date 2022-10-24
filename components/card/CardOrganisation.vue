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
      >

      <div class="custom-gradient absolute inset-0" />

      <DsfrBadge class="absolute top-3 left-3">
        {{ organisation.statut_juridique | label('structure_legal_status') }}
      </DsfrBadge>
    </div>

    <div class="mx-8 my-6 flex-1 flex flex-col items-start min-h-[110px]">
      <div v-if="domaines[0]" class="mb-4 flex flex-wrap gap-2">
        <Tag>
          {{ $options.filters.label(domaines[0].id, 'domaines') }}
        </Tag>
        <Tag v-if="domaines.length > 1">
          +{{ domaines.length - 1 }}
        </Tag>
      </div>

      <div class="mb-3">
        <Heading as="h3" size="xs" class="line-clamp-3" :title="organisation.name">
          {{ organisation.name }}
        </Heading>
        <div v-if="showState" class="mt-1">
          <DsfrBadge
            size="xs"
            :type="badgeTypeOrganisationSate"
            class="mb-4"
          >
            {{ organisation.state }}
          </DsfrBadge>
          <div v-if="['admin'].includes($store.getters.contextRole)" class="text-[#666666] text-xs">
            ID <span class="font-bold">{{ organisation.id }}</span>
          </div>
        </div>
        <div v-if="['admin','referent','referent_regional'].includes($store.getters.contextRole) && showInfos" class="text-[#666666] text-xs">
          <div>
            Complétion: <span class="font-bold">{{ organisation.completion_rate }}%</span>
          </div>
          <div v-if="organisation.reseaux.length">
            Réseau: <span class="font-bold">{{ organisation.reseaux.map(reseau => reseau.name).join(', ') }}</span>
          </div>
        </div>
      </div>

      <div class="truncate text-[#3A3A3A] text-sm max-w-full">
        <div v-if="organisationCity" class="truncate">
          <span v-if="organisation.zip">{{ organisationCity }} ({{ organisation.zip }})</span>
          <span v-else-if="organisation.department">{{ organisationCity }} ({{ organisation.department }})</span>
          <span v-else>{{ organisationCity }}</span>
        </div>
      </div>

      <div class="flex items-end justify-between space-x-1 text-xs text-[#666666] pt-8 mt-auto w-full">
        <span v-if="footerKey === 'places_left'">
          {{ organisation.places_left | pluralize('bénévole recherché', 'bénévoles recherchés') }}
        </span>
        <span v-if="footerKey === 'missions_available_count'">
          {{ organisation.missions_available_count | pluralize('mission disponible', 'missions disponibles') }}
        </span>
        <RiArrowRightLine class="flex-none ml-auto w-8 h-8 text-jva-blue-500 fill-current" />
      </div>
    </div>
  </div>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'
import DsfrBadge from '@/components/dsfr/Badge.vue'
import Tag from '@/components/dsfr/Tag.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    DsfrBadge,
    Tag,
    Heading
  },
  mixins: [MixinOrganisation],
  props: {
    organisation: {
      type: Object,
      default: null
    },
    showInfos: {
      type: Boolean,
      default: false
    },
    showState: {
      type: Boolean,
      default: false
    },
    footerKey: {
      type: String,
      default: 'places_left'
    }
  },
  computed: {
    image1 () {
      if (this.organisation?.picture?.large) {
        return this.organisation?.picture?.large
      }

      return this.organisation.override_image1?.urls.large ??
        this.organisation.illustrations?.[0]?.urls.large ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    domaines () {
      if (this.organisation.statut_juridique != 'Collectivité') {
        return this.organisation.domaines
      }

      // Mémoire et cotoyenneté, Solidarité et insertion
      return [...this.organisation.domaines]
        .filter(domaine => [7, 8].includes(domaine.id))
        .sort((a, b) => {
          return b.id - a.id
        })
    },
    badgeTypeOrganisationSate () {
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
    }
  },
  methods: {
    onImgError ($event) {
      $event.target.srcset = '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
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
  background: linear-gradient(
    183.3deg,
    rgba(0, 0, 0, 0) 66.74%,
    rgba(0, 0, 0, 0.7) 102.8%
  );
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
</style>
