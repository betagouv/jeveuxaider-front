<template>
  <div v-click-outside="clickedOutside" class="relative">
    <DsfrTag
      ref="tag"
      :id="name"
      :name="name"
      :tabindex="!disabled && '0'"
      as="button"
      size="md"
      context="clickable"
      clearable
      icon="RiArrowDownSLine"
      icon-position="right"
      :is-active="typeof modelValue === 'string' ? !!modelValue : !!modelValue.key"
      class="!max-w-[300px]"
      @click="toggleOpen"
      @keydown.enter="toggleOpen"
      @keydown.esc="showOptions = false"
      @clear="reset()"
    >
      {{ valueOrLabelFilter }}
    </DsfrTag>
    <transition name="fade-in">
      <div
        v-show="showOptions"
        :class="[
          'absolute w-full z-50 mt-2 bg-white border border-gray-200 shadow-md overflow-hidden min-w-[300px]',
          optionsPositionClass,
          optionsClass,
        ]"
      >
        <FocusLoop :is-visible="showOptions">
          <div class="px-4 pt-4">
            <div class="font-medium">
              {{ label }}
            </div>
            <FacetSearch
              ref="facetSearch"
              class="mt-3"
              v-model="searchTerm"
              @update:modelValue="handleInput"
              @keydown="onKeydown"
              @keydown.esc="showOptions = false"
            />
            <div
              ref="scrollContainer"
              class="max-h-[268px] overflow-y-auto overscroll-contain custom-scrollbar-gray -mx-2"
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

                <ul v-else class="my-2 px-2">
                  <li
                    v-for="(item, index) in options"
                    :key="`${item[attributeKey]}_${index}`"
                    :ref="`option_${index}`"
                    class="relative flex justify-between items-center text-sm px-2 py-[6px] pr-2 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
                    :class="[
                      { 'bg-[#F0F0FF]': highlightIndex == index },
                      {
                        'bg-[#F0F0FF] !pr-8':
                          valueIndexInOptions !== -1 &&
                          item[attributeKey] === options[valueIndexInOptions][attributeKey],
                      },
                    ]"
                    @click="handleClick(item)"
                  >
                    <span class="truncate">
                      {{ item[attributeLabel] }}
                    </span>

                    <span class="text-xs text-gray-400 ml-1">
                      <template v-if="attributeRightLabel">
                        {{ item[attributeRightLabel] }}
                      </template>

                      <template v-else-if="!hideAttributeKey">
                        <small>#</small>{{ item[attributeKey] }}
                      </template>
                    </span>

                    <RiCheckLine
                      v-if="
                        valueIndexInOptions !== -1 &&
                        item[attributeKey] === options[valueIndexInOptions][attributeKey]
                      "
                      class="absolute right-2 h-4 fill-current"
                    />
                  </li>
                  <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
                    {{ labelEmpty }}
                  </li>
                </ul>
              </transition>
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
    emits: ['selected', 'fetch-suggestions', 'add'],
    modelValue: { type: [String, Object], default: '' }, // Object: { key: '', label: '' }
    labelEmpty: { type: String, default: 'Aucun résultat' },
    name: { type: String, required: true },
    options: { type: Array, default: () => [] },
    optionsClass: { type: String, default: '' },
    attributeKey: { type: String, default: 'id' },
    attributeLabel: { type: String, default: 'name' },
    attributeRightLabel: { type: String, default: '' },
    clearAfterSelected: { type: Boolean, default: false },
    authorizeAdd: { type: Boolean, default: false },
    resetValueOnSelect: { type: Boolean, default: false },
    minValueLength: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    label: { type: String, required: true },
    hideAttributeKey: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      showOptions: false,
      highlightIndex: null,
      searchTerm: typeof this.modelValue === 'string' ? this.modelValue : this.modelValue?.label,
      shouldRefreshOnNextOpen: false,
      optionsPositionClass: '',
    }
  },
  computed: {
    valueOrLabelFilter() {
      return (
        this.modelValue?.label ??
        (typeof this.modelValue === 'string' && this.modelValue ? this.modelValue : this.label)
      )
    },
    valueIndexInOptions() {
      return this.options.findIndex((option) =>
        typeof this.modelValue === 'string'
          ? option[this.attributeKey] === this.modelValue
          : option[this.attributeKey] === this.modelValue.key
      )
    },
  },
  watch: {
    modelValue(newVal) {
      this.searchTerm = typeof newVal === 'string' ? newVal : newVal.label

      if (this.valueIndexInOptions !== -1) {
        this.highlightIndex = this.valueIndexInOptions
      } else {
        this.shouldRefreshOnNextOpen = true
      }

      if (!this.searchTerm) {
        this.highlightIndex = null
        this.showOptions = false
      }
    },
    async options() {
      this.highlightIndex = this.valueIndexInOptions !== -1 ? this.valueIndexInOptions : null

      if (this.showOptions) {
        await this.$nextTick()
        const ref =
          this.valueIndexInOptions !== -1 ? `option_${this.valueIndexInOptions}` : `option_0`
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
          this.highlightIndex = this.valueIndexInOptions
          this.$refs[`option_${this.valueIndexInOptions}`]?.[0]?.scrollIntoView({
            block: 'nearest',
          })
        }
      } else {
        this.highlightIndex = null
      }
    },
  },
  methods: {
    reset() {
      this.highlightIndex = null
      this.searchTerm = null
      this.showOptions = false
      this.$emit('selected', null)
    },
    async toggleOpen() {
      this.showOptions = !this.showOptions
      // Initialisation
      if (this.showOptions && (this.options.length === 0 || this.shouldRefreshOnNextOpen)) {
        this.shouldRefreshOnNextOpen = false
        this.$emit('fetch-suggestions', this.searchTerm)
      }
    },
    handleInput(value) {
      this.searchTerm = value
      this.highlightIndex = null

      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(() => {
        if (this.minValueLength && this.searchTerm.length < this.minValueLength) {
          this.showOptions = false
          return
        }
        this.$emit('fetch-suggestions', this.searchTerm)
        this.showOptions = true
      }, 275)
      this.timeout()
    },
    handleClick(item) {
      this.searchTerm = this.resetValueOnSelect ? null : item[this.attributeLabel]
      this.showOptions = false

      this.$emit('selected', item)
      if (this.clearAfterSelected) {
        this.reset()
      }
    },
    clickedOutside() {
      this.showOptions = false
    },
    onKeydown(e) {
      const keyValue = e.which

      // Enter
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

      // Arrow up, tab
      if (keyValue === 40 || (e.which === 9 && !e.shiftKey)) {
        if ([null, this.options.length - 1].includes(this.highlightIndex)) {
          this.highlightIndex = 0
        } else {
          this.highlightIndex += 1
        }
      }

      // Arrow down, shiftab
      if (keyValue === 38 || (e.which === 9 && e.shiftKey)) {
        if ([null, 0].includes(this.highlightIndex)) {
          this.highlightIndex = this.options.length - 1
        } else {
          this.highlightIndex -= 1
        }
      }

      this.$refs[`option_${this.highlightIndex}`]?.[0]?.scrollIntoView({
        block: 'nearest',
      })
    },
    handleOptionsPosition() {
      const elOptionsX = this.$refs.tag.$el.getBoundingClientRect()?.x
      const windowCenterX = window.innerWidth / 2
      this.optionsPositionClass = elOptionsX > windowCenterX ? 'right-0' : ''
    },
  },
})
</script>

<style lang="postcss" scoped>
.custom-scrollbar-gray::-webkit-scrollbar-track {
  @apply my-2;
}
</style>
