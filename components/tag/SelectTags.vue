<template>
  <div v-click-outside="clickedOutside" class="relative inline-block">
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
      {{ label }}
    </DsfrTag>
    <transition name="fade-in">
      <div
        v-show="showOptions"
        :class="[
          'absolute w-full z-50 mt-2 pt-4 bg-white border border-gray-200 shadow-md overflow-hidden min-w-[350px]',
          optionsClass,
        ]"
      >
        <FacetSearch v-model="searchTerm" @update:modelValue="handleInput" class="px-4" />
        <BaseContainerScrollable
          v-if="filteredOptions.length > 0"
          class="py-4 pr-4"
          scrollbarClass="max-h-[200px]"
        >
          <BaseCheckbox
            v-for="option in filteredOptions"
            :key="option.key"
            :option="option"
            :is-checked="modelValue.some((item) => item.id == option.key)"
            @checked="attachTag"
            @unchecked="detachTag"
            class="pt-1 pl-4 pr-2"
          />
        </BaseContainerScrollable>
        <div class="p-4" v-else>
          <div class="text-gray-300">Aucun tag</div>
        </div>
        <div class="px-4">
          <div class="border-t">
            <div
              @click="handleClickHandleTags"
              class="py-4 flex items-center cursor-pointer text-sm space-x-4 hover:text-jva-blue-500"
            >
              <template v-if="$stores.structureTags.options.length > 0">
                <RiPriceTag3Line class="h-4 w-4 fill-current" /> <span>Gestion des tags</span>
              </template>
              <template v-else>
                <RiPriceTag3Line class="h-4 w-4 fill-current" /> <span>Créer des tags</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <ModalTagsManager ref="modalTagsManager" :is-open="showModal" @cancel="showModal = false" />
  </div>
</template>

<script>
import FacetSearch from '@/components/section/search/FacetSearch.vue'
import ModalTagsManager from '@/components/modal/ModalTagsManager.vue'

export default defineNuxtComponent({
  emits: ['update:modelValue', 'update-selected-tags'],
  components: {
    FacetSearch,
    ModalTagsManager,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    structureTagsEndpoint: {
      type: String,
      required: true,
    },
    taggableEndpoint: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Attribuer un tag',
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionsClass: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showOptions: false,
      searchTerm: '',
      selectedOptions: this.modelValue || [],
      showModal: false,
    }
  },
  created() {
    this.$stores.structureTags.endpoint = this.structureTagsEndpoint
    this.$stores.structureTags.fetchOptions()
  },
  computed: {
    filteredOptions() {
      return this.$stores.structureTags.options.filter((option) =>
        option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    },
  },
  methods: {
    handleClickHandleTags() {
      if (this.$stores.structureTags.options.length === 0) {
        this.$refs.modalTagsManager.mode = 'add'
      }
      this.showModal = true
    },
    async attachTag(structureTagId) {
      const { tags } = await apiFetch(`${this.taggableEndpoint}/${structureTagId}/attach`, {
        method: 'POST',
      })
      this.$emit('update-selected-tags', tags)
    },
    async detachTag(structureTagId) {
      const { tags } = await apiFetch(`${this.taggableEndpoint}/${structureTagId}/detach`, {
        method: 'POST',
      })
      this.$emit('update-selected-tags', tags)
    },
    toggleOpen() {
      // if (this.$stores.structureTags.options.length === 0) {
      //   this.$refs.modalTagsManager.mode = 'add'
      //   this.showModal = true
      // }

      this.showOptions = !this.showOptions
    },
    handleInput(value) {
      this.searchTerm = value
    },
    clickedOutside() {
      if (this.showModal) {
        return
      }
      this.showOptions = false
    },
  },
})
</script>
