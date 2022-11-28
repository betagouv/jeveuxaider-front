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
        class="cursor-pointer text-sm block w-full border border-gray-300 bg-white truncate"
        :class="[
          { 'pl-10': icon},
          {'!cursor-not-allowed !bg-gray-100': disabled},
          {'bg-transparent': variant == 'transparent' && !value},
          {'bg-white': variant == 'transparent' && value},
          {'px-6 py-3 pr-10': theme === 'default'},
          {'px-2 py-1 pr-7': theme === 'filter'},
          selectClass
        ]"
        autocomplete="off"
        @keydown="onKeydown"
        @click="!disabled ? showOptions = !showOptions : null"
        @keydown.tab="showOptions = false"
        @keydown.esc="showOptions = false"
      >
        <div class="flex gap-4">
          <span v-if="prefixLabel" class="text-gray-400 font-semibold">{{ prefixLabel }}</span>
          <template v-if="selectedOption">
            <span class="truncate">{{ selectedOption[attributeLabel] }}</span>
          </template>
          <template v-else>
            <span class="placeholder">{{ placeholder }}</span>
          </template>
        </div>
      </div>
      <div
        class="absolute"
        :class=" [
          {'right-3': theme === 'default'},
          {'right-1': theme === 'filter'}
        ]"
      >
        <XIcon
          v-if="selectedOption && clearable"
          class=" text-gray-400 hover:text-gray-500 cursor-pointer"
          :class=" [
            {'h-5': theme === 'default'},
            {'h-4': theme === 'filter'}
          ]"
          @click="reset()"
        />
        <SelectorIcon
          v-else
          class="text-gray-400 hover:text-gray-500 cursor-pointer"
          :class=" [
            {'h-5': theme === 'default'},
            {'h-4': theme === 'filter'}
          ]"
        />
      </div>
    </div>
    <div
      v-show="showOptions"
      class="absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-60 overflow-auto mt-2 overscroll-contain min-w-[200px]"
      :class="['absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-60 overflow-auto mt-2 overscroll-contain min-w-[200px]', optionsClass]"
      @focusout="showOptions = false"
    >
      <ul
        class="py-2"
      >
        <li
          v-for="(item, index) in options"
          :key="index"
          :ref="`option_${index}`"
          class="relative flex justify-between items-center text-sm px-8 py-2 pr-10 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
          :class="[
            {'bg-[#F0F0FF]': highlightIndex == index},
            {'bg-[#F0F0FF]': selectedOption && item[attributeKey] == selectedOption[attributeKey]}
          ]"
          @click="handleSelectOption(item)"
        >
          <span class="">
            {{ item[attributeLabel] }}
          </span>
          <CheckIcon v-if="selectedOption && item[attributeKey] == selectedOption[attributeKey]" class="absolute right-2" />
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
    disabled: { type: Boolean, default: false },
    theme: { type: String, default: 'default' },
    prefixLabel: { type: String, default: null },
    selectClass: { type: String, default: '' },
    optionsClass: { type: String, default: '' }
  },
  data () {
    return {
      showOptions: false,
      highlightIndex: null
    }
  },
  computed: {
    selectedOption: {
      get () {
        return this.value ? this.options.find(item => item[this.attributeKey] == this.value) : null
      },
      set (newItem) {
        this.$emit('changed', newItem)
        // this.handleSelectOption(newItem)
      }
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

      if (keyValue === 13) {
        if (this.highlightIndex !== null) {
          this.handleSelectOption(this.options[this.highlightIndex])
          return
        }
      }
      if (keyValue === 40 || keyValue === 38 || keyValue === 13) {
        e.preventDefault()
        e.stopPropagation()
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
        this.$refs[`option_${this.highlightIndex}`]?.[0].scrollIntoView({
          block: 'nearest'
        })
      }
    }

  }
}
</script>

<style lang="postcss" scoped>
.placeholder {
  font-style: italic;
  color: #888888 !important;
}
</style>
