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
      autoplay
    >
      <source src="/video/banner.mp4" type="video/mp4">
    </video>

    <div class="bg-black opacity-50 absolute inset-0 h-full w-full" />

    <div class="relative z-10 h-full">
      <div class="container mx-auto px-4 h-full">
        <div class="flex flex-col justify-center items-center h-full text-shadow text-center">
          <Heading as="div" size="alt-sm" class="mb-4" color="text-white">
            Envie de bénévolat&nbsp;?
          </Heading>

          <Heading as="h1" size="md" class="mb-8" :bold="false" color="text-white">
            <strong> Devenez bénévole </strong>
            <span> et trouvez des missions de bénévolat </span>
            <br class="hidden md:block">
            <strong> près de chez vous </strong>
            <span> ou </span>
            <strong> à distance </strong>
          </Heading>

          <Button size="lg" type="tertiary-no-outline" icon="RiSearchLine" @click="handleClickCTA()">
            Trouver une mission
          </Button>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 p-4 hidden lg:block z-20">
        <button class="rounded-full" @click="videoPausedByUser = !videoPausedByUser">
          <component
            :is="videoIsPaused ? 'RiPlayCircleLine' : 'RiPauseCircleLine'"
            class="text-white fill-current w-6 h-6"
          />
        </button>
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
  data () {
    return {
      videoPausedByViewport: false,
      videoPausedByUser: false
    }
  },
  computed: {
    videoIsPaused () {
      return this.videoPausedByViewport || this.videoPausedByUser
    }
  },
  watch: {
    'inViewport.now' (visible) {
      if (!visible) {
        this.videoPausedByViewport = true
      } else {
        this.videoPausedByViewport = false
      }
    },
    videoIsPaused (newVal) {
      const video = this.$refs.video
      if (!newVal) {
        video.play()
      } else {
        video.pause()
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
