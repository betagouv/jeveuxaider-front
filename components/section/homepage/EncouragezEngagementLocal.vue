<template>
  <div
    class="px-6 pt-10 pb-12 lg:px-8 lg:py-12 xl:px-14 xl:py-12 bg-[#6A6AF4] shadow-xl relative overflow-hidden"
  >
    <div
      class="flex flex-col items-start text-center lg:text-left h-full"
    >
      <p class="flex-none w-full text-white text-lg mb-6 uppercase">
        Collectivités territoriales et territoires
      </p>

      <Heading as="h2" size="2xl" class="mb-8" color="text-white">
        Encouragez l'engagement local de vos citoyens
      </Heading>

      <img
        src="/images/homepage/collectivites_territoires.svg"
        alt=""
        width="311"
        height="299"
        class="mx-auto mb-8 lg:h-full lg:max-h-[170px] xl:max-h-[270px]"
      >

      <ul class="text-left space-y-3 mb-8 mx-auto">
        <li
          v-for="(goal, index) in goals.collectivites"
          :key="index"
          class="flex space-x-4 items-start"
        >
          <img
            src="/images/icons/puce_li_check_white.svg"
            alt="Check"
            class="flex-none mt-1 xl:mt-[6px]"
            data-not-lazy
            width="19"
            height="19"
          >
          <span class="text-lg xl:text-xl text-white">
            {{ goal }}
          </span>
        </li>
      </ul>

      <Button
        to="/inscription/responsable?orga_type=Collectivité"
        size="lg"
        type="tertiary-no-outline"
        class="flex items-center justify-center mx-auto mt-auto"
      >
        Inscrire ma collectivité territoriale
      </Button>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Heading,
    Button
  },
  data () {
    return {
      goals: {
        collectivites: [
          'Créez une page dédiée à votre collectivité territoriale',
          'Centralisez les missions des organisations locales',
          'Encouragez et valorisez l\'engagement de vos citoyens'
        ]
      }
    }
  }
}
</script>

<style>

</style>
