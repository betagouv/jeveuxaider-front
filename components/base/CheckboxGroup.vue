<template>
  <div>
    <div
      class="flex"
      :class="[
        {'flex-col space-y-2': variant == 'checkbox'},
        {'flex-wrap -m-1': variant == 'button'},
        classCheckbox
      ]"
    >
      <Checkbox
        v-for="option in options"
        :key="option.key"
        :option="option"
        class="relative flex items-start m-1"
        :is-checked="isModel ? modelValue.some(item => item.id == option.key) : modelValue.includes(option.key)"
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
export default {
  props: {
    value: { type: Array, default: () => [] },
    options: { type: Array, required: true },
    error: { type: String, default: null },
    variant: {
      type: String,
      default: 'checkbox',
      validator: s =>
        ['checkbox', 'button'].includes(s)
    },
    isModel: { type: Boolean, default: false },
    classCheckbox: { type: String, default: '' }
  },
  computed: {
    modelValue: {
      get () {
        return this.value || []
      },
      set (newValue) {
        // this.$emit('input', newValue) ( ne marche pas dans un edit )
      }
    }
  },
  methods: {
    onChange (toggleItemKey) {
      if (this.isModel) {
        const index = this.modelValue.findIndex(item => item.id == toggleItemKey)
        if (index > -1) {
          this.modelValue.splice(index, 1)
        } else {
          this.modelValue.push({ id: toggleItemKey })
        }
      } else if (this.modelValue.includes(toggleItemKey)) {
        const index = this.modelValue.indexOf(toggleItemKey)
        if (index > -1) {
          this.modelValue.splice(index, 1)
        }
      } else {
        this.modelValue.push(toggleItemKey)
      }

      this.$emit('input', this.modelValue)
    }
  }
}
</script>
