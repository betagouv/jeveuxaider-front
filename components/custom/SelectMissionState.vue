<template>
  <div>
    <SelectWithDescription :options="statesAvailable" :value="value" @selected="$emit('selected', $event)" />
    <!-- <Modal
      title="Deactivate account"
      icon="warning"
    >
      Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
      <template #footer slot-scope="">
        Footer
      </template>
    </Modal> -->
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
      const currentState = this.statesByRole.find(option => option.key == this.value)
      return this.statesByRole.filter(option => currentState.from.includes(option.key) || option.key == this.value)
    }
  }
}
</script>
