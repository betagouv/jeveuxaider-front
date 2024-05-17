<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Sélectionne une option',
  },
  options: {
    type: Array,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (s) => ['md', 'lg'].includes(s),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: null,
  },
  success: {
    type: Boolean,
    default: null,
  },
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="w-full relative">
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'border-none rounded-t w-full h-full',
        'bg-[#EEEEEE] shadow-[inset_0_-2px_0_0_#3A3A3A] focus:!shadow-[inset_0_-2px_0_0_#3A3A3A] text-[#3a3a3a]',

        { '!shadow-[inset_0_-2px_0_0_#ce0500]': error },
        { '!shadow-[inset_0_-2px_0_0_#18753c]': success },
        { 'py-3': size === 'lg' },

        customClass,
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" selected disabled hidden>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.key" :value="option.key">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style lang="postcss" scoped>
select {
  --tw-ring-shadow: 0 0 #000 !important;
}
</style>
