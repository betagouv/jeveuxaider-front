<template>
  <div>
    <label v-if="label" :for="name" class="block text-xs uppercase font-bold text-gray-700">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="jva-blue-400">{{
        labelSuffix
      }}</span>
    </label>
    <select
      :id="name"
      :name="name"
      :value="value"
      class="
            mt-2
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
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: null },
    options: { type: Array, required: true },
    placeholder: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
    description: { type: String, default: null },
    clearable: { type: Boolean, default: false },
    required: { type: Boolean, default: false }
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
