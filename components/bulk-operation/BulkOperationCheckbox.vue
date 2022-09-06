<template>
  <label class="p-4 -ml-4">
    <input
      type="checkbox"
      class="focus:ring-jva-blue-500 h-4 w-4 text-jva-blue-700 border border-gray-300 rounded"
      :checked="value.find(item => item.id === model.id)"
      @change="onChange"
    >
  </label>
</template>

<script>

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },
  methods: {
    onChange () {
      const operations = [...this.value]
      const index = operations.findIndex(item => item.id === this.model.id)
      if (index > -1) {
        operations.splice(index, 1)
      } else {
        operations.push(this.model)
      }
      this.$emit('input', operations)
    }
  }
}
</script>
