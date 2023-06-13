<template>
  <div class="w-full">
    <FormLabel
      v-if="label"
      :html-for="htmlFor"
      :size="labelSize"
      :suffix="labelSuffix"
      :required="required"
      class="mb-2"
    >
      {{ label }}
      <slot name="afterLabel" />
    </FormLabel>

    <slot />

    <FormError v-if="error">
      {{ error }}
    </FormError>
    <FormSuccess v-if="success">
      {{ success }}
    </FormSuccess>

    <slot name="description" />
  </div>
</template>

<script>
export default {
  props: {
    htmlFor: { type: String, required: true },
    error: { type: String, default: null },
    success: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    labelSize: { type: String, default: 'xs' },
    required: { type: Boolean, default: false }
  }
}
</script>

<style>

</style>
