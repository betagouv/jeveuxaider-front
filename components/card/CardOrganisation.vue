<template>
  <div
    class="card--organisation h-auto flex flex-col flex-1 bg-white rounded-xl overflow-hidden safari-fix-scale"
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
      <div
        class="absolute top-0 flex justify-center inset-x-0"
      >
        <div class="pill !rounded-t-none">
          {{ organisation.statut_juridique | label('structure_legal_status') }}
        </div>
      </div>

      <div
        class="absolute px-8 mb-2 bottom-0 left-0 text-white w-full"
      >
        <div v-if="organisationCity" class="truncate">
          <span>📍</span>

          <template v-if="organisation.zip">
            <span class="font-bold">{{ organisationCity }}</span>
            <span>({{ organisation.zip }})</span>
          </template>

          <template v-else-if="organisation.department">
            <span class="font-bold">{{ organisationCity }}</span>
            <span>({{ organisation.department }})</span>
          </template>

          <template v-else>
            <span class="font-bold">{{ organisationCity }}</span>
          </template>
        </div>
      </div>
    </div>

    <div class="mx-8 my-6 flex-1 flex flex-col items-start">
      <div class="mb-4 flex flex-wrap gap-2">
        <Badge v-if="domaines[0]" :color="domaines[0].id" class="uppercase">
          {{ $options.filters.label(domaines[0].id, 'domaines') }}
        </Badge>
        <Badge v-if="domaines.length > 1" color="gray-light">
          +{{ domaines.length - 1 }}
        </Badge>
      </div>

      <h3
        :title="organisation.name"
        class="font-black text-black text-lg relative mb-auto line-clamp-3"
      >
        {{ organisation.name }}
      </h3>

      <div v-if="['admin','referent','referent_regional'].includes($store.getters.contextRole) && showInfos" class="mt-4 text-[13px] text-gray-500">
        <div class="">
          Complétion: <span class="font-semibold">{{ organisation.completion_rate }}%</span>
        </div>
        <div v-if="organisation.reseaux.length" class="">
          Réseau: <span class="font-semibold">{{ organisation.reseaux.map(reseau => reseau.name).join(', ') }}</span>
        </div>
      </div>

      <div v-if="showState" class="mt-4 flex items-center justify-center">
        <Badge :color="organisation.state" plain>
          {{ organisation.state }}
        </Badge>
        <div v-if="['admin'].includes($store.getters.contextRole)" class="text-gray-500 text-xs flex-shrink-0 ml-2">
          ID <span class="font-semibold">{{ organisation.id }}</span>
        </div>
      </div>
    </div>

    <div
      class="border-t p-4 text-center flex items-center justify-center space-x-2"
    >
      <template v-if="footerKey === 'places_left'">
        <span
          class="text-sm font-bold"
          :class="[
            organisation.state === 'Validée' ? 'text-gray-900' : 'text-gray-400'
          ]"
        >
          {{
            organisation.places_left
              | pluralize('bénévole recherché', 'bénévoles recherchés')
          }}
        </span>
      </template>
      <template v-if="footerKey === 'missions_available_count'">
        <span
          class="text-sm font-bold"
          :class="[
            organisation.missions_available_count > 0 ? 'text-gray-900' : 'text-gray-400'
          ]"
        >
          {{
            organisation.missions_available_count
              | pluralize('mission disponible', 'missions disponibles')
          }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'

export default {
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
