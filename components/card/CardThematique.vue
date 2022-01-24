<template>
  <div
    class="card--mission h-auto flex flex-col flex-1 bg-white rounded-xl overflow-hidden safari-fix-scale"
  >
    <div class="thumbnail--wrapper relative">
      <!-- <img
        v-if="thumbnail && domainId"
        :srcset="thumbnail"
        :alt="$options.filters.label(domainId, 'domaines')"
        class="w-full h-full object-cover"
        width="300"
        height="143"
        @error="defaultThumbnail($event)"
      > -->
    </div>

    <div class="mx-8 my-6 flex-1 flex flex-col items-start">
      <!-- <Badge :color="thematique.domaine_id" class="uppercase mb-4">
        {{ $options.filters.label(thematique.domaine_id, 'domaines') }}
      </Badge> -->

      <h3
        :title="thematique.name"
        class="font-black text-black text-lg relative mb-auto line-clamp-3"
      >
        {{ thematique.name }}
      </h3>

      <div
        class="text-gray-500 text-sm mt-2"
      >
        {{ thematique.title }}
      </div>
    </div>

    <div class="border-t p-4 text-center flex items-center justify-center space-x-2">
      <span class="text-sm font-bold">
        {{ thematique.published ? 'En ligne' : 'Hors ligne' }}
      </span>
    </div>
  </div>
</template>

<script>
// import MixinMission from '@/mixins/mission'

export default {
  // mixins: [MixinMission],
  props: {
    thematique: {
      type: Object,
      default: null
    }
  },
  computed: {

  }
}
</script>

<style lang="postcss" scoped>
.card--mission {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);
  max-width: 300px;
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
    transition: all 0.4s ease-in-out;
  }
}
</style>
