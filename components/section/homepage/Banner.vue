<template>
  <section class="relative h-[590px] shadow-xl">
    <picture class="lg:hidden">
      <source
        srcset="
          /images/homepage/banner.webp,
          /images/homepage/banner@2x.webp 2x,
          /images/homepage/banner.jpg,
          /images/homepage/banner@2x.jpg  2x
        "
        media="(min-width: 440px)"
      >

      <img
        srcset="
          /images/homepage/banner_mobile.webp,
          /images/homepage/banner_mobile@2x.webp 2x,
          /images/homepage/banner_mobile.jpg,
          /images/homepage/banner_mobile@2x.jpg  2x
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
      loop
      muted
      class="object-cover absolute w-full h-full hidden lg:block"
    >
      <source src="/video/banner.mp4" type="video/mp4">
    </video>

    <div class="bg-black opacity-50 absolute inset-0 h-full w-full" />

    <div class="relative z-10 h-full">
      <div
        class="container mx-auto px-4 h-full"
      >
        <div
          class="flex flex-col justify-center items-start h-full "
        >
          <div class="bg-white px-9 py-7 lg:px-[72px] lg:py-14">
            <Heading as="div" size="alt-sm" class="mb-4">
              Envie de bénévolat&nbsp;?
            </Heading>

            <Heading as="h1" size="md" class="mb-8" :bold="false" light-color="text-[#666666]">
              <strong>Devenez bénévole</strong>
              <span>et trouvez des missions de bénévolat</span>
              <br class="hidden md:block">
              <strong>près de chez vous</strong>
              <span>ou</span>
              <strong>à distance</strong>
            </Heading>

            <Button size="lg" icon="RiSearchLine" @click="handleClickCTA()">
              Trouver une mission
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import inViewport from 'vue-in-viewport-mixin'
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Heading,
    Button
  },
  mixins: [inViewport],
  watch: {
    'inViewport.now' (visible) {
      const video = this.$refs.video
      const isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA
      if (!visible && isPlaying) {
        video.pause()
      } else {
        const playPromise = video.play()
        if (playPromise !== null) {
          playPromise.catch(() => { /* discard runtime error */ })
        }
      }
    }
  },
  methods: {
    handleClickCTA () {
      window.plausible &&
        window.plausible('Click CTA - Homepage', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/missions-benevolat')
    }
  }
}
</script>

<style lang="postcss" scoped>

.text-shadow {
  text-shadow: 0px 4px 14px rgb(0 0 0 / 25%), 0px 4px 30px rgb(0 0 0 / 85%);
}

</style>
