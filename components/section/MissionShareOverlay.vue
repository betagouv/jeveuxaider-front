<template>
  <div class="fixed inset-0 w-full h-full z-50">
    <div
      id="share-overlay"
      class="w-full h-full flex flex-col items-center justify-center"
    >
      <div class="flex flex-col w-full h-full px-4">
        <button
          class="p-4 -mr-4 lg:m-0 lg:p-8 cursor-pointer ml-auto lg:absolute lg:right-0"
          @click="onClose"
        >
          <RiCloseFill class="text-white h-10 w-10 fill-current" />
        </button>

        <div
          v-scroll-lock="true"
          class="overflow-y-auto flex-1 flex flex-col lg:justify-center"
        >
          <div class="pb-32 lg:pb-0">
            <div class="text-center text-white text-lg">
              #ChacunPourTous
            </div>

            <div class="title text-center text-white font-bold mb-4">
              Partagez la mission autour de vous
            </div>

            <div class="flex justify-center space-x-3 my-10">
              <ShareFacebook />
              <ShareTwitter :message="message" />
              <ShareLinkedin :message="message" />
              <ShareWhatsApp :message="message" />
              <ShareMail
                :subject="mailSubject"
                :message="message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShareFacebook from '@/components/share/Facebook.vue'
import ShareTwitter from '@/components/share/Twitter.vue'
import ShareLinkedin from '@/components/share/Linkedin.vue'
import ShareWhatsApp from '@/components/share/WhatsApp.vue'
import ShareMail from '@/components/share/Mail.vue'

export default {
  components: {
    ShareFacebook,
    ShareTwitter,
    ShareLinkedin,
    ShareWhatsApp,
    ShareMail
  },
  data () {
    return {
      baseUrl: this.$config.appUrl,
      message:
        "J'ai trouvé ma future mission de bénévolat sur JeVeuxAider.gouv.fr. Rejoignez le mouvement %23ChacunPourTous ",
      buttonClasses:
        'bg-white h-12 w-12 lg:h-24 lg:w-24 rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform'
    }
  },
  computed: {
    mailSubject () {
      return this.$store.state.missionShare.selectedMission ? this.$store.state.missionShare.selectedMission.name : ''
    }
  },
  methods: {
    onClose () {
      this.$store.commit('missionShare/hideOverlay')
      this.$emit('closed')
    }
  }
}
</script>

<style lang="postcss" scoped>
#share-overlay {
  background-color: rgba(25, 22, 130, 0.95);
  .title {
    font-size: 24px;
    @screen lg {
      font-size: 50px;
      letter-spacing: -1px;
    }
  }
}
</style>
