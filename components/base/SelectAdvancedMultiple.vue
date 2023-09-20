<template>
  <div v-click-outside="clickedOutside" class="relative">
    <div class="flex items-center relative w-full">
      <div v-if="icon" class="absolute left-4">
        <component :is="icon" class="h-4 w-4 text-gray-400 fill-current" />
      </div>
      <div
        :id="name"
        :name="name"
        tabindex="0"
        class="cursor-pointer px-6 py-3 text-sm block w-full focus:outline-none border border-gray-300 focus:ring-1 bg-white focus:ring-jva-blue-500 focus:border-jva-blue-500"
        :class="[
          {
            'pl-10': icon,
            'bg-transparent': variant == 'transparent',
            'cursor-not-allowed bg-gray-100': disabled,
          },
        ]"
        autocomplete="off"
        @keydown="onKeydown"
        @click="handleClick"
      >
        <span class="placeholder">{{ placeholder }}</span>
      </div>
      <div class="absolute right-3">
        <RiExpandUpDownLine
          class="h-5 text-gray-400 hover:text-gray-500 cursor-pointer fill-current"
        />
      </div>
    </div>
    <div
      v-show="showOptions"
      class="absolute w-full z-50 bg-white border border-gray-300 shadow-md max-h-60 overflow-auto mt-1 overscroll-contain"
      @focusout="showOptions = false"
    >
      <ul class="py-2">
        <li
          v-for="(item, index) in options"
          :key="index"
          class="flex justify-between items-center text-sm px-8 py-2 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-jva-blue-500 focus:bg-gray-50 focus:text-jva-blue-500"
          :class="[
            { 'bg-gray-50 text-jva-blue-500': highlightIndex == index },
            {
              'bg-gray-50 text-jva-blue-500': selectedOptions.includes(item[attributeKey]),
            },
          ]"
          @click="handleSelectOption(item)"
        >
          <span>
            {{ item[attributeLabel] }}
          </span>
          <RiCheckLine
            v-if="selectedOptions.includes(item[attributeKey])"
            class="h-4 fill-current"
          />
        </li>
        <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
          {{ labelEmpty }}
        </li>
      </ul>
    </div>
    <div v-if="selectedOptions.length" class="mt-3">
      <div class="flex flex-wrap gap-2">
        <BaseTagFormItem
          v-for="(option, i) in selectedOptions"
          :key="i"
          :tag="option"
          @removed="onRemovedOption"
        >
          {{ option }}
        </BaseTagFormItem>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    modelValue: { type: [Array], default: () => [] },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucune option' },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'key' },
    attributeLabel: { type: String, default: 'label' },
    variant: { type: String, default: null },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      showOptions: false,
      highlightIndex: null,
      selectedOptions: this.modelValue ? this.modelValue : [],
    }
  },
  methods: {
    clickedOutside() {
      this.showOptions = false
    },
    handleClick() {
      if (!this.disabled) {
        this.showOptions = !this.showOptions
      }
    },
    onRemovedOption(option) {
      this.selectedOptions = this.selectedOptions.filter((item) => item !== option)
      this.$emit('update:modelValue', this.selectedOptions)
    },
    handleSelectOption(item) {
      if (item) {
        if (!this.selectedOptions.includes(item[this.attributeKey])) {
          this.selectedOptions.push(item[this.attributeKey])
          this.$emit('update:modelValue', this.selectedOptions)
        } else {
          this.onRemovedOption(item[this.attributeKey])
        }
      }
      this.$emit('blur')
      this.showOptions = false
      this.highlightIndex = null
    },
    onKeydown(e) {
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
    },
  },
})
</script>

<style lang="postcss" scoped>
.placeholder {
  font-style: italic;
  color: #888888 !important;
}
</style>
