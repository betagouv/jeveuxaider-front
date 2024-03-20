<template>
  <div class="w-full">
    <BaseFormLabel
      v-if="label"
      :html-for="htmlFor"
      :size="labelSize"
      :suffix="labelSuffix"
      :required="required"
      class="mb-2"
    >
      {{ label }}
      <slot name="afterLabel" />
    </BaseFormLabel>

    <slot />

    <BaseFormInfo v-if="info && !error">{{ info }}</BaseFormInfo>
    <BaseFormError v-if="error">
      {{ error }}
    </BaseFormError>
    <BaseFormSuccess v-if="success">
      {{ success }}
    </BaseFormSuccess>

    <slot name="description" />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    htmlFor: { type: String, required: true },
    info: { type: String, default: null },
    error: { type: String, default: null },
    success: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    labelSize: { type: String, default: 'xs' },
    required: { type: Boolean, default: false },
  },
})
</script>
