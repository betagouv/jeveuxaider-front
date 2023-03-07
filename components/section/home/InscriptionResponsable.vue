<template>
  <div class="relative p-4">
    <div class="relative h-[525px] bg-white px-8 pt-16 pb-24">
      <div class="text-5xl font-bold mb-6 leading-[56px] text-center">
        <span class="relative"><img class="absolute left-[-26px] top-[-5px]" src="/images/home/sparkle-left.svg"> Ils sont là.</span>
      </div>
      <div class="text-xl leading-7 mb-6 text-center">
        Tous les acteurs du bénévolat vous attendent sur la première <strong>plateforme nationale de l’engagement</strong>.
      </div>
      <div class="text-center">
        <Button @click="handleClick()">
          Inscrivez votre organisation
        </Button>
      </div>

      <div class="absolute bottom-0 right-0 left-0">
        <picture>
          <img
            srcset="
          /images/home/trombi-organisations.webp,
          /images/home/trombi-organisations@2x.webp 2x,
          /images/home/trombi-organisations.png,
          /images/home/trombi-organisations@2x.png 2x
        "
            alt="Trombinoscope organisations"
            class=""
            data-not-lazy
          >
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
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

<style>

</style>
