<template>
  <div>
    <SelectWithDescription :options="statesAvailable" :value="value" @selected="handleSelect($event)" />
    <AlertDialog
      theme="warning"
      :title="titleAlert"
      :text="textAlert"
      :is-open="showAlert"
      @confirm="$emit('selected', selected)"
      @cancel="showAlert = false"
    />
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
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
      titleAlert: '',
      textAlert: ''
    }
  },
  computed: {
    statesByRole () {
      switch (this.$store.getters.contextRole) {
        case 'referent':
        case 'referent_regional':
          return this.$labels.mission_workflow_states.filter(
            option =>
              [
                'En attente de validation',
                'En cours de traitement',
                'Validée',
                'Signalée'
              ].includes(option.key)
          )
        case 'responsable':
        case 'tete_de_reseau':
          return this.$labels.mission_workflow_states.filter(
            option =>
              [
                'En attente de validation',
                'Terminée',
                'Annulée'
              ].includes(option.key)
          )
        default:
          return []
      }
    },
    statesAvailable () {
      if (this.$store.getters.contextRole == 'admin') {
        return this.$labels.mission_workflow_states
      }
      // @TODO : à revoir quand on est responsable / tete de reseau ça plante quand le statut est Validée -> pouvoir passer en Terminée/ Annulée
      // console.log('this.$labels.mission_workflow_states', this.$labels.mission_workflow_states)
      // console.log('this.value', this.value)
      // console.log('this.statesByRole', this.statesByRole)
      const currentState = this.statesByRole.find(option => option.key === this.value)
      // console.log('currentState', currentState)
      return this.statesByRole.filter(option => currentState.from.includes(option.key) || option.key == this.value)
    }
  },
  methods: {
    handleSelect ($event) {
      this.titleAlert = 'Changement de statut'
      if ($event.key == 'En attente de validation') {
        this.textAlert = 'Une demande de publication va être envoyée aux référents de la plateforme.'
      }

      if ($event.key == 'En cours de traitement') {
        this.textAlert = 'Vous êtes sur le point de passer la mission au statut <b>en cours de traitement</b>.'
      }

      if ($event.key == 'Validée') {
        this.textAlert = 'Vous êtes sur le point de <b>valider</b> cette mission. Elle sera disponible dans la recherche.'
      }

      if ($event.key == 'Terminée') {
        this.textAlert = 'Vous êtes sur le point de passer la mission au statut <b>terminée</b>.<br><br> Les participations <b>en attente de validation</b> seront automatiquement déclinées.'
        if (this.missionStats.participations_state['Validée']) {
          this.textAlert =
            this.textAlert +
            `<br><br> Une invitation va être envoyée aux participations <b>validées (${this.missionStats.participations_state['Validée']})</b> invitant les bénévoles à raconter leur expérience.`
        }
      }

      if ($event.key == 'Annulée') {
        this.textAlert = `Attention, vous êtes sur le point d'<b>annuler</b> une mission en lien avec ${this.missionStats.participations_total} participation(s).<br><br> Les participations <b>en attente de validation</b> seront automatiquement annulées et ces bénévoles seront notifiés de l'annulation de la mission.`
      }

      if ($event.key == 'Signalée') {
        this.textAlert = `Vous êtes sur le point de <b>signaler</b> une mission qui ne répond pas aux exigences de la charte ou des règles fixés par le Décret n° 2017-930 du 9 mai 2017 relatif à la Réserve Civique. Le responsable est en lien avec ${this.missionStats.participations_total} bénévole(s). <br><br> Les participations à venir seront automatiquement <b>annulées</b>. Les coordonnées des bénévoles seront masquées.`
      }
      this.selected = $event
      this.showAlert = true
    }
  }
}
</script>
