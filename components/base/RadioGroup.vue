<template>
  <fieldset>
    <legend class="sr-only">
      Choisir une option
    </legend>
    <div class="flex">
      <!--
        Active: "ring-2 ring-offset-2 ring-indigo-500"
      -->
      <label
        v-for="(option, index) in options"
        :key="option.key"
        class="border border-r-0 py-3 px-3 flex items-center justify-center text-sm font-medium text-center sm:flex-1 cursor-pointer focus:outline-none"
        :class="[
          option.key == selected ? 'bg-jva-blue-600 border-transparent text-white hover:bg-jva-blue-500' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
          {'!border-r-0 rounded-l-xl': index == 0 },
          {'rounded-r-xl !border-r !border-l': index == options.length-1 },
          {'!border-l-0': index == options.length-1 && options.length > 2 }
        ]"
      >
        <input
          v-model="selected"
          type="radio"
          name="memory-option"
          :value="option.key"
          class="sr-only"
          aria-labelledby="memory-option-0-label"
        >
        <p id="memory-option-0-label">
          {{ option.label }}
        </p>
      </label>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    options: { type: Array, required: true },
    value: { type: String, default: null }
  },
  computed: {
    selected: {
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
