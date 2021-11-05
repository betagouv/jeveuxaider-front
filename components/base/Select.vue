<template>
  <div>
    <label v-if="label" :for="name" class="block text-xs uppercase font-bold text-jva-gray-text-dark">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="text-jva-blue-light">{{
        labelSuffix
      }}</span>
    </label>
    <select
      :id="name"
      :name="name"
      class="
            mt-2
            px-6
            py-3
            text-sm
            appearance-none
            rounded-xl
            block
            w-full
            placeholder-jva-gray-text-lightest
            focus:outline-none
            border border-jva-gray-border
            focus:ring-jva-blue-primary focus:border-jva-blue-primary
          "
      :class=" [{ 'border-jva-red-primary': error}]"
    >
      <option>United States</option>
      <option selected="">
        Canada
      </option>
      <option>Mexico</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: null },
    placeholder: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
    description: { type: String, default: null },
    clearable: { type: Boolean, default: false },
    required: { type: Boolean, default: false }
  }
}
</script>

<style>

</style>
