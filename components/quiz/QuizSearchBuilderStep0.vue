<template>
  <div class="lg:px-[85px] lg:pt-[80px] h-full flex flex-col">
    <div class="flex-1 px-[32px] pt-[32px] lg:px-0 lg:pt-0">
      <div class="text-lg lg:text-xl text-[#ED7A5A] font-bold uppercase mb-4">
        Le bénévolat et vous
      </div>
      <div class="text-[32px] lg:text-[56px] text-black font-bold mb-12 leading-tight">
        Trouvez en quelques clics votre prochaine mission de bénévolat
      </div>
      <div class="flex flex-col lg:flex-row lg:items-center gap-8">
        <Button
          size="lg"
          icon="RiArrowRightLine"
          icon-position="right"
          @click.native="$store.commit('quiz/nextStep')"
        >
          Suivez le guide
        </Button>
        <div class="text-[#666666] text-xl">
          Plus de <span class="font-bold">15 000 missions disponibles</span>
        </div>
      </div>
    </div>
    <picture aria-hidden="true" class="mt-12">
      <source
        srcset="
          /images/home/trombi-organisations.webp, /images/home/trombi-organisations@2x.webp 2x,
          /images/home/trombi-organisations.png, /images/home/trombi-organisations@2x.png 2x
        "
        media="(max-width: 640px)"
      >
      <source
        srcset="
          /images/home/trombi-organisations-desktop.webp, /images/home/trombi-organisations-desktop@2x.webp 2x,
          /images/home/trombi-organisations-desktop.png, /images/home/trombi-organisations-desktop@2x.png 2x
        "
        media="(min-width: 640px)"
      >
      <img
        src="/images/home/trombi-organisations.png"
        alt=""
        width="425"
        height="188"
        class="object-cover object-top w-full h-[170px] sm:h-[240px] sm:px-8 md:px-0 max-w-none md:w-[500px] lg:w-[650px] xl:w-[738px] xl:h-[292px]"
      >
    </picture>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {

  },
  mounted () {
    // console.log('route', this.$route)
  }
}
</script>

<style>

</style>
