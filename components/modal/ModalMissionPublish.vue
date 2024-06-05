<template>
  <BaseAlertDialog
    icon="RiShieldCheckLine"
    :title="title"
    :is-open="$stores.formMission.showPublishModal"
    @confirm="onPublishConfirm"
    @cancel="$stores.formMission.showPublishModal = false"
    :button-loading="loading"
  >
    <template v-if="mission.structure.state !== 'Validée'">
      <p class="mb-4">
        Vous êtes sur le point de publier la mission <strong> {{ mission.name }}</strong
        >.
      </p>
    </template>
    <template v-if="mission.template_id">
      <p class="mb-4">
        Vous êtes sur le point de publier la mission <strong> {{ mission.name }}</strong
        >.
      </p>
      <p v-if="mission.structure.state !== 'Validée'">
        Votre organisation devra être préalablement validée pour que la mission soit accessible.
      </p>
    </template>
    <template v-else>
      <p class="mb-4">
        Vous êtes sur le point de demander la publication de la mission
        <strong> {{ mission.name }}</strong
        >.
      </p>
      <p>La validation prend en moyenne 7 à 10 jours.</p>
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
