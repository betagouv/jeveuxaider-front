<template>
  <div class="relative">
    <label v-if="label" class="block text-xs uppercase font-bold text-jva-gray-text-dark">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="text-jva-blue-light">{{
        labelSuffix
      }}</span>
    </label>
    <div v-if="description" class="text-xs text-jva-gray-text-light mt-2">
      {{ description }}
    </div>
    <div class="mt-2">
      <div class="flex items-center relative w-full">
        <textarea
          :id="name"
          v-model="inputValue"
          :name="name"
          :placeholder="placeholder"
          :rows="rows"
          class="
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
          :class=" [{ 'border-jva-red-primary': error }]"
          autocomplete="off"
        />
      </div>
    </div>
    <div v-if="error" class="text-xs text-red-500 absolute">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
    required: { type: Boolean, default: false },
    rows: { type: Number, default: 5 }
  },
  data () {
    return {}
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style></style>
