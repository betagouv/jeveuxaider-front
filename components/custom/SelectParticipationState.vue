<template>
  <SelectWithDescription :options="statesAvailable" :value="value" @selected="$emit('selected', $event)" />
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    statesByRole () {
      switch (this.$store.getters.contextRole) {
        case 'responsable':
          return this.$labels.participation_workflow_states.filter(
            option =>
              [
                'En cours de traitement',
                'Validée',
                'Refusée'
              ].includes(option.key)
          )
        default:
          return []
      }
    },
    statesAvailable () {
      if (this.$store.getters.contextRole == 'admin') {
        return this.$labels.participation_workflow_states
      }
      const currentState = this.statesByRole.find(option => option.key == this.value)
      return this.statesByRole.filter(option => currentState.from.includes(option.key) || option.key == this.value)
    }
  }
}
</script>
