<template>
  <div>
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Votre candidature est enregistrée
      </div>
      <div
        class="text-gray-500 font-semibold text-lg lg:text-xl max-w-md mx-auto"
      >
        Et si vous invitiez vos proches à participer eux aussi à cette mission ?
      </div>
    </div>
    <div class="">
      <div class="text-xl font-semibold text-center">
        Partagez la mission autour de vous
      </div>
      <div class="flex justify-center space-x-3 my-10">
        <ShareFacebook />
        <ShareTwitter :message="message" />
        <ShareLinkedin :message="message" />
        <ShareMail
          v-if="$store.state.softGate.selectedMission"
          :subject="$store.state.softGate.selectedMission.name"
          :message="message"
        />
      </div>
      <Button full size="xl" rounded variant="white" @click.native="$emit('next')">
        Passer
      </Button>
    </div>
  </div>
</template>

<script>
import ShareFacebook from '@/components/share/Facebook.vue'
import ShareTwitter from '@/components/share/Twitter.vue'
import ShareLinkedin from '@/components/share/Linkedin.vue'
import ShareMail from '@/components/share/Mail.vue'

export default {
  name: 'SoftGateShare',
  components: {
    ShareFacebook,
    ShareTwitter,
    ShareLinkedin,
    ShareMail
  },
  data () {
    return {
      message:
        "J'ai trouvé ma future mission de bénévolat sur JeVeuxAider. Rejoignez le mouvement %23ChacunPourTous ",
      baseUrl: this.$config.appUrl
    }
  },
  methods: {

  }
}
</script>
