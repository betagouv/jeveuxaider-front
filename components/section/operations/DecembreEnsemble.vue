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
          <p class="font-bold text-jva-blue-500 uppercase xl:text-xl">Du 1er au 31 décembre</p>
          <DsfrHeading as="h2" size="alt-sm">
            <span>Donnez du temps contre l’isolement</span>
          </DsfrHeading>
          <p
            :id="`label-missions-operation-${uuid}`"
            class="text-xl text-[#3A3A3A] xl:text-[24px] xl:leading-[38px]"
          >
            Chaque année <strong>au mois de décembre</strong>, JeVeuxAider.gouv.fr lance un appel
            national pour <strong>lutter contre l’isolement</strong>. Au programme, du bénévolat de
            rue, des maraudes, des distribution de repas chauds auprès des personnes les plus
            fragiles. Décembre Ensemble, c’est aussi l’organisation de réveillons solidaires, de
            cadeaux et de petits mots pour permettre à toutes et tous, de goûter à la magie des
            fêtes. Près de chez soi et même à distance, chacun d’entre nous peut prendre part à
            l’opération, et passer Décembre Ensemble.
          </p>
        </div>
        <img
          src="/images/operations/operation-decembre-ensemble.png"
          alt="Décembre Ensemble"
          width="383"
          height="384"
          class="flex-none w-[227px] h-[227px] sm:w-[169px] sm:h-[169px] lg:w-[200px] lg:h-[200px] xl:w-[380px] xl:h-[380px]"
        />
      </div>
      <div class="mt-12">
        <div
          class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8 mb-4 lg:mb-8 xl:mb-14"
        >
          <div class="">
            <p class="font-bold text-xl lg:text-2xl xl:text-[32px] xl:leading-[40px]">
              Rejoignez Décembre Ensemble
            </p>
          </div>
          <div class="hidden lg:block flex-none">
            <div class="flex space-x-2">
              <div id="slideshowOperationArrows" />
              <DsfrButton class="flex-none" type="secondary" @click="onViewMoreClick()">
                Plus de missions
              </DsfrButton>
            </div>
          </div>
        </div>
        <AlgoliaSlideshowMissions
          navigation-id="slideshowOperationArrows"
          navigation-button-class="hover:bg-[#F6F6F6]"
          :aria-labelledby="`label-missions-operation-${uuid}`"
          :search-parameters="{
            hitsPerPage: 6,
            aroundPrecision: 2000,
            facetFilters: [['tags:Décembre ensemble 2023']],
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
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSlideshowMissions,
  },
  setup() {
    return {
      uuid: useId(),
    }
  },
  methods: {
    onViewMoreClick() {
      this.$plausible.trackEvent('Homepage - CTA - Plus de missions - Opé nationale', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          operation: 'Décembre ensemble 2023',
        },
      })
      this.$router.push('/missions-benevolat?tags=Décembre ensemble 2023')
    },
    onSlideClick() {
      this.$plausible.trackEvent('Homepage - Clique - Mission opé nationale', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          operation: 'Décembre ensemble 2023',
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
