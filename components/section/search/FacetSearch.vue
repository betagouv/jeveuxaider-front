<template>
  <div>
    <div
      class="flex items-center relative w-full pb-1 group border-b border-transparent focus-within:border-jva-blue-500 transition-colors"
    >
      <component
        :is="icon"
        class="w-5 h-5 flex-none fill-current text-gray-400 group-focus-within:text-jva-blue-500"
      />

      <input
        ref="input"
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        :class="[
          'border-0 p-0 pl-3 text-base sm:text-sm !outline-none w-full truncate',
          { 'pr-4': inputValue },
        ]"
        autocomplete="off"
        :aria-labelledby="ariaLabelledby"
        :aria-label="!ariaLabelledby && ariaLabel"
        @focus="$emit('focus')"
      />

      <RiCloseLine
        v-if="inputValue || alwaysShowClear"
        class="text-gray-300 hover:text-jva-blue-500 cursor-pointer absolute -right-1 p-1"
        width="24"
        @click="clear()"
      />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    modelValue: { type: [String, Number], default: null },
    alwaysShowClear: { type: Boolean, default: false },
    placeholder: { type: String, default: 'Rechercher' },
    icon: { type: String, default: 'RiSearchLine' },
    ariaLabelledby: { type: String, default: null },
    ariaLabel: { type: String, default: null },
  },
  data() {
    return {}
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue)
      },
    },
  },
  methods: {
    clear() {
      this.inputValue = ''
      this.$refs.input.focus()
      this.$emit('clear')
    },
  },
})
</script>
