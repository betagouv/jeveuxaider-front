<template>
  <div>
    <div
      class="flex"
      :class="[
        { 'flex-col space-y-2': variant == 'checkbox' },
        { 'flex-wrap -m-1': variant == 'button' },
        classCheckbox,
      ]"
    >
      <BaseCheckbox
        v-for="option in options"
        :key="option.key"
        :option="option"
        class="relative flex items-start m-1 max-w-full"
        :size="size"
        :is-checked="
          isModel ? value.some((item) => item.id == option.key) : value.includes(option.key)
        "
        :variant="variant"
        @change="onChange"
      />
    </div>
    <div v-if="error" class="text-xs text-red-500 mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Array, default: () => [] },
    options: { type: Array, required: true },
    error: { type: String, default: null },
    variant: {
      type: String,
      default: 'checkbox',
      validator: (s) => ['checkbox', 'button'].includes(s),
    },
    isModel: { type: Boolean, default: false },
    classCheckbox: { type: String, default: '' },
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['xs', 'md', 'lg'].includes(s),
    },
  },
  computed: {
    value() {
      return this.modelValue || []
    },
  },
  // data() {
  //   return {
  //     modelValue: this.value || [],
  //   }
  // },
  // watch: {
  //   value(newVal) {
  //     this.modelValue = newVal
  //   },
  // },
  methods: {
    onChange(toggleItemKey) {
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
    },
  },
})
</script>
