<template>
  <div>
    <div class="text-center mb-6">
      <div class="text-gray-900 font-bold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-4">
        Votre candidature est enregistrée
      </div>
      <div class="text-gray-500 text-lg lg:text-xl max-w-md mx-auto">
        Et si vous invitiez vos proches à participer eux aussi à cette mission ?
      </div>
    </div>
    <div>
      <div class="text-xl font-bold text-center">Partagez la mission autour de vous</div>
      <div class="flex justify-center space-x-3 my-10">
        <ShareFacebook />
        <ShareTwitter :message="message" />
        <ShareLinkedin :message="message" />
        <ShareWhatsApp :message="message" />
        <ShareMail
          v-if="$stores.softGate.selectedMission"
          :subject="$stores.softGate.selectedMission.name"
          :message="message"
        />
      </div>
      <div class="text-center">
        <DsfrLink class="text-jva-blue-500" @click.native="$emit('next')">
          Passer l'étape
        </DsfrLink>
      </div>
    </div>
  </div>
</template>

<script>
import ShareFacebook from '@/components/share/Facebook.vue'
import ShareTwitter from '@/components/share/Twitter.vue'
import ShareLinkedin from '@/components/share/Linkedin.vue'
import ShareMail from '@/components/share/Mail.vue'
import ShareWhatsApp from '@/components/share/WhatsApp.vue'

export default defineNuxtComponent({
  name: 'SoftGateShare',
  components: {
    ShareFacebook,
    ShareTwitter,
    ShareLinkedin,
    ShareMail,
    ShareWhatsApp,
  },
  data() {
    return {
      message:
        "J'ai trouvé ma future mission de bénévolat sur JeVeuxAider.gouv.fr. Rejoignez le mouvement %23ChacunPourTous ",
    }
  },
})
</script>
