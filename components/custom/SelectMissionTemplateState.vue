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
      const toStates = this.$options.filters.label(this.value, 'mission_template_workflow_states', 'to')
      return this.$labels.mission_template_workflow_states.filter(state => toStates.includes(state.key))
    }
  }
}
</script>
