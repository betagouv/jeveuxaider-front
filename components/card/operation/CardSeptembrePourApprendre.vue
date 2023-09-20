<template>
  <a
    class="card--septembre relative group"
    href="https://www.jeveuxaider.gouv.fr/engagement/septembre-pour-apprendre/"
    target="_blank"
  >
    <div
      class="relative overflow-hidden safari-fix-scale h-full flex flex-col"
    >
      <img
        srcset="/images/operations/septembre_pour_apprendre.webp, /images/operations/septembre_pour_apprendre@2x.webp 2x"
        alt="Mobilisons-nous avec Septembre pour apprendre"
        class="w-full object-cover object-center absolute min-h-[398px] h-full"
        width="323"
        height="398"
      >

      <div
        class="relative mt-auto p-6 sm:p-8 flex flex-col items-center text-center"
      >
        <div class="text-[48px]">
          📚
        </div>

        <h3
          class="text-white font-bold text-shadow mb-6 leading-none text-3xl"
        >
          Septembre pour apprendre
        </h3>

        <div
          class="text-white text-shadow max-w-[272px] text-xl leading-tight mb-6"
        >
          Des missions sont disponibles partout en France
        </div>

        <div
          class="text-white"
        >
          <span>Je trouve une mission</span>
          <RiArrowRightLine class="fill-current inline w-4 h-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="postcss" scoped>
.card--septembre {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);
  img.object-cover {
    transition: all 0.25s ease-in-out;
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
  text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25),
    0px 4px 30px rgba(0, 0, 0, 0.85);
}
</style>
