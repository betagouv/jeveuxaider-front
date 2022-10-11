<template>
  <div class="space-y-1">
    <FormLabel v-if="label" :html-for="htmlFor" :suffix="labelSuffix" :required="required">
      {{ label }}
      <slot name="afterLabel" />
    </FormLabel>
    <slot />
    <FormError v-if="error">
      {{ error }}
    </FormError>
    <slot name="description" />
  </div>
</template>

<script>
export default {
  props: {
    htmlFor: { type: String, required: true },
    error: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    required: { type: Boolean, default: false }
  }
}
</script>

<style>

</style>
