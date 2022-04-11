<template>
  <div>
    <div class="text-center">
      <div
        class="text-2xl sm:text-[38px] sm:leading-tight font-bold text-jva-blue-500 tracking-[-1px]"
      >
        <template v-if="initialForm.grade > 3">
          <h1 v-if="initialForm.grade > 3">
            <span class="font-extrabold">{{ benevole.first_name }}</span>, merci d’avoir partagé votre expérience !
          </h1>

          <div class="font-medium text-md sm:text-xl text-[#808080] mt-4">
            Partagez votre expérience chez
            <strong>{{ organization.name }}</strong> sur vos réseaux
          </div>

          <div class="flex justify-center space-x-5 mt-4">
            <ShareFacebook :url="mission.full_url" />
            <ShareTwitter :url="mission.full_url" :message="message" />
            <ShareLinkedin :url="mission.full_url" :message="message" />
          </div>
        </template>

        <template v-else>
          <div>Merci pour votre retour.</div>

          <div
            class="font-medium text-md sm:text-xl text-[#808080] max-w-[745px] mt-4"
          >
            La mission n’a malheureusement pas été à la hauteur de votre
            engagement. {{ structureType }} {{ structure.name }} et l’équipe de
            JVA vont tout mettre en oeuvre pour améliorer l’expérience durant
            cette mission.
          </div>
        </template>

        <div class="py-8">
          <div class="font-medium text-md sm:text-xl text-[#808080] mb-4">
            Trouvez dès maintenant votre prochaine mission
          </div>

          <Button
            id="search"
            size="xl"
            rounded
            variant="green"
            @click="$store.commit('toggleSearchOverlay')"
          >
            Trouver une mission
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShareFacebook from '@/components/share/Facebook.vue'
import ShareTwitter from '@/components/share/Twitter.vue'
import ShareLinkedin from '@/components/share/Linkedin.vue'

export default {
  components: {
    ShareFacebook,
    ShareTwitter,
    ShareLinkedin
  },
  props: {
    benevole: {
      type: Object,
      required: true
    },
    mission: {
      type: Object,
      required: true
    },
    initialForm: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {},
      message:
        "J'ai réalisé une mission de bénévolat grâce à #JeVeuxAider. Rejoignez le mouvement #ChacunPourTous"
    }
  },
  computed: {
    organization () {
      return this.mission.structure
    },
    structure () {
      return this.mission.structure
    },
    structureType () {
      let status = this.$options.filters
        .label(
          this.structure.statut_juridique,
          'structure_legal_status'
        )
        .toLowerCase()
      if (status == 'autre') {
        status = 'organisation'
      }
      return status.match('^[aieouAIEOU].*') ? `L'${status}` : `La ${status}`
    }
  }
}
</script>
