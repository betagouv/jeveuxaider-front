<template>
  <div
    class="px-6 pt-10 pb-12 lg:px-8 lg:py-12 xl:px-16 xl:py-12 bg-white rounded-[10px] shadow-xl relative overflow-hidden"
  >
    <div
      class="flex flex-col items-start text-center md:text-left h-full"
    >
      <div
        class="flex-none w-full font-bold text-jva-blue-500 tracking-wide leading-[22px] mb-6 truncate"
      >
        ASSOCIATIONS ET ORGANISATIONS PUBLIQUES
      </div>
      <h2
        class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight mb-8"
      >
        <span>Facilitez-vous le</span>
        <strong class="font-extrabold">
          recrutement de vos bénévoles
        </strong>
      </h2>
      <img
        src="/images/homepage/associations_organisations_publiques.svg"
        alt="Associations & organisations publiques"
        width="311"
        height="219"
        class="mx-auto mb-8 md:h-full md:max-h-[170px] lg:max-h-[270px]"
      >

      <ul class="text-left space-y-3 mb-8">
        <li
          v-for="(goal, index) in goals.associations"
          :key="index"
          class="flex space-x-4 items-start"
        >
          <img
            src="/images/icons/puce_li_check_blue.svg"
            alt="Check"
            class="flex-none mt-1"
            data-not-lazy
            width="19px"
            height="19px"
          >
          <span class="text-lg xl:text-xl text-[#696974]">
            {{ goal }}
          </span>
        </li>
      </ul>

      <nuxt-link
        to="/inscription/responsable"
        class="w-full lg:w-auto flex items-center justify-center px-12 py-3 font-bold rounded-full text-white bg-jva-blue-500 hover:scale-105 transform transition mt-auto lg:mx-auto"
      >
        Inscrire mon organisation
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goals: {
        associations: [
          'Inscrivez votre organisation en quelques clics',
          'Publiez vos missions de bénévolat',
          'Trouvez des bénévoles motivés et disponibles'
        ]
      }
    }
  }
}
</script>

<style>

</style>
