<template>
  <portal to="body-end">
    <template v-if="overview">
      <!-- RESPONSABLE -->
      <template v-if="overview.structure">
        <template v-if="canUnregisterStructure">
          <!-- CASE 4 - ON GERE UNE STRUCTURE ET ON BASCULE NOTRE PERIMETRE DACTION A UN COLLEGUE -->
          <template v-if="needToSelectNewResponsable">
            <Modal
              v-scroll-lock="isOpen"
              :is-open="isOpen"
              theme="danger"
              title="Désinscription de mon organisation"
              :prevent-click-outside="true"
              @close="$emit('cancel')"
            >
              <div class="text-sm text-gray-500 space-y-4">
                <p>
                  Vous êtes responsable de XX missions dans l'organisation  <span class="text-gray-900 font-semibold">{{ overview.structure.name }}</span>.
                </p>
                <p>
                  Merci de choisir le responsable qui va récupérer la gestion de vos missions et des participations.
                </p>
                <p>
                  FORMULAIRE RESPONSABLE ID
                </p>
              </div>

              <template #footer>
                <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
                  Retour
                </Button>
                <Button variant="red" @click.native="handleSubmitUnregisterWithSwitchReponsable">
                  Désinscrire mon organisation
                </Button>
              </template>
            </Modal>
          </template>
          <!-- CAS 2 - ON GERE UNE STRUCTURE SANS MISSIONS OU PARTICIPATIONS -->
          <template v-else>
            <Modal
              v-scroll-lock="isOpen"
              :is-open="isOpen"
              theme="danger"
              title="Désinscription de mon organisation"
              :prevent-click-outside="true"
              @close="$emit('cancel')"
            >
              <div class="text-sm text-gray-500 space-y-4">
                <p>
                  Vous êtes sur le point de désinscrire  <span class="text-gray-900 font-semibold">{{ overview.structure.name }}</span> de la plateforme JeVeuxAider.gouv.fr.
                </p>
                <p>
                  Vous ne serez plus en mesure de publier de nouvelles missions de bénévolat ni de communiquer avec les bénévoles souhaitant s'investir au sein de votre organisation.
                </p>
                <p>
                  Votre organisation sera désinscrite de la plateforme et toutes les missions en cours seront annulées ainsi que toutes participations des bénévoles.
                </p>
                <p>
                  Si vous souhaitez ajouter un co-gestionnaire du compte de votre organisation avant de vous désinscrire, <a class="text-gray-900 font-semibold underline" href="https://reserve-civique.crisp.help/fr/article/comment-inviter-un-nouveau-gestionnaire-de-compte-responsable-1wm288q/" target="_blank"> c'est ici</a>.
                </p>
              </div>

              <template #footer>
                <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
                  Retour
                </Button>
                <Button variant="red" @click.native="handleSubmitUnregister">
                  Désinscrire mon organisation
                </Button>
              </template>
            </Modal>
          </template>
        </template>
        <!-- CAS 3 - ON GERE UNE STRUCTURE AVEC MISSIONS ET PARTICIPATIONS ET ON EST LE SEUL RESPONSABLE -->
        <template v-else>
          <Modal
            v-scroll-lock="isOpen"
            :is-open="isOpen"
            theme="danger"
            title="Demande de désinscription"
            :prevent-click-outside="true"
            @close="$emit('cancel')"
          >
            <div class="text-sm text-gray-500 space-y-4">
              <p>
                Vous êtes sur le point de désinscrire  <span class="text-gray-900 font-semibold">{{ overview.structure.name }}</span> de la plateforme JeVeuxAider.gouv.fr.
              </p>
              <p>
                <template v-if="overview.structure_participations_i_m_responsable_count > 1">
                  Vous êtes, <span class="text-gray-900 font-semibold">{{ overview.structure_participations_i_m_responsable_count }} participations</span> sont reliées à votre organisation.
                </template>
                <template v-else>
                  Cependant, <span class="text-gray-900 font-semibold">{{ overview.structure_participations_i_m_responsable_count }} participation</span> est reliée à votre organisation.
                </template>
              </p>
              <p>Un modérateur de JeVeuxAider.gouv.fr va être notifié de <span class="text-gray-900 font-semibold">votre demande de désinscription</span> et vous serez contacté très prochainement.</p>
            </div>

            <template #footer>
              <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
                Retour
              </Button>
              <Button variant="red" @click.native="handleSubmitAskUnregister">
                Je soumets ma demande
              </Button>
            </template>
          </Modal>
        </template>
      </template>
      <!-- CAS 1 - PAS DE PROBLEME A SE DESINSCRIRE -->
      <template v-else>
        <AlertDialog
          theme="danger"
          title="Supprimer mon compte"
          text="Attention, cette action est irréversible et toutes vos données de la plateforme JeVeuxAider.gouv.fr seront anonymisées."
          :is-open="showAlert"
          @confirm="handleConfirmDeleteUser()"
          @cancel="showAlert = false"
        />
      </template>
    </template>
  </portal>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      overview: null,
      form: {},
      formSchema: object({
        responsable_id: string().nullable().required('Un responsable est requis')
      })
    }
  },
  async fetch () {
    const { data: overview } = await this.$axios.get('/user/overview')
    this.overview = overview
  },
  computed: {
    canUnregisterStructure () {
      return !(this.overview.structure_missions_where_i_m_responsable_count > 0)
    },
    needToSelectNewResponsable () {
      return !(this.overview.structure_participations_i_m_responsable_count > 0)
    }
  },
  methods: {
    // CAS 1 - PAS DE PROBLEME A SE DESINSCRIRE
    async handleConfirmDeleteUser () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$axios.post('/user/anonymize').catch(() => {})
      this.$store.dispatch('auth/logout')
      this.loading = false
    },
    // CAS 2 - ON GERE UNE STRUCTURE SANS MISSIONS OU PARTICIPATIONS
    async handleSubmitUnregister () {
      if (this.loading) {
        return
      }
      this.loading = true
      console.log('handleSubmitUnregister')
      await this.$axios.post(`/structures/${this.structure.id}/unregister`).catch(() => {})
      await this.$store.dispatch('auth/fetchUser')
      this.loading = false
      this.$router.push('/')
    },
    // CAS 3 - ON GERE UNE STRUCTURE AVEC MISSIONS ET PARTICIPATIONS ET ON EST LE SEUL RESPONSABLE
    async handleSubmitAskUnregister () {
      if (this.loading) {
        return
      }
      this.loading = true
      console.log('handleSubmitAskUnregister')
      await this.$axios.post(`/structures/${this.structure.id}/ask-unregister`).catch(() => {})
      this.loading = false

      this.$emit('close')
      this.$toast.warning('Une demande de désinscription a été soumise aux modérateurs')
    },
    // CASE 4 - ON GERE UNE STRUCTURE ET ON BASCULE NOTRE PERIMETRE DACTION A UN COLLEGUE
    handleSubmitUnregisterWithSwitchReponsable () {
      if (this.loading) {
        return
      }
      this.loading = true
      console.log('handleSubmitUnregisterWithSwitchReponsable')
      // await this.$axios.post(`/structures/${this.structure.id}/unregister`).catch(() => {})
      // if (!['admin'].includes(this.$store.getters.contextRole)) {
      //   await this.$store.dispatch('auth/fetchUser')
      //   this.$router.push('/')
      // }
      this.loading = false
    }
  }
}
</script>
