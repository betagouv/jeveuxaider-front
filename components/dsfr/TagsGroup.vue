<template>
  <div>
    <div
      :id="name"
      :name="name"
      :class="['flex flex-wrap initial:gap-2 initial:lg:gap-3', wrapperClass]"
    >
      <DsfrTag
        v-for="option in options"
        :key="option.key"
        as="button"
        context="selectable"
        size="md"
        :is-active="isActive(option)"
        role="checkbox"
        :aria-checked="isActive(option)"
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
    name: { type: String, required: true },
    modelValue: { type: Array, default: () => [] },
    options: { type: Array, required: true },
    error: { type: String, default: null },
    isModel: { type: Boolean, default: false },
    wrapperClass: { type: String, default: '' },
  },
  computed: {
    value() {
      return this.modelValue ?? []
    },
  },
  methods: {
    onClick(toggleItemKey) {
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

      this.$emit('update:modelValue', this.value)
      this.$emit('updated', this.value)
    },
    isActive(option) {
      return this.isModel
        ? this.value.some((item) => item.id == option.key)
        : this.value.includes(option.key)
    },
  },
})
</script>
