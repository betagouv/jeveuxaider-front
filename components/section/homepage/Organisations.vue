<template>
  <section class="relative overflow-hidden md:h-[525px] md:flex items-center">
    <img
      src="/images/homepage/deco_1.svg"
      alt=""
      class="deco--1 absolute hidden xl:block pointer-events-none"
      data-not-lazy
    />

    <div class="md:container md:mx-auto">
      <div class="mx-auto max-w-6xl">
        <img
          srcset="
            /images/homepage/mosaique_orgas.webp,
            /images/homepage/mosaique_orgas.png,
            /images/homepage/mosaique_orgas@2x.webp 2x,
            /images/homepage/mosaique_orgas@2x.png  2x
          "
          src="/images/homepage/mosaique_orgas.png"
          alt=""
          class="sm:hidden object-cover object-left-bottom w-full h-[370px] translate-y-[-25px] mosaic"
          width="440"
          height="371"
        />

        <img
          srcset="
            /images/homepage/mosaique_orgas_desktop.webp,
            /images/homepage/mosaique_orgas_desktop@2x.webp 2x,
            /images/homepage/mosaique_orgas_desktop.png,
            /images/homepage/mosaique_orgas_desktop@2x.png  2x
          "
          src="/images/homepage/mosaique_orgas_desktop.png"
          alt=""
          class="hidden sm:block object-cover object-left-bottom w-full h-[370px] md:h-[650px] md:translate-y-[-138px] md:absolute md:right-0 md:top-0 mosaic"
          width="790"
          height="670"
        />

        <div class="max-w-[440px] mx-auto md:ml-0 px-4 lg:px-0 text-center md:text-left">
          <DsfrHeading as="h2" size="alt-xs" class="mb-6"> Chacun pour tous </DsfrHeading>
          <p class="text-[#696974] text-xl mb-6">
            Plus de 10 000 missions de bénévolat sont disponibles chez les petits et grands acteurs
            de l'engagement.
          </p>
          <DsfrLink to="/organisations" icon-position="right" class="text-lg text-jva-blue-500">
            Consulter toutes les organisations ›
          </DsfrLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.mosaic {
  @screen md {
    width: calc(50% - 10px);
  }

  @screen lg {
    width: calc(50% + 50px);
  }
}

.text-shadow {
  text-shadow: 0px 4px 14px rgb(0 0 0 / 25%), 0px 4px 30px rgb(0 0 0 / 85%);
}

.deco--1 {
  left: calc(50% - 727px);
  top: -6px;
}
</style>
