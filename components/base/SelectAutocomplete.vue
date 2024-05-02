<template>
  <div v-click-outside="clickedOutside" class="relative">
    <div
      ref="elSelect"
      :name="name"
      :tabindex="!disabled && '0'"
      class="cursor-pointer text-sm block w-full border border-gray-300 bg-white truncate"
      :class="[
        { '!cursor-not-allowed !bg-gray-100': disabled },
        { '!bg-transparent': variant == 'transparent' && !modelValue },
        { 'bg-white': variant == 'transparent' && modelValue },
        { 'px-6 py-3 pr-10': theme === 'default' },
        { 'px-2 py-1 pr-7': theme === 'filter' },
        selectClass,
      ]"
      autocomplete="off"
      @click.prevent="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.tab="showOptions = false"
      @keydown.esc="showOptions = false"
      @blur="onBlur()"
    >
      <div class="flex gap-4">
        <span v-if="prefixSelect" class="text-gray-400 font-semibold">{{ prefixSelect }}</span>
        <template v-if="modelValue">
          <span class="truncate pr-0.5">{{ modelValue }}</span>
        </template>
        <template v-else>
          <span class="truncate italic text-[#888888] pr-0.5">{{ placeholder }}</span>
        </template>
      </div>

      <div
        class="absolute inset-y-0 my-auto flex items-center"
        :class="[
          { 'right-3': theme === 'default' },
          { 'right-1': theme === 'filter' },
          { 'pointer-events-none': !modelValue },
        ]"
      >
        <RiCloseLine
          v-if="modelValue"
          class="text-gray-400 hover:text-gray-500 cursor-pointer fill-current"
          :class="[{ 'h-5': theme === 'default' }, { 'h-4': theme === 'filter' }]"
          @click.stop="reset()"
        />
        <RiExpandUpDownLine
          v-else
          class="text-gray-400 hover:text-gray-500 cursor-pointer fill-current"
          :class="[{ 'h-5': theme === 'default' }, { 'h-4': theme === 'filter' }]"
        />
      </div>
    </div>

    <!-- @todo: Refactoring avec FilterInputAutocomplete (facets également ?). Component "DropdownOptionsWithSearch" -->
    <transition name="fade-in">
      <div
        v-show="showOptions"
        :class="[
          'absolute w-full z-50 mt-2 bg-white border border-gray-200 shadow-md overflow-hidden min-w-0',
          optionsPositionClass,
          optionsClass,
        ]"
      >
        <FocusLoop :is-visible="showOptions" @keydown.esc="showOptions = false">
          <div class="px-4 pt-4">
            <FacetSearch
              ref="facetSearch"
              :placeholder="searchInputPlaceholder"
              class="mt-3"
              v-model="searchTerm"
              @update:modelValue="handleInput"
            />
            <div
              ref="scrollContainer"
              :class="[
                'max-h-[196px] md:max-h-[268px] overflow-y-auto overscroll-contain custom-scrollbar-gray -mx-2 py-2',
                scrollContainerClass,
              ]"
              :tabindex="options.length > 0 ? 0 : undefined"
              @keydown="onKeydown($event)"
            >
              <transition
                enter-active-class="duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="ease-in duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                mode="out-in"
              >
                <LoadingIndicator v-if="loading" class="m-4" />

                <ul v-else class="px-2">
                  <li
                    v-for="(item, index) in options"
                    :key="index"
                    :ref="`option_${index}`"
                    class="relative flex justify-between items-center text-sm px-2 py-[6px] pr-2 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
                    :class="[
                      { 'bg-[#F0F0FF]': highlightedIndex === index },
                      {
                        'bg-[#F0F0FF] !pr-8': item.isSelected === true,
                      },
                    ]"
                    @click="handleClick(item)"
                  >
                    <span class="truncate">
                      {{ item[attributeLabel] }}
                    </span>

                    <span class="text-xs text-gray-400 ml-1 flex-none">
                      <template v-if="attributeRightLabel">
                        {{ item[attributeRightLabel] }}
                      </template>
                    </span>

                    <RiCheckLine
                      v-if="item.isSelected === true"
                      class="absolute right-2 h-4 fill-current"
                    />
                  </li>
                  <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
                    {{ labelEmpty }}
                  </li>
                </ul>
              </transition>
            </div>

            <div class="border-t px-4 py-3 flex justify-end -mx-4">
              <button
                class="text-sm"
                :class="[
                  { 'text-gray-400 pointer-events-none': !hasValue },
                  {
                    'text-jva-blue-500 cursor-pointer hover:underline': hasValue,
                  },
                ]"
                :disabled="!hasValue"
                @click="reset()"
              >
                Effacer
              </button>
            </div>
          </div>
        </FocusLoop>
      </div>
    </transition>
  </div>
</template>

<script>
import FacetSearch from '@/components/section/search/FacetSearch.vue'
import { FocusLoop } from '@vue-a11y/focus-loop'
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'

export default defineNuxtComponent({
  components: {
    FacetSearch,
    FocusLoop,
    LoadingIndicator,
  },
  props: {
    emits: ['selected', 'fetch-suggestions', 'blur'],
    modelValue: { type: String, default: '' },
    name: { type: String, required: true },
    options: { type: Array, default: () => [] },
    minLengthToSearch: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    attributeLabel: { type: String, default: 'name' },
    attributeRightLabel: { type: String, default: '' },
    labelEmpty: { type: String, default: 'Aucun résultat' },
    loading: { type: Boolean, default: false },
    variant: { type: String, default: null },
    theme: { type: String, default: 'default' },
    prefixSelect: { type: String, default: null },
    placeholder: { type: String, default: null },
    searchInputPlaceholder: { type: String, default: 'Rechercher' },
    selectClass: { type: String, default: '' },
    optionsClass: { type: String, default: '' },
    scrollContainerClass: { type: String, default: '' },
  },
  data() {
    return {
      showOptions: false,
      highlightedIndex: null,
      searchTerm: this.modelValue ?? '',
      shouldRefreshOnNextOpen: false,
      optionsPositionClass: '',
    }
  },
  computed: {
    hasValue() {
      return !!this.modelValue
    },
    valueIndexInOptions() {
      return this.options.findIndex((option) => option.isSelected === true)
    },
  },
  watch: {
    modelValue(newVal) {
      this.searchTerm = this.searchTerm ?? newVal ?? ''

      if (this.valueIndexInOptions !== -1) {
        this.highlightedIndex = this.valueIndexInOptions
      } else {
        this.shouldRefreshOnNextOpen = true
      }

      if (!this.searchTerm) {
        this.highlightedIndex = null
        this.showOptions = false
      }
    },
    async options() {
      this.highlightedIndex = this.valueIndexInOptions !== -1 ? this.valueIndexInOptions : null

      if (this.showOptions) {
        const ref =
          this.valueIndexInOptions !== -1 ? `option_${this.valueIndexInOptions}` : `option_0`

        // Wait for transition
        await new Promise((resolve) => setTimeout(resolve, 250))
        await this.$nextTick()

        this.$refs[ref]?.[0]?.scrollIntoView({
          block: 'nearest',
        })
      }
    },
    async showOptions(newVal) {
      if (newVal) {
        await this.$nextTick()
        this.handleOptionsPosition()
        this.$refs.facetSearch.$refs?.input?.focus()
        if (this.valueIndexInOptions !== -1) {
          this.highlightedIndex = this.valueIndexInOptions
          this.$refs[`option_${this.valueIndexInOptions}`]?.[0]?.scrollIntoView({
            block: 'nearest',
          })
        }
      } else {
        this.highlightedIndex = null
        this.$refs.elSelect?.focus()
      }
    },
  },
  methods: {
    reset() {
      this.highlightedIndex = null
      this.searchTerm = ''
      this.showOptions = false
      this.$emit('selected', null)
    },
    async toggleOpen() {
      this.showOptions = !this.showOptions
      // Initialisation
      if (this.showOptions && (this.options.length === 0 || this.shouldRefreshOnNextOpen)) {
        this.shouldRefreshOnNextOpen = false
        if (this.minLengthToSearch && this.searchTerm.length < this.minLengthToSearch) {
          return
        }
        this.$emit('fetch-suggestions', this.searchTerm)
      }
    },
    handleInput(value) {
      this.searchTerm = value
      this.highlightedIndex = null

      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(() => {
        if (this.minLengthToSearch && this.searchTerm.length < this.minLengthToSearch) {
          return
        }

        this.$emit('fetch-suggestions', this.searchTerm)
        this.showOptions = true
      }, 275)
      this.timeout()
    },
    handleClick(item) {
      this.searchTerm = item[this.attributeLabel]
      this.showOptions = false
      this.$emit('selected', item)
    },
    clickedOutside() {
      this.showOptions = false
    },
    onKeydown(e) {
      const keyValue = e.which

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
      }

      // Enter
      if (keyValue === 13) {
        if (this.highlightedIndex !== null) {
          this.handleClick(this.options[this.highlightedIndex])
          return
        }
      }

      // Arrow up, tab
      if (keyValue === 40 || (e.which === 9 && !e.shiftKey)) {
        if ([null, this.options.length - 1].includes(this.highlightedIndex)) {
          this.highlightedIndex = 0
        } else {
          this.highlightedIndex += 1
        }
      }

      // Arrow down, shiftab
      if (keyValue === 38 || (e.which === 9 && e.shiftKey)) {
        if ([null, 0].includes(this.highlightedIndex)) {
          this.highlightedIndex = this.options.length - 1
        } else {
          this.highlightedIndex -= 1
        }
      }

      this.$refs[`option_${this.highlightedIndex}`]?.[0]?.scrollIntoView({
        block: 'nearest',
      })
    },
    handleOptionsPosition() {
      const elOptionsX = this.$refs.elSelect.getBoundingClientRect()?.x
      const windowCenterX = window.innerWidth / 2
      this.optionsPositionClass = elOptionsX > windowCenterX ? 'right-0' : ''
    },
    onBlur() {
      if (!this.showOptions) {
        this.$emit('blur')
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
.custom-scrollbar-gray::-webkit-scrollbar-track {
  @apply my-2;
}
</style>
