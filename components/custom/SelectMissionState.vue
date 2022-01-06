<template>
  <SelectWithDescription :options="statesAvailable" :value="value" @selected="$emit('selected', $event)" />
</template>

<script>
import labels from '@/utils/labels.json'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mission_workflow_states: labels.mission_workflow_states
    }
  },
  computed: {
    statesByRole () {
      switch (this.$store.getters.contextRole) {
        case 'referent':
        case 'referent_regional':
          return labels.mission_workflow_states.filter(
            option =>
              [
                'En attente de validation',
                'En cours de traitement',
                'Validée',
                'Signalée'
              ].includes(option.key)
          )
        case 'responsable':
          return labels.mission_workflow_states.filter(
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
        return labels.mission_workflow_states
      }
      const currentState = this.statesByRole.find(option => option.key == this.value)
      return this.statesByRole.filter(option => currentState.showIf.includes(option.key) || option.key == this.value)
    }
  }
}
</script>
