<template>
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
            placeholder-gray-text-400
            focus:outline-none
            border border-gray-200
            focus:ring-jva-blue-500 focus:border-jva-blue-500
          "
    :class=" [{ 'border-jva-red-primary': error }]"
    autocomplete="off"
  />
</template>

<script>
export default {
  props: {
    value: { type: String, default: null },
    placeholder: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
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
