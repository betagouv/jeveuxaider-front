<template>
  <div
    class="card--organisation h-auto flex flex-col flex-1 bg-white rounded-xl overflow-hidden safari-fix-scale"
  >
    <div class="thumbnail--wrapper relative">
      <img
        :srcset="image1"
        class="w-full h-full object-cover"
        width="300"
        height="143"
      >

      <div class="custom-gradient absolute inset-0" />
      <div
        class="absolute top-0 flex justify-center inset-x-0"
      >
        <div class="pill !rounded-t-none">
          {{
            organisation.statut_juridique | label('structure_legal_status')
          }}
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
      <Badge v-if="organisation.domaines[0]" :color="organisation.domaines[0].id" class="uppercase mb-4">
        {{ $options.filters.label(organisation.domaines[0].id, 'domaines') }}
      </Badge>

      <h3
        :title="organisation.name"
        class="font-black text-black text-lg relative mb-auto line-clamp-3"
      >
        {{ organisation.name }}
      </h3>

      <div class="mt-4 flex items-center justify-center">
        <Badge :color="organisation.state" plain>
          {{ organisation.state }}
        </Badge>
        <div class="text-gray-500 text-xs flex-shrink-0 ml-2">
          ID <span class="font-semibold">{{ organisation.id }}</span>
        </div>
      </div>
    </div>

    <div
      class="border-t p-4 text-center flex items-center justify-center space-x-2"
    >
      <span class="text-sm font-bold">
        {{
          organisation.places_left
            | pluralize('bénévole recherché', 'bénévoles recherchés')
        }}
      </span>
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
    }
  },
  computed: {
    image1 () {
      return this.organisation.override_image1?.urls.card ??
        this.organisation.illustrations?.[0]?.urls.card ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
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
