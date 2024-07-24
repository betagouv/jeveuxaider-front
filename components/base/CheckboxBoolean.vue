<template>
  <div class="flex">
    <div class="flex mt-[5px]">
      <input
        :id="name"
        :aria-describedby="`${name}-description`"
        :name="name"
        type="checkbox"
        class="focus:ring-jva-blue-500 h-4 w-4 text-jva-blue-500 border border-gray-300 rounded"
        :checked="checked"
        @change="toggleChecked()"
      />
    </div>
    <div
      class="ml-3 text-gray-600 cursor-pointer"
      :class="[{ 'text-xs': size === 'xs' }, { 'text-sm': size === 'sm' }]"
      @click="toggleChecked()"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['checked', 'unchecked', 'update:modelValue', 'changed'],
  props: {
    value: { type: Boolean, default: false },
    name: { type: String, required: true },
    size: {
      type: String,
      default: 'sm',
      validator: (s) => ['xs', 'sm'].includes(s),
    },
  },
  data() {
    return {
      checked: this.value,
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.checked = newValue
      },
    },
  },
  methods: {
    toggleChecked() {
      this.checked = !this.checked
      this.$emit('update:modelValue', this.checked)
      if (this.checked) {
        this.$emit('checked')
      } else {
        this.$emit('unchecked')
      }
      this.$emit('changed', this.checked)
    },
  },
})
</script>
