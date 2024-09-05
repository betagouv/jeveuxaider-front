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
            'absolute inset-y-0 left-1 fill-current flex-none my-auto',
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
          '!border-none rounded-t w-full h-full truncate',

          {
            'bg-[#EEEEEE] shadow-[inset_0_-2px_0_0_#3A3A3A] focus:!shadow-[inset_0_-2px_0_0_#3A3A3A]':
              variant === 'default',
          },
          {
            'bg-white shadow-[inset_0_-2px_0_0_#000091] focus:!shadow-[inset_0_-2px_0_0_#000091]':
              variant === 'white',
          },

          { '!shadow-[inset_0_-2px_0_0_#ce0500]': error },
          { '!shadow-[inset_0_-2px_0_0_#18753c]': success },

          { 'py-3': size === 'lg' },

          {
            'pl-12': icon && ['md', 'lg'].includes(size),
          },

          { 'pr-8': !!modelValue },

          inputClass,
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

    <!-- todo: component pour gérer le teleport, placement et la taille -->
    <div
      v-show="searchTerm && showOptions"
      class="options-wrapper absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-[222px] overflow-x-hidden overflow-y-auto mt-1 overscroll-contain custom-scrollbar-gray"
      :class="classOptions"
      @focusout="showOptions = false"
    >
      <ul class="options-wrapper-ul divide-y" :class="[classOptionsUl]">
        <li
          v-for="(item, index) in options"
          :ref="`option_${index}`"
          :key="index"
          class="flex justify-between items-center text-sm px-6 py-2 cursor-pointer hover:bg-[#F5F5FE] focus:outline-none hover:text-jva-blue-500 focus:bg-gray-50 focus:text-jva-blue-500"
          :class="[
            { 'bg-[#F5F5FE] text-jva-blue-500': highlightIndex == index },
            {
              'bg-[#F5F5FE] text-jva-blue-500':
                selectedOption && item[optionKeyAttribute] == selectedOption[optionKeyAttribute],
            },
          ]"
          @click="handleClick(item)"
        >
          <div class="flex flex-col">
            <span>
              <span v-if="showKeyInOptions" class="text-gray-500">
                #{{ item[optionKeyAttribute] }}</span
              >
              {{ item[optionLabelAttribute] }}
            </span>
            <span v-if="optionLabelSecondaryAttribute" class="text-cool-gray-400 text-xs flex-none">
              {{ item[optionLabelSecondaryAttribute] }}
            </span>
          </div>

          <!-- @todo: Doit être visible à l'initialisation si j'ai déjà une valeur -->
          <RiCheckboxCircleFill
            v-if="selectedOption && item[optionKeyAttribute] == selectedOption[optionKeyAttribute]"
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
    name: { type: String, required: true },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucun résultat' },

    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },

    optionKeyAttribute: { type: String, default: 'id' },
    optionLabelAttribute: { type: String, default: 'name' },
    optionLabelSecondaryAttribute: { type: String, default: '' },

    classOptions: { type: String, default: '' },
    classOptionsUl: { type: String, default: '' },
    inputClass: { type: String, default: '' },
    styleInput: { type: String, default: '' },

    clearAfterSelected: { type: Boolean, default: false },
    showKeyInOptions: { type: Boolean, default: false },
    theme: { type: String, default: 'default' },
    authorizeAdd: { type: Boolean, default: false },
    resetValueOnSelect: { type: Boolean, default: false },
    minValueLength: { type: Number, default: null },

    size: {
      type: String,
      default: 'md',
      validator: (s) => ['md', 'lg'].includes(s),
    },
    error: { type: Boolean, default: false },
    success: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'default',
      validator: (i) => ['white', 'default'].includes(i),
    },
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
    showOptions(newVal) {
      if (!newVal) {
        if (this.modelValue !== this.searchTerm) {
          this.searchTerm = this.modelValue
        }
      }
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
        if (this.minValueLength && this.searchTerm?.trim()?.length < this.minValueLength) {
          this.showOptions = false
          return
        }
        this.$emit('fetch-suggestions', this.searchTerm)
        this.showOptions = true
      }, 275)
      this.timeout()
    },
    handleClick(item) {
      this.searchTerm = this.resetValueOnSelect ? null : this.modelValue
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

<style lang="postcss" scoped>
input {
  --tw-ring-shadow: 0 0 #000 !important;
}
</style>
