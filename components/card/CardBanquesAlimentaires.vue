<template>
  <div class="card--banques-alimentaires relative">
    <div
      class="relative rounded-[10px] overflow-hidden safari-fix-scale h-full flex flex-col"
    >
      <img
        srcset="/images/card_ba.webp, /images/card_ba@2x.webp 2x"
        alt="Collecte nationale Banques Alimentaires"
        class="w-full object-cover object-center absolute min-h-[398px] h-full"
        width="323"
        height="398"
      >

      <div class="absolute inset-0 bg-[#F27830] opacity-80" />

      <div class="relative mt-auto p-6 sm:py-8 flex flex-col items-center text-center">
        <div class="text-5xl leading-none mb-1">
          🍞
        </div>

        <h3
          class="text-white font-extrabold text-shadow text-2xl leading-tight sm:text-3xl mb-4"
        >
          Collecte nationale
          <div class="text-xl sm:text-2xl font-bold">
            Banques Alimentaires
          </div>
        </h3>

        <div
          class="text-white text-shadow font-extrabold max-w-[272px] text-xl sm:text-2xl mb-6"
        >
          2 heures pour aider<br> 2 millions de personnes
        </div>

        <div
          class="text-white text-shadow font-bold max-w-[272px] text-lg mb-6"
        >
          Missions disponibles<br> partout en France
        </div>

        <nuxt-link
          class="rounded-full bg-white text-black hover:scale-105 !outline-none focus:scale-105 transition px-8 py-3 transform shadow-xl inline-flex font-bold text-sm sm:text-base"
          to="/missions-benevolat?activity.name=Collecte de produits&structure.reseaux.name=Fédération Française des Banques Alimentaires"
        >
          <span>Je trouve une mission</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {}
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
