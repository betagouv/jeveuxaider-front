<template>
  <div class="relative overflow-hidden">
    <picture aria-hidden="true">
      <source
        srcset="
          /images/home/bg-inscription-benevole.webp,
          /images/home/bg-inscription-benevole@2x.webp 2x,
          /images/home/bg-inscription-benevole.jpg,
          /images/home/bg-inscription-benevole@2x.jpg  2x
        "
        media="(max-width: 640px)"
      />
      <source
        srcset="
          /images/home/bg-inscription-benevole-desktop.webp,
          /images/home/bg-inscription-benevole-desktop@2x.webp 2x,
          /images/home/bg-inscription-benevole-desktop.jpg,
          /images/home/bg-inscription-benevole-desktop@2x.jpg  2x
        "
        media="(min-width: 640px)"
      />
      <img
        src="/images/home/bg-inscription-benevole.jpg"
        alt=""
        width="343"
        height="568"
        class="w-full pointer-events-none object-cover object-top absolute h-full"
      />
    </picture>
    <div
      class="relative text-white px-8 py-12 lg:px-12 lg:py-14 xl:px-[72px] xl:py-16 space-y-8 md:space-y-10 lg:space-y-12"
    >
      <DsfrHeading as="h2" size="alt-lg" color="text-white">
        <span class="block">Liberté<span class="text-jva-orange-300">.</span></span>
        <span class="block">Égalité<span class="text-jva-orange-300">.</span></span>
        <span class="block">Je veux aider<span class="text-jva-orange-300">.</span></span>
      </DsfrHeading>
      <p>
        <span class="text-5xl font-bold leading-[56px] lg:text-[54px] lg:leading-[72px]">
          100 000
        </span>
        <br />
        <span class="text-xl xxs:text-2xl xl:text-[32px] font-bold"> bénévoles recherchés </span>
      </p>
      <div>
        <div class="inline-block">
          <DsfrButton
            type="tertiary-no-outline"
            icon="RiUserHeartLine"
            class="flex-none xl:px-6 xl:py-3 xl:text-lg"
            @click.native="onClick()"
          >
            <span>Créer mon espace </span>
            <span class="hidden xxs:inline">Bénévole</span>
          </DsfrButton>
          <p class="text-lg mt-[14px] xl:text-center">Inscription en 2 minutes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    onClick() {
      this.$plausible.trackEvent('Homepage - CTA - Créer mon espace bénévole', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$router.push('/inscription/benevole')
    },
  },
})
</script>
