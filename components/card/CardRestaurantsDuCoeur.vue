<template>
  <a
    href="/missions-benevolat?tags=Collecte%20nationale%20des%20Restos%20du%20Cœur"
    class="card--banques-alimentaires relative"
    @click.prevent="onClick"
  >
    <div class="relative overflow-hidden safari-fix-scale h-full flex flex-col">
      <img
        srcset="
          /images/card_collecte_nationale_restos_du_coeur.webp,
          /images/card_collecte_nationale_restos_du_coeur@2x.webp 2x
        "
        alt="Collecte nationale des Restos du Cœur"
        class="w-full object-cover object-center absolute min-h-[398px] h-full"
        width="323"
        height="398"
      />

      <!-- <div class="absolute inset-0 bg-[#F27830] opacity-80" /> -->

      <div
        class="relative p-6 sm:py-8 flex flex-col items-center justify-end space-y-4 text-center h-full cursor-pointer"
      >
        <div class="mb-8">
          <div class="text-5xl leading-none mb-3" aria-hidden="true">🍽️</div>

          <h3
            class="text-white font-bold text-shadow text-2xl leading-tight sm:text-3xl mb-4 -mx-2"
          >
            Collecte nationale des Restos du Cœur
          </h3>

          <div class="text-white text-shadow font-bold max-w-[272px] text-xl mb-4">
            Devenez bénévole le temps de quelques heures
          </div>
        </div>

        <DsfrButton as="span" type="tertiary-no-outline" @click.native.prevent.stop="onClick">
          Je trouve une mission
        </DsfrButton>
      </div>
    </div>
  </a>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    onClick() {
      this.$plausible.trackEvent('Click CTA - Collecte nationale Restos du Coeur - Card', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      window.location =
        '/missions-benevolat?tags=Collecte%20nationale%20des%20Restos%20du%20Cœur&utm_medium=JVA_CLIC_CARD'
    },
  },
})
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
