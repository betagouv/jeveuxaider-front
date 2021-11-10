<template>
  <section class="relative h-[590px] shadow-xl">
    <picture class="lg:hidden">
      <source
        srcset="
          /images/banner.webp,
          /images/banner@2x.webp 2x,
          /images/banner.jpg,
          /images/banner@2x.jpg  2x
        "
        media="(min-width: 440px)"
      >

      <img
        srcset="
          /images/banner_mobile.webp,
          /images/banner_mobile@2x.webp 2x,
          /images/banner_mobile.jpg,
          /images/banner_mobile@2x.jpg  2x
        "
        alt="Récolte de nourriture et de vêtement"
        class="object-cover absolute w-full h-full"
        width="440"
        height="584"
        data-not-lazy
      >
    </picture>

    <video
      ref="video"
      autoplay
      loop
      muted
      class="object-cover absolute w-full h-full hidden lg:block"
    >
      <source src="/video/banner.mp4" type="video/mp4">
    </video>

    <div class="bg-black opacity-50 absolute inset-0 h-full w-full" />

    <div class="relative z-10 h-full">
      <div
        class="container xl:max-w-[1412px] mx-auto px-4 text-center text-white h-full"
      >
        <div
          class="flex flex-col justify-center items-center h-full text-shadow"
        >
          <div
            class="text-[50px] leading-none lg:text-7xl font-extrabold mb-4 tracking-tighter"
          >
            Envie de bénévolat&nbsp;?
          </div>

          <h1 class="text-2xl lg:text-[28px] lg:leading-[34px] mb-8">
            <strong>Devenez bénévole</strong>
            <span>et trouvez des missions de bénévolat</span>
            <br class="hidden md:block">
            <strong>près de chez vous</strong>
            <span>ou</span>
            <strong>à distance</strong>
          </h1>

          <button
            class="flex items-center justify-center rounded-full text-white bg-jva-green-500 hover:scale-105 !outline-none focus:scale-105 transition px-8 py-4 transform will-change-transform shadow-xl font-bold text-xl"
            @click="handleClickCTA()"
          >
            <SearchSvg width="16" height="16" class="flex-none" />
            <span class="ml-2">Trouver une mission</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import inViewport from 'vue-in-viewport-mixin'
import SearchSvg from '@/static/images/search.svg?inline'

export default {
  components: {
    SearchSvg
  },
  mixins: [inViewport],
  watch: {
    'inViewport.now' (visible) {
      if (!visible) {
        this.$refs?.video?.pause()
      } else {
        this.$refs?.video?.play()
      }
    }
  },
  methods: {
    handleClickCTA () {
      window.plausible &&
        window.plausible('Click CTA - Homepage', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$store.commit('toggleSearchOverlay')
    }
  }
}
</script>

<style lang="postcss" scoped>

.text-shadow {
  text-shadow: 0px 4px 14px rgb(0 0 0 / 25%), 0px 4px 30px rgb(0 0 0 / 85%);
}

</style>
