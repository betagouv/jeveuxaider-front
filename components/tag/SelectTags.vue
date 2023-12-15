<template>
  <div v-click-outside="clickedOutside" class="relative">
    <DsfrTag
      :tabindex="!disabled && '0'"
      as="button"
      size="md"
      context="clickable"
      clearable
      icon="RiArrowDownSLine"
      icon-position="right"
      class="max-w-[300px]"
      @click.native="toggleOpen"
      @keydown.native.tab="showOptions = false"
      @keydown.native.esc="showOptions = false"
      @clear="reset()"
    >
      Ajouter une étiquette
    </DsfrTag>
    <transition name="fade-in">
      <div
        v-show="showOptions"
        :class="[
          'absolute w-full z-50 mt-2 pb-4 bg-white border border-gray-200 shadow-md overflow-hidden min-w-[300px]',
          optionsClass,
        ]"
      >
        <FacetSearch v-model="searchTerm" @update:modelValue="handleInput" class="p-4" />
        <BaseContainerScrollable v-if="filteredOptions.length > 0" class="h-[200px] pr-4">
          <BaseCheckbox
            v-for="option in filteredOptions"
            :key="option.key"
            :option="option"
            :is-checked="modelValue.some((item) => item.id == option.key)"
            @checked="attachTag"
            @unchecked="detachTag"
            class="px-4"
          />
        </BaseContainerScrollable>
        <div class="p-4" v-else>
          <div class="text-gray-300">Aucune étiquette</div>
        </div>
        <div class="border-t">
          <div @click="showModal = true" class="hover:text-jva-blue-500">
            <RiTodoLine class="h-4 w-4 fill-current" /> <span>Gestion des étiquettes</span>
          </div>
        </div>
      </div>
    </transition>
    <ModalTagsManager
      :is-open="showModal"
      :taggableOptions="taggableOptions"
      @cancel="showModal = false"
    />
  </div>
</template>

<script>
import TagEditableItem from '@/components/tag/TagEditableItem.vue'
import FacetSearch from '@/components/section/search/FacetSearch.vue'
import ModalTagsManager from '@/components/modal/ModalTagsManager.vue'

export default defineNuxtComponent({
  components: {
    TagEditableItem,
    FacetSearch,
    ModalTagsManager,
  },
  props: {
    modelValue: { type: Array, default: () => [] },
    taggableOptions: {
      type: Object,
      required: true,
    },
    optionsClass: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      showOptions: false,
      searchTerm: '',
      options: [],
      selectedOptions: this.modelValue || [],
      showModal: false,
    }
  },
  created() {
    this.fetchOptions()
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
        option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    },
  },
  methods: {
    attachTag(payload) {
      this.$emit('attach-tag', payload)
    },
    detachTag(payload) {
      this.$emit('detach-tag', payload)
    },
    async fetchOptions() {
      const options = await apiFetch(this.taggableOptions.tags_endpoint)
      this.options = options.map((option) => ({ ...option, key: option.id, label: option.name }))
    },
    toggleOpen() {
      this.showOptions = !this.showOptions
    },
    handleInput(value) {
      this.searchTerm = value
    },
    clickedOutside() {
      this.showOptions = false
    },
  },
})
</script>
