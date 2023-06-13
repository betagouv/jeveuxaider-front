<template>
  <div>
    <div
      :class="[
        'flex flex-wrap gap-4',
        wrapperClass
      ]"
    >
      <Tag
        v-for="option in options"
        :key="option.key"
        as="button"
        context="selectable"
        size="md"
        :is-selected="isModel ? modelValue.some(item => item.id == option.key) : modelValue.includes(option.key)"
        @click.native.prevent="onClick(option.key)"
      >
        {{ option.label }}
      </Tag>
    </div>
    <div v-if="error" class="text-xs text-red-500 mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Tag
  },
  props: {
    value: { type: Array, default: () => [] },
    options: { type: Array, required: true },
    error: { type: String, default: null },
    isModel: { type: Boolean, default: false },
    wrapperClass: { type: String, default: '' }
  },
  data () {
    return {
      modelValue: this.value || []
    }
  },
  watch: {
    value (newVal) {
      this.modelValue = newVal
    }
  },
  methods: {
    onClick (toggleItemKey) {
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
      this.$emit('updated', this.modelValue)
    }
  }
}
</script>
