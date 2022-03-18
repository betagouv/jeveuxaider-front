<template>
  <div
    class="px-6 pt-10 pb-12 lg:px-8 lg:py-12 xl:px-16 xl:py-12 bg-jva-green-500 rounded-[10px] shadow-xl relative overflow-hidden"
  >
    <div
      class="flex flex-col items-start text-center md:text-left h-full"
    >
      <div
        class="flex-none w-full font-bold text-white tracking-wide leading-[22px] mb-6 truncate"
      >
        COLLECTIVITÉS TERRITORIALES ET TERRITOIRES
      </div>
      <h2
        class="text-white justify-end text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight mb-8"
      >
        <span>Encouragez</span>
        <strong class="font-extrabold"> l'engagement local </strong>
        <span>de vos citoyens</span>
      </h2>
      <img
        src="/images/homepage/collectivites_territoires.svg"
        alt="Collectivités territoriales et territoires"
        width="311"
        height="299"
        class="mx-auto mb-8 md:h-full md:max-h-[170px] lg:max-h-[270px]"
      >

      <ul class="text-left space-y-3 mb-8">
        <li
          v-for="(goal, index) in goals.collectivites"
          :key="index"
          class="flex space-x-4 items-start"
        >
          <img
            src="/images/icons/puce_li_check_white.svg"
            alt="Check"
            class="flex-none mt-1"
            data-not-lazy
            width="19px"
            height="19px"
          >
          <span class="text-lg xl:text-xl text-white">
            {{ goal }}
          </span>
        </li>
      </ul>

      <nuxt-link
        to="/inscription/responsable?orga_type=Collectivité"
        class="w-full lg:w-auto flex items-center justify-center px-12 py-3 font-bold rounded-full text-jva-green-500 bg-white hover:scale-105 transform transition mt-auto lg:mx-auto"
      >
        Inscrire ma collectivité territoriale
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
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
