<template>
  <div class="overflow-hidden">
    <div class="container relative">
      <div class="">
        <div class="md:max-w-[50%] py-8 lg:py-28">
          <h2 class="text-3xl sm:text-5xl lg:text-[60px] sm:!leading-[1.1] tracking-tighter">
            <span class="relative">
              <img
                src="/images/home/sparkle-left.svg"
                alt=""
                aria-hidden="true"
                class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-12px] left-[-22px] lg:top-[-25px] lg:left-[-47px] pointer-events-none"
              />
              <span class="font-bold text-jva-blue-500">
                Rejoignez<br />
                le mouvement</span
              >
              <img
                src="@/assets/images/jeveuxaider-logo.svg"
                alt=""
                class="h-[41px] w-[256px] sm:h-[71px] sm:w-[464px] sm:-ml-[16px] sm:mt-2"
                width="464"
                height="71"
                data-not-lazy
              />
            </span>
          </h2>
          <p class="text-2xl lg:text-[28px] text-[#3A3A3A] mt-10 leading-10">
            Déjà plus de <span class="font-bold">460 000 inscrits </span>sur la
            <span class="font-bold">plateforme publique du bénévolat.</span>
          </p>
          <DsfrButton size="lg" class="mt-10" @click="$router.push('/')">
            Découvrir JeVeuxAider.gouv.fr
          </DsfrButton>
        </div>

        <picture
          aria-hidden="true"
          class="md:absolute md:top-[35px] md:left-[700px] md:w-[890px] md:h-auto"
        >
          <source
            srcset="
              /images/home/trombi-organisations.webp,
              /images/home/trombi-organisations@2x.webp 2x,
              /images/home/trombi-organisations.png,
              /images/home/trombi-organisations@2x.png  2x
            "
            media="(max-width: 1024px)"
          />
          <source
            srcset="
              /images/home/trombi-organisations-desktop.webp,
              /images/home/trombi-organisations-desktop@2x.webp 2x,
              /images/home/trombi-organisations-desktop.png,
              /images/home/trombi-organisations-desktop@2x.png  2x
            "
          />
          <img src="/images/home/trombi-organisations.png" alt="" width="890" height="720" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({})
</script>
