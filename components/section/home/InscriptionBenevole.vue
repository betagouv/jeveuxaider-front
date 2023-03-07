<template>
  <div class="relative p-4">
    <div
      class="relative overflow-hidden safari-fix-scale h-full flex flex-col"
    >
      <img
        srcset="/images/home/bg-inscription-benevole.jpg, /images/home/bg-inscription-benevole@2x.jpg 2x, /images/home/bg-inscription-benevole.webp, /images/home/bg-inscription-benevole@2x.webp 2x"
        alt="Créer mon espace Bénévole"
        class="w-full object-cover object-center absolute min-h-[568px] h-full"
        width="343"
        height="568"
      >
      <div class="relative text-white px-8 pt-16 pb-24">
        <div class="text-5xl font-bold mb-6 leading-[56px]">
          <div>Liberté<span class="text-jva-orange-300">.</span></div>
          <div>Égalité<span class="text-jva-orange-300">.</span></div>
          <div>Je veux aider<span class="text-jva-orange-300">.</span></div>
        </div>
        <div class="mb-8">
          <div class="text-5xl font-bold leading-[56px]">
            100 000
          </div>
          <div class="text-2xl font-bold">
            bénévoles recherchés
          </div>
        </div>
        <Button type="tertiary-no-outline" icon="RiUserHeartLine" @click="handleclick()">
          Créer mon espace Bénévole
        </Button>
        <div class="text-lg mt-2">
          Inscription en 2 minutes
        </div>
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
  methods: {
    handleClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage - Créer mon espace Bénévole', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/inscription/benevole')
    }
  }
}
</script>

<style>

</style>
