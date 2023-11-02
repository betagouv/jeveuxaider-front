<template>
  <label class="flex items-baseline cursor-pointer" :class="[{ 'space-x-2': variant !== 'tabs' }]">
    <input
      type="radio"
      :name="name"
      :value="option.key"
      :class="[{ 'sr-only': variant === 'tabs' }, { 'dsfr-theme': variant === 'radios' }]"
      aria-labelledby="label"
      :checked="checked"
      @input="$emit('update:modelValue', option.key)"
    />
    <span
      :class="[
        {
          'text-sm text-gray-900': variant === 'radio',
        },
      ]"
      >{{ option.label }}</span
    >
  </label>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue'],
  props: {
    name: { type: String, required: true },
    checked: { type: Boolean, default: false },
    option: { type: Object, required: true },
    variant: { type: String, default: 'radios', validator: (s) => ['radios', 'tabs'].includes(s) },
    defaultValue: { type: [String, Number, Boolean], default: null },
  },
})
</script>

<style lang="postcss" scoped>
input.dsfr-theme {
  appearance: none;
  margin: 0;
  background-color: transparent;
  border-color: #161616 !important;
  width: 1.25rem;
  height: 1.25rem;
  color: white;
  position: relative;
  top: 4px;
  &:hover {
    background-color: transparent;
    border-color: #161616;
    transform: scale(1.1);
    transition: transform 0.25s;
  }
  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23000091' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='4'/%3e%3c/svg%3e");
  }
  &:focus {
    @apply ring-0 ring-offset-0;
  }
  &:focus-visible {
    @apply ring-2 ring-offset-2;
  }
}
</style>
