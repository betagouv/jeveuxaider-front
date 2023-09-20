<template>
  <div class="card--banques-alimentaires relative">
    <div class="relative overflow-hidden safari-fix-scale h-full flex flex-col">
      <img
        srcset="/images/card_decembre_ensemble.webp, /images/card_decembre_ensemble@2x.webp 2x"
        alt="Décembre ensemble !"
        class="w-full object-cover object-center absolute min-h-[398px] h-full"
        width="323"
        height="398"
      />

      <!-- <div class="absolute inset-0 bg-[#F27830] opacity-80" /> -->

      <div
        class="relative p-6 sm:py-8 flex flex-col items-center justify-end space-y-4 text-center h-full cursor-pointer"
        @click="onClick"
      >
        <div class="mb-8">
          <div class="text-5xl leading-none mb-3">❄️</div>

          <h3 class="text-white font-bold text-shadow text-2xl leading-tight sm:text-3xl mb-4">
            <div class="-mx-2">Décembre ensemble !</div>
          </h3>

          <div class="text-white text-shadow font-bold max-w-[272px] text-xl mb-4">
            Donnons du temps <br />contre l’isolement
          </div>
        </div>

        <nuxt-link to="/missions-benevolat?tags=Décembre%20ensemble" @click="onClick">
          <DsfrButton type="tertiary-no-outline" tabindex="-1" @click="onClick">
            Je trouve une mission
          </DsfrButton>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    onClick() {
      this.$plausible.trackEvent('Click CTA - Decembre Ensemble - Card', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      window.location = '/missions-benevolat?tags=Décembre%20ensemble&utm_medium=JVA_CLIC_CARD'
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
