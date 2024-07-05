<template>
  <div v-click-outside="clickedOutside" class="relative">
    <div class="flex items-center relative w-full">
      <div v-if="icon" class="absolute left-4">
        <component :is="iconComponant" class="h-4 w-4 text-gray-400" />
      </div>
      <div
        :id="name"
        :name="name"
        :tabindex="!disabled && '0'"
        class="cursor-pointer text-sm block w-full border border-gray-300 bg-white truncate"
        :class="[
          { 'pl-10': icon },
          { '!cursor-not-allowed !bg-gray-100': disabled },
          { '!bg-transparent': variant == 'transparent' && !modelValue },
          { 'bg-white': variant == 'transparent' && modelValue },
          { 'px-6 py-3 pr-10': theme === 'default' },
          { 'px-2 py-1 pr-7': theme === 'filter' },
          selectClass,
        ]"
        autocomplete="off"
        @keydown="onKeydown"
        @click="onClick"
        @keydown.tab="showOptions = false"
        @keydown.esc="showOptions = false"
      >
        <div class="flex gap-4">
          <span v-if="prefixLabel" class="text-gray-400 font-semibold">{{ prefixLabel }}</span>
          <template v-if="activeOptions.length">
            <span class="truncate">{{ activeOptions[0][attributeLabel] }}</span>
          </template>
          <template v-else>
            <span class="truncate italic text-[#888888]">{{ placeholder }}</span>
          </template>
        </div>
      </div>
      <div
        class="absolute"
        :class="[
          { 'right-3': theme === 'default' },
          { 'right-1': theme === 'filter' },
          { 'pointer-events-none': !(activeOptions.length && clearable) },
        ]"
      >
        <RiCloseLine
          v-if="activeOptions.length && clearable"
          class="text-gray-400 hover:text-gray-500 cursor-pointer fill-current"
          :class="[{ 'h-5': theme === 'default' }, { 'h-4': theme === 'filter' }]"
          @click="reset()"
        />
        <RiExpandUpDownLine
          v-else
          class="text-gray-400 hover:text-gray-500 cursor-pointer fill-current"
          :class="[{ 'h-5': theme === 'default' }, { 'h-4': theme === 'filter' }]"
        />
      </div>
    </div>
    <div
      v-show="showOptions"
      :class="[
        'absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-60 overflow-auto mt-2 overscroll-contain min-w-[200px]',
        optionsClass,
      ]"
      @focusout="showOptions = false"
    >
      <ul
        class="py-2"
        role="listbox"
        :aria-labelledby="ariaLabelledby"
        :aria-label="!ariaLabelledby && ariaLabel"
      >
        <li
          v-for="(item, index) in options"
          :key="index"
          :ref="`option_${index}`"
          class="relative flex justify-between items-center text-sm px-8 py-2 pr-2 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
          :class="[
            { 'bg-[#F0F0FF]': highlightIndex == index },
            {
              'bg-[#F0F0FF] !pr-8': isOptionActive(item),
            },
            { 'pointer-events-none text-gray-500': item.disabled },
          ]"
          role="option"
          :aria-selected="isOptionActive(item) || 'false'"
          @click="handleSelectOption(item)"
        >
          <span>
            {{ item[attributeLabel] }}
          </span>
          <RiCheckLine v-if="isOptionActive(item)" class="absolute right-2 w-4 h-4" />
        </li>
        <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
          {{ labelEmpty }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Selectable from '@/mixins/form/selectable'

export default defineNuxtComponent({
  mixins: [Selectable],
  emits: ['update:modelValue', 'blur', 'changed'],
  props: {
    modelValue: { type: [String, Number, Boolean], default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucune option' },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'key' },
    attributeLabel: { type: String, default: 'label' },
    variant: { type: String, default: null },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    theme: { type: String, default: 'default' },
    prefixLabel: { type: String, default: null },
    selectClass: { type: String, default: '' },
    optionsClass: { type: String, default: '' },
    ariaLabelledby: { type: String, default: null },
    ariaLabel: { type: String, default: null },
  },
  computed: {
    iconComponant() {
      return resolveComponent(this.icon)
    },
  },
})
</script>
