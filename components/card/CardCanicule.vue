<template>
  <div class="card--canicule relative">
    <div class="relative overflow-hidden safari-fix-scale h-full flex flex-col">
      <img
        srcset="/images/card_canicule.webp, /images/card_canicule@2x.webp 2x"
        alt="Mobilisons-nous pour faire face aux vagues de chaleur !"
        class="w-full object-cover object-center absolute min-h-[406px]"
        width="323"
        height="406"
      />

      <div class="relative mt-auto p-6 sm:py-8 sm:px-7 flex flex-col items-center text-center">
        <div class="text-[48px] sm:text-[60px] font-extrabold">☀</div>

        <h3
          class="text-white font-extrabold text-shadow mb-6 text-2xl leading-tight sm:leading-none sm:text-3xl"
        >
          Mobilisons-nous<br />pour faire face aux vagues de chaleur !
        </h3>

        <div
          class="text-white text-shadow font-bold max-w-[272px] text-lg sm:text-xl !leading-tight sm:!leading-[22px] mb-6"
        >
          Des missions sont disponibles partout en France
        </div>

        <nuxt-link
          no-prefetch
          class="rounded-full bg-[#FFD500] text-[#070191] hover:scale-105 !outline-none focus:scale-105 transition px-8 py-3 transform shadow-xl inline-flex font-extrabold text-sm sm:text-base"
          to="/missions-benevolat?search=chaleur"
        >
          <span>Je trouve une mission</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card--canicule {
  filter: drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.1));
  img.object-cover {
    transition: all 0.4s ease-in-out;
  }
  @screen sm {
    &:hover {
      img.object-cover {
        transform: scale(1.05);
      }
    }
  }
}

.text-shadow {
  text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25), 0px 4px 30px rgba(0, 0, 0, 0.85);
}
</style>
