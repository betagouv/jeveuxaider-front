<template>
  <div v-click-outside="clickedOutside" class="relative">
    <div class="flex items-center relative w-full">
      <div
        v-if="icon"
        :class=" [
          'absolute',
          {'left-4': theme === 'default'},
          {'left-1': theme === 'filter'}
        ]"
      >
        <component
          :is="icon"
          :class=" [
            'text-gray-400',
            {'h-4 ': theme === 'default'},
            {'h-3 ': theme === 'filter'}
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
          'pr-6 text-sm appearance-none rounded-xl block w-full placeholder-gray-text-400 focus:outline-none border border-gray-300 focus:ring-jva-blue-500 focus:border-jva-blue-500 truncate',
          {'pl-10': icon && theme === 'default'},
          {'pl-7': icon && theme === 'filter'},
          {'bg-transparent': variant == 'transparent' && !value},
          {'bg-white': variant == 'transparent' && value},
          {'px-6 py-3': theme === 'default'},
          {'px-2 py-1': theme === 'filter'},
          classInput
        ]"
        autocomplete="off"
        :style="styleInput"
        @input="handleInput"
        @keydown="onKeydown"
      >
      <div
        v-if="searchTerm"
        class="absolute"
        :class=" [
          {'right-3': theme === 'default'},
          {'right-1': theme === 'filter'}
        ]"
      >
        <XIcon
          class=" text-gray-400 hover:text-gray-500 cursor-pointer"
          :class="[
            {'h-5': theme === 'default'},
            {'h-4': theme === 'filter'},
          ]"
          @click="reset()"
        />
      </div>
    </div>
    <div
      v-show="searchTerm && showOptions"
      class="options-wrapper absolute w-full z-50 bg-white border border-gray-200 mt-2 overflow-hidden rounded-xl shadow-md"
      :class="classOptions"
      @focusout="showOptions = false"
    >
      <ul
        class="options-wrapper-ul py-2"
        :class="[classOptionsUl]"
      >
        <li
          v-for="(item, index) in options"
          :key="index"
          class="flex justify-between items-center text-sm px-4 sm:px-8 py-2 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-jva-blue-500 focus:bg-gray-50 focus:text-jva-blue-500"
          :class="[
            {'bg-gray-50 text-jva-blue-500': highlightIndex == index},
            {'bg-gray-50 text-jva-blue-500': selectedOption && item[attributeKey] == selectedOption[attributeKey]}
          ]"
          @click="handleClick(item)"
        >
          <span class="">
            <span v-if="showKeyInOptions" class="text-gray-500"> #{{ item[attributeKey] }}</span>
            {{ item[attributeLabel] }}
          </span>
          <div class="space-x-4 flex">
            <span v-if="attributeRightLabel" class="text-cool-gray-400 text-sm font-semibold">
              {{ item[attributeRightLabel] }}
            </span>
            <CheckIcon v-if="selectedOption && item[attributeKey] == selectedOption[attributeKey]" class="" />
          </div>
        </li>
        <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
          {{ labelEmpty }}
          <template v-if="authorizeAdd">
            <br><span class="text-xs">Ajoutez l'élément en pressant la touche <span class="text-jva-blue-500">Entrée</span></span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    value: { type: String, default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucun résultat' },
    name: { type: String, required: true },
    error: { type: String, default: null },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'id' },
    attributeLabel: { type: String, default: 'name' },
    attributeRightLabel: { type: String, default: '' },
    classOptions: { type: String, default: '' },
    classOptionsUl: { type: String, default: '' },
    classInput: { type: String, default: '' },
    styleInput: { type: String, default: '' },
    variant: { type: String, default: null }, // transparent
    clearAfterSelected: { type: Boolean, default: false },
    showKeyInOptions: { type: Boolean, default: false },
    theme: { type: String, default: 'default' },
    authorizeAdd: { type: Boolean, default: false }
  },
  data () {
    return {
      showOptions: false,
      highlightIndex: null,
      selectedOption: null,
      searchTerm: this.value
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
    handleInput (evt) {
      this.searchTerm = evt.target.value
      this.showOptions = true
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        this.$emit('fetch-suggestions', this.searchTerm)
      }, 275)
      this.timeout()
    },
    handleClick (item) {
      this.searchTerm = item[this.attributeLabel]
      this.$emit('selected', item)
      this.selectedOption = item
      this.showOptions = false
      this.$refs.input.focus()
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

<style></style>
