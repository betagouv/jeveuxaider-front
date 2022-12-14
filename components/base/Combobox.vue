<template>
  <div v-click-outside="clickedOutside" class="relative">
    <div class="flex items-center relative w-full">
      <div v-if="icon" class="absolute left-4">
        <component
          :is="icon"
          class="h-4 w-4 text-gray-400"
        />
      </div>
      <input
        :id="name"
        v-model="search"
        :name="name"
        type="input"
        :tabindex="!disabled && '0'"
        :placeholder="placeholder"
        class="cursor-pointer px-6 py-3 pr-10 text-sm block w-full focus:outline-none border border-gray-300 focus:ring-1 bg-white focus:ring-jva-blue-500 focus:border-jva-blue-500 truncate"
        :class=" [
          { 'pl-10': icon},
          {'!cursor-not-allowed !bg-gray-100': disabled},
          {'bg-transparent': variant == 'transparent' && !value},
          {'bg-white': variant == 'transparent' && value}
        ]"
        autocomplete="off"
        :disabled="disabled"
        @keydown="onKeydown"
        @click="!disabled ? showOptions = true : null"
      >
      <div class="absolute right-3" :class="{'pointer-events-none': !selectedOption || disabled || loading}">
        <RiLoader5Line
          v-if="loading"
          class="animate-spin h-5 w-5 text-gray-400 fill-current"
        />
        <XIcon
          v-else-if="selectedOption && !disabled"
          class="h-5 text-gray-400 hover:text-jva-blue-500 cursor-pointer"
          @click="reset()"
        />
        <SelectorIcon
          v-else
          class="h-5 text-gray-400"
        />
      </div>
    </div>
    <div
      v-show="showOptions"
      class="absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-60 overflow-auto mt-1 overscroll-contain min-w-[200px]"
      @focusout="showOptions = false"
    >
      <ul
        class="py-2"
      >
        <li
          v-for="(item, index) in filteredOptions"
          :key="index"
          :ref="`option_${index}`"
          class="relative flex justify-between items-center text-sm px-8 py-2 pr-10 cursor-pointer hover:bg-[#F0F0FF] focus:outline-none text-[#3A3A3A] focus:bg-[#F0F0FF] group"
          :class="[
            {'bg-[#F0F0FF]': highlightIndex == index},
            {'bg-[#F0F0FF]': selectedOption && item[attributeKey] == selectedOption[attributeKey]}
          ]"
          @click="handleSelectOption(item)"
        >
          <slot
            name="option"
            :item="item"
            :attributeLabel="attributeLabel"
            :selectedOption="selectedOption"
            :highlightIndex="highlightIndex"
            :index="index"
          >
            <span class="">
              {{ item[attributeLabel] }}
            </span>
            <CheckIcon v-if="selectedOption && item[attributeKey] == selectedOption[attributeKey]" class="absolute right-2" />
          </slot>
        </li>
        <li v-if="!filteredOptions.length" class="px-8 py-2 text-center text-sm text-gray-500">
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
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
      search: this.value ? this.options.find(item => item[this.attributeKey] == this.value)?.[this.attributeLabel] : null,
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
        this.$emit('input', newItem ? newItem[this.attributeKey] : null)
      }
    },
    filteredOptions () {
      if (this.search && this.search !== '') {
        return this.options.filter((option) => {
          return option[this.attributeLabel].toLowerCase().includes(this.search.toLowerCase())
        })
      }
      return this.options
    }
  },
  watch: {
    search () {
      this.highlightIndex = null
    }
  },
  methods: {
    reset () {
      this.highlightIndex = null
      this.selectedOption = null
      this.showOptions = false
      this.search = null
    },
    clickedOutside () {
      this.showOptions = false
      this.highlightIndex = null
    },
    handleSelectOption (item) {
      if (item && this.selectedOption && this.selectedOption[this.attributeKey] === item[this.attributeKey]) {
        this.selectedOption = null
        this.search = null
      } else if (item) {
        this.selectedOption = item
        this.search = item[this.attributeLabel]
      }
      this.showOptions = false
      this.highlightIndex = null
      this.$emit('blur')
    },
    onKeydown (e) {
      if (this.disabled) {
        return
      }

      this.showOptions = true

      const keyValue = e.which

      // enter key
      if (keyValue === 9) {
        this.showOptions = false
        this.highlightIndex = null
      }

      if (keyValue === 13) {
        if (this.highlightIndex !== null) {
          this.handleSelectOption(this.filteredOptions[this.highlightIndex])
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
          if (this.highlightIndex + 1 === this.filteredOptions.length) {
            this.highlightIndex = 0
          } else {
            this.highlightIndex += 1
          }
        }
        if (keyValue === 38) {
          if (this.highlightIndex === 0) {
            this.highlightIndex = this.filteredOptions.length - 1
          } else {
            this.highlightIndex -= 1
          }
        }
        this.$refs[`option_${this.highlightIndex}`]?.[0]?.scrollIntoView({
          block: 'nearest'
        })
      }
    }

  }
}
</script>
