<template>
  <div v-click-outside="clickedOutside" class="relative">
    <div class="flex items-center relative w-full">
      <div
        v-if="icon"
        :class="['absolute', { 'left-4': theme === 'default' }, { 'left-1': theme === 'filter' }]"
      >
        <component
          :is="icon"
          :class="[
            'text-gray-400 fill-current',
            { 'h-4 ': theme === 'default' },
            { 'h-3 ': theme === 'filter' },
          ]"
        />
      </div>
      <input
        :id="name"
        ref="input"
        :value="searchTerm"
        :name="name"
        type="text"
        :placeholder="placeholder"
        :class="[
          'pr-6 text-sm appearance-none block w-full placeholder-gray-text-400 focus:outline-none border border-gray-300 focus:ring-jva-blue-500 focus:border-jva-blue-500 truncate',
          { 'pl-10': icon && theme === 'default' },
          { 'pl-7': icon && theme === 'filter' },
          { 'bg-transparent': variant == 'transparent' && !modelValue },
          { 'bg-white': variant == 'transparent' && modelValue },
          { 'px-6 py-3': theme === 'default' },
          { 'px-2 py-1': theme === 'filter' },
          classInput,
        ]"
        autocomplete="off"
        :style="styleInput"
        @input="handleInput"
        @keydown="onKeydown"
        @blur="$emit('blur', $event.target.value)"
      />
      <div
        v-if="searchTerm"
        class="absolute"
        :class="[{ 'right-3': theme === 'default' }, { 'right-1': theme === 'filter' }]"
      >
        <RiCloseLine
          class="text-gray-400 hover:text-gray-500 cursor-pointer fill-current"
          :class="[{ 'h-5': theme === 'default' }, { 'h-4': theme === 'filter' }]"
          @click="reset()"
        />
      </div>
    </div>
    <div
      v-show="searchTerm && showOptions"
      class="options-wrapper absolute w-full z-50 bg-white border border-gray-200 rounded-xl shadow-md max-h-60 overflow-x-hidden overflow-y-auto mt-1 overscroll-contain"
      :class="classOptions"
      @focusout="showOptions = false"
    >
      <ul class="options-wrapper-ul py-2" :class="[classOptionsUl]">
        <li
          v-for="(item, index) in options"
          :ref="`option_${index}`"
          :key="index"
          class="flex justify-between items-center text-sm px-4 sm:px-8 py-2 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-jva-blue-500 focus:bg-gray-50 focus:text-jva-blue-500"
          :class="[
            { 'bg-gray-50 text-jva-blue-500': highlightIndex == index },
            {
              'bg-gray-50 text-jva-blue-500':
                selectedOption && item[attributeKey] == selectedOption[attributeKey],
            },
          ]"
          @click="handleClick(item)"
        >
          <div class="flex flex-col">
            <span>
              <span v-if="showKeyInOptions" class="text-gray-500"> #{{ item[attributeKey] }}</span>
              {{ item[attributeLabel] }}
            </span>
            <span v-if="attributeRightLabel" class="text-cool-gray-400 text-xs flex-none">
              {{ item[attributeRightLabel] }}
            </span>
          </div>
          <RiCheckLine
            v-if="selectedOption && item[attributeKey] == selectedOption[attributeKey]"
            class="flex-none h-5 fill-current"
          />
        </li>
        <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
          {{ labelEmpty }}
          <template v-if="authorizeAdd">
            <br /><span class="text-xs"
              >Ajoutez l'élément en pressant la touche
              <span class="text-jva-blue-500">Entrée</span></span
            >
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['selected', 'cleared', 'fetch-suggestions', 'mounted', 'update:modelValue', 'blur'],
  props: {
    modelValue: { type: String, default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucun résultat' },
    name: { type: String, required: true },
    error: { type: String, default: null },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'id' },
    attributeLabel: { type: String, default: 'name' },
    attributeRightLabel: { type: String, default: '' },
    attributeSelected: { type: String, default: null },
    classOptions: { type: String, default: '' },
    classOptionsUl: { type: String, default: '' },
    classInput: { type: String, default: '' },
    styleInput: { type: String, default: '' },
    variant: { type: String, default: null },
    clearAfterSelected: { type: Boolean, default: false },
    showKeyInOptions: { type: Boolean, default: false },
    theme: { type: String, default: 'default' },
    authorizeAdd: { type: Boolean, default: false },
    resetValueOnSelect: { type: Boolean, default: false },
    minValueLength: { type: Number, default: null },
  },
  data() {
    return {
      showOptions: false,
      highlightIndex: null,
      selectedOption: null,
      searchTerm: this.modelValue,
    }
  },
  watch: {
    modelValue(newVal) {
      this.searchTerm = newVal
    },
  },
  mounted() {
    this.$emit('mounted')
  },
  methods: {
    reset() {
      this.highlightIndex = null
      this.searchTerm = null
      this.selectedOption = null
      this.showOptions = false
      this.$emit('selected', null)
      this.$refs.input?.focus()
      this.$emit('cleared')
    },
    handleInput(evt) {
      this.searchTerm = evt.target.value
      this.$emit('update:modelValue', evt.target.value)
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(() => {
        if (this.minValueLength && this.searchTerm.trim().length < this.minValueLength) {
          this.showOptions = false
          return
        }
        this.$emit('fetch-suggestions', this.searchTerm)
        this.showOptions = true
      }, 275)
      this.timeout()
    },
    handleClick(item) {
      this.searchTerm = this.resetValueOnSelect
        ? null
        : this.attributeSelected
        ? item[this.attributeSelected]
        : item[this.attributeLabel]
      this.$emit('selected', item)
      this.selectedOption = item
      this.showOptions = false
      this.$refs.input.focus()
      this.highlightIndex = null
      if (this.clearAfterSelected) {
        this.reset()
      }
    },
    clickedOutside() {
      this.showOptions = false
    },
    onKeydown(e) {
      const keyValue = e.which
      if (keyValue === 9) {
        this.showOptions = false
        this.highlightIndex = null
      }
      // enter key
      if (keyValue === 13) {
        if (this.highlightIndex !== null) {
          this.handleClick(this.options[this.highlightIndex])
          return
        }
        if (this.authorizeAdd) {
          this.$emit('add', this.searchTerm)
          this.reset()
          return
        }
      }
      if (keyValue === 40 || keyValue === 38) {
        if (this.highlightIndex === null) {
          this.highlightIndex = 0
          this.showOptions = true
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

        this.$refs[`option_${this.highlightIndex}`]?.[0]?.scrollIntoView({
          block: 'nearest',
        })
      }
    },
  },
})
</script>
