<template>
  <div>
    <SelectWithDescription :options="statesAvailable" :value="value" @selected="handleSelect($event)" />
    <AlertDialog
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
  },
  methods: {
    handleSelect ($event) {
      this.titleAlert = 'Supprimer mon compte'
      this.textAlert = 'Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.'
      this.selected = $event
      this.showAlert = true
    }
  }
}
</script>
