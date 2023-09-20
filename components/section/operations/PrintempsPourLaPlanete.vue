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
            Actions bénévoles pour la planète
          </p>
          <DsfrHeading as="h2" size="alt-sm">
            <span>Rejoignez le mouvement </span>
            <br class="hidden lg:block" />
            <span>Printemps pour la planète</span>
          </DsfrHeading>
          <p
            :id="`label-missions-operation-${uuid}`"
            class="text-xl text-[#3A3A3A] xl:text-[24px] xl:leading-[38px]"
          >
            Passez de l’éveil à l’action en participant aux missions de bénévolat au service de ce
            que nous avons de plus précieux : notre planète.
          </p>
        </div>
        <img
          src="/images/operations/logo-printemps-pour-la-planete.svg"
          alt="Printemps pour la planète"
          width="383"
          height="384"
          class="flex-none w-[227px] h-[227px] sm:w-[169px] sm:h-[169px] lg:w-[200px] lg:h-[200px] xl:w-auto xl:h-auto"
        />
      </div>
      <div class="mt-12">
        <div
          class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8 mb-4 lg:mb-8 xl:mb-14"
        >
          <div>
            <p class="font-bold text-xl lg:text-2xl xl:text-[32px] xl:leading-[40px]">
              Engagez-vous pour l’environnement
            </p>
          </div>
          <div class="hidden lg:block flex-none">
            <div class="flex space-x-2">
              <ClientOnly>
                <div :id="`slideshowOperationArrows-${uuid}`" />
              </ClientOnly>
              <BaseButton class="flex-none" type="secondary" @click="onViewMoreClick()">
                Plus de missions
              </BaseButton>
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
            facetFilters: [
              ['domaines:Protection de la nature'],
              ['publisher_name:JeVeuxAider.gouv.fr', `publisher_name:J'agis pour la nature`],
              [
                'activities.name:Travaux manuels',
                'activities.name:Actions de sensibilisation',
                'activities.name:Vie citoyenne',
                'activities.name:Ramassage de déchets',
                'activities.name:Aménagement d\'espaces naturels',
                'activities.name:Soins aux animaux',
              ],
            ],
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
          operation: 'Printemps pour la planète',
        },
      })
      this.$router.push(
        '/missions-benevolat?publisher_name=J%27agis%20pour%20la%20nature%7CJeVeuxAider.gouv.fr&activities.name=Travaux%20manuels%7CActions%20de%20sensibilisation%7CVie%20citoyenne%7CRamassage%20de%20d%C3%A9chets%7CAm%C3%A9nagement%20d%27espaces%20naturels%7CSoins%20aux%20animaux&domaines=Protection%20de%20la%20nature'
      )
    },
    onSlideClick() {
      this.$plausible.trackEvent('Homepage - Clique - Mission opé nationale', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          operation: 'Printemps pour la planète',
        },
      })
    },
  },
})
</script>
