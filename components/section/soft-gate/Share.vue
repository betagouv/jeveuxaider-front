<template>
  <div>
    <div class="text-center mb-8">
      <template v-if="emails.length > 1">
        <div class="text-[48px]">💌</div>
        <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
          Les invitations sont envoyées
        </DsfrHeading>
        <div class="text-cool-gray-500 lg:text-lg max-w-md mx-auto">
          <span class="font-bold">{{ emails.slice(0, -1).join(', ') }}</span> et
          <span class="font-bold">{{ emails.slice(-1)[0] }}</span>
          vont bientôt recevoir un email
        </div>
      </template>
      <template v-else-if="emails.length === 1">
        <div class="text-[48px]">💌</div>
        <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
          L’invitation est envoyée
        </DsfrHeading>
        <div class="text-cool-gray-500 lg:text-lg max-w-md mx-auto">
          <span class="font-bold">{{ emails[0] }}</span> va bientôt recevoir un email
        </div>
      </template>
      <template v-else>
        <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
          Vous pouvez aussi partager la mission sur vos réseaux
        </DsfrHeading>
      </template>
    </div>

    <div>
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
  props: {
    emails: {
      type: Array,
      default: () => [],
    },
  },
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
