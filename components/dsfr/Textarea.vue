<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (s) => ['primary', 'white', 'custom'].includes(s),
  },
  name: {
    type: String,
    required: true,
  },
  rows: {
    type: Number,
    default: 3,
  },
  error: {
    type: Boolean,
    default: null,
  },
  success: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div>
    <textarea
      :id="name"
      :name="name"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :class="[
        'border-t-0 border-l-0 border-r-0 rounded-t w-full h-full border-b-2',
        {
          'bg-[#EEEEEE]  border-[#3A3A3A] focus-visible:border-[#3A3A3A]': variant === 'primary',
        },
        {
          'bg-white border-dsfr-blue focus-visible:border-dsfr-blue': variant === 'white',
        },
        { '!border-[#ce0500]': error },
        { '!border-[#18753c]': success },
        customClass,
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
