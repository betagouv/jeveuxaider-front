<template>
  <SelectWithDescription :options="$labels.mission_template_workflow_states" :value="value" @selected="$emit('selected', $event)" />
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

  }
}
</script>
