<template>
  <div class="py-12 xl:py-24 relative overflow-hidden">
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
          <p class="font-bold text-[#18753C] uppercase xl:text-xl">
            Bénévolat, Service Civique ou volontariat international
          </p>
          <DsfrHeading as="h2" size="alt-sm">
            <span>Engagez-vous pour protéger le climat et la biodiversité</span>
          </DsfrHeading>
          <p class="text-xl text-[#3A3A3A] xl:text-[24px] xl:leading-[38px]">
            Envie de passer à l'action pour construire un monde écologique et plus solidaire ? À
            contre-courant des « foutu pour foutu », le Bénévolat, le Service Civique et le
            Volontariat International proposent de nombreuses initiatives pour un avenir durable.
          </p>
          <div>
            <DsfrButton class="mt-4" @click="onViewMoreClick()" size="lg">
              Trouver une mission pour la planète
            </DsfrButton>
          </div>
        </div>
        <img
          src="/images/domaines-logos/logo-missions-pour-la-planete.png"
          alt="Banques Alimentaires"
          width="741"
          height="491"
          class="flex-none w-auto h-[227px] sm:w-auto sm:h-[169px] lg:w-auto lg:h-[200px] xl:w-auto xl:h-[380px]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  components: {},
  data() {
    return {}
  },
  methods: {
    onViewMoreClick() {
      this.$plausible.trackEvent('Homepage - CTA - Missions pour la planète - Opé nationale', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          operation: 'Missions pour la planète',
        },
      })
      window.open('https://www.jeveuxaider.gouv.fr/domaines-action/protection-de-la-nature')
    },
  },
})
</script>

<style lang="postcss" scoped></style>
