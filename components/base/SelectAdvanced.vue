<template>
  <div v-click-outside="clickedOutside" class="relative">
    <div class="flex items-center relative w-full">
      <div v-if="icon" class="absolute left-4">
        <component
          :is="icon"
          class="h-4 w-4 text-gray-400"
        />
      </div>
      <div
        :id="name"
        :name="name"
        :tabindex="!disabled && '0'"
        class="cursor-pointer px-6 py-3 text-sm rounded-xl block w-full focus:outline-none border border-gray-200 focus:ring-1  bg-white focus:ring-jva-blue-500 focus:border-jva-blue-500"
        :class=" [
          { 'pl-10': icon},
          {'!cursor-not-allowed !bg-gray-100': disabled},
          {'bg-transparent': variant == 'transparent' && !value},
          {'bg-white': variant == 'transparent' && value}
        ]"
        autocomplete="off"
        @keydown="!disabled && onKeydown"
        @click="!disabled ? showOptions = !showOptions : null"
      >
        <template v-if="selectedOption">
          {{ selectedOption[attributeLabel] }}
        </template>
        <template v-else>
          <span class="text-gray-500">{{ placeholder }}</span>
        </template>
      </div>
      <div class="absolute right-3">
        <XIcon
          v-if="selectedOption && clearable"
          class="h-5 text-gray-400 hover:text-gray-500 cursor-pointer"
          @click="reset()"
        />
        <SelectorIcon
          v-else
          class="h-5 text-gray-400 hover:text-gray-500 cursor-pointer"
        />
      </div>
    </div>
    <div
      v-show="showOptions"
      class="absolute w-full z-50 bg-white border border-gray-200 rounded-xl shadow-md max-h-60 overflow-auto mt-1"
      @focusout="showOptions = false"
    >
      <ul
        class="py-2"
      >
        <li
          v-for="(item, index) in options"
          :key="index"
          class="flex justify-between items-center text-sm px-8 py-2 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-jva-blue-500 focus:bg-gray-50 focus:text-jva-blue-500"
          :class="[
            {'bg-gray-50 text-jva-blue-500': highlightIndex == index},
            {'bg-gray-50 text-jva-blue-500': selectedOption && item[attributeKey] == selectedOption[attributeKey]}
          ]"
          @click="handleSelectOption(item)"
        >
          <span class="">
            {{ item[attributeLabel] }}
          </span>
          <CheckIcon v-if="selectedOption && item[attributeKey] == selectedOption[attributeKey]" class="" />
        </li>
        <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
          {{ labelEmpty }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: [String, Number], default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucune option' },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'key' },
    attributeLabel: { type: String, default: 'label' },
    variant: { type: String, default: null }, // transparent
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      showOptions: false,
      highlightIndex: null,
      selectedOption: this.value ? this.options.find(item => item[this.attributeKey] == this.value) : null
    }
  },
  methods: {
    reset () {
      this.highlightIndex = null
      this.selectedOption = null
      this.showOptions = false
      this.$emit('input', null)
    },
    clickedOutside () {
      this.showOptions = false
    },
    handleSelectOption (item) {
      if (item && this.selectedOption && this.selectedOption[this.attributeKey] === item[this.attributeKey]) {
        this.$emit('input', null)
        this.selectedOption = null
      } else if (item) {
        this.$emit('input', item[this.attributeKey])
        this.selectedOption = item
      }
      this.$emit('blur')
      this.showOptions = false
      this.highlightIndex = null
    },
    onKeydown (e) {
      if (this.disabled) {
        return
      }
      const keyValue = e.which // enter key
      if (keyValue === 9) {
        this.showOptions = false
        this.highlightIndex = null
      }

      if (keyValue === 13 || keyValue === 32) {
        if (this.highlightIndex !== null) {
          this.handleSelectOption(this.options[this.highlightIndex])
          return
        }
      }
      if (keyValue === 40 || keyValue === 38 || keyValue === 32) {
        if (this.highlightIndex === null) {
          this.showOptions = true
          this.highlightIndex = 0
          return
        }
        if (keyValue === 40) {
          if (this.highlightIndex + 1 === this.options.length) {
            this.highlightIndex = 0
          } else {
            this.highlightIndex += 1
          }
        }
        if (keyValue === 38) {
          if (this.highlightIndex === 0) {
            this.highlightIndex = this.options.length - 1
          } else {
            this.highlightIndex -= 1
          }
        }
      }
    }

  }
}
</script>
