<template>
  <BaseSelectWithDescription
    :options="statesAvailable"
    :modelValue="modelValue"
    @selected="$emit('selected', $event)"
  />
</template>

<script>
export default defineNuxtComponent({
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
      const toStates = this.$filters.label(this.modelValue, 'territoire_workflow_states', 'to')
      return this.$labels.territoire_workflow_states.filter((state) => toStates.includes(state.key))
    },
  },
})
</script>
