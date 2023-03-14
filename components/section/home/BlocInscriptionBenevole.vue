<template>
  <div class="relative overflow-hidden h-full flex flex-col">
    <img
      aria-hidden="true"
      srcset="
        /images/home/bg-inscription-benevole.webp, /images/home/bg-inscription-benevole@2x.webp 2x,
        /images/home/bg-inscription-benevole.jpg, /images/home/bg-inscription-benevole@2x.jpg 2x"
      alt=""
      width="343"
      height="568"
      class="w-full pointer-events-none object-cover object-top absolute min-h-[568px] h-full"
    >
    <div class="relative text-white px-8 pt-12 pb-16">
      <Heading as="h2" size="alt-lg" class="mb-6" color="text-white">
        <span class="block">Liberté<span class="text-jva-orange-300">.</span></span>
        <span class="block">Égalité<span class="text-jva-orange-300">.</span></span>
        <span class="block">Je veux aider<span class="text-jva-orange-300">.</span></span>
      </Heading>
      <p class="mb-8">
        <span class="text-5xl font-bold leading-[56px]">
          100 000
        </span>
        <br>
        <span class="text-xl xxs:text-2xl font-bold">
          bénévoles recherchés
        </span>
      </p>
      <Button type="tertiary-no-outline" icon="RiUserHeartLine" @click.native="onClick()">
        <span>Créer mon espace </span>
        <span class="hidden xxs:inline">Bénévole</span>
      </Button>
      <p class="text-lg mt-3">
        Inscription en 2 minutes
      </p>
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
  methods: {
    onClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage - Créer mon espace Bénévole', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/inscription/benevole')
    }
  }
}
</script>
