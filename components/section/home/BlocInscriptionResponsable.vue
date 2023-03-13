<template>
  <div class="container">
    <div class="relative bg-white">
      <div class="px-4 pt-10">
        <Heading as="h2" size="alt-md" class="mb-6 text-center">
          <span class="relative">
            <img
              aria-hidden="true"
              src="/images/home/sparkle-left.svg"
              width="37"
              height="33"
              class="absolute left-[-26px] top-[-10px] xxs:-top-2 pointer-events-none"
            >
            <span>Ils sont là.</span>
          </span>
        </Heading>
        <p class="text-xl leading-7 mb-6 text-center">
          Tous les acteurs du bénévolat vous attendent sur la première <strong>plateforme nationale de l’engagement</strong>.
        </p>
        <div class="text-center mb-8">
          <Button @click="handleClick()">
            Inscrivez votre organisation
          </Button>
        </div>
      </div>

      <img
        srcset="
          /images/home/trombi-organisations.webp, /images/home/trombi-organisations@2x.webp 2x,
          /images/home/trombi-organisations.png, /images/home/trombi-organisations@2x.png 2x
        "
        src="/images/home/trombi-organisations.png"
        alt=""
        width="425"
        height="188"
        class="object-cover object-top w-full"
      >
    </div>
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
