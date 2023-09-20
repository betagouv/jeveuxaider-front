<template>
  <div
    class="px-6 pt-10 pb-12 lg:px-8 lg:py-12 xl:px-14 xl:py-12 bg-white shadow-xl relative overflow-hidden"
  >
    <div class="flex flex-col items-start text-center lg:text-left h-full">
      <p class="flex-none w-full text-[#161616] text-lg mb-6 uppercase">
        Associations et organisations publiques
      </p>

      <DsfrHeading as="h2" size="2xl" class="mb-8">
        Facilitez-vous le recrutement de vos bénévoles
      </DsfrHeading>

      <img
        src="/images/homepage/associations_organisations_publiques.svg"
        alt=""
        width="311"
        height="219"
        class="mx-auto mb-8 lg:h-full lg:max-h-[170px] xl:max-h-[270px]"
      />

      <ul class="text-left space-y-3 mb-8 mx-auto">
        <li
          v-for="(goal, index) in goals.associations"
          :key="index"
          class="flex space-x-4 items-start"
        >
          <img
            src="/images/icons/puce_li_check_blue.svg"
            alt="Check"
            class="flex-none mt-1 xl:mt-[6px]"
            data-not-lazy
            width="19"
            height="19"
          />
          <span class="text-lg xl:text-xl text-[#696974]">
            {{ goal }}
          </span>
        </li>
      </ul>

      <DsfrButton
        to="/inscription/responsable"
        class="flex items-center justify-center mx-auto mt-auto"
        size="lg"
      >
        Inscrire mon organisation
      </DsfrButton>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      goals: {
        associations: [
          'Inscrivez votre organisation en quelques clics',
          'Publiez vos missions de bénévolat',
          'Trouvez des bénévoles motivés et disponibles',
        ],
      },
    }
  },
})
</script>
