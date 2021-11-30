<template>
  <div class="flex flex-col lg:grid lg:grid-cols-2 relative bg-white">
    <!-- LEFT -->
    <div class="order-2 lg:order-1">
      <img
        :srcset="srcSet"
        class="lg:absolute object-cover w-full lg:w-1/2 h-full max-h-[400px] lg:max-h-full"
      >
    </div>

    <!-- RIGHT -->
    <div
      class="order-1 lg:order-2 col-span-2 lg:col-span-1"
      :style="`background-color: ${organisation.color ? organisation.color : '#B91C1C'}`"
    >
      <div class="max-w-3xl mr-auto">
        <div class="text-white px-4 py-8 md:p-8 xl:p-16">
          <slot />

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
                    :alt="domaine.name.fr"
                    width="24"
                    height="24"
                  >
                </div>
                <div>{{ domaine.name.fr }}</div>
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
              v-for="(
                public_beneficiaire, key
              ) in organisation.publics_beneficiaires"
              v-else
              :key="key"
              class="flex items-center mb-3"
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
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    organisation: {
      type: Object,
      required: true
    },
    srcSet: {
      type: String,
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
