<template>
  <div>
    <div :class="['flex flex-wrap initial:gap-2 initial:lg:gap-3', wrapperClass]">
      <DsfrTag
        v-for="option in options"
        :key="option.key"
        as="button"
        :context="context"
        size="md"
        :is-active="isActive(option)"
        @click.native.prevent="onClick(option.key)"
      >
        {{ option.label }}
      </DsfrTag>
    </div>
    <div v-if="error" class="text-xs text-red-500 mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue', 'updated'],
  props: {
    modelValue: {
      type: [Array, String],
      default: ({ context }) => (context === 'selectable' ? [] : null),
    },
    options: { type: Array, required: true },
    error: { type: String, default: null },
    isModel: { type: Boolean, default: false },
    wrapperClass: { type: String, default: '' },
    context: { type: String, default: 'selectable' },
  },
  data() {
    return {
      value: this.modelValue,
    }
  },
  methods: {
    onClick(toggleItemKey) {
      if (this.context === 'selectable') {
        this.handleClickForSelectableContext(toggleItemKey)
      } else if (this.context === 'radio') {
        this.handleClickForRadioContext(toggleItemKey)
      }

      this.$emit('update:modelValue', this.value)
      this.$emit('updated', this.value)
    },
    handleClickForSelectableContext(toggleItemKey) {
      if (this.isModel) {
        const index = this.value.findIndex((item) => item.id == toggleItemKey)
        if (index > -1) {
          this.value.splice(index, 1)
        } else {
          this.value.push({ id: toggleItemKey })
        }
      } else if (this.value.includes(toggleItemKey)) {
        const index = this.value.indexOf(toggleItemKey)
        if (index > -1) {
          this.value.splice(index, 1)
        }
      } else {
        this.value.push(toggleItemKey)
      }
    },
    handleClickForRadioContext(toggleItemKey) {
      if (
        (!this.isModel && this.value === toggleItemKey) ||
        (this.isModel && this.value.id === toggleItemKey)
      ) {
        this.value = null
        return
      }
      this.value = this.isModel ? { id: toggleItemKey } : toggleItemKey
    },
    isActive(option) {
      if (this.context === 'selectable') {
        return this.isModel
          ? this.value.some((item) => item.id == option.key)
          : this.value.includes(option.key)
      } else if (this.context === 'radio') {
        return this.isModel ? option.key === this.value.id : option.key === this.value
      }
    },
  },
})
</script>
