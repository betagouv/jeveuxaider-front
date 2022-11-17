<template>
  <div class="card--banques-alimentaires relative">
    <div
      class="relative overflow-hidden safari-fix-scale h-full flex flex-col"
    >
      <img
        srcset="/images/card_ba.webp, /images/card_ba@2x.webp 2x"
        alt="Collecte nationale Banques Alimentaires"
        class="w-full object-cover object-center absolute min-h-[398px] h-full"
        width="323"
        height="398"
      >

      <div class="absolute inset-0 bg-[#F27830] opacity-80" />

      <div
        class="relative p-6 sm:py-8 flex flex-col items-center justify-between text-center h-full"
      >
        <div class="text-5xl leading-none mb-3">
          🍞
        </div>

        <h3
          class="text-white font-bold text-shadow text-2xl leading-tight sm:text-3xl mb-4"
        >
          <div class="-mx-2">
            Collecte nationale
          </div>
          <div class="text-xl sm:text-2xl">
            Banques Alimentaires
          </div>
        </h3>

        <div class="text-white text-shadow font-bold max-w-[272px] text-xl mb-4">
          2 heures pour aider<br> 2 millions de personnes
        </div>

        <div class="text-white text-shadow max-w-[272px] text-lg mb-6">
          Missions disponibles<br> partout en France
        </div>

        <nuxt-link
          to="/missions-benevolat?tags=Collecte%20nationale%20des%20Banques%20Alimentaires"
          @click="onClickBACollecte"
        >
          <Button type="tertiary-no-outline" tabindex="-1" @click="onClickBACollecte">
            Je trouve une mission
          </Button>
        </nuxt-link>
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
    onClickBACollecte () {
      window.plausible &&
        window.plausible('Click CTA - Collecte BA - Card Missions Prioritaires', {
          props: { isLogged: this.$store.getters.isLogged }
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.card--banques-alimentaires {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);
  @apply transition;

  @screen sm {
    &:hover {
      @apply shadow-xl;
    }
  }
}

.text-shadow {
  text-shadow: 0px 4px 12px rgb(0 0 0 / 50%);
}
</style>
