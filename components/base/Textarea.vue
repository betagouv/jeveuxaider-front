<template>
  <textarea
    :id="name"
    v-model="value"
    :name="name"
    :placeholder="placeholder"
    :rows="rows"
    class="px-6 py-4 text-sm appearance-none block w-full placeholder-gray-text-400 border border-gray-300"
    :class="[
      {
        'border-jva-red-primary': error,
        'cursor-not-allowed bg-gray-100': disabled,
      },
    ]"
    autocomplete="off"
    :disabled="disabled"
    :maxlength="maxlength"
  />
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: String, default: null },
    placeholder: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
    rows: { type: Number, default: 5 },
    disabled: { type: Boolean, default: false },
    maxlength: { type: Number, default: null },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue)
      },
    },
  },
})
</script>
