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
  data () {
    return {
    }
  },
  computed: {
    statesAvailable () {
      let toStates = this.$options.filters.label(this.value, 'mission_template_workflow_states', 'to')
      if (this.$store.getters.contextRole === 'tete_de_reseau') {
        // Si tête de reseau on retire l'option Validée et Refusée
        toStates = toStates.filter(state => !['validated', 'refused'].includes(state))
      }
      return this.$labels.mission_template_workflow_states.filter(state => toStates.includes(state.key))
    }
  }
}
</script>
