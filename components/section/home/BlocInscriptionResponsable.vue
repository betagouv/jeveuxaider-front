<template>
  <div class="relative bg-white flex flex-col items-center overflow-hidden">
    <div class="px-6 pt-12 md:px-8 lg:px-12 lg:pt-14 xl:px-[72px] xl:pt-20">
      <Heading as="h2" size="alt-md" class="mb-6 text-center">
        <span class="relative">
          <img
            src="/images/home/sparkle-left.svg"
            alt=""
            width="37"
            height="33"
            aria-hidden="true"
            class="absolute left-[-26px] top-[-10px] xl:w-[50px] xl:left-[-38px] xl:top-[-8px] pointer-events-none"
          >
          <span>Ils sont là.</span>
        </span>
      </Heading>
      <p class="text-xl leading-7 mb-6 xl:mb-10 text-center">
        Tous les acteurs du bénévolat vous attendent sur la première <strong>plateforme nationale de l’engagement</strong>.
      </p>
      <div class="text-center mb-8 xl:mb-12">
        <Button class="xl:px-6 xl:py-3 xl:text-lg" @click="handleClick()">
          Inscrivez votre organisation
        </Button>
      </div>
    </div>

    <picture aria-hidden="true" class="mt-auto">
      <source
        srcset="
          /images/home/trombi-organisations.webp, /images/home/trombi-organisations@2x.webp 2x,
          /images/home/trombi-organisations.png, /images/home/trombi-organisations@2x.png 2x
        "
        media="(max-width: 640px)"
      >
      <source
        srcset="
          /images/home/trombi-organisations-desktop.webp, /images/home/trombi-organisations-desktop@2x.webp 2x,
          /images/home/trombi-organisations-desktop.png, /images/home/trombi-organisations-desktop@2x.png 2x
        "
        media="(min-width: 640px)"
      >
      <img
        src="/images/home/trombi-organisations.png"
        alt=""
        width="425"
        height="188"
        class="object-cover object-top w-full h-[170px] sm:h-[240px] sm:px-8 md:px-0 max-w-none md:w-[500px] lg:w-[650px] xl:w-[890px] xl:h-[364px]"
      >
    </picture>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Button,
    Heading
  },
  handleClick () {
    window.plausible &&
        window.plausible('Click CTA - Homepage - Inscrivez votre organisation', {
          props: { isLogged: this.$store.getters.isLogged }
        })
    this.$router.push('/inscription/responsable')
  }
}
</script>
