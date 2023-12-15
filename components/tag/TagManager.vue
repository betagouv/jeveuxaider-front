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
          'absolute w-full z-50 mt-2 p-2 bg-white border border-gray-200 shadow-md overflow-hidden min-w-[300px]',
          optionsClass,
        ]"
      >
        <div class="p-4 space-y-3">LIST OF TAGS</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default defineNuxtComponent({
  components: {},
  props: {
    taggableType: {
      type: String,
      required: true,
    },
    taggableId: {
      type: Number,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    optionsClass: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      showOptions: false,
      searchTerm: null,
    }
  },
  computed: {},
  methods: {
    reset() {
      //
    },
    toggleOpen() {
      //
    },
    handleInput(value) {
      //
    },
    handleClick(item) {
      //
    },
    clickedOutside() {
      this.showOptions = false
    },
  },
})
</script>
