<template>
  <div v-click-outside="clickedOutside" class="relative">
    <label v-if="label" :for="name" class="block text-xs uppercase font-bold text-gray-700">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="text-jva-blue-400">{{
        labelSuffix
      }}</span>
    </label>
    <div v-if="description" class="text-xs text-gray-500 mt-2">
      {{ description }}
    </div>
    <div class="mt-2">
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
          tabindex="0"
          class="
            cursor-pointer
            px-6
            py-3
            text-sm
            rounded-xl
            block
            w-full
            focus:outline-none
            border border-gray-200
            focus:ring-1
            focus:ring-jva-blue-500 focus:border-jva-blue-500
          "
          :class=" [{ 'border-jva-red-primary': error, 'pl-10': icon}]"
          autocomplete="off"
          @keydown="onKeydown"
          @click="showOptions = !showOptions"
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
    </div>
    <div
      v-show="showOptions"
      class="absolute w-full z-50 bg-white border border-gray-200 mt-2 overflow-hidden rounded-xl shadow-md"
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
          @click="handleClick(item)"
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

    <div v-if="error" class="text-xs text-red-500 absolute">
      {{ error }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: [String, Number], default: null },
    placeholder: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucune option' },
    name: { type: String, required: true },
    error: { type: String, default: null },
    description: { type: String, default: null },
    required: { type: Boolean, default: false },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'key' },
    attributeLabel: { type: String, default: 'label' },
    clearable: { type: Boolean, default: false }
  },
  data () {
    return {
      showOptions: false,
      highlightIndex: null,
      selectedOption: this.value ? this.options.find(item => item[this.attributeKey] === this.value) : null
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
    handleClick (item) {
      if (item) {
        this.$emit('input', item[this.attributeKey])
        this.selectedOption = item
      }
      this.showOptions = false
      this.highlightIndex = null
    },
    onKeydown (e) {
      const keyValue = e.which // enter key
      if (keyValue === 9) {
        this.showOptions = false
        this.highlightIndex = null
      }

      if (keyValue === 13 || keyValue === 32) {
        if (this.highlightIndex !== null) {
          this.handleClick(this.options[this.highlightIndex])
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

<style></style>
