<template>
  <div>
    <div class="flex items-center relative w-full pb-1 group border-b border-transparent focus-within:border-jva-blue-500">
      <SearchIcon
        class="text-gray-400 group-focus-within:text-jva-blue-500"
        width="20"
      />

      <input
        ref="input"
        v-model="inputValue"
        type="text"
        placeholder="Recherche"
        class="border-0 p-0 pl-3 text-sm outline-none focus:ring-0 w-full"
        autocomplete="off"
        @blur="handleBlur"
      >

      <XIcon
        v-if="inputValue"
        class="text-gray-300 hover:text-jva-blue-500 cursor-pointer absolute -right-1 p-1"
        width="24"
        @click="reset()"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: [String, Number], default: null }
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
    reset () {
      this.inputValue = ''
      this.$emit('input', null)
    },
    handleBlur () {
      if (this.inputValue !== null) {
        this.$emit('blur')
      }
    }
  }
}
</script>
