<template>
  <div>
    <SelectWithDescription
      v-if="statesAvailable.length"
      :options="statesAvailable"
      :value="mission.state"
      @selected="handleSelect($event)"
    />

    <ModalMissionValidate
      :mission="mission"
      :is-open="showModalValidate"
      @cancel="showModalValidate = false"
      @confirm="handleConfirmDialog()"
    />
    <ModalMissionReport
      v-if="missionStats"
      :mission="mission"
      :mission-stats="missionStats"
      :is-open="showModalReport"
      @cancel="showModalReport = false"
      @confirm="handleConfirmDialog()"
    />
    <AlertDialog
      theme="warning"
      title="Changement de statut"
      :text="textAlert"
      :is-open="showAlert"
      :prevent-click-outside="true"
      @confirm="handleConfirmDialog()"
      @cancel="showAlert = false"
    />
  </div>
</template>

<script>
import ModalMissionValidate from '@/components/modal/ModalMissionValidate.vue'
import ModalMissionReport from '@/components/modal/ModalMissionReport.vue'

export default {
  components: {
    ModalMissionValidate,
    ModalMissionReport
  },
  props: {
    mission: {
      type: Object,
      required: true
    },
    missionStats: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      selected: null,
      showAlert: false,
      showModalValidate: false,
      showModalReport: false
    }
  },
  computed: {
    statesAvailable () {
      let toStates = this.$options.filters.label(this.mission.state, 'mission_workflow_states', 'to')
      if (this.$store.getters.contextRole === 'admin') {
        return this.$labels.mission_workflow_states
      }
      if (this.$store.getters.contextRole === 'responsable') {
        // Si responsable on retire l'option Signalée
        toStates = toStates.filter(state => state !== 'Signalée')
      }
      return this.$labels.mission_workflow_states.filter(state => toStates.includes(state.key))
    },
    textAlert () {
      let output = ''
      switch (this.selected?.key) {
        case 'En attente de validation':
          output = 'Une demande de publication va être envoyée aux référents de la plateforme.'
          break
        case 'En cours de traitement':
          output = 'Vous êtes sur le point de passer la mission au statut <b>en cours de traitement</b>.'
          break
        case 'Terminée':
          output = 'Vous êtes sur le point de passer la mission au statut <b>terminée</b>.<br><br> Les participations <b>en attente de validation</b> seront automatiquement déclinées.'
          if (this.missionStats?.participations_state['Validée']) {
            output = output + `<br><br> Une invitation va être envoyée aux participations <b>validées (${this.missionStats.participations_state['Validée']})</b> invitant les bénévoles à raconter leur expérience.`
          }
          break
        case 'Annulée':
          output = `Attention, vous êtes sur le point d'<b>annuler</b> une mission en lien avec ${this.missionStats.participations_total} participation(s).<br><br> Les participations <b>en attente de validation</b> seront automatiquement annulées et ces bénévoles seront notifiés de l'annulation de la mission.`
          break
        default:
          break
      }
      return output
    }
  },
  methods: {
    handleSelect ($event) {
      this.selected = $event
      switch (this.selected.key) {
        case 'Validée':
          if (this.mission.structure?.state === 'Validée') {
            this.showModalValidate = true
          } else {
            this.$toast.error("L'organisation doit être validée avant de pouvoir valider l'une de ses missions.")
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
    handleConfirmDialog () {
      this.$emit('selected', this.selected)
      this.showAlert = false
      this.showModalValidate = false
      this.showModalReport = false
    }
  }
}
</script>
