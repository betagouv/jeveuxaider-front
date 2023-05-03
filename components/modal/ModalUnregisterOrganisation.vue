<template>
  <portal to="body-end">
    <template v-if="status">
      <template v-if="canUnsubscribe">
        <Modal
          v-scroll-lock="isOpen"
          :is-open="isOpen"
          theme="danger"
          title="Désinscription de mon organisation"
          :prevent-click-outside="true"
          @close="$emit('cancel')"
        >
          <div class="text-gray-700 space-y-4">
            <p>
              Vous êtes sur le point de désinscrire  <span class="text-gray-900 font-semibold">{{ structure.name }}</span> de la plateforme JeVeuxAider.gouv.fr.
            </p>
            <p>
              Vous ne serez plus en mesure de publier de nouvelles missions de bénévolat ni de communiquer avec les bénévoles souhaitant s'investir au sein de votre organisation.
            </p>
            <p>
              Votre organisation sera désinscrite de la plateforme et toutes les missions en cours seront annulées ainsi que toutes participations des bénévoles.
            </p>
            <p>
              Tous les membres de l'organisation seront supprimés.
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
      <template v-else>
        <Modal
          v-scroll-lock="isOpen"
          :is-open="isOpen"
          theme="danger"
          title="Demande de désinscription"
          :prevent-click-outside="true"
          @close="$emit('cancel')"
        >
          <div class="text-gray-700 space-y-4">
            <p>
              Vous êtes sur le point de désinscrire  <span class="text-gray-900 font-semibold">{{ structure.name }}</span> de la plateforme JeVeuxAider.gouv.fr.
            </p>
            <p>
              <template v-if="status.participations_count > 1">
                Cependant, <span class="text-gray-900 font-semibold">{{ status.participations_count }} participations</span> sont reliées à votre organisation.
              </template>
              <template v-else>
                Cependant, <span class="text-gray-900 font-semibold">{{ status.participations_count }} participation</span> est reliée à votre organisation.
              </template>
            </p>
            <p>Un modérateur de JeVeuxAider.gouv.fr va être notifié de <span class="text-gray-900 font-semibold">votre demande de désinscription</span> et vous serez contacté très prochainement.</p>
          </div>

          <template #footer>
            <button class="mr-8 hover:underline" type="transparent" @click="$emit('cancel')">
              Retour
            </button>
            <Button variant="red" @click.native="handleSubmitAskToUnregister">
              Je soumets ma demande
            </Button>
          </template>
        </Modal>
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
    },
    structure: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: {},
      status: null,
      formSchema: object({
        reason: string().nullable().required('La raison est requise')
      })
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: status } = await this.$axios.get(`/structures/${this.structure.id}/status`)
    this.status = status
  },
  computed: {
    canUnsubscribe () {
      if (['admin'].includes(this.$store.getters.contextRole)) {
        return true
      }
      return !(this.status.participations_count > 0)
    }
  },
  methods: {
    async handleSubmitUnregister () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$axios.post(`/structures/${this.structure.id}/unregister`)
        .then(async () => {
          if (!['admin'].includes(this.$store.getters.contextRole)) {
            await this.$store.dispatch('auth/fetchUser')
            this.$router.push('/')
          } else {
            this.$toast.success("L'organisation a été désinscrite !")
            this.$router.push(`/admin/organisations/${this.structure.id}`)
          }
          this.$emit('close')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    async handleSubmitAskToUnregister () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$axios.post(`/structures/${this.structure.id}/ask-to-unregister`)
        .then(() => {
          this.$emit('close')
          this.$toast.success('Une demande de désinscription a été soumise aux modérateurs')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
