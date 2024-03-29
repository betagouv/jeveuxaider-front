<template>
  <div>
    <BaseSelectWithDescription
      v-if="statesAvailable.length"
      :options="statesAvailable"
      :modelValue="mission.state"
      @selected="handleSelect($event)"
    />

    <ModalMissionValidate
      :mission="mission"
      :is-open="showModalValidate"
      @cancel="showModalValidate = false"
      @confirm="handleConfirmDialog()"
    />
    <ModalMissionReport
      :mission="mission"
      :is-open="showModalReport"
      @cancel="showModalReport = false"
      @confirm="handleConfirmDialog()"
    />
    <BaseAlertDialog
      icon="RiErrorWarningLine"
      title="Changement de statut"
      :is-open="showAlert"
      :prevent-click-outside="true"
      @confirm="handleConfirmDialog()"
      @cancel="showAlert = false"
    >
      <template v-if="selected">
        <template v-if="selected.key === 'En attente de validation'">
          <p>Une demande de publication va être envoyée aux référents de la plateforme.</p>
        </template>
        <template v-else-if="selected.key === 'En cours de traitement'">
          <p>
            Vous êtes sur le point de passer la mission au statut <b>en cours de traitement</b>.
          </p>
        </template>
        <template v-else-if="selected.key === 'Terminée'">
          <p>Vous êtes sur le point de passer la mission au statut <b>terminée</b>.</p>
          <p>
            Les participations <b>en attente de validation</b> et
            <b>en cours de traitement</b> seront automatiquement déclinées.
          </p>
          <p v-if="missionStats?.participations_state['Validée']" class="mt-4">
            Une invitation va être envoyée aux participations
            <b>validées ({{ this.missionStats.participations_state['Validée'] }})</b> invitant les
            bénévoles à raconter leur expérience.
          </p>
        </template>
        <template v-else-if="selected.key === 'Annulée'">
          <template v-if="this.missionStats.participations_total === 0">
            <p>Vous êtes sur le point de passer la mission au statut <b>annulée</b>.</p>
          </template>
          <template v-else>
            <p>
              Attention, vous êtes sur le point d'<b>annuler</b> une mission en lien avec
              {{ this.missionStats.participations_total }} participation(s).
            </p>
            <p class="mt-4">
              Les participations <b>en attente de validation</b> seront automatiquement annulées et
              ces bénévoles seront notifiés de l'annulation de la mission.
            </p>
          </template>
        </template>
        <template v-else="selected.key === 'Annulée'">
          <p>Vous êtes sur le point de modifier le statut de la mission.</p>
        </template>
      </template>
    </BaseAlertDialog>
  </div>
</template>

<script>
import ModalMissionValidate from '@/components/modal/ModalMissionValidate.vue'
import ModalMissionReport from '@/components/modal/ModalMissionReport.vue'

export default defineNuxtComponent({
  emits: ['selected'],
  components: {
    ModalMissionValidate,
    ModalMissionReport,
  },
  props: {
    mission: {
      type: Object,
      required: true,
    },
    missionStats: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: null,
      showAlert: false,
      showModalValidate: false,
      showModalReport: false,
    }
  },
  computed: {
    statesAvailable() {
      let toStates = this.$filters.label(this.mission.state, 'mission_workflow_states', 'to')
      if (['admin', 'referent'].includes(this.$stores.auth.contextRole)) {
        return this.$labels.mission_workflow_states
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        // Si responsable on retire l'option Signalée
        toStates = toStates.filter((state) => state !== 'Signalée')
      }
      return this.$labels.mission_workflow_states.filter((state) => toStates.includes(state.key))
    },
    // textAlert() {
    //   let output = ''
    //   switch (this.selected?.key) {
    //     case 'En attente de validation':
    //       output = 'Une demande de publication va être envoyée aux référents de la plateforme.'
    //       break
    //     case 'En cours de traitement':
    //       output =
    //         'Vous êtes sur le point de passer la mission au statut <b>en cours de traitement</b>.'
    //       break
    //     case 'Terminée':
    //       output =
    //         'Vous êtes sur le point de passer la mission au statut <b>terminée</b>.<br><br> Les participations <b>en attente de validation</b> seront automatiquement déclinées.'
    //       if (this.missionStats?.participations_state['Validée']) {
    //         output =
    //           output +
    //           `<br><br> Une invitation va être envoyée aux participations <b>validées (${this.missionStats.participations_state['Validée']})</b> invitant les bénévoles à raconter leur expérience.`
    //       }
    //       break
    //     case 'Annulée':
    //       output = `Attention, vous êtes sur le point d'<b>annuler</b> une mission en lien avec ${this.missionStats.participations_total} participation(s).<br><br> Les participations <b>en attente de validation</b> seront automatiquement annulées et ces bénévoles seront notifiés de l'annulation de la mission.`
    //       break
    //     default:
    //       break
    //   }
    //   return output
    // },
  },
  methods: {
    handleSelect($event) {
      this.selected = $event
      switch (this.selected.key) {
        case 'Validée':
          if (this.mission.structure?.state === 'Validée') {
            this.showModalValidate = true
          } else {
            this.$toast.error(
              "L'organisation doit être validée avant de pouvoir valider l'une de ses missions."
            )
          }
          break
        case 'Signalée':
          this.showModalReport = true
          break
        default:
          this.showAlert = true
          break
      }
    },
    handleConfirmDialog() {
      this.$emit('selected', this.selected)
      this.showAlert = false
      this.showModalValidate = false
      this.showModalReport = false
    },
  },
})
</script>
