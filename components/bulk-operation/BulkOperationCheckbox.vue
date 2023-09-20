<template>
  <label class="p-4 -ml-4 cursor-pointer">
    <input
      type="checkbox"
      class="focus:ring-jva-blue-500 cursor-pointer h-4 w-4 text-jva-blue-500 border border-gray-500 rounded hover:scale-[1.2] transition-transform"
      :checked="modelValue.find((item) => item.id === model.id)"
      @change="onChange"
    />
  </label>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onChange() {
      const operations = [...this.modelValue]
      const index = operations.findIndex((item) => item.id === this.model.id)
      if (index > -1) {
        operations.splice(index, 1)
      } else {
        operations.push(this.model)
      }
      this.$emit('update:modelValue', operations)
    },
  },
})
</script>
