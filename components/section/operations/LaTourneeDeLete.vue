<template>
  <div class="bg-white py-12 xl:py-24 relative overflow-hidden">
    <img
      aria-hidden="true"
      src="/images/home/decorations.svg"
      alt=""
      width="1692"
      height="553"
      class="hidden xl:block pointer-events-none absolute top-16 inset-x-0 object-cover object-top w-[1692px] h-[553px] mx-auto"
    />
    <div class="container relative">
      <div class="flex flex-col justify-between items-center sm:flex-row gap-12">
        <div class="flex flex-col space-y-4 xl:space-y-8 max-w-[740px]">
          <p class="font-bold text-jva-blue-500 uppercase xl:text-xl">
            Actions bénévoles pour un été solidaire
          </p>
          <DsfrHeading as="h2" size="alt-sm">
            <span>Rejoignez la tournée d’été</span>
          </DsfrHeading>
          <p
            :id="`label-missions-operation-${uuid}`"
            class="text-xl text-[#3A3A3A] xl:text-[24px] xl:leading-[38px]"
          >
            Et si nous rendions la promesse de l'été, ses fêtes et ses échappées accessible au plus
            grand nombre grâce au bénévolat ? C'est le défi de la tournée d'été : une boucle joyeuse
            tournée vers les autres.
          </p>
        </div>
        <img
          src="/images/operations/logo-la-tournee-de-lete.svg"
          alt="La tournée de l'été"
          width="383"
          height="384"
          class="flex-none w-[227px] h-[227px] sm:w-[169px] sm:h-[169px] lg:w-[200px] lg:h-[200px] xl:w-[380px] xl:h-[380px]"
        />
      </div>
      <div class="mt-12">
        <div
          class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8 mb-4 lg:mb-8 xl:mb-14"
        >
          <div>
            <p class="font-bold text-xl lg:text-2xl xl:text-[32px] xl:leading-[40px]">
              Rejoignez le mouvement
            </p>
          </div>
          <div class="hidden lg:block flex-none">
            <div class="flex space-x-2">
              <ClientOnly>
                <div :id="`slideshowOperationArrows-${uuid}`" />
              </ClientOnly>
              <DsfrButton class="flex-none" type="secondary" @click="onViewMoreClick()">
                Plus de missions
              </DsfrButton>
            </div>
          </div>
        </div>
        <AlgoliaSlideshowMissions
          :navigation-id="`slideshowOperationArrows-${uuid}`"
          navigation-button-class="hover:bg-[#F6F6F6]"
          :aria-labelledby="`label-missions-operation-${uuid}`"
          :search-parameters="{
            hitsPerPage: 6,
            aroundPrecision: 2000,
            facetFilters: [['tags:La tournée d\'été']],
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
          }"
          @slide-click="onSlideClick"
        />
        <div class="lg:hidden mt-6 text-center">
          <DsfrButton type="tertiary" @click="onViewMoreClick()"> Plus de missions </DsfrButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSlideshowMissions,
  },
  data() {
    return {
      uuid: uuidv4(),
    }
  },
  methods: {
    onViewMoreClick() {
      this.$plausible.trackEvent('Homepage - CTA - Plus de missions - Opé nationale', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          operation: "La tournée de l'été",
        },
      })
      this.$router.push('/missions-benevolat?tags=La%20tournée%20d%27été')
    },
    onSlideClick() {
      this.$plausible.trackEvent('Homepage - Clique - Mission opé nationale', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          operation: "La tournée de l'été",
        },
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
.slide-wrapper {
  @apply !flex flex-col h-full max-w-[320px] transition;
  width: calc(100vw - 64px) !important; /* To let the next slide appear */
}
</style>
