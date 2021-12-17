<template>
  <div class="">
    <FormLabel v-if="label" :html-for="htmlFor" :required="required">
      {{ label }}
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
    required: { type: Boolean, default: false }
  }
}
</script>

<style>

</style>
