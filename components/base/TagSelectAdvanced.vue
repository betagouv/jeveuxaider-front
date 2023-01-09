<template>
  <div v-click-outside="clickedOutside" class="relative">
    <Tag
      :id="name"
      :name="name"
      :tabindex="!disabled && '0'"
      as="button"
      size="md"
      context="clickable"
      icon="RiArrowDownSLine"
      icon-position="right"
      clearable
      :is-active="value ? true : false"
      @keydown.native="onKeydown"
      @click.native="!disabled ? showOptions = !showOptions : null"
      @keydown.native.tab="showOptions = false"
      @keydown.native.esc="showOptions = false"
      @clear="reset()"
    >
      <span class="truncate">{{ selectedOption ? selectedOption[attributeLabel] : placeholder }}</span>
    </Tag>
    <div
      v-show="showOptions"
      class="absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-60 overflow-auto mt-2 overscroll-contain min-w-[200px]"
      :class="['absolute w-full z-50 bg-white border border-gray-200 shadow-md max-h-60 overflow-auto mt-2 overscroll-contain min-w-[200px]', optionsClass]"
      @focusout="showOptions = false"
    >
      <ul
        class="py-2"
      >
        <li
          v-for="(item, index) in options"
          :key="index"
          :ref="`option_${index}`"
          class="relative flex justify-between items-center text-sm px-8 py-2 pr-10 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
          :class="[
            {'bg-[#F0F0FF]': highlightIndex == index},
            {'bg-[#F0F0FF]': selectedOption && item[attributeKey] == selectedOption[attributeKey]}
          ]"
          @click="handleSelectOption(item)"
        >
          <span class="">
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
</template>

<script>

import Tag from '@/components/dsfr/Tag.vue'
import Selectable from '@/mixins/form/selectable'

export default {
  components: {
    Tag
  },
  mixins: [Selectable],
  props: {
    value: { type: [String, Number], default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucune option' },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'key' },
    attributeLabel: { type: String, default: 'label' },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    optionsClass: { type: String, default: '' }
  }

}
</script>
