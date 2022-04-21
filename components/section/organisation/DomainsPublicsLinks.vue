<template>
  <div>
    <!-- DOMAINES -->
    <template v-if="organisation.domaines">
      <div class="flex items-center mb-4">
        <div class="flex-none uppercase font-bold text-sm mr-4">
          Causes défendues
        </div>
        <hr class="w-full border-white opacity-25">
      </div>

      <div v-if="!organisation.domaines.length">
        Non renseigné
      </div>

      <div v-else class="grid md:grid-cols-2 gap-3 xl:gap-x-6">
        <div
          v-for="domaine in organisation.domaines"
          :key="domaine.id"
          class="flex items-start"
        >
          <div class="flex-none w-6 h-6 mr-3">
            <img
              :src="$options.filters.label(domaine.id, 'domaines', 'icon')"
              :alt="$options.filters.label(domaine.id, 'domaines')"
              width="24"
              height="24"
            >
          </div>
          <div>{{ $options.filters.label(domaine.id, 'domaines') }}</div>
        </div>
      </div>
    </template>

    <!-- PUBLICS -->
    <template v-if="organisation.publics_beneficiaires">
      <div class="flex items-center mb-4 mt-8">
        <div class="flex-none uppercase font-bold text-sm mr-4">
          Bénéficiaires
        </div>
        <hr class="w-full border-white opacity-25">
      </div>

      <div v-if="!organisation.publics_beneficiaires.length">
        Non renseigné
      </div>

      <div
        v-else
        class="space-y-3"
      >
        <div
          v-for="(
            public_beneficiaire, key
          ) in organisation.publics_beneficiaires"
          :key="key"
          class="flex items-center"
        >
          <div
            class="public-wrapper w-6 h-6 mr-3 flex items-center justify-center"
            v-html="iconPublicType(public_beneficiaire)"
          />

          <div>
            {{
              public_beneficiaire
                | label('mission_publics_beneficiaires')
            }}
          </div>
        </div>
      </div>
    </template>

    <!-- SHARE -->
    <template
      v-if="
        organisation.website ||
          organisation.facebook ||
          organisation.twitter ||
          organisation.instagram
      "
    >
      <div class="flex items-center mb-4 mt-8">
        <div class="flex-none uppercase font-bold text-sm mr-4">
          En savoir plus
        </div>
        <hr class="w-full border-white opacity-25">
      </div>

      <div class="flex -m-1">
        <!-- STRUCTURE LINK -->
        <button
          v-if="organisation.website"
          class="m-1 hover:scale-110 transform transition will-change-transform !outline-none focus-within:ring border border-white rounded-full w-10 h-10 flex items-center justify-center"
          @click="goTo(organisation.website)"
        >
          <img
            class="flex-none"
            src="/images/icons/link.svg"
            :alt="organisation.name"
          >
        </button>

        <!-- FACEBOOK -->
        <button
          v-if="organisation.facebook"
          class="m-1 hover:scale-110 transform transition will-change-transform !outline-none focus-within:ring border border-white rounded-full w-10 h-10 flex items-center justify-center"
          @click="goTo(organisation.facebook)"
        >
          <img
            class="flex-none"
            src="/images/icons/facebook.svg"
            alt="Facebook"
          >
        </button>

        <!-- TWITTER -->
        <button
          v-if="organisation.twitter"
          class="m-1 hover:scale-110 transform transition will-change-transform !outline-none focus-within:ring border border-white rounded-full w-10 h-10 flex items-center justify-center"
          @click="goTo(organisation.twitter)"
        >
          <img
            class="flex-none"
            src="/images/icons/twitter.svg"
            alt="twitter"
          >
        </button>

        <!-- INSTAGRAM -->
        <button
          v-if="organisation.instagram"
          class="m-1 hover:scale-110 transform transition will-change-transform !outline-none focus-within:ring border border-white rounded-full w-10 h-10 flex items-center justify-center"
          @click="goTo(organisation.instagram)"
        >
          <img
            class="flex-none"
            src="/images/icons/instagram.svg"
            alt="instagram"
          >
        </button>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    organisation: {
      type: Object,
      required: true
    }
  },
  methods: {
    iconPublicType (publicType) {
      switch (publicType) {
        case 'seniors':
          return require('@/static/images/icons/personnes_agees.svg?raw')

        case 'persons_with_disabilities':
          return require('@/static/images/icons/handicap.svg?raw')

        case 'people_in_difficulty':
          return require('@/static/images/icons/helping_hand.svg?raw')

        case 'parents':
          return require('@/static/images/icons/parents.svg?raw')

        case 'children':
          return require('@/static/images/icons/jeunes_enfants.svg?raw')

        case 'any_public':
          return require('@/static/images/icons/tous_public.svg?raw')

        case 'refugees':
          return require('@/static/images/icons/refugies.svg?raw')

        case 'people_being_excluded':
          return require('@/static/images/icons/exclusion.svg?raw')

        case 'people_sick':
          return require('@/static/images/icons/malades.svg?raw')

        default:
          return require('@/static/images/icons/tous_public.svg?raw')
      }
    },
    goTo (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="postcss" scoped>
.public-wrapper {
  ::v-deep svg {
    @apply w-full h-full;
  }
}
</style>
