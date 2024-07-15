<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="htmlFor"
      :class="['block  relative text-[#161616]', $slots.description ? 'mb-1' : 'mb-2']"
    >
      {{ label }}
      <span v-if="required" class="text-[#E2011C]"> * </span>
      <span v-if="labelSuffix" class="text-jva-blue-400 ml-2">{{ labelSuffix }}</span>
    </label>

    <div v-if="$slots.description" class="mb-2">
      <slot name="description" />
    </div>
    <slot />

    <BaseFormInfo v-if="info && !error">{{ info }}</BaseFormInfo>
    <BaseFormError v-if="error">
      {{ error }}
    </BaseFormError>
    <BaseFormSuccess v-if="success">
      {{ success }}
    </BaseFormSuccess>

    <slot name="bottom" />
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
