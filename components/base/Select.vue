<template>
  <select
    :id="name"
    :name="name"
    :value="value"
    class="
            px-6
            py-3
            text-sm
            appearance-none
            rounded-xl
            block
            w-full
            placeholder-gray-text-400
            focus:outline-none
            border border-gray-200
            focus:ring-jva-blue-500 focus:border-jva-blue-500
          "
    :class=" [{ 'border-jva-red-primary': error}]"
    @change="onChange"
  >
    <option v-for="option in options" :key="option.key" :value="option.key">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    value: { type: String, default: null },
    options: { type: Array, required: true },
    placeholder: { type: String, default: null },
    name: { type: String, required: true }
  },
  methods: {
    onChange (evt) {
      this.$emit('input', evt.target.value)
    }
  }
}
</script>

<style>

</style>
