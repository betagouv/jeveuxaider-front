<template>
  <div class="px-8 py-12 xl:p-16 bg-[#6A6AF4] shadow-xl text-white">
    <div class="relative flex flex-col items-start gap-8 lg:gap-12">
      <div class="flex flex-col md:flex-row gap-8 xl:mb-10">
        <img
          src="/images/home/acteurs-stars.svg"
          alt=""
          class="flex-none"
          width="81"
          height="69"
          aria-hidden="true"
        />
        <DsfrHeading as="h2" size="2xl" color="text-white">
          <span>Rejoignez la communauté </span>
          <br class="hidden xl:block" />
          <span
            >des <br class="hidden lg:block xl:hidden" />
            Super-Bénévoles</span
          >
        </DsfrHeading>
      </div>
      <ul
        class="text-xl leading-6 space-y-6 lg:space-y-0 lg:flex lg:flex-wrap lg:gap-x-12 lg:gap-y-6 xl:gap-x-16"
      >
        <li class="flex items-start lg:items-center space-x-3">
          <RiCheckboxCircleLine class="w-6 h-6 text-white fill-current flex-none" />
          <p>Agissez en faveur de l’<strong>intérêt général</strong></p>
        </li>
        <li class="flex items-start lg:items-center space-x-3">
          <RiCheckboxCircleLine class="w-6 h-6 text-white fill-current flex-none" />
          <p>Partagez des moments de <strong>convivialité</strong></p>
        </li>
        <li class="flex items-start lg:items-center space-x-3">
          <RiCheckboxCircleLine class="w-6 h-6 text-white fill-current flex-none" />
          <p>Montez en <strong>compétences</strong></p>
        </li>
      </ul>
      <DsfrButton
        type="tertiary-no-outline"
        class="lg:absolute lg:right-0 lg:bottom-0 xl:bottom-auto xl:top-[26px]"
        size="lg"
        @click="handleClick()"
      >
        Devenir Super-Bénévole
      </DsfrButton>
      <div
        class="flex items-center space-x-4 xl:absolute xl:right-[320px] xl:max-w-[340px] xl:top-[26px]"
      >
        <img
          srcset="
            /images/home/coralie.webp,
            /images/home/coralie@2x.webp 2x,
            /images/home/coralie.png,
            /images/home/coralie@2x.png  2x
          "
          src="/images/home/coralie.png"
          alt="Coralie"
          class="flex-none h-[48px] w-[48px] lg:w-[60px] lg:h-[60px]"
        />
        <p>
          <strong>Coralie</strong> de JeVeuxAider.gouv.fr
          <br class="hidden sm:block" />
          pour vous accompagner
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    handleClick() {
      this.$plausible.trackEvent('Homepage - CTA - Rejoindre la communauté', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$router.push('/missions-benevolat/13190/benevolat-jeveuxaidergouvfr-paris')
    },
  },
})
</script>
