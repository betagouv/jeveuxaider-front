<template>
  <div>
    <div
      v-if="!canCreateMission"
      v-tooltip="tooltipCantCreateMission"
    >
      <Button
        icon="RiAddLine"
        :size="size"
        :disabled="true"
      >
        Publier une mission
      </Button>
    </div>
    <Button
      v-else
      icon="RiAddLine"
      :size="size"
      tabindex="-1"
      @click.native="handleClick"
    >
      Publier une mission
    </Button>
    <Modal
      v-scroll-lock="showModalFirstMission"
      :is-open="showModalFirstMission"
      title="C’est votre première mission ! 🍾"
      width-class="sm:max-w-3xl"
      :prevent-click-outside="true"
      icon="RiErrorWarningFill"
      @close="showModalFirstMission = false"
    >
      <div class="text-gray-700 space-y-4">
        <p>
          Un grand pouvoir implique de grandes responsabilités. En publiant cette annonce vous vous engagez à :
        </p>
        <ul class="list-disc pl-8">
          <li>répondre aux demandes de participations dans un <span class="text-gray-900 font-semibold">délai maximum d’1 semaine</span></li>
          <li>valider ou refuser les participations dans un <span class="text-gray-900 font-semibold">délai de 2 mois</span></li>
        </ul>
        <p>
          Au-delà, les bénévoles risquent de se désengager.
        </p>
        <p>Devenez incollable sur la modération en consultant la <a class="text-jva-blue-500 underline" target="_blank" href="https://reserve-civique.crisp.help/fr/article/comment-gerer-les-participations-des-benevoles-1sizkcs/?bust=1682607862363">foire aux questions</a>.</p>
      </div>
      <template #footer>
        <button class="mr-8 hover:underline" type="transparent" @click="showModalFirstMission = false">
          Retour
        </button>
        <nuxt-link
          :to="`/admin/organisations/${$store.getters.currentRole.contextable_id}/missions/add`"
        >
          <Button>
            J’ai compris
          </Button>
        </nuxt-link>
      </template>
    </Modal>
    <Modal
      v-scroll-lock="showModalHasParticipationsWaiting"
      :is-open="showModalHasParticipationsWaiting"
      title="Vous avez des participations non traitées sur d’autres missions"
      width-class="sm:max-w-3xl"
      :prevent-click-outside="true"
      icon="RiErrorWarningFill"
      @close="showModalHasParticipationsWaiting = false"
    >
      <div class="text-gray-700 space-y-4">
        <p>
          Nous vous recommandons de <span class="text-gray-900 font-semibold">mettre à jour les participations en cours</span> avant de créer une nouvelle mission.
        </p>
        <p>
          En effet, en créant des mission sur JeVeuxAider.gouv.fr, vous vous engagez à mettre à jour toutes les participations (valider ou refuser), sans quoi les bénévoles <span class="text-gray-900 font-semibold">risquent de se désengager</span>, et votre utilisation de la plateforme pourrait être restreinte (moins bon référencement des missions, dépublication des missions, etc)
        </p>
        <p>Devenez incollable sur la modération en consultant la <a class="text-jva-blue-500 underline" target="_blank" href="https://reserve-civique.crisp.help/fr/article/comment-gerer-les-participations-des-benevoles-1sizkcs/?bust=1682607862363">foire aux questions</a>.</p>
      </div>
      <template #footer>
        <button class="mr-8 hover:underline" type="transparent" @click="showModalHasParticipationsWaiting = false">
          Retour
        </button>
        <nuxt-link
          :to="`/admin/organisations/${$store.getters.currentRole.contextable_id}/missions/add`"
        >
          <Button>
            J’ai compris
          </Button>
        </nuxt-link>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    size: {
      type: String,
      default: 'lg'
    }
  },
  data () {
    return {
      structure: null,
      showModalFirstMission: false,
      showModalHasParticipationsWaiting: false
    }
  },
  async fetch () {
    const { data: structure } = await this.$axios.get(`/structures/${this.$store.state.auth.user.contextable_id}`)
    this.structure = structure
  },
  computed: {
    canCreateMission () {
      return !!this.structure?.state && !['Brouillon', 'Signalée', 'Désinscrite'].includes(this.structure.state) &&
        this.$store.state.auth.user?.profile?.mobile && !this.$store.state.auth.user.statistics?.missions_inactive_count
    },
    tooltipCantCreateMission () {
      let content
      switch (this.structure?.state) {
        case 'Désinscrite':
          content = 'Vous ne pouvez pas créer de mission car votre organisation est désinscrite.'
          break
        case 'Signalée':
          content = 'Vous ne pouvez pas créer de mission tant que votre organisation est signalée.'
          break
        case 'Brouillon':
          content = 'Votre organisation est incomplète. Complétez les informations de votre organisation afin de pouvoir publier une mission.'
          break
      }

      if (!this.$store.state.auth.user?.profile?.mobile) {
        content = 'Renseignez au préalable votre numéro de mobile dans <a class="active:!bg-transparent" href="/profile/edit">votre profil</a> afin de pouvoir publier une mission'
      }

      if (this.$store.state.auth.user.statistics?.missions_inactive_count) {
        content = 'Vous ne pouvez pas créer de nouvelles missions car vous avez trop de participations à mettre à jour. Pour toute information, veuillez contacter le support à l’adresse suivante : <a href=\'mailto:support@jeveuxaider.beta.gouv.fr\'>support@jeveuxaider.beta.gouv.fr</a>'
      }

      return {
        content,
        hideOnTargetClick: true,
        classes: 'theme-dsfr formatted-text',
        html: true,
        delay: {
          show: 200,
          hide: 2000
        }
      }
    },
    isFirstMission () {
      return this.$store.state.auth.user.statistics?.missions_as_responsable_count === 0
    },
    hasParticipationsWaiting () {
      return this.$store.state.auth.user.statistics?.missions_as_responsable_with_participations_waiting_count > 0
    }
  },
  methods: {
    handleClick () {
      if (this.isFirstMission) {
        this.showModalFirstMission = true
      } else if (this.hasParticipationsWaiting) {
        this.showModalHasParticipationsWaiting = true
      } else {
        this.$router.push(`/admin/organisations/${this.$store.getters.currentRole.contextable_id}/missions/add`)
      }
    }
  }
}
</script>
