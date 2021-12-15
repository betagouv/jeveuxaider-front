<template>
  <div class="">
    <FormLabel v-if="label" :html-for="htmlFor" :required="required">
      {{ label }}
    </FormLabel>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    htmlFor: { type: String, required: true },
    label: { type: String, default: null },
    required: { type: Boolean, default: false }
  }
}
</script>

<style>

</style>
