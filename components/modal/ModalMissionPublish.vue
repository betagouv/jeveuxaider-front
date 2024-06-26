<template>
  <BaseAlertDialog
    icon="RiSendPlaneFill"
    :title="title"
    :is-open="$stores.formMission.showPublishModal"
    cancel-label="Laisser en brouillon"
    @confirm="onPublishConfirm"
    @cancel="$stores.formMission.showPublishModal = false"
    :button-loading="loading"
  >
    <template v-if="mission.structure.state !== 'Validée' && mission.template_id">
      <p class="mb-4">
        Votre organisation n’étant pas encore validée, votre mission ne sera pas visible. Dès la
        validation de votre organisation, votre mission sera publiée automatiquement.
      </p>
      <p>Vous pourrez toujours modifier les informations de la mission après publication.</p>
    </template>
    <template v-else-if="mission.template_id">
      <p class="mb-4">
        Votre mission sera publiée et vous pourrez recevoir des messages de bénévoles dès à présent
        !
      </p>
      <p>Vous pourrez toujours modifier les informations de la mission après publication.</p>
    </template>
    <template v-else>
      <p class="mb-4">
        Votre mission va être examinée par un référent territorial.
        <strong>Les délais sont de 7 à 10 jours ouvrés. Vous serez informé par la suite.</strong>
      </p>
      <p>
        Si votre mission est validée, elle sera automatiquement publiée et visible des bénévoles.
      </p>
    </template>
  </BaseAlertDialog>
</template>

<script>
import confetti from 'canvas-confetti'

export default defineNuxtComponent({
  components: {},
  data() {
    return {
      loading: false,
    }
  },
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      if (this.mission.structure.state !== 'Validée') {
        return 'Soumettre à validation'
      }
      return this.mission.template_id ? 'Publier la mission' : 'Soumettre à validation'
    },
  },
  methods: {
    async onPublishConfirm() {
      this.loading = true
      await apiFetch(`/missions/${this.mission.id}/publish`, {
        method: 'PUT',
      })
        .then(async (mission) => {
          this.triggerConfettis()
          this.$stores.formMission.updateFields(mission, ['state', 'is_online'])
          this.$stores.formMission.showPublishModal = false
          this.$router.push(`/admin/missions`)
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    triggerConfettis() {
      confetti({
        particleCount: 500,
        spread: 360,
        // origin: { y: 0.6 },
      })
    },
  },
})
</script>
