<template>
  <BaseSelectWithDescription
    :options="statesAvailable"
    :modelValue="modelValue"
    @selected="$emit('selected', $event)"
  />
</template>

<script>
export default defineNuxtComponent({
  emits: ['selected'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    statesAvailable() {
      let toStates = this.$filters.label(this.modelValue, 'mission_template_workflow_states', 'to')
      if (this.$stores.auth.contextRole === 'tete_de_reseau') {
        // Si tête de reseau on retire l'option Validée et Refusée
        toStates = toStates.filter((state) => !['validated', 'refused'].includes(state))
      }
      return this.$labels.mission_template_workflow_states.filter((state) =>
        toStates.includes(state.key)
      )
    },
  },
})
</script>
