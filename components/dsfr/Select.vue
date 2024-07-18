<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
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
  required: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="w-full relative">
    <select
      :id="name"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'border-none rounded-t w-full h-full truncate',
        'bg-[#EEEEEE]  focus:!shadow-[inset_0_-2px_0_0_#3A3A3A] text-[#3a3a3a]',
        { ' shadow-[inset_0_-2px_0_0_#3A3A3A]': !disabled },
        { '!shadow-[inset_0_-2px_0_0_#ce0500]': error },
        { '!shadow-[inset_0_-2px_0_0_#18753c]': success },
        { 'py-3': size === 'lg' },
        { 'cursor-not-allowed shadow-[inset_0_-2px_0_0_#E5E5E5]': disabled },

        customClass,
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    >
      <option value="" selected :disabled="required">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.key"
        :value="option.key"
        :disabled="option.disabled"
      >
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
