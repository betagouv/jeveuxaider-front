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
            Du 1<sup class="top-[-0.3em]">er</sup> au 3 mars
          </p>
          <DsfrHeading as="h2" size="alt-sm">
            <span>Rejoignez les Restos du Cœur</span>
          </DsfrHeading>
          <p
            :id="`label-missions-operation-${uuid}`"
            class="text-xl text-[#3A3A3A] xl:text-[24px] xl:leading-[38px]"
          >
            Chaque année, les Restos du Cœur font appel à la générosité des Français pour tendre la
            main aux plus démunis. Durant un week-end, ils mobilisent des bénévoles, dans les
            magasins et grandes surfaces afin de collecter des denrées alimentaires et des produits
            d’hygiène. Avec la crise, de plus en plus de personnes ont besoin de l’aide alimentaire.
            Cette collecte est vitale pour les aider à revenir à une vie normale.
            <strong>Les 1, 2 et 3 mars prochains</strong>, c’est le moment de faire vivre la
            solidarité en créant le plus grand lien de soutien et d’entraide jamais vu en France.
          </p>
        </div>
        <img
          src="/images/operations/operation-restos-du-coeur.jpg"
          alt="Décembre Ensemble"
          width="383"
          height="384"
          class="flex-none max-w-[227px] sm:max-w-[169px] lg:max-w-[300px] xl:max-w-[340px]"
        />
      </div>
      <div class="mt-12">
        <div
          class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8 mb-4 lg:mb-8 xl:mb-14"
        >
          <div class="">
            <p class="font-bold text-xl lg:text-2xl xl:text-[32px] xl:leading-[40px]">
              Devenez bénévole du cœur
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
            facetFilters: [['tags:Collecte nationale des Restos du Cœur']],
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
          operation: 'Restos du coeur 2024',
        },
      })
      this.$router.push('/missions-benevolat?tags=Collecte nationale des Restos du Cœur')
    },
    onSlideClick() {
      this.$plausible.trackEvent('Homepage - Clique - Mission opé nationale', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          operation: 'Restos du coeur 2024',
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
