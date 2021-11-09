<template>
  <div v-click-outside="clickedOutside" class="relative">
    <label v-if="label" :for="name" class="block text-xs uppercase font-bold text-gray-700">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="text-jva-blue-400">{{
        labelSuffix
      }}</span>
    </label>
    <div v-if="description" class="text-xs text-gray-500 mt-2">
      {{ description }}
    </div>
    <div class="mt-2">
      <div class="flex items-center relative w-full">
        <div v-if="icon" class="absolute left-4">
          <component
            :is="icon"
            class="h-4 w-4 text-gray-400"
          />
        </div>
        <input
          :id="name"
          ref="input"
          :value="searchTerm"
          :name="name"
          type="text"
          :placeholder="placeholder"
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
          :class=" [{ 'border-jva-red-primary': error, 'pl-10': icon}]"
          autocomplete="off"
          @input="handleInput"
          @keydown="onKeydown"
        >
        <div v-if="searchTerm" class="absolute right-3">
          <XIcon
            class="h-5 text-gray-400 hover:text-gray-500 cursor-pointer"
            @click="searchTerm = null"
          />
        </div>
      </div>
    </div>
    <div
      v-show="searchTerm && showOptions"
      class="absolute w-full z-50 bg-white border border-gray-200 mt-2 overflow-hidden rounded-xl shadow-md"
      @focusout="showOptions = false"
    >
      <ul
        class="py-2"
      >
        <li
          v-for="(item, index) in options"
          :key="index"
          class="text-sm px-8 py-2 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-jva-blue-500 focus:bg-gray-50 focus:text-jva-blue-500"
          :class="[
            {'bg-gray-50 text-jva-blue-500': highlightIndex == index}
          ]"
          @click="handleClick(item)"
        >
          {{ item.name }}
        </li>
        <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
          {{ labelEmpty }}
        </li>
      </ul>
    </div>

    <div v-if="error" class="text-xs text-red-500 absolute">
      {{ error }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: String, default: null },
    placeholder: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucun résultat' },
    name: { type: String, required: true },
    error: { type: String, default: null },
    description: { type: String, default: null },
    required: { type: Boolean, default: false },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] }
  },
  data () {
    return {
      showOptions: false,
      highlightIndex: null,
      selectedOption: null,
      searchTerm: null
    }
  },
  methods: {
    reset () {
      this.highlightIndex = null
      this.searchTerm = null
      this.selectedOption = null
      this.showOptions = false
    },
    handleInput (evt) {
      this.searchTerm = evt.target.value
      this.$emit('fetch-suggestions', this.searchTerm)
      this.showOptions = true
    },
    handleClick (item) {
      this.searchTerm = item.name
      this.$emit('selected', item)
      this.selectedOption = item
      this.showOptions = false
      this.$refs.input.focus()
      this.highlightIndex = null
    },
    clickedOutside () {
      this.showOptions = false
    },
    onKeydown (e) {
      const keyValue = e.which // enter key
      if (keyValue === 13) {
        if (this.highlightIndex !== null) {
          this.handleClick(this.options[this.highlightIndex])
        }
      }
      if (keyValue === 40 || keyValue === 38) {
        if (this.highlightIndex === null) {
          this.highlightIndex = 0
          return
        }
        if (keyValue === 40) {
          this.highlightIndex += 1
        }
        if (keyValue === 38) {
          this.highlightIndex -= 1
        }
      }
    }

  }
}
</script>

<style></style>
