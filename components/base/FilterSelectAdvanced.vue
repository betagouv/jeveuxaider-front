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
      icon="RiArrowDownSLine"
      icon-position="right"
      clearable
      :is-active="modelValue ? true : false"
      class="!max-w-[300px]"
      @keydown="onKeydown"
      @click="!disabled && (showOptions = !showOptions)"
      @keydown.tab="showOptions = false"
      @keydown.esc="showOptions = false"
      @clear="reset()"
    >
      <span class="truncate">{{
        selectedOption ? selectedOption[attributeLabel] : placeholder
      }}</span>
    </DsfrTag>
    <transition name="fade-in">
      <div
        v-show="showOptions"
        :class="[
          'absolute w-full z-50 mt-2 p-2 bg-white border border-gray-200 shadow-md overflow-hidden min-w-[250px]',
          optionsPositionClass,
          optionsClass,
        ]"
        @focusout="showOptions = false"
      >
        <div class="p-2 font-medium">
          {{ placeholder }}
        </div>
        <div
          ref="scrollContainer"
          class="max-h-[250px] overflow-y-auto overscroll-contain custom-scrollbar-gray"
        >
          <ul class="px-2">
            <li
              v-for="(item, index) in options"
              :key="index"
              :ref="`option_${index}`"
              class="relative flex justify-between items-center text-sm pl-2 py-2 pr-2 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
              :class="[
                { 'bg-[#F0F0FF]': highlightIndex == index },
                {
                  'bg-[#F0F0FF] !pr-8':
                    selectedOption && item[attributeKey] == selectedOption[attributeKey],
                },
                { 'pointer-events-none text-gray-500': item.disabled },
              ]"
              @click="handleSelectOption(item)"
            >
              <span class="truncate">
                {{ item[attributeLabel] }}
              </span>
              <RiCheckLine
                v-if="selectedOption && item[attributeKey] == selectedOption[attributeKey]"
                class="absolute right-2 h-4 fill-current"
              />
            </li>
            <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
              {{ labelEmpty }}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Selectable from '@/mixins/form/selectable'

export default defineNuxtComponent({
  mixins: [Selectable],
  props: {
    modelValue: { type: [String, Number], default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucune option' },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'key' },
    attributeLabel: { type: String, default: 'label' },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    optionsClass: { type: String, default: '' },
  },
  data() {
    return {
      enableUnselect: true,
      optionsPositionClass: '',
    }
  },
  watch: {
    async showOptions(newVal) {
      if (newVal) {
        await this.$nextTick()
        this.handleOptionsPosition()
      }
    },
  },
  methods: {
    handleOptionsPosition() {
      const elOptionsX = this.$refs.tag.$el.getBoundingClientRect()?.x
      const windowCenterX = window.innerWidth / 2
      this.optionsPositionClass = elOptionsX > windowCenterX ? 'right-0' : ''
    },
  },
})
</script>
