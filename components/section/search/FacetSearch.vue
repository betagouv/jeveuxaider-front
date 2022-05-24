<template>
  <div>
    <div class="flex items-center relative w-full pb-1 group border-b border-transparent focus-within:border-jva-blue-500 transition-colors">
      <SearchIcon
        class="text-gray-400 group-focus-within:text-jva-blue-500"
        width="20"
      />

      <input
        ref="input"
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        class="border-0 p-0 pl-3 text-sm outline-none focus:ring-0 w-full"
        autocomplete="off"
      >

      <XIcon
        v-if="inputValue || alwaysShowClear"
        class="text-gray-300 hover:text-jva-blue-500 cursor-pointer absolute -right-1 p-1"
        width="24"
        @click="clear()"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: [String, Number], default: null },
    alwaysShowClear: { type: Boolean, default: false },
    placeholder: { type: String, default: 'Rechercher' }
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
  },
  methods: {
    clear () {
      this.inputValue = ''
      this.$refs.input.focus()
      this.$emit('clear')
    }
  }
}
</script>
