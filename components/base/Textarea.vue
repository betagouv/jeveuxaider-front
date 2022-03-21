<template>
  <textarea
    :id="name"
    v-model="inputValue"
    :name="name"
    :placeholder="placeholder"
    :rows="rows"
    class="
            px-6
            py-6
            text-md
            appearance-none
            rounded-xl
            block
            w-full
            placeholder-gray-text-400
            focus:outline-none
            border border-gray-200
            focus:ring-jva-blue-500 focus:border-jva-blue-500
          "
    :class="[{ 'border-jva-red-primary': error, 'cursor-not-allowed bg-gray-100': disabled }]"
    autocomplete="off"
    :disabled="disabled"
  />
</template>

<script>
export default {
  props: {
    value: { type: String, default: null },
    placeholder: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
    rows: { type: Number, default: 5 },
    disabled: { type: Boolean, default: false }
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
