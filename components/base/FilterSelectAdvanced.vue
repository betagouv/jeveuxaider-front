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
      :is-active="!!modelValue"
      class="!max-w-[300px]"
      @click="!disabled && (showOptions = !showOptions)"
      @clear="reset()"
    >
      <span class="flex min-w-0">
        <span class="truncate">
          {{ activeOptions.length ? activeOptions[0][attributeLabel] : placeholder }}
        </span>
        <span v-if="activeOptions.length > 1">, +{{ activeOptions.length - 1 }}</span>
      </span>
    </DsfrTag>

    <transition name="fade-in">
      <div
        v-show="showOptions"
        :class="[
          'absolute w-full z-50 mt-2 px-4 pt-4 bg-white border border-gray-200 shadow-md overflow-hidden initial:min-w-[250px]',
          optionsPositionClass,
          optionsClass,
        ]"
      >
        <FocusLoop :is-visible="showOptions" @keydown.esc="showOptions = false">
          <div :class="['font-medium ', { 'border-b border-gray-300 pb-2': !searchable }]">
            {{ placeholder }}
          </div>
          <FacetSearch v-if="searchable" ref="facetSearch" class="mt-3" v-model="searchTerm" />
          <div
            ref="scrollContainer"
            class="max-h-[268px] overflow-y-auto overscroll-contain custom-scrollbar-gray -mx-2 py-2"
            :tabindex="!multiple ? '0' : '-1'"
            @keydown="!multiple && onKeydown($event)"
          >
            <ul class="mx-2">
              <template v-if="!multiple">
                <li
                  v-for="(item, index) in filteredOptions"
                  :key="`${item[attributeKey]}_${index}`"
                  :ref="`option_${index}`"
                  class="relative flex justify-between items-center text-sm pl-2 py-[6px] pr-2 cursor-pointer hover:bg-[#F0F0FF] focus:bg-[#F0F0FF]"
                  :class="[
                    { 'bg-[#F0F0FF]': highlightIndex == index },
                    { 'bg-[#F0F0FF] !pr-8': isOptionActive(item) },
                    { 'pointer-events-none text-gray-500': item.disabled },
                  ]"
                  @click="handleSelectOption(item)"
                >
                  <span class="truncate">
                    {{ item[attributeLabel] }}
                  </span>
                  <RiCheckLine
                    v-if="isOptionActive(item)"
                    class="absolute right-2 h-4 fill-current"
                  />
                </li>
              </template>

              <template v-else>
                <div class="space-y-2">
                  <div
                    v-for="(item, index) in filteredOptions"
                    :key="`${item[attributeKey]}_${index}`"
                    :class="[{ 'text-jva-blue-500': isOptionActive(item) }]"
                    class="flex items-center group"
                  >
                    <input
                      :id="`option_${index}`"
                      :name="`option_${index}`"
                      :value="isOptionActive(item)"
                      :checked="isOptionActive(item)"
                      type="checkbox"
                      class="rounded text-jva-blue-500 transition focus:ring-jva-blue-500 group-hover:border-jva-blue-500 cursor-pointer"
                      @keydown.enter="handleSelectOptionMultiple(item)"
                      @change="handleSelectOptionMultiple(item)"
                    />
                    <label
                      :for="`option_${index}`"
                      class="pl-2 flex justify-between truncate flex-1 group-hover:text-jva-blue-500 cursor-pointer"
                    >
                      <div class="truncate">
                        {{ item[attributeLabel] }}
                      </div>
                    </label>
                  </div>
                </div>
              </template>

              <li v-if="!options.length" class="px-8 py-2 text-center text-sm text-gray-500">
                {{ labelEmpty }}
              </li>
            </ul>
          </div>

          <div class="border-t px-4 py-3 flex justify-end -mx-4">
            <button
              class="text-sm"
              :class="[
                { 'text-gray-400 pointer-events-none': !modelValue },
                {
                  'text-jva-blue-500 cursor-pointer hover:underline': !!modelValue,
                },
              ]"
              :disabled="!modelValue"
              @click="reset()"
            >
              Effacer
            </button>
          </div>
        </FocusLoop>
      </div>
    </transition>
  </div>
</template>

<script>
import Selectable from '@/mixins/form/selectable'
import FacetSearch from '@/components/section/search/FacetSearch.vue'
import { FocusLoop } from '@vue-a11y/focus-loop'

export default defineNuxtComponent({
  components: {
    FacetSearch,
    FocusLoop,
  },
  mixins: [Selectable],
  props: {
    modelValue: { type: [String, Number, Array], default: null },
    placeholder: { type: String, default: null },
    labelEmpty: { type: String, default: 'Aucune option' },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    options: { type: Array, default: () => [] },
    attributeKey: { type: String, default: 'key' },
    attributeLabel: { type: String, default: 'label' },
    clearable: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    optionsClass: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
  },
  data() {
    return {
      enableUnselect: true,
      optionsPositionClass: '',
      searchTerm: '',
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
  computed: {
    filteredOptions() {
      if (!this.searchable) {
        return this.options
      }
      return this.options.filter((option) => {
        return option[this.attributeLabel].toLowerCase().includes(this.searchTerm.toLowerCase())
      })
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

<style lang="postcss" scoped>
.custom-scrollbar-gray::-webkit-scrollbar-track {
  @apply my-2;
}
</style>
