<template>
  <div>
    <div v-if="!canDuplicateMission" v-tooltip="tooltipCantDuplicateMission">
      <DsfrButton
        type="tertiary"
        icon="RiFileCopyLine"
        size="sm"
        icon-class="!mr-1"
        :disabled="true"
      >
        Dupliquer
      </DsfrButton>
    </div>
    <DsfrButton
      v-else
      type="tertiary"
      icon="RiFileCopyLine"
      size="sm"
      icon-class="!mr-1"
      :loading="loading"
      @click.native="showDialog = true"
    >
      Dupliquer
    </DsfrButton>
    <BaseAlertDialog
      theme="warning"
      title="Dupliquer la mission"
      :text="`Vous êtes sur le point de dupliquer la mission <strong>${mission.name}</strong> qui sera enregistrée en « <strong>Brouillon</strong> »`"
      :is-open="showDialog"
      @confirm="handleConfirm()"
      @cancel="showDialog = false"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    missionId: {
      type: Number,
      required: true,
    },
    mission: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      showDialog: false,
    }
  },
  computed: {
    canDuplicateMission() {
      return (
        !!this.mission.structure?.state &&
        !['Brouillon', 'Signalée', 'Désinscrite'].includes(this.mission.structure.state) &&
        this.$stores.auth.user?.profile?.mobile &&
        !this.$stores.auth.user.statistics?.missions_inactive_count
      )
    },
    tooltipCantDuplicateMission() {
      let content
      switch (this.mission.structure?.state) {
        case 'Désinscrite':
          content =
            'Vous ne pouvez pas dupliquer de mission car votre organisation est désinscrite.'
          break
        case 'Signalée':
          content =
            'Vous ne pouvez pas dupliquer de mission tant que votre organisation est signalée.'
          break
        case 'Brouillon':
          content =
            'Votre organisation est incomplète. Complétez les informations de votre organisation afin de pouvoir dupliquer une mission.'
          break
      }

      if (!this.$stores.auth.user?.profile?.mobile) {
        content =
          'Renseignez au préalable votre numéro de mobile dans <a class="active:!bg-transparent" href="/profile/edit">votre profil</a> afin de pouvoir dupliquer une mission'
      }

      if (this.$stores.auth.user.statistics?.missions_inactive_count) {
        content =
          "Vous ne pouvez pas dupliquer la mission car vous avez trop de participations à mettre à jour. Pour toute information, veuillez contacter le support : <a href='mailto:support@jeveuxaider.beta.gouv.fr'>support@jeveuxaider.beta.gouv.fr</a>"
      }

      return {
        content,
        html: true,
        delay: {
          show: 200,
          hide: 2000,
        },
      }
    },
  },
  methods: {
    async handleConfirm() {
      this.loading = true
      await apiFetch(`/missions/${this.missionId}/duplicate`, {
        method: 'POST',
      })
        .then((response) => {
          this.$toast.success('La mission a été dupliquée')
          this.$emit('duplicated', response)
        })
        .catch(() => {})
        .finally(() => {
          this.showDialog = false
          this.loading = false
        })
    },
  },
})
</script>
