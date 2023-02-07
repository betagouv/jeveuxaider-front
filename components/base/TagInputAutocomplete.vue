<template>
  <div v-click-outside="clickedOutside" class="relative">
    <Tag
      :id="name"
      :name="name"
      :tabindex="!disabled && '0'"
      as="button"
      size="md"
      context="clickable"
      clearable
      icon="RiSearchLine"
      icon-position="right"
      :is-active="value ? true : false"
      class="max-w-[300px]"
      @keydown.native="onKeydown"
      @click.native="toggleOpen"
      @keydown.native.tab="showOptions = false"
      @keydown.native.esc="showOptions = false"
      @clear="reset()"
    >
      {{ computedValue }}
    </Tag>
    <div
      v-show="showOptions"
      :class="[
        'absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-60 overflow-auto mt-2 overscroll-contain min-w-[300px]',
        optionsClass
      ]"
      @focusout="showOptions = false"
    >
      <div class="p-4 space-y-3">
        <div class="font-medium">
          {{ label }}
        </div>
        <FacetSearch v-model="searchTerm" @input="handleInput" />
        <ul
          class="py-2"
        >
          <li
            v-for="(item, index) in options"
            :key="index"
            :ref="`option_${index}`"
            class="relative flex justify-between items-center text-sm px-2 py-2 pr-10 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
            :class="[
              {'bg-[#F0F0FF]': highlightIndex == index},
              {'bg-[#F0F0FF]': selectedOption && item[attributeKey] == selectedOption[attributeKey]}
            ]"
            @click="handleClick(item)"
          >
            <span class="truncate">
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
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Tag from '@/components/dsfr/Tag.vue'
import FacetSearch from '@/components/section/search/FacetSearch.vue'

export default {
  components: {
    Tag,
    FacetSearch
  },
  props: {
    value: { type: String, default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucun résultat' },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'id' },
    attributeLabel: { type: String, default: 'name' },
    attributeRightLabel: { type: String, default: '' },
    classOptions: { type: String, default: '' },
    classOptionsUl: { type: String, default: '' },
    clearAfterSelected: { type: Boolean, default: false },
    authorizeAdd: { type: Boolean, default: false },
    resetValueOnSelect: { type: Boolean, default: false },
    minValueLength: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    optionsClass: { type: String, default: '' },
    label: { type: String, required: true }
  },
  data () {
    return {
      showOptions: false,
      highlightIndex: null,
      selectedOption: null,
      searchTerm: this.value
    }
  },
  computed: {
    computedValue () {
      return this.value ? this.value : this.label
    }
  },
  mounted () {
    this.$emit('mounted')
  },
  methods: {
    reset () {
      this.highlightIndex = null
      this.searchTerm = null
      this.selectedOption = null
      this.showOptions = false
      this.$emit('selected', null)
    },
    toggleOpen () {
      this.showOptions = !this.showOptions
      this.$emit('fetch-suggestions', this.searchTerm)
    },
    handleInput (value) {
      this.searchTerm = value
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        if (this.minValueLength && this.searchTerm.length < this.minValueLength) {
          this.showOptions = false
          return
        }
        this.$emit('fetch-suggestions', this.searchTerm)
        this.showOptions = true
      }, 275)
      this.timeout()
    },
    handleClick (item) {
      this.searchTerm = this.resetValueOnSelect ? null : item[this.attributeLabel]
      this.$emit('selected', item)
      this.selectedOption = item
      this.showOptions = false
      // this.$refs.input.focus()
      this.highlightIndex = null

      if (this.clearAfterSelected) {
        this.reset()
      }
    },
    clickedOutside () {
      this.showOptions = false
    },
    onKeydown (e) {
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
      }
    }

  }
}
</script>
