<template>
  <label class="flex items-center cursor-pointer" :class="[{'space-x-2': variant !== 'tabs'}]">
    <input
      type="radio"
      name="option"
      :value="option.key"
      :class="[{'sr-only': variant === 'tabs'}]"
      aria-labelledby="label"
      @input="$emit('input', option.key)"
    >
    <span>{{ option.label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    option: { type: Object, required: true },
    variant: { type: String, default: 'radio', validator: s => ['radios', 'tabs'].includes(s) }
  }
}
</script>
