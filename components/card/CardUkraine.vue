<template>
  <div class="card--ukraine relative">
    <div class="relative overflow-hidden safari-fix-scale h-full flex flex-col">
      <img
        srcset="/images/card_ukraine.webp, /images/card_ukraine@2x.webp 2x"
        alt="Mobilisons-nous pour l'Ukraine"
        class="w-full object-cover object-center absolute min-h-[398px]"
        width="323"
        height="398"
      />

      <div class="relative mt-auto p-6 sm:p-8 flex flex-col items-center text-center">
        <img
          src="/images/flag-ukraine.svg"
          alt="Drapeau ukrainien"
          width="67"
          height=""
          class="mb-4"
        />

        <h3
          class="text-white font-extrabold text-shadow mb-6 text-2xl leading-tight sm:leading-none sm:text-3xl"
        >
          Mobilisons-nous<br />pour l'Ukraine
        </h3>

        <div
          class="text-white text-shadow font-bold max-w-[272px] text-lg sm:text-xl !leading-tight sm:!leading-[22px] mb-6"
        >
          Des missions sont disponibles partout en France
        </div>

        <a
          class="rounded-full bg-[#FFD500] text-[#070191] hover:scale-105 !outline-none focus:scale-105 transition px-8 py-3 transform shadow-xl inline-flex font-extrabold text-sm sm:text-base"
          href="https://www.jeveuxaider.gouv.fr/engagement/benevolat-ukraine/"
          target="_blank"
        >
          <span>Je trouve une mission</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card--ukraine {
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
